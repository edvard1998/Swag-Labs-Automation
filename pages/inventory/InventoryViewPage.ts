import { Locator, Page, expect } from "@playwright/test";
import { PageObject } from "../PageObject";

export class CardView extends PageObject {
    private readonly backButton: Locator;
    private readonly inventoryDetails: Locator;

    constructor(page: Page, item?: number) {
        super(page, `/v1/inventory-item.html?id=${item}`);

        this.backButton = page.locator('//button[normalize-space()="<- Back"]');
        this.inventoryDetails = page.locator('//div[@class="inventory_details_desc_container"]')
    }

    async getInventoryDescriptionData(): Promise<string> {
        return await this.inventoryDetails.textContent() || ''; 
    }

    async goBack() {
        await expect(this.backButton).toBeVisible();

        await this.backButton.click();
    }
}