---
layout:
  twocols
toc:
- href: 'type-system'
  label: Type System
  children:
  - href: '#any-type'
    label: Any type
  - href: '#builtin-types'
    label: Builtin types
  - href: '#sub-types'
    label: Sub types
  - href: '#union-types'
    label: Union types
  - href: '#seq-types'
    label: Seq types
  - href: '#set-types'
    label: Set types
  - href: '#tuple-types'
    label: Tuple types
  - href: '#relation-types'
    label: Relation types
  - href: '#abstract-data-types'
    label: Abstract Data types
- href: 'information-contracts'
  label: Information Contracts
---
# Type System

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
host language, a Ruby class for instance. The set of values captured by the
*Finitio* type is defined the same set as the host abstraction. For instance,

```finitio
.Integer  # The set of values captured by the Integer class
```

To avoid builtins being spread everywhere, it is usual to define type aliases
and build higher-level types with those aliases instead. This also provides
better host-language independence and interoperability. For instance, the
so-called *default system* in Finitio-rb includes the following definitions:

```finitio
Integer = .Integer
Nil     = .NilClass
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

All types can be sub-typed through constraints. In addition, Finitio uses
structural type equivalence, which means that the type captured by the
definition of `Evens` above is actually equivalent to the following one:

```finitio
Evens = PosInt( i | i % 2 == 0 )
```

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

Capturing sets of values is straightforward too. Set are unordered and may not
contain duplicates:

```finitio
Hobbies = {String}
```

## Tuple types

Tuples capture information facts. Their 'structure' is called *heading* and is
fixed and known in advance. All attributes are mandatory:

```finitio
ProgrammingLanguage = { name: String, author: String, since: Date }
```

## Relation types

Relations are sets of tuples, all of which have the same heading. The notation for defining
relation types naturally follows:

```finitio
Languages = {{ name: String, author: String, since: Date }}
```

Relation types and their syntax are first-class in Finitio, most notably
because of the availability of relational algebra for them, unlike pure sets
of tuples.

Note that relations do not allow duplicates and have no significant ordering
of their tuples. If the ordering is significant, you should consider a
sequence of tuples instead:

```
Preferences = [{ lang: String, reason: String }]
```

## Abstract Data types

Abstract data types, also called user-defined types, provide the way to define
higher level abstractions easily and to optionally connect them to types of
the host language (e.g. a Ruby class). For instance, a `Color` abstraction can
be defined as follows:

```finitio
Color = <rgb> {r: Byte, g: Byte, b: Byte},
        <hex> String( s | s =~ /^#[0-9a-f]{6}$/i )
```

The Color definition above shows that a color can be represented either by a
RGB triple (through a tuple type), or by a hexadecimal string (e.g. #8a2be2).
`rgb` and `hex` are called the **information representations** of the Color
abstraction.

### Binding an ADT to the host language

Defined as above, the type will behave as a union type, i.e. it will let pass
valid RGB triples and hexadecimal strings. Now, representations can be
complemented to connect the Color abstraction to a host language type, e.g. a
Color Ruby class, and raise the level of discourse on the programming side.
This amounts to providing one information contract per representation.

Suppose for example that the following `Color` class has been defined:

```ruby
class Color

  def initialize(r, g, b)
    @r, @g, @b = r, g, b
  end
  attr_reader :r, :g, :b

end
```

Connecting our information ADT to this Color class can be done through a
builtin type and two explicit converters, called the *dresser* and the
*undresser*: (We only show the `rgb` case here; the `hex` one is defined in a
similar way)

```finitio
Color = .Color <rgb> {r: Byte, g: Byte, b: Byte}
                     \( tuple | Color.new(tuple.r, tuple.g, tuple.b) )
                     \( color | {r: color.r, g: color.g, b: color.b} )
```

The converters provide load/dump code to convert from information types to the
code abstraction and vice versa, thereby complementing a representation with a
so-called *information contract*. A binding of *Finitio*, e.g. Finitio-rb,
guarantees that the dresser will only be executed on valid representations of
the corresponding information type. As the dresser tends to be exposed to an
unsafe world, however, it should always be kept *pure and safe* (no side
effects, no metaprogramming, no code evaluation, etc.).

In order to keep *Finitio* schemas as clean as possible, implementations may
provide conventions-over-configuration protocols for automating information
contracts. Bindings typically come with so-called 'internal' and 'external'
ADT protocols.

### Internal ADT protocol

For instance, Finitio-rb provides a more idiomatic way of connecting Ruby
classes to information types. The information contracts may indeed be moved to
the class itself, as one would probably do it, e.g. for testing purpose.

```ruby
class Color

  def initialize(r, g, b)
    @r, @g, @b = r, g, b
  end
  attr_reader :r, :g, :b

  def self.rgb(tuple)
    Color.new(tuple[:r], tuple[:g], tuple[:b])
  end

  def to_rgb
    {r: @r, g: @g, b: @b}
  end

end
```

In Finitio-rb, the following definition, that refers to the builtin type but has
no dresser/undresser, makes the assumption that the convention is met and
will use the `Color.rgb(...)` and `Color#to_rgb` methods:

```finitio
Color = .Color <rgb> {r: Byte, g: Byte, b: Byte}
```

### External ADT protocol

Sometimes, relying on methods provided by the abstraction itself is
impossible or not wanted (e.g. because it would lead to core extensions
considered intrusive). For this reason, *Finitio* bindings may also support
so called 'external' protocols.

Support for example that the `rgb` information contract is not
provided by the `Color` class itself and that it's not possible
to implement it there. Finitio-rb also allows the developer to define the contract
methods in a specific module/class:

```ruby
module RgbContract

  def self.dress(tuple)
    Color.new(tuple[:r], tuple[:g], tuple[:b])
  end

  def self.undress(color)
    { r: color.r, g: color.g, b: color.b }
  end

end
```

Then, in Finitio, the external contract can be specified as follows:

```finitio
Color = .Color <rgb> {r: Byte, g: Byte, b: Byte} .RgbContract
```

The mechanism described here for abstract data types is actually more
general and applies to most of *Finitio*'s work. The next section describes
information contracts in more details.
