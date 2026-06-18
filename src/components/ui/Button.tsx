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
      primary: "bg-foreground text-background hover:bg-foreground/90 shadow-sm",
      secondary: "bg-card text-foreground border border-border-subtle hover:bg-card-alt hover:border-foreground/15",
      accent: "bg-accent/5 text-accent border border-accent/20 hover:bg-accent/10 hover:border-accent/40",
      ghost: "text-secondary-text hover:text-foreground hover:bg-foreground/5",
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
