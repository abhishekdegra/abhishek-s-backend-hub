import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const followerX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const followerY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });
  const cursorScale = useSpring(isClicked ? 0.9 : isHoveringInteractive ? 1.2 : 1, {
    stiffness: 260,
    damping: 20,
  });
  const followerScale = useSpring(isHoveringInteractive ? 1.7 : 1, {
    stiffness: 220,
    damping: 18,
  });

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    document.body.classList.add("cursor-hidden");

    const onMove = (event: MouseEvent) => {
      const nextPosition = { x: event.clientX, y: event.clientY };
      setPosition(nextPosition);
      x.set(event.clientX);
      y.set(event.clientY);
      setVelocity((Math.hypot(event.clientX - position.x, event.clientY - position.y) + velocity) / 2);
    };

    const onLeave = () => {
      setIsHoveringInteractive(false);
    };

    const onOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, input, textarea, select, [role='button']") !== null;
      setIsHoveringInteractive(interactive);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", () => setIsClicked(true));
    window.addEventListener("mouseup", () => setIsClicked(false));
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.body.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", () => setIsClicked(true));
      window.removeEventListener("mouseup", () => setIsClicked(false));
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
    };
  }, [prefersReducedMotion, position.x, position.y, velocity, x, y]);

  const cursorStyle = useMemo(
    () => ({
      left: 0,
      top: 0,
      x: followerX,
      y: followerY,
    }),
    [followerX, followerY]
  );

  if (!mounted || prefersReducedMotion || typeof window === "undefined") {
    return null;
  }

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[60] h-5 w-5 rounded-full border border-primary/70 bg-primary/20 mix-blend-screen"
        style={{ ...cursorStyle, scale: cursorScale, x: followerX, y: followerY }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[55] h-10 w-10 rounded-full border border-accent/30 bg-accent/10 blur-[1px]"
        style={{ left: 0, top: 0, x: followerX, y: followerY, scale: followerScale }}
      />
      <motion.div
        className="pointer-events-none fixed z-[54] h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl"
        style={{ left: 0, top: 0, x: followerX, y: followerY, scale: isHoveringInteractive ? 1.5 : 1 }}
      />
    </>
  );
};

export default CustomCursor;
