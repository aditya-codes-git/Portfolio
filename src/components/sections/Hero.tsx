"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Terminal } from "@/components/features/Terminal";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const statusFadeProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }
  };

  const nameFadeProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }
  };

  const descFadeProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }
  };

  const cardsFadeProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }
  };

  const buttonsFadeProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }
  };

  const terminalFadeProps = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] as const }
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center pt-8 pb-20 lg:pt-12 lg:pb-32 overflow-hidden text-center">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/3 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle developer grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative faint background text */}
      <div className="absolute top-16 left-8 font-mono text-[10px] text-foreground/[0.03] select-none pointer-events-none hidden md:block">
        <code>const developer = "Aditya";</code>
      </div>
      <div className="absolute bottom-24 right-8 font-mono text-[10px] text-foreground/[0.03] select-none pointer-events-none hidden md:block">
        <code>console.log(developer.getProjects());</code>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col items-center">
        {/* Intro Info Content Container */}
        <div className="hero-content max-w-[900px] w-full flex flex-col items-center">
          
          {/* System Status Badge */}
          <motion.div 
            {...statusFadeProps}
            className="inline-flex items-center gap-2 px-3 py-1 bg-card border border-border-subtle rounded-full w-fit select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-mono tracking-tight text-secondary-text">
              portfolio.online <span className="text-secondary-text/30">|</span> building systems since 2025
            </span>
          </motion.div>

          {/* Name / Prompt Block */}
          <motion.div 
            {...nameFadeProps}
            className="mt-6 flex flex-col items-center select-none"
          >
            <div className="text-sm font-mono text-secondary-text/60 flex items-center gap-1.5">
              <span className="text-accent">&gt;</span>
              <span>Hello, I'm</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-gradient mt-2">
              Aditya Pharande
            </h1>
          </motion.div>

          {/* Subtitle & Description */}
          <motion.div
            {...descFadeProps}
            className="text-center max-w-2xl mt-4 flex flex-col items-center gap-4"
          >
            <p className="text-lg sm:text-xl font-medium tracking-tight text-[#F5F5F5] leading-relaxed">
              Full Stack Developer building <span className="text-accent font-semibold">developer tools</span>, <span className="text-accent font-semibold">backend systems</span>, and <span className="text-accent font-semibold">interactive web experiences</span>.
            </p>
            <p className="text-secondary-text text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              I turn ideas into production-ready software — from browser extensions and full-stack platforms to backend systems built for performance.
            </p>
          </motion.div>

          {/* Compact Developer Status Cards */}
          <motion.div
            {...cardsFadeProps}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-12"
          >
            {/* Card 1 */}
            <div className="bg-card border border-border-subtle p-5 rounded-lg text-left flex flex-col justify-between min-h-[120px] hover:border-accent/30 transition-all duration-300 group">
              <span className="font-mono text-xs text-secondary-text/40 group-hover:text-accent/50 transition-colors">01</span>
              <div className="mt-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-secondary-text/50 block mb-1">Engineering</span>
                <span className="text-sm font-medium text-[#F5F5F5] leading-tight block">
                  Full Stack Intern <br />
                  <span className="text-secondary-text font-normal">@ Enginow</span>
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-card border border-border-subtle p-5 rounded-lg text-left flex flex-col justify-between min-h-[120px] hover:border-accent/30 transition-all duration-300 group">
              <span className="font-mono text-xs text-secondary-text/40 group-hover:text-accent/50 transition-colors">02</span>
              <div className="mt-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-secondary-text/50 block mb-1">Community</span>
                <span className="text-sm font-medium text-[#F5F5F5] leading-tight block">
                  President <br />
                  <span className="text-secondary-text font-normal">CSI RSCOE</span>
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-card border border-border-subtle p-5 rounded-lg text-left flex flex-col justify-between min-h-[120px] hover:border-accent/30 transition-all duration-300 group">
              <span className="font-mono text-xs text-secondary-text/40 group-hover:text-accent/50 transition-colors">03</span>
              <div className="mt-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-secondary-text/50 block mb-1">Learning</span>
                <span className="text-sm font-medium text-[#F5F5F5] leading-tight block">
                  Systems + <br />
                  <span className="text-secondary-text font-normal">Algorithms</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Developer CTA Buttons */}
          <motion.div
            {...buttonsFadeProps}
            className="flex flex-col items-center gap-3 mt-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="#projects" variant="primary">
                Explore Work <span className="ml-1 font-mono">→</span>
              </Button>
              <Button href="/resume.pdf" variant="secondary" external>
                View Resume <span className="ml-1.5 font-mono text-[10px] opacity-75 border border-border-subtle px-1 py-0.5 rounded bg-card-alt">⌘R</span>
              </Button>
            </div>
            <span className="text-[11px] font-mono text-secondary-text/40 select-none">
              or type <code className="text-accent/70 font-semibold font-mono">"projects"</code> in terminal below
            </span>
          </motion.div>

        </div>

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
