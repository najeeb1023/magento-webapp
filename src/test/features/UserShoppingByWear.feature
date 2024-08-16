@UserShopping @Regression

Feature: Verify that the user is able to purchase some item.

    User wants to buy something. 

    Background: User is landed on the webpage.
        Given The user lands at the webpage.

    @MenShopping
    Scenario: User shops for Men attire.
        When The user clicks on the "<Section>" section and the user clicks on "<Attire>" option.
        And The products are shown and user navigates to a product.
        Then The details of the product are shown.

        Examples:
            | Section  | Attire      |
            | Men      | Jackets     |

    @WomenShopping
    Scenario: User shops for Women attire.
        When The user clicks on the "<Section>" section and the user clicks on "<Attire>" option.
        And The products are shown and user navigates to a product.
        Then The details of the product are shown.

        Examples:
            | Section    | Attire        |
            | Women      | Bras & Tanks  |