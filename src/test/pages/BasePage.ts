import { Page } from "@playwright/test";
import { pageFixture } from "../hooks/pageFixture";
import { PageElement } from "../resources/interfaces/iPageElement";
import * as basePageLocators from "../resources/basePageLocators.json"

    function getResource(resourceName: string) {
        return basePageLocators.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    };

export class BasePage {
    
    constructor (public page: Page){
        pageFixture.page = page;
    };

    public async visitWebPage ():Promise<void> {
        await pageFixture.page.goto('https://magento.softwaretestingboard.com/');
    };

    panelHeaderLocators = {
        createAnAccountBtn:() => pageFixture.page.locator(getResource('createAnAccountBtn').selectorValue),
        singInBtn:() => pageFixture.page.locator(getResource('signInPageBtn').selectorValue),
    };

    navHeaderLocators = {
        shoppingSectionHeader:() => pageFixture.page.locator(getResource('shoppingSectionHeader').selectorValue),
    };

    searchBarLocators = {
        searchBar:() => pageFixture.page.locator(getResource('searchBar').selectorValue)
    };
    
};