Feature: login
  As a user
  I want to login
  In order to view pages logged in

  Scenario: login from portal homepage
    Given I go to the homepage
    And I follow "Login"
    And I fill in the following:
      | .modal-dialog #email | adminuser |
      | .modal-dialog #passwd | admin |
    When I press ".btn-login"
    Then I should be logged in as "adminuser"