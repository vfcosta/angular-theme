Feature: manage community
  As a user
  I want to manage a community

  Background:
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "adminuser" profile
    And profile "e2e-community" doesn't exists
    And I create community to destroy
    And I go to "e2e-community" profile
    And I wait for angular to render

  Scenario: edit community name in fast edit
    And I enter in edit mode
    And I press ".profile-edition-link"
    And I enter text "E2e fast edtion" to "#name" input
    When I press ".save-fast-edtion"
    Then I see "E2e fast edtion" as "noosfero-profile-summary profile-link .profile-name" value

  Scenario: see the community members
    And I enter in profile setup
    When I enter members menu
    Then I should see the list ".profile-item"

  Scenario: invite a people to join the community
    And I enter in profile setup
    When I enter members menu
    And I enter text "paula" to "#names" input
    And I choose first element from typeahead
    When I press "noosfero-invite-component button"
    Then I should see success message

  Scenario: configure the community to accept join request with approval
    And I enter in profile setup
    And I press "#acceptBefore"
    When I press ".save-community"
    And I wait for angular to render
    Then I should see success message    

  Scenario: configure the community to accept join request without approval
    And I enter in profile setup
    And I press "#acceptAfter"
    When I press ".save-community"
    And I wait for angular to render
    Then I should see success message

  Scenario: leave a community
    And I press "profile-join .actions .organization-actions .leave"
    And I wait for angular to render
    Then I should see enter community button "profile-join .actions .organization-actions .join"

  Scenario: join an existing community
    And I press "profile-join .actions .organization-actions .leave"
    And I wait for angular to render
    When I press "profile-join .actions .organization-actions .join"
    And I wait for angular to render
    Then I should see welcome message


  Scenario: Edit community
    And I enter in profile setup
    And I enter text "Edit e2e community" to "#name" input
    And I press ".save-community"
    And I wait for angular to render
    Then I should see success message

  Scenario: Delete community
    And I enter in profile setup
    When I press "ul li .destroy-community"
    And I press ".swal2-confirm"
    And I wait for angular to render
    Then I should see profile removed message
