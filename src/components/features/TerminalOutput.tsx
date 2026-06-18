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
            <div className="flex items-center gap-2 text-[#F5F5F5]">
              <span className="text-secondary-text/60">aditya@portfolio:~{log.directory === "~" ? "" : "/" + log.directory}$</span>
              <span className="font-semibold text-accent">{log.command}</span>
            </div>
          )}

          {/* Render output based on type */}
          <div className="text-secondary-text pl-2 leading-relaxed">
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
