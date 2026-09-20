import { partnerConfig } from "@/config/partner";

const SCRIPT_FLAG = "data-roofcost-partner-script";
const LOAD_MS = 20_000;

type PartnerWindow = Window & {
  id_conf?: string;
  startTheLoading?: (options?: Record<string, unknown>) => void;
};

let scriptLoad: Promise<void> | null = null;

/**
 * Load the approved partner widget into `mount` after a user click.
 *
 * Creates the Leads Do Work `<script>` with the DOM API (never React
 * innerHTML). Sets `window.id_conf` as the widget requires. The vendor file
 * calls `document.write` for `#f-loader`; that is redirected into `mount`
 * so it cannot wipe the RoofCost UK page.
 *
 * The vendor script is injected once per browser session.
 */
export function loadPartnerWidget(mount: HTMLElement): Promise<void> {
  const configId = partnerConfig.partnerWidgetConfigId;
  const scriptUrl = partnerConfig.partnerWidgetScriptUrl;
  if (!configId || !scriptUrl) {
    return Promise.reject(new Error("Partner widget is not configured."));
  }
  if (!/^https:\/\//i.test(scriptUrl)) {
    return Promise.reject(new Error("Partner widget script must be HTTPS."));
  }

  const w = window as PartnerWindow;
  w.id_conf = configId;
  removeOrphanShell(mount);

  const existing = document.querySelector(`script[${SCRIPT_FLAG}]`);
  if (existing && typeof w.startTheLoading === "function") {
    ensureReloadShell(mount);
    w.startTheLoading();
    return waitForWidget(mount);
  }

  if (!scriptLoad) {
    scriptLoad = injectVendorScript(mount, scriptUrl);
  }
  return scriptLoad.then(() => waitForWidget(mount));
}

function removeOrphanShell(mount: HTMLElement) {
  const orphan = document.getElementById("f-content");
  if (orphan && !mount.contains(orphan)) orphan.remove();
}

/** Used only when the vendor script is already on the page and document.write will not run again. */
function ensureReloadShell(mount: HTMLElement) {
  if (mount.querySelector("#f-content")) return;
  const content = document.createElement("div");
  content.id = "f-content";
  content.innerHTML =
    '<div id="Qtop-section"></div><div id="f-loader"></div><div id="Qmain-section"></div><div id="Qfooter-section"></div>';
  mount.appendChild(content);
}

function injectVendorScript(mount: HTMLElement, scriptUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[${SCRIPT_FLAG}]`)) {
      resolve();
      return;
    }
    const restore = patchDocumentWrite(mount);
    const script = document.createElement("script");
    script.setAttribute(SCRIPT_FLAG, "1");
    script.src = scriptUrl;
    script.async = false;

    const timer = window.setTimeout(() => {
      restore();
      scriptLoad = null;
      reject(new Error("The quote form took too long to load."));
    }, LOAD_MS);

    script.onload = () => {
      window.clearTimeout(timer);
      restore();
      resolve();
    };
    script.onerror = () => {
      window.clearTimeout(timer);
      restore();
      scriptLoad = null;
      script.remove();
      reject(new Error("The quote form could not be loaded."));
    };
    document.body.appendChild(script);
  });
}

function patchDocumentWrite(mount: HTMLElement): () => void {
  const write = document.write.bind(document);
  const writeln = document.writeln.bind(document);
  const append = (html: string) => {
    mount.insertAdjacentHTML("beforeend", html);
  };
  document.write = (...args: unknown[]) => append(args.join(""));
  document.writeln = (...args: unknown[]) => append(`${args.join("")}\n`);
  return () => {
    document.write = write;
    document.writeln = writeln;
  };
}

function isPartnerFormVisible(mount: HTMLElement): boolean {
  if (
    mount.querySelector(
      "#Qmain-section iframe, #Qmain-section form, #Qmain-section input, #Qmain-section select, #Qmain-section textarea",
    )
  ) {
    return true;
  }
  const section = mount.querySelector("#Qmain-section");
  if (section && section.childElementCount > 0) return true;
  if (mount.querySelector("iframe, form, input, select, textarea")) return true;
  return false;
}

function waitForWidget(mount: HTMLElement): Promise<void> {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const tick = () => {
      if (isPartnerFormVisible(mount)) {
        resolve();
        return;
      }
      if (Date.now() - started > LOAD_MS) {
        reject(new Error("The quote form did not render."));
        return;
      }
      window.setTimeout(tick, 200);
    };
    tick();
  });
}
