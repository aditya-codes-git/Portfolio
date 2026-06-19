"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Terminal } from "@/components/features/Terminal";
import { motion } from "framer-motion";

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
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
    <section className="relative min-h-[calc(100vh-72px)] flex flex-col justify-start items-center pt-15 pb-10 lg:pb-12 overflow-hidden text-center">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle developer grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative faint background text */}
      <div className="absolute top-16 left-8 font-mono text-[10.5px] text-foreground/[0.02] select-none pointer-events-none hidden md:block">
        <code>$ git commit -m &quot;keep building&quot;</code>
      </div>
      <div className="absolute top-1/3 right-12 font-mono text-[10.5px] text-foreground/[0.02] select-none pointer-events-none hidden md:block">
        <code>$ npm run ship</code>
      </div>
      <div className="absolute bottom-28 left-12 font-mono text-[10.5px] text-foreground/[0.02] select-none pointer-events-none hidden md:block">
        <code>console.log(&quot;ideas → products&quot;);</code>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col items-center">
        {/* Intro Info Content Container */}
        <div className="hero-content max-w-[900px] w-full flex flex-col items-center -translate-y-8 lg:-translate-y-10">

          {/* System Status Badge */}
          <motion.div
            {...statusFadeProps}
            className="inline-flex items-center gap-2 px-3 py-1 bg-card border border-border-subtle rounded-full w-fit select-none shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-sm font-mono tracking-tight text-secondary-text">
              developer instance active <span className="text-secondary-text/30">|</span> shipping ideas since 2025
            </span>
          </motion.div>

          {/* Name / Prompt Block */}
          <motion.div
            {...nameFadeProps}
            className="mt-3 flex flex-col items-center select-none"
          >
            <div className="text-sm sm:text-base font-mono text-secondary-text/50 flex items-center gap-1.5">
              <span>$ whoami</span>
            </div>
            <h1 className="text-[clamp(2.5rem,8vw,3.75rem)] sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-gradient mt-1">
              Aditya Pharande
            </h1>
          </motion.div>

          {/* Subtitle & Description */}
          <motion.div
            {...descFadeProps}
            className="text-center max-w-2xl mt-2.5 flex flex-col items-center gap-2"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-foreground leading-relaxed">
              Full Stack Developer building <span className="text-accent font-semibold">developer tools</span>, <span className="text-accent font-semibold">backend systems</span>, and <span className="text-accent font-semibold">interactive web experiences</span>.
            </p>
            <p className="text-secondary-text text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-2">
              I turn ideas into production-ready software — from browser extensions and full-stack platforms to backend systems built for performance.
            </p>
          </motion.div>

          {/* Developer Runtime Panel (System Monitor) */}
          <motion.div
            {...cardsFadeProps}
            className="w-full max-w-[850px] bg-white dark:bg-card border border-[#e5e5e5] dark:border-border-subtle rounded-xl p-4 md:p-5 text-left shadow-sm hover:translate-y-[-2px] hover:border-[#cccccc] dark:hover:border-accent/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300 select-none mt-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-border-subtle/50">

              {/* Left Side: System Status */}
              <div className="flex flex-col gap-3 pr-0 md:pr-6">
                <div>
                  <h3 className="text-xs sm:text-sm font-mono tracking-wider text-secondary-text/50 uppercase mb-1.5">System Status</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-xs sm:text-sm font-medium text-foreground">online</span>
                  </div>
                </div>

                <div className="grid grid-cols-[85px_1fr] gap-x-3 gap-y-2 text-xs sm:text-sm font-mono">
                  <span className="text-secondary-text/50">role</span>
                  <span className="font-medium text-foreground">Full Stack Developer</span>

                  <span className="text-secondary-text/50">runtime</span>
                  <span className="font-medium text-foreground">Computer Engineering</span>

                  <span className="text-secondary-text/50">mode</span>
                  <span className="font-medium text-foreground">learning + shipping</span>

                  <span className="text-secondary-text/50">debug</span>
                  <span className="font-medium text-foreground">active</span>
                </div>
              </div>

              {/* Right Side: Running Processes */}
              <div className="flex flex-col gap-3 pl-0 md:pl-6 pt-4 md:pt-0">
                <h3 className="text-xs sm:text-sm font-mono tracking-wider text-secondary-text/50 uppercase mb-1.5">Running Processes</h3>

                <div className="flex flex-col gap-2.5">
                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="text-accent text-[9px]">●</span>
                        <span className="font-semibold text-foreground">reflow.exe</span>
                      </div>
                      <span className="text-secondary-text/50">shipped</span>
                    </div>
                    <span className="text-xs text-secondary-text/50 pl-3 block mt-0.5 leading-none">
                      AI workspace manager
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="text-accent text-[9px]">●</span>
                        <span className="font-semibold text-foreground">mini-redis.server</span>
                      </div>
                      <span className="text-secondary-text/50">experimental</span>
                    </div>
                    <span className="text-xs text-secondary-text/50 pl-3 block mt-0.5 leading-none">
                      cache engine
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="text-accent text-[9px]">●</span>
                        <span className="font-semibold text-foreground">enginow.dev</span>
                      </div>
                      <span className="text-secondary-text/50">live</span>
                    </div>
                    <span className="text-xs text-secondary-text/50 pl-3 block mt-0.5 leading-none">
                      event platform
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Tiny footer inside panel */}
            <div className="border-t border-[#e5e5e5]/80 dark:border-border-subtle/50 mt-4 pt-3 text-xs font-mono text-secondary-text/50">
              $ open projects
            </div>
          </motion.div>

          {/* Developer CTA Buttons */}
          <motion.div
            {...buttonsFadeProps}
            className="flex flex-col items-center gap-2.5 mt-6 w-full"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm sm:max-w-none px-4 sm:px-0">
              <Button href="#projects" variant="primary" className="w-full sm:w-auto min-h-[44px] flex items-center justify-center">
                Explore Work <span className="ml-1 font-mono">→</span>
              </Button>
              <Button
                variant="secondary"
                className="w-full sm:w-auto min-h-[44px] flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenResume) onOpenResume();
                }}
              >
                View Resume <span className="ml-1.5 font-mono text-[10px] opacity-75 border border-border-subtle px-1 py-0.5 rounded bg-card-alt">Ctrl+Enter</span>
              </Button>
            </div>
            <span className="text-xs font-mono text-secondary-text/50 select-none">
              or type <code className="text-accent/70 font-semibold font-mono">&quot;projects&quot;</code> in terminal below
            </span>
          </motion.div>

        </div>

        {/* Centerpiece Interactive Terminal */}
        <motion.div
          id="terminal"
          {...terminalFadeProps}
          className="w-[88vw] max-w-[1400px] mt-10 flex justify-center"
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
