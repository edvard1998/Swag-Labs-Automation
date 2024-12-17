import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";

export class Card extends PageObject {
    private readonly cardList: Locator;
    private readonly checkoutBtn: Locator;

    constructor(page: Page) {
        super(page, 'v1/cart.html');

        this.cardList = page.locator('//div[@class="cart_list"]');
        this.checkoutBtn = page.locator('//a[normalize-space()="CHECKOUT"]');
    }

    async checkout() {
        if (await this.cardList.count() > 0) {
            this.checkoutBtn.click();
        }
    }
}