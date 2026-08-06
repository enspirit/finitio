---
title: "Imports"
description: "Finitio 0.4 imports: splitting a schema across files and reusing definitions."
version: "0.4.x"
order: 3
---

Since 0.4 a schema can be split across several files and pull definitions from
elsewhere. An import is a line starting with `@import`, and imports come
first, before any type definition:

```finitio
@import finitio/data
@import ./measures

{ taken: Date, values: [Measure] }
```

## The standard library

The most common import by far, and the one nearly every 0.4 schema starts
with:

```finitio
@import finitio/data
```

It brings `String`, `Integer`, `Date` and the rest into scope. See the
[standard library](/reference/0.4.x/stdlib) for what it contains and where the
two implementations differ.

## Relative imports

A path starting with `./` or `../` is resolved relative to the file the schema
was loaded from:

```finitio
@import ./measures
@import ../shared/units
```

Write the path **without** the `.fio` extension. The extension is added by the
resolver, so `@import ./measures.fio` looks for `measures.fio.fio` and fails.

::impl-note{impl="finitio.js"}
finitio.js tolerates the `.fio` extension; finitio-rb does not. Leave it off
and the import works in both. Note that finitio-rb's README currently shows
the extension form — it does not work in 0.12.0.
::

### Relative to what?

A relative import needs to know where the schema came from, and a schema
parsed from a bare string does not. Load it from a file instead:

```ruby
# Ruby
require 'pathname'
system = Finitio.system(Pathname.new('schemas/parent.fio'))
```

```javascript
// JavaScript
const world = Finitio.world({ sourceUrl: `file://${path}` })
const system = Finitio.system(fs.readFileSync(path, 'utf8'), world)
```

Passing the source as a plain string with no context raises an error such as
`Unable to resolve './measures'`.

## Imports are not re-exported

An imported type is usable inside the importing schema, but is **not** passed
on to schemas that in turn import it. Given:

```finitio
# child.fio
@import finitio/data
Posint = Integer( i | i >= 0 )
```

```finitio
# parent.fio
@import ./child
Byte = Posint( i | i <= 255 )     # fine: Posint is in scope here
```

then a third schema importing `parent` sees `Byte` but not `Posint`:

```finitio
@import ./parent
Byte      # fine
Posint    # error: No such type `Posint`
```

This keeps a schema's surface deliberate: what a file exports is what it
defines, not everything it happens to depend on. If `Posint` should be part of
the public surface of `parent.fio`, define an alias for it there.

## Qualified imports

An import can be given a qualifier, so its definitions are reached through a
prefix rather than merged into the current scope:

```finitio
@import finitio/data as d

{ name: d.String }
```

::impl-note{impl="finitio.js"}
finitio-rb does not parse the `as` form. Use a plain import and rely on the
[dotted naming convention](/reference/0.4.x/type-system) — `People.Type`,
`People.Attrs` — when you need to group related definitions portably.
::

## Bundling

Imports are resolved when the schema is loaded, which means the files must be
reachable at that moment. That is fine on a server and awkward in a browser,
where there is no filesystem.

::impl-note{impl="finitio.js"}
finitio.js can flatten a schema and everything it imports into a single
artefact ahead of time:

```
finitio bundle schema.fio -t javascript > schema.js
```

The result carries no imports and needs no resolver at runtime. A TypeScript
target is available too, which additionally emits type declarations matching
the schema.
::
