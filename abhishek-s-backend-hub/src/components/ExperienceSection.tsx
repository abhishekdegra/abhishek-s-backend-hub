import { useState, useRef, useEffect } from "react";
import { useScroll, useSpring, useMotionValueEvent, motion, useInView } from "framer-motion";
import { EXPERIENCES } from "./experience/experienceData";
import { TechSerpent } from "./experience/TechSerpent";
import { ExperienceCard } from "./experience/ExperienceCard";
import SectionReveal from "@/components/animations/SectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Briefcase, Compass, Sparkles } from "lucide-react";

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking linked directly to this section's viewport progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 65%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [milestoneYPositions, setMilestoneYPositions] = useState<number[]>([140, 420, 700, 980]);

  // Card element refs to measure accurate connector Y positions
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const cardRefs = [card0Ref, card1Ref, card2Ref, card3Ref];

  // Measure card positions relative to timeline container for exact connector alignment
  useEffect(() => {
    const measurePositions = () => {
      if (!timelineContainerRef.current) return;
      const containerRect = timelineContainerRef.current.getBoundingClientRect();
      const positions = cardRefs.map((ref) => {
        if (!ref.current) return 0;
        const rect = ref.current.getBoundingClientRect();
        return rect.top - containerRect.top + 34; // Align with top header of card
      });
      if (positions.every((p) => p > 0)) {
        setMilestoneYPositions(positions);
      }
    };

    measurePositions();
    window.addEventListener("resize", measurePositions);
    const timer = setTimeout(measurePositions, 250);

    return () => {
      window.removeEventListener("resize", measurePositions);
      clearTimeout(timer);
    };
  }, []);

  // Update active milestone index as the serpent moves
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.26) {
      setActiveMilestoneIndex(0);
    } else if (latest < 0.52) {
      setActiveMilestoneIndex(1);
    } else if (latest < 0.78) {
      setActiveMilestoneIndex(2);
    } else {
      setActiveMilestoneIndex(3);
    }
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-background"
    >
      {/* Background: technical grid + atmospheric cyan/lime glow */}
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      {/* Atmospheric lighting accents */}
      <div className="absolute -left-40 top-1/4 w-96 h-96 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute -right-40 top-2/3 w-96 h-96 rounded-full bg-accent/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-10 md:space-y-14">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionReveal>
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-primary/30 text-primary bg-primary/5 mb-3.5">
              <Compass className="w-3.5 h-3.5 text-accent" />
              <span>CAREER JOURNEY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Work <span className="gradient-text">Experience</span>
            </h2>

            {/* Subtitle */}
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Engineering journey descending through scalable architectures, RAG pipelines, and enterprise automation.
            </p>
          </SectionReveal>

          {/* Timeline Status Badge */}
          <SectionReveal delay={0.15}>
            <div className="hidden sm:inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-card border border-border/80 text-xs font-mono text-muted-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-foreground font-medium">CAREER TIMELINE:</span>
              <span className="text-primary font-semibold">
                STAGE 0{activeMilestoneIndex + 1}
              </span>
            </div>
          </SectionReveal>
        </div>

        {/* ── Main Timeline & Serpent Area ── */}
        <div ref={timelineContainerRef} className="relative w-full">
          {/* 3D Banyan Serpent descending through ancient aerial roots */}
          <TechSerpent
            scrollProgress={smoothProgress}
            activeMilestoneIndex={activeMilestoneIndex}
            milestoneYPositions={milestoneYPositions}
          />

          {/* Experience Cards Stack with Left Padding for Serpent & Banyan Roots */}
          <div className="space-y-8 sm:space-y-10 md:space-y-14 pl-8 sm:pl-20 md:pl-40 lg:pl-52">
            {EXPERIENCES.map((exp, index) => {
              const isActivated = index <= activeMilestoneIndex;
              const isCurrent = index === activeMilestoneIndex;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <ExperienceCard
                    ref={cardRefs[index]}
                    experience={exp}
                    isActivated={isActivated}
                    isCurrent={isCurrent}
                    index={index}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
