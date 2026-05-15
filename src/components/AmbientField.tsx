/**
 * AmbientField — gently swaying ("ゆらゆら") background particles.
 *
 * Always-visible motes that wobble + pulse. Unlike HeroBackdrop's
 * bloom-and-fade novas, these are steady ambient dust — they never
 * fully disappear, they just drift.
 *
 * Each particle has a wobble (outer) + pulse (inner) composite so
 * the two animations don't fight for the same transform property.
 *
 * Positions are deterministic so SSR and client agree.
 */

type Hue = "twilight" | "windowLight" | "sunsetPink" | "deep";

interface AmbientFieldProps {
  /** How many particles to scatter. */
  count?: number;
  /**
   * Color mix; first weight is heaviest. Keep ≤ 4 entries.
   * Default = balanced twilight + gold sprinkle.
   */
  palette?: ReadonlyArray<Hue>;
  /** Pixel size range. Default 2–5px. */
  sizeRange?: [number, number];
  /** Max opacity at peak pulse. Default 0.6 (subtle on light bg). */
  maxOpacity?: number;
  /** Seed offset so different sections get different layouts. */
  seed?: number;
  /**
   * Exclude particles from a centered safe-zone (so they don't sit
   * directly on top of the section's copy). Percentages.
   */
  safeZone?: { x0: number; y0: number; x1: number; y1: number };
}

const HUE_COLOR: Record<Hue, string> = {
  twilight: "#4A7BC7",
  windowLight: "#FFD89E",
  sunsetPink: "#FF8AB4",
  deep: "#8FB8E8",
};
const HUE_GLOW: Record<Hue, string> = {
  twilight: "rgba(74, 123, 199, 0.65)",
  windowLight: "rgba(255, 216, 158, 0.7)",
  sunsetPink: "rgba(255, 138, 180, 0.7)",
  deep: "rgba(143, 184, 232, 0.55)",
};

const WOBBLES = ["ambient-wobble-a", "ambient-wobble-b", "ambient-wobble-c"];

export default function AmbientField({
  count = 22,
  palette = ["twilight", "windowLight"],
  sizeRange = [2, 5],
  maxOpacity = 0.6,
  seed = 0,
  safeZone,
}: AmbientFieldProps) {
  const seeds = generate(count, palette, sizeRange, seed, safeZone);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {seeds.map((p, i) => {
        const wobble = WOBBLES[i % WOBBLES.length];
        return (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: maxOpacity,
              animation: `${wobble} ${p.wobbleDur}s ease-in-out ${p.wobbleDelay}s infinite`,
              willChange: "transform",
            }}
          >
            <span
              className="block rounded-full"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: HUE_COLOR[p.hue],
                boxShadow: `0 0 ${p.size * 4}px ${HUE_GLOW[p.hue]}`,
                animation: `ambient-pulse ${p.pulseDur}s ease-in-out ${p.pulseDelay}s infinite`,
                willChange: "opacity, transform",
              }}
            />
          </span>
        );
      })}
    </div>
  );
}

interface ParticleSeed {
  x: number;
  y: number;
  size: number;
  hue: Hue;
  pulseDur: number;
  pulseDelay: number;
  wobbleDur: number;
  wobbleDelay: number;
}

function generate(
  count: number,
  palette: ReadonlyArray<Hue>,
  sizeRange: [number, number],
  seed: number,
  safeZone: AmbientFieldProps["safeZone"],
): ParticleSeed[] {
  const [sMin, sMax] = sizeRange;
  const out: ParticleSeed[] = [];
  for (let i = 0; i < count; i++) {
    const k = i + seed * 1000;
    let x = hash(k * 73 + 11) % 100;
    let y = hash(k * 41 + 7) % 100;

    if (safeZone) {
      const inSafe =
        x >= safeZone.x0 && x <= safeZone.x1 && y >= safeZone.y0 && y <= safeZone.y1;
      if (inSafe) {
        // Push outward to nearer edge
        const dxLeft = x - safeZone.x0;
        const dxRight = safeZone.x1 - x;
        if (dxLeft < dxRight) {
          x = Math.max(2, safeZone.x0 - 4);
        } else {
          x = Math.min(98, safeZone.x1 + 4);
        }
      }
    }

    const size = sMin + (hash(k * 19 + 3) % Math.max(1, sMax - sMin + 1));
    const pulseDur = 4 + (hash(k * 29 + 5) % 50) / 10; // 4.0–9.0s
    const pulseDelay = (hash(k * 53 + 17) % 80) / 10; // 0.0–8.0s
    const wobbleDur = 8 + (hash(k * 67 + 23) % 80) / 10; // 8.0–16.0s
    const wobbleDelay = (hash(k * 89 + 31) % 100) / 10; // 0.0–10.0s

    const hue = palette[hash(k * 7 + 31) % palette.length];

    out.push({
      x: clamp(x, 2, 98),
      y: clamp(y, 2, 98),
      size,
      hue,
      pulseDur,
      pulseDelay,
      wobbleDur,
      wobbleDelay,
    });
  }
  return out;
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
