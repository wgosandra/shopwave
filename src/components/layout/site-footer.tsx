import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { siteConfig } from "@/lib/site";

const SECTIONS = [
  {
    heading: "Shop",
    links: [
      { href: "/products", label: "All products" },
      { href: "/orders", label: "Order tracking" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div className="space-y-3">
          <Logo className="h-7 w-auto" />
          <p className="max-w-xs text-sm text-muted-foreground">{siteConfig.tagline}</p>
        </div>

        {SECTIONS.map((section) => (
          <nav key={section.heading} aria-label={section.heading}>
            <h2 className="text-sm font-semibold">{section.heading}</h2>
            <ul className="mt-3 space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t">
        <p className="mx-auto w-full max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          &copy; {new Date().getFullYear()} {siteConfig.name}. A portfolio project.
        </p>
      </div>
    </footer>
  );
}
