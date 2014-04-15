---
layout:
  twocols
toc:
- href: ! 'type-system'
  label: Type System
- href: ! 'information-contracts'
  label: Information Contracts
  children:
  - href: '#dressing--undressing'
    label: Dressing & Undressing
  - href: '#data-interoperability'
    label: Data Interoperability
  - href: '#contracts-in-action'
    label: Contracts in Action
---
# Information Contracts

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
*Finitio* provides a rich type system dedicated at capturing those data types
precisely, mostly because type systems of mainstream programming languages
fail at providing good support for them.

## Dressing &amp; Undressing

In a more precise way, an information contract is actually a set of
function pairs, such as:

```finitio
# RGB information contract
dress   :: {r: Byte, g:Byte, b: Byte} -> Color
undress :: Color -> {r: Byte, g:Byte, b: Byte}

# HEX information contract
dress   :: String( s | s =~ /#[a-f0-9]{6}/ ) -> Color
undress :: Color -> String( s | s =~ /#[a-f0-9]{6}/ )
```

In other words, each public data representation of an abstraction comes
with two (pure) functions that allow *dressing* the corresponding
information type with the abstraction behavior, and *undressing* the latter
the other way round.

If information contracts are best explained through abstract data types
such as Color, the dress/undress principle is more general. It also allows
explaining the interoperability of data exchange and programming languages.
For instance, the interoperability with JSON could easily be explained as
follows:

```finitio
JSNumber = String( s | s =~ ... )
Integer  = <json> JSNumber \( s | ... ) \( i | ... )
```

This definition naturally defines the following information contract:

```finitio
dress   :: JSNumber -> Integer
undress :: Integer -> JSNumber
```

The actual parsing/unparsing of JSON from/to text is generally done by
dedicated third-party libraries, of course. The example only aims at showing
that information contracts are a very general concept, that *explains*
what is actually going on in practice.

## Data Interoperability

According to the host programming language, however, the interoperability
with exchange formats such as JSON is more of less complete. In Ruby, for
instance, the interoperability is already pretty good. It can be explained as
follows:

```finitio
RbBoolean = <json> JSBoolean
RbString  = <json> JSString
RbNumeric = <json> JSNumber
RbHash    = <json> JSObject
RbArray   = <json> JSArray
...
```

Such a mechanism is already built into the Ruby standard library, and explains
why working with JSON data is rather natural in Ruby (because Ruby classes at
left above are first-class citizen for Ruby programmers). Among others, this
allows Finitio-rb to be kept simple, and work with the Ruby type system only,
delegating the interoperability with JSON to the usual parsing library. More
work might be needed for other programming languages.

Observe, however, that Ruby/JSON interoperability is straightforward but
actually biased towards JSON. The developer has absolutely no way of stating
that some value must be a Ruby `Integer`, since the JSON
specification does not distinguish between integers from reals. One aim with
*Finitio* and its type system is to provide a way for developers to fix this,
by also being able to specify more specific information contracts and have
full control of them. In the example, one would like to express an information
contract like the following one:

```finitio
RbInteger = <json> JSNumber( s | s =~ /^[1-9][0-9]*$/ )
```

## Contracts in Action

Dressing and undressing generally applies recursively, e.g. when involving
collection and abstract data types. This provides the real ability of
*Finitio* to dress and undress complex data involving many information
contracts and many abstractions.

Consider the following Finitio system, i.e. for dressing sequences of tuples
having a name attribute restricted to simple words:

```finitio
Word = .String( s | s =~ /^[a-z]+$/ )
[{ name: Word }]
```

Dressing JSON data with Finitio-rb, for instance, involves the following contracts:

* Dressing `JSString` to Ruby `String` (by the standard library)
* Dressing Ruby `String` to `Word` (by Finitio-rb, returning a Ruby String)
* Dressing Ruby `Hash` to `Tuple` (by Finitio-rb, returning a Ruby Struct)
* Dressing Ruby `Array` to `Seq` (by Finitio-rb, returning a Ruby Array)

The concrete dressing result is implementation-dependent, as it involves the
definition of the representation function `Rep` that binds Finitio types to
types in the host language. The aim is not to define new host abstractions,
e.g. classes, for every *Finitio* type defined in a system but rather to check
that values *conform* to *Finitio* types and choose an idiomatic
representation in the host language (see the parentheses). However, all those
information contracts are actually involved in the dressing process and
provide as many places to validate and coerce data in practice.
