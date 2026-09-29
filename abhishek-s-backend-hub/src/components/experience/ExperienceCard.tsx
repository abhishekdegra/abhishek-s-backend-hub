import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ExperienceItem } from "./experienceData";
import { Briefcase, Calendar, CheckCircle2, Sparkles, Terminal } from "lucide-react";
import TiltCard from "@/components/animations/TiltCard";

interface ExperienceCardProps {
  experience: ExperienceItem;
  isActivated: boolean;
  isCurrent: boolean;
  index: number;
}

export const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(
  ({ experience, isActivated, isCurrent, index }, ref) => {
    return (
      <div ref={ref} className="relative w-full">
        <TiltCard
          intensity={8}
          className={`relative rounded-2xl border transition-all duration-300 p-4 sm:p-6 md:p-7 backdrop-blur-xl overflow-hidden ${
            isCurrent
              ? "bg-card/90 border-primary/70 ring-1 ring-primary/40 shadow-[0_0_35px_rgba(20,184,166,0.22)]"
              : isActivated
              ? "bg-card/75 border-border/90 hover:border-primary/50 shadow-lg"
              : "bg-card/50 border-border/60 hover:border-border/90 opacity-80 hover:opacity-100 shadow-md"
          }`}
        >
          {/* Subtle technical background grid */}
          <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />

          {/* Top Row: Milestone Signal & Date Badge */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
            {/* Technical Career Signal */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-mono tracking-wider border ${
                  isCurrent
                    ? "bg-primary/15 border-primary/40 text-primary font-semibold shadow-[0_0_10px_rgba(20,184,166,0.2)]"
                    : "bg-secondary/70 border-border text-muted-foreground"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCurrent ? "bg-accent animate-pulse" : "bg-primary/60"
                  }`}
                />
                {experience.signalType}
              </span>
            </div>

            {/* Date as compact technical badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-secondary/80 border border-border text-foreground">
              <Calendar className="w-3 h-3 text-primary" />
              {experience.period}
            </span>
          </div>

          {/* Role & Company Header */}
          <div className="relative z-10 mb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {experience.role}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Briefcase className="w-3.5 h-3.5 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    {experience.company}
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <span
                className={`hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border ${
                  experience.status === "CURRENT"
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-secondary border-border text-muted-foreground"
                }`}
              >
                {experience.status === "CURRENT" ? "ACTIVE TENURE" : "COMPLETED"}
              </span>
            </div>
          </div>

          {/* Responsibilities list: 100% preserved content */}
          <div className="relative z-10 space-y-2 mb-5">
            <ul className="space-y-2">
              {experience.responsibilities.map((r, ri) => (
                <li
                  key={ri}
                  className="text-xs md:text-sm text-muted-foreground leading-relaxed flex items-start gap-2.5"
                >
                  <span
                    className={`mt-1 flex-shrink-0 transition-colors ${
                      isCurrent ? "text-accent" : "text-primary/70"
                    }`}
                  >
                    ▹
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom: Key Highlights tags */}
          <div className="relative z-10 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-1.5">
              {experience.keyHighlights.map((tag, ti) => (
                <span
                  key={ti}
                  className="px-2 py-0.5 rounded-md bg-secondary/60 border border-border/70 text-[10px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="text-[10px] text-muted-foreground/70 hidden sm:inline-block">
              STAGE 0{index + 1}
            </span>
          </div>
        </TiltCard>
      </div>
    );
  }
);

ExperienceCard.displayName = "ExperienceCard";
