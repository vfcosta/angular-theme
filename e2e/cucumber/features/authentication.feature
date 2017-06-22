Feature: login
  As a user
  I want to login
  In order to view pages logged in

  Background:
    Given I go to the homepage
    And I am logged out

  Scenario: login from portal homepage
    Given I follow "#navbar .login"
    And I fill in the following:
      | .modal-dialog #email | adminuser |
      | .modal-dialog #passwd | admin |
    When I press ".btn-login"
    Then I should be logged in as "adminuser"

  Scenario: successfully signup as a new user
    Given I follow "#navbar .signup"
    And I fill in the following:
      | #name | José Silva |
      | #login| josesilva |
      | #email| josesilva@noosfero.org |
      | #password| 123456 |
      | #passwordConfirm| 123456 |
    And I press ".submit-button"
    Then I should be on the homepage

  Scenario: see error message when trying to signup with an existing username
    Given I follow "#navbar .signup"
    And I fill in the following:
      | #name | José Silva |
      | #login| adminuser |
      | #email| josesilva@noosfero.org |
      | #password| 123456 |
      | #passwordConfirm| 123456 |
    And I press ".submit-button"
    Then I should be on "/account/signup"
    And I see ".login-field .field-error"
