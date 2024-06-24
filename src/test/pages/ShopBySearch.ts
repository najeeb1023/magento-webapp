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


    public async searchProduct():Promise<void>{
        // try {
            const product = await this.selectRandomProduct(); // Ensure to await selectRandomProduct
            //console.log('Selected product:', await product); // Debugging line
            // if (product) {
                const searchProduct = await product.toString();
                await this.shopBySearchLocators.searchBar().fill(await searchProduct); // Fill searchBarInput with the actual product name
                await pageFixture.page.keyboard.press('Enter');
            // } else {
                // console.error('No product was selected');
            };
        // } catch (error) {
        //     console.error('An error occurred:', error);
        // }
    };
// };