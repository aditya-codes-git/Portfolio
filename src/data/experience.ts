export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  description?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "enginow-intern",
    company: "Enginow",
    role: "Full Stack Developer Intern",
    period: "May 2026 - Present",
    bullets: [
      "Built scalable event discovery platform architecture supporting high traffic spikes.",
      "Developed secure, responsive REST APIs and reusable frontend React components.",
      "Managed build pipelines, testing suites, and production deployment workflows on Vercel."
    ]
  },
  {
    id: "csi-president",
    company: "CSI RSCOE",
    role: "President",
    period: "2026 - Present",
    bullets: [
      "Leading an active community of 30+ core developer team members.",
      "Organizing large-scale technical workshops, hackathons, and guest lectures with 500+ participants."
    ]
  }
];

export const achievements: AchievementItem[] = [
  {
    id: "genai-hackathon",
    title: "Google GenAI Hackathon Second Runner-Up",
    description: "Awarded out of 100+ competing teams for building a workspace smart helper Chrome API integration."
  },
  {
    id: "iitb-devfusion",
    title: "IIT Bombay DevFusion 3rd Place",
    description: "Developed and pitched a developer automation testing suite in under 36 hours."
  },
  {
    id: "csi-president-achievement",
    title: "CSI Chapter President",
    description: "Appointed to lead the Computer Society of India student branch for excellence in technical leadership."
  },
  {
    id: "dsa-problems",
    title: "150+ Coding Problems Solved",
    description: "Solved algorithms and data structure challenges across LeetCode, Code Studio, and HackerRank."
  }
];
