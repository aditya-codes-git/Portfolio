const SESSION_KEY = "aditya-terminal-session";

export interface SerializedLogEntry {
  id: string;
  directory: string;
  command: string;
  output: any; // Can be string, string[], or a serialized component marker
}

export interface TerminalSessionData {
  logs: SerializedLogEntry[];
  commandHistory: string[];
  currentDirectory: string;
  theme: any; // Theme object from themes.ts
}

export function saveTerminalSession(session: TerminalSessionData) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error("Failed to save terminal session:", error);
  }
}

export function loadTerminalSession(): TerminalSessionData | null {
  if (typeof window === "undefined") return null;
  try {
    const data = window.sessionStorage.getItem(SESSION_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load terminal session:", error);
    return null;
  }
}

export function clearTerminalSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SESSION_KEY);
}
