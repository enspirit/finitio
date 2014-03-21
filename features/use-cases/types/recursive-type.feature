Feature: Recursive type

  Background:

    Given the System is
      """
      Tree = <as> {
        label: String,
        children: [Tree]
      }
      Tree
      """

  Scenario: Dressing a valid tree

    Given I dress the following JSON document:
      """
      {
        "label": "/",
        "children": [
          {
            "label": "/etc",
            "children": []
          }
        ]
      }
      """

    Then it should be a success
