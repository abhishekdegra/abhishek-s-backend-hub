import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail, ArrowRight } from "lucide-react";
import Magnetic from "@/components/animations/Magnetic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const techNodes = [
  { name: "Python", top: "2%", left: "50%", floatDelay: 0 },
  { name: "Django", top: "26%", left: "92%", floatDelay: 0.5 },
  { name: "FastAPI", top: "74%", left: "92%", floatDelay: 1.0 },
  { name: "AI / RAG", top: "98%", left: "50%", floatDelay: 1.5 },
  { name: "MySQL", top: "74%", left: "8%", floatDelay: 2.0 },
  { name: "LLM", top: "26%", left: "8%", floatDelay: 2.5 },
];

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background: subtle dot grid */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      {/* Background: radial gradient overlays */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Sparse floating particles */}
      {!prefersReducedMotion &&
        [...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20 animate-float"
            style={{
              left: `${20 + i * 20}%`,
              top: `${25 + (i % 3) * 20}%`,
              animationDelay: `${i * 1.8}s`,
              animationDuration: `${7 + i * 1.5}s`,
            }}
          />
        ))}

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 py-20 sm:py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-12 items-center">
          {/* ── Left on Desktop, Second on Mobile: Text Content ── */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Technical badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 sm:mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border border-primary/25 text-primary bg-primary/5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                </span>
                Python Backend &amp; AI Developer
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-[1.15]"
            >
              Hi, I'm{" "}
              <span className="shimmer-text">Abhishek Degra</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-10 leading-relaxed"
            >
              Building scalable backend systems, REST APIs, and intelligent
              AI-powered applications using Python, Django, FastAPI, RAG, and
              modern AI technologies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center lg:items-start gap-2.5 sm:gap-3 max-w-xs sm:max-w-none mx-auto lg:mx-0"
            >
              <Magnetic strength={0.08}>
                <motion.a
                  href="#projects"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  View Projects
                  <ArrowRight size={15} />
                </motion.a>
              </Magnetic>
              <Magnetic strength={0.08}>
                <motion.a
                  href="/Abhishek-Degra-Python-Backend-AI-Developer-Resume.pdf"
                  download
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl font-medium border border-border hover:border-primary/40 bg-card/40 transition-colors inline-flex items-center justify-center gap-2 text-sm"
                >
                  <FileText size={15} />
                  Resume
                </motion.a>
              </Magnetic>
              <Magnetic strength={0.08}>
                <motion.a
                  href="#contact"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl font-medium border border-border hover:border-primary/40 transition-colors inline-flex items-center justify-center gap-2 text-sm"
                >
                  <Mail size={15} />
                  Contact
                </motion.a>
              </Magnetic>
            </motion.div>
          </div>

          {/* ── Right on Desktop, First on Mobile: Orbital Photo System ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div
              className="relative w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px]"
            >
              {/* Outer orbit ring — rotates clockwise */}
              <div
                className="absolute inset-0 rounded-full border border-primary/15"
                style={
                  prefersReducedMotion
                    ? {}
                    : { animation: "spin-slow 30s linear infinite" }
                }
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/40" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent/30" />
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/20" />
              </div>

              {/* Middle orbit ring — rotates counter-clockwise */}
              <div
                className="absolute inset-[8%] rounded-full border border-primary/10"
                style={
                  prefersReducedMotion
                    ? {}
                    : { animation: "spin-reverse 40s linear infinite" }
                }
              >
                <div className="absolute top-1/2 -right-0.5 -translate-y-1/2 w-1 h-1 rounded-full bg-accent/25" />
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/20" />
              </div>

              {/* Inner static ring */}
              <div className="absolute inset-[18%] rounded-full border border-primary/20" />

              {/* Photo container */}
              <div
                className="absolute inset-[22%] rounded-full overflow-hidden border-2 border-primary/20"
                style={{
                  boxShadow:
                    "0 0 60px rgba(20,184,166,0.1), inset 0 0 30px rgba(20,184,166,0.05)",
                }}
              >
                <img
                  src="/profile.png"
                  alt="Abhishek Degra"
                  width="1127"
                  height="1396"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating tech nodes positioned around the orbit */}
              {techNodes.map((node) => (
                <motion.div
                  key={node.name}
                  className="absolute z-20 hidden sm:block"
                  style={{
                    top: node.top,
                    left: node.left,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: prefersReducedMotion ? 0 : [0, -5, 0],
                  }}
                  transition={{
                    opacity: { delay: 0.8 + node.floatDelay, duration: 0.5 },
                    scale: { delay: 0.8 + node.floatDelay, duration: 0.5 },
                    y: {
                      delay: 1.5 + node.floatDelay,
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <span className="px-3 py-1.5 text-[11px] font-mono bg-card/90 backdrop-blur-sm border border-border/80 rounded-full text-primary whitespace-nowrap shadow-lg">
                    {node.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll-down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#about" aria-label="Scroll to about section">
          <ArrowDown
            size={20}
            className="text-muted-foreground animate-bounce"
          />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
