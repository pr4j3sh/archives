Feature: Homepage Functionality

    Scenario: Verify Product Web Testing

        Given User navigates to the Browserstack Homepage

        When User clicks on Product Menu

        Then It should show Web Testing Product

    Scenario: Verify Pricing Product Lists

        Given User Navigates to Browserstack Homepage

        When User clicks on Pricing Menu

        Then It should Display correct Product lists in left Nav

    Scenario: Verify Page Title
      
        Given Browser is opened

        When User navigates to pr4j3sh Website Homepage

        Then It should have 4j3 in title
