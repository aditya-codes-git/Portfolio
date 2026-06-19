import React from "react";
import { useRouter } from "next/navigation";
import { commands } from "@/lib/terminal/commands";

export interface LogEntry {
  id: string;
  directory: string;
  command: string;
  output: React.ReactNode | string | string[];
}

interface TerminalOutputProps {
  logs: LogEntry[];
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ logs }) => {
  const router = useRouter();

  return (
    <div className="space-y-3.5 select-none">
      {logs.map((log) => (
        <div key={log.id} className="space-y-1.5">
          {/* Prompt command line */}
          {log.command && (
            <div className="flex items-center gap-2" style={{ color: "var(--term-fg)" }}>
              <span className="font-semibold" style={{ color: "var(--term-secondary)", opacity: 0.85 }}>
                aditya@portfolio:~{log.directory === "~" ? "" : "/" + log.directory}$
              </span>
              <span className="font-semibold" style={{ color: "var(--term-accent)" }}>
                {log.command}
              </span>
            </div>
          )}

          {/* Render output based on type */}
          <div
            className="pl-2 leading-relaxed break-words whitespace-pre-wrap [overflow-wrap:anywhere] [word-break:break-word]"
            style={{ color: "var(--term-secondary)" }}
          >
            {React.isValidElement(log.output) ? (
              log.output
            ) : (log.output && typeof log.output === "object" && !Array.isArray(log.output) && (log.output as any).type === "component") ? (
              commands[(log.output as any).component]?.execute({ router } as any).output
            ) : Array.isArray(log.output) ? (
              <div className="space-y-1">
                {log.output.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            ) : (
              <p>{String(log.output)}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default TerminalOutput;

