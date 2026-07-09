import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Burst = {
  id: number;
  x: number;
  y: number;
};

const ClickEffects = () => {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleClick = (event: MouseEvent) => {
      const nextBurst = { id: Date.now() + Math.random(), x: event.clientX, y: event.clientY };
      setBursts((prev) => [...prev, nextBurst]);
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((burst) => burst.id !== nextBurst.id));
      }, 650);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.div
            key={burst.id}
            className="absolute"
            style={{ left: burst.x, top: burst.y }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.2, 1.2, 1.8], filter: ["blur(0px)", "blur(4px)", "blur(10px)"] }}
            exit={{ opacity: 0, scale: 2.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="h-24 w-24 rounded-full border border-primary/60 bg-gradient-to-br from-primary/35 via-accent/20 to-transparent" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickEffects;
