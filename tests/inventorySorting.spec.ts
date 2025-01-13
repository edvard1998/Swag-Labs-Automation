import test, { expect } from "@playwright/test";
import { InventoryListPage } from "../pages/inventory/InventoryListPage";
import { LoginPageObject, AcceptedUsernames } from "../pages/login/LoginPageObject";

interface SortingStype {
  Ascending: string,
  Descending: string
}

const sotringType: SortingStype = {
  Ascending: 'ASC',
  Descending: 'DESC'
}

test('Inventory sorting', async ({page}) => {
  await test.step('login', async () => {
    const password = 'secret_sauce';
    const loginPage = new LoginPageObject(page);

    await loginPage.goto();
    await loginPage.login(AcceptedUsernames.STANDARD_USER, password);
  });

    await test.step('Verify products are sorted by name (A-Z) or (Z-A)', async () => {
        const inventoryPage = new InventoryListPage(page);
        await expect(page).toHaveURL(inventoryPage.pageUrl);
      
        let isSortedAlphabetically: boolean;
      
        isSortedAlphabetically = await inventoryPage.sortingByName(sotringType.Descending);
        expect(isSortedAlphabetically).toBe(true);
    
        isSortedAlphabetically = await inventoryPage.sortingByName(sotringType.Ascending);
        expect(isSortedAlphabetically).toBe(true);
      });
});