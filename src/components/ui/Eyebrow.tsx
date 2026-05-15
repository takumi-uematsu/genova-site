import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: React.ReactNode;
  tone?: "twilight" | "windowLight";
  className?: string;
  as?: "p" | "span";
}

const toneMap: Record<NonNullable<EyebrowProps["tone"]>, string> = {
  twilight: "text-twilight",
  windowLight: "text-windowLight",
};

export default function Eyebrow({
  children,
  tone = "twilight",
  className,
  as = "p",
}: EyebrowProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "text-eyebrow uppercase font-bold",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
