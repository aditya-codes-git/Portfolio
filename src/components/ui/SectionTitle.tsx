import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  label?: string;
  className?: string;
  align?: "left" | "center";
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  label,
  className,
  align = "left",
}) => {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 sm:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {label && (
        <span className="text-xs font-mono tracking-widest text-accent uppercase mb-3 block">
          // {label}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground text-gradient">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-secondary-text max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
