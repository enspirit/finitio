---
title: "Download"
description: "Finitio implementations for Ruby and JavaScript."
---

The projects below provide *Finitio* implementations in various host
languages. [Contact us](mailto:info@enspirit.be) or fork this page on github
to add your own binding to this list!

Both implementations cover the Finitio 0.4 language: the
[type system](/reference/0.4.x/type-system), [imports](/reference/0.4.x/imports)
and the [standard library](/reference/0.4.x/stdlib). They differ on a handful
of points, each flagged in the reference where it applies.

## Ruby

The [finitio](https://rubygems.org/gems/finitio) ruby gem provides a mature
implementation in Ruby. You'll also find the source code on github:

* [enspirit/finitio-rb](https://github.com/enspirit/finitio-rb)

```bash
gem install finitio
```

```ruby
require 'finitio'
require 'json'

system = Finitio.system <<~FIO
  @import finitio/data

  { name: String( s | s.length > 0 ), at: Date }
FIO

system.dress(JSON.parse('{ "name": "Finitio", "at": "2014-03-01" }'))
# => {name: "Finitio", at: #<Date: 2014-03-01 ...>}
```

Tuples are represented as Ruby hashes with symbol keys, and constraint
expressions are Ruby code — see
[constraint expressions](/reference/0.4.x/type-system#constraint-expressions-are-host-language-code).

## JavaScript

The [finitio](https://www.npmjs.com/package/finitio) package brings Finitio to
Node and to the browser. The source code is available on github:

* [enspirit/finitio.js](https://github.com/enspirit/finitio.js)

```bash
npm install finitio
```

::callout
The `latest` tag on npm currently points at a **2.0.1 release candidate**, so
that is what the command above installs. It is the line to be on: 2.0 brought
generic types, TypeScript definitions and a dual CommonJS/ESM build. Pin an
exact version if you need reproducible installs.
::

```javascript
import Finitio from 'finitio'

const system = Finitio.system(`
  @import finitio/data

  { name: String( s | s.length > 0 ), at: Date }
`)

system.dress({ name: 'Finitio', at: '2014-03-01' })
// => { name: 'Finitio', at: 2014-03-01T00:00:00.000Z }
```

It ships TypeScript definitions, a `finitio` command line for validating
documents and bundling schemas, and — as the [playground](/try) on this site
demonstrates — runs entirely in the browser.
