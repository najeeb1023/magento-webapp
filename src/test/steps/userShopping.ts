import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { MenSection } from "../pages/UserShopping";
import { pageFixture } from "../hooks/pageFixture";

setDefaultTimeout(60000);
let menSection = new MenSection(pageFixture.page);

When("The user clicks on the {string} section.", async function (section: string){
    await menSection.goToSection(section);
});

When("The user clicks on {string} option.", async function (attire: string){
    await menSection.goToAttire(attire);
});

Then("The products are shown.", async function (){
     await menSection.showItems();
});