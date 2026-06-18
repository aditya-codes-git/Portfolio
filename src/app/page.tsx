"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const scrollNeeded = sessionStorage.getItem("scroll_to_terminal");
      if (scrollNeeded === "true") {
        sessionStorage.removeItem("scroll_to_terminal");
        setTimeout(() => {
          const el = document.getElementById("terminal");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 300);
      }
    }
  }, []);

  const fadeUpProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } // Custom elegant cubic bezier for Vercel/Linear feel
  };

  return (
    <>
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <motion.div {...fadeUpProps}>
          <About />
        </motion.div>

        {/* Projects Section */}
        <motion.div {...fadeUpProps}>
          <Projects />
        </motion.div>

        {/* Experience Section */}
        <motion.div {...fadeUpProps}>
          <Experience />
        </motion.div>

        {/* Skills Section */}
        <motion.div {...fadeUpProps}>
          <Skills />
        </motion.div>

        {/* Achievements Section */}
        <motion.div {...fadeUpProps}>
          <Achievements />
        </motion.div>

        {/* Contact Section */}
        <motion.div {...fadeUpProps}>
          <Contact />
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
