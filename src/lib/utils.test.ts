import { describe, expect, it } from "vitest";

import { cn, formatIDR } from "@/lib/utils";

describe("cn", () => {
  it("keeps the last of two conflicting Tailwind utilities", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("drops falsy values", () => {
    expect(cn("rounded", false && "hidden", undefined, "border")).toBe("rounded border");
  });
});

describe("formatIDR", () => {
  it("formats whole rupiah without decimals", () => {
    // Intl uses a non-breaking space after the symbol, so compare on the digits.
    expect(formatIDR(1_250_000).replace(/\s/g, " ")).toBe("Rp 1.250.000");
  });

  it("formats zero", () => {
    expect(formatIDR(0).replace(/\s/g, " ")).toBe("Rp 0");
  });

  it("rejects a float, because money is stored as integers", () => {
    expect(() => formatIDR(19_999.5)).toThrow(TypeError);
  });
});
