import React from "react";
import { ArrowRight } from "lucide-react";

interface TerminalProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  slug: string;
  onNavigate: (slug: string) => void;
}

export const TerminalProjectCard: React.FC<TerminalProjectCardProps> = ({
  title,
  subtitle,
  tech,
  slug,
  onNavigate,
}) => {
  return (
    <div
      className="p-4 rounded-sm max-w-none sm:max-w-sm w-full my-2 text-left font-mono select-none"
      style={{
        backgroundColor: "var(--term-card-bg)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--term-border)",
      }}
    >
      <div
        className="flex items-center justify-between pb-2 mb-2"
        style={{ borderBottom: "1px solid var(--term-border)" }}
      >
        <span className="font-semibold text-sm" style={{ color: "var(--term-fg)" }}>{title}</span>
        <span className="text-[10px] font-mono" style={{ color: "var(--term-accent)" }}>{subtitle}</span>
      </div>
      
      {/* Tech list */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tech.map((t) => (
          <span
            key={t}
            className="text-[9px] px-1.5 py-0.5 rounded-xs uppercase"
            style={{
              color: "var(--term-secondary)",
              backgroundColor: "var(--term-bg)",
              border: "1px solid var(--term-border)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={() => onNavigate(slug)}
        className="inline-flex items-center justify-center min-h-[44px] sm:min-h-0 py-2 sm:py-0 gap-1.5 text-xs transition-opacity hover:opacity-80 font-mono cursor-pointer outline-none"
        style={{ color: "var(--term-accent)" }}
      >
        [View Details <ArrowRight className="w-3 h-3" />]
      </button>
    </div>
  );
};
export default TerminalProjectCard;
