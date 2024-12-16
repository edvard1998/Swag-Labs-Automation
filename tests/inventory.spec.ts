import { test, expect } from '@playwright/test';
import { AcceptedUsernames, LoginPageObject } from '../pages/login/LoginPageObject';
import { InventoryListPage } from '../pages/inventory/InventoryListPage';
import { IventoryViewPage } from '../pages/inventory/InventoryViewPage';


test('Login', async ({ page }) => {
  await test.step('login', async () => {
    const password = 'secret_sauce';
    const loginPage = new LoginPageObject(page);

    await loginPage.goto();
    await loginPage.login(AcceptedUsernames.STANDARD_USER, password);
  });

  await test.step('go to inventory page', async () => {
    const inventoryPage = new InventoryListPage(page);
    await expect(page).toHaveURL(inventoryPage.pageUrl);
    
    const inventoryList = await inventoryPage.getInventoryList();    

    for (let inventory = 0; inventory < inventoryList.length; inventory++) {
      const inventoryItem = inventoryList[inventory];
      await page.waitForSelector(`//div[@class="inventory_item"][${inventory + 1}]/div[@class="inventory_item_img"]`);
      await inventoryItem.product.click();      

      const iventoryViewPage = new IventoryViewPage(page, inventoryItem.data.inventoryId);
      await expect(page).toHaveURL(iventoryViewPage.pageUrl);
      const inventoryDescription = await iventoryViewPage.getInventoryDescriptionData();
      expect(inventoryItem.data.textContent).toBe(inventoryDescription);
      await iventoryViewPage.addToCard();
      await iventoryViewPage.goBack();

      await expect(page).toHaveURL(inventoryPage.pageUrl);
    }
  });
});