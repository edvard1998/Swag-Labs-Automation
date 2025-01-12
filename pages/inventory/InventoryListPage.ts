import { Locator, Page, expect } from "@playwright/test";
import { InventoryPage } from "./InventoryPage";

export interface Inventory {
    product: Locator,
    data: {
        inventoryId: number,
        textContent: string
    }
}

export class InventoryListPage extends InventoryPage {
    private readonly cardList: Locator;
    private readonly productSortContainer: Locator;
    
    constructor(page: Page) {
        super(page, 'v1/inventory.html');
        this.cardList = this.page.locator('//div[@class="inventory_list"]');
        this.productSortContainer = this.page.locator('//select[@class="product_sort_container"]');
    }

    async getInventoryList(): Promise<Inventory[]> {
        const productList = await this.page.$$('//div[@class="inventory_item"]');
        const linkedList: Inventory[] = [];

        for (let index = 0; index < productList.length; index++) {
            const productItem = this.page.locator(`//div[@class="inventory_item"][${index + 1}]/div[@class="inventory_item_img"]`);
            const innerElement = productList[index].evaluate(el => {                
                return {
                    textContent: el.textContent,
                    innerHTML: el.innerHTML
                }
            }).then(response => response);

            const idIndex = ((await innerElement).innerHTML).search(/\d+/);
            const productId = parseInt(((await innerElement).innerHTML).slice(idIndex), 10);

            linkedList.push({
                product: productItem, 
                data: {
                    inventoryId: productId,
                    textContent: <string>(await innerElement).textContent 
                } 
            });
        }

        return linkedList;
    }

    async getInventoryItemName(): Promise<string[]> {
        const productNameList: string[] = [];

        const productList = await this.page.$$('//div[@class="inventory_item"]');

        for (let index = 0; index < productList.length; index++) {
            const productItem = this.page.locator(`//div[@class="inventory_item"][${index + 1}]/div[@class="inventory_item_label"]/a/div`);

            const innerText = await productItem.textContent();
            productNameList.push(innerText ?? '');   
        }
        
        return productNameList;
        
    } 
    
    async sortingByName(order: string): Promise<boolean> {
        await this.productSortContainer.selectOption((order == 'ASC' && 'Name (A to Z)') || 'Name (Z to A)');

        const productNames = await this.getInventoryItemName();
        const isSortedAlphabetically = productNames.every((val, i, arr) => order == 'ASC' ? !i || arr[i - 1].localeCompare(val) <= 0 : !i || arr[i - 1].localeCompare(val) > 0 );

        return isSortedAlphabetically
    }
}