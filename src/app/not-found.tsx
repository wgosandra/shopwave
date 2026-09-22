import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        We could not find that page
      </h1>
      <p className="mt-4 max-w-md text-pretty text-muted-foreground">
        The link may be out of date, or the product may no longer be for sale.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to the store</Link>
      </Button>
    </div>
  );
}
