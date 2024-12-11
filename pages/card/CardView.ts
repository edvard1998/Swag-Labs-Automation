import { Page } from "@playwright/test";
import { PageObject } from "../PageObject";

export class CardView extends PageObject{
    constructor(page: Page, item?: number) {
        super(page, `/v1/inventory-item.html?id=${item}`);
    }
}