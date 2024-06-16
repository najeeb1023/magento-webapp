import { pageFixture } from "../hooks/pageFixture";
import * as menSectionPage from "../../../src/test/resources/menSectionPage.json"
import { PageElement } from "../resources/interfaces/iPageElement";
import { Page } from "@playwright/test";

    function getResource(resourceName: string){
        return menSectionPage.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    }

export class MenSection {
    constructor(public page: Page){
        pageFixture.page = page;
    };

    menSectionLocators = {
        menSectionHeader:() => pageFixture.page.locator(getResource('menSectionBtn').selectorValue),
        menAttire:() => pageFixture.page.locator(getResource('attireSectionBtn').selectorValue),
        itemsShown:() => pageFixture.page.locator(getResource('itemsShown').selectorValue)

    };

    public async goToSection():Promise<void>{
        await this.menSectionLocators.menSectionHeader().click();
        
        
    };

    public async goToAttire():Promise<void>{
        await this.menSectionLocators.menAttire().click();
    };

    public async showItems():Promise<void>{
        // await pageFixture.page.locator(getResource('itemsShown').selectorValue.replace('FLAG', i.toString()))
        const showCount = await this.menSectionLocators.itemsShown().count();
        console.log(showCount);
    };

};