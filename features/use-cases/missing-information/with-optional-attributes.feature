Feature: Missing information using optional tuple attributes

  Background:

    Given the System is
       """
       { name: String, age :? Integer }
       """

   Scenario: Validating when age is not specified

     Given I dress JSON's '{ "name": "Finitio" }'
     Then it should be a success

