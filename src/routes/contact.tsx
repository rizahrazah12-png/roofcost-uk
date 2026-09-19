import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { pageHead } from "@/lib/seo";
import { FormEvent, useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact RoofCost UK",
      description:
        "How to contact RoofCost UK. We do not carry out roofing work. The calculator does not require your personal details.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const email = siteConfig.contactEmail.trim();
  const [subject, setSubject] = useState("Website enquiry");
  const [body, setBody] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Contact", path: "/contact" }]} />
      <h1 className="font-display text-4xl font-semibold">Contact</h1>
      <p className="mt-4 text-muted">
        RoofCost UK does not inspect roofs or book roofing work. If you need a
        contractor, use a written quotation from a qualified professional — and,
        when it is available, the optional quote-comparison step after the
        calculator.
      </p>

      {email ? (
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <p className="text-sm text-muted">
            Messages are opened in your own email app and sent to the site
            operator. Nothing is stored on this website.
          </p>
          <div>
            <label htmlFor="subject" className="mb-1 block font-medium">
              Subject
            </label>
            <input
              id="subject"
              className="min-h-11 w-full rounded-md border border-border bg-surface px-3"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block font-medium">
              Message
            </label>
            <textarea
              id="message"
              className="min-h-32 w-full rounded-md border border-border bg-surface px-3 py-2"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-md bg-primary px-4 font-semibold text-primary-fg"
          >
            Open email to send
          </button>
        </form>
      ) : (
        <div className="mt-8 rounded-lg border border-border bg-surface p-5">
          <p>
            A public inbox is not published yet. Homeowners can use the
            calculator and guides without contacting anyone. Partnership or
            press enquiries will appear here once the operator has configured a
            real contact address.
          </p>
        </div>
      )}
    </main>
  );
}
