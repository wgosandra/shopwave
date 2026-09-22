import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format an integer amount of Indonesian rupiah for display.
 *
 * Money is stored as integers throughout ShopWave, never floats, so this takes
 * whole rupiah and does no arithmetic of its own.
 */
export function formatIDR(amount: number): string {
  if (!Number.isInteger(amount)) {
    throw new TypeError(`Money must be an integer number of rupiah, got ${amount}`);
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
