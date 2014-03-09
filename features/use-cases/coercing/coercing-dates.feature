Feature: Using Q to coerce input data have date attributes

  Background:

    Given the System is
      """
      {
        name: String,
        at: Date
      }
      """

  Scenario: Coercing a valid representation

    Given I dress the following JSON document:
      """
      { "name": "Q", "at": "2014-03-01" }
      """

    Then it should be a success
    And the result should be a Tuple representation
    And its 'at' attribute should be a Date representation
