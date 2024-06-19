import { pageFixture } from "../hooks/pageFixture";
import * as menSectionPage from "../resources/menSectionPage.json";
import { PageElement } from "../resources/interfaces/iPageElement";
import { Page, expect } from "@playwright/test";

    function getResource(resourceName: string){
        return menSectionPage.webElements.find((element: PageElement) => element.elementName == resourceName) as PageElement;
    }

    export class MenSection {
    constructor(public page: Page){
        pageFixture.page = page;
    };

    menSectionLocators = {
        menSectionHeader:() => pageFixture.page.locator(getResource('menSectionBtn').selectorValue),
        attireSectionBtn:() => pageFixture.page.locator(getResource('attireSectionBtn').selectorValue),
        itemsShown:() => pageFixture.page.locator(getResource('itemsShown').selectorValue),
        attireSectionOptions:() => pageFixture.page.locator(getResource('attireSectionOptions').selectorValue),
        productShown:() => pageFixture.page.locator(getResource('productsShown').selectorValue)

    };

    public async goToSection(section: string):Promise<void>{
        const el = pageFixture.page.locator(getResource('menSectionBtn').selectorValue.replace('FLAG', section));
        await el.click();
        
        
    };

    public async goToAttire(attire: string):Promise<void>{
        for(let i=0;i<=0;i++){
            const el = await pageFixture.page.locator(getResource('attireSectionBtn').selectorValue.replace('FLAG', attire));
            await el.click();
        };
    };

    public async showItems():Promise<void>{
        const getNumberOfProducts = await this.menSectionLocators.productShown().count();
        process.stdout.write('    Products shown -> ' + getNumberOfProducts + '\n');
        for(let i=1;i<=getNumberOfProducts;i++){
            const getEl = await pageFixture.page.locator(getResource('itemsShown').selectorValue.replace('FLAG', i.toString())).allTextContents();
             for (const text of getEl) {
                console.log('    '+i +")" + " " + text.trim());
             };
        };
    };

    public async selectRandomItem():Promise<void>{
        const getNumberOfProducts = await this.menSectionLocators.productShown().count();
        let ind: number = Math.floor(Math.random() * getNumberOfProducts);
        if (ind == 0) {
            Math.floor(Math.random() * getNumberOfProducts);
        } else {
        await pageFixture.page.locator(getResource('itemsShown').selectorValue.replace('FLAG', `${ind}`));
        };
    };
};
    export class CategoryAndProductSelectionFacade{
        private menSection: MenSection;

        constructor(menSection: MenSection){
         this.menSection = menSection;
    };
        
        public async productSelection(section: string, attire: string){
            await this.menSection.goToSection(section);
            await this.menSection.goToAttire(attire);
        };

        public async selectRandomItem(){
            await this.menSection.showItems();
            await this.menSection.selectRandomItem();
        };
};