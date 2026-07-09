import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const SectionReveal = ({ children, className = "", delay = 0 }: SectionRevealProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.985, filter: "blur(14px)" }}
      animate={inView || prefersReducedMotion ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
