import { test, expect } from '@playwright/test';
import { AcceptedUsernames, LoginPageObject } from '../pages/login/LoginPageObject';
import { InventoryListPage } from '../pages/inventory/InventoryListPage';
import { InventoryViewPage } from '../pages/inventory/InventoryViewPage';
import { Card } from '../pages/card/card';
import { CheckoutStepOnePage } from '../pages/checkout/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/checkout/CheckoutSteTwoPage';

test('Login', async ({ page }) => {
  await test.step('login', async () => {
    const password = 'secret_sauce';
    const loginPage = new LoginPageObject(page);

    await loginPage.goto();
    await loginPage.login(AcceptedUsernames.STANDARD_USER, password);
  });

  await test.step('Go to inventory page and add the product to the shopping card', async () => {
    const inventoryPage = new InventoryListPage(page);
    await expect(page).toHaveURL(inventoryPage.pageUrl);
    
    const inventoryList = await inventoryPage.getInventoryList();    

    for (let inventory = 0; inventory < inventoryList.length; inventory++) {
      const inventoryItem = inventoryList[inventory];
      await page.waitForSelector(`//div[@class="inventory_item"][${inventory + 1}]/div[@class="inventory_item_img"]`);
      await inventoryItem.product.click();      

      const inventoryViewPage = new InventoryViewPage(page, inventoryItem.data.inventoryId);
      await expect(page).toHaveURL(inventoryViewPage.pageUrl);
      const inventoryDescription = await inventoryViewPage.getInventoryDescriptionData();
      expect(inventoryItem.data.textContent).toBe(inventoryDescription);
      await inventoryViewPage.addToCard();

      await inventoryViewPage.goBack();

      await expect(page).toHaveURL(inventoryPage.pageUrl);
    }

    await inventoryPage.goToBasket();

    const cartPage = new Card(page);
    await expect(page).toHaveURL(cartPage.pageUrl);
    await cartPage.checkout();

    const checkoutOne = new CheckoutStepOnePage(page);
    await expect(page).toHaveURL(checkoutOne.pageUrl);
    await checkoutOne.enterClientInformation();
    await checkoutOne.continue();

    const checkoutTwo = new CheckoutStepTwoPage(page);
    await expect(page).toHaveURL(checkoutTwo.pageUrl);
    await checkoutTwo.finish();
  });
});