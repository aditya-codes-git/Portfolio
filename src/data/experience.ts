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
    description: "Placed 3rd out of 100+ teams for building an AI-powered smart browser workspace manager."
  },
  {
    id: "iitb-devfusion",
    title: "IIT Bombay DevFusion 3rd Place",
    description: "Secured 3rd place in 36-hour hackathon for building an automated test generation platform."
  },
  {
    id: "csi-president-achievement",
    title: "CSI Chapter President",
    description: "Elected to lead the Computer Society of India student branch, directing events and workshops."
  },
  {
    id: "dsa-problems",
    title: "150+ Coding Problems Solved",
    description: "Solved data structures and algorithms problems across LeetCode, CodeStudio, and HackerRank."
  }
];
