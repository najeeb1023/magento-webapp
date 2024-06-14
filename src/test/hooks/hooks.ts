import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { config } from "../../../playwright.config"
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch(config);
});

Before(async function () {
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
    pageFixture.page.setViewportSize({width: 1050, height: 1500})
});

After(async function ({pickle, result}) {
    console.log(result?.status);
    if(result?.status == Status.PASSED){
        const img = await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}.png`, type: "png"});
        await this.attach(img, "image/png");
    }
});

AfterAll(async function () {
    await browser.close();
});