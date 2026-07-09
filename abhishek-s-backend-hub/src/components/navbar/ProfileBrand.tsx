import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ProfileBrand = () => {
  const [ripple, setRipple] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    const target = document.getElementById("hero");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setRipple(true);
    window.setTimeout(() => setRipple(false), 400);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="group flex items-center gap-3 rounded-full bg-card/50 px-2 py-1.5 shadow-[0_12px_40px_rgba(44,33,91,0.16)] border border-white/10 backdrop-blur-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
      aria-label="Scroll to Hero section"
    >
      <span className="relative inline-flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-background/30 overflow-hidden shadow-sm ring-1 ring-white/10">
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(114,76,255,0.55),rgba(92,129,255,0.35),rgba(114,76,255,0.45))] opacity-80"
          animate={prefersReducedMotion ? undefined : { rotate: [0, 6, -6, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          aria-hidden="true"
        />
        <span className="absolute inset-0 rounded-full bg-black/20 blur-sm" aria-hidden="true" />
        <img
          src="/profile.jpg"
          alt="Abhishek Degra"
          width="1127"
          height="1396"
          fetchpriority="high"
          decoding="async"
          className="relative h-8 w-8 md:h-11 md:w-11 rounded-full object-cover"
        />
        <AnimatePresence>
          {ripple && (
            <motion.span
              className="absolute inset-0 rounded-full bg-white/20"
              initial={{ opacity: 0.45, scale: 0.95 }}
              animate={{ opacity: 0, scale: 1.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </span>

      <span className="hidden md:inline-flex flex-col leading-tight">
        <span className="text-sm font-semibold tracking-[0.03em] text-foreground">
          Abhishek
        </span>
      </span>
    </motion.button>
  );
};

export default ProfileBrand;
