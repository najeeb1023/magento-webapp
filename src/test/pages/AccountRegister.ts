import { Page } from "@playwright/test";
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
    }

    public async visitWebPage ():Promise<void> {
        await pageFixture.page.goto('https://magento.softwaretestingboard.com/');
        await this.registrationPageLocators.createAnAccountBtn().click();
    };

};