import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { config } from "../../../playwright.config";
import { pageFixture } from "./pageFixture";
import createCustomLogger from "../../../logger/logger";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    pageFixture.logger = createCustomLogger();
    browser = await chromium.launch(config);
});

Before(async function () {
    context = await browser.newContext({viewport: null});
    const page = await context.newPage();
    pageFixture.page = page;
});

After(async function ({ pickle, result }) {
    console.log(result?.status);
    if(result?.status == Status.PASSED){
        const img = await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}.png`, type: "png"});
        await this.attach(img, "image/png");
    };
});

AfterAll(async function () {
    await pageFixture.page.waitForTimeout(2000);
    await browser.close();
    pageFixture.logger.close();
});