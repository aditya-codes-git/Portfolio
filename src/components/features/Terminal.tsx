"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Terminal as TerminalIcon } from "lucide-react";
import { useInView, AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { commands } from "@/lib/terminal/commands";
import { parseCommand, autocompleteCommand } from "@/lib/terminal/parser";
import { TerminalOutput, LogEntry } from "./TerminalOutput";
import { cn } from "@/lib/utils";
import { navigateFromTerminal } from "@/lib/navigation/terminalNavigation";
import { TerminalWindowControls } from "./TerminalWindowControls";
import { getStoredTheme, setStoredTheme, terminalThemes, TerminalTheme } from "@/lib/terminal/themes";
import { getWindowVariants, getRestoreVariants, bodyVariants, terminalTransition } from "@/lib/animations/terminalAnimations";
import { saveTerminalSession, loadTerminalSession, clearTerminalSession } from "@/lib/terminal/session";

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
  const [currentTheme, setCurrentTheme] = useState<TerminalTheme>(terminalThemes.classic);
  const [windowState, setWindowState] = useState({
    minimized: false,
    closed: false,
    fullscreen: false
  });

  const activeTimers = useRef<any[]>([]);
  const shouldRefocus = useRef(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputLineRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion() ?? false;
  const windowVariants = getWindowVariants(shouldReduceMotion);
  const restoreVariants = getRestoreVariants(shouldReduceMotion);

  const handleAnimationComplete = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  // Load stored theme on mount
  useEffect(() => {
    setCurrentTheme(getStoredTheme());
  }, []);

  // Restore terminal session on mount
  useEffect(() => {
    const saved = loadTerminalSession();
    if (saved && saved.logs && saved.logs.length > 0) {
      setLogs(saved.logs);
      setCommandHistory(saved.commandHistory || []);
      setCurrentDirectory(saved.currentDirectory || "~");
      if (saved.theme) {
        setCurrentTheme(saved.theme);
      }
      setHasBooted(true);
    }
  }, []);

  // Handle ESC key globally to exit fullscreen
  useEffect(() => {
    if (!windowState.fullscreen) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setWindowState((prev) => ({ ...prev, fullscreen: false }));
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [windowState.fullscreen]);

  const handleClose = () => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        directory: currentDirectory,
        command: "",
        output: ["closing terminal session...", "connection terminated."]
      }
    ]);
    setTimeout(() => {
      setWindowState((prev) => ({ ...prev, closed: true }));
    }, 600);
  };

  const handleRestore = () => {
    setWindowState((prev) => ({ ...prev, closed: false }));
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        directory: currentDirectory,
        command: "",
        output: ["session restored."]
      }
    ]);
  };

  const handleMinimize = () => {
    const nextMinimized = !windowState.minimized;
    setWindowState((prev) => ({ ...prev, minimized: nextMinimized }));
    if (!nextMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
        if (terminalBodyRef.current) {
          terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
      }, 300);
    }
  };

  const handleFullscreen = () => {
    const nextFullscreen = !windowState.fullscreen;
    setWindowState((prev) => ({ ...prev, fullscreen: nextFullscreen }));
    if (nextFullscreen) {
      setTimeout(() => {
        inputRef.current?.focus();
        if (terminalBodyRef.current) {
          terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
      }, 50);
    }
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    if (windowState.minimized) {
      e.stopPropagation();
      setWindowState((prev) => ({ ...prev, minimized: false }));
      setTimeout(() => {
        inputRef.current?.focus();
        if (terminalBodyRef.current) {
          terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
      }, 300);
    }
  };

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
    if (!hasBooted || windowState.minimized) return;
    inputRef.current?.focus();
    setTimeout(() => {
      inputLineRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  };

  const handleFocus = () => {
    if (!hasBooted || windowState.minimized) return;
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

  // Save terminal session on state changes
  useEffect(() => {
    if (logs.length > 0) {
      const serializedLogs = logs.map((log) => ({
        ...log,
        output: React.isValidElement(log.output)
          ? { type: "component", component: "projects" }
          : log.output,
      }));
      saveTerminalSession({
        logs: serializedLogs,
        commandHistory,
        currentDirectory,
        theme: currentTheme,
      });
    } else if (hasBooted) {
      clearTerminalSession();
    }
  }, [logs, commandHistory, currentDirectory, currentTheme, hasBooted]);

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
        // Handle the theme command locally in Terminal
        if (cmdName === "theme") {
          await sleep(150);
          if (!args[0]) {
            const themeList = Object.values(terminalThemes).map(
              (t) => `  ${t.id === currentTheme.id ? "● " : "  "}${t.id.padEnd(12)} ${t.description}`
            );
            updateLogOutput([
              "Available themes:",
              "",
              ...themeList,
              "",
              'Usage: theme <name>'
            ]);
          } else {
            const newTheme = setStoredTheme(args[0].toLowerCase());
            if (newTheme) {
              setCurrentTheme(newTheme);
              updateLogOutput([`Theme switched to ${newTheme.name}.`]);
            } else {
              const available = Object.keys(terminalThemes).join(", ");
              updateLogOutput([
                `Unknown theme: ${args[0]}`,
                `Available: ${available}`
              ]);
            }
          }
          setIsExecuting(false);
          return;
        }

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
            // Rolling rate limit: allow 20 requests per 10 minutes
            const limit = 20;
            const windowMs = 10 * 60 * 1000;
            const now = Date.now();
            let requests: number[] = [];

            try {
              const stored = localStorage.getItem("terminal_ai_requests");
              if (stored) {
                requests = JSON.parse(stored);
              }
            } catch (e) {
              console.error("Failed to read rate limit data:", e);
            }

            // 1. Remove timestamps older than 10 minutes
            requests = requests.filter((ts) => now - ts < windowMs);

            // 2. Check remaining count
            if (requests.length >= limit) {
              await sleep(150);
              updateLogOutput([
                "My circuits need a short cooldown ☕ Try again soon."
              ]);
              setIsExecuting(false);
              return;
            }

            // Allow request and save current timestamp
            requests.push(now);
            try {
              localStorage.setItem("terminal_ai_requests", JSON.stringify(requests));
            } catch (e) {
              console.error("Failed to save rate limit data:", e);
            }

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
      if (windowState.fullscreen) {
        e.preventDefault();
        setWindowState((prev) => ({ ...prev, fullscreen: false }));
      } else {
        inputRef.current?.blur();
      }
    }
  };

  // Terminal CSS variables derived from theme
  const terminalStyle: React.CSSProperties = {
    fontSize: "clamp(12px, 2vw, 15px)",
    // @ts-ignore - CSS custom properties
    "--term-bg": currentTheme.colors.bg,
    "--term-bg-header": currentTheme.colors.bgHeader,
    "--term-fg": currentTheme.colors.fg,
    "--term-accent": currentTheme.colors.accent,
    "--term-secondary": currentTheme.colors.secondary,
    "--term-border": currentTheme.colors.border,
    "--term-card-bg": currentTheme.colors.cardBg,
    "--term-input-bg": currentTheme.colors.inputBg,
  } as React.CSSProperties;

  return (
    <div className="w-full max-w-[1200px] mx-auto min-h-[100px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {windowState.closed ? (
          <motion.div
            key="restore-btn"
            variants={restoreVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="py-8"
          >
            <button
              onClick={handleRestore}
              className="px-5 py-3 bg-[#111111]/85 border border-[#222222] hover:border-[#00c291]/50 text-[#A3A3A3] hover:text-[#00D9A3] font-mono text-xs rounded-md transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              &gt; restore terminal session
            </button>
          </motion.div>
        ) : (
          <div className="relative w-full flex justify-center">
            <AnimatePresence>
              {windowState.fullscreen && (
                <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  transition={terminalTransition}
                  onClick={() => setWindowState((prev) => ({ ...prev, fullscreen: false }))}
                  className="fixed inset-0 bg-black/70 z-40 cursor-pointer"
                />
              )}
            </AnimatePresence>
            <motion.div
              id="terminal"
              key="terminal-window"
              layoutId="terminal-window"
              variants={windowVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onLayoutAnimationComplete={handleAnimationComplete}
              onAnimationComplete={handleAnimationComplete}
              ref={terminalRef}
              onClick={handleTerminalClick}
              style={terminalStyle}
              className={cn(
                "border shadow-2xl overflow-hidden font-mono leading-relaxed text-left flex flex-col",
                windowState.fullscreen
                  ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[90vw] h-[85dvh] md:h-[85vh] max-w-none max-h-none rounded-lg scale-100 z-50"
                  : "w-full h-auto rounded-lg md:rounded-md scale-100 z-30"
              )}
            >
              {/* Terminal Title Bar */}
              <div
                onClick={handleHeaderClick}
                style={{
                  backgroundColor: "var(--term-bg-header)",
                  borderColor: "var(--term-border)",
                }}
                className={cn(
                  "flex items-center justify-between px-4 py-3 border-b select-none",
                  windowState.minimized ? "cursor-pointer" : ""
                )}
              >
                <TerminalWindowControls
                  onClose={handleClose}
                  onMinimize={handleMinimize}
                  onFullscreen={handleFullscreen}
                />
                <div className="flex items-center gap-1.5">
                  <span
                    style={{ color: "var(--term-secondary)", opacity: 0.5 }}
                    className="text-xs select-none block md:hidden"
                  >
                    terminal {windowState.minimized && "[minimized]"}
                  </span>
                  <span
                    style={{ color: "var(--term-secondary)", opacity: 0.5 }}
                    className="text-xs select-none hidden md:block"
                  >
                    aditya@workstation:~{currentDirectory === "~" ? "" : "/" + currentDirectory} {windowState.minimized && "[minimized]"}
                  </span>
                </div>
                {windowState.fullscreen ? (
                  <span
                    style={{ color: "var(--term-secondary)", opacity: 0.4 }}
                    className="text-[10px] font-mono animate-pulse"
                  >
                    ESC to exit
                  </span>
                ) : (
                  <TerminalIcon className="w-3.5 h-3.5" style={{ color: "var(--term-secondary)", opacity: 0.3 }} />
                )}
              </div>

              <AnimatePresence initial={false}>
                {!windowState.minimized && (
                  <motion.div
                    variants={bodyVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="overflow-hidden flex flex-col flex-1"
                  >
                    {/* Mobile Quick Command Chips */}
                    {hasBooted && (
                      <div
                        style={{
                          backgroundColor: "var(--term-bg)",
                          borderColor: "var(--term-border)",
                        }}
                        className="flex md:hidden items-center gap-2 px-4 py-2 border-b overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none"
                      >
                        <span
                          style={{ color: "var(--term-secondary)", opacity: 0.4 }}
                          className="text-[10px] font-mono uppercase tracking-wider shrink-0"
                        >
                          Quick:
                        </span>
                        {["projects", "skills", "resume", "contact"].map((cmd) => (
                          <button
                            key={cmd}
                            onClick={(e) => {
                              e.stopPropagation(); // Avoid triggering terminal click focus
                              executeCommand(cmd);
                            }}
                            style={{
                              backgroundColor: "var(--term-card-bg)",
                              borderColor: "var(--term-border)",
                              color: "var(--term-accent)",
                            }}
                            className="px-2.5 py-1 border rounded text-[11px] font-mono shrink-0 active:scale-95 transition-transform cursor-pointer"
                          >
                            {cmd}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Terminal Body */}
                    <div
                      ref={terminalBodyRef}
                      style={{
                        backgroundColor: "var(--term-bg)",
                        color: "var(--term-fg)",
                      }}
                      className={cn(
                        "p-4 md:p-5 overflow-y-auto scroll-smooth flex flex-col gap-2",
                        windowState.fullscreen
                          ? "flex-grow"
                          : "h-[450px] md:h-[520px] max-h-[calc(75dvh-44px)] md:max-h-none"
                      )}
                    >
                      <TerminalOutput logs={logs} />

                      {/* Input Prompter Row */}
                      {hasBooted && (
                        <div ref={inputLineRef} className="flex items-center gap-2 mt-1">
                          <span style={{ color: "var(--term-secondary)", opacity: 0.6 }}>
                            aditya@portfolio:~{currentDirectory === "~" ? "" : "/" + currentDirectory}$
                          </span>
                          
                          <div className="flex-1 relative flex items-center">
                            {isExecuting ? (
                              <span
                                style={{ color: "var(--term-secondary)", opacity: 0.5 }}
                                className="font-mono select-none"
                              >
                                processing...
                              </span>
                            ) : rawInput === "" && !isFocused ? (
                              <span
                                style={{ color: "var(--term-secondary)", opacity: 0.5 }}
                                className="font-mono select-none"
                              >
                                Click terminal to start typing...
                              </span>
                            ) : (
                              <span
                                style={{ color: "var(--term-fg)" }}
                                className="font-semibold whitespace-pre break-all"
                              >
                                {rawInput}
                                {isFocused && (
                                  <span 
                                    style={{ color: "var(--term-accent)", animation: 'blink 1s step-start infinite' }}
                                    className="select-none ml-0.5 font-bold"
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
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Terminal;
