"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const BackToTerminal: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const isTerminalNav = sessionStorage.getItem("terminal_navigation") === "true";
      setVisible(isTerminalNav);
    };

    // Run check on mount and pathname change
    checkVisibility();

    // Listen for custom terminal navigated events
    window.addEventListener("terminal_navigated", checkVisibility);
    return () => {
      window.removeEventListener("terminal_navigated", checkVisibility);
    };
  }, [pathname]);

  const handleReturn = () => {
    if (typeof window === "undefined") return;

    sessionStorage.removeItem("terminal_navigation");
    setVisible(false);

    if (pathname === "/") {
      const el = document.getElementById("terminal");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      sessionStorage.setItem("scroll_to_terminal", "true");
      router.push("/");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onClick={handleReturn}
          className="fixed bottom-6 right-6 z-50 bg-[#111111]/90 backdrop-blur-sm border border-[#222222] hover:border-[#00D9A3]/50 text-[#00D9A3] hover:text-[#00D9A3]/80 font-mono text-xs px-4 py-2.5 rounded-md shadow-xl transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
        >
          <span className="hidden sm:inline">↩ Back to Terminal</span>
          <span className="inline sm:hidden">↩ Terminal</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTerminal;
