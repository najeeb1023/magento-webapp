import { pageFixture } from "../hooks/pageFixture";
import * as userLoginPage from "../../../src/test/resources/userLoginPage.json";
import { PageElement } from "../resources/interfaces/iPageElement";
import { Page, expect } from "@playwright/test";

    function getResource(resourceName: string) {
        return userLoginPage.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    };

export class LoginUser {

    constructor (public page: Page){
        pageFixture.page = page;
    };

    userLoginLocators = {
        singInBtn:() => pageFixture.page.locator(getResource('signInPageBtn').selectorValue),
        emailAddress:() => pageFixture.page.locator(getResource('emailAddress').selectorValue),
        password:() => pageFixture.page.locator(getResource('password').selectorValue),
        signInUserBtn:() => pageFixture.page.locator(getResource('signInBtn').selectorValue),
        welcomeMessage:() => pageFixture.page.locator(getResource('welcomeMessage').selectorValue).first()
    };

    public async goToSignIn():Promise<void>{
        await this.userLoginLocators.singInBtn().click();
    };

    public async userEntersCorrectCredentials(emailAddress: string, password: string):Promise<void>{
        await this.userLoginLocators.emailAddress().first().fill(emailAddress);
        await this.userLoginLocators.password().first().fill(password);
        await this.userLoginLocators.signInUserBtn().first().click();
    };

    public async assertUserIsLoggedIn():Promise<void>{
        await expect(this.userLoginLocators.welcomeMessage()).toContainText('Welcome');
    };
};