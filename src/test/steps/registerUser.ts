import {Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { AccountRegister } from '../pages/AccountRegister';
import { pageFixture } from '../hooks/pageFixture';

setDefaultTimeout(150000);
let registerAccount = new AccountRegister(pageFixture.page);

Given(('The user lands at the webpage.'),  async function () {
    await registerAccount.visitWebPage();
});

When(('The user clicks on create account.'),  async function () {
    await registerAccount.assertAccPage();
});

Then(('The user is redirected to the new customer account form.'),  async function () {
    await registerAccount.enterUserDetails();
});