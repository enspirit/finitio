---
title: "Information Contracts"
description: "Finitio 0.4 information contracts: dressing and undressing data."
version: "0.4.x"
order: 4
---

*Finitio* tries very hard not to be *yet another data language*. In
particular, it aims at integrating as smoothly as possible with existing
technologies, in particular with programming languages and data exchange
formats (e.g. JSON or YAML).

This interoperability is handled through so-called *information contracts*. In
some respect, information contracts are the dual of axiomatic contracts, i.e.
the dual of public behavioral APIs of software abstractions.

![Information Contracts](/img/contracts.png)

For a given software abstraction, say a `Color`:

* The *axiomatic* contract hides the internal representation in favor of a set
  of public behavioral methods to manipulate the abstraction (e.g. darkening
  and brightening the color),
* The *information* contract hides the internal representation in favor of a
  set of public information representations of the abstraction (e.g. a RGB
  triple, an hexadecimal string).

The data types involved in the definitions of the information contracts are
called *information types*, e.g. `{r: Byte, g: Byte, b: Byte}` (a tuple type).
*Finitio* provides a rich [type system](/reference/0.4.x/type-system)
dedicated at capturing those data types precisely, mostly because type systems
of mainstream programming languages fail at providing good support for them.

## Dressing & Undressing

In a more precise way, an information contract is actually a set of
function pairs, such as:

```finitio
# RGB information contract
dress   :: {r: Byte, g:Byte, b: Byte} -> Color
undress :: Color -> {r: Byte, g:Byte, b: Byte}

# HEX information contract
dress   :: String( s | ... ) -> Color
undress :: Color -> String( s | ... )
```

In other words, each public data representation of an abstraction comes
with two (pure) functions that allow *dressing* the corresponding
information type with the abstraction behavior, and *undressing* the latter
the other way round.

### Validating is not dressing

The two are easy to confuse, and both implementations expose them separately.

* **Validating** asks whether a value already belongs to a type. It is a
  question about set membership, and nothing is converted.
* **Dressing** converts an exchange-level document into host values. A
  document may well *fail* validation and still dress successfully — that is
  the entire point of a contract. The string `"2014-07-17"` is not a `Date`;
  it is the ISO 8601 *representation* of one, and dressing is what turns it
  into a real date.
* **Undressing** goes the other way, producing something you can serialise
  again.

## Declaring an abstract data type

A type can list its representations, each introduced by a name in angle
brackets:

```finitio
Color = <rgb> {r: Byte, g: Byte, b: Byte},
        <hex> String( s | /^#[0-9a-f]{6}$/i.test(s) )
```

Defined like that, `Color` behaves as a union type: it lets valid RGB triples
and hexadecimal strings pass, unchanged.

## Binding to the host language

Representations become contracts once they are connected to an abstraction of
the host language. The type then starts with a
[builtin type](/reference/0.4.x/type-system#builtin-types) naming that
abstraction, and each representation may carry its dress and undress
functions, written with a leading backslash:

```finitio
Color = .Color
  <rgb> [Integer] \( triple | Color.rgb(triple) )
                  \( color  | color.toRgb()     )
  <hex> String    \( hex    | Color.hex(hex)    )
                  \( color  | color.toHex()     )
```

Dressing `[12, 13, 14]` against that type now yields an actual `Color`
instance rather than an array.

The functions are host-language code, so this part of a schema is inherently
implementation-specific — the example above is JavaScript, and the Ruby
equivalent would call `Color.rgb(triple)` and `color.to_rgb`.

### Conventions instead of explicit functions

Both implementations can infer the two functions from naming conventions, so
the explicit form is often unnecessary:

```finitio
Color = .Color
  <rgb> [Integer]
  <hex> String
```

Here `rgb` dresses through `Color.rgb(...)` and undresses through
`color.toRgb()` in JavaScript (`color.to_rgb` in Ruby). The standard
library's `Date` is defined exactly this way.

## Choosing what to undress to

Dressing picks a representation by trying them in order. Undressing has to be
told which one to target, since an abstraction usually has several. A schema
does that by naming a type built from a specific contract, with
`Type/contract`:

```finitio
Color = .Color
  <rgb> [Integer]
  <hex> String

Output = [Color/hex]

[Color]
```

Reading that: the main type dresses a sequence of colors from whatever
representation each one uses, and `Output` describes the form to undress them
back into — hexadecimal strings.

::impl-note{impl="finitio.js"}
finitio-rb does not parse the `Type/contract` form, so selecting a target
representation this way is a finitio.js capability today rather than a
portable language feature.
::

## Contracts in action

Dressing and undressing generally apply recursively, e.g. when involving
collection and abstract data types. This provides the real ability of
*Finitio* to dress and undress complex data involving many information
contracts and many abstractions.

Consider the following Finitio system, for dressing sequences of tuples
having a name attribute restricted to simple words:

```finitio
@import finitio/data

Word = String( s | /^[a-z]+$/.test(s) )

[{ name: Word }]
```

Dressing a JSON document involves a chain of contracts:

* Dressing a JSON string into a host string (by the JSON parser)
* Dressing that string into a `Word` (by Finitio)
* Dressing a host hash/object into a tuple (by Finitio)
* Dressing a host array into a sequence (by Finitio)

The concrete dressing result is implementation-dependent, as it involves the
definition of the representation function `Rep` that binds Finitio types to
types in the host language. The aim is not to define new host abstractions,
e.g. classes, for every *Finitio* type defined in a system but rather to check
that values *conform* to *Finitio* types and choose an idiomatic
representation in the host language. However, all those information contracts
are actually involved in the dressing process and provide as many places to
validate and coerce data in practice.

## Data interoperability

According to the host programming language, the interoperability with exchange
formats such as JSON is more or less complete. In Ruby, for instance, the
interoperability is already pretty good, and can be explained as follows:

```finitio
RbBoolean = <json> JSBoolean
RbString  = <json> JSString
RbNumeric = <json> JSNumber
RbHash    = <json> JSObject
RbArray   = <json> JSArray
```

Such a mechanism is already built into the Ruby standard library, and explains
why working with JSON data is rather natural in Ruby. Among others, this
allows Finitio-rb to be kept simple, and work with the Ruby type system only,
delegating the interoperability with JSON to the usual parsing library.

Observe, however, that this interoperability is straightforward but actually
biased towards JSON. The developer has no way of stating that some value must
be a Ruby `Integer`, since the JSON specification does not distinguish
integers from reals. One aim with *Finitio* is to give developers a way to fix
this, by specifying more specific information contracts and having full
control of them — which is also why `Integer` and `Real` are the two standard
library types whose behaviour differs most between bindings. See
[numbers need care](/reference/0.4.x/stdlib#numbers-need-care).

You can watch all of this happen, step by step, on the
[playground](/try): every example reports validating, dressing and undressing
separately.
