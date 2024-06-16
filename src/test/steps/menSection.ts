import { When, Then } from "@cucumber/cucumber";
import { MenSection } from "../pages/MenSection";
import { pageFixture } from "../hooks/pageFixture";

let menSection = new MenSection(pageFixture.page);

When("The user clicks on the {string}", async function (){
    await menSection.goToSection();
});

When("The user clicks on {string}", async function (){
    await menSection.goToAttire();
});

Then("The products are shown", async function (){
    await menSection.showItems();
});