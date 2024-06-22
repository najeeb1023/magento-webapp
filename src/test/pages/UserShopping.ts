import { pageFixture } from "../hooks/pageFixture";
import * as userShoppingPage from "../resources/userShoppingPage.json";
import { PageElement } from "../resources/interfaces/iPageElement";
import { Page, expect } from "@playwright/test";

    function getResource(resourceName: string){
        return userShoppingPage.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    }

    export class CategoryAndProductSelectionFacade{
        private menSection: UserShopping;

        constructor(menSection: UserShopping){
         this.menSection = menSection;
    };
        
        public async productSelection(section: string, attire: string){
            await this.menSection.goSectionAndAttire(section, attire);
        };

        public async selectRandomItem(){
            await this.menSection.showItems();
            await this.menSection.selectRandomProduct();
        };
};

    export class UserShopping {
    constructor(public page: Page){
        pageFixture.page = page;
    };

    menSectionLocators = {
        menSectionHeader:() => pageFixture.page.locator(getResource('menSectionBtn').selectorValue),
        attireSectionBtn:() => pageFixture.page.locator(getResource('attireSectionBtn').selectorValue),
        itemsShown:() => pageFixture.page.locator(getResource('itemsShown').selectorValue),
        attireSectionOptions:() => pageFixture.page.locator(getResource('attireSectionOptions').selectorValue),
        productShown:() => pageFixture.page.locator(getResource('productsShown').selectorValue),
        productPrice:() => pageFixture.page.locator(getResource('productPrice').selectorValue),
        shoppingList:() => pageFixture.page.locator(getResource('shoppingList').selectorValue),
        productSize:() => pageFixture.page.locator(getResource('productSize').selectorValue)

    };

    public async goSectionAndAttire(section: string, attire: string):Promise<void>{
        const el = pageFixture.page.locator(getResource('menSectionBtn').selectorValue.replace('FLAG', section));
        await el.click();
        for(let i=0;i<=0;i++){
            const el = await pageFixture.page.locator(getResource('attireSectionBtn').selectorValue.replace('FLAG', attire));
            await el.click();
        };
    };

    public async showItems():Promise<void>{
        const getNumberOfProducts = await this.menSectionLocators.productShown().count();
        process.stdout.write('    Products shown -> ' + getNumberOfProducts + '\n');
        for(let i=1;i<=getNumberOfProducts;i++){
            const getEl = await pageFixture.page.locator(getResource('itemsShown').selectorValue.replace('FLAG', i.toString())).allTextContents();
             for (const text of getEl) {
                console.log(''+i +")" + " " + text.trim());
             };
        };
    };

    public async selectRandomProduct():Promise<void>{
        const getNumberOfProducts = await this.menSectionLocators.productShown().count();
        let ind: number = Math.floor(Math.random() * getNumberOfProducts);
        if (ind == 0) {
            Math.floor(Math.random() * getNumberOfProducts);
        } else {
        const el = (pageFixture.page.locator(getResource('itemsShown').selectorValue.replace('FLAG', `${ind}`)));
        await expect(el).toBeVisible();
        await el.dblclick({force: true, timeout: 3000});
        const list = await this.menSectionLocators.shoppingList().isVisible();
        const listCount = await this.menSectionLocators.shoppingList().count();
        if (list == true){
            pageFixture.logger.error('User not navigated, retrying click');
            await pageFixture.page.waitForLoadState('networkidle');
            for(let i=0;i<listCount;i++){
            await el.dblclick({force: true, timeout: 3000});
                }
            } else {
            pageFixture.logger.info('User navigated successfully.')
            };
        };
    };

    public async getProductPrice():Promise<void>{
        const priceText = (await this.menSectionLocators.productPrice().textContent()).trim();
        const regEx = /\$\d+\.\d{2}/;
        const matchPriceText = priceText.match(regEx);
        console.log("The price of the product -> "+matchPriceText[0]);
        const text = (await this.menSectionLocators.productSize().textContent()).trim();
        console.log(text)
    };
};