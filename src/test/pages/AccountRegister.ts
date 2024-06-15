import { Page, expect } from "@playwright/test";
import { pageFixture } from "../hooks/pageFixture";
import { PageElement } from "../resources/interfaces/iPageElement";
import * as registrationPageLocators from "../resources/registrationPage.json";

    function getResource(resourceName: string) {
        return registrationPageLocators.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    };

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
    };

    public async assertAccPage ():Promise<void> {
        await this.registrationPageLocators.createAnAccountBtn().click();
        await expect(this.registrationPageLocators.createAccHeading()).toHaveText('Create New Customer Account');
    };

    public async enterUserDetails ():Promise<any> {
        await this.registrationPageLocators.firstName().fill('Test');
        await this.registrationPageLocators.lastName().fill('Test 2');
        await this.registrationPageLocators.emailAddress().first().fill('testemail@test.com')
        await this.registrationPageLocators.password().first().fill('Te345435345345!@#!@#st');
        await this.registrationPageLocators.confirmPass().fill('Te345435345345!@#!@#st');
        await pageFixture.page.keyboard.press('PageDown');
        await this.registrationPageLocators.createAccConfirmBtn().first().click();
        const pageTextElement = this.registrationPageLocators.pageMessage();
        if (await pageTextElement.isVisible()) {
            console.log('True');
        } else {
            console.log('False');
        }
       
    };

};