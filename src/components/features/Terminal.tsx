"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Terminal as TerminalIcon } from "lucide-react";
import { commands } from "@/lib/terminal/commands";
import { parseCommand, autocompleteCommand } from "@/lib/terminal/parser";
import { TerminalOutput, LogEntry } from "./TerminalOutput";
import { cn } from "@/lib/utils";

export const Terminal: React.FC = () => {
  const router = useRouter();
  const [rawInput, setRawInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState("~");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Focus the terminal input when clicking anywhere on the terminal box
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Scroll to bottom on new logs
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  // Terminal cursor blinking interval
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 550);
    return () => clearInterval(interval);
  }, []);

  // Startup welcome screen animation (runs once per browser session)
  useEffect(() => {
    const welcomeLines = [
      "Initializing portfolio...",
      "Loading developer profile...",
      "",
      "Welcome Aditya.",
      'Type "help" to get started.',
      ""
    ];

    if (typeof window !== "undefined") {
      const visited = sessionStorage.getItem("terminal_visited");

      if (visited === "true") {
        // Skip typing, render welcome immediately
        setLogs([
          {
            id: "welcome-immediate",
            directory: "~",
            command: "",
            output: welcomeLines
          }
        ]);
      } else {
        // Run sequential printing animation
        sessionStorage.setItem("terminal_visited", "true");
        
        let count = 0;
        const printLogs: string[] = [];

        const interval = setInterval(() => {
          if (count < welcomeLines.length) {
            printLogs.push(welcomeLines[count]);
            setLogs([
              {
                id: `welcome-${count}`,
                directory: "~",
                command: "",
                output: [...printLogs]
              }
            ]);
            count++;
          } else {
            clearInterval(interval);
          }
        }, 150);

        return () => clearInterval(interval);
      }
    }
  }, []);

  // Keyboard navigation & execution
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmedInput = rawInput.trim();
      
      if (!trimmedInput) {
        // Empty command
        setLogs((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            directory: currentDirectory,
            command: "",
            output: ""
          }
        ]);
        return;
      }

      // Add to commands history if not identical to the last one
      if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== trimmedInput) {
        setCommandHistory((prev) => [...prev, trimmedInput]);
      }
      setHistoryIndex(-1);

      // Parse and execute
      const { cmdName, args } = parseCommand(trimmedInput);
      const matchedCmd = commands[cmdName];

      let outputResult: React.ReactNode | string | string[] = "";
      let shouldClear = false;

      if (matchedCmd) {
        // Build execution context
        const context = {
          args,
          router,
          currentDirectory,
          setCurrentDirectory: (dir: string) => setCurrentDirectory(dir),
          scrollToContact: () => {
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        };

        const result = matchedCmd.execute(context);
        outputResult = result.output;
        if (result.clearHistory) {
          shouldClear = true;
        }
      } else {
        outputResult = `Command not found: ${cmdName}. Type "help" for available commands.`;
      }

      if (shouldClear) {
        setLogs([]);
      } else {
        setLogs((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            directory: currentDirectory,
            command: trimmedInput,
            output: outputResult
          }
        ]);
      }

      setRawInput("");
    } else if (e.key === "Tab") {
      e.preventDefault(); // Stop default browser focus shifting
      const completed = autocompleteCommand(rawInput, currentDirectory);
      setRawInput(completed);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setRawInput(commandHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setRawInput("");
      } else {
        setHistoryIndex(newIndex);
        setRawInput(commandHistory[newIndex]);
      }
    } else if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="w-full max-w-lg bg-card border border-border-subtle shadow-2xl overflow-hidden font-mono text-sm leading-relaxed rounded-md cursor-text"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#080808] border-b border-border-subtle select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
          <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
        </div>
        <span className="text-xs text-secondary-text/50 select-none">aditya@workstation:~{currentDirectory === "~" ? "" : "/" + currentDirectory}</span>
        <TerminalIcon className="w-3.5 h-3.5 text-secondary-text/30" />
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalBodyRef}
        className="p-5 h-[280px] overflow-y-auto bg-card text-[#F5F5F5] scroll-smooth flex flex-col gap-2"
      >
        <TerminalOutput logs={logs} />

        {/* Input Prompter Row */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-secondary-text/60">aditya@portfolio:~{currentDirectory === "~" ? "" : "/" + currentDirectory}$</span>
          
          <div className="flex-1 relative flex items-center">
            <span className="font-semibold text-[#F5F5F5] whitespace-pre break-all">
              {rawInput}
              <span className={cn(
                "inline-block w-1.5 h-4 bg-accent ml-0.5 align-middle transition-opacity duration-100",
                showCursor ? "opacity-100" : "opacity-0"
              )} />
            </span>

            {/* Hidden Input field capturing native keystrokes */}
            <input
              ref={inputRef}
              type="text"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="opacity-0 absolute inset-0 w-full h-full cursor-text outline-none border-none select-none pointer-events-none"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Terminal;
