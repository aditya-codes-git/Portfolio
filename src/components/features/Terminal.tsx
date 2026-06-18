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
  const [isFocused, setIsFocused] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const activeTimers = useRef<any[]>([]);
  const shouldRefocus = useRef(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Clear active timers on unmount to prevent leaks
  useEffect(() => {
    return () => {
      activeTimers.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Refocus input automatically after execution completes
  useEffect(() => {
    if (!isExecuting && shouldRefocus.current) {
      inputRef.current?.focus();
      shouldRefocus.current = false;
    }
  }, [isExecuting]);

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
    if (isExecuting) return;

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

      // Clear input and enter execution mode
      setRawInput("");
      setIsExecuting(true);
      shouldRefocus.current = true;

      const logId = Math.random().toString();
      
      // Append command prompt line immediately with empty output
      setLogs((prev) => [
        ...prev,
        {
          id: logId,
          directory: currentDirectory,
          command: trimmedInput,
          output: []
        }
      ]);

      const updateLogOutput = (newLines: string[] | React.ReactNode) => {
        setLogs((prev) =>
          prev.map((log) =>
            log.id === logId ? { ...log, output: newLines } : log
          )
        );
      };

      const runStages = async () => {
        const { cmdName, args } = parseCommand(trimmedInput);
        
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

        const sleep = (ms: number) => new Promise((resolve) => {
          const timer = setTimeout(resolve, ms);
          activeTimers.current.push(timer);
        });

        try {
          if (cmdName === "projects") {
            updateLogOutput(["Fetching projects..."]);
            await sleep(500);
            updateLogOutput(["Fetching projects...", "Loading project metadata..."]);
            await sleep(500);
            const res = commands.projects.execute(context);
            updateLogOutput(res.output);
          } else if (cmdName === "resume") {
            updateLogOutput(["Opening resume document..."]);
            await sleep(250);
            updateLogOutput(["Opening resume document...", "Checking file..."]);
            await sleep(250);
            updateLogOutput(["Opening resume document...", "Checking file...", "Launching viewer..."]);
            await sleep(300);
            if (typeof window !== "undefined") {
              window.open("/resume.pdf", "_blank");
            }
            updateLogOutput(["Opening resume document...", "Checking file...", "Launching viewer...", "Done."]);
          } else if (cmdName === "contact") {
            updateLogOutput(["Locating contact section..."]);
            await sleep(400);
            updateLogOutput(["Locating contact section...", "Scrolling..."]);
            await sleep(400);
            context.scrollToContact();
            updateLogOutput(["Locating contact section...", "Scrolling...", "Done."]);
          } else if (cmdName === "open" && args[0] === "projects") {
            updateLogOutput(["Opening projects page..."]);
            await sleep(800);
            context.router.push("/projects");
          } else if (cmdName === "project") {
            const target = args[0]?.toLowerCase();
            const aliasMap: Record<string, string> = {
              reflow: "reflow",
              "mini-redis": "mini-redis",
              redis: "mini-redis",
              "testgen-ai": "testgen-ai",
              testgen: "testgen-ai",
              enginow: "enginow"
            };
            const slug = target ? aliasMap[target] : undefined;
            if (slug) {
              const projectName = slug === "mini-redis" ? "Mini Redis" : slug === "testgen-ai" ? "TestGen AI" : slug.charAt(0).toUpperCase() + slug.slice(1);
              updateLogOutput(["Finding project..."]);
              await sleep(250);
              updateLogOutput(["Finding project...", "Loading architecture..."]);
              await sleep(250);
              updateLogOutput(["Finding project...", "Loading architecture...", `Opening ${projectName} workspace...`]);
              await sleep(300);
              context.router.push(`/projects/${slug}`);
            } else {
              await sleep(150);
              const res = commands.project.execute(context);
              updateLogOutput(res.output);
            }
          } else {
            // Instant commands (help, about, skills, experience, clear, ls, cd)
            const matchedCmd = commands[cmdName];
            if (matchedCmd) {
              if (cmdName === "clear") {
                // Clear immediately
                setLogs([]);
              } else {
                await sleep(150);
                const res = matchedCmd.execute(context);
                updateLogOutput(res.output);
              }
            } else {
              await sleep(150);
              updateLogOutput(`Command not found: ${cmdName}. Type "help" for available commands.`);
            }
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsExecuting(false);
        }
      };

      runStages();
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
      className={cn(
        "w-full max-w-[1000px] h-[400px] md:h-[500px] bg-card border shadow-2xl overflow-hidden font-mono text-sm leading-relaxed rounded-md cursor-text flex flex-col transition-colors duration-200 text-left",
        isFocused ? "border-accent/30" : "border-border-subtle"
      )}
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
        className="p-5 flex-1 overflow-y-auto bg-card text-[#F5F5F5] scroll-smooth flex flex-col gap-2"
      >
        <TerminalOutput logs={logs} />

        {/* Input Prompter Row */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-secondary-text/60">aditya@portfolio:~{currentDirectory === "~" ? "" : "/" + currentDirectory}$</span>
          
          <div className="flex-1 relative flex items-center">
            {isExecuting ? (
              <span className="text-secondary-text/50 font-mono select-none">
                processing...
              </span>
            ) : rawInput === "" && !isFocused ? (
              <span className="text-secondary-text/50 font-mono select-none">
                Click terminal to start typing...
              </span>
            ) : (
              <span className="font-semibold text-[#F5F5F5] whitespace-pre break-all">
                {rawInput}
                {isFocused && (
                  <span 
                    className="text-accent select-none ml-0.5 font-bold" 
                    style={{ animation: 'blink 1s step-start infinite' }}
                  >
                    |
                  </span>
                )}
              </span>
            )}

            {/* Hidden Input field capturing native keystrokes */}
            <input
              ref={inputRef}
              type="text"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isExecuting}
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
