import { useRef } from "react";
import { useInView } from "framer-motion";
import SectionReveal from "@/components/animations/SectionReveal";
import DataStreamText from "./about/DataStreamText";
import Profile3DCard from "./about/Profile3DCard";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Background ambient lighting accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -right-32 w-80 h-80 rounded-full bg-accent/8 blur-[100px]"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionReveal>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-primary font-semibold tracking-widest uppercase">
              AI ENGINEER PROFILE
            </span>
            <span className="h-px flex-1 max-w-[80px] bg-primary/30" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight font-heading">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-10" />
        </SectionReveal>

        {/* 2-Column Responsive Layout: Left = Electric Data Stream Text, Right = 3D Digital Twin Portrait */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* Left Column: Data Stream Reveal */}
          <div className="flex flex-col justify-center">
            <DataStreamText inView={inView} />

            {/* Engineering Highlights Quick Bar */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border/60 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
              <div className="p-3 rounded-xl bg-card/60 border border-border/70 backdrop-blur-sm">
                <span className="text-[10px] font-mono text-muted-foreground block mb-0.5">
                  CORE SPECIALTY
                </span>
                <span className="text-xs font-bold text-foreground font-mono">
                  Python Backend
                </span>
              </div>

              <div className="p-3 rounded-xl bg-card/60 border border-border/70 backdrop-blur-sm">
                <span className="text-[10px] font-mono text-muted-foreground block mb-0.5">
                  AI FOCUS
                </span>
                <span className="text-xs font-bold text-primary font-mono">
                  RAG & Agents
                </span>
              </div>

              <div className="p-3 rounded-xl bg-card/60 border border-border/70 backdrop-blur-sm">
                <span className="text-[10px] font-mono text-muted-foreground block mb-0.5">
                  ARCHITECTURE
                </span>
                <span className="text-xs font-bold text-foreground font-mono">
                  REST & FastAPIs
                </span>
              </div>

              <div className="p-3 rounded-xl bg-card/60 border border-border/70 backdrop-blur-sm">
                <span className="text-[10px] font-mono text-muted-foreground block mb-0.5">
                  DEPLOYMENT
                </span>
                <span className="text-xs font-bold text-accent font-mono">
                  Production Ready
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Portrait */}
          <div className="flex justify-center w-full">
            <Profile3DCard sectionRef={sectionRef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
