@RegisterUser

Feature: Verify that the user is able to register an account.

    User enters their details to register an account.

    Background: User is landed on the webpage.
        Given The user lands at the webpage.

    Scenario: User is able to register an account.
        When The user clicks on create account.
        And The user enters "<FirstName>", "<LastName>", "<Email>", "<Password>".
        Then If the account is already registered then "<Email>" and "<Password>" is entered to sign in the user.

        Examples:
            | FirstName | LastName  | Email                | Password     |
            | TestZulfi | ZulfiTest | zulfiTest@gmail.com  | testsss123!  |
            | UmdeyTest | LastNaw21 | udimswugh@gmail.com  | karaw22a!@r  |