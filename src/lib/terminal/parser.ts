import { commands } from "./commands";

export interface ParsedCommand {
  cmdName: string;
  args: string[];
}

/**
 * Parses raw input string into command name and list of arguments.
 */
export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim();
  if (!trimmed) {
    return { cmdName: "", args: [] };
  }

  const parts = trimmed.split(/\s+/);
  const cmdName = parts[0].toLowerCase();
  const args = parts.slice(1);

  return { cmdName, args };
}

/**
 * Provides autocompletion matching for a given input string.
 */
export function autocompleteCommand(input: string, currentDirectory: string): string {
  if (!input) return "";

  // Split by spaces, preserving trailing spaces
  const parts = input.split(/\s+/);
  const lastPart = parts[parts.length - 1];
  const isTrailingSpace = input.endsWith(" ");

  // Case 1: Completing the primary command name
  if (parts.length === 1 && !isTrailingSpace) {
    const cmdKeys = [...Object.keys(commands), "theme"];
    const matches = cmdKeys.filter((key) => key.startsWith(input.toLowerCase()));

    if (matches.length === 1) {
      return matches[0] + " "; // Add space after completion
    }
    if (matches.length > 1) {
      // Find common prefix or return first match
      return matches[0] + " ";
    }
    return input;
  }

  // Case 2: Completing arguments of common commands
  const cmd = parts[0].toLowerCase();

  // cd command completion
  if (cmd === "cd") {
    const folders = currentDirectory === "projects" ? [".."] : ["projects"];
    const targetArg = isTrailingSpace ? "" : lastPart;
    const matches = folders.filter((f) => f.startsWith(targetArg.toLowerCase()));

    if (matches.length === 1) {
      return `cd ${matches[0]}`;
    }
    return input;
  }

  // open command completion
  if (cmd === "open") {
    const targets = ["projects"];
    const targetArg = isTrailingSpace ? "" : lastPart;
    const matches = targets.filter((t) => t.startsWith(targetArg.toLowerCase()));

    if (matches.length === 1) {
      return `open ${matches[0]}`;
    }
    return input;
  }

  // project command completion
  if (cmd === "project") {
    const projects = ["reflow", "redis", "testgen", "enginow", "mini-redis", "testgen-ai"];
    const targetArg = isTrailingSpace ? "" : lastPart;
    const matches = projects.filter((p) => p.startsWith(targetArg.toLowerCase()));

    if (matches.length === 1) {
      return `project ${matches[0]}`;
    }
    if (matches.length > 1) {
      return `project ${matches[0]}`;
    }
    return input;
  }

  // theme command completion
  if (cmd === "theme") {
    const themes = ["classic", "light", "contrast", "matrix"];
    const targetArg = isTrailingSpace ? "" : lastPart;
    const matches = themes.filter((t) => t.startsWith(targetArg.toLowerCase()));

    if (matches.length === 1) {
      return `theme ${matches[0]}`;
    }
    return input;
  }

  return input;
}
