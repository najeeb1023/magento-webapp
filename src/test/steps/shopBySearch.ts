import { When, setDefaultTimeout } from "@cucumber/cucumber";
import { ShopBySearch } from "../pages/ShopBySearch";
import { pageFixture } from "../hooks/pageFixture";

setDefaultTimeout(60000);
let shopBySearch = new ShopBySearch(pageFixture.page);

When('User searches that product.', async function (){
    await shopBySearch.searchProduct();
});