import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";

export interface Inventory {
    product: Locator,
    data: {
        inventoryId: number,
        textContent: string
    }
}

export class InventoryPage extends PageObject {
    private readonly cardList: Locator;
    
    constructor(page: Page) {
        super(page, 'v1/inventory.html');
        this.cardList = this.page.locator('//div[@class="inventory_list"]');
    }

    async getInventoryList(): Promise<Inventory[]> {
        const productList = await this.page.$$('//div[@class="inventory_item"]');
        const linkedList: Inventory[] = [];

        for(let index = 0; index < productList.length; index++) {
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
}