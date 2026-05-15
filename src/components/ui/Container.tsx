import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Width = "default" | "narrow" | "wide";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: Width;
}

const widthMap: Record<Width, string> = {
  default: "max-w-container",
  narrow: "max-w-narrow",
  wide: "max-w-wide",
};

export default function Container({
  width = "default",
  className,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-16",
        widthMap[width],
        className,
      )}
      {...rest}
    />
  );
}
