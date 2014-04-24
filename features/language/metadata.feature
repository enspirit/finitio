Feature: Support for metadata on first-class citizen

  Background:

    Given the System is
      """
      /- label: "Posint", description: "The set of positive integers" -/
      Posint = Integer( i | i >= 0 )
  
      /- label: "Year", description: "A year data type" -/
      Year = Posint
  
      /- label: "90's", description: "The nineties" -/
      Nineties = Year( y |
        /- after 1990 -/
        min: y >= 1990,
  
        /- before 2000 -/
        max: y < 2000
      )
  
      /- label: "Color", description: "A color ADT" -/
      Color =
        /- Common RGB information contract -/
        <rgb> { r: Integer, g: Integer, b: Integer }
  
      /- label: "Main", description: "Person main type" -/
      {
        /-
          label: "Name",
          description: "Person's name" -/
        name: String,
  
        /- label: "Year of birth",
           description: "Person's year of birth" -/
        yob: Year
      }
      """
  
  Scenario Outline: Metadata on type definitions

    Then metadata at <path> should be as follows
      | label   | description   |
      | <label> | <description> |

    Examples:
      | path     | label  | description                  |
      | Posint   | Posint | The set of positive integers |
      | Year     | Year   | A year data type             |
      | Nineties | 90's   | The nineties                 |
      | Color    | Color  | A color ADT                  |
      | Main     | Main   | Person main type             |

  Scenario Outline: Metadata on attributes
  
    Then metadata at <path> should be as follows
      | label   | description   |
      | <label> | <description> |
  
    Examples:
      | path       | label           | description             |
      | Main/name  | Name            | Person's name           |
      | Main/yob   | Year of birth   | Person's year of birth  |
  
  Scenario Outline: Matadata on constraints
  
    Then metadata at <path> should be as follows
      | description   |
      | <description> |
  
    Examples:
      | path         | description |
      | Nineties/min | after 1990  |
      | Nineties/max | before 2000 |
  
  Scenario Outline: Matadata on information contracts
  
    Then metadata at <path> should be as follows
      | description   |
      | <description> |
  
    Examples:
      | path      | description                     |
      | Color/rgb | Common RGB information contract |
