@LoginUser @Regression

Feature:C1 Verify that the user is able to login into an already registered account.

    User enters their details to login.

    Background: User is landed on the webpage.
        Given The user lands at the webpage.
    
    @LoginWithCorrectCredentials
    Scenario: User is able to login with correct credentials.
        Given The user clicks on the Sign In button on the header.
        When The user enters "<EmailAddress>" and "<Password>".
        Then The user is logged in.

        Examples:
            | EmailAddress        | Password      |
            | facade23@gmail.com  | facading123!@ |

    @LoginWithIncorrectCredentials
    Scenario: User is not able to login with incorrect credentials.
        Given The user clicks on the Sign In button on the header.
        When The user enters "<EmailAddress>" and "<Password>".
        Then The user is not logged in.

        Examples:
            | EmailAddress         | Password                |
            | incorrect@gmail.com  | incorrectPassword1231@@ |