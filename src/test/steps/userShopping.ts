import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { CategoryAndProductSelectionFacade, MenSection } from "../pages/UserShopping";
import { pageFixture } from "../hooks/pageFixture";

setDefaultTimeout(60000);
let menSection = new MenSection(pageFixture.page);
let categoryAndProductSectionFacade = new CategoryAndProductSelectionFacade(pageFixture.page);

When("The user clicks on the {string} section and the user clicks on {string} option.", async function (section: string, attire: string){
    await categoryAndProductSectionFacade.productSelection(section, attire);
});

When("The products are shown and user navigates to a product.", async function (){
     await categoryAndProductSectionFacade.randomItemSelection();
});