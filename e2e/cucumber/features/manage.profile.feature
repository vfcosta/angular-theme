Feature: manage profile
  As a user
  I want to manage my profile

  Background:
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "adminuser" profile

  Scenario: view the profile page
    Then I should be on "/adminuser"

  Scenario: change layout
    And I enter in edit mode
    When I change layout to "lefttopright"
    Then I see "add-block" 4 times

  Scenario: change top image
    And I enter in edit mode
    When I upload "top-profile-image.jpg" to ".image-upload-input"
    Then I see "top-profile-image.jpg" as top image

  Scenario: create a new post for profile
    Given I press ".profile-menu .new-item-button"
    And I press ".profile-menu .new-post"
    When I fill in the following:
      | #titleInput | New article from e2e test |
    And I press ".save-button"
    Then I should be on "/adminuser/new-article-from-e2e-test"

  Scenario: create a new discussion on profile
    Given I press ".profile-menu .new-item-button"
    And I press ".profile-menu .new-discussion"
    When I fill in the following:
      | #titleInput | New discussion from e2e test |
    And I press ".save-button"
    Then I should be on "/adminuser/new-discussion-from-e2e-test"

  Scenario: delete the profile
    Given I press ".profile-setup .btn"
    When I press ".destroy-profile"
    Then I see ".showSweetAlert.visible"
