export interface Skill {
  name: string;
  level?: string; // e.g. "Advanced", "Intermediate"
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Spring Boot", "REST APIs"]
  },
  {
    category: "Database",
    items: ["MongoDB", "MySQL"]
  },
  {
    category: "Programming",
    items: ["Java", "C++", "DSA"]
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "Docker", "Postman", "Vercel"]
  }
];
