import { pageFixture } from "../hooks/pageFixture";
import * as userShoppingByWearPage from "../resources/userShoppingPageByWear.json";
import * as registrationPage from "../resources/registrationPage.json";
import { PageElement } from "../resources/interfaces/iPageElement";
import { Page, expect } from "@playwright/test";

    function getResource(resourceName: string){
        return userShoppingByWearPage.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    }

    function getResourceRegisterPage(resourceName: string){
        return registrationPage.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    }

    export class CategoryAndProductSelectionFacade{
        private userShoppingByWear: UserShoppingByWear;

        constructor(userShoppingByWear: UserShoppingByWear){
         this.userShoppingByWear = userShoppingByWear;
    };
        
        public async productSelection(section: string, attire: string){
            await this.userShoppingByWear.goSectionAndAttire(section, attire);
        };

        public async selectRandomItem(){
            await this.userShoppingByWear.showItems();
            await this.userShoppingByWear.selectRandomProduct();
        };

        public async showProductDetails(){
            await this.userShoppingByWear.getProductPriceAndSizes();
            await this.userShoppingByWear.selectAndGetProductColors();
            await this.userShoppingByWear.addToCartProduct();
        };
};

    export class UserShoppingByWear {
    constructor(public page: Page){
        pageFixture.page = page;
    };

    public static globalArray: string[] = [];

    userShoppingByWearByWearLocators = {
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
        addToCartBtn:() => pageFixture.page.locator(getResource('addToCartBtn').selectorValue),
        pageTitle:() => pageFixture.page.locator(getResourceRegisterPage('createAccHeading').selectorValue),
        productTitle:() => pageFixture.page.locator(getResourceRegisterPage('productTitle').selectorValue)

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
        const getNumberOfProducts = await this.userShoppingByWearByWearLocators.productShown().count();
        console.log('    Products shown -> ' + getNumberOfProducts + '\n');
        for(let i=1;i<=getNumberOfProducts;i++){
            const getEl = await pageFixture.page.locator(getResource('itemsShown').selectorValue.replace('FLAG', i.toString())).allTextContents();
             for (const text of getEl) {
                console.log(''+i +")" + " " + '\x1b[36m%s\x1b[0m',text.trim());
             };
        };
    };

    public async selectRandomProduct():Promise<any>{
        const getNumberOfProducts = await this.userShoppingByWearByWearLocators.productShown().count();
        let ind: number = Math.floor(Math.random() * (getNumberOfProducts - 1))+ 1;
        if (ind == 0) {
            Math.floor(Math.random() * getNumberOfProducts);
        } else {
        const el = (pageFixture.page.locator(getResource('itemsShown').selectorValue.replace('FLAG', `${ind}`)));
        await expect(el).toBeVisible();
        await el.dblclick({force: true, timeout: 3000});
        const list = await this.userShoppingByWearByWearLocators.shoppingList().isVisible();
        const listCount = await this.userShoppingByWearByWearLocators.shoppingList().count();
        if (list == true){
            await pageFixture.logger.warn('User not navigated, retrying click');
            await pageFixture.page.waitForLoadState('networkidle');
            for(let i=0;i<listCount;i++){
            await el.dblclick({force: true, timeout: 3000});
                }
            } else {
            await pageFixture.logger.info('User navigated successfully.')
            };
        };
        const productName = await this.userShoppingByWearByWearLocators.pageTitle().innerText();
        UserShoppingByWear.globalArray.push(productName)
        return console.log('inside the selectRandomProductFunction', UserShoppingByWear.globalArray)
    };

    public async getProductPriceAndSizes():Promise<void>{
        const priceText = (await this.userShoppingByWearByWearLocators.productPrice().textContent()).trim();
        if(await this.userShoppingByWearByWearLocators.productPrice().isVisible() == true){
        pageFixture.logger.warn('Product price is not visible, attempting to click product again.')
        const regEx = /\$\d+\.\d{2}/;
        const matchPriceText = priceText.match(regEx);
        console.log("The price of the product -> "+matchPriceText[0]);
        const sizeText = (await this.userShoppingByWearByWearLocators.productSize().textContent()).trim();
        const getSizes = await this.userShoppingByWearByWearLocators.getProductSizesAvailable().count();
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
        const getSizes = await this.userShoppingByWearByWearLocators.getProductSizesAvailable().count();
        let ind: number = Math.floor(Math.random() * (getSizes - 1))+ 1;
        const sizeEl = (pageFixture.page.locator(getResource('getProductSize').selectorValue.replace('FLAG', `${ind}`)));
        await sizeEl.click();
        console.log("Size selected: "+await this.userShoppingByWearByWearLocators.getSelectedProductSize().textContent());
    };

    public async selectAndGetProductColors():Promise<void>{
        const getColorSwatch = await this.userShoppingByWearByWearLocators.getColorSwatches().count();
        console.log('Color found: ' + getColorSwatch);
        let ind: number = Math.floor(Math.random() * (getColorSwatch - 1)) + 1;
        if (ind == 0) {
            Math.floor(Math.random() * getColorSwatch);
        } else {
        const colorToBeSelect = await pageFixture.page.locator(getResource('colorSwatch').selectorValue.replace('FLAG', `${ind}`));
        await colorToBeSelect.click();
        await this.userShoppingByWearByWearLocators.getCurrentSelectedColor().isVisible();
        const getColor = await this.userShoppingByWearByWearLocators.getCurrentSelectedColor().textContent();
        console.log('Selected color: ' +getColor);
        };
    };

    public async addToCartProduct():Promise<void>{
        await this.userShoppingByWearByWearLocators.addToCartBtn().click();
        await  expect(this.userShoppingByWearByWearLocators.pageMessage()).toBeVisible();
    };

    
};