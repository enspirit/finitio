---
title: "Standard Library"
description: "Finitio 0.4 standard library: the types provided by finitio/data."
version: "0.4.x"
order: 2
---

Since 0.4, `String`, `Integer`, `Date` and the rest are **not builtin**. They
are ordinary definitions living in a standard library, and a schema brings
them into scope with an import:

```finitio
@import finitio/data

{ name: String, age: Integer }
```

Without that first line, `String` is simply an unknown type and the schema
fails to compile. This is the single biggest change for a reader coming from
0.3.

The library is written in Finitio itself, on top of
[builtin types](/reference/0.4.x/type-system#builtin-types) — `Integer` is
little more than a named alias for a host abstraction, which is precisely how
Finitio stays host-independent at the schema level.

## The portable core

These behave the same in both implementations and are what you should reach
for:

| Type | Captures | Exchange representation |
|---|---|---|
| `Nil` | the null value | `null` |
| `Boolean` | true and false | `true` / `false` |
| `True` | only true | `true` |
| `False` | only false | `false` |
| `Numeric` | any number | `12`, `12.0`, `12.5` |
| `String` | any string | `"finitio"` |
| `Date` | a calendar date | `"2014-07-17"` |

The Any type is written `.` rather than named. Both implementations
understand the dot; only finitio.js also defines `Any` as a name.

## Numbers need care

`Numeric` behaves identically everywhere. `Integer` and `Real` do not,
because the two host languages disagree about what `12.0` is.

| document | `Integer` in Ruby | `Integer` in JS | `Real` in Ruby | `Real` in JS |
|---|---|---|---|---|
| `12` | accepted | accepted | rejected | rejected |
| `12.0` | **rejected** | **accepted** | **accepted** | **rejected** |
| `12.5` | rejected | rejected | accepted | accepted |

Ruby parses `12.0` from JSON into a `Float`, so it is a `Real` and not an
`Integer`. JavaScript has a single number type in which `12.0` and `12` are
the same value, so finitio.js decides by looking for a fractional part: `12.0`
is an `Integer` and is not a `Real`.

In practice: `Numeric` is always safe; `Integer` agrees on values written
without a decimal point; `Real` agrees on values that genuinely have a
fractional part. A schema that must run under both bindings should avoid
depending on how `12.0` is classified.

## Dates and times

`Date` accepts an ISO 8601 date string in both, and dresses it into the host's
date class — a `Date` in Ruby, a `Date` in JavaScript.

Beyond that the two libraries diverge:

::impl-note{impl="finitio.js"}
`Date` and `Time` also carry a `<milliseconds>` contract, so a *number* is
accepted and dressed as an epoch timestamp. finitio-rb's `Date` has only the
`<iso8601>` contract and rejects numbers.
::

::impl-note{impl="finitio-rb"}
`DateTime` exists as a separate type, and `Time` expects a time rather than a
date — `"2014-07-17"` is rejected by finitio-rb's `Time` and accepted by
finitio.js's. Prefer `Date` for calendar dates in portable schemas.
::

## Implementation-specific names

Some names exist in only one library. They are aliases for host abstractions,
so they cannot be portable by nature:

::impl-note{impl="finitio-rb"}
`NilClass`, `TrueClass`, `FalseClass`, `Float` and `DateTime` name Ruby
classes directly. Use `Nil`, `True`, `False`, `Real` and `Date` instead when
the schema has to run elsewhere.
::

::impl-note{impl="finitio.js"}
`Any` is defined as a name. The dot notation `.` means the same thing and
works in both.
::

## Reading the library

The library is a normal Finitio file and worth a look — it is the clearest
example of the language describing itself. In finitio-rb it lives at
`lib/finitio/stdlib/finitio/data.fio`; in finitio.js at
`src/finitio/stdlib/data.fio`. A definition looks like this:

```finitio
Date = .Date <iso8601> .String \( s | Date.iso8601(s) )
                               \( d | d.iso8601       )
```

That is an [abstract data type](/reference/0.4.x/type-system#abstract-data-types)
bound to the host's `Date` class through one named contract, `iso8601`, with
its dress and undress functions. See
[information contracts](/reference/0.4.x/information-contracts) for what those
two functions mean.
