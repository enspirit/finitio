Feature: TestSystem.Nil

  Background:
    Given the type under test is Nil

  Scenario: Against null

    Given I dress JSON's 'null'
    Then the result should be a representation for Nil

  Scenario: Against a string

    Given I dress JSON's '"bar"'

    Then it should be a TypeError as:
      | message                        |
      | Invalid value `bar` for Nil    |
