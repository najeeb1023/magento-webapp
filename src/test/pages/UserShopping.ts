import { pageFixture } from "../hooks/pageFixture";
import * as menSectionPage from "../resources/menSectionPage.json"
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
        // for (let i=0;i<=getAttireOptions;i++){
        //     console.log(getAttireOptions);
        // };
        // const getCountAttire = pageFixture.page.locator(getResource('attireSectionBtn').selectorValue.replace('FLAG', attire))
        // await this.menSectionLocators.menAttire().innerText().then(value => console.log(value))
        // const el = await expect(this.menSectionLocators.menAttire()).toContainText(attire).then(value => console.log(value))
        // console.log(el)
    };

    public async showItems():Promise<void>{
        const getNumberOfProducts = await this.menSectionLocators.productShown().count();
        process.stdout.write('    Products shown -> ' + getNumberOfProducts + '\n');
        for(let i=1;i<=getNumberOfProducts;i++){
            const getEl = await pageFixture.page.locator(getResource('itemsShown').selectorValue.replace('FLAG', i.toString())).allTextContents();
            //  for (const text of getEl) {
            //     const firstLine = text.split('\n')[1].trim();
            //           const getItem = await getEl;
            //           process.stdout.write(`    ${firstLine}${getItem}`);
            //  };
             for (const text of getEl) {
                //  const getItem = await getEl;
                //  process.stdout.write(`    Item ${i} -> ${getItem}${firstLine}\n`);
                console.log('    '+i +")" + " " + text.trim());
             };
            
            // console.log(getEl)
        };
            
        
    //     for(let i=0;i<=getNumberOfProducts;i++){
    //     await pageFixture.page.locator(getResource('productsShown').selectorValue.replace('FLAG', i.toString())).textContent();
    //     const showCount = await this.menSectionLocators.itemsShown().textContent();
    //     console.log(showCount);
    // };
    };

};