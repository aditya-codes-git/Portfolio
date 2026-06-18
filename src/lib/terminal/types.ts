import React from "react";

export interface CommandContext {
  args: string[];
  router: any; // NextRouter
  currentDirectory: string;
  setCurrentDirectory: (dir: string) => void;
  scrollToContact: () => void;
}

export interface Command {
  name: string;
  description: string;
  usage: string;
  execute: (context: CommandContext) => {
    output: React.ReactNode | string | string[];
    clearHistory?: boolean;
  };
}

export type CommandRegistry = Record<string, Command>;
