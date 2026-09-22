import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders a button by default", () => {
    render(<Button>Add to cart</Button>);

    expect(screen.getByRole("button", { name: "Add to cart" })).toBeInTheDocument();
  });

  it("renders its child element when asChild is set, so links stay links", () => {
    render(
      <Button asChild>
        <a href="/products">Shop</a>
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("puts graphite text on the orange action, which is what passes WCAG AA", () => {
    render(<Button>Pay</Button>);

    expect(screen.getByRole("button")).toHaveClass("text-primary-foreground");
  });
});
