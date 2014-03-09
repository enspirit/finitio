Feature: Validating against Q scalars

  Background:

    Given the System is
       """
       Byte = Integer( i | i>=0 && i<=255 )
       """

  Scenario: Against a valid byte

    Given I dress JSON's '12' with Byte
    Then the result should be a representation for Byte
    And  the result should be the integer 12

  Scenario: Against an invalid byte

    Given I dress JSON's '"foo"' with Byte
    Then it should be a TypeError as:
      | message                      |
      | Invalid value `foo` for Byte |
