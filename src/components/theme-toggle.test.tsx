import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";

function renderToggle() {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  it("exposes a named control rather than a bare icon", () => {
    renderToggle();

    expect(
      screen.getByRole("button", { name: "Change colour theme" }),
    ).toBeInTheDocument();
  });

  it("renders both icons and lets CSS choose, so the server markup matches", () => {
    const { container } = renderToggle();
    const trigger = screen.getByRole("button", { name: "Change colour theme" });

    expect(trigger.querySelectorAll("svg")).toHaveLength(2);
    expect(container.querySelector(".dark\\:hidden")).not.toBeNull();
    expect(container.querySelector(".dark\\:block")).not.toBeNull();
  });
});
