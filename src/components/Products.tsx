import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/Reveal";
import { asset } from "@/lib/asset";

const PILLARS: Array<{ no: string; label: string; body: React.ReactNode }> = [
  {
    no: "01",
    label: "VOICE",
    body: (
      <>
        ゼロパーティデータ＝顧客が意思を持って渡す声。
        <br />
        プラットフォームの所有物ではなく、企業の資産。
      </>
    ),
  },
  {
    no: "02",
    label: "RHYTHM",
    body: (
      <>
        声には独自の強度・タイミング・周波数がある。
        <br />
        Z-Data はその脈動を捉え、シグナルに変換する。
      </>
    ),
  },
  {
    no: "03",
    label: "ASSET",
    body: (
      <>
        ノイズをアセットへ。AI がナレッジと統合し、
        <br />
        個社別の営業・マーケアセットを自動生成。
      </>
    ),
  },
];

export default function Products() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative isolate overflow-hidden bg-niteflyte text-white py-16 sm:py-20 lg:py-32"
    >
      {/* Slow hue drift behind everything for vapor-wave feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 animate-zdata-hue-drift"
      >
        <NeonHalo />
        <DriftingBlobs />
        <Stars />
      </div>

      {/* Bottom reflection ripple — light dancing on water */}
      <BottomReflection />

      {/* Horizontal scanlines sweeping through */}
      <Scanlines />

      {/* City silhouette */}
      <CitySilhouette />

      <Container className="relative z-10">
        <div className="text-center">
          <Reveal>
            <Eyebrow tone="windowLight">Products</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              id="products-heading"
              className="mt-3 text-[26px] leading-[1.3] tracking-[-0.02em] font-bold sm:mt-4 sm:text-[32px] lg:text-h1"
            >
              私たちが作っているもの
            </h2>
          </Reveal>
        </div>

        {/* Z-Data logo with concentric Z-Bar soundwave rings */}
        <div className="mt-12 flex flex-col items-center text-center sm:mt-16">
          <Reveal delay={0.2}>
            <div className="relative flex items-center justify-center">
              {/* Z-Bar soundwave — concentric rings emanating from the logo */}
              <SoundwaveRings />
              <div className="relative animate-zdata-sway">
                <Image
                  src={asset("/logos/z-data/horizontal/zdata_h_color_on_dark.svg")}
                  alt="Z-Data"
                  width={340}
                  height={89}
                  className="relative h-auto w-[200px] sm:w-[260px] lg:w-[340px]"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-6 animate-zdata-shimmer text-[12px] font-medium tracking-[0.22em] sm:text-[15px] sm:tracking-[0.32em] lg:text-[18px]">
              ゼロパーティデータプラットフォーム
            </p>
          </Reveal>

          {/* Brand statement (v4 hero) — Syne italic, multi-color shimmer */}
          <Reveal delay={0.5}>
            <h3
              className="mt-12 max-w-3xl text-balance font-jp font-bold text-[26px] leading-[1.4] tracking-[-0.01em] animate-zdata-brand-shimmer sm:mt-16 sm:text-[36px] lg:text-[52px] [word-break:keep-all]"
            >
              <span className="inline-block whitespace-nowrap">ビジネスの脈動は、</span>
              <span className="inline-block whitespace-nowrap">顧客の声から始まる。</span>
            </h3>
          </Reveal>

          <Reveal delay={0.65}>
            <p
              className="mt-8 max-w-2xl text-[14px] leading-[1.95] text-white/85 sm:mt-10 sm:text-[16px] lg:text-[17px]"
              style={{ wordBreak: "keep-all" }}
            >
              顧客一人ひとりの声には、それぞれ独自のリズムと強度がある。
              <br className="hidden md:inline" />
              Z-Data は、その「波形」を捉え、
              <br className="hidden md:inline" />
              一過性のノイズではなく構造化データ＆アセットとして可視化する。
            </p>
          </Reveal>
        </div>

        {/* 3 pillars: VOICE / RHYTHM / ASSET */}
        <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 lg:mt-20 lg:grid-cols-3 lg:gap-10">
          {PILLARS.map((p, i) => (
            <Reveal key={p.no} delay={0.15 + i * 0.1}>
              <article className="relative h-full rounded-md border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-7">
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-syne italic text-[28px] font-bold text-windowLight animate-zdata-pillar-pulse sm:text-[34px]"
                    style={{ animationDelay: `${i * 0.6}s` }}
                  >
                    {p.no}
                  </span>
                  <span className="text-[14px] font-bold uppercase tracking-[0.16em] text-zdata-sunsetPink sm:text-[15px]">
                    {p.label}
                  </span>
                </div>
                <p
                  className="mt-4 text-[13px] leading-[1.85] text-white/85 sm:text-[14px] lg:text-[15px]"
                  style={{ wordBreak: "keep-all" }}
                >
                  {p.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Manifesto closing */}
        <Reveal delay={0.2}>
          <p
            className="mt-12 mx-auto max-w-2xl text-center text-[15px] leading-[1.9] text-white/90 sm:mt-16 sm:text-[17px] lg:text-[20px]"
            style={{ wordBreak: "keep-all" }}
          >
            ストリーミング時代に失われた「所有」を、
            <br />
            顧客の声というデータの世界に取り戻す。
            <br />
            <span className="text-windowLight">それが、Z-Data の役割。</span>
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:mt-14">
            <a
              href="https://z-data.io"
              className="group inline-flex w-full max-w-[280px] items-center justify-center gap-2 rounded-sm border-[1.5px] border-white/40 px-8 py-4 text-[15px] font-medium text-white transition-all duration-200 ease-soft hover:border-zdata-sunsetPink hover:text-zdata-sunsetPink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zdata-sunsetPink focus-visible:ring-offset-2 focus-visible:ring-offset-zdata-deepNight sm:w-auto sm:text-[16px]"
            >
              Z-Data について詳しく
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Top neon halo — pink + gold bloom that breathes in/out. */
function NeonHalo() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[40%] overflow-hidden"
    >
      <div
        className="absolute left-1/2 top-[-25%] h-[120%] w-[80%] -translate-x-1/2 rounded-[50%] blur-3xl animate-zdata-neon"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,138,180,0.55) 0%, rgba(255,216,158,0.28) 35%, rgba(74,123,199,0.08) 70%, transparent 100%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}

/** Soundwave concentric rings — Z-Bar concept made visible. */
function SoundwaveRings() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2"
    >
      {[0, 1.2, 2.4].map((delay, i) => (
        <span
          key={i}
          className="absolute left-0 top-0 block h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-windowLight/35 animate-zdata-soundwave sm:h-[240px] sm:w-[240px] lg:h-[320px] lg:w-[320px]"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      {/* Pink accent rings on different phase */}
      {[0.6, 1.8, 3.0].map((delay, i) => (
        <span
          key={`p-${i}`}
          className="absolute left-0 top-0 block h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zdata-sunsetPink/30 animate-zdata-soundwave sm:h-[240px] sm:w-[240px] lg:h-[320px] lg:w-[320px]"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}

/** Three large soft bokeh blobs drifting slowly behind everything. */
function DriftingBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      <div
        className="absolute left-[10%] top-[18%] h-[480px] w-[480px] rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255,138,180,0.55) 0%, rgba(255,138,180,0) 65%)",
          animation: "zdata-blob-a 16s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[8%] top-[35%] h-[520px] w-[520px] rounded-full blur-3xl opacity-55"
        style={{
          background:
            "radial-gradient(circle, rgba(255,216,158,0.5) 0%, rgba(255,216,158,0) 65%)",
          animation: "zdata-blob-b 19s ease-in-out infinite",
        }}
      />
      <div
        className="absolute left-[35%] bottom-[15%] h-[420px] w-[420px] rounded-full blur-3xl opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(143,184,232,0.55) 0%, rgba(143,184,232,0) 65%)",
          animation: "zdata-blob-c 22s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/** Horizontal scanline sweeps — sunset light passing slowly over the city. */
function Scanlines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[60px] animate-zdata-scanline"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,138,180,0.18) 50%, transparent)",
          animationDuration: "14s",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[40px] animate-zdata-scanline"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,216,158,0.15) 50%, transparent)",
          animationDuration: "18s",
          animationDelay: "5s",
        }}
      />
    </div>
  );
}

/** Bottom edge reflection ripple — neon hits water and pulses. */
function BottomReflection() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] animate-zdata-reflection"
      style={{
        background:
          "linear-gradient(to top, rgba(255,138,180,0.22) 0%, rgba(143,184,232,0.12) 35%, transparent 100%)",
        mixBlendMode: "screen",
      }}
    />
  );
}

function Stars() {
  const points: Array<{ x: number; y: number; r: number; o: number; d: number; del: number }> = [
    { x: 6, y: 12, r: 1.2, o: 0.5, d: 4, del: 0 },
    { x: 14, y: 7, r: 0.8, o: 0.4, d: 5, del: 0.6 },
    { x: 22, y: 20, r: 1.6, o: 0.7, d: 6, del: 1.2 },
    { x: 30, y: 9, r: 1, o: 0.55, d: 4.5, del: 0.3 },
    { x: 41, y: 16, r: 0.9, o: 0.45, d: 5.5, del: 1.8 },
    { x: 53, y: 6, r: 1.4, o: 0.6, d: 6, del: 0.9 },
    { x: 62, y: 14, r: 1, o: 0.5, d: 4, del: 2.1 },
    { x: 71, y: 8, r: 0.8, o: 0.4, d: 5, del: 0 },
    { x: 80, y: 18, r: 1.2, o: 0.55, d: 6, del: 1.5 },
    { x: 88, y: 10, r: 1, o: 0.5, d: 4.5, del: 0.7 },
    { x: 95, y: 22, r: 0.9, o: 0.45, d: 5, del: 1.1 },
    { x: 12, y: 30, r: 0.7, o: 0.35, d: 4, del: 2 },
    { x: 36, y: 33, r: 0.7, o: 0.35, d: 5, del: 0.4 },
    { x: 67, y: 32, r: 0.7, o: 0.35, d: 6, del: 1.3 },
    { x: 86, y: 36, r: 0.7, o: 0.3, d: 4.5, del: 0.6 },
  ];
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.r * 0.18}
          fill="#FFD89E"
          style={{
            transformOrigin: `${p.x}px ${p.y}px`,
            animation: `zdata-star ${p.d}s ease-in-out ${p.del}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}

function CitySilhouette() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] w-full opacity-70 sm:h-[28%]"
      preserveAspectRatio="none"
      viewBox="0 0 1200 220"
      style={{ mixBlendMode: "screen" }}
    >
      <defs>
        <linearGradient id="city-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1547" stopOpacity="0" />
          <stop offset="60%" stopColor="#0A1547" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0A1547" stopOpacity="1" />
        </linearGradient>
      </defs>

      <g opacity="0.45" fill="#0A1547">
        <rect x="0" y="120" width="80" height="100" />
        <rect x="80" y="100" width="120" height="120" />
        <rect x="200" y="130" width="60" height="90" />
        <rect x="260" y="90" width="100" height="130" />
        <rect x="360" y="110" width="80" height="110" />
        <rect x="440" y="80" width="140" height="140" />
        <rect x="580" y="120" width="70" height="100" />
        <rect x="650" y="95" width="110" height="125" />
        <rect x="760" y="115" width="80" height="105" />
        <rect x="840" y="85" width="130" height="135" />
        <rect x="970" y="120" width="70" height="100" />
        <rect x="1040" y="100" width="100" height="120" />
        <rect x="1140" y="130" width="60" height="90" />
      </g>

      <g fill="#FFD89E">
        {Array.from({ length: 110 }).map((_, i) => {
          const x = (i * 37 + 11) % 1200;
          const y = 120 + ((i * 19) % 90);
          const size = i % 7 === 0 ? 3 : 2;
          const dur = 3 + ((i * 13) % 50) / 10;
          const delay = ((i * 29) % 80) / 10;
          const isPink = i % 9 === 0;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={size}
              height={size}
              fill={isPink ? "#FF8AB4" : "#FFD89E"}
              style={{
                animation: `zdata-window-blink ${dur}s ease-in-out ${delay}s infinite`,
                opacity: 0.55,
              }}
            />
          );
        })}
      </g>

      <rect x="0" y="0" width="1200" height="220" fill="url(#city-fade)" />
    </svg>
  );
}
