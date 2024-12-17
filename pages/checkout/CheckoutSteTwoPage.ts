import { Locator, Page, expect } from "@playwright/test";
import { PageObject } from "../PageObject";

export class CheckoutStepTwoPage extends PageObject {
    private readonly finishBtn: Locator;

    constructor(page: Page) {
        super(page, 'v1/checkout-step-two.html');      
        
        this.finishBtn = page.locator('//a[normalize-space()="FINISH"]');
    }

    async finish() {
        await expect(this.finishBtn).toBeVisible();
        await this.finishBtn.click(); 
    }
}