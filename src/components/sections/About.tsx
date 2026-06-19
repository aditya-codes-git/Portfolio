import React from "react";
import { FileText, FileCode, GitBranch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfigState {
  filename: string;
  size: string;
  lang: string;
  code: React.ReactNode;
}

const configStates: Record<string, ConfigState> = {
  default: {
    filename: "developer.config.ts",
    size: "175 B",
    lang: "TypeScript",
    code: (
      <>
        <div>
          <span className="text-[#cf222e]">const</span>{" "}
          <span className="text-[#24292e] font-semibold">aditya</span>{" "}
          <span className="text-[#24292e]">=</span>{" "}
          <span className="text-[#24292e]">{`{`}</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">role</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#116329]">"full-stack developer"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div className="h-4" />
        <div>
          {"  "}
          <span className="text-[#953800]">focus</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#24292e]">[</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"developer tools"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"backend systems"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"AI products"</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#24292e]">],</span>
        </div>
        <div className="h-4" />
        <div>
          {"  "}
          <span className="text-[#953800]">mindset</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#24292e]">{`{`}</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#953800]">build</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#116329]">"ship first"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#953800]">learn</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#116329]">"go deeper"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#953800]">debug</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#0550ae]">true</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#24292e]">{`}`}</span>
        </div>
        <div>
          <span className="text-[#24292e]">{`};`}</span>
        </div>
      </>
    )
  },
  "developer tools": {
    filename: "developerTools.ts",
    size: "142 B",
    lang: "TypeScript",
    code: (
      <>
        <div>
          <span className="text-[#cf222e]">const</span>{" "}
          <span className="text-[#24292e] font-semibold">developerTools</span>{" "}
          <span className="text-[#24292e]">=</span>{" "}
          <span className="text-[#24292e]">{`{`}</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">projects</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#24292e]">[</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"ReFlow"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"TestGen AI"</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#24292e]">],</span>
        </div>
        <div className="h-4" />
        <div>
          {"  "}
          <span className="text-[#953800]">focus</span>
          <span className="text-[#24292e]">:</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#116329]">"building tools that improve workflows"</span>
        </div>
        <div>
          <span className="text-[#24292e]">{`};`}</span>
        </div>
      </>
    )
  },
  "backend systems": {
    filename: "backendSystems.ts",
    size: "115 B",
    lang: "TypeScript",
    code: (
      <>
        <div>
          <span className="text-[#cf222e]">const</span>{" "}
          <span className="text-[#24292e] font-semibold">backendSystems</span>{" "}
          <span className="text-[#24292e]">=</span>{" "}
          <span className="text-[#24292e]">{`{`}</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">exploring</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#24292e]">[</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"APIs"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"caching"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"system design"</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#24292e]">]</span>
        </div>
        <div>
          <span className="text-[#24292e]">{`};`}</span>
        </div>
      </>
    )
  },
  algorithms: {
    filename: "algorithms.ts",
    size: "102 B",
    lang: "TypeScript",
    code: (
      <>
        <div>
          <span className="text-[#cf222e]">const</span>{" "}
          <span className="text-[#24292e] font-semibold">algorithms</span>{" "}
          <span className="text-[#24292e]">=</span>{" "}
          <span className="text-[#24292e]">{`{`}</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">status</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#116329]">"improving"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">platform</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#116329]">"Codeforces"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">goal</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#116329]">"problem solving"</span>
        </div>
        <div>
          <span className="text-[#24292e]">{`};`}</span>
        </div>
      </>
    )
  },
  "system design": {
    filename: "systemDesign.ts",
    size: "120 B",
    lang: "TypeScript",
    code: (
      <>
        <div>
          <span className="text-[#cf222e]">const</span>{" "}
          <span className="text-[#24292e] font-semibold">systemDesign</span>{" "}
          <span className="text-[#24292e]">=</span>{" "}
          <span className="text-[#24292e]">{`{`}</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">patterns</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#24292e]">[</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"microservices"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"event-driven"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"caching layers"</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#24292e]">],</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">focus</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#116329]">"scalability & reliability"</span>
        </div>
        <div>
          <span className="text-[#24292e]">{`};`}</span>
        </div>
      </>
    )
  },
  "engineering fundamentals": {
    filename: "fundamentals.ts",
    size: "135 B",
    lang: "TypeScript",
    code: (
      <>
        <div>
          <span className="text-[#cf222e]">const</span>{" "}
          <span className="text-[#24292e] font-semibold">fundamentals</span>{" "}
          <span className="text-[#24292e]">=</span>{" "}
          <span className="text-[#24292e]">{`{`}</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">study</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#24292e]">[</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"networking"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"databases"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"operating systems"</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#24292e]">],</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">quality</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#116329]">"clean, testable code"</span>
        </div>
        <div>
          <span className="text-[#24292e]">{`};`}</span>
        </div>
      </>
    )
  },
  "AI systems": {
    filename: "aiSystems.ts",
    size: "95 B",
    lang: "TypeScript",
    code: (
      <>
        <div>
          <span className="text-[#cf222e]">const</span>{" "}
          <span className="text-[#24292e] font-semibold">aiSystems</span>{" "}
          <span className="text-[#24292e]">=</span>{" "}
          <span className="text-[#24292e]">{`{`}</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">interest</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#24292e]">[</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"LLMs"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"automation"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"AI tooling"</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#24292e]">]</span>
        </div>
        <div>
          <span className="text-[#24292e]">{`};`}</span>
        </div>
      </>
    )
  },
  "developer experience": {
    filename: "developerExperience.ts",
    size: "130 B",
    lang: "TypeScript",
    code: (
      <>
        <div>
          <span className="text-[#cf222e]">const</span>{" "}
          <span className="text-[#24292e] font-semibold">developerExperience</span>{" "}
          <span className="text-[#24292e]">=</span>{" "}
          <span className="text-[#24292e]">{`{`}</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">philosophy</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#116329]">"reduce developer friction"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#953800]">tools</span>
          <span className="text-[#24292e]">:</span>{" "}
          <span className="text-[#24292e]">[</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"CLIs"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"CI/CD"</span>
          <span className="text-[#24292e]">,</span>
        </div>
        <div>
          {"    "}
          <span className="text-[#116329]">"editor plugins"</span>
        </div>
        <div>
          {"  "}
          <span className="text-[#24292e]">]</span>
        </div>
        <div>
          <span className="text-[#24292e]">{`};`}</span>
        </div>
      </>
    )
  }
};

export const About: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [selected, setSelected] = React.useState<string>("default");

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Matches 'lg:' Tailwind breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSelect = (item: string) => {
    if (selected === item) {
      setSelected("default");
    } else {
      setSelected(item);
    }
  };

  const viewportConfig = { once: true, amount: 0.25 };

  const headerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const readmeVariants = {
    initial: {
      opacity: 0,
      x: isMobile ? 0 : -60,
      y: isMobile ? 30 : 0
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0
    }
  };

  const configVariants = {
    initial: {
      opacity: 0,
      x: isMobile ? 0 : 60,
      y: isMobile ? 30 : 0
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0
    }
  };

  const currentConfig = configStates[selected] || configStates["default"];

  return (
    <section id="about" className="py-12 sm:py-20 lg:py-16 border-t border-border-subtle bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Custom Developer Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          variants={headerVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col mb-8 lg:mb-10 items-start text-left select-none"
        >
          <span className="text-xs font-mono tracking-widest text-accent uppercase mb-1 block">
            // ABOUT
          </span>
          <span className="text-xs font-mono text-secondary-text/60 mb-2 block">
            README.md
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-gradient flex items-center gap-2">
            <span className="text-secondary-text/30 font-mono font-medium select-none">#</span>
            <span>developer_profile</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-secondary-text max-w-xl leading-relaxed font-sans">
            Building software by understanding the layers underneath.
          </p>
        </motion.div>

        {/* Side-by-Side Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel: README.md */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={readmeVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 bg-white border border-[#e5e5e5] rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-neutral-300 flex flex-col lg:h-[clamp(430px,60vh,520px)]"
          >
            {/* Top Bar */}
            <div className="bg-[#f6f8fa] border-b border-[#e5e5e5] px-4 py-3 flex items-center justify-between text-xs text-secondary-text select-none flex-shrink-0">
              <div className="flex items-center gap-2 font-mono font-medium text-foreground">
                <FileText className="w-4 h-4 text-secondary-text" />
                <span>README.md</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-secondary-text">
                <GitBranch className="w-3.5 h-3.5" />
                <span>main</span>
                <span className="text-secondary-text/40">•</span>
                <span>updated recently</span>
              </div>
            </div>

            {/* Panel Body */}
            <div className="p-5 sm:p-6 flex-grow overflow-y-auto scrollbar-thin">
              <h3 className="text-lg font-semibold text-foreground tracking-tight pb-1.5 border-b border-[#e5e5e5] mb-3 flex items-center gap-2 font-sans select-none">
                <span className="text-secondary-text/30 font-mono font-medium text-base">#</span>
                <span>About</span>
              </h3>
              <p className="text-sm text-secondary-text leading-relaxed font-sans mb-4">
                Computer Engineering student focused on building reliable software by exploring how systems work beneath the abstraction.
              </p>

              <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-2 flex items-center gap-2 font-sans select-none">
                <span className="text-secondary-text/30 font-mono font-medium text-xs">##</span>
                <span>Currently</span>
              </h4>

              {/* Interactive File Tree */}
              <pre className="font-mono text-xs sm:text-[13px] leading-snug text-secondary-text bg-[#fafafa] p-3 sm:p-4 rounded border border-[#e5e5e5] overflow-x-auto select-none">
                <span className="text-foreground/90 font-semibold select-none">workspace</span>{"\n"}
                <span className="text-secondary-text/30 select-none">├── </span><span className="text-accent font-medium select-none">config</span>{"\n"}
                <span className="text-secondary-text/30 select-none">│   └── </span>
                <span
                  onClick={() => handleSelect("default")}
                  className={`cursor-pointer transition-colors select-none duration-150 rounded px-1 -mx-1 ${
                    selected === "default"
                      ? "text-accent bg-accent/5 font-semibold"
                      : "text-foreground/80 hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  developer.config.ts
                </span>{"\n"}
                <span className="text-secondary-text/30 select-none">│</span>{"\n"}
                <span className="text-secondary-text/30 select-none">├── </span><span className="text-accent font-medium select-none">building</span>{"\n"}
                <span className="text-secondary-text/30 select-none">│   ├── </span>
                <span
                  onClick={() => handleSelect("developer tools")}
                  className={`cursor-pointer transition-colors select-none duration-150 rounded px-1 -mx-1 ${
                    selected === "developer tools"
                      ? "text-accent bg-accent/5 font-semibold"
                      : "text-foreground/80 hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  developer tools
                </span>{"\n"}
                <span className="text-secondary-text/30 select-none">│   └── </span>
                <span
                  onClick={() => handleSelect("backend systems")}
                  className={`cursor-pointer transition-colors select-none duration-150 rounded px-1 -mx-1 ${
                    selected === "backend systems"
                      ? "text-accent bg-accent/5 font-semibold"
                      : "text-foreground/80 hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  backend systems
                </span>{"\n"}
                <span className="text-secondary-text/30 select-none">│</span>{"\n"}
                <span className="text-secondary-text/30 select-none">├── </span><span className="text-accent font-medium select-none">improving</span>{"\n"}
                <span className="text-secondary-text/30 select-none">│   ├── </span>
                <span
                  onClick={() => handleSelect("algorithms")}
                  className={`cursor-pointer transition-colors select-none duration-150 rounded px-1 -mx-1 ${
                    selected === "algorithms"
                      ? "text-accent bg-accent/5 font-semibold"
                      : "text-foreground/80 hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  algorithms
                </span>{"\n"}
                <span className="text-secondary-text/30 select-none">│   ├── </span>
                <span
                  onClick={() => handleSelect("system design")}
                  className={`cursor-pointer transition-colors select-none duration-150 rounded px-1 -mx-1 ${
                    selected === "system design"
                      ? "text-accent bg-accent/5 font-semibold"
                      : "text-foreground/80 hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  system design
                </span>{"\n"}
                <span className="text-secondary-text/30 select-none">│   └── </span>
                <span
                  onClick={() => handleSelect("engineering fundamentals")}
                  className={`cursor-pointer transition-colors select-none duration-150 rounded px-1 -mx-1 ${
                    selected === "engineering fundamentals"
                      ? "text-accent bg-accent/5 font-semibold"
                      : "text-foreground/80 hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  engineering fundamentals
                </span>{"\n"}
                <span className="text-secondary-text/30 select-none">│</span>{"\n"}
                <span className="text-secondary-text/30 select-none">└── </span><span className="text-accent font-medium select-none">interests</span>{"\n"}
                <span className="text-secondary-text/30 select-none">    ├── </span>
                <span
                  onClick={() => handleSelect("AI systems")}
                  className={`cursor-pointer transition-colors select-none duration-150 rounded px-1 -mx-1 ${
                    selected === "AI systems"
                      ? "text-accent bg-accent/5 font-semibold"
                      : "text-foreground/80 hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  AI systems
                </span>{"\n"}
                <span className="text-secondary-text/30 select-none">    └── </span>
                <span
                  onClick={() => handleSelect("developer experience")}
                  className={`cursor-pointer transition-colors select-none duration-150 rounded px-1 -mx-1 ${
                    selected === "developer experience"
                      ? "text-accent bg-accent/5 font-semibold"
                      : "text-foreground/80 hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  developer experience
                </span>
              </pre>
            </div>

            {/* Bottom Status Bar */}
            <div className="px-5 py-2.5 border-t border-[#e5e5e5] bg-[#fafafa] flex items-center justify-between text-xs text-secondary-text font-mono select-none flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>status: active</span>
                </div>
                <span className="text-secondary-text/30">|</span>
                <div className="flex items-center gap-1.5 text-accent font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>selected: {selected === "default" ? "developer.config.ts" : selected}</span>
                </div>
              </div>
              <div className="hidden sm:block text-[11px] text-secondary-text/60">
                UTF-8
              </div>
            </div>
          </motion.div>

          {/* Right Panel: developer.config.ts */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={configVariants}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 bg-white border border-[#e5e5e5] rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-neutral-300 flex flex-col lg:h-[clamp(430px,60vh,520px)]"
          >
            {/* Top Bar */}
            <div className="bg-[#f6f8fa] border-b border-[#e5e5e5] px-4 py-3 flex items-center justify-between text-xs text-secondary-text select-none flex-shrink-0">
              <div className="flex items-center gap-2 font-mono font-medium text-foreground">
                <FileCode className="w-4 h-4 text-blue-500" />
                <span>{currentConfig.filename}</span>
              </div>
              <div className="font-mono text-[11px] text-secondary-text/60">
                {currentConfig.lang} • {currentConfig.size}
              </div>
            </div>

            {/* Syntax Highlighted Editor Body */}
            <div className="p-5 flex-grow overflow-y-auto scrollbar-thin flex flex-col justify-start">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={selected}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="font-mono text-xs sm:text-[13px] leading-snug text-foreground bg-white overflow-x-auto select-text"
                >
                  <code>
                    {currentConfig.code}
                  </code>
                </motion.pre>
              </AnimatePresence>
            </div>

            {/* Bottom Status Bar */}
            <div className="px-5 py-2.5 border-t border-[#e5e5e5] bg-[#fafafa] flex items-center justify-between text-xs text-secondary-text font-mono select-none flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>lang: {currentConfig.lang}</span>
              </div>
              <div className="hidden sm:block text-[11px] text-secondary-text/60">
                LF
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
