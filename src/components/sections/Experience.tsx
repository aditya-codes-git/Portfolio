"use client";

import React, { useRef } from "react";
import { experiences } from "@/data/experience";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Briefcase } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export const Experience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const timelineRef = useRef<HTMLDivElement>(null);

  // Bind vertical progress line height to page scroll offset
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const animatedHeight = shouldReduceMotion ? "100%" : lineHeight;

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const itemVariants = {
    inactive: {
      opacity: 0.55,
      x: shouldReduceMotion ? 0 : -10
    },
    active: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  const dotVariants = {
    inactive: {
      scale: 1,
      borderColor: "rgba(0, 0, 0, 0.08)",
      backgroundColor: "#FFFFFF"
    },
    active: {
      scale: 1.08,
      borderColor: "var(--color-accent)",
      backgroundColor: "#FFFFFF",
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15
      }
    }
  };

  const iconVariants = {
    inactive: {
      color: "rgba(107, 114, 128, 0.5)"
    },
    active: {
      color: "var(--color-accent)",
      transition: {
        duration: 0.2
      }
    }
  };

  const badgeVariants = {
    inactive: {
      scale: 1,
      borderColor: "rgba(0, 0, 0, 0.08)"
    },
    active: {
      scale: 1.03,
      borderColor: "rgba(107, 114, 128, 0.4)",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  const statusTextVariants = {
    inactive: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -5
    },
    active: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="experience" className="py-24 sm:py-32 border-t border-border-subtle bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle
            label="History"
            title="Professional Experience"
            subtitle="Work and leadership history in software development and tech communities."
          />
        </motion.div>

        <div
          ref={timelineRef}
          className="relative ml-4 sm:ml-6 space-y-12"
        >
          {/* Base timeline vertical line (always visible) */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border-subtle/30" />
          
          {/* Animated progress vertical line */}
          <motion.div
            className="absolute left-0 top-0 w-[1px] bg-accent origin-top"
            style={{ height: animatedHeight }}
          />

          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial="inactive"
              whileInView="active"
              viewport={{ amount: 0.6, once: false }}
              variants={itemVariants}
              className="relative pl-8 sm:pl-10"
            >
              {/* Timeline dot */}
              <motion.div
                variants={dotVariants}
                className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full border flex items-center justify-center z-10"
              >
                <motion.div variants={iconVariants} className="flex items-center justify-center">
                  <Briefcase className="w-3 h-3" />
                </motion.div>
              </motion.div>

              {/* Job Info Block */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5">
                  <div>
                    {/* Tiny execution status */}
                    <motion.div
                      variants={statusTextVariants}
                      className="font-mono text-[10px] text-accent/80 font-medium tracking-tight mb-1"
                    >
                      {exp.period.includes("Present") ? "[✓] active process" : "[✓] executed"}
                    </motion.div>

                    <h3 className="text-lg font-semibold text-foreground tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-accent">
                      {exp.company}
                    </p>
                  </div>
                  <motion.span
                    variants={badgeVariants}
                    className="text-xs font-mono text-secondary-text bg-card-alt px-2.5 py-1 border rounded-sm w-fit transition-colors duration-200"
                  >
                    {exp.period}
                  </motion.span>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-sm text-secondary-text leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="text-accent/80 mt-1.5 select-none text-[8px]">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Experience;
