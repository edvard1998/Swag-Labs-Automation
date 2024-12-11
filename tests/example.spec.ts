import { test, chromium, expect } from '@playwright/test';
import { AcceptedUsernames, LoginPageObject } from '../pages/login/LoginPageObject';
import { AccountPage } from '../pages/account/AccountPage';
import { CategoriesPage } from '../pages/categories/categories';
import { InventoryPage } from '../pages/inventory/InventoryPage';


test('Login', async ({ page }) => {
  await test.step('login', async () => {
    const password = 'secret_sauce';

    const loginPage = new LoginPageObject(page);

    await loginPage.goto();
    await loginPage.login(AcceptedUsernames.STANDARD_USER, password);
  });

  await test.step('go to inventory page', async () => {
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL(inventoryPage.pageUrl);
  });
});