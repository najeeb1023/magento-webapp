@RegisterUser

Feature: Verify that the user is able to register an account.

    User enters their details to register an account.

    Background: User is landed on the webpage.
        Given The user lands at the webpage.

    Scenario: User is able to register an account.
        When The user clicks on create account.
        Then The user is redirected to the new customer account form.