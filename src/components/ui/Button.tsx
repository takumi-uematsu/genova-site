import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "ghostOnDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-sm transition-all duration-200 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none";

const variantMap: Record<Variant, string> = {
  primary:
    "bg-charcoal text-white hover:scale-[0.985] active:scale-[0.97] focus-visible:ring-twilight focus-visible:ring-offset-paper",
  secondary:
    "bg-transparent text-charcoal border-[1.5px] border-charcoal hover:bg-charcoal hover:text-white focus-visible:ring-twilight focus-visible:ring-offset-paper",
  ghost:
    "bg-transparent text-charcoal hover:bg-charcoal/5 focus-visible:ring-twilight focus-visible:ring-offset-paper",
  ghostOnDark:
    "bg-transparent text-white border-[1.5px] border-white hover:border-zdata-sunsetPink hover:text-zdata-sunsetPink focus-visible:ring-zdata-sunsetPink focus-visible:ring-offset-zdata-deepNight",
};

const sizeMap: Record<Size, string> = {
  md: "px-6 py-3 text-[15px]",
  lg: "px-8 py-4 text-[16px]",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

interface LinkProps extends BaseProps {
  href: string;
  external?: boolean;
  type?: never;
  onClick?: never;
}

interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "disabled"> {
  href?: undefined;
}

type Props = LinkProps | ButtonProps;

export default function Button(props: Props) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const classes = cn(base, variantMap[variant], sizeMap[size], props.className);

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children, ...rest } =
    props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
