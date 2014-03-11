Feature: SubType

  Background:

    Given the System is
      """
      Posint = Integer( i | i>= 0 )
      """

  Scenario: Dressing a valid integer

    Given I dress JSON's '12' with Posint
    Then the result should be a representation for Posint

  Scenario: Dressing an invalid integer

    Given I dress JSON's '-12' with Posint
    Then it should be a TypeError as:
      | message                        |
      | Invalid value `-12` for Posint |
