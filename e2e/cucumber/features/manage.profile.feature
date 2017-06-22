Feature: manage profile
  As a user
  I want to manage my profile

  Background:
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "adminuser" profile
    And I enter in edit mode

  Scenario: change layout
    When I change layout to "lefttopright"
    Then I see "add-block" 4 times

  Scenario: go to the profile homepage

  Scenario: change top image
    When I upload "top-profile-image.jpg" to ".image-upload-input"
    Then I see "top-profile-image.jpg" as top image

  Scenario: delete the profile

  Scenario: view the profile page

  Scenario: create a new post for profile

  Scenario: create a new discussion on profile
