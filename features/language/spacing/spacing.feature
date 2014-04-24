Feature: Support for convenient spacing rules

  Scenario: allowing spaces in union types

    Given the System is
      """
      Integer | String
      """
    Then it compiles fine

  Scenario: allowing spaces to be omitted in union types

    Given the System is
      """
      Integer|String
      """
    Then it compiles fine
