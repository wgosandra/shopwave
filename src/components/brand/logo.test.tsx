import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "@/components/brand/logo";

describe("Logo", () => {
  it("ships both lockups so the dark one needs no JavaScript to appear", () => {
    const { container } = render(<Logo />);

    expect(container.querySelectorAll("img")).toHaveLength(2);
    expect(container.querySelector(".dark\\:hidden")).not.toBeNull();
  });

  it("names the brand once, leaving the reverse lockup decorative", () => {
    render(<Logo />);

    expect(screen.getAllByAltText("ShopWave")).toHaveLength(1);
  });

  it("renders the symbol on its own when asked", () => {
    const { container } = render(<Logo variant="mark" />);
    const first = container.querySelector("img");

    expect(first?.getAttribute("src")).toContain("mark");
  });
});
