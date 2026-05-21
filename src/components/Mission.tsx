import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/Reveal";
import AmbientField from "@/components/AmbientField";
import { asset } from "@/lib/asset";

export default function Mission() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="relative overflow-hidden bg-charcoal text-white py-16 sm:py-20 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 hidden lg:block opacity-[0.06] animate-mission-symbol"
      >
        <Image
          src={asset("/logos/genova/symbol/genova_symbol_white.svg")}
          alt=""
          width={520}
          height={520}
          aria-hidden
        />
      </div>

      <AmbientField
        count={28}
        palette={["windowLight", "deep", "sunsetPink"]}
        maxOpacity={0.7}
        sizeRange={[2, 5]}
        seed={2}
        safeZone={{ x0: 0, y0: 22, x1: 75, y1: 78 }}
      />

      <MissionDust />

      <Container className="relative z-10">
        <div className="max-w-[1040px]">
          <Reveal>
            <Eyebrow tone="windowLight" as="p">
              Mission
            </Eyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              id="mission-heading"
              className="mt-4 text-[26px] leading-[1.4] tracking-[-0.02em] font-bold sm:mt-6 sm:text-[36px] md:text-[44px] lg:text-[56px] lg:leading-[1.3] xl:text-mission [word-break:keep-all]"
            >
              <span className="block">
                <span className="inline-block">価値あるデータを、</span>
                <span className="inline-block">ゼロから生み出す。</span>
              </span>
              <span className="block text-windowLight animate-mission-glow">
                <span className="inline-block">日本を、</span>
                <span className="inline-block">AI時代の勝者にする。</span>
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <p
              className="mt-8 max-w-2xl text-[14px] leading-[1.9] text-white/75 sm:mt-10 sm:text-[16px] lg:mt-12 lg:text-[18px]"
              style={{ wordBreak: "keep-all" }}
            >
              模倣可能な情報や、
              <br className="md:hidden" />
              誰でも買える3rd partyデータでは、
              <br className="hidden md:inline" />
              もう勝てない。
              <br />
              顧客一人ひとりの声を、
              <br className="md:hidden" />
              自社の意思で集め、自社の資産に変える。
              <br />
              その当たり前を、すべての日本企業に。
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function MissionDust() {
  const dust: Array<{ x: number; y: number; size: number; d: number; del: number }> = [];
  for (let i = 0; i < 28; i++) {
    dust.push({
      x: (i * 53 + 11) % 100,
      y: 78 + ((i * 13) % 20),
      size: 1.2 + ((i * 7) % 3) * 0.6,
      d: 5 + ((i * 11) % 60) / 10,
      del: ((i * 23) % 80) / 10,
    });
  }
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {dust.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: "#FFD89E",
            boxShadow: "0 0 8px 1px rgba(255,216,158,0.85)",
            opacity: 0,
            animation: `hero-nova ${p.d}s ease-out ${p.del}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
