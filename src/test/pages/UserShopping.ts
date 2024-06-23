import { pageFixture } from "../hooks/pageFixture";
import * as userShoppingPage from "../resources/userShoppingPage.json";
import * as registrationPage from "../resources/registrationPage.json";
import { PageElement } from "../resources/interfaces/iPageElement";
import { Page, expect } from "@playwright/test";

    function getResource(resourceName: string){
        return userShoppingPage.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    }

    function getResourceRegisterPage(resourceName: string){
        return registrationPage.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    }

    export class CategoryAndProductSelectionFacade{
        private userShopping: UserShopping;

        constructor(userShopping: UserShopping){
         this.userShopping = userShopping;
    };
        
        public async productSelection(section: string, attire: string){
            await this.userShopping.goSectionAndAttire(section, attire);
        };

        public async selectRandomItem(){
            await this.userShopping.showItems();
            await this.userShopping.selectRandomProduct();
        };

        public async showProductDetails(){
            await this.userShopping.getProductPriceAndSizes();
            await this.userShopping.selectAndGetProductColors();
            await this.userShopping.addToCartProduct();
        };
};

    export class UserShopping {
    constructor(public page: Page){
        pageFixture.page = page;
    };

    userShoppingLocators = {
        shoppingSectionHeader:() => pageFixture.page.locator(getResource('shoppingSectionHeader').selectorValue),
        attireSectionBtn:() => pageFixture.page.locator(getResource('attireSectionBtn').selectorValue),
        itemsShown:() => pageFixture.page.locator(getResource('itemsShown').selectorValue),
        attireSectionOptions:() => pageFixture.page.locator(getResource('attireSectionOptions').selectorValue),
        productShown:() => pageFixture.page.locator(getResource('productsShown').selectorValue),
        productPrice:() => pageFixture.page.locator(getResource('productPrice').selectorValue),
        shoppingList:() => pageFixture.page.locator(getResource('shoppingList').selectorValue),
        productSize:() => pageFixture.page.locator(getResource('productSize').selectorValue),
        getProductSize:() => pageFixture.page.locator(getResource('getProductSize').selectorValue),
        getProductSizesAvailable:() => pageFixture.page.locator(getResource('getProductSizesAvailable').selectorValue),
        getCurrentSelectedColor:() => pageFixture.page.locator(getResource('getCurrentSelectedColor').selectorValue),
        getColorSwatches:() => pageFixture.page.locator(getResource('getColorSwatches').selectorValue),
        getSelectedProductSize:() => pageFixture.page.locator(getResource('getSelectedProductSize').selectorValue),
        pageMessage:() => pageFixture.page.locator(getResourceRegisterPage('pageMessage').selectorValue),
        addToCartBtn:() => pageFixture.page.locator(getResource('addToCartBtn').selectorValue)

    };

    public async goSectionAndAttire(section: string, attire: string):Promise<void>{
        const el = pageFixture.page.locator(getResource('shoppingSectionHeader').selectorValue.replace('FLAG', section));
        await el.click();
        for(let i=0;i<=0;i++){
            const el = await pageFixture.page.locator(getResource('attireSectionBtn').selectorValue.replace('FLAG', attire));
            await el.click();
        };
    };

    public async showItems():Promise<void>{
        const getNumberOfProducts = await this.userShoppingLocators.productShown().count();
        console.log('    Products shown -> ' + getNumberOfProducts + '\n');
        for(let i=1;i<=getNumberOfProducts;i++){
            const getEl = await pageFixture.page.locator(getResource('itemsShown').selectorValue.replace('FLAG', i.toString())).allTextContents();
             for (const text of getEl) {
                console.log(''+i +")" + " " + '\x1b[36m%s\x1b[0m',text.trim());
             };
        };
    };

    public async selectRandomProduct():Promise<void>{
        const getNumberOfProducts = await this.userShoppingLocators.productShown().count();
        let ind: number = Math.floor(Math.random() * (getNumberOfProducts - 1))+ 1;

        if (ind == 0) {
            Math.floor(Math.random() * getNumberOfProducts);
        } else {
        const el = (pageFixture.page.locator(getResource('itemsShown').selectorValue.replace('FLAG', `${ind}`)));
        await expect(el).toBeVisible();
        await el.dblclick({force: true, timeout: 3000});
        const list = await this.userShoppingLocators.shoppingList().isVisible();
        const listCount = await this.userShoppingLocators.shoppingList().count();
        if (list == true){
            pageFixture.logger.warn('User not navigated, retrying click');
            await pageFixture.page.waitForLoadState('networkidle');
            for(let i=0;i<listCount;i++){
            await el.dblclick({force: true, timeout: 3000});
                }
            } else {
            pageFixture.logger.info('User navigated successfully.')
            };
        };
    };

    public async getProductPriceAndSizes():Promise<void>{
        const priceText = (await this.userShoppingLocators.productPrice().textContent()).trim();
        if(await this.userShoppingLocators.productPrice().isVisible() == true){
        pageFixture.logger.warn('Product price is not visible, attempting to click product again.')
        const regEx = /\$\d+\.\d{2}/;
        const matchPriceText = priceText.match(regEx);
        console.log("The price of the product -> "+matchPriceText[0]);
        const sizeText = (await this.userShoppingLocators.productSize().textContent()).trim();
        const getSizes = await this.userShoppingLocators.getProductSizesAvailable().count();
        console.log('\x1b[36m%s\x1b[0m',sizeText+'s' + ' available are: ');
        for(let i=1;i<=getSizes;i++){
            const el = await pageFixture.page.locator(getResource('getProductSize').selectorValue.replace('FLAG', i.toString())).allTextContents();
            for (const text of el) {
                console.log(''+i +")" + " " + '\x1b[36m%s\x1b[0m',text.trim());
             };
        }
        } else {
        return this.selectRandomProduct();
        };
        const getSizes = await this.userShoppingLocators.getProductSizesAvailable().count();
        let ind: number = Math.floor(Math.random() * (getSizes - 1))+ 1;
        const sizeEl = (pageFixture.page.locator(getResource('getProductSize').selectorValue.replace('FLAG', `${ind}`)));
        await sizeEl.click();
        console.log("Size selected: "+await this.userShoppingLocators.getSelectedProductSize().textContent());
    };

    public async selectAndGetProductColors():Promise<void>{
        const getColorSwatch = await this.userShoppingLocators.getColorSwatches().count();
        console.log('Color found: ' + getColorSwatch);
        let ind: number = Math.floor(Math.random() * (getColorSwatch - 1)) + 1;
        if (ind == 0) {
            Math.floor(Math.random() * getColorSwatch);
        } else {
        const colorToBeSelect = await pageFixture.page.locator(getResource('colorSwatch').selectorValue.replace('FLAG', `${ind}`));
        await colorToBeSelect.click();
        await this.userShoppingLocators.getCurrentSelectedColor().isVisible();
        const getColor = await this.userShoppingLocators.getCurrentSelectedColor().textContent();
        console.log('Selected color: ' +getColor);
        };
    };

    public async addToCartProduct():Promise<void>{
        await this.userShoppingLocators.addToCartBtn().click();
        await  expect(this.userShoppingLocators.pageMessage()).toBeVisible();
    };

    
};