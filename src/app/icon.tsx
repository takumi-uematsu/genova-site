import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1A1A1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
        }}
      >
        <SignalBars />
      </div>
    ),
    { ...size },
  );
}

function SignalBars() {
  // 5 bars, center tallest. ViewBox 0..100 mapped to ~48px square.
  const bars: Array<{ x: number; y: number; w: number; h: number }> = [
    { x: 14, y: 40, w: 10, h: 20 },
    { x: 30, y: 28, w: 10, h: 44 },
    { x: 45, y: 18, w: 10, h: 64 },
    { x: 60, y: 28, w: 10, h: 44 },
    { x: 76, y: 40, w: 10, h: 20 },
  ];
  return (
    <div
      style={{
        position: "relative",
        width: 48,
        height: 48,
        display: "flex",
      }}
    >
      {bars.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(b.x / 100) * 48}px`,
            top: `${(b.y / 100) * 48}px`,
            width: `${(b.w / 100) * 48}px`,
            height: `${(b.h / 100) * 48}px`,
            background: "#FFFFFF",
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
}
