import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BanyanTreeEnvironment } from "./BanyanTreeEnvironment";

interface Point {
  x: number;
  y: number;
  angle: number;
}

interface TechSerpentProps {
  scrollProgress: MotionValue<number>;
  activeMilestoneIndex: number;
  onMilestoneReached?: (index: number) => void;
  milestoneYPositions: number[];
}

export const TechSerpent = ({
  scrollProgress,
  activeMilestoneIndex,
  milestoneYPositions,
}: TechSerpentProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [pathLength, setPathLength] = useState(1400);
  const [headPos, setHeadPos] = useState<Point>({ x: 95, y: 30, angle: 90 });
  const [bodySegments, setBodySegments] = useState<Point[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState(1300);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // SVG coordinate width for wide, dramatic natural S-curves
  const curveWidth = 260;
  const h = Math.max(1000, containerHeight);

  // Milestone Y-positions for the 4 experience cards
  const p0 = milestoneYPositions[0] || h * 0.12;
  const p1 = milestoneYPositions[1] || h * 0.38;
  const p2 = milestoneYPositions[2] || h * 0.65;
  const p3 = milestoneYPositions[3] || h * 0.90;

  /**
   * Dramatic, elegant S-curving path weaving naturally through the Banyan tree aerial roots.
   * Starts in upper banyan canopy, swings out toward Milestone 0, loops inward behind
   * aerial root pillar, swings out to Milestone 1, loops back, swings to Milestone 2,
   * loops back, swings to Milestone 3, and coils gracefully into subterranean roots.
   */
  const pathD = `
    M 95 0
    C 105 ${p0 * 0.35} 190 ${p0 * 0.72} 205 ${p0}
    C 185 ${p0 + (p1 - p0) * 0.28} 55 ${p0 + (p1 - p0) * 0.52} 55 ${(p0 + p1) / 2}
    C 55 ${(p0 + p1) / 2 + (p1 - p0) * 0.22} 185 ${p1 - (p1 - p0) * 0.25} 200 ${p1}
    C 180 ${p1 + (p2 - p1) * 0.28} 50 ${p1 + (p2 - p1) * 0.52} 50 ${(p1 + p2) / 2}
    C 50 ${(p1 + p2) / 2 + (p2 - p1) * 0.22} 180 ${p2 - (p2 - p1) * 0.25} 195 ${p2}
    C 175 ${p2 + (p3 - p2) * 0.28} 58 ${p2 + (p3 - p2) * 0.52} 58 ${(p2 + p3) / 2}
    C 58 ${(p2 + p3) / 2 + (p3 - p2) * 0.22} 175 ${p3 - (p3 - p2) * 0.25} 190 ${p3}
    C 170 ${p3 + 60} 100 ${h - 30} 85 ${h}
  `;

  // Measure path total length on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight || 1300);
      }
      if (pathRef.current && typeof pathRef.current.getTotalLength === "function") {
        const len = pathRef.current.getTotalLength();
        if (len > 0) setPathLength(len);
      } else {
        setPathLength((containerHeight || 1300) * 1.25);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const timer = setTimeout(updateDimensions, 200);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, [milestoneYPositions, containerHeight]);

  // Sample a point and its tangent angle at a given distance along the path
  const samplePointAt = (dist: number): Point => {
    const clamped = Math.max(0, Math.min(pathLength, dist));

    if (!pathRef.current || typeof pathRef.current.getPointAtLength !== "function" || pathLength <= 0) {
      const ratio = clamped / (pathLength || 1400);
      return { x: 120 + Math.sin(ratio * Math.PI * 4) * 60, y: ratio * h, angle: 90 };
    }

    const pt = pathRef.current.getPointAtLength(clamped);

    // Compute tangent rotation angle using a small delta along the curve
    const delta = 3.5;
    const ptNext = pathRef.current.getPointAtLength(Math.min(pathLength, clamped + delta));
    const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * (180 / Math.PI);

    return { x: pt.x, y: pt.y, angle };
  };

  // Sync serpent movement directly with scroll progress
  useMotionValueEvent(scrollProgress, "change", (latest) => {
    if (prefersReducedMotion || !pathRef.current || pathLength <= 0) return;

    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 180);

    // Keep progress safely mapped along the timeline
    const clampedProgress = Math.max(0.01, Math.min(0.99, latest));
    setCurrentProgress(clampedProgress);

    const targetDist = clampedProgress * pathLength;
    const head = samplePointAt(targetDist);
    setHeadPos(head);

    // Articulate 26 muscular, overlapping scale vertebrae segments behind head
    const segmentCount = 26;
    const segmentSpacing = 10.5; // spacing in pixels along curve

    const newSegments: Point[] = [];
    for (let i = 1; i <= segmentCount; i++) {
      const segDist = targetDist - i * segmentSpacing;
      newSegments.push(samplePointAt(segDist));
    }
    setBodySegments(newSegments);
  });

  // Calculate static state on mount if reduced motion is enabled
  useEffect(() => {
    if (prefersReducedMotion && pathRef.current && pathLength > 0) {
      const head = samplePointAt(pathLength * 0.15);
      setHeadPos(head);
    }
  }, [prefersReducedMotion, pathLength]);

  const traversedLength = currentProgress * pathLength;

  return (
    <div
      ref={containerRef}
      className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-44 lg:w-56 pointer-events-none select-none z-0 lg:z-20"
    >
      {/* ── Layer 1: Background Ancient Banyan Aerial Root Pillars & Canopy ── */}
      <BanyanTreeEnvironment height={h} width={curveWidth} layer="background" />

      {/* ── Layer 2: Main Serpent & Interactive Timeline Conduits ── */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible z-10"
        viewBox={`0 0 ${curveWidth} ${h}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Metallic Serpent Skin Gradient - Obsidian & Titanium */}
          <linearGradient id="serpentSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#384964" />
            <stop offset="25%" stopColor="#1E293B" />
            <stop offset="65%" stopColor="#0F172A" />
            <stop offset="90%" stopColor="#050811" />
            <stop offset="100%" stopColor="#020408" />
          </linearGradient>

          {/* Underbelly Ventral Scale Gradient */}
          <linearGradient id="ventralScaleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#162032" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#070B14" />
          </linearGradient>

          {/* Spine Bio-Energy Conduits */}
          <linearGradient id="spinalEnergyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(173, 80%, 45%)" />
            <stop offset="50%" stopColor="hsl(78, 72%, 52%)" />
            <stop offset="100%" stopColor="hsl(173, 80%, 45%)" />
          </linearGradient>

          {/* Traversed Bio-Energy Trail along Banyan Path */}
          <linearGradient id="traversedTrailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(173, 80%, 45%)" stopOpacity="0.4" />
            <stop offset="60%" stopColor="hsl(173, 80%, 45%)" stopOpacity="0.9" />
            <stop offset="98%" stopColor="hsl(78, 72%, 55%)" stopOpacity="1" />
          </linearGradient>

          {/* Realistic Specular Bevel Filter */}
          <filter id="metallicBevel" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.85" />
          </filter>

          {/* Subtle Sensory Eye Glow Filter */}
          <filter id="serpentEyeGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Subtle Root Energy Glow */}
          <filter id="rootPulseGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── 1. Dormant Banyan Path Guide (Dark Organic Root Track) ── */}
        <path
          d={pathD}
          fill="none"
          stroke="#162032"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />

        {/* Micro root fiber texture along path */}
        <path
          d={pathD}
          fill="none"
          stroke="hsl(173, 80%, 40%)"
          strokeWidth="1"
          strokeDasharray="2 10"
          strokeOpacity="0.25"
        />

        {/* ── 2. Traversed Bio-Energy Conduit trailing behind Serpent ── */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="url(#traversedTrailGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - traversedLength}
          filter="url(#rootPulseGlow)"
          className="transition-all duration-75"
        />

        {/* ── 3. Organic Banyan Root Connectors to Milestones ── */}
        {[p0, p1, p2, p3].map((yPos, i) => {
          const isActivated = i <= activeMilestoneIndex;
          const isCurrent = i === activeMilestoneIndex;
          const rootOriginX = i % 2 === 0 ? 205 : 200;

          return (
            <g key={i}>
              {/* Organic gnarled root connector branch extending toward Experience Card */}
              <path
                d={`M ${rootOriginX} ${yPos} Q ${rootOriginX + 20} ${yPos - 6} ${curveWidth - 10} ${yPos}`}
                fill="none"
                stroke={isActivated ? "hsl(173, 80%, 45%)" : "#1E293B"}
                strokeWidth={isActivated ? "2.5" : "1.5"}
                strokeDasharray={isActivated ? "none" : "3 4"}
                filter={isActivated ? "url(#rootPulseGlow)" : undefined}
                className="transition-all duration-300"
              />

              {/* Secondary micro-root tendril wrapping under the connector */}
              <path
                d={`M ${rootOriginX + 5} ${yPos + 4} Q ${rootOriginX + 22} ${yPos + 10} ${curveWidth - 18} ${yPos + 3}`}
                fill="none"
                stroke="#162032"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />

              {/* Milestone Banyan Node Knot */}
              <g transform={`translate(${rootOriginX}, ${yPos})`}>
                {/* Active Bio-Shockwave Ring */}
                {isCurrent && (
                  <circle
                    cx="0"
                    cy="0"
                    r="12"
                    fill="none"
                    stroke="hsl(78, 72%, 52%)"
                    strokeWidth="1.2"
                    className="animate-ping opacity-75"
                  />
                )}

                {/* Outer Root Knot */}
                <circle
                  cx="0"
                  cy="0"
                  r="7"
                  fill="#0B0F19"
                  stroke={isActivated ? "hsl(173, 80%, 45%)" : "#334155"}
                  strokeWidth="2"
                  className="transition-colors duration-300"
                />

                {/* Glowing Core Gem */}
                <circle
                  cx="0"
                  cy="0"
                  r="3.5"
                  fill={
                    isCurrent
                      ? "hsl(78, 72%, 52%)"
                      : isActivated
                      ? "hsl(173, 80%, 45%)"
                      : "#1E293B"
                  }
                  filter={isActivated ? "url(#serpentEyeGlow)" : undefined}
                  className="transition-colors duration-300"
                />
              </g>
            </g>
          );
        })}

        {/* ── 4. The 3D Banyan Tech Serpent ── */}
        {!prefersReducedMotion && (
          <g filter="url(#metallicBevel)">
            {/* A. Articulated Muscular Scale Vertebrae (Tail to Neck) */}
            {bodySegments.map((seg, idx) => {
              // Taper size from neck (idx 0) down to tail tip (idx 25)
              const ratio = 1 - idx / bodySegments.length; // 1 at neck, 0 at tail
              const scale = 0.35 + ratio * 0.65; // Scale from 0.35 to 1.0
              const width = 24 * scale;
              const height = 14 * scale;

              return (
                <g
                  key={idx}
                  transform={`translate(${seg.x}, ${seg.y}) rotate(${seg.angle})`}
                >
                  {/* Ventral belly scale shadow underneath */}
                  <ellipse
                    cx={-width * 0.15}
                    cy={0}
                    rx={width * 0.48}
                    ry={height * 0.48}
                    fill="url(#ventralScaleGrad)"
                    opacity="0.9"
                  />

                  {/* Overlapping Dorsal Scale Chevron (Hexagonal Scute) */}
                  <polygon
                    points={`
                      ${width * 0.45},0
                      ${width * 0.1},${-height * 0.5}
                      ${-width * 0.45},${-height * 0.42}
                      ${-width * 0.3},0
                      ${-width * 0.45},${height * 0.42}
                      ${width * 0.1},${height * 0.5}
                    `}
                    fill="url(#serpentSkinGrad)"
                    stroke="hsl(173, 80%, 35%)"
                    strokeWidth="0.75"
                    strokeOpacity={0.4 + ratio * 0.5}
                  />

                  {/* Specular Beveled Ridge along outer edge */}
                  <path
                    d={`M ${-width * 0.35} ${-height * 0.35} L ${width * 0.15} ${-height * 0.42} L ${width * 0.4} 0`}
                    fill="none"
                    stroke="#64748B"
                    strokeWidth="0.8"
                    strokeOpacity="0.4"
                  />

                  {/* Spinal Luminescent Bio-Energy Conduit line */}
                  <line
                    x1={-width * 0.35}
                    y1="0"
                    x2={width * 0.35}
                    y2="0"
                    stroke={idx < 8 ? "hsl(78, 72%, 52%)" : "hsl(173, 80%, 48%)"}
                    strokeWidth={1.4 * scale}
                    strokeOpacity={0.85}
                  />
                </g>
              );
            })}

            {/* B. Sophisticated 3D Viper / Python Head */}
            <g transform={`translate(${headPos.x}, ${headPos.y}) rotate(${headPos.angle})`}>
              {/* Viper Cranial Silhouette: Broad spatulate temporal jaw tapering to sculpted snout */}
              <path
                d={`
                  M 20 0
                  C 16 -5 10 -9 4 -12
                  C -4 -15 -14 -14 -18 -8
                  C -20 -4 -20 4 -18 8
                  C -14 14 -4 15 4 12
                  C 10 9 16 5 20 0
                  Z
                `}
                fill="url(#serpentSkinGrad)"
                stroke="hsl(173, 80%, 45%)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* Specular Beveled Cranial Plates */}
              <path
                d={`
                  M -14 -6
                  C -8 -11 2 -10 10 -4
                  L 18 0
                  L 10 4
                  C 2 10 -8 11 -14 6
                  Z
                `}
                fill="#162032"
                stroke="#64748B"
                strokeWidth="0.75"
                strokeOpacity="0.5"
              />

              {/* Supraocular Brow Ridges (Giving intense focused gaze) */}
              <path
                d="M 2 -8 L 9 -4 L 4 -2"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="0.9"
                strokeOpacity="0.7"
              />
              <path
                d="M 2 8 L 9 4 L 4 2"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="0.9"
                strokeOpacity="0.7"
              />

              {/* Dual Glowing Reptilian Sensor Eyes (Slit Lenses) */}
              {/* Left Eye */}
              <g transform="translate(5, -5.5)">
                <ellipse
                  cx="0"
                  cy="0"
                  rx="3.2"
                  ry="1.6"
                  transform="rotate(-15)"
                  fill="hsl(78, 72%, 52%)"
                  filter="url(#serpentEyeGlow)"
                />
                {/* Slit Pupil */}
                <line
                  x1="0"
                  y1="-1.6"
                  x2="0"
                  y2="1.6"
                  stroke="#05080E"
                  strokeWidth="0.8"
                />
              </g>

              {/* Right Eye */}
              <g transform="translate(5, 5.5)">
                <ellipse
                  cx="0"
                  cy="0"
                  rx="3.2"
                  ry="1.6"
                  transform="rotate(15)"
                  fill="hsl(78, 72%, 52%)"
                  filter="url(#serpentEyeGlow)"
                />
                {/* Slit Pupil */}
                <line
                  x1="0"
                  y1="-1.6"
                  x2="0"
                  y2="1.6"
                  stroke="#05080E"
                  strokeWidth="0.8"
                />
              </g>

              {/* Loreal Heat-Sensing Pits & Nostrils */}
              <circle cx="14" cy="-2.5" r="0.9" fill="#05080E" />
              <circle cx="14" cy="2.5" r="0.9" fill="#05080E" />
              <circle cx="9" cy="-4" r="0.8" fill="#05080E" />
              <circle cx="9" cy="4" r="0.8" fill="#05080E" />

              {/* Central Cranial Bio-Energy Core */}
              <circle
                cx="-2"
                cy="0"
                r="1.8"
                fill="hsl(173, 80%, 48%)"
                filter="url(#serpentEyeGlow)"
              />

              {/* Snout Emitter Node */}
              <circle
                cx="19.5"
                cy="0"
                r="1.2"
                fill="hsl(78, 72%, 55%)"
                filter="url(#serpentEyeGlow)"
              />

              {/* Cyber-Bionic Forked Sensory Tongue (Flicks when scrolling) */}
              {isScrolling && (
                <g opacity="0.9">
                  <line
                    x1="20"
                    y1="0"
                    x2="28"
                    y2="0"
                    stroke="hsl(78, 72%, 55%)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <line
                    x1="28"
                    y1="0"
                    x2="33"
                    y2="-2.5"
                    stroke="hsl(78, 72%, 55%)"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                  <line
                    x1="28"
                    y1="0"
                    x2="33"
                    y2="2.5"
                    stroke="hsl(78, 72%, 55%)"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </g>
          </g>
        )}
      </svg>

      {/* ── Layer 3: Foreground Hanging Aerial Tendrils (Occluding Serpent for 3D Depth) ── */}
      <BanyanTreeEnvironment height={h} width={curveWidth} layer="foreground" />
    </div>
  );
};
