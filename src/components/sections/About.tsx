import React from "react";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GraduationCap, Code2, Cpu, Users } from "lucide-react";

export const About: React.FC = () => {
  const pillars = [
    {
      icon: GraduationCap,
      title: "Computer Engineering Student",
      description: "Focusing on systems, algorithms, and networking. Applying theoretical foundations to concrete software engineering challenges."
    },
    {
      icon: Code2,
      title: "Full Stack Development",
      description: "Proficient in frontend interfaces (React/Next.js) and robust backends (Node.js/Spring Boot). Designing clean API contracts."
    },
    {
      icon: Cpu,
      title: "Systems & Architecture",
      description: "Exploring backend architecture, caching systems, and performance-focused software engineering through hands-on projects."
    },
    {
      icon: Users,
      title: "Community & Leadership",
      description: "President of CSI RSCOE chapter, leading a developers' circle, teaching workshops, and managing student hackathons."
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 border-t border-border-subtle bg-background relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="About Me"
          title="Engineering-first approach to building software."
          subtitle="I combine modern frontend web frameworks with typed, high-performance backends to deliver robust software solutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="p-6 bg-card flex flex-col gap-4 rounded-md">
                <div className="w-10 h-10 rounded-sm bg-card-alt border border-border-subtle flex items-center justify-center text-accent">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-foreground tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-secondary-text leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
