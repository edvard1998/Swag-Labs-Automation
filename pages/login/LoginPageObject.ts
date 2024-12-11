import { Locator, Page, expect } from "@playwright/test";
import { PageObject } from "../PageObject";

export enum AcceptedUsernames {
    STANDARD_USER = 'standard_user',
    LOCKED_OUT_USER = 'locked_out_user',
    PROBLEM_USER = 'problem_user',
    PERFORMANCE_GLITCH_USER = 'performance_glitch_user'
}

export class LoginPageObject extends PageObject {
    readonly userNameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page, '/v1/index.html');
        this.userNameField = page.locator('//input[@id="user-name"]');
        this.passwordField = page.locator('//input[@id="password"]');
        this.loginButton = page.locator('//input[@id="login-button"]');
    }

    async login(userName: string, password: string): Promise<void> {
        await this.userNameField.fill(userName);
        await this.passwordField.fill(password);

        await expect(this.loginButton).toBeVisible();
        await this.loginButton.click();
    }
}