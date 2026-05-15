import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Genova Inc. — 価値あるデータを、ゼロから。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const bars: Array<{ x: number; y: number; w: number; h: number }> = [
    { x: 14, y: 40, w: 10, h: 20 },
    { x: 30, y: 28, w: 10, h: 44 },
    { x: 45, y: 18, w: 10, h: 64 },
    { x: 60, y: 28, w: 10, h: 44 },
    { x: 76, y: 40, w: 10, h: 20 },
  ];
  const SYM = 200;
  const PX = (n: number) => (n / 100) * SYM;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#1A1A1A",
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(255,216,158,0.06) 0%, rgba(255,216,158,0) 60%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 96px",
          fontFamily: "sans-serif",
          color: "#FFFFFF",
          position: "relative",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#4A7BC7",
            fontWeight: 700,
            display: "flex",
          }}
        >
          Genova Inc.
        </div>

        {/* Symbol */}
        <div
          style={{
            position: "relative",
            width: SYM,
            height: SYM,
            marginTop: 36,
            display: "flex",
          }}
        >
          {bars.map((b, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: PX(b.x),
                top: PX(b.y),
                width: PX(b.w),
                height: PX(b.h),
                background: "#FFFFFF",
                borderRadius: 2,
              }}
            />
          ))}
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: 56,
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: -1.5,
            lineHeight: 1.15,
            textAlign: "center",
            display: "flex",
          }}
        >
          価値あるデータを、ゼロから。
        </div>

        {/* Sub */}
        <div
          style={{
            marginTop: 16,
            fontSize: 36,
            fontWeight: 500,
            letterSpacing: -0.5,
            color: "#FFD89E",
            display: "flex",
          }}
        >
          日本を、AI時代の勝者にする。
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            left: 96,
            right: 96,
            bottom: 56,
            height: 1,
            backgroundImage:
              "linear-gradient(to right, rgba(74,123,199,0), rgba(74,123,199,0.5), rgba(74,123,199,0))",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
