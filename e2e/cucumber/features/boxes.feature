Feature: boxes
  As a user
  I want to edit my boxes settings

  Background:
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "adminuser" profile
    And I enter in edit mode

  Scenario: change layout
    When I change layout to "lefttopright"
    Then I see "add-block" 4 times
