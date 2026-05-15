import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/Reveal";
import AmbientField from "@/components/AmbientField";

const ROWS: Array<{ label: string; value: React.ReactNode }> = [
  { label: "商号", value: "Genova株式会社（Genova Inc.）" },
  { label: "設立", value: "2026年5月1日" },
  {
    label: "所在地",
    value: (
      <>
        〒107-0062
        <br />
        東京都港区南青山3-5-2
        <br className="sm:hidden" />
        <span className="hidden sm:inline"> </span>
        南青山第一韮澤ビル3F
      </>
    ),
  },
  {
    label: "事業内容",
    value: (
      <>
        ゼロパーティデータプラットフォーム
        <br className="sm:hidden" />
        「Z-Data」の開発・提供
        <br />
        B2Bマーケティング・営業領域における
        <br className="sm:hidden" />
        AI 技術活用支援
      </>
    ),
  },
];

export default function Company() {
  return (
    <section
      id="company"
      aria-labelledby="company-heading"
      className="relative overflow-hidden bg-paper py-16 sm:py-20 lg:py-32"
    >
      <AmbientField
        count={24}
        palette={["twilight", "sunsetPink", "windowLight"]}
        maxOpacity={0.65}
        sizeRange={[3, 6]}
        seed={3}
        safeZone={{ x0: 8, y0: 15, x1: 92, y1: 90 }}
      />

      <Container width="narrow" className="relative z-10">
        <Reveal>
          <Eyebrow>Company</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            id="company-heading"
            className="mt-3 text-[28px] leading-[1.25] tracking-[-0.02em] font-bold text-charcoal sm:mt-4 sm:text-[32px] lg:text-h1"
          >
            会社情報
          </h2>
        </Reveal>

        <dl className="mt-10 divide-y divide-ink-300/70 sm:mt-12">
          {ROWS.map((row, i) => (
            <Reveal key={row.label} delay={0.16 + i * 0.06}>
              <div className="grid grid-cols-1 gap-1.5 py-4 sm:grid-cols-[140px_1fr] sm:gap-6 sm:py-5">
                <dt className="text-[12px] font-semibold uppercase tracking-[0.08em] text-twilight sm:text-[14px] sm:font-semibold sm:tracking-[0.04em] sm:text-charcoal">
                  {row.label}
                </dt>
                <dd className="text-[15px] leading-[1.75] text-ink-700 sm:text-[16px] sm:leading-[1.7]">
                  {row.value}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
