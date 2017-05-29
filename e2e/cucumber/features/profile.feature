Feature: profile
  As a user
  I want to edit my profile settings

  Background:
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "adminuser" profile
    And I enter in edit mode

  Scenario: change top image
    When I upload "top-profile-image.jpg" to ".image-upload-input"
    Then I see "top-profile-image.jpg" as top image