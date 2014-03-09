Feature: Validating against Q relations

Background:

  Given the System is
     """
     Byte   = Integer( i | i>=0 && i<=255 )
     Color  = { r: Byte, g: Byte, b: Byte }
     Colors = {{ r: Byte, g: Byte, b: Byte }}
     """

  Scenario: Validating against a valid Colors representation

    Given I dress the following JSON document with Colors:
      """
      [{ "r": 121, "g": 12, "b": 87 },
       { "r": 132, "g": 1,  "b": 12 }]
      """

    Then it should be a success
    And the result should be a representation for Colors

  Scenario: Validating against an invalid Colors representation (I)

    Given I dress the following JSON document with Colors:
      """
      [{ "r": 121, "g": 12, "b": 87 },
       { "r": 132, "g": -121,  "b": 12 }]
      """

    Then it should be a TypeError as:
      | message                       | location |
      | Invalid value `-121` for Byte | 1/g      |

  Scenario: Validating against an invalid Colors representation (II)

    Given I dress the following JSON document with Colors:
      """
      [{ "r": 121, "g": 12, "b": 87 },
       { "r": 132, "g": 121 }]
      """

    Then it should be a TypeError as:
      | message               | location |
      | Missing attribute `b` | 1        |
