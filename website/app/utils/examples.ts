export interface PlaygroundExample {
  id: string
  group: string
  label: string
  /** One line explaining the feature the example introduces. */
  blurb: string
  schema: string
  data: string
  /** A CommonJS module providing host classes to bind abstract data types to. */
  context?: string
}

/**
 * The `Color` class the two ADT examples bind to, carried over from the
 * original csv,conf demo.
 */
const COLOR_CONTEXT = `function Color(triple){
  this.triple = triple;
}

// <rgb> dresses from / undresses to a triple of integers.
Color.rgb = function(triple){
  return new Color(triple);
};

Color.prototype.toRgb = function(){
  return this.triple;
};

// <hex> dresses from / undresses to a "#rrggbb" string.
Color.hex = function(hex){
  var f = function(off){
    return parseInt(hex.slice(off, off + 2), 16);
  };
  return Color.rgb([f(1), f(3), f(5)]);
};

Color.prototype.toHex = function(){
  var r = this.triple[0], g = this.triple[1], b = this.triple[2];
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

Color.prototype.toString = function(){
  return "Color(" + this.triple.join(",") + ")";
};

module.exports = { Color: Color };
`

export const EXAMPLE_GROUPS = [
  'Basics',
  'Collections & structures',
  'Information contracts',
  'Generics',
] as const

/**
 * A progressive tour: each example introduces one idea, building on the last.
 * Several deliberately ship data that fails, so the error output is part of
 * the lesson.
 */
export const EXAMPLES: PlaygroundExample[] = [
  // ------------------------------------------------------------- Basics
  {
    id: 'anything',
    group: 'Basics',
    label: 'Anything at all',
    blurb:
      'A lone dot is the Any type: the set of every value the host language can represent.',
    schema: `.
`,
    data: `"Hello World"
`,
  },
  {
    id: 'builtin',
    group: 'Basics',
    label: 'Builtin types',
    blurb:
      'Builtins come from the standard library, imported with @import finitio/data.',
    schema: `@import finitio/data

Integer
`,
    data: `12
`,
  },
  {
    id: 'subtype',
    group: 'Basics',
    label: 'Sub-types by constraint',
    blurb:
      'A sub-type is a subset. Naturals are the integers that pass a predicate — this document does not.',
    schema: `@import finitio/data

Integer( i | i >= 0 )
`,
    data: `-16
`,
  },
  {
    id: 'named-constraints',
    group: 'Basics',
    label: 'Naming your constraints',
    blurb:
      'Give each rule a name and the error tells you which one broke, instead of just "invalid".',
    schema: `@import finitio/data

Username = String(
  s | notEmpty: s.length > 0,
      noSpaces: !/\\s/.test(s),
      short:    s.length <= 12
)

Username
`,
    data: `"bernard lambeau"
`,
  },
  {
    id: 'union',
    group: 'Basics',
    label: 'Union types',
    blurb: 'The union of two sets. A value belongs if it belongs to either side.',
    schema: `@import finitio/data

Integer | String
`,
    data: `16
`,
  },

  // ------------------------------------------- Collections & structures
  {
    id: 'seq',
    group: 'Collections & structures',
    label: 'Sequences',
    blurb: 'Square brackets build an ordered sequence of some element type.',
    schema: `@import finitio/data

[ Integer( i | i >= 0 ) ]
`,
    data: `[2015, 16, 12]
`,
  },
  {
    id: 'set',
    group: 'Collections & structures',
    label: 'Sets',
    blurb:
      'Braces build a set: unordered, and duplicates are rejected rather than silently dropped.',
    schema: `@import finitio/data

{ Integer( i | i > 0 ) }
`,
    data: `[2015, 16, 12, 16]
`,
  },
  {
    id: 'struct',
    group: 'Collections & structures',
    label: 'Structs',
    blurb: 'Angle brackets build a fixed-length, positional tuple of types.',
    schema: `@import finitio/data

<String, Integer>
`,
    data: `["Brussels", 2014]
`,
  },
  {
    id: 'tuple',
    group: 'Collections & structures',
    label: 'Tuples',
    blurb: 'Attributes are named and each carries its own type.',
    schema: `@import finitio/data

Password = String( s | s.length >= 8 )

{
  name: String
  password: Password
}
`,
    data: `{
  "name": "Bernard Lambeau",
  "password": "a-very-long-password"
}
`,
  },
  {
    id: 'optional',
    group: 'Collections & structures',
    label: 'Optional attributes',
    blurb: 'Writing :? instead of : makes an attribute optional.',
    schema: `@import finitio/data

{
  name: String
  nickname :? String
}
`,
    data: `{
  "name": "Bernard Lambeau"
}
`,
  },
  {
    id: 'tuple-constraint',
    group: 'Collections & structures',
    label: 'Constraints across attributes',
    blurb:
      'A constraint on the whole tuple can relate its attributes — here the two passwords disagree.',
    schema: `@import finitio/data

Password = String( s | s.length >= 8 )

{
  name: String
  password: Password
  confirm: Password
}( t | samepass: t.password == t.confirm )
`,
    data: `{
  "name": "Bernard Lambeau",
  "password": "finitio123",
  "confirm": "finitio789"
}
`,
  },
  {
    id: 'relation',
    group: 'Collections & structures',
    label: 'Relations',
    blurb: 'A relation is a set of tuples — the relational model, spelled directly.',
    schema: `@import finitio/data

Talk = {
  name: String
  by: String
}

{Talk}
`,
    data: `[
  {
    "name": "Data Deserves a Language Too",
    "by": "Bernard Lambeau"
  },
  {
    "name": "CSV on the Web",
    "by": "Jeni Tennison"
  }
]
`,
  },

  // ------------------------------------------------ Information contracts
  {
    id: 'date',
    group: 'Information contracts',
    label: 'Dates, dressed',
    blurb:
      'JSON has no date type. Dressing turns the string into a real Date; undressing puts it back.',
    schema: `@import finitio/data

Date
`,
    data: `"2015-07-15"
`,
  },
  {
    id: 'adt',
    group: 'Information contracts',
    label: 'Abstract data types',
    blurb:
      'Bind a type to a host class through named contracts. Edit the JavaScript pane to see it drive the result.',
    schema: `@import finitio/data

Color = .Color
  <rgb> [Integer]
  <hex> String

Color
`,
    data: `[12, 13, 14]
`,
    context: COLOR_CONTEXT,
  },
  {
    id: 'undressing',
    group: 'Information contracts',
    label: 'Undressing',
    blurb:
      'Dress through <rgb>, then undress through <hex>: the same information, a different representation.',
    schema: `@import finitio/data

Color = .Color
  <rgb> [Integer]
  <hex> String

Output = [Color/hex]

[Color]
`,
    data: `[
  [ 12, 13, 15 ],
  [ 272, 11, 17 ],
  [ 0, 0, 1 ]
]
`,
    context: COLOR_CONTEXT,
  },

  // ------------------------------------------------------------- Generics
  {
    id: 'generic-types',
    group: 'Generics',
    label: 'Generic types',
    blurb:
      'A type can take type parameters, so one envelope definition serves every payload.',
    schema: `@import finitio/data

Resource<T> = {
  data  : T,
  links : [String]
}

Person = { name: String, age: Integer( i | i >= 0 ) }

Resource<Person>
`,
    data: `{
  "data": {
    "name": "Bernard Lambeau",
    "age": 44
  },
  "links": ["/people/1", "/people"]
}
`,
  },
  {
    id: 'generic-several-params',
    group: 'Generics',
    label: 'Several type parameters',
    blurb:
      'Parameters compose with everything else — here the meta payload dresses a Date.',
    schema: `@import finitio/data

Resource<T,A> = {
  data  : T,
  meta  : A,
  links : [String]
}

Talk  = { title: String, by: String }
Audit = { publishedAt: Date }

Resource<Talk,Audit>
`,
    data: `{
  "data": {
    "title": "Data Deserves a Language Too",
    "by": "Bernard Lambeau"
  },
  "meta": {
    "publishedAt": "2014-07-17"
  },
  "links": ["/talks/1"]
}
`,
  },
  {
    id: 'generic-constrained',
    group: 'Generics',
    label: 'Constraints on a generic',
    blurb:
      'A generic carries its constraints into every instantiation. Here the count disagrees with the items.',
    schema: `@import finitio/data

Page<T> = {
  items : [T],
  total : Integer( i | i >= 0 )
}( p | consistent: p.items.length == p.total )

Person = { name: String }

Page<Person>
`,
    data: `{
  "items": [
    { "name": "Bernard Lambeau" },
    { "name": "Jeni Tennison" }
  ],
  "total": 3
}
`,
  },
]
