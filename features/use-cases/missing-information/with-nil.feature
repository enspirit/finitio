Feature: Missing information using Nil

  Background:

    Given the System is
       """
       MaybeInt = Nil|Integer
       """

   Scenario: Validating non nil against Integer

     Given I dress JSON's '12' with Integer
     Then it should be a success
     And the result should be the integer 12

  Scenario: Validating nil against Integer

    Given I dress JSON's 'null' with Integer
    Then it should be a TypeError as:
      | message                          |
      | Invalid value `null` for Integer |

  Scenario: Validating nil against MaybeInt

    Given I dress JSON's 'null' with MaybeInt
    Then it should be a success
    And the result should be a representation for Nil
