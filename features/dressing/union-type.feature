Feature: UnionType

  Background:

    Given the System is
      """
      AnyNumber = Integer|Real
      """

  Scenario: Dressing an integer

    Given I dress JSON's '12' with AnyNumber
    Then the result should be a representation for AnyNumber

  Scenario: Dressing a real

    Given I dress JSON's '12.5' with AnyNumber
    Then the result should be a representation for AnyNumber

  Scenario: Dressing anything else

    Given I dress JSON's '"foo"' with AnyNumber
    Then it should be a TypeError as:
      | message                           |
      | Invalid value `foo` for AnyNumber |
