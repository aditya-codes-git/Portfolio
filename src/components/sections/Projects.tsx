"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, GitBranch, ArrowRight, Activity, Terminal } from "lucide-react";

interface ProcessProject {
  id: string;
  pid: string;
  name: string;
  status: "SHIPPED" | "RUNNING" | "TRAINING" | "LIVE";
  type: string;
  runtime: string;
  stack: string;
  modules: string[];
  logs: string[];
  buildStatus: string;
  progress: number;
}

const processes: ProcessProject[] = [
  {
    id: "reflow",
    pid: "process://001",
    name: "reflow.exe",
    status: "SHIPPED",
    type: "AI Workspace Manager",
    runtime: "Chrome Extension",
    stack: "JavaScript · AI APIs · Browser APIs",
    modules: ["tab engine", "workspace restore", "AI classifier"],
    logs: ["classifier optimized", "workspace restored"],
    buildStatus: "stable",
    progress: 100
  },
  {
    id: "mini-redis",
    pid: "process://002",
    name: "redis.server",
    status: "RUNNING",
    type: "Cache Engine",
    runtime: "Java Backend Service",
    stack: "Java · TCP/IP · Data Structures",
    modules: ["LRU eviction", "TTL manager", "O(1) operations"],
    logs: ["LRU cache eviction online", "TTL service running"],
    buildStatus: "building",
    progress: 70
  },
  {
    id: "testgen-ai",
    pid: "process://003",
    name: "testgen.ai",
    status: "TRAINING",
    type: "QA Automation",
    runtime: "AI System",
    stack: "Python · LangChain · OpenAI",
    modules: ["test generation", "automation engine", "analysis pipeline"],
    logs: ["generating test suites", "analysis pipeline online"],
    buildStatus: "training",
    progress: 60
  },
  {
    id: "enginow",
    pid: "process://004",
    name: "enginow.dev",
    status: "LIVE",
    type: "Event Platform",
    runtime: "Full Stack Application",
    stack: "React · Next.js · Node.js",
    modules: ["React frontend", "REST API", "database layer"],
    logs: ["socket server active", "database connected"],
    buildStatus: "live",
    progress: 100
  }
];

export const Projects: React.FC = () => {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section id="projects" className="py-24 sm:py-32 border-t border-border-subtle bg-background select-none">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Compact Process Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="space-y-3 max-w-xl text-left">
            <span className="text-xs font-mono tracking-widest text-accent uppercase block">
              // Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground text-gradient">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-secondary-text leading-relaxed font-sans">
              Processes currently running inside my developer workspace.
            </p>
            
            {/* Mobile View All Button */}
            <div className="md:hidden pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#e5e5e5] hover:border-[#cccccc] text-foreground hover:text-accent font-mono text-xs rounded shadow-sm transition-all duration-200 select-none cursor-pointer"
              >
                View All Projects <span className="font-mono">→</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop View All Button */}
          <div className="hidden md:block">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#e5e5e5] hover:border-[#cccccc] text-foreground hover:text-accent font-mono text-xs rounded shadow-sm transition-all duration-200 select-none cursor-pointer"
            >
              View All Projects <span className="font-mono">→</span>
            </Link>
          </div>
        </motion.div>

        {/* Process Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        >
          {processes.map((proc) => (
            <motion.div
              key={proc.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="h-full p-6 bg-white border border-[#e5e5e5] rounded-lg transition-colors duration-300 group-hover:border-neutral-400 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-left flex flex-col justify-between">
                
                {/* Header (Top Row) */}
                <div className="flex items-center justify-between border-b border-border-subtle/55 pb-3 select-none">
                  <span className="font-mono text-xs text-secondary-text/60">
                    {proc.pid}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-accent select-none font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="inline-block text-right">
                      <span className="group-hover:hidden">
                        {proc.status}
                      </span>
                      <span className="hidden group-hover:inline">
                        INSPECT PROCESS
                      </span>
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="flex-1 mt-4 space-y-4">
                  {/* Name and Type */}
                  <div>
                    <h3 className="font-mono text-base font-semibold text-foreground tracking-tight flex items-center gap-1.5">
                      <span className="text-secondary-text/30 font-medium select-none">$</span>
                      <span>{proc.name}</span>
                    </h3>
                    <span className="text-xs text-secondary-text font-sans mt-0.5 block">
                      {proc.type}
                    </span>
                  </div>

                  {/* Runtime and Stack */}
                  <div className="space-y-1.5 text-xs border-t border-border-subtle/30 pt-3.5">
                    <div className="flex justify-between items-center font-sans">
                      <span className="text-[10px] uppercase tracking-wider text-secondary-text font-mono">runtime</span>
                      <span className="text-foreground/90 font-medium">{proc.runtime}</span>
                    </div>
                    <div className="flex justify-between items-center font-sans">
                      <span className="text-[10px] uppercase tracking-wider text-secondary-text font-mono">stack</span>
                      <span className="text-foreground/80 font-mono text-[11px] truncate max-w-[220px]">{proc.stack}</span>
                    </div>
                  </div>

                  {/* Modules Checklist */}
                  <div className="border-t border-border-subtle/30 pt-3.5">
                    <span className="text-[10px] uppercase tracking-wider text-accent font-mono block mb-2 select-none">Modules</span>
                    <ul className="space-y-1.5 font-mono text-xs text-secondary-text">
                      {proc.modules.map((mod, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-accent font-semibold select-none">✓</span>
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* latest.log Preview */}
                  <div className="border-t border-border-subtle/30 pt-3.5">
                    <span className="text-[10px] uppercase tracking-wider text-secondary-text/70 font-mono block mb-2 select-none">latest.log</span>
                    <div className="bg-[#fafafa] border border-[#e5e5e5] p-2.5 rounded font-mono text-[11px] leading-relaxed text-secondary-text/80 select-text">
                      {proc.logs.map((log, idx) => (
                        <div key={idx} className="truncate">
                          <span className="text-secondary-text/40 select-none">&gt;</span> {log}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Build Progress Bar */}
                  <div className="border-t border-border-subtle/30 pt-3.5 space-y-1.5 select-none">
                    <div className="flex justify-between items-center text-xs font-mono text-secondary-text">
                      <span className="text-[10px] uppercase tracking-wider">build</span>
                      <span className="font-semibold text-foreground/80">{proc.buildStatus}</span>
                    </div>
                    <div className="w-full bg-neutral-100 h-2 border border-[#e5e5e5] p-[1px] rounded-sm">
                      <div
                        className="h-full bg-accent/70 rounded-xs transition-all duration-500"
                        style={{ width: `${proc.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Open Button */}
                <div className="border-t border-border-subtle/50 mt-6 pt-4 flex items-center justify-start">
                  <Link
                    href={`/projects/${proc.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-accent group/btn transition-colors cursor-pointer select-none"
                  >
                    Open Process
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
                
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
