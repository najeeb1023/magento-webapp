@TestRail
@RunID_4

Feature:Verify that the user is able to purchase some item.

    User wants to buy something. 

    Background: User is landed on the webpage.
        Given The user lands at the webpage.

    @MenShopping @AutomationID_C46
    Scenario: User shops for Men attire.
        When The user clicks on the "<Section>" section and the user clicks on "<Attire>" option.
        And The products are shown and user navigates to a product.
        And The details of the product are shown and user adds the product in their cart.
        And User navigates to checkout page.
        And User enters "<EmailAddress>", "<FirstName>", "<LastName>", "<Address>", "<City>", "<State>", "<ZipCode>", "<Country>" and "<PhoneNumber>"
        And User selects a shipping method.

        Examples:
            | Section  | Attire      | EmailAddress          | FirstName | LastName | Address         | City          | State    | ZipCode | Country  | PhoneNumber |
            | Men      | Jackets     | randomemail@gmail.com | Ronald    | McDonald | Any Street 9112 | New York City | New York | 92784   | United States  | 873487682   |

    @WomenShopping @AutomationID_C47
    Scenario: User shops for Women attire.
        When The user clicks on the "<Section>" section and the user clicks on "<Attire>" option.
        And The products are shown and user navigates to a product.
        And The details of the product are shown and user adds the product in their cart.
        And User navigates to checkout page.
        And User enters "<EmailAddress>", "<FirstName>", "<LastName>", "<Address>", "<City>", "<State>", "<ZipCode>", "<Country>" and "<PhoneNumber>"
        And User selects a shipping method.

        Examples:
            | Section    | Attire        | EmailAddress          | FirstName | LastName | Address         | City          | State    | ZipCode | Country      | PhoneNumber |
            | Women      | Bras & Tanks  | randomemail@gmail.com | Ronald    | McDonald | Any Street 9112 | New York City | New York | 92784   | United Tests | 873487682   |