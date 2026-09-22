import Link from "next/link";
import { PackageCheckIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const PROMISES = [
  {
    Icon: ShieldCheckIcon,
    title: "Secure checkout",
    body: "Payments run through Midtrans. Card details never touch our servers.",
  },
  {
    Icon: TruckIcon,
    title: "Tracked from payment",
    body: "Every order moves through paid, shipped and completed, with the status on your account.",
  },
  {
    Icon: PackageCheckIcon,
    title: "Stock you can trust",
    body: "Stock is reserved inside the checkout transaction, so what you buy is what we have.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {siteConfig.name}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          {siteConfig.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button size="lg" asChild>
            <Link href="/products">Browse the catalogue</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/orders">Track an order</Link>
          </Button>
        </div>
      </section>

      <section aria-labelledby="promises-heading" className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 id="promises-heading" className="text-2xl font-semibold tracking-tight">
            How ShopWave works
          </h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-3">
            {PROMISES.map(({ Icon, title, body }) => (
              <li key={title}>
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-medium">{title}</h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
