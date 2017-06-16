Feature: manage recent activities
  As a user
  I want manage recent activities

  Background:
  	Given the "recent_activities" plugin is enabled
    Given the "recent_activities" block is enabled
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "adminuser" profile

  Scenario: create a new article and see it in recent activities with label and date

  Scenario: create a new discussion and see it in recent activities with label and date

  Scenario: create a new event and see it in recent activities with label and date

  Scenario: create a new community and see it in recent activities with label and date

  Scenario: add a new follower to current user and see it in recent activities with label and date

  Scenario: add a new friend to current user and see it in recent activities with label and date

  Scenario: comment a discussion and see it in recent activities with label and date

