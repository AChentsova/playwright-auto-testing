import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
import { RegistrationPage } from "../pages/RegistrationPage.js";

test.describe("Validation for Email field", () => {
  let registrationPage;
  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto(process.env.BASE_URL, {
      username: process.env.LOGIN_USERNAME,
      password: process.env.LOGIN_PASSWORD,
    });
    await registrationPage.clickSignUpBtn();
  });

  test("should show error for invalid email format", async () => {
    await registrationPage.fillEmail("invalid-email");
    await registrationPage.nameInput.click();
    await registrationPage.expectTextVisible("Email is incorrect");
    await registrationPage.expectFieldErrorBorder(registrationPage.emailInput);
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for empty email", async () => {
    await registrationPage.fillEmail("");
    await registrationPage.nameInput.click();
    await registrationPage.expectTextVisible("Email required");
    await registrationPage.expectFieldErrorBorder(registrationPage.emailInput);
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });
});
