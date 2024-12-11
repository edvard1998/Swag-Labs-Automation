import { Page } from "@playwright/test";

export class PageObject {
    readonly page: Page;
    readonly pageUrl: string;
 
    constructor(page: Page, pageUrl: string) {
        this.page = page;
        this.pageUrl = pageUrl;
    }

    async goto(options?: object) {
        let pageUrl: string = this.pageUrl;
        for (const key in options) {
            const regexp = new RegExp('\\{' + key + '\\}', 'gi');
            pageUrl = pageUrl.replace(regexp, options[key]);
        }
        await this.page.goto(pageUrl);
    }
}