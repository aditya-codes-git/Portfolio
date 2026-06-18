"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Terminal as TerminalIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  // Terminal typing animation states
  const [typedInput, setTypedInput] = useState("");
  const [terminalOutputs, setTerminalOutputs] = useState<string[]>([]);
  const [phase, setPhase] = useState<"typing" | "outputs" | "idle">("typing");

  useEffect(() => {
    const command = "whoami";
    let index = 0;
    
    // Phase 1: Typing command
    const typingTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < command.length) {
          setTypedInput((prev) => prev + command[index]);
          index++;
        } else {
          clearInterval(interval);
          setPhase("outputs");
        }
      }, 150);
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(typingTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "outputs") return;

    const outputs = [
      "> full-stack developer",
      "> problem solver",
      "> builder"
    ];

    let outputIndex = 0;
    const interval = setInterval(() => {
      if (outputIndex < outputs.length) {
        const nextLine = outputs[outputIndex];
        setTerminalOutputs((prev) => [...prev, nextLine]);
        outputIndex++;
      } else {
        clearInterval(interval);
        setPhase("idle");
      }
    }, 400);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center py-12 md:py-20 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Side: Info */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          
          {/* Status Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-card border border-border-subtle rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-mono tracking-tight text-secondary-text">
              Available for full-time roles in 2027
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-gradient">
              Aditya Pharande
            </h1>
            <p className="text-lg sm:text-xl font-medium text-accent font-mono">
              // Full Stack Developer & Computer Engineering Student
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F5] max-w-xl">
              "Building reliable software systems and developer tools."
            </h2>
            <p className="text-secondary-text text-sm sm:text-base leading-relaxed max-w-lg">
              I build full-stack applications, backend systems, and developer-focused tools using React, Spring Boot, Node.js, and modern technologies.
            </p>
          </div>

          {/* Current Status Highlights */}
          <div className="border-t border-b border-border-subtle py-4 my-2 max-w-lg space-y-2.5 font-mono text-xs text-secondary-text">
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
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="#projects" variant="primary">
              View Projects <ArrowRight className="w-4 h-4" />
            </Button>
            <Button href="/resume.pdf" variant="secondary" external>
              Resume <FileText className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Side: Animated Terminal Card */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <Card className="w-full max-w-md bg-card border border-border-subtle shadow-2xl overflow-hidden font-mono text-sm leading-relaxed rounded-md">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#080808] border-b border-border-subtle">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
              </div>
              <span className="text-xs text-secondary-text/50 select-none">aditya@workstation:~</span>
              <TerminalIcon className="w-3.5 h-3.5 text-secondary-text/30" />
            </div>

            {/* Terminal Body */}
            <div className="p-5 min-h-[180px] flex flex-col justify-between bg-card text-[#F5F5F5] space-y-2 select-none">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-accent">$</span>
                  <span className="font-semibold">
                    {typedInput}
                    {phase === "typing" && <span className="animate-pulse">_</span>}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-secondary-text text-sm">
                  {terminalOutputs.map((line, idx) => {
                    if (!line) return null;
                    return (
                      <div key={idx} className="flex gap-2">
                        <span className="text-[#00D9A3]/80">{line.slice(0, 1)}</span>
                        <span>{line.slice(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {phase === "idle" && (
                <div className="flex items-center gap-2 text-xs text-secondary-text/30 border-t border-border-subtle/50 pt-3 mt-4">
                  <span>Press Esc to refresh shell</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
