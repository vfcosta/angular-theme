Feature: manage discussions
  As a user
  I want manage discussions

  Background:
  	Given the "comment-paragraph" plugin is enabled
    Given I go to the homepage
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "adminuser" profile

  Scenario: create new discussion with two paragraphs

  Scenario: go to the discussion creator profile homepage

  Scenario: put a comment on a exisiting discussion

  Scenario: put a comment on the first discussion paragraph

  Scenario: put another comment on the first discussion paragraph

  Scenario: reply the last comment on the first discussion paragraph

  Scenario: edit the second discussion paragraph

  Scenario: remove the reply of the last comment on the first discussion paragraph

  Scenario: put a comment on the second paragraph

  Scenario: reply a discussion comment

  Scenario: export discussion comments

  Scenario: remove a discussion comment reply

  Scenario: remove a discussion comment without replies

  Scenario: remove a discussion comment with replies

  Scenario: delete a discussion

  

