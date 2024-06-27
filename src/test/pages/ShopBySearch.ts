import { UserShoppingByWear } from "./UserShoppingByWear";
import * as shopBySearchPage from "../../../src/test/resources/shopBySearchPage.json";
import { PageElement } from "../resources/interfaces/iPageElement";
import { pageFixture } from "../hooks/pageFixture";

    function getResource(resourceName: string){
        return shopBySearchPage.webElements.find((elementName: PageElement) => elementName.elementName == resourceName) as PageElement;
    };

    export class ShopBySearch extends UserShoppingByWear {

    shopBySearchLocators = {
        lumaLogo:() => pageFixture.page.locator(getResource('lumaLogo').selectorValue),
        searchBar:() => pageFixture.page.locator(getResource('searchBar').selectorValue),
        addToCartBtn:() => pageFixture.page.locator(getResource('goToCartBtn').selectorValue)
    };


    public async searchProduct():Promise<any> {    
        console.log('Selected product:', UserShoppingByWear.globalArray[0]);
        await this.shopBySearchLocators.searchBar().fill(UserShoppingByWear.globalArray[0]);
        await pageFixture.page.keyboard.press('Enter');
        };

    public async checkOutToCart():Promise<void> {
        await this.shopBySearchLocators.addToCartBtn().click();
    };
};