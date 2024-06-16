@MenSection

Feature: Verify that the user is able to login into an already registered account.

    User enters their details to login.

    Background: User is landed on the webpage.
        Given The user lands at the webpage.

    Scenario: User shops for Men Jackets.
        When The user clicks on the "<Attire>".
        And The user clicks on "<Option>".
        Then The products are shown.

        Examples:
            | Attire   | Option   |
            | Men      | Jackets  |