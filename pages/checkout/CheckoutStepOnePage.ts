import { Locator, Page, expect } from "@playwright/test";
import { PageObject } from "../PageObject";

export interface CheckoutInfo {
    firstname: string,
    lastname: string,
    PostalCode: string
}

export class CheckoutStepOnePage extends PageObject {
    continueBtn: Locator;

    constructor(page: Page) {
        super(page, 'v1/checkout-step-one.html');    
        
        this.continueBtn = page.locator('//input[@value="CONTINUE"]');
    }

    async enterClientInformation() {
        const inputElements = await this.page.$$('input.form_input');

        for (let input = 0; input < inputElements.length; input++) {           
            await this.page.waitForSelector(`input.form_input:nth-of-type(${input + 1})`);
            
            //Something - Temporary value 
            inputElements[input].fill('Something');
        }
    }

    async continue() {
        await expect(this.continueBtn).toBeVisible();
        await this.continueBtn.click();
    }
}