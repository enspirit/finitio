Feature: SetType

  Background:

    Given the System is
      """
      IntSet = {Integer}
      """

  Scenario: Dressing an empty set

    Given I dress JSON's '[]' with IntSet
    Then the result should be a representation for IntSet

  Scenario: Dressing a set of integers

    Given I dress JSON's '[12, 16]' with IntSet
    Then the result should be a representation for IntSet

  Scenario: Dressing in presence of duplicates

    Given I dress JSON's '[12, 15, 12]' with IntSet
    Then it should be a TypeError as:
      | message              |
      | Duplicate value `12` |

  Scenario: Dressing a set containing reals

    Given I dress JSON's '[12, 2.5]' with IntSet
    Then it should be a TypeError as:
      | message                         | location |
      | Invalid value `2.5` for Integer |        1 |
