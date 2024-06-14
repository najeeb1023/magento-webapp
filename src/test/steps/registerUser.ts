import {Given, When, Then} from '@cucumber/cucumber';
import { AccountRegister } from '../pages/AccountRegister';
import { pageFixture } from '../hooks/pageFixture';

let registerAccount = new AccountRegister(pageFixture.page);

Given(('The user lands at the webpage.'),  async function () {
    await registerAccount.visitWebPage();
});

When(('The user clicks on create account.'),  async function () {
    
});

Then(('The user is redirected to the new customer account form.'),  async function () {
    
});