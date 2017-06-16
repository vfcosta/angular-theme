Feature: person tags
  As a user
  I want to see my fields of interest

  Background:
    Given the "person-tags" plugin is enabled
    Given the "fields of intersts" block is enabled in the "adminuser" profile
    Given The "adminuser" has "software" as a field of interst
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "adminuser" profile

  Scenario: I see "software" in the "fields of interst" block

