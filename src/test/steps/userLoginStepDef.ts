import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginUser } from "../pages/panel-header/UserLogin";
import { pageFixture } from "../hooks/pageFixture";

setDefaultTimeout(60000);
let userLogin = new LoginUser(pageFixture.page);

Given("The user clicks on the Sign In button on the header.", async function () {
    await userLogin.goToSignIn();
});

When("The user enters {string} and {string}.", async function (emailAddress:string, password: string){
    await userLogin.userEntersCorrectCredentials(emailAddress, password);
});

Then("The user is logged in.", async function (){
    await userLogin.assertUserIsLoggedIn();
});

Then("The user is not logged in.", async function (){
    await userLogin.assertUserIsNotLoggedIn();
});