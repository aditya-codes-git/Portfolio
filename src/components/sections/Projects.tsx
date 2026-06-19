"use client";

import React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Card } from "@/components/ui/Card";
import { ExternalLink, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 sm:py-32 border-t border-border-subtle bg-background">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header with View All Projects Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl text-left">
            <span className="text-xs font-mono tracking-widest text-accent uppercase block">
              // Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground text-gradient">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-secondary-text leading-relaxed">
              Engineering systems, developer tooling, and smart browser extensions built for efficiency and scale.
            </p>
            
            {/* Mobile "View All Projects" Button - directly below description */}
            <div className="md:hidden pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-card border border-[#e5e5e5] dark:border-border-subtle hover:border-[#cccccc] dark:hover:border-accent/40 text-foreground hover:text-accent font-medium text-sm rounded shadow-sm transition-all duration-200 select-none cursor-pointer"
              >
                View All Projects <span className="font-mono">→</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop "View All Projects" Button */}
          <div className="hidden md:block">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-card border border-[#e5e5e5] dark:border-border-subtle hover:border-[#cccccc] dark:hover:border-accent/40 text-foreground hover:text-accent font-medium text-sm rounded shadow-sm transition-all duration-200 select-none cursor-pointer"
            >
              View All Projects <span className="font-mono">→</span>
            </Link>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <Card className="h-full p-6 bg-card flex flex-col rounded-md transition-colors duration-300 group-hover:border-accent/30 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] text-left">
                
                {/* Main Content (flex-1 to push button area to bottom) */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-accent" />
                        <h3 className="text-lg font-semibold text-foreground tracking-tight">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-xs text-secondary-text font-mono">
                        {project.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary-text hover:text-foreground transition-colors p-1"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary-text hover:text-foreground transition-colors p-1"
                          aria-label={`Visit ${project.title} live`}
                        >
                          <ExternalLink className="w-4.5 h-4.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-secondary-text leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 border-t border-border-subtle/50 pt-4">
                    <span className="text-[10px] font-mono tracking-wider text-accent uppercase block mb-1">
                      Key Highlights
                    </span>
                    <ul className="space-y-1.5">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-xs text-secondary-text flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-accent" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-6 border-t border-border-subtle/30 pt-4">
                    {project.tech.map((techItem) => (
                      <span
                        key={techItem}
                        className="px-2 py-0.5 text-[10px] font-mono bg-card-alt border border-border-subtle text-secondary-text rounded-sm uppercase tracking-tight"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Open Project CTA Button Area */}
                <div className="border-t border-border-subtle/50 mt-6 pt-4 flex items-center justify-start">
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-foreground hover:text-accent group/btn transition-colors cursor-pointer select-none"
                  >
                    Open {project.title}{" "}
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
                
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Projects;
