"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Track active section via IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // Triggers active state when section takes substantial screen area
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["about", "projects", "experience", "skills", "achievements", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border-subtle shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-mono text-sm tracking-tight font-medium hover:text-accent transition-colors">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>aditya.pharande</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-xs font-mono transition-colors tracking-tight uppercase",
                  isActive ? "text-accent" : "text-secondary-text hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            );
          })}
          <Button
            href="#contact"
            variant="secondary"
            size="sm"
            className="font-mono text-xs border border-border-subtle"
          >
            Connect <ArrowUpRight className="w-3 h-3" />
          </Button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-secondary-text hover:text-foreground p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border-subtle px-6 py-6 flex flex-col gap-4 shadow-lg">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm font-mono py-2 border-b border-foreground/5 tracking-tight uppercase transition-colors",
                  isActive ? "text-accent" : "text-secondary-text hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            );
          })}
          <Button
            href="#contact"
            onClick={() => setIsOpen(false)}
            variant="primary"
            size="sm"
            className="w-full mt-2"
          >
            Connect
          </Button>
        </div>
      )}
    </header>
  );
};
