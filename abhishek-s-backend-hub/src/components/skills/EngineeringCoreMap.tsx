import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_SKILLS, SkillItem } from "./skillsData";
import { getTechIcon } from "./TechIcons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Cpu, Sparkles, Activity, Link2, X } from "lucide-react";

interface EngineeringCoreMapProps {
  selectedCategory: string;
  onSelectCategory?: (category: string) => void;
}

export const EngineeringCoreMap = ({
  selectedCategory,
  onSelectCategory,
}: EngineeringCoreMapProps) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [pinnedNodeId, setPinnedNodeId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const activeNodeId = pinnedNodeId || hoveredNodeId;
  const activeNode = ALL_SKILLS.find((s) => s.id === activeNodeId) || null;

  // Inter-node connection conduits for architectural relationships
  const interConnections: [string, string][] = [
    ["python", "django"],
    ["django", "drf"],
    ["drf", "rest-apis"],
    ["python", "fastapi"],
    ["fastapi", "rest-apis"],
    ["drf", "postman"],
    ["django", "mysql"],
    ["mysql", "sql"],
    ["python", "rag"],
    ["rag", "vector-embeddings"],
    ["rag", "claude-ai"],
    ["claude-ai", "cursor-ai"],
    ["git", "github"],
    ["python", "dsa"],
    ["dsa", "java"],
    ["dsa", "cpp"],
  ];

  const isNodeHighlighted = (node: SkillItem) => {
    if (selectedCategory !== "all") {
      if (selectedCategory === "AI / Intelligent Systems") {
        return (
          node.category === "AI / Intelligent Systems" ||
          node.id === "rag" ||
          node.id === "vector-embeddings" ||
          node.id === "claude-ai" ||
          node.id === "cursor-ai"
        );
      }
      return node.category === selectedCategory;
    }
    if (activeNode) {
      return (
        node.id === activeNode.id ||
        activeNode.connectedTo.includes(node.id) ||
        node.connectedTo.includes(activeNode.id)
      );
    }
    return true;
  };

  const isLineActive = (fromId: string, toId: string) => {
    if (!activeNodeId) {
      if (selectedCategory !== "all") {
        const fromNode = ALL_SKILLS.find((s) => s.id === fromId);
        const toNode = ALL_SKILLS.find((s) => s.id === toId);
        return (
          (fromNode && isNodeHighlighted(fromNode)) ||
          (toNode && isNodeHighlighted(toNode))
        );
      }
      return false;
    }
    return (
      (activeNodeId === fromId && (toId === "core" || activeNode?.connectedTo.includes(toId))) ||
      (activeNodeId === toId && (fromId === "core" || activeNode?.connectedTo.includes(fromId))) ||
      (fromId === "core" && activeNode?.connectedTo.includes(toId)) ||
      (toId === "core" && activeNode?.connectedTo.includes(fromId))
    );
  };

  return (
    <div className="relative w-full rounded-2xl border border-border/80 bg-card/40 backdrop-blur-md overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
      {/* Background Technical Grid & Radar Circles */}
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/90 pointer-events-none" />

      {/* Top Map HUD Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-border/70 bg-card/60 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-foreground font-semibold tracking-wider uppercase">
            ARCHITECTURAL ECOSYSTEM MAP
          </span>
          <span className="hidden sm:inline-block text-muted-foreground/60">|</span>
          <span className="hidden sm:inline-block text-muted-foreground">
            Interactive Topology
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Core Runtime
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            AI &amp; Data Conduits
          </span>
          {pinnedNodeId && (
            <button
              onClick={() => setPinnedNodeId(null)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
            >
              Reset Pin <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="relative w-full h-[580px] md:h-[640px] select-none">
        {/* SVG Dynamic Conduits Layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="coreLineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(173, 80%, 45%)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(78, 72%, 52%)" stopOpacity="0.8" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Conduits from Central Core (50, 50) to each technology node */}
          {ALL_SKILLS.map((node) => {
            const active = isLineActive("core", node.id);
            const highlighted = isNodeHighlighted(node);
            const dx = node.coords.x - 50;
            const dy = node.coords.y - 50;
            const cx = 50 + dx * 0.45;
            const cy = 50 + dy * 0.55;

            return (
              <g key={`core-${node.id}`}>
                <path
                  d={`M 50 50 Q ${cx} ${cy} ${node.coords.x} ${node.coords.y}`}
                  fill="none"
                  stroke={active ? "url(#coreLineGlow)" : "hsl(173, 80%, 40%)"}
                  strokeWidth={active ? 0.75 : highlighted ? 0.35 : 0.18}
                  strokeOpacity={active ? 0.95 : highlighted ? 0.3 : 0.08}
                  strokeDasharray={active ? "1.5, 2.5" : "1, 2"}
                  filter={active ? "url(#neonGlow)" : undefined}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}

          {/* 2. Inter-node architecture connection conduits */}
          {interConnections.map(([fromId, toId]) => {
            const fromNode = ALL_SKILLS.find((s) => s.id === fromId);
            const toNode = ALL_SKILLS.find((s) => s.id === toId);
            if (!fromNode || !toNode) return null;

            const active = isLineActive(fromId, toId);
            const highlighted = isNodeHighlighted(fromNode) && isNodeHighlighted(toNode);
            const mx = (fromNode.coords.x + toNode.coords.x) / 2;
            const my = (fromNode.coords.y + toNode.coords.y) / 2;

            return (
              <path
                key={`inter-${fromId}-${toId}`}
                d={`M ${fromNode.coords.x} ${fromNode.coords.y} Q ${mx} ${my} ${toNode.coords.x} ${toNode.coords.y}`}
                fill="none"
                stroke={active ? "hsl(78, 72%, 52%)" : "hsl(210, 20%, 70%)"}
                strokeWidth={active ? 0.6 : highlighted ? 0.3 : 0.15}
                strokeOpacity={active ? 0.9 : highlighted ? 0.22 : 0.05}
                strokeDasharray="1.2, 2.2"
                filter={active ? "url(#neonGlow)" : undefined}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* ── Central Engineering Core ── */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: "50%", top: "50%" }}
        >
          {/* Rotating orbital radar rings */}
          {!prefersReducedMotion && (
            <>
              <div className="absolute -inset-10 md:-inset-16 rounded-full border border-primary/15 animate-[spin-slow_35s_linear_infinite] pointer-events-none" />
              <div className="absolute -inset-14 md:-inset-24 rounded-full border border-dashed border-accent/15 animate-[spin-reverse_45s_linear_infinite] pointer-events-none" />
            </>
          )}

          {/* Center Core Badge / Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative px-5 py-4 md:px-7 md:py-5 rounded-2xl bg-card border-2 border-primary/50 shadow-[0_0_40px_rgba(20,184,166,0.22)] backdrop-blur-xl"
          >
            {/* Pulsing beacon glow */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-background border border-primary/40 text-[10px] font-mono text-primary shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              ENGINEERING CORE
            </div>

            <div className="mt-1 flex items-center justify-center gap-2 text-primary">
              <Cpu className="w-4 h-4 md:w-5 md:h-5 text-accent" />
              <span className="text-[11px] md:text-xs font-mono tracking-widest text-muted-foreground uppercase">
                DISTRIBUTED RUNTIME
              </span>
            </div>

            <h3 className="text-base md:text-xl font-bold text-foreground tracking-tight mt-1">
              PYTHON BACKEND <span className="text-accent">+</span> AI
            </h3>

            <p className="hidden md:block text-[11px] text-muted-foreground mt-1 max-w-[210px] mx-auto font-mono">
              High-Throughput APIs • RAG Pipelines • Scalable Architecture
            </p>

            <div className="mt-2.5 flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary">
                <Activity className="w-3 h-3 text-accent" /> 17 Linked Nodes
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/80 text-[10px] font-mono text-muted-foreground">
                ASGI / ACID Ready
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Floating Technology Nodes ── */}
        {ALL_SKILLS.map((node, index) => {
          const isHighlighted = isNodeHighlighted(node);
          const isSelected = activeNodeId === node.id;
          const floatDelay = (index % 4) * 0.6;

          return (
            <motion.div
              key={node.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                isHighlighted ? "opacity-100 z-20" : "opacity-30 z-10"
              }`}
              style={{
                left: `${node.coords.x}%`,
                top: `${node.coords.y}%`,
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, -5, 0],
                    }
              }
              transition={{
                duration: 4.5 + (index % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
              }}
            >
              <motion.button
                type="button"
                onClick={() => setPinnedNodeId(pinnedNodeId === node.id ? null : node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.96 }}
                aria-label={`Inspect ${node.name}`}
                className={`group relative flex items-center gap-2 px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-primary/20 border-primary text-foreground shadow-[0_0_25px_rgba(20,184,166,0.35)] ring-1 ring-primary"
                    : "bg-card/85 hover:bg-card border-border/80 hover:border-primary/50 text-foreground/90 shadow-md hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
                }`}
              >
                {/* Tech Icon Container */}
                <div
                  className={`w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center p-1 border transition-colors ${
                    isSelected
                      ? "bg-primary/20 border-primary/60 text-primary"
                      : "bg-secondary/60 border-border group-hover:border-primary/40"
                  }`}
                >
                  {getTechIcon(node.name, "w-full h-full")}
                </div>

                {/* Tech Name */}
                <div className="flex flex-col">
                  <span className="text-[11px] md:text-xs font-semibold tracking-tight leading-none text-foreground group-hover:text-primary transition-colors">
                    {node.name}
                  </span>
                  <span className="hidden md:inline-block text-[9px] font-mono text-muted-foreground mt-0.5 leading-none">
                    {node.signalTag}
                  </span>
                </div>

                {/* Micro Category Dot */}
                <span
                  className={`w-1.5 h-1.5 rounded-full ml-0.5 transition-colors ${
                    isSelected ? "bg-accent animate-ping" : "bg-primary/50 group-hover:bg-primary"
                  }`}
                />
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* ── Active Node Inspector HUD (Bottom Drawer) ── */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="relative z-30 border-t border-border/80 bg-card/95 backdrop-blur-xl px-5 py-4"
          >
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center p-2 text-primary shadow-sm">
                  {getTechIcon(activeNode.name, "w-full h-full")}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-foreground">
                      {activeNode.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary border border-border text-muted-foreground uppercase">
                      {activeNode.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-primary/10 text-primary border border-primary/25">
                      {activeNode.signalTag}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xl">
                    {activeNode.role}
                  </p>
                </div>
              </div>

              {/* Technical Telemetry & Connected Nodes */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                {activeNode.latencyOrPerf && (
                  <div className="flex flex-col items-start md:items-end">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      Operational Metric
                    </span>
                    <span className="text-accent font-semibold">
                      {activeNode.latencyOrPerf}
                    </span>
                  </div>
                )}

                <div className="flex flex-col items-start md:items-end">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Proficiency Index
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {/* Visual Segmented Metric */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((seg) => {
                        const filled = seg <= Math.round(activeNode.level / 20);
                        return (
                          <div
                            key={seg}
                            className={`w-2.5 h-3 rounded-[2px] transition-colors ${
                              filled
                                ? "bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.6)]"
                                : "bg-muted"
                            }`}
                          />
                        );
                      })}
                    </div>
                    <span className="text-foreground font-semibold ml-1">
                      {activeNode.level} / 100
                    </span>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider inline-flex items-center gap-1">
                    <Link2 className="w-3 h-3" /> Topology Conduits
                  </span>
                  <span className="text-[11px] text-muted-foreground mt-0.5">
                    {activeNode.connectedTo
                      .filter((c) => c !== "core")
                      .join(" • ") || "Core Backbone"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
