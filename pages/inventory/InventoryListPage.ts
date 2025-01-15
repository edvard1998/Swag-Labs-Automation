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

    private async getInventoryItemData(): Promise<{ name: string, price: number }[]> {
        const productDataList: { name: string, price: number }[] = [];

        const productList = await this.page.$$('//div[@class="inventory_item"]');

        for (let index = 0; index < productList.length; index++) {
            const productName = await productList[index].$('.inventory_item_label > a > div');
            const name = await productName?.evaluate(val => {
                return val.textContent; 
            });

            const productPrice = await productList[index].$('.pricebar > div');
            const price = await productPrice?.evaluate(val => {
                return val.textContent?.substring(1); 
            });

            productDataList.push({name: name ?? '', price: parseFloat(price ?? '0.00') });
        }
        
        return productDataList;
    }

    
    async sort(order: string): Promise<boolean> {
        await this.productSortContainer.selectOption(order);

        const productData = await this.getInventoryItemData();
        const isSorted = productData.every((val, i, arr) => {
            switch(order) {
                case 'Name (A to Z)':
                    return !i || arr[i - 1].name.localeCompare(val.name) <= 0;
                case 'Name (Z to A)':
                    return !i || arr[i - 1].name.localeCompare(val.name) > 0;
                case 'Price (low to high)':
                    return !i || arr[i - 1].price <= val.price;
                case 'Price (high to low)':
                    return !i || arr[i - 1].price >= val.price;
            }
        });

        return isSorted;
    }
}