"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, useReducedMotion } from "framer-motion";

export const Contact: React.FC = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isMsgFocused, setIsMsgFocused] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage
        })
      });

      if (!response.ok) {
        throw new Error("Failed to transmit packet");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const getLogs = () => {
    switch (status) {
      case "sending":
        return [
          { status: "OK", text: "handshake complete" },
          { status: "SEND", text: "transmitting packet..." },
        ];
      case "success":
        return [
          { status: "OK", text: "handshake complete" },
          { status: "OK", text: "message transmitted" },
          { status: "200", text: "delivered to aditya.mail" },
        ];
      case "error":
        return [
          { status: "ERROR", text: "transmission failed" },
        ];
      case "idle":
      default:
        return [
          { status: "OK", text: "handshake complete" },
          { status: "OK", text: "awaiting message" },
        ];
    }
  };

  // Entrance Variants
  const headerVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30
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

  const leftPanelVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -40
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const rightPanelVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : 40
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  // connection.log animation
  const logContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.4
      }
    }
  };

  const logLineVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -10
    },
    visible: {
      opacity: 0.7,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-border-subtle bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle
            label="CONNECT"
            title="Establish Connection"
            subtitle="Open a communication channel for collaborations, projects, or interesting engineering discussions."
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          
          {/* Left: Server Status Panel Card */}
          <motion.div
            variants={leftPanelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5"
          >
            <Card className="p-6 bg-card border border-border-subtle rounded-md select-none" hoverEffect={false}>
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle/50 mb-4">
                <span className="font-mono text-xs font-semibold text-secondary-text">connection.status</span>
                <span className="text-[10px] font-mono text-secondary-text/30">port: 22 (SSH)</span>
              </div>
              
              <div className="space-y-4">
                <div className="font-mono text-sm text-foreground">
                  <span className="text-accent font-semibold">aditya@portfolio</span><span className="text-secondary-text">:~$</span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-foreground bg-card-alt border border-border-subtle px-3 py-1.5 rounded-sm w-fit">
                  <motion.span
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"
                  />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-500">available</span>
                </div>

                <div className="grid grid-cols-[80px_1fr] gap-y-2 font-mono text-xs border-t border-border-subtle/50 pt-4">
                  <span className="text-secondary-text">location:</span>
                  <span className="text-foreground">Pune, India</span>
                  
                  <span className="text-secondary-text">role:</span>
                  <span className="text-foreground">Full Stack Developer</span>
                  
                  <span className="text-secondary-text">response:</span>
                  <span className="text-foreground">usually &lt;24h</span>
                </div>

                {/* Available Channels */}
                <div className="pt-4 border-t border-border-subtle/50 space-y-2.5">
                  <span className="block font-mono text-[10px] tracking-wider text-secondary-text/50 uppercase">AVAILABLE CHANNELS</span>
                  
                  <div className="flex flex-col gap-2 font-mono text-xs">
                    <motion.a
                      href="https://github.com/aditya-codes-git"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex items-center gap-1.5 text-secondary-text hover:text-accent w-fit cursor-pointer"
                    >
                      <span>&gt; github.connect()</span>
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/aditya-pharande"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex items-center gap-1.5 text-secondary-text hover:text-accent w-fit cursor-pointer"
                    >
                      <span>&gt; linkedin.connect()</span>
                    </motion.a>
                    <motion.a
                      href="mailto:adityapharande2606@gmail.com"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex items-center gap-1.5 text-secondary-text hover:text-accent w-fit cursor-pointer"
                    >
                      <span>&gt; mail.send()</span>
                    </motion.a>
                  </div>
                </div>

                {/* Tiny Connection Log */}
                <div className="pt-4 border-t border-border-subtle/50 space-y-2">
                  <span className="block font-mono text-[10px] tracking-wider text-secondary-text/50 uppercase">connection.log</span>
                  
                  <motion.div
                    key={status}
                    variants={logContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-mono text-[11px] space-y-1"
                  >
                    {getLogs().map((log, i) => (
                      <motion.div
                        key={i}
                        variants={logLineVariants}
                        className="flex items-center gap-1.5 text-secondary-text"
                      >
                        <span
                          className={
                            log.status === "ERROR"
                              ? "text-red-500 font-semibold"
                              : log.status === "SEND"
                              ? "text-amber-500 font-semibold"
                              : "text-emerald-500 font-semibold"
                          }
                        >
                          [{log.status}]
                        </span>{" "}
                        {log.text}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right: Message Terminal JSON Composer */}
          <motion.div
            variants={rightPanelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            <Card className="p-6 bg-card border border-border-subtle rounded-md" hoverEffect={false}>
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle/50 mb-4 select-none">
                <span className="font-mono text-xs font-semibold text-secondary-text">new-message.json</span>
                <span className="text-[10px] font-mono text-secondary-text/30">UTF-8</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="font-mono text-xs text-secondary-text space-y-4">
                  <div className="select-none">{`{`}</div>
                  
                  {/* From Field */}
                  <div className="pl-4 flex flex-col sm:flex-row sm:items-center gap-2">
                    <label htmlFor="name" className="text-accent select-none font-mono">
                      &quot;from&quot;:
                    </label>
                    <div className="relative flex-grow flex items-center">
                      <span
                        className={`absolute left-0 text-accent font-semibold transition-opacity duration-200 select-none ${
                          isNameFocused ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        &gt;
                      </span>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onFocus={() => setIsNameFocused(true)}
                        onBlur={() => setIsNameFocused(false)}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="&quot;Aditya&quot;,"
                        className="w-full pl-4 pr-3 py-1.5 bg-card-alt border border-border-subtle rounded-sm text-foreground placeholder-secondary-text/30 focus:outline-none focus:border-accent transition-colors font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="pl-4 flex flex-col sm:flex-row sm:items-center gap-2">
                    <label htmlFor="email" className="text-accent select-none font-mono">
                      &quot;email&quot;:
                    </label>
                    <div className="relative flex-grow flex items-center">
                      <span
                        className={`absolute left-0 text-accent font-semibold transition-opacity duration-200 select-none ${
                          isEmailFocused ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        &gt;
                      </span>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="&quot;aditya@example.com&quot;,"
                        className="w-full pl-4 pr-3 py-1.5 bg-card-alt border border-border-subtle rounded-sm text-foreground placeholder-secondary-text/30 focus:outline-none focus:border-accent transition-colors font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="pl-4 space-y-2">
                    <label htmlFor="message" className="text-accent block select-none font-mono">
                      &quot;message&quot;: [
                    </label>
                    <div className="relative pl-4">
                      <span
                        className={`absolute left-0 top-2.5 text-accent font-semibold transition-opacity duration-200 select-none ${
                          isMsgFocused ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        &gt;
                      </span>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onFocus={() => setIsMsgFocused(true)}
                        onBlur={() => setIsMsgFocused(false)}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="&quot;Hello, let's connect...&quot;"
                        className="w-full pl-4 pr-3 py-2 bg-card-alt border border-border-subtle rounded-sm text-foreground placeholder-secondary-text/30 focus:outline-none focus:border-accent transition-colors font-mono text-sm resize-none"
                      />
                    </div>
                    <span className="text-accent block select-none font-mono">]</span>
                  </div>
                  <div className="select-none">{`}`}</div>
                </div>

                {/* Developer Send Button */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === "sending"}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  className="w-full text-center min-h-[44px] flex items-center justify-center font-mono mt-4"
                >
                  {status === "sending" ? (
                    <span>executing sendMessage()...</span>
                  ) : status === "success" ? (
                    <span>✓ packet delivered</span>
                  ) : status === "error" ? (
                    <span>[ERROR] transmission failed</span>
                  ) : isButtonHovered ? (
                    <span>sending packet &rarr;</span>
                  ) : (
                    <span>execute sendMessage()</span>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
export default Contact;
