# Finitio 0.4 — what both implementations actually support

Groundwork for writing `content/reference/0.4.x/`. Every line below was
established by running the same schema and document through both
implementations, not by reading grammars.

Tested against:

| | version | notes |
|---|---|---|
| finitio.js | 2.0.0-dev (`pre-2.0.0`) | includes the extra-attribute and generics fixes |
| finitio-rb | 0.12.0 | current `master` |

Harness: `cases.json` + `run.cjs` / `run2.rb`, 45 cases.

## Supported by both — safe to document as the language

Types
: the Any type `.`, host-class references `.String`, aliases `Age = Integer`,
  union `Integer|String`

Standard library
: `@import finitio/data`, then `String`, `Integer`, `Real`, `Numeric`,
  `Boolean`, `True`, `False`, `Nil`, `Date`, `Time`

Sub-types
: `Integer( i | i >= 0 )`, named constraints
  `Integer( i | positive: i >= 0 )`, several named constraints at once

Collections
: sequences `[Integer]`, sets `{Integer}`, structs `<String, Integer>`,
  tuples `{ name: String }`, optional attributes `nick :? String`,
  extra attributes `...` and `...: Integer`, relations `{{ name: String }}`

Generics
: `Page<T> = { items: [T] }`, several parameters `Pair<A,B>`, and the same
  generic instantiated more than once in one schema

Contracts
: abstract data types with named contracts,
  `Color = .Color <rgb> [Integer] <hex> String`

Syntax
: `#` line comments, `/- ... -/` block comments, metadata
  `/- label: "An age" -/`, dotted names `People.Type`, newline-separated
  tuple attributes

**Generics are supported by both.** That was the open question, and the answer
is yes — including the two-parameter and repeated-instantiation forms.

## Divergences — must not be documented as plain language features

### Constraint expressions are host-language code

This is the deep one, and it affects every constrained schema.

| expression | finitio.js | finitio-rb |
|---|---|---|
| `s.length > 0` | works | works |
| `s.size > 0` | fails | works |
| `t.a < t.b` (tuple attribute) | works | fails — tuples are Symbol-keyed Hashes |
| `t[:a] < t[:b]` | fails to parse | works |

A tuple is represented as a JS object in one and a Ruby Hash in the other, so
any constraint reaching into a tuple is inherently non-portable. `s.length`
happens to work in both and is the portable spelling for strings.

### `::` constraint shortcuts — finitio.js only

`String :: /^[a-z]+$/`, `Integer :: 1..10`, `String :: { "a" "b" }` parse in
finitio.js and are a parse error in finitio-rb. The long form
`String( s | /^[a-z]+$/.test(s) )` is the portable equivalent, subject to the
host-expression caveat above.

Note there is no `:: "Constant"` form: a bare string literal after `::` is a
parse error in **both**. The set shortcut `:: { "a" "b" }` is the nearest
thing, and it is finitio.js-only.

### Contract selection `Type/contract` — finitio.js only

`Output = [Color/hex]`, used to pick which contract undressing targets, is a
parse error in finitio-rb. Undressing to a chosen representation is therefore
a finitio.js capability today, not a language feature.

### Imports

| form | finitio.js | finitio-rb |
|---|---|---|
| `@import finitio/data` | works | works |
| `@import ./utils` (relative, no extension) | works | works |
| `@import ./utils.fio` (relative, with extension) | works | **fails** — appends `.fio` again, looking for `utils.fio.fio` |
| `@import finitio/data as d`, then `d.String` | works | **parse error** |

Relative imports need a path context in both: a schema parsed from a bare
string has nothing to resolve against. Load the schema from a file
(`Finitio.system(Pathname.new(path))` in Ruby, a world carrying `sourceUrl`
in JavaScript).

Note finitio-rb's README documents `@import ./child.fio`, which does not
work in 0.12.0. The extensionless form is the portable one.

### Whitespace inside collection brackets — finitio.js only

| | finitio.js | finitio-rb |
|---|---|---|
| `[Integer]` | works | works |
| `[ Integer ]` | works | **parse error** |
| `{Integer}` | works | works |
| `{ Integer }` | works | **parse error** |

finitio-rb's grammar does not allow spacing directly after `[` or `{` for
sequences and sets. Tuples are unaffected — `{ name: String }` is fine in
both. Examples in the reference should use the tight form so they run
everywhere.

## Supported by neither — do not document

- Nested instantiation, `Box<Page<Person>>`: parse error in both.
- Spaced struct, `< String, Integer >`: parse error in both. Use
  `<String, Integer>`.
- `:: "Constant"`.

## Consequences for the 0.4.x reference

1. The **Type System** and **Information Contracts** pages can be written
   against the "both" list above without qualification.
2. Two pages are missing from the 0.3.x reference and are needed for 0.4:
   **Imports** and the **Standard library** — `String` and friends stopped
   being builtin, which is the single biggest change for a reader coming
   from 0.3.
3. Constraint expressions need their own section saying plainly that the
   body is host-language code, with the portability table above. This is
   currently undocumented and is the most likely thing to bite someone.
4. Everything in "Divergences" should be marked per-implementation rather
   than presented as language.
