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

When("The details of the product are shown and user adds the product in their cart.", async function (){
    await categoryAndProductSectionFacade.showProductDetails();
});

When("User navigates to checkout page.", async function (){
    await categoryAndProductSectionFacade.userItemCheckout();
});

When("User enters {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string} and {string}", async function (emailAddress: string, firstName: string, lastName: string, streetAddress: string, city: string, state: string, zipcode: string, country: string, phoneNumber: string){
    await categoryAndProductSectionFacade.enterUserCheckoutDetails(emailAddress, firstName, lastName, streetAddress, city, state, zipcode, country, phoneNumber);
});

When("User selects a shipping method.", async function () {
    await categoryAndProductSectionFacade.shippingMethodSelection();
});
