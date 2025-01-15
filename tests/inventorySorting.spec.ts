import test, { expect } from "@playwright/test";
import { InventoryListPage } from "../pages/inventory/InventoryListPage";
import { LoginPageObject, AcceptedUsernames } from "../pages/login/LoginPageObject";

interface SortingStype {
  Ascending: string,
  Descending: string,
  PriceLowToHigh: string,
  PriceHighToLow: string
}

const sotringType: SortingStype = {
  Ascending: 'Name (A to Z)',
  Descending: 'Name (Z to A)',
  PriceLowToHigh: 'Price (low to high)',
  PriceHighToLow: 'Price (high to low)'
}

test('Inventory sorting', async ({page}) => {
  await test.step('login', async () => {
    const password = 'secret_sauce';
    const loginPage = new LoginPageObject(page);

    await loginPage.goto();
    await loginPage.login(AcceptedUsernames.STANDARD_USER, password);
  });

  await test.step('Verify products are sorted', async () => {
      const inventoryPage = new InventoryListPage(page);
      await expect(page).toHaveURL(inventoryPage.pageUrl);
    
      let isSortedAlphabetically: boolean;
    
      isSortedAlphabetically = await inventoryPage.sort(sotringType.Descending);
      expect(isSortedAlphabetically).toBe(true);
  
      isSortedAlphabetically = await inventoryPage.sort(sotringType.Ascending);
      expect(isSortedAlphabetically).toBe(true);

      isSortedAlphabetically = await inventoryPage.sort(sotringType.PriceHighToLow);
      expect(isSortedAlphabetically).toBe(true);
  
      isSortedAlphabetically = await inventoryPage.sort(sotringType.PriceLowToHigh);
      expect(isSortedAlphabetically).toBe(true);
  });
});