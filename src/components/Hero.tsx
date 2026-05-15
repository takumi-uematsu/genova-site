import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HeroBackdrop from "@/components/HeroBackdrop";
import { asset } from "@/lib/asset";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-paper pt-[100px] pb-20 sm:min-h-[720px] sm:pt-[120px] sm:pb-24 lg:min-h-screen lg:max-h-[900px] lg:py-0"
    >
      {/* Slow-breathing radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-hero-radial hero-radial-pulse"
      />

      {/* Page-load detonation flash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 animate-nova-flash"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,216,158,0.7) 0%, rgba(255,138,180,0.35) 30%, rgba(74,123,199,0.1) 60%, transparent 80%)",
        }}
      />

      {/* "Nova field" — particles bloom-and-fade */}
      <HeroBackdrop />

      <Container width="default" className="relative z-10 text-center">
        <div className="mx-auto max-w-3xl">
          {/* Symbol + concentric shockwave */}
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28 md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-windowLight/70 animate-nova-shockwave"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-twilight/70 animate-nova-shockwave"
              style={{ animationDelay: "0.18s" }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zdata-sunsetPink/60 animate-nova-shockwave"
              style={{ animationDelay: "0.36s" }}
            />

            <Image
              src={asset("/logos/genova/symbol/genova_symbol_color.svg")}
              alt=""
              width={200}
              height={200}
              priority
              className="relative h-24 w-24 drop-shadow-[0_4px_24px_rgba(74,123,199,0.25)] animate-nova-symbol sm:h-28 sm:w-28 md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px]"
            />
          </div>

          <h1
            id="hero-heading"
            className="mt-8 text-balance text-[36px] leading-[1.08] tracking-[-0.02em] font-bold text-charcoal animate-nova-rise sm:mt-12 sm:text-[44px] md:text-[56px] lg:text-display lg:leading-[1.05]"
            style={{ animationDelay: "0.6s" }}
          >
            Generate the next nova
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            in business.
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.7] text-ink-700 animate-nova-rise sm:mt-8 sm:text-[17px] lg:text-bodylg lg:leading-[1.6]"
            style={{ animationDelay: "0.9s", wordBreak: "keep-all" }}
          >
            価値あるデータを、ゼロから。
            <br />
            日本を、AI時代の勝者にする。
          </p>

          <div
            className="mt-10 flex flex-col items-center justify-center gap-3 animate-nova-rise sm:mt-12 sm:flex-row sm:gap-4"
            style={{ animationDelay: "1.2s" }}
          >
            <Button href="#products" variant="primary" size="lg" className="w-full max-w-[280px] sm:w-auto">
              Z-Data について
              <span aria-hidden="true">→</span>
            </Button>
            <Button href="#contact" variant="secondary" size="lg" className="w-full max-w-[280px] sm:w-auto">
              お問い合わせ
            </Button>
          </div>
        </div>
      </Container>

      {/* Bottom accent line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-twilight/30 to-transparent"
      />
    </section>
  );
}
