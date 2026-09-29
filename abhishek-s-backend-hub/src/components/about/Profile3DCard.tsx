import React, { useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { PROFILE_METADATA } from "./aboutData";

interface Profile3DCardProps {
  sectionRef?: React.RefObject<HTMLElement>;
}

export const Profile3DCard: React.FC<Profile3DCardProps> = ({ sectionRef }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);

  // Mouse tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Damped spring physics for ultra-smooth 60+ FPS motion
  const springConfig = { damping: 26, stiffness: 220, mass: 0.8 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [9, -9]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-11, 11]),
    springConfig
  );

  // Dynamic specular lighting position
  const glareX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [20, 80]),
    springConfig
  );
  const glareY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [20, 80]),
    springConfig
  );

  // Scroll reaction (subtle depth & elevation drift as user scrolls About)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scrollTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [8, -8]
  );
  const scrollRotateZ = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-1.5, 1.5]
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
      className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[390px] mx-auto select-none"
      style={{ perspective: 1200 }}
    >
      {/* 3D Master Card Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          y: scrollTranslateY,
          rotateZ: scrollRotateZ,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-border/70 bg-card/90 backdrop-blur-xl shadow-2xl transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(20,184,166,0.15)] group"
      >
        {/* Layer 0: Specular Interactive Glare */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl z-30 transition-opacity duration-300 opacity-60 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(20, 184, 166, 0.15) 0%, rgba(163, 230, 53, 0.05) 30%, transparent 65%)`
            ),
          }}
        />

        {/* Layer 1: Background Tech Grid & Ambient Rim Flare */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden"
          style={{ transform: "translateZ(-15px)" }}
        >
          {/* Subtle Cybernetic Grid */}
          <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Volumetric Radial Aura centered on portrait head */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-36 h-36 rounded-full bg-accent/15 blur-2xl pointer-events-none" />
        </div>

        {/* Layer 2: Orbital Rings & Geometric Telemetry */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-6 bottom-32 flex items-center justify-center overflow-hidden"
          style={{ transform: "translateZ(-5px)" }}
        >
          {/* Outer Orbital Ring */}
          <div className="absolute w-[290px] h-[290px] rounded-full border border-primary/20 border-dashed animate-[spin_60s_linear_infinite]" />
          
          {/* Mid Orbital Ring with coordinates */}
          <div className="absolute w-[240px] h-[240px] rounded-full border border-primary/25 border-dotted animate-[spin_40s_linear_infinite_reverse]" />
          
          {/* Subtle Accent Crosshairs */}
          <div className="absolute top-1/2 left-4 w-2 h-0.5 bg-accent/40" />
          <div className="absolute top-1/2 right-4 w-2 h-0.5 bg-accent/40" />
          <div className="absolute top-4 left-1/2 h-2 w-0.5 bg-accent/40" />
        </div>

        {/* Top Header Identity Badges */}
        <div
          className="relative flex items-center justify-between mb-3 text-[10px] font-mono text-muted-foreground/80 z-20"
          style={{ transform: "translateZ(35px)" }}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-primary/10 border border-primary/25 text-primary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>AI &amp; BACKEND ENGINEER</span>
          </div>
          <span className="text-[10px] font-mono tracking-wider text-muted-foreground/70">
            ENGINEERING PROFILE
          </span>
        </div>

        {/* Layer 3: Photorealistic Portrait Display Stage */}
        <div
          className="relative overflow-hidden rounded-2xl aspect-[4/4.4] bg-gradient-to-b from-card/80 via-card/50 to-background border border-primary/20 shadow-inner flex items-end justify-center group/stage"
          style={{ transform: "translateZ(25px)" }}
        >
          {/* High-Tech Corner Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary/60 z-20" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary/60 z-20" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-accent/60 z-20" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-accent/60 z-20" />

          {/* High-Quality Photorealistic Portrait (Abhishek Degra) */}
          <motion.img
            src={imageError ? "/profile.png" : "/profile-cutout.png"}
            alt="Abhishek Degra - Python Backend & AI Developer"
            width="1127"
            height="1396"
            loading="eager"
            decoding="async"
            onError={() => {
              if (!imageError) setImageError(true);
            }}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/stage:scale-[1.02]"
            style={{
              filter:
                "drop-shadow(0 10px 24px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 16px rgba(20, 184, 166, 0.18))",
            }}
          />

          {/* Soft Edge Dark Vignette Overlay for Seamless Theme Blending */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"
          />

          {/* Interactive Scan Line on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[pulse_2s_ease-in-out_infinite]"
          />
        </div>

        {/* Layer 4: Identity & Profile Details */}
        <div
          className="mt-5 text-center relative z-20"
          style={{ transform: "translateZ(45px)" }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              Abhishek Degra
            </h3>
            <span
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-accent/15 text-accent border border-accent/30"
              title="Verified System Profile"
            >
              PRO
            </span>
          </div>

          <p className="text-sm font-medium text-primary mb-4 font-mono">
            Python Backend & AI Developer
          </p>

          {/* Technical Metadata Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-border/60">
            {PROFILE_METADATA.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-mono tracking-wide rounded-md bg-secondary/70 border border-border/80 text-foreground/90 transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom Telemetry Status */}
          <div className="mt-3.5 flex items-center justify-center text-[10px] font-mono text-muted-foreground/70 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-foreground/80">VERIFIED ENGINEERING PROFILE</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile3DCard;
