import Image from "next/image";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Horizontal lockup by default; the symbol alone where the name is already on screen. */
  variant?: "lockup" | "mark";
  className?: string;
  priority?: boolean;
};

/**
 * The brand lockup, with the reverse version swapped in on dark grounds.
 *
 * Both files are rendered and one is hidden by CSS rather than picked in JS,
 * so the correct lockup is in the first paint and never flashes on hydration.
 * Minimum sizes from docs/BRAND.md: 140px for the lockup, 16px for the mark.
 */
export function Logo({ variant = "lockup", className, priority = false }: LogoProps) {
  const light = variant === "lockup" ? siteConfig.brand.logo : siteConfig.brand.mark;
  const dark =
    variant === "lockup" ? siteConfig.brand.logoReverse : siteConfig.brand.markReverse;
  const width = variant === "lockup" ? 294 : 64;
  const height = variant === "lockup" ? 52.5 : 64;

  return (
    <>
      <Image
        src={light}
        alt={siteConfig.name}
        width={width}
        height={height}
        priority={priority}
        className={cn("dark:hidden", className)}
      />
      <Image
        src={dark}
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        priority={priority}
        className={cn("hidden dark:block", className)}
      />
    </>
  );
}
