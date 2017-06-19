Feature: video block plugin
  As a user
  I want to see the video block

  Background:
    Given the "video" plugin is enabled
    Given a "video block" block is enabled in "adminuser" profile
    Given a "video file url" is defined for the "video block"
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "adminuser" profile

  Scenario: I see the video block


