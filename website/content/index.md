---
title: Finitio
description: A data definition language. Think "JSON/XML schema", but the right way.
---

## Validating

Suppose we want to capture information about a medical diagnosis for some
patient. At left, a typical digital document in JSON. At right, the
corresponding *Finitio* schema.

::demo-panels{left-title="diagnosis.json" right-title="diagnosis.fio"}

#left
```json
{
  "patient": {
    "id": "27b3ceb0-7e10-0131-c9f1-3c07545ed162",
    "name": "Marcia Delgados",
    "dob": "1975-11-03"
  },
  "symptoms": [
    "Nausea",
    "Fever"
  ],
  "temperature": 39.5
}
```

#right
```finitio
Temp = <celsius> Real( f | f >= 33.0 and f <= 45.0 )
{
  patient : {
    id   : Uuid,
    name : String( s | s.size > 0 ),
    dob  : Date( d | alive: d.year > 1890 ),
  },
  symptoms : [ String( s | s.size > 0 ) ],
  temperature : Temp
}
```

::

Suppose an invalid document comes in. With *Finitio*, you properly validate
input data and get error messages that say exactly what went wrong, and where.

::demo-panels{left-title="invalid.json" left-badge="rejected" left-tone="invalid" right-title="errors" right-badge="4 problems" right-tone="invalid"}

#left
```json
{
  "patient": {
    "id": "27b3ceb0",
    "dob": "1875-11-03"
  },
  "symptoms": [
    "Nausea",
    ""
  ],
  "temperature": 12.5
}
```

#right
```
[patient/id] Invalid value `27b3ceb0` for Uuid
[patient/dob] Invalid value `1875-11-03` for Date (not alive)
[symptoms/1] Invalid value "" for String( s | s.size > 0 )
[temperature] Invalid value 12.5 for Temperature (celsius)
```

::

## Coercing

Data exchange languages such as JSON impose a very low abstraction level:
booleans, strings and numbers. *Finitio* helps raise the level of discourse,
letting you navigate up and down abstraction levels through **information
contracts**.

::demo-panels{left-title="measures.json" right-title="measures.fio"}

#left
```json
[
  {
    "where": "Brussels",
    "at": "2014-03-01",
    "temperature": 13.5
  },
  {
    "where": "Paris",
    "at": "2014-02-27",
    "temperature": 12.0
  }
]
```

#right
```finitio
Measure = .Measure <info> {
  where: String,
  at: Date,
  temperature: Float( f | f >= -40.0 and f <= 50.0 )
}
[Measure]
```

::

There are two information contracts at work here. An implicit one, `Date`,
provided by *Finitio* itself, and another one, `Measure`, connecting a tuple
type to a `Measure` class.

In *Finitio-rb*, the Ruby binding, loading and dressing the JSON above returns
an array of `Measure` instances. Dates are coerced along the way:

::demo-panel{title="irb" badge="dressed" tone="valid"}

```ruby
[
   #<Measure:0x007fb5d3a1ba40 @where="Brussels", @at=#<Date: 2014-03-01>, @temperature=13.5>,
   #<Measure:0x007fb5d3a16450 @where="Paris", @at=#<Date: 2014-02-27>, @temperature=12.0>
]
```

::
