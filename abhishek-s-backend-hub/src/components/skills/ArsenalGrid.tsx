import { motion, AnimatePresence } from "framer-motion";
import { SkillItem } from "./skillsData";
import { getTechIcon } from "./TechIcons";
import TiltCard from "@/components/animations/TiltCard";
import { Activity, ShieldCheck, Zap } from "lucide-react";

interface ArsenalGridProps {
  skills: SkillItem[];
  selectedCategory: string;
}

export const ArsenalGrid = ({ skills, selectedCategory }: ArsenalGridProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
        <AnimatePresence mode="popLayout">
          {skills.map((skill, index) => {
            // Calculate segment rating from preserved internal level (1 to 5 segments)
            const segments = Math.max(3, Math.min(5, Math.round(skill.level / 20)));

            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <TiltCard
                  intensity={10}
                  className="h-full rounded-xl border border-border/80 bg-card/60 backdrop-blur-md p-3 sm:p-5 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-md group relative overflow-hidden"
                >
                  {/* Subtle technical background grid inside card */}
                  <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />

                  {/* Top: Icon + Category Badge + Tier */}
                  <div className="relative z-10 flex items-start justify-between gap-3 mb-3.5">
                    {/* Recognizable SVG Icon */}
                    <div className="w-10 h-10 rounded-xl bg-secondary/80 border border-border group-hover:border-primary/50 group-hover:bg-primary/10 flex items-center justify-center p-2 text-primary transition-all duration-300 shadow-sm group-hover:scale-105">
                      {getTechIcon(skill.name, "w-full h-full")}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-secondary/90 border border-border text-foreground font-medium">
                        {skill.category === "AI / Intelligent Systems"
                          ? "AI / RAG"
                          : skill.category}
                      </span>
                      <span className="text-[9px] font-mono text-accent flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 text-accent" />
                        {skill.signalTag}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Title & Role Description */}
                  <div className="relative z-10 my-auto">
                    <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 line-clamp-3">
                      {skill.role}
                    </p>
                  </div>

                  {/* Bottom: Segmented Visual Telemetry (NO percentage bars) */}
                  <div className="relative z-10 pt-3.5 mt-3 border-t border-border/60">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      {/* Segmented LED Gauge */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground uppercase">
                          TIER:
                        </span>
                        <div className="flex gap-1" title={`Proficiency Metric: ${skill.level} / 100`}>
                          {[1, 2, 3, 4, 5].map((seg) => {
                            const isFilled = seg <= segments;
                            return (
                              <div
                                key={seg}
                                className={`w-2.5 h-2.5 rounded-[2px] transition-all duration-300 ${
                                  isFilled
                                    ? "bg-primary group-hover:bg-accent shadow-[0_0_5px_hsl(var(--primary)/0.6)]"
                                    : "bg-muted/80"
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Performance / Architectural Tag */}
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground/90">
                        <ShieldCheck className="w-3 h-3 text-primary/70" />
                        <span>{skill.tier}</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
