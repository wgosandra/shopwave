import { expect, test } from "@playwright/test";

test.describe("storefront shell", () => {
  test("the home page renders the brand, the nav and the primary action", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/ShopWave/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Browse the catalogue" })).toBeVisible();
    await expect(page.getByRole("img", { name: "ShopWave" }).first()).toBeVisible();
  });

  test("the skip link is the first thing a keyboard reaches", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });

  test("an unknown route renders the 404 page, not a crash", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: /could not find that page/i }),
    ).toBeVisible();
  });
});
