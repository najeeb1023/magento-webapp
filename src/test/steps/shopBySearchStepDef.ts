import { When, setDefaultTimeout } from "@cucumber/cucumber";
import { ShopBySearch } from "../pages/search/ShopBySearch";
import { pageFixture } from "../hooks/pageFixture";

setDefaultTimeout(60000);
let shopBySearch = new ShopBySearch(pageFixture.page);

When('User searches that product, going to the cart.', async function (){
    await shopBySearch.searchProduct();
    await shopBySearch.checkOutToCart();
});