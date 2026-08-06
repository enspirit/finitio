---
title: "Type System"
description: "Finitio 0.4 type system: how information types are built."
version: "0.4.x"
order: 1
---

*Finitio*'s type system is different from those you can find in a programming
language. The aim here is to capture *information*, not software *behavior*.
Therefore, the definition of *type* differs. In *Finitio*, a type is a set of
values, a subtype is a subset, a supertype is a superset. That's it.

However, the aim here is **not** to define yet another type system with a
fixed set of available types such as `boolean`, `string` and `integer`, but
rather to provide an abstract way of building *information types* and to
'connect' them to the types available in a *host* programming language, or
data exchange language.

For this, a *Finitio* implementation has to define a representation function
that maps, for each *Finitio* type, a type of the host language that will
represent values of the information type. This representation function is
host/implementation-specific; see the documentation of the binding you use.

```finitio
Rep(FinitioType) -> HostType
```

## What changed in 0.4

If you are coming from 0.3, two things are new and one moved:

* `String`, `Integer`, `Date` and friends are no longer builtin. They live in
  the [standard library](/reference/0.4.x/stdlib) and a schema brings them in
  with `@import finitio/data`. Almost every 0.4 schema starts with that line.
* Schemas can be split across files and reused through
  [imports](/reference/0.4.x/imports).
* Types can take type parameters — see [generic types](#generic-types) below.

## Any type

Any type captures the set of all possible 'values' representable in the
host language. It is mostly provided for the sake of completeness and some
implementation needs by specific bindings. It is occasionally useful in
"don't care" situations too. Any is captured by a single dot:

```finitio
Any = .
```

## Builtin types

A builtin type starts with a dot followed by the name of an abstraction in the
host language, a Ruby class or a JavaScript constructor for instance. The set
of values captured by the *Finitio* type is the same set as the host
abstraction. For instance,

```finitio
.Integer  # The set of values captured by the Integer class
```

To avoid builtins being spread everywhere, it is usual to define type aliases
and build higher-level types with those aliases instead. This also provides
better host-language independence and interoperability. That is exactly what
the standard library does, and why you should normally write `Integer` rather
than `.Integer`:

```finitio
@import finitio/data

Integer   # from the standard library, host-independent
```

## Sub types

Sub types are subsets of values. Finitio uses so-called 'specialization by
constraint' to define sub types. E.g., the set of positive integers can be
defined as follows:

```finitio
Posint = Integer( i | i >= 0 )
```

Multiple constraints can be distinguished by name:

```finitio
Evens = Integer( i | positive: i >= 0, even: i%2 == 0 )
```

Naming a constraint is worth the few extra characters: a failure reports the
name of the rule that was broken rather than a bare "invalid value".

All types can be sub-typed through constraints. In addition, Finitio uses
structural type equivalence, which means that the type captured by the
definition of `Evens` above is actually equivalent to the following one:

```finitio
Evens = Posint( i | i % 2 == 0 )
```

### Constraint expressions are host-language code

The expression to the right of the `|` is **not** Finitio. It is an
expression of the host language, evaluated there, and it is the one place
where a schema can stop being portable.

```finitio
String( s | s.length > 0 )   # works in Ruby and in JavaScript
String( s | s.size > 0 )     # Ruby only — JavaScript strings have no .size
```

The gap widens as soon as a constraint reaches into a tuple, because a tuple
is a `Hash` in Ruby and a plain object in JavaScript:

```finitio
{ a: Integer, b: Integer }( t | t.a < t.b )      # JavaScript
{ a: Integer, b: Integer }( t | t[:a] < t[:b] )  # Ruby
```

There is no portable spelling for that second example. If a schema has to run
under both bindings, keep constraints to simple comparisons on scalars, where
`.length`, arithmetic and the usual operators behave the same.

### Constraint shortcuts

A few common constraints have a shorthand, introduced by `::`:

```finitio
Slug   = String :: /^[a-z0-9-]+$/
Rating = Integer :: 1..10
Suit   = String :: { "hearts" "diamonds" "clubs" "spades" }
```

::impl-note{impl="finitio.js"}
finitio-rb does not parse `::`. Write the constraint in its long form
instead — `String( s | /^[a-z0-9-]+$/.test(s) )` — remembering that the body
is host-language code.
::

## Union types

In some respect, union types are the dual of subtypes. They allow defining new
types by generalization, through the union of the sets of values defined by
other types. For instance, the missing Boolean type of Ruby is simply captured
as:

```finitio
Boolean = .TrueClass|.FalseClass
```

Union types are also very useful for capturing possibly missing information
(aka NULL/nil). For instance, the following type will capture either an
integer or nil:

```finitio
MaybeInt = Integer|Nil
```

## Seq types

Capturing sequences (aka arrays) of values is straightforward. Sequences are
ordered and may contain duplicates:

```finitio
Measures = [Posint]
```

## Set types

Capturing sets of values is straightforward too. Sets are unordered and may
not contain duplicates:

```finitio
Hobbies = {String}
```

::impl-note{impl="finitio.js"}
Write `[Posint]` and `{String}` without a space after the opening bracket.
finitio-rb's grammar rejects `[ Posint ]` and `{ String }`. Tuples are
unaffected: `{ name: String }` parses everywhere.
::

## Struct types

Capturing structs is straightforward too. Structs can be used to capture
ordered pairs, triples, and so forth. Each struct component has its own type:

```finitio
Signature = <String, Posint, Boolean>
```

## Tuple & Multi-Tuple types

Tuples capture information facts. Unlike structs, tuples have *named*
components called 'attributes'. Attributes must all have different names and
are not particularly ordered. A set of such `(name,Type)` pairs is called a
*heading*.

```finitio
ProgrammingLanguage = { name: String, author: String, since: Date }
```

Attributes may be separated by commas or simply by newlines:

```finitio
ProgrammingLanguage = {
  name   : String
  author : String
  since  : Date
}
```

By default, all attributes are mandatory. It is very useful in practice to
allow optional attributes too. Multi-tuples provide such support.
Multi-tuples are a very convenient shorthand over unions of tuple types. For
instance, the multi-tuple type below allows `since` to be omitted:

```finitio
{ name: String, author: String, since :? Date }
```

### Extra attributes

By default a tuple rejects any attribute it does not declare. A trailing
`...` accepts them instead:

```finitio
{ name: String, ... }
```

Such a tuple accepts `{"name": "Finitio", "age": 44}` — but **`age` does not
survive dressing**. Finitio's purpose is to give guarantees about data, and
`...` states nothing at all about those attributes, so there is nothing to
vouch for and they are dropped.

Give the extra attributes a type and they are kept, because now there is a
guarantee to make:

```finitio
{ name: String, ...: Integer }
```

Dressing `{"name": "Finitio", "age": 44}` against that type yields both
attributes, and `{"name": "Finitio", "age": "forty-four"}` is rejected.

Note that `...: .` behaves like a bare `...`: the Any type constrains
nothing, so it guarantees nothing.

## Relation & Multi-relation types

Relations are sets of tuples, all of which have the same heading. The notation
for defining relation types naturally follows:

```finitio
Languages = {{ name: String, author: String, since: Date }}
```

Relation types and their syntax are first-class in Finitio, most notably
because of the availability of relational algebra for them, unlike pure sets
of tuples.

Note that relations do not allow duplicates and have no significant ordering
of their tuples. If the ordering is significant, you should consider a
sequence of tuples instead:

```finitio
Preferences = [{ lang: String, reason: String }]
```

Similarly to tuples, multi-relations allow optional attributes. For instance,

```finitio
Languages = {{ name: String, author: String, since :? Date }}
```

## Generic types

A type definition can take type parameters, so one shape can serve many
payloads. Parameters are declared between angle brackets after the name, and
used in the body like any other type:

```finitio
Page<T> = {
  items : [T],
  total : Integer
}
```

A generic is used by instantiating it:

```finitio
Person = { name: String }

Page<Person>
```

A generic may take several parameters:

```finitio
Resource<T,A> = {
  data  : T,
  meta  : A,
  links : [String]
}
```

Instantiations are independent of one another: the same generic can be used
several times in one schema, with different arguments each time.

```finitio
{
  people   : Page<Person>,
  products : Page<Product>
}
```

Constraints declared on a generic apply to every instantiation:

```finitio
Page<T> = {
  items : [T],
  total : Integer
}( p | consistent: p.items.length == p.total )
```

::impl-note{unsupported}
Instantiating a generic with another instantiation — `Resource<Page<Person>>`
— does not parse in either implementation. Name the inner type first:

```finitio
People = Page<Person>
Resource<People>
```
::

## Abstract Data types

Abstract data types, also called user-defined types, provide the way to define
higher level abstractions easily and to optionally connect them to types of
the host language. For instance, a `Color` abstraction can be defined as
follows:

```finitio
Color = <rgb> {r: Byte, g: Byte, b: Byte},
        <hex> String( s | /^#[0-9a-f]{6}$/i.test(s) )
```

The Color definition above shows that a color can be represented either by a
RGB triple (through a tuple type), or by a hexadecimal string (e.g. #8a2be2).
`rgb` and `hex` are called the **information representations** of the Color
abstraction.

Connecting those representations to a class of the host language is what
[information contracts](/reference/0.4.x/information-contracts) are about.

## Comments and metadata

`#` starts a line comment. `/- ... -/` delimits a block comment:

```finitio
# a line comment

/- a block
   comment -/
Age = Integer
```

The block form doubles as metadata when it contains `key: value` pairs. The
metadata attaches to the definition that follows and is available for tooling
such as documentation or JSON Schema generation:

```finitio
/- label: "Age", description: "The age of a person, in years" -/
Age = Integer( i | i >= 0 )
```
