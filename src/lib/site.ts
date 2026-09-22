import { clientEnv } from "@/lib/env";

/** Names, links and brand asset paths used across metadata and chrome. */
export const siteConfig = {
  name: "ShopWave",
  tagline: "Everything you need, delivered.",
  description:
    "ShopWave is an online store with a searchable catalogue, a cart that follows you, secure checkout and order tracking from payment to delivery.",
  url: clientEnv.NEXT_PUBLIC_SITE_URL,
  brand: {
    logo: "/brand/logo.svg",
    logoReverse: "/brand/logo-reverse.svg",
    mark: "/brand/mark.svg",
    markReverse: "/brand/mark-reverse.svg",
    favicon: "/brand/favicon.svg",
    ogImage: "/brand/og-image.png",
  },
  nav: [
    { href: "/products", label: "Shop" },
    { href: "/orders", label: "Orders" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
