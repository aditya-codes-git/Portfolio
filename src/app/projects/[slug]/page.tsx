"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import { projectDetails } from "@/data/projectDetails";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Cpu, AlertCircle, HelpCircle, Lightbulb, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const project = projectDetails[resolvedParams.slug];

  if (!project) {
    notFound();
  }

  const fadeUpProps = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-background py-16 sm:py-24 relative overflow-hidden">
        {/* Background radial highlight */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 w-full space-y-16">
          
          {/* Navigation & Header */}
          <motion.div {...fadeUpProps} className="space-y-6">
            <Button href="/projects" variant="ghost" size="sm" className="-ml-3">
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border-subtle pb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-6 h-6 text-accent" />
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-gradient">
                    {project.title}
                  </h1>
                </div>
                <p className="text-sm text-secondary-text font-mono uppercase tracking-wider">
                  {project.subtitle}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                {project.githubUrl && (
                  <Button href={project.githubUrl} variant="secondary" external className="w-full sm:w-auto">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    Source Code
                  </Button>
                )}
                {project.liveUrl && project.liveUrl !== "#" && (
                  <Button href={project.liveUrl} variant="primary" external className="w-full sm:w-auto">
                    Live Demo <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column (Main Specs) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Problem Section */}
              <motion.section {...fadeUpProps} className="space-y-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    The Problem
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-secondary-text leading-relaxed">
                  {project.problem}
                </p>
              </motion.section>

              {/* Architecture Section */}
              <motion.section {...fadeUpProps} className="space-y-6">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    System Architecture
                  </h2>
                </div>

                {/* Architecture flowchart layout */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card-alt p-6 border border-border-subtle rounded-md">
                  {project.architecture.map((node, index) => (
                    <React.Fragment key={index}>
                      <div className="flex-1 w-full bg-card border border-border-subtle rounded-sm px-4 py-3 font-mono text-[10px] sm:text-xs text-center text-foreground font-semibold flex items-center justify-center min-h-[60px] hover:border-accent/30 transition-colors">
                        {node}
                      </div>
                      {index < project.architecture.length - 1 && (
                        <div className="text-accent text-lg font-bold select-none py-1 md:px-1">
                          <span className="hidden md:inline">→</span>
                          <span className="inline md:hidden">↓</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.section>

              {/* Challenges Section */}
              <motion.section {...fadeUpProps} className="space-y-6">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    Technical Challenges & Solutions
                  </h2>
                </div>

                <div className="space-y-6">
                  {project.challenges.map((c, idx) => (
                    <Card key={idx} className="p-6 bg-card rounded-md border border-border-subtle space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-secondary-text uppercase tracking-wider block">
                          Challenge {idx + 1}
                        </span>
                        <h3 className="text-sm sm:text-base font-semibold text-foreground">
                          {c.challenge}
                        </h3>
                      </div>
                      <div className="border-t border-border-subtle/50 pt-4 flex gap-3 items-start">
                        <Lightbulb className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-accent uppercase tracking-wider block">
                            Engineering Solution
                          </span>
                          <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                            {c.solution}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.section>

              {/* Engineering Decisions Section */}
              <motion.section {...fadeUpProps} className="space-y-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    Engineering Decisions
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.decisions.map((d, idx) => (
                    <Card key={idx} className="p-6 bg-card-alt rounded-md border border-border-subtle flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono text-accent uppercase tracking-wider block">
                          Decision
                        </span>
                        <h4 className="text-sm font-semibold text-foreground leading-snug">
                          {d.decision}
                        </h4>
                      </div>
                      <div className="border-t border-border-subtle/50 pt-4 mt-4 space-y-1">
                        <span className="text-[10px] font-mono text-secondary-text uppercase tracking-wider block">
                          Rationale
                        </span>
                        <p className="text-xs text-secondary-text leading-relaxed">
                          {d.reason}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.section>

            </div>

            {/* Right Column (Side Meta) */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
              
              {/* Tech Spec Box */}
              <Card className="p-6 bg-card-alt rounded-md border border-border-subtle space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b border-border-subtle pb-3 uppercase tracking-wider font-mono">
                  Stack Specs
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono bg-card border border-border-subtle text-foreground rounded-xs uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Key Features Box */}
              <Card className="p-6 bg-card rounded-md border border-border-subtle space-y-4">
                <h3 className="text-sm font-semibold text-foreground border-b border-border-subtle pb-3 uppercase tracking-wider font-mono">
                  Core Highlights
                </h3>
                <ul className="space-y-3 pt-1">
                  {project.highlights.map((h, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-secondary-text flex items-start gap-2">
                      <span className="text-accent/80 mt-1 select-none">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Card>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
