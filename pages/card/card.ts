import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";

export class Card extends PageObject {
    constructor(page: Page) {
        super(page, 'v1/cart.html');
    }
}