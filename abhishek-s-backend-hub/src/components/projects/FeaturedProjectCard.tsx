import React from "react";
import { ExternalLink, GitBranch, Sparkles, CheckCircle2 } from "lucide-react";
import { ALL_PROJECTS } from "./projectsData";
import FeaturedArchitectureDiagram from "./FeaturedArchitectureDiagram";

export const FeaturedProjectCard: React.FC = () => {
  const project = ALL_PROJECTS.find((p) => p.featured) || ALL_PROJECTS[0];

  return (
    <div className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-primary/30 bg-card/75 backdrop-blur-xl shadow-2xl overflow-hidden mb-10 sm:mb-14 group">
      {/* Decorative Cybernetic Frame Corners */}
      <div className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-2xl sm:rounded-tl-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-r-2 border-primary/60 rounded-tr-2xl sm:rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-l-2 border-accent/60 rounded-bl-2xl sm:rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 border-accent/60 rounded-br-2xl sm:rounded-br-3xl pointer-events-none" />

      {/* Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-accent/8 blur-[100px]"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 sm:gap-8 lg:gap-12 items-center relative z-10">
        {/* Block 1: Header (Title, Eyebrow, Tagline) -> Order 1 on Mobile, Left-Top on Desktop */}
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          {/* Case Study Eyebrow */}
          <div className="flex flex-wrap items-center gap-2 mb-2.5 sm:mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-primary/15 text-primary border border-primary/30 shadow-sm">
              <Sparkles size={13} className="text-accent" />
              FEATURED AI CASE STUDY
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground/80 px-2 py-0.5 rounded bg-secondary/80 border border-border/80">
              {project.systemMeta.type}
            </span>
          </div>

          {/* Main Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-heading mb-2 sm:mb-3">
            {project.title}
          </h3>

          {/* Sub-tagline */}
          <p className="text-xs sm:text-sm font-mono text-accent">
            {project.tagline}
          </p>
        </div>

        {/* Block 2: Architecture Diagram -> Order 2 on Mobile, Right Column on Desktop */}
        <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full">
          <FeaturedArchitectureDiagram />
        </div>

        {/* Block 3: Details (Summary, Capabilities, Tech, Links) -> Order 3 on Mobile, Left-Bottom on Desktop */}
        <div className="order-3 lg:col-start-1 lg:row-start-2 flex flex-col justify-between space-y-5 sm:space-y-6">
          {/* Concise Description */}
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Key Capabilities Grid */}
          <div>
            <span className="text-xs font-mono font-semibold tracking-wider text-foreground uppercase block mb-3">
              KEY CAPABILITIES & ARCHITECTURE:
            </span>
            <ul className="grid sm:grid-cols-2 gap-2 sm:gap-2.5">
              {project.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-muted-foreground/90 leading-normal"
                >
                  <CheckCircle2
                    size={14}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Badges */}
          <div className="pt-3 sm:pt-4 border-t border-border/60">
            <span className="text-[10px] font-mono text-muted-foreground uppercase block mb-2 tracking-wider">
              CORE TECHNOLOGIES:
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 sm:px-3 py-1 text-xs font-mono rounded-lg bg-secondary/80 text-foreground border border-border/80 transition-colors hover:border-primary/50 hover:text-primary shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Verified GitHub Action Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-primary text-primary-foreground transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:brightness-110 active:scale-[0.98] min-h-[44px]"
            >
              <GitBranch size={15} />
              <span>EXPLORE SOURCE ON GITHUB</span>
              <ExternalLink size={13} className="ml-0.5 opacity-80" />
            </a>

            <span className="text-[11px] font-mono text-muted-foreground/80 text-center sm:text-left">
              VERIFIED ARCHITECTURE REPO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectCard;
