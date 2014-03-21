Feature: Friendly scoping of type definitions

  Scenario: Using a type definition that comes later

    Given the System source is
      """
      Bigint = Posint( i | i >= 255 )
      Posint = Integer( i | i >= 0 )
      { length: Bigint }
      """
    Then it should compile fine
