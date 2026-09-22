import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "@/components/layout/site-footer";

describe("SiteFooter", () => {
  it("groups its links under labelled navigation landmarks", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("navigation", { name: "Shop" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Company" })).toBeInTheDocument();
  });

  it("shows the current year in the notice", () => {
    render(<SiteFooter />);

    expect(
      screen.getByText(new RegExp(String(new Date().getFullYear()))),
    ).toBeInTheDocument();
  });
});
