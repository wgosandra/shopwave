"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // The digest is the only safe handle on a server error: the message itself
    // is stripped in production so it cannot leak internals to the browser.
    console.error("Unhandled error", error.digest ?? error.message);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start px-4 py-24 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-pretty text-muted-foreground">
        The page could not be loaded. Trying again often clears it; if it does not, come
        back in a few minutes.
      </p>
      {error.digest ? (
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          Reference: {error.digest}
        </p>
      ) : null}
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </div>
  );
}
