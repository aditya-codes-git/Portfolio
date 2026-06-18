import React from "react";
import { achievements } from "@/data/experience";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Trophy, ShieldCheck, Award, Terminal } from "lucide-react";

export const Achievements: React.FC = () => {
  // Map icons to achievements based on index or keyword
  const getAchievementIcon = (id: string) => {
    if (id.includes("hackathon")) {
      return <Trophy className="w-5 h-5 text-accent" />;
    }
    if (id.includes("devfusion")) {
      return <Award className="w-5 h-5 text-accent" />;
    }
    if (id.includes("president")) {
      return <ShieldCheck className="w-5 h-5 text-accent" />;
    }
    return <Terminal className="w-5 h-5 text-accent" />;
  };

  return (
    <section id="achievements" className="py-20 border-t border-border-subtle bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="Milestones"
          title="Achievements"
          subtitle="Honors, hackathon standings, leadership placements, and problem-solving benchmarks."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {achievements.map((ach) => (
            <Card
              key={ach.id}
              className="p-5 bg-card flex flex-col justify-between rounded-md h-full hover:border-[#00D9A3]/30"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 rounded-sm bg-[#111111] border border-border-subtle flex items-center justify-center">
                  {getAchievementIcon(ach.id)}
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground tracking-tight leading-snug min-h-[40px] flex items-center">
                    {ach.title}
                  </h3>
                  {ach.description && (
                    <p className="text-xs text-secondary-text leading-relaxed">
                      {ach.description}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
