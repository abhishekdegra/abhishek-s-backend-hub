import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/animations/Magnetic";
import ProfileBrand from "@/components/navbar/ProfileBrand";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
      }`}
    >
      {/* Subtle top accent line when scrolled */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <ProfileBrand />

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <Magnetic key={link.href} strength={0.1}>
                <motion.a
                  href={link.href}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative px-3 py-1.5 text-sm transition-colors rounded-md ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-x-1 -bottom-px h-px bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              </Magnetic>
            );
          })}
        </div>

        {/* Mobile menu toggle */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile menu modal/drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="md:hidden bg-card/95 backdrop-blur-2xl border-b border-border/80 shadow-2xl overflow-hidden"
          >
            {/* Mobile Header Telemetry inside menu */}
            <div className="px-5 pt-3 pb-2 border-b border-border/50 flex items-center justify-between text-[10px] font-mono text-muted-foreground/70">
              <span className="flex items-center gap-1.5 text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                SYSTEM NAVIGATION
              </span>
              <span>PORTFOLIO v2.0</span>
            </div>

            <div className="px-4 py-3 flex flex-col gap-1.5">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl font-mono text-sm transition-all duration-200 min-h-[44px] ${
                      isActive
                        ? "text-primary bg-primary/10 border border-primary/30 shadow-[0_0_12px_rgba(20,184,166,0.15)] font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono text-muted-foreground/60">
                        0{idx + 1}
                      </span>
                      <span>{link.label}</span>
                    </span>

                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Quick Resume Download Pill in Mobile Drawer */}
            <div className="p-4 pt-1 border-t border-border/40">
              <a
                href="/Abhishek-Degra-Python-Backend-AI-Developer-Resume.pdf"
                download
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-2 bg-secondary/80 text-foreground border border-border/80 hover:border-primary/50 transition-colors"
              >
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
