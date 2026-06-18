import React from "react";
import { skillCategories } from "@/data/skills";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Code, Server, Database, Brain, Wrench } from "lucide-react";

export const Skills: React.FC = () => {
  // Map icons to categories
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return <Code className="w-4 h-4 text-accent" />;
      case "backend":
        return <Server className="w-4 h-4 text-accent" />;
      case "database":
        return <Database className="w-4 h-4 text-accent" />;
      case "programming":
        return <Brain className="w-4 h-4 text-accent" />;
      default:
        return <Wrench className="w-4 h-4 text-accent" />;
    }
  };

  return (
    <section id="skills" className="py-24 sm:py-32 border-t border-border-subtle bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="Toolbox"
          title="Technical Stack"
          subtitle="Proficiencies and technologies used to architect full-stack applications and systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {skillCategories.map((category) => (
            <Card key={category.category} className="p-6 bg-card flex flex-col gap-4 rounded-md">
              <div className="flex items-center gap-2 border-b border-border-subtle/50 pb-3">
                {getCategoryIcon(category.category)}
                <h3 className="text-sm font-semibold font-mono tracking-wider uppercase text-foreground">
                  {category.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-mono bg-card-alt border border-border-subtle hover:border-accent/30 text-secondary-text hover:text-foreground transition-all duration-200 rounded-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
