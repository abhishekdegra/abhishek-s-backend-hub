import React from "react";

interface BanyanTreeProps {
  height: number;
  width?: number;
  layer?: "background" | "foreground";
}

/**
 * Abstract Banyan Tree Environment:
 * Renders ancient aerial prop roots, hanging vines, gnarled bark structures,
 * and subtle atmospheric depth along the timeline track.
 */
export const BanyanTreeEnvironment: React.FC<BanyanTreeProps> = ({
  height,
  width = 260,
  layer = "background",
}) => {
  const h = Math.max(1000, height);

  if (layer === "foreground") {
    // Foreground aerial tendrils that pass IN FRONT of the serpent for realistic 3D depth
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
        viewBox={`0 0 ${width} ${h}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="foreTendrilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#0F172A" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#1E293B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#090D16" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="tendrilGlint" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(173, 80%, 45%)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#334155" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Hanging Aerial Tendril 1 - drops in front of upper S-curve */}
        <g opacity="0.85">
          <path
            d={`M 115 30 Q 112 ${h * 0.25} 118 ${h * 0.48}`}
            fill="none"
            stroke="url(#foreTendrilGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d={`M 114 30 Q 111 ${h * 0.25} 117 ${h * 0.48}`}
            fill="none"
            stroke="hsl(173, 80%, 45%)"
            strokeWidth="0.75"
            strokeOpacity="0.35"
          />
        </g>

        {/* Hanging Aerial Tendril 2 - drops in front of mid S-curve */}
        <g opacity="0.9">
          <path
            d={`M 160 ${h * 0.28} Q 155 ${h * 0.55} 162 ${h * 0.78}`}
            fill="none"
            stroke="url(#foreTendrilGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d={`M 159 ${h * 0.28} Q 154 ${h * 0.55} 161 ${h * 0.78}`}
            fill="none"
            stroke="hsl(78, 72%, 52%)"
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />
          {/* Micro root offshoot */}
          <path
            d={`M 158 ${h * 0.52} Q 148 ${h * 0.56} 142 ${h * 0.62}`}
            fill="none"
            stroke="#1E293B"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>

        {/* Hanging Aerial Tendril 3 - drops in front of lower S-curve */}
        <g opacity="0.85">
          <path
            d={`M 125 ${h * 0.62} Q 120 ${h * 0.82} 128 ${h * 0.98}`}
            fill="none"
            stroke="url(#foreTendrilGrad)"
            strokeWidth="3.0"
            strokeLinecap="round"
          />
          <path
            d={`M 124 ${h * 0.62} Q 119 ${h * 0.82} 127 ${h * 0.98}`}
            fill="none"
            stroke="hsl(173, 80%, 45%)"
            strokeWidth="0.7"
            strokeOpacity="0.25"
          />
        </g>
      </svg>
    );
  }

  // Background ancient banyan aerial root pillars and overhead canopy structure
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox={`0 0 ${width} ${h}`}
      preserveAspectRatio="none"
    >
      <defs>
        {/* Ancient Bark Metallic Gradient */}
        <linearGradient id="banyanPillar1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0B0F19" />
          <stop offset="35%" stopColor="#1E293B" />
          <stop offset="70%" stopColor="#162032" />
          <stop offset="100%" stopColor="#080C14" />
        </linearGradient>

        <linearGradient id="banyanPillar2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#080C14" />
          <stop offset="40%" stopColor="#1E2638" />
          <stop offset="75%" stopColor="#121A28" />
          <stop offset="100%" stopColor="#05080E" />
        </linearGradient>

        <linearGradient id="canopyBranch" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#0F172A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#090D16" stopOpacity="0.4" />
        </linearGradient>

        {/* Ambient atmospheric teal glow */}
        <radialGradient id="rootAmbientGlow" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="hsl(173, 80%, 40%)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="hsl(173, 80%, 40%)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Atmospheric root glow */}
      <circle cx="70" cy={h * 0.25} r="180" fill="url(#rootAmbientGlow)" />
      <circle cx="60" cy={h * 0.7} r="200" fill="url(#rootAmbientGlow)" />

      {/* ── 1. Overhead Canopy Bough Arch ── */}
      <path
        d={`M -20 -10 Q 50 40 140 18 Q 200 4 270 -15 L 270 -30 L -20 -30 Z`}
        fill="url(#canopyBranch)"
        opacity="0.8"
      />
      <path
        d={`M 0 5 Q 80 45 180 25`}
        fill="none"
        stroke="hsl(173, 80%, 45%)"
        strokeWidth="1.2"
        strokeOpacity="0.25"
      />

      {/* ── 2. Massive Ancient Pillar Aerial Root (Left Spine) ── */}
      {/* Drops from canopy to subterranean base with organic taper & gnarled knots */}
      <path
        d={`
          M 28 0
          C 32 ${h * 0.15} 45 ${h * 0.25} 38 ${h * 0.4}
          C 30 ${h * 0.55} 48 ${h * 0.7} 42 ${h * 0.85}
          C 36 ${h * 0.92} 25 ${h * 0.98} 10 ${h}
          L 55 ${h}
          C 58 ${h * 0.92} 52 ${h * 0.85} 56 ${h * 0.7}
          C 60 ${h * 0.55} 44 ${h * 0.4} 48 ${h * 0.25}
          C 52 ${h * 0.15} 42 0 42 0
          Z
        `}
        fill="url(#banyanPillar1)"
        stroke="#27354A"
        strokeWidth="0.8"
        strokeOpacity="0.45"
      />

      {/* Internal bark striation texture lines on Primary Pillar */}
      <path
        d={`M 36 0 C 40 ${h * 0.15} 49 ${h * 0.25} 44 ${h * 0.4} C 36 ${h * 0.55} 53 ${h * 0.7} 47 ${h * 0.85} C 41 ${h * 0.92} 32 ${h * 0.98} 25 ${h}`}
        fill="none"
        stroke="#334155"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="8 6"
      />
      <path
        d={`M 31 0 C 35 ${h * 0.15} 41 ${h * 0.25} 35 ${h * 0.4} C 28 ${h * 0.55} 44 ${h * 0.7} 38 ${h * 0.85} C 32 ${h * 0.92} 18 ${h * 0.98} 14 ${h}`}
        fill="none"
        stroke="hsl(173, 80%, 45%)"
        strokeWidth="0.6"
        strokeOpacity="0.2"
      />

      {/* ── 3. Secondary Intertwined Prop Root (Right Banyan Column) ── */}
      <path
        d={`
          M 78 20
          C 86 ${h * 0.18} 74 ${h * 0.32} 84 ${h * 0.48}
          C 92 ${h * 0.62} 76 ${h * 0.78} 86 ${h * 0.92}
          C 90 ${h * 0.96} 98 ${h} 105 ${h}
          L 88 ${h}
          C 78 ${h * 0.95} 70 ${h * 0.78} 76 ${h * 0.62}
          C 68 ${h * 0.48} 76 ${h * 0.32} 70 ${h * 0.18}
          Z
        `}
        fill="url(#banyanPillar2)"
        stroke="#27354A"
        strokeWidth="0.75"
        strokeOpacity="0.4"
      />

      {/* ── 4. Background Aerial Vines & Hanging Root Tendrils ── */}
      {/* Background Vine A */}
      <path
        d={`M 62 10 Q 56 ${h * 0.3} 64 ${h * 0.62} Q 70 ${h * 0.85} 62 ${h}`}
        fill="none"
        stroke="#1E293B"
        strokeWidth="2.5"
        strokeOpacity="0.6"
      />
      {/* Background Vine B */}
      <path
        d={`M 92 80 Q 98 ${h * 0.35} 90 ${h * 0.68} Q 82 ${h * 0.88} 94 ${h}`}
        fill="none"
        stroke="#1E293B"
        strokeWidth="2"
        strokeOpacity="0.5"
      />

      {/* ── 5. Subterranean Buttress Base Roots (Bottom Anchor) ── */}
      <path
        d={`M 25 ${h - 60} Q 0 ${h - 20} -20 ${h}`}
        fill="none"
        stroke="#1E293B"
        strokeWidth="4"
        strokeOpacity="0.6"
      />
      <path
        d={`M 95 ${h - 70} Q 140 ${h - 25} 170 ${h}`}
        fill="none"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeOpacity="0.5"
      />
    </svg>
  );
};
