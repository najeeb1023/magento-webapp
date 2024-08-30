@UserShopping @Regression

Feature:Verify that the user is able to purchase some item.

    User wants to buy something. 

    Background: User is landed on the webpage.
        Given The user lands at the webpage.

    @MenShopping
    Scenario: User shops for Men attire.
        When The user clicks on the "<Section>" section and the user clicks on "<Attire>" option.
        And The products are shown and user navigates to a product.
        And The details of the product are shown and user adds the product in their cart.
        And User navigates to checkout page.
        And User enters "<EmailAddress>", "<FirstName>", "<LastName>", "<Address>", "<City>", "<Country>", "<ZipCode>", "<State>" and "<PhoneNumber>"
        And User selects a shipping method.

        Examples:
            | Section  | Attire                    | EmailAddress          | FirstName | LastName | Address              | City   | State        | ZipCode | Country        | PhoneNumber |
            | Men      | Jackets                   | randomemail@gmail.com | User#1    | Test     | Playwright Street 23 | Dublin | Arizona      | 34533   | United States  | 873487682   |
            | Men      | Tees                      | randomemail@gmail.com | Test      | User     | Cypress Street 10    | Berlin | Arizona      | 2342    | United States  | 873487682   |
            | Men      | Jackets                   | randomemail@gmail.com | Utest     | User     | Selenium Street 21   | Munich | Arizona      | 4563    | United States  | 873487682   |
            | Men      | Hoodies & Sweatshirts     | randomemail@gmail.com | Utest     | User     | Selenium Street 21   | Munich | Arizona      | 4563    | United States  | 873487682   |

    @WomenShopping
    Scenario: User shops for Women attire.
        When The user clicks on the "<Section>" section and the user clicks on "<Attire>" option.
        And The products are shown and user navigates to a product.
        And The details of the product are shown and user adds the product in their cart.
        And User navigates to checkout page.
        And User enters "<EmailAddress>", "<FirstName>", "<LastName>", "<Address>", "<City>", "<State>", "<ZipCode>", "<Country>" and "<PhoneNumber>"
        And User selects a shipping method.

        Examples:
            | Section    | Attire                    | EmailAddress          | FirstName | LastName | Address              | City   | State       | ZipCode | Country        | PhoneNumber |
            | Women      | Hoodies & Sweatshirts     | randomemail@gmail.com | User#1    | Test     | Playwright Street 23 | Dublin | Arizone     | 34533   | United States  | 873487682   |
            | Women      | Jackets                   | randomemail@gmail.com | Test      | User     | Cypress Street 10    | Berlin | Arizona     | 2342    | United States  | 873487682   |
            | Women      | Bras & Tanks              | randomemail@gmail.com | Utest     | User     | Selenium Street 21   | Munich | Arizona     | 4563    | United States  | 873487682   |