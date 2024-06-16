@LoginUser

Feature: Verify that the user is able to login into an already registered account.

    User enters their details to login.

    Background: User is landed on the webpage.
        Given The user lands at the webpage.

    Scenario: User is able to login with correct credentials.
        Given The user clicks on the Sign In button on the header.
        When The user enters correct "<EmailAddress>" and "<Password>".
        Then The user is logged in.

        Examples:
            | EmailAddress        | Password    |
            | zulfiTest@gmail.com | testsss123! |