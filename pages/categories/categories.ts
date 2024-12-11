import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";

export class CategoriesPage extends PageObject {
    readonly listAmIcon: Locator;

    constructor(page: Page) {
        super(page, 'en/');
    }
}