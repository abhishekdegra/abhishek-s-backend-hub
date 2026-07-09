import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import Magnetic from "@/components/animations/Magnetic";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/30 animate-float"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${5 + i}s`,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            whileHover={{ y: -2, scale: 1.02, boxShadow: "0 0 30px rgba(128, 90, 213, 0.25)" }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-mono border border-primary/30 text-primary mb-6"
          >
            Python Backend & AI Developer
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6"
        >
          Hi, I'm{" "}
          <span className="gradient-text">Abhishek Degra</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Building scalable backend systems, REST APIs, and intelligent AI-powered applications using Python, Django, FastAPI, RAG, and modern AI technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Magnetic strength={0.1}>
            <motion.a
              href="#projects"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-lg font-medium text-primary-foreground bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity animate-gradient-shift inline-flex"
            >
              View Projects
            </motion.a>
          </Magnetic>
          <Magnetic strength={0.1}>
            <motion.a
              href="#contact"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-lg font-medium glass-card hover:bg-secondary/80 transition-colors flex items-center gap-2"
            >
              <Mail size={16} /> Contact Me
            </motion.a>
          </Magnetic>
          <Magnetic strength={0.1}>
            <motion.a
              href="/Abhishek-Degra-Python-Backend-AI-Developer-Resume.pdf"
              download
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-lg font-medium border border-border hover:border-primary/50 transition-colors flex items-center gap-2"
            >
              <FileText size={16} /> Download Resume
            </motion.a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-[-140px] left-1/2 -translate-x-1/2"
        >
          <a href="#about">
            <ArrowDown size={20} className="text-muted-foreground animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
