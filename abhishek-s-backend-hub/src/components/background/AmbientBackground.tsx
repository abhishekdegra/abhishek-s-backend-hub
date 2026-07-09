import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const AmbientBackground = () => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {[...Array(10)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
          style={{
            width: `${100 + index * 40}px`,
            height: `${100 + index * 40}px`,
            left: `${5 + index * 8}%`,
            top: `${8 + (index % 4) * 18}%`,
          }}
          animate={{
            x: [0, 24, -16, 0],
            y: [0, -18, 20, 0],
            scale: [1, 1.06, 0.98, 1],
          }}
          transition={{ duration: 14 + index, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default AmbientBackground;
