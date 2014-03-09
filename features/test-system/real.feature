Feature: TestSystem.Real

  Background:
    Given the type under test is Real

  Scenario: Against an real

    Given I dress JSON's '12.5'
    Then the result should be a representation for Real
    And  the result should be the real 12.5

  Scenario: Against an integer

    Given I dress JSON's '12'
    Then it should be a TypeError as:
      | message                     |
      | Invalid value `12` for Real |

  Scenario: Against a real literal

    Given I dress JSON's '"12.5"'
    Then it should be a TypeError as:
      | message                       |
      | Invalid value `12.5` for Real |

  Scenario: Against null

    Given I dress JSON's 'null'
    Then it should be a TypeError as:
      | message                       |
      | Invalid value `null` for Real |

  Scenario: Against an arbitrary value

    Given I dress JSON's '"foo"'
    Then it should be a TypeError as:
      | message                      |
      | Invalid value `foo` for Real |
