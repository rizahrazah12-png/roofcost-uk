import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 min-h-11 px-4 text-sm",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-fg hover:bg-primary-dark",
        secondary:
          "bg-surface text-fg border border-border hover:border-primary hover:text-primary-dark",
        ghost: "bg-transparent text-fg hover:bg-border/40",
        link: "bg-transparent text-primary-dark underline-offset-4 hover:underline min-h-0 px-0",
      },
      size: {
        default: "min-h-11 px-4",
        lg: "min-h-12 px-6 text-base",
        sm: "min-h-9 px-3 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
