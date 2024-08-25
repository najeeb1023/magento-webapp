@ShopBySearch @Regression

Feature:C5 Verify that the user is able to purchase an item by searching.

    User wants to buy something via search. 

    Background: User is landed on the webpage.
        Given The user lands at the webpage.

    Scenario: User navigates to any random product to get its title.
        When The user clicks on the "<Section>" section and the user clicks on "<Attire>" option.
        And The products are shown and user navigates to a product.
        And User searches that product, going to the cart.

        Examples:
            | Section  | Attire   |
            | Men      | Shorts   |