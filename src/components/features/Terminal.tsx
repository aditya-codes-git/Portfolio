"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Terminal as TerminalIcon } from "lucide-react";
import { useInView } from "framer-motion";
import { commands } from "@/lib/terminal/commands";
import { parseCommand, autocompleteCommand } from "@/lib/terminal/parser";
import { TerminalOutput, LogEntry } from "./TerminalOutput";
import { cn } from "@/lib/utils";
import { navigateFromTerminal } from "@/lib/navigation/terminalNavigation";

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
  const [hasBooted, setHasBooted] = useState(false);
  const [amount, setAmount] = useState(0.4);

  const activeTimers = useRef<any[]>([]);
  const shouldRefocus = useRef(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputLineRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Set visibility threshold depending on mobile vs desktop
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAmount(window.innerWidth < 768 ? 0.25 : 0.4);
    }
  }, []);

  const isInView = useInView(terminalRef, { once: true, amount });

  // Clear active timers on unmount to prevent leaks
  useEffect(() => {
    return () => {
      activeTimers.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Refocus input automatically after execution completes
  useEffect(() => {
    if (hasBooted && !isExecuting && shouldRefocus.current) {
      inputRef.current?.focus();
      shouldRefocus.current = false;
    }
  }, [isExecuting, hasBooted]);

  // Focus the terminal input when clicking anywhere on the terminal box
  const handleTerminalClick = () => {
    if (!hasBooted) return;
    inputRef.current?.focus();
    setTimeout(() => {
      inputLineRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  };

  const handleFocus = () => {
    if (!hasBooted) return;
    setIsFocused(true);
    setTimeout(() => {
      inputLineRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 150);
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

  // Boot animation sequence when terminal is scrolled into view
  useEffect(() => {
    if (!isInView || hasBooted) return;

    // 0ms: Initializing portfolio...
    setLogs([
      {
        id: "boot-log",
        directory: "~",
        command: "",
        output: ["Initializing portfolio..."]
      }
    ]);

    // 600ms: Loading developer profile...
    const timer1 = setTimeout(() => {
      setLogs([
        {
          id: "boot-log",
          directory: "~",
          command: "",
          output: ["Initializing portfolio...", "Loading developer profile..."]
        }
      ]);
    }, 600);

    // 1200ms: Welcome Aditya.
    const timer2 = setTimeout(() => {
      setLogs([
        {
          id: "boot-log",
          directory: "~",
          command: "",
          output: [
            "Initializing portfolio...",
            "Loading developer profile...",
            "",
            "Welcome Aditya."
          ]
        }
      ]);
    }, 1200);

    // 1800ms: Type "help" to get started.
    const timer3 = setTimeout(() => {
      setLogs([
        {
          id: "boot-log",
          directory: "~",
          command: "",
          output: [
            "Initializing portfolio...",
            "Loading developer profile...",
            "",
            "Welcome Aditya.",
            'Type "help" to get started.',
            ""
          ]
        }
      ]);
    }, 1800);

    // 2200ms: Enable input
    const timer4 = setTimeout(() => {
      setHasBooted(true);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isInView, hasBooted]);

  // Execute a command directly
  const executeCommand = (cmdText: string) => {
    if (isExecuting) return;
    const trimmedInput = cmdText.trim();
    
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
      const sleep = (ms: number) => new Promise((resolve) => {
        const timer = setTimeout(resolve, ms);
        activeTimers.current.push(timer);
      });

      if (trimmedInput.length > 200) {
        await sleep(150);
        updateLogOutput([
          "Command too long. Keep inputs under 200 characters.",
          "Try: help"
        ]);
        setIsExecuting(false);
        return;
      }

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
          navigateFromTerminal({
            type: "section",
            destination: "contact"
          });
          updateLogOutput(["Locating contact section...", "Scrolling...", "Done."]);
        } else if (cmdName === "open" && args[0] === "projects") {
          updateLogOutput(["Opening projects page..."]);
          await sleep(800);
          navigateFromTerminal({
            type: "route",
            destination: "/projects",
            router
          });
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
            navigateFromTerminal({
              type: "route",
              destination: `/projects/${slug}`,
              router
            });
          } else {
            await sleep(150);
            const res = commands.project.execute(context);
            updateLogOutput(res.output);
          }
        } else {
          // Instant commands (help, about, skills, experience, clear, ls, cd) or AI fallback
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
            // Rate limiting - maximum 10 requests per session
            const limit = 10;
            const count = parseInt(sessionStorage.getItem("terminal_ai_count") || "0", 10);
            if (count >= limit) {
              await sleep(150);
              updateLogOutput([
                "AI quota exhausted. My tiny brain needs rest ☕.",
                "Try normal commands like 'projects'."
              ]);
              setIsExecuting(false);
              return;
            }

            sessionStorage.setItem("terminal_ai_count", (count + 1).toString());

            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
              if (!controller.signal.aborted) {
                controller.abort("timeout");
              }
            }, 8000);

            try {
              const response = await fetch("/api/terminal-ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input: trimmedInput }),
                signal: controller.signal
              });

              clearTimeout(timeoutId);

              if (!response.ok) {
                throw new Error("API returned non-ok status");
              }

              const data = await response.json();
              const reply = data.reply || "My AI circuits are sleeping right now. Try: help";

              const replyLines = reply.split("\n");
              updateLogOutput(replyLines);
            } catch (fetchErr: any) {
              clearTimeout(timeoutId);
              console.error("Groq AI Fallback error:", fetchErr);
              updateLogOutput([
                "My AI circuits are sleeping right now.",
                "Try: help"
              ]);
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsExecuting(false);
      }
    };

    runStages();
  };

  // Keyboard navigation & execution
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isExecuting) return;

    if (e.key === "Enter") {
      executeCommand(rawInput);
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
      id="terminal"
      ref={terminalRef}
      onClick={handleTerminalClick}
      className={cn(
        "w-full max-w-[1000px] h-[450px] md:h-[500px] max-h-[70dvh] md:max-h-none bg-card border shadow-2xl overflow-hidden font-mono leading-relaxed rounded-lg md:rounded-md cursor-text flex flex-col transition-colors duration-200 text-left",
        isFocused ? "border-accent/30" : "border-border-subtle"
      )}
      style={{ fontSize: "clamp(12px, 2vw, 15px)" }}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#080808] border-b border-border-subtle select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
          <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
        </div>
        <span className="text-xs text-secondary-text/50 select-none block md:hidden">terminal</span>
        <span className="text-xs text-secondary-text/50 select-none hidden md:block">aditya@workstation:~{currentDirectory === "~" ? "" : "/" + currentDirectory}</span>
        <TerminalIcon className="w-3.5 h-3.5 text-secondary-text/30" />
      </div>

      {/* Mobile Quick Command Chips */}
      {hasBooted && (
        <div className="flex md:hidden items-center gap-2 px-4 py-2 bg-[#0d0d0d] border-b border-border-subtle overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none">
          <span className="text-[10px] text-secondary-text/40 font-mono uppercase tracking-wider shrink-0">Quick:</span>
          {["projects", "skills", "resume", "contact"].map((cmd) => (
            <button
              key={cmd}
              onClick={(e) => {
                e.stopPropagation(); // Avoid triggering terminal click focus
                executeCommand(cmd);
              }}
              className="px-2.5 py-1 bg-card border border-border-subtle rounded text-[11px] text-accent font-mono hover:bg-card-alt shrink-0 active:scale-95 transition-transform cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>
      )}

      {/* Terminal Body */}
      <div
        ref={terminalBodyRef}
        className="p-4 md:p-5 flex-1 overflow-y-auto bg-card text-[#F5F5F5] scroll-smooth flex flex-col gap-2"
      >
        <TerminalOutput logs={logs} />

        {/* Input Prompter Row */}
        {hasBooted && (
          <div ref={inputLineRef} className="flex items-center gap-2 mt-1">
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
                onFocus={handleFocus}
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
        )}
      </div>
    </div>
  );
};
export default Terminal;
