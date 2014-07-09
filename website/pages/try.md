---
layout:
  try
schema: |-
  @import finitio/data

  Uuid        = String( s | s.length == 36 )
  Temperature = <celsius> Real( f | f >= 33.0 && f <= 45.0 )
  DateOfBirth = Date( d | alive: d.getFullYear() > 1890 )
  {
    patient : {
      id   : Uuid,
      name : String( s | s.length > 0 ),
      dob  : DateOfBirth
    },
    symptoms : [ String( s | s.length > 0 ) ],
    temperature : Temperature
  }
data: |-
  {
    "patient": {
      "id": "27b3ceb0-7e10-0131-c9f1-3c07545ed162",
      "name": "Marcia Delgados",
      "dob": "1775-11-03"
    },
    "symptoms": [
      "Nausea",
      "Fever"
    ],
    "temperature": 29.5
  }
---
Try finitio