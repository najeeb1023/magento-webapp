@UserShopping

Feature: Verify that the user is able to purchase some item.

    User wants to buy something. 

    Background: User is landed on the webpage.
        Given The user lands at the webpage.

    Scenario: User shops for Men Jackets.
        When The user clicks on the "<Section>" section.
        And The user clicks on "<Attire>" option.
        Then The products are shown.

        Examples:
            | Section  | Attire   |
            | Men      | Tees     |

    Scenario: User shops for Women Jackets.
        When The user clicks on the "<Section>" section.
        And The user clicks on "<Attire>" option.
        Then The products are shown.

        Examples:
            | Section    | Attire             |
            | Women      | Bras & Tanks       |