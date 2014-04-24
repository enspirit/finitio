Feature: Support for convenient comma rules

  Scenario Outline: allowing commas in various inline scenarios

    Given the System is
      """
      <source>
      """
    Then it compiles fine

    Examples:
      | source                                |
      | { name: String, year: Integer }       |
      | { name: String, year: Integer, ... }  |
      | { name: String, year: Integer, }      |

  Scenario Outline: allowing commas to be omitted in various inline scenarios

    Given the System is
      """
      <source>
      """
    Then it compiles fine

    Examples:
      | source                              |
      | { name: String, year: Integer ... } |

  ### Multi-line headings

  Scenario: allowing commas to be omitted in multiline headings

    Given the System is
      """
      {
        name: String
        year: Integer 
      }
      """
    Then it compiles fine

  Scenario: allowing trailing commas in multiline headings

    Given the System is
      """
      {
        name: String,
        year: Integer, 
      }
      """
    Then it compiles fine

  ### Multi-line constraints

  Scenario: allowing commas to be omitted in multiline constraints

    Given the System is
      """
      Integer( i |
        min: i>0
        max: i<99
      )
      """
    Then it compiles fine

  Scenario: allowing trailing commas in multiline constraints

    Given the System is
      """
      Integer( i |
        min: i>0,
        max: i<99,
      )
      """
    Then it compiles fine

  ### Multi-line information contracts

  Scenario: allowing commas to be omitted in multiline info contracts

    Given the System is
      """
      Color =
        <rgb> { ... }
        <hex> String
      """
    Then it compiles fine

  Scenario: allowing trailing commas in multiline info contracts

    Given the System is
      """
      Color =
        <rgb> { ... },
        <hex> String,
      """
    Then it compiles fine


