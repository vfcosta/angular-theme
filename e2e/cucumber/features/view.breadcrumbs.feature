Feature: view breadcrumbs
  As a user
  I want to view breadcrumbs on pages when I navigate the site

  Background:
  	Given the "breadcrumbs" plugin is enabled
    Given the "breadcrumbs" block is enabled
    Given I have authored an article with ${articleName}
    Given I have created a ${communityName} community
    Given I go to the homepage

  Scenario: I don't see the breadcrumbs block

  Scenario: I login with "adminuser" with password "admin" and go to home profile and see "adminuser/Profile" breadcrumb

  Scenario: I go to article ${articleName} and see "adminuser/${articleName}"

  Scenario: I go to community ${communityName} and see "adminuser/${communityName}"


