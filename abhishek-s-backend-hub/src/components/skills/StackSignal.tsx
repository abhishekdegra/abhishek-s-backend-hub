import { Server, Brain, Network, Database, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface StackSignalProps {
  onCategoryFilter?: (cat: string) => void;
  activeCategory?: string;
}

export const StackSignal = ({ onCategoryFilter, activeCategory }: StackSignalProps) => {
  const signalPillars = [
    {
      id: "Backend",
      categoryName: "Backend",
      title: "Backend Core",
      subtitle: "Python • Django • FastAPI",
      status: "OPTIMAL",
      statusColor: "text-primary",
      icon: Server,
      metrics: [
        { label: "Architecture", value: "Async ASGI / MVC" },
        { label: "Concurrency", value: "High / Async" },
      ],
      description: "High-throughput asynchronous endpoints, custom middleware & distributed job execution.",
      signalBars: 5,
    },
    {
      id: "AI / Intelligent Systems",
      categoryName: "AI / Intelligent Systems",
      title: "AI / RAG Pipeline",
      subtitle: "RAG • Vector Embeddings • Claude",
      status: "ACTIVE",
      statusColor: "text-accent",
      icon: Brain,
      metrics: [
        { label: "Retrieval", value: "Semantic Vectors" },
        { label: "Grounding", value: "Contextual RAG" },
      ],
      description: "Hybrid search, embedding chunking, similarity indexing & structured agentic reasoning.",
      signalBars: 5,
    },
    {
      id: "Developer Tools",
      categoryName: "Backend", // Connects with APIs
      filterTarget: "Backend",
      title: "API Infrastructure",
      subtitle: "DRF • REST APIs • Postman",
      status: "SECURED",
      statusColor: "text-primary",
      icon: Network,
      metrics: [
        { label: "Specification", value: "OpenAPI 3.0" },
        { label: "Auth Flow", value: "JWT / Session" },
      ],
      description: "Contract-first endpoint design, automated test suites, serializing & rate-limiting.",
      signalBars: 5,
    },
    {
      id: "Database",
      categoryName: "Database",
      title: "Databases & Storage",
      subtitle: "MySQL • Relational SQL Engine",
      status: "SYNCHRONIZED",
      statusColor: "text-accent",
      icon: Database,
      metrics: [
        { label: "Transactions", value: "ACID Compliant" },
        { label: "Engine", value: "InnoDB / B-Tree" },
      ],
      description: "Relational persistence, foreign key integrity, indexing strategies & analytical queries.",
      signalBars: 4,
    },
  ];

  return (
    <div className="w-full">
      {/* Small Eyebrow Label */}
      <div className="flex items-center justify-between mb-3 px-1 text-xs font-mono text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-semibold tracking-wider uppercase text-foreground">
            STACK PILLARS & ARCHITECTURE
          </span>
        </div>
        <span className="hidden sm:inline-block text-[11px] text-muted-foreground/80">
          Production Engineering Standards
        </span>
      </div>

      {/* 4 Telemetry HUD Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {signalPillars.map((pillar, i) => {
          const Icon = pillar.icon;
          const isSelected = activeCategory === pillar.categoryName;

          return (
            <motion.div
              key={pillar.title}
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              onClick={() => onCategoryFilter?.(pillar.filterTarget || pillar.categoryName)}
              className={`p-4 rounded-xl border bg-card/60 backdrop-blur-md cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-primary/80 ring-1 ring-primary/40 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
                  : "border-border/70 hover:border-primary/40 hover:bg-card/90 shadow-sm"
              }`}
            >
              {/* Header: Icon, Title & Status */}
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground tracking-tight">
                      {pillar.title}
                    </h4>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono bg-secondary border border-border text-foreground">
                  <span className={`w-1.5 h-1.5 rounded-full ${pillar.statusColor} bg-current`} />
                  {pillar.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                {pillar.description}
              </p>

              {/* Visual Telemetry Signal Gauge (Segmented LED Bars) */}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">SIGNAL:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <div
                        key={bar}
                        className={`w-2 h-2.5 rounded-[1px] transition-colors ${
                          bar <= pillar.signalBars
                            ? "bg-primary shadow-[0_0_4px_hsl(var(--primary)/0.6)]"
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-accent font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{pillar.metrics[0].value}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
