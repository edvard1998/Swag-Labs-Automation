import { Locator, Page, expect } from "@playwright/test";
import { PageObject } from "../PageObject";

export class InventoryPage extends PageObject {
    private readonly shoppingCardIcon: Locator;
    private readonly shoppingCardBadge: Locator;
    private readonly addToCardButton: Locator;

    constructor(page: Page, pageUrl: string) {
        super(page, pageUrl);

        this.shoppingCardIcon = page.locator('//a[@class="shopping_cart_link fa-layers fa-fw"]');
        this.shoppingCardBadge = page.locator('//span[@class="fa-layers-counter shopping_cart_badge"]');
        this.addToCardButton = page.locator('//button[contains(@class, "btn_inventory")]');
    }

    async addToCard() {
        await expect(this.addToCardButton).toBeVisible();
        await this.addToCardButton.click();
        await expect(this.shoppingCardBadge).toBeVisible();
        await expect(this.addToCardButton).toContainText('REMOVE');
    }

    async remove() {
        await expect(this.addToCardButton).toBeVisible();
        await this.addToCardButton.click();

        const productCount = Number(await this.shoppingCardBadge.textContent());
        let btnInventory = 'ADD TO CART';

        if (productCount < 2) {
            await expect(this.shoppingCardBadge).not.toBeVisible();
            btnInventory = 'REMOVE';
        } else {
            await expect(this.shoppingCardBadge).toBeVisible();
        }
        
        await expect(this.addToCardButton).toContainText(btnInventory);
    }
}