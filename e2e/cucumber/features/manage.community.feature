Feature: manage community
  As a user
  I want to manage a community

  Background:
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I prepare community to run tests

  Scenario: edit community name in fast edit
    Given I enter in edit mode
    When I edit the profile name
    Then I should see success message

  Scenario: see the community members
    And I enter in profile setup
    When I enter members menu
    Then I should see the list ".profile-item"

  Scenario: invite a people to join the community
    And I enter in profile setup
    When I enter members menu
    And I enter text "paula" to "#names" input
    And I choose first element from typeahead
    And I press the invite button
    Then I should see success message

  Scenario: configure the community to accept join request with approval
    And I enter in profile setup
    And I choose to moderate members of the community before
    When I save the community
    Then I should see success message

  Scenario: configure the community to accept join request without approval
    And I enter in profile setup
    And I choose to moderate members of the community after
    When I save the community
    Then I should see success message

  Scenario: leave a community
    And I press button leave community
    Then I should see join community button

  Scenario: join an existing community
    And I press button leave community
    When I press button join community
    Then I should see success message

  Scenario: Edit community
    And I enter in profile setup
    And I enter text "Edit e2e community" to "#name" input
    When I save the community
    Then I should see success message

  Scenario: Delete community
    And I enter in profile setup
    When I press delete profile
    Then I should see success message
