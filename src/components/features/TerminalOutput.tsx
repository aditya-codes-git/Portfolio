import React from "react";

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
  return (
    <div className="space-y-3.5 font-mono text-xs select-none">
      {logs.map((log) => (
        <div key={log.id} className="space-y-1.5">
          {/* Prompt command line */}
          {log.command && (
            <div className="flex items-center gap-2" style={{ color: "var(--term-fg)" }}>
              <span style={{ color: "var(--term-secondary)", opacity: 0.6 }}>
                aditya@portfolio:~{log.directory === "~" ? "" : "/" + log.directory}$
              </span>
              <span className="font-semibold" style={{ color: "var(--term-accent)" }}>
                {log.command}
              </span>
            </div>
          )}

          {/* Render output based on type */}
          <div
            className="pl-2 leading-relaxed break-words [overflow-wrap:anywhere] [word-break:break-word]"
            style={{ color: "var(--term-secondary)" }}
          >
            {React.isValidElement(log.output) ? (
              log.output
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
