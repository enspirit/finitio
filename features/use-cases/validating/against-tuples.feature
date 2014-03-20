Feature: Validating against Finitio tuples

  Background:

    Given the System is
       """
       Byte  = Integer( i | i>=0 && i<=255 )
       Color = { r: Byte, g: Byte, b: Byte }
       """

  Scenario: Validating against a valid Color representation

    Given I dress the following JSON document with Color:
      """
      { "r": 121, "g": 12, "b": 87 }
      """

    Then it should be a success
    And the result should be a representation for Color

  Scenario: Validating an incomplete Color representation

    Given I dress the following JSON document with Color:
      """
      { "r": 121, "g": 12 }
      """

    Then it should be a TypeError as:
      | message               | location |
      | Missing attribute `b` |          |

  Scenario: Validating a Color representation with extra attributes

    Given I dress the following JSON document with Color:
      """
      { "r": 121, "g": 12, "b": 255, "i": 143 }
      """

    Then it should be a TypeError as:
      | message                    | location |
      | Unrecognized attribute `i` |          |

  Scenario: Validating a Color representation with an invalid attribute type

    Given I dress the following JSON document with Color:
      """
      { "r": "foo", "g": 12, "b": 255 }
      """

    Then it should be a TypeError as:
      | message                      | location |
      | Invalid value `foo` for Byte | r        |


  Scenario: Validating a Color representation with an invalid value

    Given I dress the following JSON document with Color:
      """
      { "r": -12, "g": 12, "b": 255 }
      """

    Then it should be a TypeError as:
      | message                      | location |
      | Invalid value `-12` for Byte | r        |

