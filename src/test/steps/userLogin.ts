import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginUser } from "../pages/UserLogin";
import { pageFixture } from "../hooks/pageFixture";

setDefaultTimeout(60000);
let userLogin = new LoginUser(pageFixture.page);

Given("The user clicks on the Sign In button on the header.", async function () {
    await userLogin.goToSignIn();
});

When("The user enters correct credentials.", async function (){
    await userLogin.userEntersCorrectCredentials();
});

Then("The user is logged in.", async function (){
    await userLogin.assertUserIsLoggedIn();
});