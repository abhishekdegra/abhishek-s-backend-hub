import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen, Sparkles, Binary } from "lucide-react";
import SectionReveal from "@/components/animations/SectionReveal";
import TiltCard from "@/components/animations/TiltCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EducationSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Academic metadata preserving exact real facts
  const educationData = {
    degree: "B.Tech — Artificial Intelligence & Data Science",
    university: "Rajasthan Technical University",
    cgpa: "8.0",
    graduationYear: "2026",
    status: "GRADUATED",
    semester: "COMPLETED",
    field: "AI & DATA SCIENCE",
    core: "ENGINEERING",
  };

  return (
    <section
      id="education"
      ref={ref}
      className="section-padding relative overflow-hidden bg-background"
    >
      {/* Background technical grid and atmospheric glow */}
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-accent/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-10 md:space-y-12">
        {/* ── Section Header ── */}
        <div className="text-center md:text-left">
          <SectionReveal>
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-primary/30 text-primary bg-primary/5 mb-3.5">
              <Binary className="w-3.5 h-3.5 text-accent" />
              <span>ACADEMIC CORE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              <span className="gradient-text">Education</span>
            </h2>

            {/* Subtitle */}
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Where the engineering foundation began.
            </p>
          </SectionReveal>
        </div>

        {/* ── Central 3D Academic Core Artifact ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative max-w-4xl mx-auto"
        >
          <TiltCard
            intensity={6}
            className="relative rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xl p-4 sm:p-7 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-primary/50 transition-all duration-300 overflow-hidden group"
          >
            {/* Subtle internal tech grid */}
            <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

            {/* Ambient specular corner glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-2xl pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />

            {/* Top Bar: Technical Metadata Pills */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-border/60 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-secondary/80 border border-border text-foreground font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {educationData.field}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/25 text-primary font-semibold">
                  GRADUATED
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-secondary/80 border border-border/80 text-foreground font-semibold">
                  8TH SEMESTER COMPLETED
                </span>
                <span className="hidden md:inline-block px-2.5 py-1 rounded-md bg-secondary/50 border border-border/60 text-muted-foreground">
                  ENGINEERING CORE
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>AI RESEARCH &amp; SYSTEMS</span>
              </div>
            </div>

            {/* Center Content: 3D Academic Emblem + Degree Details */}
            <div className="relative z-10 py-5 sm:py-6 md:py-8 grid md:grid-cols-[auto_1fr] items-center gap-5 sm:gap-6 md:gap-8">
              {/* 3D Academic Emblem with Rotating Orbital Rings */}
              <div className="relative flex items-center justify-center mx-auto md:mx-0">
                {/* Orbital radar rings */}
                {!prefersReducedMotion && (
                  <>
                    <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-primary/20 animate-[spin-slow_28s_linear_infinite] pointer-events-none" />
                    <div className="absolute -inset-5 sm:-inset-7 rounded-full border border-dashed border-accent/20 animate-[spin-reverse_36s_linear_infinite] pointer-events-none" />
                  </>
                )}

                {/* Central Emblem Badge */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 border-2 border-primary/40 flex items-center justify-center p-3 sm:p-4 text-primary shadow-[0_0_30px_rgba(20,184,166,0.25)] group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary group-hover:text-accent transition-colors" />
                  <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-accent" />
                  </span>
                </div>
              </div>

              {/* Degree Title, University & Specialization */}
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold flex items-center justify-center md:justify-start gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> B.TECH COMPLETED
                </span>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {educationData.degree}
                </h3>

                <p className="text-base sm:text-lg text-primary font-medium">
                  {educationData.university}
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 max-w-xl">
                  Curriculum focused on machine learning algorithms, deep learning, distributed backend systems, discrete mathematics, and database management architectures.
                </p>
              </div>
            </div>

            {/* Bottom Telemetry HUD: CGPA & Expected Graduation */}
            <div className="relative z-10 pt-6 border-t border-border/60 grid sm:grid-cols-2 gap-4">
              {/* Telemetry Block 1: CGPA */}
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/70 flex items-center justify-between gap-3 group-hover:border-primary/40 transition-colors">
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                    CUMULATIVE GRADE POINT AVERAGE
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono text-accent">
                      {educationData.cgpa}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      / 10.0 SCALE
                    </span>
                  </div>
                </div>

                {/* 5-segment LED metric */}
                <div className="flex gap-1" title="Academic Standing: Strong Distinction">
                  {[1, 2, 3, 4, 5].map((seg) => (
                    <div
                      key={seg}
                      className={`w-2 h-3.5 rounded-[2px] ${
                        seg <= 4
                          ? "bg-accent shadow-[0_0_6px_hsl(var(--accent)/0.6)]"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Telemetry Block 2: Expected Graduation */}
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/70 flex items-center justify-between gap-3 group-hover:border-primary/40 transition-colors">
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                    GRADUATION YEAR
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono text-foreground">
                      {educationData.graduationYear}
                    </span>
                    <span className="text-xs font-mono text-accent">
                      • COMPLETED
                    </span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
