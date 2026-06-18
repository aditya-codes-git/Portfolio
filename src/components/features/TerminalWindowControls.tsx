import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TerminalWindowControlsProps {
  onClose: () => void;
  onMinimize: () => void;
  onFullscreen: () => void;
}

export const TerminalWindowControls: React.FC<TerminalWindowControlsProps> = ({
  onClose,
  onMinimize,
  onFullscreen,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const hoverScale = shouldReduceMotion ? 1 : 1.15;
  const tapScale = shouldReduceMotion ? 1 : 0.9;

  return (
    <div className="flex items-center gap-1.5 select-none">
      <motion.button
        type="button"
        aria-label="Close terminal session"
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: tapScale }}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="w-3 h-3 rounded-full bg-red-500/25 border border-red-500/40 hover:bg-red-500/40 hover:border-red-500/60 cursor-pointer transition-colors outline-none"
      />
      <motion.button
        type="button"
        aria-label="Minimize terminal"
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: tapScale }}
        onClick={(e) => {
          e.stopPropagation();
          onMinimize();
        }}
        className="w-3 h-3 rounded-full bg-yellow-500/25 border border-yellow-500/40 hover:bg-yellow-500/40 hover:border-yellow-500/60 cursor-pointer transition-colors outline-none"
      />
      <motion.button
        type="button"
        aria-label="Toggle terminal focus mode"
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: tapScale }}
        onClick={(e) => {
          e.stopPropagation();
          onFullscreen();
        }}
        className="w-3 h-3 rounded-full bg-green-500/25 border border-green-500/40 hover:bg-green-500/40 hover:border-green-500/60 cursor-pointer transition-colors outline-none"
      />
    </div>
  );
};

export default TerminalWindowControls;
