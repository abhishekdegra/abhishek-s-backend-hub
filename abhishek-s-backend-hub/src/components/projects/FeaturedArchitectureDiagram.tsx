import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  Bot,
  Cpu,
  Search,
  Workflow,
  Server,
  CheckCircle2,
  PackageSearch,
  Truck,
  ReceiptText,
} from "lucide-react";

interface NodeItem {
  id: string;
  label: string;
  category: string;
  icon: React.ElementType;
  description: string;
  tech: string;
}

const NODES: NodeItem[] = [
  {
    id: "query",
    label: "USER QUERY",
    category: "INGESTION",
    icon: Bot,
    description: "Multilingual and Hinglish query understanding with intent normalization.",
    tech: "NLP Parser • Ingestion",
  },
  {
    id: "intent",
    label: "INTENT & ENTITY",
    category: "DETECTION",
    icon: Search,
    description: "Intelligent intent detection and entity extraction from natural conversation.",
    tech: "Entity Classifier • Context",
  },
  {
    id: "rag",
    label: "RAG / VECTOR SEARCH",
    category: "KNOWLEDGE RETRIEVAL",
    icon: Brain,
    description: "Vector embeddings and semantic search for store policies, FAQs, and documentation.",
    tech: "Vector Embeddings • Semantic Search",
  },
  {
    id: "llm",
    label: "AI / LLM ORCHESTRATION",
    category: "CORE REASONING",
    icon: Cpu,
    description: "Multi-LLM integration and fallback support with optimized response workflows.",
    tech: "LLM APIs • Fallback Engine",
  },
  {
    id: "routing",
    label: "DYNAMIC TOOL ROUTING",
    category: "TOOL DISPATCH",
    icon: Workflow,
    description: "Routes user requests dynamically to products, orders, refunds, and invoices.",
    tech: "Dynamic Function Router",
  },
  {
    id: "apis",
    label: "ECOMMERCE BACKEND APIs",
    category: "API EXECUTION",
    icon: Server,
    description: "Real-time integration with e-commerce backend APIs via Django REST Framework.",
    tech: "Django REST Framework • REST APIs",
  },
  {
    id: "response",
    label: "SYNTHESIZED RESPONSE",
    category: "OUTPUT STREAM",
    icon: CheckCircle2,
    description: "Optimized AI workflow delivers verified, actionable customer resolutions.",
    tech: "Low-Latency Stream • Response",
  },
];

const SUB_TOOLS = [
  { id: "tool-products", label: "Product Search", icon: PackageSearch },
  { id: "tool-orders", label: "Orders & Tracking", icon: Truck },
  { id: "tool-invoices", label: "Refunds & Invoices", icon: ReceiptText },
];

export const FeaturedArchitectureDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>("routing");
  const prefersReducedMotion = useReducedMotion();

  const selectedNode =
    NODES.find((n) => n.id === activeNode) ||
    NODES[4]; // Default to tool routing

  return (
    <div className="relative w-full rounded-2xl bg-card/90 border border-primary/25 p-3.5 sm:p-5 md:p-6 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col justify-between">
      {/* Background Tech Watermark & Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-border/70">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-foreground">
            SYSTEM ARCHITECTURE PIPELINE
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded border border-border/80">
          INTERACTIVE FLOW
        </span>
      </div>

      {/* Main Flow Nodes Diagram */}
      <div className="relative z-10 py-1 space-y-2.5">
        {NODES.slice(0, 5).map((node, idx) => {
          const isSelected = activeNode === node.id;
          const Icon = node.icon;

          return (
            <div key={node.id} className="relative">
              {/* Connector Line to Next Node */}
              {idx < 4 && (
                <div className="absolute left-6 top-10 bottom-[-10px] w-0.5 bg-border/80 z-0">
                  {!prefersReducedMotion && (
                    <motion.div
                      animate={{ y: [0, 24] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                        delay: idx * 0.3,
                      }}
                      className="w-1.5 h-1.5 -left-[2px] relative rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary))]"
                    />
                  )}
                </div>
              )}

              {/* Node Button */}
              <button
                type="button"
                onClick={() => setActiveNode(node.id)}
                onMouseEnter={() => setActiveNode(node.id)}
                className={`w-full text-left relative z-10 flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-primary/15 border-primary shadow-[0_0_20px_rgba(20,184,166,0.2)] translate-x-1"
                    : "bg-secondary/40 border-border/60 hover:border-primary/40 hover:bg-secondary/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-[0_0_10px_hsl(var(--primary))]"
                        : "bg-card border border-border/80 text-muted-foreground"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground block -mb-0.5">
                      STEP 0{idx + 1} • {node.category}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold tracking-tight ${
                        isSelected ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {node.label}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                    isSelected
                      ? "bg-accent/20 border-accent/40 text-accent"
                      : "bg-card/70 border-border/60 text-muted-foreground/80"
                  }`}
                >
                  ACTIVE
                </span>
              </button>
            </div>
          );
        })}

        {/* Branching Sub-Tools Panel (Under Dynamic Tool Routing) */}
        <div className="pl-6 pt-1 pb-1 relative z-10">
          <div className="p-2.5 rounded-xl bg-background/70 border border-primary/20 backdrop-blur-md">
            <span className="text-[9px] font-mono text-muted-foreground block mb-1.5 uppercase tracking-wider">
              DYNAMIC DISPATCH TARGETS: REAL-TIME TOOLS
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {SUB_TOOLS.map((tool) => {
                const ToolIcon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    className="flex flex-col items-center justify-center text-center p-2 rounded-lg bg-card/80 border border-border/80 transition-colors hover:border-accent/40"
                  >
                    <ToolIcon size={14} className="text-primary mb-1" />
                    <span className="text-[10px] font-mono text-foreground font-medium leading-tight">
                      {tool.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Final Steps: Backend APIs & Synthesized Response */}
        {NODES.slice(5, 7).map((node, idx) => {
          const isSelected = activeNode === node.id;
          const Icon = node.icon;
          const actualStep = idx + 6;

          return (
            <div key={node.id} className="relative">
              {idx === 0 && (
                <div className="absolute left-6 top-10 bottom-[-10px] w-0.5 bg-border/80 z-0">
                  {!prefersReducedMotion && (
                    <motion.div
                      animate={{ y: [0, 24] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                        delay: 0.8,
                      }}
                      className="w-1.5 h-1.5 -left-[2px] relative rounded-full bg-accent shadow-[0_0_6px_hsl(var(--accent))]"
                    />
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={() => setActiveNode(node.id)}
                onMouseEnter={() => setActiveNode(node.id)}
                className={`w-full text-left relative z-10 flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-primary/15 border-primary shadow-[0_0_20px_rgba(20,184,166,0.2)] translate-x-1"
                    : "bg-secondary/40 border-border/60 hover:border-primary/40 hover:bg-secondary/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-accent text-accent-foreground shadow-[0_0_10px_hsl(var(--accent))]"
                        : "bg-card border border-border/80 text-muted-foreground"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground block -mb-0.5">
                      STEP 0{actualStep} • {node.category}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold tracking-tight ${
                        isSelected ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {node.label}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                    isSelected
                      ? "bg-accent/20 border-accent/40 text-accent"
                      : "bg-card/70 border-border/60 text-muted-foreground/80"
                  }`}
                >
                  {actualStep === 7 ? "RESOLVED" : "EXECUTED"}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Telemetry / Node Inspector Panel */}
      <div className="mt-4 pt-3 border-t border-border/70 relative z-10 bg-background/60 p-3 rounded-xl border border-primary/20">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] font-mono font-bold text-accent flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            NODE TELEMETRY: {selectedNode.label}
          </span>
          <span className="text-[9px] font-mono text-muted-foreground/70">
            {selectedNode.tech}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed font-sans">
          {selectedNode.description}
        </p>
      </div>
    </div>
  );
};

export default FeaturedArchitectureDiagram;
