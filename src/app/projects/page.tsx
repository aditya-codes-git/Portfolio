"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { projectDetails } from "@/data/projectDetails";
import { Cpu, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const router = useRouter();
  const projectsList = Object.values(projectDetails);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 w-full space-y-12">
          {/* Header */}
          <motion.div {...fadeUpProps} className="space-y-4">
            <Button onClick={handleBack} variant="ghost" size="sm" className="-ml-3">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Button>
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-accent uppercase block">
                // System Registry
              </span>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gradient">
                Engineering Projects
              </h1>
              <p className="text-secondary-text text-sm sm:text-base max-w-xl leading-relaxed">
                In-depth technical index of workspace extensions, memory caches, automated compilers, and event systems.
              </p>
            </div>
          </motion.div>

          {/* Projects Stack */}
          <div className="grid grid-cols-1 gap-8 mt-12">
            {projectsList.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="group"
              >
                <Card className="p-8 bg-card rounded-md border border-border-subtle group-hover:border-accent/20 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Info */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-5 h-5 text-accent" />
                          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                            {project.title}
                          </h2>
                        </div>
                        <p className="text-xs text-secondary-text font-mono tracking-tight uppercase">
                          {project.subtitle}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-secondary-text leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-xs font-mono bg-card-alt border border-border-subtle text-secondary-text rounded-xs uppercase tracking-tight"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Highlights & Action */}
                    <div className="lg:col-span-5 h-full flex flex-col justify-between space-y-6 lg:border-l lg:border-border-subtle/50 lg:pl-8">
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono tracking-wider text-accent uppercase block">
                          Key Performance Metrics
                        </span>
                        <ul className="space-y-2">
                          {project.highlights.map((h, hIdx) => (
                            <li key={hIdx} className="text-xs sm:text-sm text-secondary-text flex items-start gap-2">
                              <span className="text-accent/80 mt-1 select-none">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        href={`/projects/${project.slug}`}
                        variant="primary"
                        className="w-full sm:w-fit text-center"
                      >
                        Explore Deep Dive <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>

                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
