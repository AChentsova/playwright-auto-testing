export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.profileName = page.locator(".profile_name");
  }

  async goto() {
    await this.page.goto("/panel/profile");
  }

  async expectProfileName(fullName) {
    await this.profileName.waitFor();
    await expect(this.profileName).toHaveText(fullName);
  }
}