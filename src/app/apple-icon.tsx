import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const bars: Array<{ x: number; y: number; w: number; h: number }> = [
    { x: 14, y: 40, w: 10, h: 20 },
    { x: 30, y: 28, w: 10, h: 44 },
    { x: 45, y: 18, w: 10, h: 64 },
    { x: 60, y: 28, w: 10, h: 44 },
    { x: 76, y: 40, w: 10, h: 20 },
  ];
  const SCALE = 1.2; // bars area fills ~ 84% of 180px

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
        }}
      >
        <div
          style={{
            position: "relative",
            width: 100 * SCALE,
            height: 100 * SCALE,
            display: "flex",
          }}
        >
          {bars.map((b, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${b.x * SCALE}px`,
                top: `${b.y * SCALE}px`,
                width: `${b.w * SCALE}px`,
                height: `${b.h * SCALE}px`,
                background: "#FFFFFF",
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
