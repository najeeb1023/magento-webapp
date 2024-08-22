import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { CategoryAndProductSelectionFacade, UserShoppingByWear } from "../pages/UserShoppingByWear";
import { pageFixture } from "../hooks/pageFixture";

setDefaultTimeout(60000);
let userShoppingByWear = new UserShoppingByWear(pageFixture.page);
let categoryAndProductSectionFacade = new CategoryAndProductSelectionFacade(userShoppingByWear);

When("The user clicks on the {string} section and the user clicks on {string} option.", async function (section: string, attire: string){
    await categoryAndProductSectionFacade.productSelection(section, attire);
});

When("The products are shown and user navigates to a product.", async function (){
    await categoryAndProductSectionFacade.selectRandomItem();
});

When("The details of the product are shown.", async function (){
    await categoryAndProductSectionFacade.showProductDetails();
    await categoryAndProductSectionFacade.userItemCheckout();
});