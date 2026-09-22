import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="rounded-sm" aria-label={`${siteConfig.name} home`}>
          <Logo className="h-7 w-auto" priority />
        </Link>

        <nav aria-label="Main" className="hidden sm:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" aria-label="Cart">
              <ShoppingBagIcon aria-hidden="true" />
            </Link>
          </Button>
          <Button size="sm" asChild className="ml-1">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
