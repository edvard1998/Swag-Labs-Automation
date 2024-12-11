import { Locator, Page, expect } from "@playwright/test";
import { PageObject } from "../PageObject";

export class InventoryPage extends PageObject {
    private readonly cardList: Locator;
    
    constructor(page: Page) {
        super(page, 'v1/inventory.html');

        this.cardList = this.page.locator('//div[@class="inventory_list"]');
    }

    async addToCard() {
        await expect(this.cardList).toBeVisible();
    }
}