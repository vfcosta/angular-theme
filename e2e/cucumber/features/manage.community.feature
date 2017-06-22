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
      And I pause
      Then I see "teste cucumber" as "noosfero-profile-summary profile-link .profile-name" value

  Scenario: invite a people to join the community

  Scenario: configure the community to accept join request without approval

  Scenario: see the community members

  Scenario: join an existing community

  Scenario: leave a community

