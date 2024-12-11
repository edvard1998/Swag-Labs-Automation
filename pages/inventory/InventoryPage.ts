import { Page } from "@playwright/test";
import { PageObject } from "../PageObject";

export class InventoryPage extends PageObject {
    constructor(page: Page) {
        super(page, 'v1/inventory.html');
    }
}