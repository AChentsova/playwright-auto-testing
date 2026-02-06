import { test, expect } from "@playwright/test";

import dotenv from "dotenv";
dotenv.config();

test.describe("Registration form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL, {
      httpCredentials: {
        username: process.env.LOGIN_USERNAME,
        password: process.env.LOGIN_PASSWORD,
      },
    });
  });

  test.describe("Successful User Registration", () => {
    test("should register new user with valid data", async ({ page }) => {
      const email = `aqa-${Date.now()}@test.com`;
      const password = "TestPass123";
      await page.locator(".hero-descriptor_btn").click();
      await expect(
        page.getByRole("button", { name: "Register" }),
      ).toBeDisabled();
      await page.locator("#signupName").fill("Jane");
      await page.locator("#signupLastName").fill("Doe");
      await page.locator("#signupEmail").fill(email);
      await page.locator("#signupPassword").fill(password);
      await page.locator("#signupRepeatPassword").fill(password);
      await expect(
        page.getByRole("button", { name: "Register" }),
      ).toBeEnabled();
      await page.getByRole("button", { name: "Register" }).click();
      await expect(page.getByText("Registration complete")).toBeVisible();
      await expect(page.url()).toContain("/panel/garage");
    });
  });

  test.describe("Validation for Name and Last name fields", () => {
    test.beforeEach(async ({ page }) => {
      await page.locator(".hero-descriptor_btn").click();
    });

    test("should show error for short name", async ({ page }) => {
      await page.locator("#signupName").fill("J");
      await page.locator("#signupLastName").click();
      await expect(page.getByText("Name has to be from 2 to 20 characters long")).toBeVisible();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for short last name", async ({ page }) => {
      await page.locator("#signupLastName").fill("D");
      await page.locator("#signupName").click();
      await expect(page.getByText("Last name has to be from 2 to 20 characters long")).toBeVisible();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for long name", async ({ page }) => {
      await page.locator("#signupName").fill("J".repeat(21));
      await page.locator("#signupLastName").click();
      await expect(page.getByText("Name has to be from 2 to 20 characters long")).toBeVisible();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for long last name", async ({ page }) => {
      await page.locator("#signupLastName").fill("D".repeat(21));
      await page.locator("#signupName").click();
      await expect(page.getByText("Last name has to be from 2 to 20 characters long")).toBeVisible();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for name with invalid characters", async ({ page }) => {
      await page.locator("#signupName").fill("Jane123");
      await page.locator("#signupLastName").click();
      await expect(page.getByText("Name is invalid")).toBeVisible();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for last name with invalid characters", async ({ page }) => {
      await page.locator("#signupLastName").fill("Doe@!");
      await page.locator("#signupName").click();
      await expect(page.getByText("Last name is invalid")).toBeVisible();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for empty name", async ({ page }) => {
      await page.locator("#signupName").fill("");
      await page.locator("#signupLastName").click();
      await expect(page.getByText("Name required")).toBeVisible();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for empty last name", async ({ page }) => {
      await page.locator("#signupLastName").fill("");
      await page.locator("#signupName").click();
      await expect(page.getByText("Last name required")).toBeVisible();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });
  });

  test.describe("Validation for Email field", () => {
    test.beforeEach(async ({ page }) => {
      await page.locator(".hero-descriptor_btn").click();
    });

    test("should show error for invalid email format", async ({ page }) => {
      await page.locator("#signupEmail").fill("invalid-email");
      await page.locator("#signupName").click();
      await expect(page.getByText("Email is incorrect")).toBeVisible();
      await expect(page.locator("#signupEmail")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for empty email", async ({ page }) => {
      await page.locator("#signupEmail").fill("");
      await page.locator("#signupName").click();
      await expect(page.getByText("Email required")).toBeVisible();
      await expect(page.locator("#signupEmail")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });
  });

  test.describe("Validation for Password and Re-enter password fields", () => {
    test.beforeEach(async ({ page }) => {
      await page.locator(".hero-descriptor_btn").click();
    });

    test("should show error for short password", async ({ page }) => {
      await page.locator("#signupPassword").fill("Pass1");
      await page.locator("#signupRepeatPassword").click();
      await expect(page.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeVisible();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for long password", async ({ page }) => {
      await page.locator("#signupPassword").fill("P".repeat(16) + "ass1");
      await page.locator("#signupRepeatPassword").click();
      await expect(page.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeVisible();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for password without capital letter", async ({ page }) => {
      await page.locator("#signupPassword").fill("testpass1");
      await page.locator("#signupRepeatPassword").click();
      await expect(page.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeVisible();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for password without small letter", async ({ page }) => {
      await page.locator("#signupPassword").fill("TESTPASS1");
      await page.locator("#signupRepeatPassword").click();
      await expect(page.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeVisible();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for password without number", async ({ page }) => {
      await page.locator("#signupPassword").fill("Testpass");
      await page.locator("#signupRepeatPassword").click();
      await expect(page.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")).toBeVisible();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for empty password", async ({ page }) => {
      await page.locator("#signupPassword").fill("");
      await page.locator("#signupRepeatPassword").click();
      await expect(page.getByText("Password required")).toBeVisible();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for non-matching repeat password", async ({ page }) => {
      await page.locator("#signupPassword").fill("TestPass1");
      await page.locator("#signupRepeatPassword").fill("TestPass2");
      await page.locator("#signupPassword").click();
      await expect(page.getByText("Passwords do not match")).toBeVisible();
      await expect(page.locator("#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });

    test("should show error for empty repeat password", async ({ page }) => {
      await page.locator("#signupPassword").fill("TestPass1");
      await page.locator("#signupRepeatPassword").fill("");
      await page.locator("#signupPassword").click();
      await expect(page.getByText("Re-enter password required")).toBeVisible();
      await expect(page.locator("#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)");
      await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    });
  });
});