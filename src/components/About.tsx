import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/Reveal";
import AmbientField from "@/components/AmbientField";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-twilight/20 to-transparent"
      />

      <AmbientField
        count={22}
        palette={["twilight", "sunsetPink", "windowLight"]}
        maxOpacity={0.65}
        sizeRange={[3, 6]}
        seed={1}
        safeZone={{ x0: 8, y0: 22, x1: 92, y1: 82 }}
      />

      <Container width="narrow" className="relative z-10">
        <Reveal>
          <Eyebrow>About</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            id="about-heading"
            className="mt-3 text-[28px] leading-[1.25] tracking-[-0.02em] font-bold text-charcoal sm:mt-4 sm:text-[32px] lg:text-h1"
          >
            私たちは何者か
          </h2>
        </Reveal>

        <div
          className="mt-10 space-y-6 text-[15px] leading-[1.85] text-ink-700 sm:mt-12 sm:text-[16px] lg:text-[17px]"
          style={{ wordBreak: "keep-all", overflowWrap: "anywhere" }}
        >
          <Reveal delay={0.18}>
            <p>
              3rd party データの時代が終わり、
              <br className="hidden md:inline" />
              自社で集めたデータの価値が問われる時代へ。
              <br />
              Genova株式会社は、企業が「自分たちだけの声」を集め、
              <br className="hidden md:inline" />
              AIで価値に変えるためのインフラを開発しています。
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <p>
              データの所有権を、
              <br className="hidden md:inline" />
              プラットフォームから日本企業の手に取り戻す——
              <br />
              それが、AI時代の競争力の源泉になると信じています。
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
