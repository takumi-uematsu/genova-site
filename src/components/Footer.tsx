import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { asset } from "@/lib/asset";

const SECTIONS = [
  { href: "#about", label: "About" },
  { href: "#mission", label: "Mission" },
  { href: "#products", label: "Products" },
  { href: "#company", label: "Company" },
  { href: "#contact", label: "Contact" },
];

const META = [
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Image
              src={asset("/logos/genova/horizontal/genova_h_white.svg")}
              alt="Genova Inc."
              width={144}
              height={40}
              className="h-7 w-auto sm:h-8"
            />
            <p
              className="mt-5 max-w-md text-[13px] leading-[1.8] text-white/70 sm:mt-6 sm:text-bodysm sm:leading-relaxed"
              style={{ wordBreak: "keep-all" }}
            >
              価値あるデータを、ゼロから生み出す。
              <br />
              日本を、AI時代の勝者にする。
            </p>

            <div className="mt-6 flex items-center gap-2 sm:mt-8 sm:gap-4">
              <a
                href="#"
                aria-label="X (Twitter)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-white/85 hover:bg-white/5 hover:text-windowLight transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-white/85 hover:bg-white/5 hover:text-windowLight transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.99 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.22 0Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:col-span-6 lg:grid-cols-2">
            <nav aria-label="セクション">
              <p className="text-eyebrow uppercase text-windowLight/80">Sections</p>
              <ul className="mt-4 space-y-2.5 sm:space-y-3">
                {SECTIONS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block py-1 text-[14px] text-white/85 hover:text-twilight transition-colors sm:text-bodysm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="その他">
              <p className="text-eyebrow uppercase text-windowLight/80">More</p>
              <ul className="mt-4 space-y-2.5 sm:space-y-3">
                {META.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block py-1 text-[14px] text-white/85 hover:text-twilight transition-colors sm:text-bodysm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/50 sm:text-[12px]">
            © {year} Genova Inc. All rights reserved.
          </p>
          <p className="text-[11px] text-white/40 sm:text-[12px]">Tokyo, Japan</p>
        </div>
      </Container>
    </footer>
  );
}
