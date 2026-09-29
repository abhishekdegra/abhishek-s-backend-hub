import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ShieldCheck, Binary, Brain, Code2, Building2, CheckCircle2, Sparkles } from "lucide-react";
import SectionReveal from "@/components/animations/SectionReveal";
import TiltCard from "@/components/animations/TiltCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Preserving ALL existing certification data exactly
const certs = [
  {
    id: "dsa",
    title: "Advanced Data Structures and Algorithms",
    org: "Geekster",
    year: "2024",
    icon: Binary,
    vaultId: "CREDENTIAL ID: CRT-01",
    focus: "Algorithms • Time Complexity • Optimization",
  },
  {
    id: "aiml",
    title: "Artificial Intelligence & Machine Learning",
    org: "Ice Hut Technologies",
    year: "2025",
    icon: Brain,
    vaultId: "CREDENTIAL ID: CRT-02",
    focus: "Machine Learning • Model Pipelines • Neural Nets",
  },
  {
    id: "python",
    title: "Python Programming Certification",
    org: "Learn and Build",
    year: "2023",
    icon: Code2,
    vaultId: "CREDENTIAL ID: CRT-03",
    focus: "Core Python • Backend Logic • OOP Architecture",
  },
];

const CertificationsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="certifications"
      ref={ref}
      className="section-padding relative overflow-hidden bg-background"
    >
      {/* Background technical grid and atmospheric vault core */}
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      {/* Central Glowing Credential Vault Core Behind Cards */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-primary/[0.03] blur-3xl" />
        {!prefersReducedMotion && (
          <>
            <div className="absolute inset-16 rounded-full border border-primary/10 animate-[spin-slow_40s_linear_infinite]" />
            <div className="absolute inset-28 rounded-full border border-dashed border-accent/10 animate-[spin-reverse_50s_linear_infinite]" />
          </>
        )}
      </div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-10 md:space-y-12">
        {/* ── Section Header ── */}
        <div className="text-center md:text-left">
          <SectionReveal>
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-primary/30 text-primary bg-primary/5 mb-3.5">
              <Award className="w-3.5 h-3.5 text-accent" />
              <span>CREDENTIAL VAULT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              <span className="gradient-text">Certifications</span>
            </h2>

            {/* Subtitle */}
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Verified milestones across my learning journey.
            </p>
          </SectionReveal>
        </div>

        {/* ── 3D Digital Credential Vault Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {certs.map((cert, i) => {
            const Icon = cert.icon;

            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="h-full"
              >
                <TiltCard
                  intensity={10}
                  className="h-full relative rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.35)] group overflow-hidden"
                >
                  {/* Subtle technical background grid inside plaque */}
                  <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />

                  {/* Specular light sweep bar effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />

                  {/* Top Plaque Row: Verification Badge & Year Pill */}
                  <div className="relative z-10 flex items-center justify-between gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-primary/10 border border-primary/25 text-primary group-hover:border-primary/50 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      VERIFIED CREDENTIAL
                    </span>

                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-secondary/80 border border-border text-foreground font-semibold">
                      {cert.year}
                    </span>
                  </div>

                  {/* Center: Embossed Badge Emblem + Title */}
                  <div className="relative z-10 my-auto text-center flex flex-col items-center">
                    {/* 3D Embossed Credential Crest */}
                    <div className="w-16 h-16 rounded-2xl bg-secondary/80 border-2 border-border/80 group-hover:border-primary/60 group-hover:bg-primary/10 flex items-center justify-center p-3 text-primary transition-all duration-300 shadow-md group-hover:scale-110 mb-4">
                      <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                    </div>

                    {/* Certificate Title */}
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-base sm:text-lg leading-snug tracking-tight mb-2 max-w-[240px]">
                      {cert.title}
                    </h3>

                    {/* Issuing Organization */}
                    <div className="inline-flex items-center gap-1.5 text-xs text-primary font-medium mt-1">
                      <Building2 className="w-3.5 h-3.5 text-accent" />
                      <span>{cert.org}</span>
                    </div>

                    {/* Domain Focus Tag */}
                    <p className="text-[11px] font-mono text-muted-foreground mt-3 leading-relaxed">
                      {cert.focus}
                    </p>
                  </div>

                  {/* Bottom: Vault ID & Authenticity Indicator */}
                  <div className="relative z-10 pt-4 mt-6 border-t border-border/60 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span className="text-muted-foreground/80">{cert.vaultId}</span>
                    <span className="text-accent flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-accent" /> AUTHENTICATED
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
