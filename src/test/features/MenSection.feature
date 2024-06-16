@MenSection

Feature: Verify that the user is able to login into an already registered account.

    User wants to see some times. 

    Background: User is landed on the webpage.
        Given The user lands at the webpage.

    Scenario: User shops for Men Jackets.
        When The user clicks on the "<Section>" section.
        And The user clicks on "<Attire>" option.
        Then The products are shown.

        Examples:
            | Section  | Attire   |
            | Men      | Tanks  |