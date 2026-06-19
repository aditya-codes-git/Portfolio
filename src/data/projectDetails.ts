export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface EngineeringDecision {
  decision: string;
  reason: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  problem: string;
  architecture: string[];
  challenges: ProjectChallenge[];
  decisions: EngineeringDecision[];
  githubUrl: string;
  liveUrl: string;
}

export const projectDetails: Record<string, ProjectDetail> = {
  reflow: {
    slug: "reflow",
    title: "ReFlow",
    subtitle: "AI-Powered Smart Workspace Manager",
    description: "AI-powered workspace manager that organizes browser tabs into intelligent workspaces.",
    tech: ["JavaScript", "Chrome APIs", "AI APIs", "Browser Storage"],
    highlights: [
      "Handles 100+ browser tabs seamlessly",
      "One-click workspace restoration",
      "Local AI classification engine for group separation"
    ],
    problem: "Modern developers and researchers constantly suffer from 'tab overload', leading to high memory overhead, cluttered screens, and loss of focus when switching context. Existing bookmarking solutions are static and require manual upkeep, while session managers fail to restore active states and fail to intelligently categorize groups.",
    architecture: [
      "Browser Tabs (Active Context)",
      "Tab Engine (Chrome Tabs & Windows APIs)",
      "AI Classifier (Natural Language classification)",
      "Workspace Storage (Manifest V3 Storage / Local IndexedDB)"
    ],
    challenges: [
      {
        challenge: "Chrome Extension memory leaks during tab event observation.",
        solution: "Implemented event debouncing and garbage collector references to release unmounted tab configurations in Manifest V3 service workers."
      },
      {
        challenge: "Classification latency of tab content context titles.",
        solution: "Designed a local text-similarity hashing cache to check known workspace domains before querying the external AI APIs."
      }
    ],
    decisions: [
      {
        decision: "Used Chrome Storage Local over Sync storage.",
        reason: "Workspace configurations for 100+ tabs exceed the 100KB limits of Chrome Sync storage; local storage provides higher storage quotas (up to 5MB) and faster write speeds."
      },
      {
        decision: "Implemented classification on the client side with heuristic thresholds.",
        reason: "Reduces network overhead and ensures workspace sorting remains fast and offline-capable without relying entirely on remote LLM APIs."
      }
    ],
    githubUrl: "https://github.com/aditya-codes-git/reflow",
    liveUrl: ""
  },
  "mini-redis": {
    slug: "mini-redis",
    title: "Mini Redis",
    subtitle: "In-Memory Cache System",
    description: "Redis-inspired in-memory caching system implementing LRU eviction and TTL expiration.",
    tech: ["Java", "Spring Boot", "REST APIs", "Data Structures"],
    highlights: [
      "Constant-time O(1) operations for cache lookups",
      "Custom doubly-linked list LRU eviction engine",
      "High-efficiency TTL scheduler key expiration"
    ],
    problem: "When building distributed backend applications, querying databases repeatedly causes performance bottlenecks and heavy load. A high-speed caching system is required to store hot data in memory, but memory is finite and must be managed dynamically to purge cold keys and expire timed tokens.",
    architecture: [
      "HTTP Request / REST Client",
      "Spring Controller (Routing & HTTP Headers)",
      "Cache Manager (Concurrency Gates & Locks)",
      "HashMap + Custom Doubly-Linked List (O(1) LRU eviction map)",
      "TTL Scheduler (Concurrent HashMap expiration threads)"
    ],
    challenges: [
      {
        challenge: "Thread safety and data corruption in high-concurrency read/write environments.",
        solution: "Wrapped insertion and eviction sequences in Java ReentrantReadWriteLocks, optimizing read throughput while locking write updates."
      },
      {
        challenge: "High memory consumption and overhead during passive timed key expiration.",
        solution: "Engineered a dual active-passive TTL cleanup system: active cleanup runs on a low-priority cron thread, combined with a passive check during key lookups."
      }
    ],
    decisions: [
      {
        decision: "Custom Doubly Linked List over standard Java LinkedHashMap.",
        reason: "Building a custom linked node structure allowed direct optimization of node reference adjustments and cleaner thread lock controls specifically tailored for the LRU eviction policy."
      },
      {
        decision: "REST API interface over raw TCP sockets for initial API validation.",
        reason: "Spring Boot REST endpoints allowed rapid prototype validation, built-in serialization/deserialization, and direct integration with web clients."
      }
    ],
    githubUrl: "https://github.com/aditya-codes-git/mini-redis",
    liveUrl: "#"
  },
  "testgen-ai": {
    slug: "testgen-ai",
    title: "TestGen AI",
    subtitle: "AI QA Automation Platform",
    description: "AI powered QA automation platform that converts requirements to automated Selenium test scripts.",
    tech: ["React", "Node.js", "OCR", "LLM APIs", "Selenium"],
    highlights: [
      "Automated Selenium test script generation",
      "OCR-based layout parsing of mockups",
      "Streamlined QA automation pipeline"
    ],
    problem: "Writing QA automation scripts for web applications is a slow, manual process. Whenever requirement specifications or UI mockups change, QA engineers must rewrite selector targets and update test suites, introducing human error and delaying product releases.",
    architecture: [
      "Requirement Document / UI Mockup Upload",
      "OCR Pipeline (Tesseract / Vision parsing layout)",
      "LLM Processing (Extracting test steps and selector assumptions)",
      "Test Generator (Formatting code to target framework style)",
      "Selenium Executable Runner (Test assertion and feedback)"
    ],
    challenges: [
      {
        challenge: "Vague requirement descriptions causing LLMs to generate hallucinated DOM selectors.",
        solution: "Implemented an OCR layout pre-processor that maps actual coordinates of UI buttons and inputs to provide concrete positional prompts to the LLM."
      },
      {
        challenge: "Selenium tests failing due to asynchronous UI rendering changes.",
        solution: "Injected dynamic Selenium Explicit Waits (`WebDriverWait`) into the generated scripts instead of fixed timeouts, adjusting automatically to page loading times."
      }
    ],
    decisions: [
      {
        decision: "Used Node.js for backend automation runner over Python.",
        reason: "Node.js integrates seamlessly with Selenium Webdriver JS and shares a unified language model and TypeScript typings with the React frontend."
      },
      {
        decision: "Leveraged Vision OCR models instead of raw text parsing.",
        reason: "Vision models extract hierarchical node structures and positional contexts, yielding far better UI structure mapping than simple PDF text extraction."
      }
    ],
    githubUrl: "https://github.com/aditya-codes-git/testgen-ai",
    liveUrl: "#"
  },
  enginow: {
    slug: "enginow",
    title: "Enginow",
    subtitle: "Event Discovery Platform",
    description: "Full stack event discovery platform designed for communities and technical workshop management.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    highlights: [
      "Structured 15+ backend Express REST APIs",
      "Built 20+ responsive dashboard components",
      "Integrated secure authentication and community metrics"
    ],
    problem: "Student and local developer communities lack centralized platforms to announce technical events, manage RSVP registration check-ins, distribute workshop resources, and compile performance metrics for analytics.",
    architecture: [
      "Frontend Dashboard (React SPA)",
      "API Layer (Express Router & REST Middlewares)",
      "Authentication Gateway (JWT + HTTP-Only Cookie validations)",
      "Database Layer (MongoDB Mongoose schemas)"
    ],
    challenges: [
      {
        challenge: "High database load during peak event registration rushes.",
        solution: "Implemented event capacity booking collections with transactional write gates and indexed query scopes on user reservations."
      },
      {
        challenge: "State synchronization of dashboard metrics across multiple client roles.",
        solution: "Designed clean React Context providers and custom fetch query states to refresh dashboards on user register events."
      }
    ],
    decisions: [
      {
        decision: "MongoDB over relational database (SQL).",
        reason: "Event templates are highly dynamic (varying fields for workshop resources, guest hosts, hackathon rules). MongoDB's document schema handles this flexibility without database migrations."
      },
      {
        decision: "Used JWT in HTTP-Only cookies for user sessions.",
        reason: "Protects authorization tokens against Cross-Site Scripting (XSS) attacks compared to storing tokens in localStorage."
      }
    ],
    githubUrl: "https://github.com/aditya-codes-git/enginow",
    liveUrl: "https://enginow-events.vercel.app"
  }
};
