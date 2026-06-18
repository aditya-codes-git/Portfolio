"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Mail, MapPin, Send } from "lucide-react";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Clear success message after 4s
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 border-t border-border-subtle bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="Contact"
          title="Get in Touch"
          subtitle="Open for collaboration, interesting projects, or just to chat about systems engineering."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                Let's discuss systems & software.
              </h3>
              <p className="text-sm text-secondary-text leading-relaxed">
                Whether you have an internship opportunity, a project proposal, or want to discuss competitive programming, feel free to send a message.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-border-subtle/50 font-mono text-xs text-secondary-text">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:adityapharande.dev@gmail.com" className="hover:text-foreground transition-colors">
                  adityapharande.dev@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Pune, India</span>
              </div>
            </div>

            {/* Social Grid */}
            <div className="flex items-center gap-4 pt-4 border-t border-border-subtle/50">
              <a
                href="https://github.com/aditya-codes-git"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-card border border-border-subtle flex items-center justify-center text-secondary-text hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/aditya-pharande"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-card border border-border-subtle flex items-center justify-center text-secondary-text hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://twitter.com/adityapharande"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm bg-card border border-border-subtle flex items-center justify-center text-secondary-text hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Contact Form Card */}
          <div className="lg:col-span-7">
            <Card className="p-6 bg-card border border-border-subtle rounded-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-mono text-secondary-text">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Aditya"
                      className="w-full px-3 py-2 text-sm bg-[#050505] border border-border-subtle rounded-sm text-foreground placeholder-secondary-text/30 focus:outline-none focus:border-accent transition-colors font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-mono text-secondary-text">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="aditya@example.com"
                      className="w-full px-3 py-2 text-sm bg-[#050505] border border-border-subtle rounded-sm text-foreground placeholder-secondary-text/30 focus:outline-none focus:border-accent transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-mono text-secondary-text">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello, let's connect..."
                    className="w-full px-3 py-2 text-sm bg-[#050505] border border-border-subtle rounded-sm text-foreground placeholder-secondary-text/30 focus:outline-none focus:border-accent transition-colors font-mono resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === "sending"}
                  className="w-full text-center"
                >
                  {status === "sending" ? (
                    "Sending..."
                  ) : status === "success" ? (
                    "Sent Successfully!"
                  ) : (
                    <>
                      Send Message <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
          
        </div>
      </div>
    </section>
  );
};
