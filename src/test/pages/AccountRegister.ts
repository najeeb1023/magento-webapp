import { Page, expect } from "@playwright/test";
import { pageFixture } from "../hooks/pageFixture";
import { PageElement } from "../resources/interfaces/iPageElement";
import * as registrationPageLocators from "../resources/registrationPage.json";
import { LoginUser } from "./UserLogin";
import winston from "winston";

    function getResource(resourceName: string) {
        return registrationPageLocators.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    };

let userLogin = new LoginUser(pageFixture.page);

export class AccountRegister {

    constructor (public page: Page){
        pageFixture.page = page;
    };

    registrationPageLocators = {
        createAnAccountBtn:() => pageFixture.page.locator(getResource('createAnAccountBtn').selectorValue),
        createAccHeading:() => pageFixture.page.locator(getResource('createAccHeading').selectorValue),
        firstName:() => pageFixture.page.locator(getResource('firstName').selectorValue),
        lastName:() => pageFixture.page.locator(getResource('lastName').selectorValue),
        emailAddress:() => pageFixture.page.locator(getResource('emailAddress').selectorValue),
        password:() => pageFixture.page.locator(getResource('password').selectorValue),
        confirmPass:() => pageFixture.page.locator(getResource('confirmPass').selectorValue),
        createAccConfirmBtn:() => pageFixture.page.locator(getResource('createAccountConfirmBtn').selectorValue),
        pageMessage:() => pageFixture.page.locator(getResource('pageMessage').selectorValue)
    }

    public async visitWebPage ():Promise<void> {
        await pageFixture.page.goto('https://magento.softwaretestingboard.com/');
        pageFixture.logger.info('Navigated to the webpage - SELF WRITTEN.')
    };

    public async assertAccPage ():Promise<void> {
        await this.registrationPageLocators.createAnAccountBtn().click();
        await expect(this.registrationPageLocators.createAccHeading()).toHaveText('Create New Customer Account');
        
    };

    public async enterUserDetails(firstname: string, lastname: string, email: string, password: string):Promise<void> {
        await this.registrationPageLocators.firstName().fill(firstname);
        await this.registrationPageLocators.lastName().fill(lastname);
        await this.registrationPageLocators.emailAddress().first().fill(email)
        await this.registrationPageLocators.password().first().fill(password);
        await this.registrationPageLocators.confirmPass().fill(password);
    };

    public async createAccountOrSignIn (emailAddress: string, password: string):Promise<void> {
        await pageFixture.page.keyboard.press('PageDown');
        await this.registrationPageLocators.createAccConfirmBtn().first().click();
        await pageFixture.page.keyboard.press('PageUp');
        const pageAssert = await this.registrationPageLocators.pageMessage().innerText();
        if (pageAssert.includes('There is already an account with this email address.')) {
            await userLogin.goToSignIn();
            await userLogin.userEntersCorrectCredentials(emailAddress, password);
            await userLogin.assertUserIsLoggedIn();
        } else {
            expect(this.registrationPageLocators.pageMessage()).toHaveText('Thank you for registering with Main Website Store.')
        };
       
    };

};