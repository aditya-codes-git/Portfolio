import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = "primary", hoverEffect = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border border-border-subtle overflow-hidden transition-all duration-300",
          variant === "primary" ? "bg-card" : "bg-card-alt",
          hoverEffect && "hover:border-foreground/12 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
