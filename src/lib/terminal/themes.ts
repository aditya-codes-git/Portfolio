export interface TerminalTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    bg: string;
    bgHeader: string;
    fg: string;
    accent: string;
    secondary: string;
    border: string;
    cardBg: string;
    inputBg: string;
  };
}

export const terminalThemes: Record<string, TerminalTheme> = {
  classic: {
    id: "classic",
    name: "Classic",
    description: "Default dark terminal",
    colors: {
      bg: "#0D0D0D",
      bgHeader: "#080808",
      fg: "#F5F5F5",
      accent: "#00D9A3",
      secondary: "#A3A3A3",
      border: "rgba(255, 255, 255, 0.08)",
      cardBg: "#111111",
      inputBg: "#0D0D0D",
    },
  },
  light: {
    id: "light",
    name: "Light",
    description: "Clean light workspace",
    colors: {
      bg: "#FAFAF8",
      bgHeader: "#F0F0EE",
      fg: "#1A1A1A",
      accent: "#0F766E",
      secondary: "#6B7280",
      border: "rgba(0, 0, 0, 0.1)",
      cardBg: "#FFFFFF",
      inputBg: "#F5F5F3",
    },
  },
  contrast: {
    id: "contrast",
    name: "Contrast",
    description: "High contrast orange",
    colors: {
      bg: "#000000",
      bgHeader: "#050505",
      fg: "#FFFFFF",
      accent: "#FF6B35",
      secondary: "#CCCCCC",
      border: "rgba(255, 255, 255, 0.15)",
      cardBg: "#0A0A0A",
      inputBg: "#000000",
    },
  },
  matrix: {
    id: "matrix",
    name: "Matrix",
    description: "Green phosphor CRT",
    colors: {
      bg: "#0A0A0A",
      bgHeader: "#050505",
      fg: "#00FF41",
      accent: "#00FF41",
      secondary: "#00CC33",
      border: "rgba(0, 255, 65, 0.1)",
      cardBg: "#0D0D0D",
      inputBg: "#0A0A0A",
    },
  },
};

const STORAGE_KEY = "terminal_theme";

export function getStoredTheme(): TerminalTheme {
  if (typeof window === "undefined") return terminalThemes.classic;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && terminalThemes[stored]) {
    return terminalThemes[stored];
  }
  return terminalThemes.classic;
}

export function setStoredTheme(themeId: string): TerminalTheme | null {
  if (!terminalThemes[themeId]) return null;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, themeId);
  }
  return terminalThemes[themeId];
}
