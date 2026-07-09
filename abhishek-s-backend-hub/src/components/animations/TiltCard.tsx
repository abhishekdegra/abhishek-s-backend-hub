import { motion, useSpring } from "framer-motion";
import { ReactNode, useMemo, useState } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

const TiltCard = ({ children, className = "", intensity = 8 }: TiltCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const springX = useSpring(rotateX, { stiffness: 140, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 140, damping: 18 });

  const style = useMemo(
    () => ({
      transformStyle: "preserve-3d" as const,
      rotateX: springX,
      rotateY: springY,
      backgroundImage: `radial-gradient(220px circle at ${glowX}% ${glowY}%, hsl(var(--accent) / 0.16), transparent 70%)`,
    }),
    [springX, springY, glowX, glowY]
  );

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setGlowX(x);
    setGlowY(y);
    setRotateX((70 - y / 100 * 140) * -1);
    setRotateY((x / 100 * 140 - 70) / intensity);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setRotateX(0);
        setRotateY(0);
        setGlowX(50);
        setGlowY(50);
      }}
      style={style}
      whileHover={{ scale: 1.01, y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.22)" }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
