import { test, expect } from "../../fixtures/userGaragePage.js";
import { ProfilePage } from "../../pages/ProfilePage.js";

test("should display mocked profile page", async ({ userGaragePage, page }) => {

  const mockedUserData = {
    name: "Justin",
    lastName: "Bieber",
  };

  await page.route("**/api/users/profile", async route => {

    const response = await route.fetch();
    const body = await response.json();
    body.data.name = mockedUserData.name;
    body.data.lastName = mockedUserData.lastName;

    await route.fulfill({
      response,
      body: JSON.stringify(body),
    });

  });

  const profilePage = new ProfilePage(page);
  await profilePage.goto();
  await expect(profilePage.profileName)
    .toHaveText(`${mockedUserData.name} ${mockedUserData.lastName}`);

});