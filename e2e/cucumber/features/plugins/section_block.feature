Feature: manage sections
  As a user
  I want manage a section block

  Background:
    Given the "section_block" plugin is enabled
    Given a "section block" block is enabled in "adminuser" profile
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "adminuser" profile
    And I enter in edit mode

  Scenario: edit the section block

  Scenario: upload the block image

