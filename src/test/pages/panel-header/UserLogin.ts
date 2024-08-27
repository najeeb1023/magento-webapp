import { pageFixture } from "../../hooks/pageFixture";
import * as userLoginPage from "../../../../src/test/resources/userLoginPage.json";
import * as registrationpage from "../../../../src/test/resources/registrationPage.json";
import { PageElement } from "../../resources/interfaces/iPageElement";
import { Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

    function getResource(resourceName: string) {
        return userLoginPage.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    };

    function getResourceRegisterPage(resourceName: string) {
        return registrationpage.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    };

export class LoginUser extends BasePage {

    userLoginLocators = {
        emailAddress:() => pageFixture.page.locator(getResource('emailAddress').selectorValue),
        password:() => pageFixture.page.locator(getResource('password').selectorValue),
        signInUserBtn:() => pageFixture.page.locator(getResource('signInBtn').selectorValue),
        welcomeMessage:() => pageFixture.page.locator(getResource('welcomeMessage').selectorValue).first(),
        pageMessage:() => pageFixture.page.locator(getResourceRegisterPage('pageMessage').selectorValue)
    };

    public async goToSignIn():Promise<void>{
        await this.panelHeaderLocators.singInBtn().click();
    };

    public async userEntersCorrectCredentials(emailAddress: string, password: string):Promise<void>{
        await this.userLoginLocators.emailAddress().first().fill(emailAddress);
        await this.userLoginLocators.password().first().fill(password);
        await this.userLoginLocators.signInUserBtn().first().click();
    };

    public async assertUserIsLoggedIn():Promise<void>{ 
        if (expect(this.userLoginLocators.welcomeMessage()).toContainText('Welcome')){
            pageFixture.logger.info('User is logged in.')
        } else {
            pageFixture.logger.error('User is not logged in.')
        }
    };

    public async assertUserIsNotLoggedIn():Promise<void>{ 
        const pageMessage = (await (this.userLoginLocators.pageMessage().textContent())).trim();
        console.log(pageMessage);
        expect(this.userLoginLocators.pageMessage()).toContainText('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
        pageFixture.logger.info('User is logged in.');
    };
};