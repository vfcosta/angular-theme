Feature: manage community
  As a user
  I want to manage a community

  Background:
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"

  Scenario: edit community name in fast edit
    Given I go to "save-the-environment" profile
    And I enter in edit mode
    When I press ".profile-edition-link"
    And I enter text "teste cucumber" to "#name" input
    And I press ".save-fast-edtion"
    Then I see "teste cucumber" as "noosfero-profile-summary profile-link .profile-name" value

  Scenario: see the community members
    Given I go to "save-the-environment" profile
    And I press ".open-setup"
    When I press "ul li .members"
    Then I should see the list ".profile-item"

  Scenario: invite a people to join the community
    Given I go to "save-the-environment" profile
    And I press ".open-setup"
    When I press "ul li .members"
    And I enter text "paula" to "#names" input
    And I choose one element from typeahead "typeahead-container li:nth-child(1)>a"
    When I press "noosfero-invite-component button"
    Then I should see success message "#toast-container"

  Scenario: configure the community to accept join request with approval
    Given I go to "save-the-environment" profile
    And I press ".open-setup"
    And I press "#acceptBefore"
    When I press ".save-community"
    Then I should see success message "#toast-container"    

  Scenario: configure the community to accept join request without approval
    Given I go to "save-the-environment" profile
    And I press ".open-setup"
    And I press "#acceptAfter"
    When I press ".save-community"
    Then I should see success message "#toast-container"

  Scenario: join an existing community

  Scenario: leave a community

