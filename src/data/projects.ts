export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "reflow",
    title: "ReFlow",
    subtitle: "AI-Powered Smart Workspace Manager",
    description: "Manifest V3 Chrome extension that manages 100+ browser tabs through intelligent workspace classification.",
    tech: ["JavaScript", "Chrome APIs", "AI APIs", "Browser Storage"],
    highlights: [
      "100+ tabs handled seamlessly",
      "Workspace session restoration",
      "Local/Cloud AI classification engine"
    ],
    githubUrl: "https://github.com/aditya-codes-git/reflow",
    liveUrl: "#"
  },
  {
    id: "miniredis",
    title: "Mini Redis",
    subtitle: "In-Memory Cache System",
    description: "Redis-inspired caching system implementing LRU eviction, TTL expiration, and constant-time retrieval.",
    tech: ["Java", "Spring Boot", "REST APIs", "Data Structures"],
    highlights: [
      "O(1) operations for retrieval and insertion",
      "Custom LRU (Least Recently Used) cache engine",
      "TTL (Time-To-Live) key expiration management"
    ],
    githubUrl: "https://github.com/aditya-codes-git/mini-redis",
    liveUrl: "#"
  },
  {
    id: "testgen-ai",
    title: "TestGen AI",
    subtitle: "AI QA Automation Platform",
    description: "AI-powered QA system that converts requirement documents and UI mockups into automated test cases.",
    tech: ["React", "Node.js", "OCR", "LLM APIs", "Selenium"],
    highlights: [
      "50+ test cases auto-generated per requirement",
      "OCR document layout processing",
      "Selenium test script automation"
    ],
    githubUrl: "https://github.com/aditya-codes-git/testgen-ai",
    liveUrl: "#"
  },
  {
    id: "enginow",
    title: "Enginow Platform",
    subtitle: "Event Discovery Platform",
    description: "Full-stack platform for discovering, organizing, and managing technical events and student developer communities.",
    tech: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    highlights: [
      "Designed and developed 15+ backend REST APIs",
      "Built 20+ responsive React dashboard components",
      "Integrated secure authentication and dashboard metrics system"
    ],
    githubUrl: "https://github.com/aditya-codes-git/enginow",
    liveUrl: "#"
  }
];
