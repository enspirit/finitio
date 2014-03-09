Feature: TestSystem.Date

  Background:
    Given the type under test is Date

  Scenario: Against a valid date string in iso8601

    Given I dress JSON's '"2014-03-13"'
    Then the result should be a representation for Date
    And the result should be the 13st of March 2014

  Scenario: Against an invalid date string

    Given I dress JSON's '"2014-15-13"'
    Then it should be a TypeError as:
      | message                             |
      | Invalid value `2014-15-13` for Date |

  Scenario: Against null

    Given I dress JSON's 'null'
    Then it should be a TypeError as:
      | message                       |
      | Invalid value `null` for Date |
