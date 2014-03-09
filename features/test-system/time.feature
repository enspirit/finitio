Feature: TestSystem.Time

  Background:
    Given the type under test is Time

  Scenario: Against a valid time string in iso8601

    Given I dress JSON's '"2014-03-13T08:30:00"'
    Then the result should be a representation for Time
    And the result should be the 13st of March 2014 at 08:30

  Scenario: Against an invalid date string

    Given I dress JSON's '"2014-03-13T98:20:11"'
    Then it should be a TypeError as:
      | message                                      |
      | Invalid value `2014-03-13T98:20:11` for Time |

  Scenario: Against null

    Given I dress JSON's 'null'
    Then it should be a TypeError as:
      | message                       |
      | Invalid value `null` for Time |
