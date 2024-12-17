import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";

export class Card extends PageObject {
    private readonly cardList: Locator;

    constructor(page: Page) {
        super(page, 'v1/cart.html');

        this.cardList = page.locator('//div[@class="cart_list"]');
    }
}