import { Page } from "@playwright/test";

export class PageObject {
    readonly page: Page;
    readonly pageUrl: string;
 
    constructor(page: Page, pageUrl: string) {
        this.page = page;
        this.pageUrl = pageUrl;
    }

    async goto() {
        await this.page.goto(this.pageUrl);
    }
}