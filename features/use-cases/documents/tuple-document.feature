Feature: Using Q to define a single-tuple document

  Background:

    Given the System is
      """
      Byte   = Integer( i | i >= 0 && i <= 255 )
      Gender = <mf> String( s | s == 'M' || s == 'F' )
      {
        name: String,
        color: { red: Byte, green: Byte, blue: Byte },
        gender: Gender
      }
      """

  Scenario: Validating data against valid document

    Given I dress the following JSON document:
      """
      {
        "name": "Bernard Lambeau",
        "gender":  "M",
        "color": {
          "red": 12,
          "green": 14,
          "blue": 156
        }
      }
      """

    Then it should be a success

  Scenario: Validating data against an invalid document (I)

    Given I dress the following JSON document:
      """
      {
        "name": "Bernard Lambeau",
        "gender":  "M",
        "color": {
          "red": 12,
          "green": "bar",
          "blue": 156
        }
      }
      """

    Then it should be a TypeError as:
      | message                       | location    |
      | Invalid value `bar` for Byte  | color/green |

  Scenario: Validating data against an invalid document (II)

    Given I dress the following JSON document:
      """
      {
        "name": "Bernard Lambeau",
        "gender":  "bar",
        "color": {
          "red": 12,
          "green": 14,
          "blue": 156
        }
      }
      """

    Then it should be a TypeError as:
      | message                        | location    |
      | Invalid value `bar` for Gender | gender      |
