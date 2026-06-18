import React from "react";
import { CommandRegistry } from "./types";
import { projectDetails } from "@/data/projectDetails";
import { TerminalProjectCard } from "@/components/features/TerminalProjectCard";
import { navigateFromTerminal } from "@/lib/navigation/terminalNavigation";

// Helper component to render project list in terminal
const TerminalProjectsList: React.FC<{ router: any }> = ({ router }) => {
  const projectsList = Object.values(projectDetails);

  const handleNavigate = (slug: string) => {
    navigateFromTerminal({
      type: "route",
      destination: `/projects/${slug}`,
      router,
    });
  };

  return React.createElement(
    "div",
    { className: "mt-2 space-y-4" },
    React.createElement("p", { className: "text-secondary-text" }, "Fetching projects..."),
    React.createElement(
      "div",
      { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
      projectsList.map((project) =>
        React.createElement(TerminalProjectCard, {
          key: project.slug,
          title: project.title,
          subtitle: project.subtitle,
          description: project.description,
          tech: project.tech,
          slug: project.slug,
          onNavigate: handleNavigate,
        })
      )
    )
  );
};

export const commands: CommandRegistry = {
  help: {
    name: "help",
    description: "Lists all available commands.",
    usage: "help",
    execute: () => ({
      output: [
        "Available Commands",
        "",
        "General:",
        "  about         - Display profile overview",
        "  projects      - List featured projects",
        "  skills        - List technical skills",
        "  experience    - Show work and leadership history",
        "  contact       - Scroll to contact details",
        "  resume        - Open resume document",
        "  clear         - Reset terminal logs",
        "",
        "Navigation:",
        "  open projects - Go to projects portfolio page",
        "  project <name>- Open detail page for a specific project"
      ]
    })
  },
  about: {
    name: "about",
    description: "Shows biography information.",
    usage: "about",
    execute: () => ({
      output: [
        "Aditya Pharande",
        "",
        "Full Stack Developer",
        "Computer Engineering Student",
        "",
        "Building developer tools,",
        "backend systems,",
        "and scalable applications."
      ]
    })
  },
  skills: {
    name: "skills",
    description: "Lists grouped technical proficiencies.",
    usage: "skills",
    execute: () => ({
      output: [
        "Frontend",
        "  → React",
        "  → Next.js",
        "  → TypeScript",
        "  → Tailwind",
        "",
        "Backend",
        "  → Spring Boot",
        "  → Node.js",
        "  → Express",
        "",
        "Languages",
        "  → Java",
        "  → C++",
        "  → JavaScript",
        "",
        "Tools",
        "  → Docker",
        "  → Git",
        "  → Postman"
      ]
    })
  },
  experience: {
    name: "experience",
    description: "Displays work and community history.",
    usage: "experience",
    execute: () => ({
      output: [
        "Current Roles",
        "",
        "✓ Full Stack Developer Intern",
        "  Enginow",
        "  Building full-stack event platform",
        "",
        "✓ President",
        "  CSI RSCOE",
        "  Leading developer community"
      ]
    })
  },
  clear: {
    name: "clear",
    description: "Clears the console logs.",
    usage: "clear",
    execute: () => ({
      output: "",
      clearHistory: true
    })
  },
  contact: {
    name: "contact",
    description: "Navigates to the page contact block.",
    usage: "contact",
    execute: (context) => {
      context.scrollToContact();
      return { output: "Opening contact section..." };
    }
  },
  resume: {
    name: "resume",
    description: "Accesses the PDF resume document.",
    usage: "resume",
    execute: () => {
      if (typeof window !== "undefined") {
        window.open("/resume.pdf", "_blank");
      }
      return { output: "Opening resume..." };
    }
  },
  ls: {
    name: "ls",
    description: "Lists files in the current folder.",
    usage: "ls",
    execute: (context) => {
      if (context.currentDirectory === "projects") {
        return {
          output: [
            "reflow",
            "mini-redis",
            "testgen-ai",
            "enginow"
          ]
        };
      }
      return {
        output: [
          "about.md",
          "projects/",
          "skills.json",
          "experience.log",
          "contact.txt",
          "resume.pdf"
        ]
      };
    }
  },
  cd: {
    name: "cd",
    description: "Changes the current shell folder.",
    usage: "cd [folder]",
    execute: (context) => {
      const folder = context.args[0];
      if (!folder || folder === "~" || folder === "/") {
        context.setCurrentDirectory("~");
        return { output: "" };
      }
      if (folder === "..") {
        context.setCurrentDirectory("~");
        return { output: "" };
      }
      if (folder === "projects") {
        context.setCurrentDirectory("projects");
        return { output: "" };
      }
      return { output: `cd: no such file or directory: ${folder}` };
    }
  },
  projects: {
    name: "projects",
    description: "Renders details cards for all development items.",
    usage: "projects",
    execute: (context) => ({
      output: React.createElement(TerminalProjectsList, { router: context.router })
    })
  },
  project: {
    name: "project",
    description: "Opens details page for a specific project.",
    usage: "project [name]",
    execute: (context) => {
      const target = context.args[0]?.toLowerCase();
      if (!target) {
        return { output: "Usage: project <name>. Type 'projects' to see names." };
      }

      const aliasMap: Record<string, string> = {
        reflow: "reflow",
        "mini-redis": "mini-redis",
        redis: "mini-redis",
        "testgen-ai": "testgen-ai",
        testgen: "testgen-ai",
        enginow: "enginow"
      };

      const slug = aliasMap[target];
      if (slug) {
        navigateFromTerminal({
          type: "route",
          destination: `/projects/${slug}`,
          router: context.router,
        });
        const projectName = slug === "mini-redis" ? "Mini Redis" : slug === "testgen-ai" ? "TestGen AI" : slug.charAt(0).toUpperCase() + slug.slice(1);
        return { output: `Opening ${projectName}...` };
      }

      return {
        output: [
          "Project not found.",
          "Type \"projects\" to view available projects."
        ]
      };
    }
  },
  open: {
    name: "open",
    description: "Opens specific sections or pages.",
    usage: "open projects",
    execute: (context) => {
      const target = context.args[0];
      if (target === "projects") {
        navigateFromTerminal({
          type: "route",
          destination: "/projects",
          router: context.router,
        });
        return { output: "Opening projects page..." };
      }
      return { output: "Usage: open projects" };
    }
  }
};
