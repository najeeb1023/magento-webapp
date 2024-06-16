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

When("The user enters {string}, {string}, {string}, {string}.", async function (firstname: string, lastname: string, email: string, password: string) {
    await registerAccount.enterUserDetails(firstname, lastname, email, password);
})

Then(('If the account is already registered then {string} and {string} is entered to sign in the user.'),  async function (emailAddress: string, password: string) {
        await registerAccount.createAccountOrSignIn(emailAddress, password);
});