import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EngineeringCoreMap } from "./skills/EngineeringCoreMap";
import { ArsenalGrid } from "./skills/ArsenalGrid";
import { StackSignal } from "./skills/StackSignal";
import { ALL_SKILLS, FILTER_CATEGORIES, originalSkillCategories } from "./skills/skillsData";
import SectionReveal from "@/components/animations/SectionReveal";
import { Network, LayoutGrid, Terminal, Cpu } from "lucide-react";

const SkillsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"ecosystem" | "grid">("ecosystem");

  // Keep original data referenced for runtime compatibility
  // (All 17 skills and levels are preserved in originalSkillCategories & ALL_SKILLS)
  const _compatibilityReference = originalSkillCategories;

  // Filter skills based on selected category tab
  const filteredSkills = ALL_SKILLS.filter((skill) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "AI / Intelligent Systems") {
      return (
        skill.category === "AI / Intelligent Systems" ||
        skill.id === "rag" ||
        skill.id === "vector-embeddings" ||
        skill.id === "claude-ai" ||
        skill.id === "cursor-ai"
      );
    }
    return skill.category === selectedCategory;
  });

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding relative overflow-hidden bg-background"
    >
      {/* Subtle technical background grid */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10 md:space-y-12">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionReveal>
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-primary/30 text-primary bg-primary/5 mb-3.5">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>TECH ARSENAL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Tools I <span className="gradient-text">Build With</span>
            </h2>

            {/* Subtitle */}
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Technologies I use to design, build, integrate and scale real-world systems.
            </p>
          </SectionReveal>

          {/* View Mode Switcher Toggle */}
          <SectionReveal delay={0.15}>
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-card border border-border/80 shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode("ecosystem")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                  viewMode === "ecosystem"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Topology Map</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Arsenal Matrix</span>
              </button>
            </div>
          </SectionReveal>
        </div>

        {/* ── Category Filter Tabs ── */}
        <SectionReveal delay={0.2}>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
            {FILTER_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full border whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-primary/15 border-primary text-primary shadow-[0_0_12px_rgba(20,184,166,0.25)] font-semibold"
                      : "bg-card/70 border-border/70 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-card"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </SectionReveal>

        {/* ── Main View: Interactive Engineering Ecosystem OR 3D Arsenal Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {viewMode === "ecosystem" ? (
            <div className="space-y-6">
              {/* Central Engineering Core Architectural Map (Desktop) */}
              <div className="hidden lg:block">
                <EngineeringCoreMap
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>

              {/* Sub-grid of filtered items for quick reference below the map */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4 px-1 text-xs font-mono text-muted-foreground">
                  <span className="uppercase tracking-wider">
                    ACTIVE ARCHITECTURAL NODES
                  </span>
                  <button
                    onClick={() => setViewMode("grid")}
                    className="text-primary hover:underline hover:text-accent transition-colors"
                  >
                    Expand Complete Matrix &rarr;
                  </button>
                </div>
                <ArsenalGrid
                  skills={filteredSkills}
                  selectedCategory={selectedCategory}
                />
              </div>
            </div>
          ) : (
            <ArsenalGrid
              skills={filteredSkills}
              selectedCategory={selectedCategory}
            />
          )}
        </motion.div>

        {/* ── STACK SIGNAL HUD Area ── */}
        <SectionReveal delay={0.35}>
          <div className="pt-4 border-t border-border/60">
            <StackSignal
              onCategoryFilter={setSelectedCategory}
              activeCategory={selectedCategory}
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default SkillsSection;
