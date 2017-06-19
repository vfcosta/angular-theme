Feature: manage discussions
  As a user
  I want manage discussions

  Background:
    Given the "comment-paragraph" plugin is enabled
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "adminuser" profile

