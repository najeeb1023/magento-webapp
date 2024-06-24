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
        searchBar:() => pageFixture.page.locator(getResource('searchBar').selectorValue)
    };


    public async searchProduct():Promise<any>{
            const product: string = await this.saveSelectedProduct();
            console.log('Selected product:', product);
            await this.shopBySearchLocators.searchBar().fill(product); // Fill searchBarInput with the actual product name
            await pageFixture.page.keyboard.press('Enter');
            };
    };