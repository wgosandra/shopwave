import { describe, expect, it } from "vitest";

import { clientSchema, serverSchema } from "@/lib/env";

describe("server environment", () => {
  it("defaults NODE_ENV to development", () => {
    expect(serverSchema.parse({}).NODE_ENV).toBe("development");
  });

  it("rejects an unknown NODE_ENV", () => {
    expect(serverSchema.safeParse({ NODE_ENV: "staging" }).success).toBe(false);
  });
});

describe("client environment", () => {
  it("defaults the site URL to localhost", () => {
    expect(clientSchema.parse({}).NEXT_PUBLIC_SITE_URL).toBe("http://localhost:3000");
  });

  it("rejects a site URL that is not a URL", () => {
    expect(clientSchema.safeParse({ NEXT_PUBLIC_SITE_URL: "shopwave" }).success).toBe(
      false,
    );
  });
});
