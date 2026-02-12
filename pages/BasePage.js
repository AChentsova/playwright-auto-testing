import { expect } from "@playwright/test";

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url, credentials) {
    await this.page.goto(url, {
      httpCredentials: credentials,
    });
  }

  async expectUrlContains(partialUrl) {
    await expect(this.page).toHaveURL(new RegExp(partialUrl));
  }

  async expectTextVisible(text) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async expectElementDisabled(locator) {
    await expect(locator).toBeDisabled();
  }

  async expectElementEnabled(locator) {
    await expect(locator).toBeEnabled();
  }
  async expectFieldErrorBorder(locator) {
    await expect(locator).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }
}