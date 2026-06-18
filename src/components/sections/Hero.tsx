"use client";

import React from "react";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Terminal } from "@/components/features/Terminal";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const introFadeProps = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  };

  const terminalFadeProps = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-20 lg:py-32 overflow-hidden text-center">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/3 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col items-center">
        {/* Intro Info Content */}
        <motion.div
          {...introFadeProps}
          className="hero-content max-w-[850px] w-full flex flex-col items-center space-y-6"
        >
          {/* Status Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-card border border-border-subtle rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-mono tracking-tight text-secondary-text">
              Available for full-time roles in 2027
            </span>
          </div>

          <div className="space-y-4 w-full flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-gradient">
              Aditya Pharande
            </h1>
            <p className="text-sm sm:text-base font-medium text-accent font-mono">
              // Full Stack Developer & Computer Engineering Student
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F5] max-w-xl">
              "Building reliable software systems and developer tools."
            </h2>
            <p className="text-secondary-text text-sm sm:text-base leading-relaxed max-w-lg">
              I build full-stack applications, backend systems, and developer-focused tools using React, Spring Boot, Node.js, and modern technologies.
            </p>
          </div>

          {/* Current Status Highlights (Left aligned list, centered container) */}
          <div className="border-t border-b border-border-subtle py-4 my-2 max-w-md w-full sm:w-fit sm:min-w-[320px] font-mono text-xs text-secondary-text text-left flex flex-col gap-2.5 px-6">
            <div className="flex items-center gap-2">
              <span className="text-accent">→</span>
              <span>Full Stack Developer Intern @ <strong className="text-foreground font-normal">Enginow</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">→</span>
              <span>President @ <strong className="text-foreground font-normal">CSI RSCOE</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">→</span>
              <span>Competitive Programming & Systems Engineering</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button href="#projects" variant="primary">
              View Projects <ArrowRight className="w-4 h-4" />
            </Button>
            <Button href="/resume.pdf" variant="secondary" external>
              Resume <FileText className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Centerpiece Interactive Terminal */}
        <motion.div
          {...terminalFadeProps}
          className="w-full max-w-[1000px] mt-16 flex justify-center"
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
