import React from "react";
import { experiences } from "@/data/experience";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Briefcase } from "lucide-react";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-border-subtle bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="History"
          title="Professional Experience"
          subtitle="Work and leadership history in software development and tech communities."
        />

        <div className="relative border-l border-border-subtle ml-4 sm:ml-6 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="relative pl-8 sm:pl-10">
              
              {/* Timeline dot */}
              <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-card border border-border-subtle flex items-center justify-center">
                <Briefcase className="w-3 h-3 text-accent" />
              </div>

              {/* Job Info */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-accent">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-secondary-text bg-card-alt px-2.5 py-1 border border-border-subtle rounded-sm w-fit">
                    {exp.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-sm text-secondary-text leading-relaxed flex items-start gap-2.5">
                      <span className="text-accent/80 mt-1.5 select-none text-[8px]">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
