import { Locator, Page, expect } from "@playwright/test";
import { PageObject } from "../PageObject";
import { CategoriesPage } from "../categories/categories";

export class AccountPage extends PageObject {
    readonly listAmIcon: Locator;

    constructor(page: Page) {
        super(page, '/my');

        this.listAmIcon = page.locator('//a[@id="l"]');
    }

    async gotoCategories() {
        // await expect.soft(this.listAmIcon).toBeVisible();
        await this.listAmIcon.click();
    }
}