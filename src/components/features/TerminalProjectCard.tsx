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
    <div className="border border-border-subtle bg-card-alt p-4 rounded-sm max-w-sm my-2 text-left font-mono select-none">
      <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-2">
        <span className="text-foreground font-semibold text-sm">{title}</span>
        <span className="text-[10px] text-accent font-mono">{subtitle}</span>
      </div>
      
      {/* Tech list */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tech.map((t) => (
          <span key={t} className="text-[9px] text-secondary-text bg-[#1c1c1c] px-1.5 py-0.5 border border-white/5 rounded-xs uppercase">
            {t}
          </span>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={() => onNavigate(slug)}
        className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-[#00c291] transition-colors font-mono cursor-pointer outline-none focus:ring-1 focus:ring-accent"
      >
        [View Details <ArrowRight className="w-3 h-3" />]
      </button>
    </div>
  );
};
export default TerminalProjectCard;
