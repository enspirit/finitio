Feature: Namespacing type definitions

  Scenario: Using a namespaced name for a type

    Given the System is
      """
      Finitio.Posint = Integer( i | i >= 0 )
      { length: Finitio.Posint }
      """
    Then it compiles fine
