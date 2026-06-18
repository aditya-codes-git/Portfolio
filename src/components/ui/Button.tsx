import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  ({ className, children, href, variant = "primary", size = "md", external, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent rounded-sm active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-[#F5F5F5] text-[#050505] hover:bg-[#E5E5E5] shadow-[0_1px_2px_rgba(255,255,255,0.05)_inset]",
      secondary: "bg-[#0D0D0D] text-[#F5F5F5] border border-border-subtle hover:bg-[#111111] hover:border-white/15",
      accent: "bg-[#00D9A3]/5 text-[#00D9A3] border border-[#00D9A3]/20 hover:bg-[#00D9A3]/10 hover:border-[#00D9A3]/40",
      ghost: "text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#0D0D0D]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs font-mono tracking-tight gap-1.5",
      md: "px-5 py-2.5 text-sm gap-2",
      lg: "px-7 py-3.5 text-base gap-2.5",
    };

    const combinedClass = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClass}
            ref={ref as any}
            {...(props as any)}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClass} ref={ref as any} {...(props as any)}>
          {children}
        </Link>
      );
    }

    return (
      <button className={combinedClass} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
