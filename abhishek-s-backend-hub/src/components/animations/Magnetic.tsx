import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

const Magnetic = ({ children, className = "", strength = 0.18 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 180, damping: 20, mass: 0.6 });
  const [isActive, setIsActive] = useState(false);

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsActive(false);
  }, [x, y]);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    x.set(offsetX * strength);
    y.set(offsetY * strength);
    setIsActive(true);
  };

  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={reset}
      style={{ x: springX, y: springY, transformOrigin: "center" }}
      animate={isActive ? { scale: 1.02 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
