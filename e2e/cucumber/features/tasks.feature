Feature: manage tasks
  As a user
  I want to manage the tasks

  Background:
    Given I go to the homepage

  Scenario: approve people to join the community
    Given I am logged out
    And I login with "ze", "test"
    And I go to "save-the-environment" profile
    And I press ".profile-summary profile-join .join"
    And I am logged out
    And I login with "adminuser", "admin"
    And I go to "/myprofile/adminuser/tasks"
    When I press first "noosfero-main-block .task-group .accept"
    And I press ".modal-dialog .task-accept .actions button[type='submit']"
    Then I should see "Tarefa Aceita" as message