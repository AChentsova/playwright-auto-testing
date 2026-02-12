import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
import { RegistrationPage } from "../pages/RegistrationPage.js";

test.describe("Validation for Password and Re-enter password fields", () => {
  let registrationPage;
  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto(process.env.BASE_URL, {
      username: process.env.LOGIN_USERNAME,
      password: process.env.LOGIN_PASSWORD,
    });
    await registrationPage.clickSignUpBtn();
  });

  test("should show error for short password", async () => {
    await registrationPage.fillPassword("Pass1");
    await registrationPage.repeatPasswordInput.click();
    await registrationPage.expectTextVisible(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
    await registrationPage.expectFieldErrorBorder(
      registrationPage.passwordInput,
    );
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for long password", async () => {
    await registrationPage.fillPassword("Pass123456789012345");
    await registrationPage.repeatPasswordInput.click();
    await registrationPage.expectTextVisible(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
    await registrationPage.expectFieldErrorBorder(
      registrationPage.passwordInput,
    );
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for password without capital letter", async () => {
    await registrationPage.fillPassword("testpass1");
    await registrationPage.repeatPasswordInput.click();
    await registrationPage.expectTextVisible(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
    await registrationPage.expectFieldErrorBorder(
      registrationPage.passwordInput,
    );
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for password without small letter", async () => {
    await registrationPage.fillPassword("TESTPASS1");
    await registrationPage.repeatPasswordInput.click();
    await registrationPage.expectTextVisible(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
    await registrationPage.expectFieldErrorBorder(
      registrationPage.passwordInput,
    );
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for password without number", async () => {
    await registrationPage.fillPassword("Testpass");
    await registrationPage.repeatPasswordInput.click();
    await registrationPage.expectTextVisible(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
    await registrationPage.expectFieldErrorBorder(
      registrationPage.passwordInput,
    );
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for empty password", async () => {
    await registrationPage.fillPassword("");
    await registrationPage.repeatPasswordInput.click();
    await registrationPage.expectTextVisible("Password required");
    await registrationPage.expectFieldErrorBorder(
      registrationPage.passwordInput,
    );
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for non-matching passwords", async () => {
    await registrationPage.fillPassword("TestPass1");
    await registrationPage.fillRepeatPassword("TestPass2");
    await registrationPage.passwordInput.click();
    await registrationPage.expectTextVisible("Passwords do not match");
    await registrationPage.expectFieldErrorBorder(
      registrationPage.repeatPasswordInput,
    );
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });

  test("should show error for empty repeat password", async () => {
    await registrationPage.fillPassword("TestPass1");
    await registrationPage.fillRepeatPassword("");
    await registrationPage.passwordInput.click();
    await registrationPage.expectTextVisible("Re-enter password required");
    await registrationPage.expectFieldErrorBorder(
      registrationPage.repeatPasswordInput,
    );
    await registrationPage.expectElementDisabled(registrationPage.registerBtn);
  });
});
