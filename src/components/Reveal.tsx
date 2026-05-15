"use client";

/**
 * Reveal — scroll-triggered fade-up wrapper.
 *
 * Uses IntersectionObserver to add `.is-revealed` once the element enters
 * the viewport. Animation itself is CSS keyframes (see globals.css) for
 * GPU compositing and zero framer-motion overhead.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  /** Stagger relative to siblings (seconds). */
  delay?: number;
  /** "up" rises 24px on entry, "down" falls from above. */
  direction?: "up" | "down";
  /** Distance to translate in px before settling. */
  distance?: number;
  /** Wrap with a span instead of div (for inline contexts). */
  as?: "div" | "span";
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  as = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [revealed]);

  const Tag = as;
  const ty = direction === "up" ? distance : -distance;

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.2,0.65,0.3,1)] motion-reduce:transition-none",
        revealed ? "opacity-100 translate-y-0" : "opacity-0",
        className,
      )}
      style={{
        transform: revealed ? "translateY(0)" : `translateY(${ty}px)`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}
