Feature: TestSystem.Any

  Background:
    Given the type under test is Any

  Scenario: Against null

    Given I dress JSON's 'null'
    Then the result should be a representation for Nil

  Scenario: Against a string

    Given I dress JSON's '12'
    Then the result should be the integer 12
