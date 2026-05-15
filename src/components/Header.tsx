"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/asset";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#mission", label: "Mission" },
  { href: "#products", label: "Products" },
  { href: "#company", label: "Company" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on nav click
  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-soft",
        open
          ? "bg-paper shadow-sm"
          : scrolled
            ? "bg-paper/95 backdrop-blur-md shadow-sm"
            : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[64px] lg:h-[72px] w-full max-w-container items-center justify-between px-5 sm:px-8 lg:px-16">
        <Link
          href="/"
          aria-label="Genova Inc. ホームへ"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src={asset("/logos/genova/horizontal/genova_h_color.svg")}
            alt="Genova Inc."
            width={120}
            height={32}
            priority
            className="h-7 w-auto lg:h-8"
          />
        </Link>

        <nav
          aria-label="グローバルナビゲーション"
          className="hidden lg:flex items-center gap-8"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[14px] font-medium text-charcoal/85 hover:text-charcoal transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-sm text-charcoal hover:bg-charcoal/5 transition-colors"
        >
          <span className="sr-only">メニュー</span>
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            {open ? (
              <g
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </g>
            ) : (
              <g
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="19" y2="6" />
                <line x1="3" y1="11" x2="19" y2="11" />
                <line x1="3" y1="16" x2="19" y2="16" />
              </g>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height] duration-300 ease-soft border-t border-charcoal/5",
          open ? "max-h-[80vh]" : "max-h-0",
        )}
      >
        <nav
          aria-label="モバイルナビゲーション"
          className="bg-paper px-5 py-4 sm:py-6"
        >
          <ul className="flex flex-col gap-0.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-3 py-3.5 text-[18px] font-medium text-charcoal hover:bg-charcoal/5 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
