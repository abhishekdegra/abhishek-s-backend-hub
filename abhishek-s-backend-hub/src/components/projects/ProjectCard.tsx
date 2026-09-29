import React, { useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  ExternalLink,
  GitBranch,
  ChevronDown,
  CheckCircle2,
  Database,
  Server,
  ShieldCheck,
} from "lucide-react";
import { Project } from "./projectsData";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.8 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [7, -7]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-8, 8]),
    springConfig
  );

  const glareX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [15, 85]),
    springConfig
  );
  const glareY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [15, 85]),
    springConfig
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full select-none"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full flex flex-col justify-between rounded-2xl p-6 md:p-7 border border-border/80 bg-card/85 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_15px_35px_rgba(20,184,166,0.12)] group"
      >
        {/* Specular Interactive Glare */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(20, 184, 166, 0.12) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Ambient Top Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl"
        />

        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          {/* Card Top Metadata Bar */}
          <div className="flex items-center justify-between gap-2 mb-3 text-[10px] font-mono text-muted-foreground/80">
            <span className="px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/25 font-bold">
              {project.systemMeta.type}
            </span>
          </div>

          {/* Project Title */}
          <h4 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-heading mb-1.5 group-hover:text-primary transition-colors">
            {project.title}
          </h4>

          {/* Tagline */}
          <p className="text-xs font-mono text-accent mb-3">
            {project.tagline}
          </p>

          {/* Existing Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Existing Core Features */}
          <div className="space-y-2 mb-6">
            {project.features.slice(0, 3).map((f, fi) => (
              <div
                key={fi}
                className="flex items-start gap-2 text-xs text-muted-foreground/90"
              >
                <CheckCircle2
                  size={14}
                  className="text-primary mt-0.5 shrink-0"
                />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* Expandable Deep-Dive Layer */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-border/70 pt-4 mb-4 space-y-4"
              >
                {/* Additional Features (if > 3) */}
                {project.features.length > 3 && (
                  <div>
                    <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider block mb-2">
                      EXTENDED CAPABILITIES:
                    </span>
                    <ul className="space-y-1.5">
                      {project.features.slice(3).map((f, fi) => (
                        <li
                          key={fi}
                          className="flex items-start gap-2 text-xs text-muted-foreground/90"
                        >
                          <span className="text-accent mt-0.5 text-[10px]">▶</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* System Specs Breakdown */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-background/60 p-2.5 rounded-xl border border-border/70">
                  <div className="flex items-center gap-1.5 text-foreground/80">
                    <Server size={12} className="text-primary" />
                    <span>{project.systemMeta.architecture}</span>
                  </div>
                  {project.systemMeta.db && (
                    <div className="flex items-center gap-1.5 text-foreground/80">
                      <Database size={12} className="text-accent" />
                      <span>{project.systemMeta.db}</span>
                    </div>
                  )}
                  {project.systemMeta.auth && (
                    <div className="flex items-center gap-1.5 text-foreground/80 col-span-2">
                      <ShieldCheck size={12} className="text-primary" />
                      <span>{project.systemMeta.auth}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card Footer: Tech Badges + Actions */}
        <div
          className="relative z-10 pt-4 border-t border-border/60"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Tech Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[11px] font-mono rounded bg-secondary/80 text-foreground/90 border border-border/80 transition-colors group-hover:border-primary/30"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-accent transition-colors"
            >
              <span>{isExpanded ? "COLLAPSE" : "DEEP DIVE"}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-secondary text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-sm"
              >
                <GitBranch size={13} />
                <span>GITHUB</span>
                <ExternalLink size={12} className="opacity-70" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
