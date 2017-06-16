Feature: manage boxes
  As a user
  I want manage environment boxes

  Background:
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "adminuser" profile
    And I enter in edit mode

  Scenario: add a new box

  Scenario: remove an existing box

  Scenario: move an existing box

  Scenario: change an existing box settings to "Display in all pages"

  Scenario: change an existing box settings to "Only in the home page"

  Scenario: change an existing box settings to "Except in the home page"

  Scenario: change an existing box settings to "Don't display"

  Scenario: change an existing box settings to "Display to all users"

  Scenario: change an existing box settings to "Only Logged"

  Scenario: change an existing box settings to "Only not Logged"  

  Scenario: change an existing box title
  
  Scenario: change layout
    When I change layout to "lefttopright"
    Then I see "add-block" 4 times
