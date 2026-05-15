/**
 * Hero background "nova field" — composite ambient animation.
 *
 * Layers (back to front):
 *  1. Constellation lines — gradient strokes that pulse in / out like
 *     data connections forming.
 *  2. Concentric ripples — radio-wave rings emanating from focal points.
 *  3. Shooting-star streaks — horizontal + slight-angle light trails.
 *  4. Particle field — 84 small "novas" bloom-and-fade.
 *  5. Supernova flashes — 2 rare, very bright events on a long cycle.
 *
 * Pure CSS keyframes (see globals.css). All positions are deterministic so
 * SSR and client agree. Respects `prefers-reduced-motion` via globals.css.
 */

type Hue = "twilight" | "windowLight" | "deep" | "sunsetPink";

interface NovaSeed {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  hue: Hue;
  drift: boolean;
}

interface StreakSeed {
  x: number; // %, starting offset
  y: number;
  width: number;
  duration: number;
  delay: number;
  hue: Hue;
  angle: number; // deg
}

interface RippleSeed {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  hue: Hue;
}

interface SupernovaSeed {
  x: number;
  y: number;
  size: number; // base diameter px (will scale up to 4.5x)
  duration: number;
  delay: number;
  hue: Hue;
}

interface LineSeed {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  duration: number;
  delay: number;
}

const PARTICLES: NovaSeed[] = generateParticles(84);
const STREAKS: StreakSeed[] = [
  { x: -10, y: 14, width: 240, duration: 7, delay: 0.5, hue: "twilight", angle: 0 },
  { x: -10, y: 28, width: 260, duration: 8, delay: 3.0, hue: "sunsetPink", angle: -3 },
  { x: -10, y: 42, width: 280, duration: 9, delay: 1.8, hue: "windowLight", angle: 2 },
  { x: -10, y: 58, width: 220, duration: 6, delay: 5.4, hue: "twilight", angle: 0 },
  { x: -10, y: 72, width: 240, duration: 7, delay: 2.7, hue: "sunsetPink", angle: -2 },
  { x: -10, y: 86, width: 200, duration: 10, delay: 0, hue: "windowLight", angle: 1 },
];
const RIPPLES: RippleSeed[] = [
  { x: 14, y: 28, size: 160, duration: 8, delay: 0, hue: "twilight" },
  { x: 86, y: 70, size: 180, duration: 9, delay: 2.5, hue: "sunsetPink" },
  { x: 22, y: 78, size: 140, duration: 7, delay: 4.5, hue: "windowLight" },
  { x: 78, y: 22, size: 170, duration: 10, delay: 1.2, hue: "twilight" },
  { x: 50, y: 92, size: 130, duration: 6, delay: 3.5, hue: "sunsetPink" },
];
const SUPERNOVAS: SupernovaSeed[] = [
  { x: 16, y: 22, size: 26, duration: 14, delay: 1, hue: "sunsetPink" },
  { x: 84, y: 78, size: 28, duration: 16, delay: 7, hue: "twilight" },
  { x: 88, y: 18, size: 22, duration: 18, delay: 4, hue: "windowLight" },
];
const LINES: LineSeed[] = [
  { x1: 10, y1: 18, x2: 24, y2: 34, duration: 8, delay: 0 },
  { x1: 24, y1: 34, x2: 16, y2: 58, duration: 9, delay: 1.5 },
  { x1: 16, y1: 58, x2: 8, y2: 78, duration: 7, delay: 3 },
  { x1: 76, y1: 22, x2: 88, y2: 38, duration: 8, delay: 0.8 },
  { x1: 88, y1: 38, x2: 82, y2: 62, duration: 9, delay: 2.4 },
  { x1: 82, y1: 62, x2: 92, y2: 84, duration: 7, delay: 4.2 },
  { x1: 6, y1: 84, x2: 22, y2: 92, duration: 10, delay: 5 },
  { x1: 78, y1: 88, x2: 94, y2: 76, duration: 8, delay: 6.5 },
];

const HUE_COLOR: Record<Hue, string> = {
  twilight: "#4A7BC7",
  windowLight: "#FFD89E",
  deep: "#8FB8E8",
  sunsetPink: "#FF8AB4",
};
const HUE_GLOW: Record<Hue, string> = {
  twilight: "rgba(74, 123, 199, 0.85)",
  windowLight: "rgba(255, 216, 158, 0.85)",
  deep: "rgba(143, 184, 232, 0.7)",
  sunsetPink: "rgba(255, 138, 180, 0.85)",
};
const HUE_GLOW_STRONG: Record<Hue, string> = {
  twilight: "rgba(74, 123, 199, 0.95)",
  windowLight: "rgba(255, 216, 158, 0.95)",
  deep: "rgba(143, 184, 232, 0.9)",
  sunsetPink: "rgba(255, 138, 180, 0.95)",
};

export default function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Constellation lines (SVG, beneath everything else) */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {LINES.map((l, i) => (
          <line
            key={`l-${i}`}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="#4A7BC7"
            strokeWidth="0.15"
            strokeDasharray="200"
            style={{
              opacity: 0,
              animation: `hero-line ${l.duration}s ease-in-out ${l.delay}s infinite`,
              willChange: "opacity, stroke-dashoffset",
            }}
          />
        ))}
      </svg>

      {/* Ripples — concentric radio-wave rings */}
      {RIPPLES.map((r, i) => {
        const borderColor =
          r.hue === "windowLight"
            ? "rgba(255,216,158,0.55)"
            : r.hue === "sunsetPink"
              ? "rgba(255,138,180,0.55)"
              : "rgba(74,123,199,0.5)";
        return (
          <span
            key={`r-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${r.x}%`,
              top: `${r.y}%`,
              width: `${r.size}px`,
              height: `${r.size}px`,
              marginLeft: `-${r.size / 2}px`,
              marginTop: `-${r.size / 2}px`,
              border: `1.5px solid ${borderColor}`,
              opacity: 0,
              animation: `hero-ripple ${r.duration}s ease-out ${r.delay}s infinite`,
              willChange: "opacity, transform",
            }}
          />
        );
      })}

      {/* Streaks — shooting stars (half-density on mobile) */}
      {STREAKS.map((s, i) => {
        const color = HUE_COLOR[s.hue];
        const glow = HUE_GLOW_STRONG[s.hue];
        return (
          <span
            key={`s-${i}`}
            className="decor-mobile-half absolute"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.width}px`,
              height: "1.6px",
              background: `linear-gradient(to right, transparent, ${color} 50%, transparent)`,
              boxShadow: `0 0 14px 1.5px ${glow}`,
              opacity: 0,
              transform: `rotate(${s.angle}deg)`,
              transformOrigin: "left center",
              animation: `hero-streak ${s.duration}s ease-out ${s.delay}s infinite`,
              willChange: "opacity, transform",
            }}
          />
        );
      })}

      {/* Particles — novas being generated, with a gentle wobble overlay */}
      {PARTICLES.map((n, i) => {
        const wobble = ["ambient-wobble-a", "ambient-wobble-b", "ambient-wobble-c"][i % 3];
        const wobbleDur = 9 + ((i * 7) % 70) / 10;
        return (
          <span
            key={`p-${i}`}
            className="absolute"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              animation: `${wobble} ${wobbleDur}s ease-in-out ${n.delay}s infinite`,
              willChange: "transform",
            }}
          >
            <span
              className="block rounded-full"
              style={{
                width: `${n.size}px`,
                height: `${n.size}px`,
                backgroundColor: HUE_COLOR[n.hue],
                boxShadow: `0 0 ${n.size * 6}px ${n.size}px ${HUE_GLOW[n.hue]}`,
                opacity: 0,
                animation: `hero-nova ${n.duration}s ease-out ${n.delay}s infinite`,
                willChange: "opacity, transform",
              }}
            />
          </span>
        );
      })}

      {/* Supernovas — rare, larger, brighter events (hidden on mobile) */}
      {SUPERNOVAS.map((s, i) => {
        const color = HUE_COLOR[s.hue];
        const glow = HUE_GLOW_STRONG[s.hue];
        return (
          <span
            key={`sn-${i}`}
            className="decor-mobile-hide absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              marginLeft: `-${s.size / 2}px`,
              marginTop: `-${s.size / 2}px`,
              backgroundColor: color,
              boxShadow: `0 0 ${s.size * 4}px ${s.size / 2}px ${glow}`,
              opacity: 0,
              animation: `hero-supernova ${s.duration}s ease-out ${s.delay}s infinite`,
              willChange: "opacity, transform",
            }}
          />
        );
      })}
    </div>
  );
}

function generateParticles(count: number): NovaSeed[] {
  const seeds: NovaSeed[] = [];
  for (let i = 0; i < count; i++) {
    const xRaw = hash(i * 73 + 11) % 100;
    const yRaw = hash(i * 41 + 7) % 100;

    // Avoid the central copy zone (x: 26–74, y: 30–66)
    const inSafeZone = xRaw >= 26 && xRaw <= 74 && yRaw >= 30 && yRaw <= 66;
    const x = inSafeZone ? (xRaw < 50 ? xRaw - 24 : xRaw + 24) : xRaw;
    const y = yRaw;

    const size = 2 + (hash(i * 19 + 3) % 4); // 2–5 px
    const duration = 4.5 + ((hash(i * 29 + 5) % 50) / 10); // 4.5–9.5s
    const delay = (hash(i * 53 + 17) % 90) / 10; // 0.0–9.0s

    // Color mix: ~55% twilight, ~18% pink, ~17% gold, ~10% deep blue
    const r = hash(i * 7 + 31) % 20;
    const hue: Hue =
      r < 3 ? "sunsetPink"
        : r < 6 ? "windowLight"
          : r < 8 ? "deep"
            : "twilight";

    // Half the particles get a slow vertical drift overlay
    const drift = i % 2 === 0;

    seeds.push({
      x: clamp(x, 2, 98),
      y: clamp(y, 2, 98),
      size,
      duration,
      delay,
      hue,
      drift,
    });
  }
  return seeds;
}

function hash(n: number): number {
  let h = n;
  h = (h ^ 61) ^ (h >>> 16);
  h = h + (h << 3);
  h = h ^ (h >>> 4);
  h = h * 0x27d4eb2d;
  h = h ^ (h >>> 15);
  return Math.abs(h);
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
