Feature: SeqType

  Background:

    Given the System is
      """
      IntSeq = [Integer]
      """

  Scenario: Dressing an empty sequence

    Given I dress JSON's '[]' with IntSeq
    Then the result should be a representation for IntSeq

  Scenario: Dressing a sequence of integers

    Given I dress JSON's '[12, 16]' with IntSeq
    Then the result should be a representation for IntSeq

  Scenario: Dressing a sequence with duplicates

    Given I dress JSON's '[12, 15, 12]' with IntSeq
    Then the result should be a representation for IntSeq

  Scenario: Dressing a sequence containing reals

    Given I dress JSON's '[12, 2.5]' with IntSeq
    Then it should be a TypeError as:
      | message                         | location |
      | Invalid value `2.5` for Integer |        1 |
