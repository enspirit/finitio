# finitio.io — web site

The source of [www.finitio.io](http://www.finitio.io): a statically generated
site, prerendered to plain HTML and served by nginx. It replaced a Sinatra +
wlang + Bootstrap 3 application, whose markdown it carries forward.

| | |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) (Vue 3), fully prerendered |
| Content | [@nuxt/content 3](https://content.nuxt.com) over the markdown in `content/` |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Playground | [`finitio`](https://www.npmjs.com/package/finitio) 2.1.0, from npm |

## Getting started

Requires Node >= 22.12.

```
npm install
npm run dev        # http://localhost:3000
npm run generate   # static site into .output/public
```

`.output/public` is plain HTML/CSS/JS and can be dropped on any file host.
There is no server component.

## Layout

```
content/           markdown, ported from ../website/pages
  index.md         the landing page's worked examples
  download.md
  use-cases/
  blog/
  reference/{0.1.x,0.2.x,0.3.x}/
app/
  pages/           index.vue (landing), try.vue (playground), [...slug].vue (content)
  components/      site chrome, docs sidebar, playground
  composables/     useFinitio — loads finitio.js and runs schemas
  utils/           site.ts (nav/versions), examples.ts (playground curriculum)
shiki/             a TextMate grammar for Finitio, used to highlight code blocks
public/            images carried over from the old site
```

## Notes for maintainers

**The playground loads `finitio/dist/finitio.global.js`, not the ESM entry.**
The package's `exports` map only exposes `.`, so `nuxt.config.ts` resolves the
browser bundle by path and aliases it to `finitio/browser`. The reason is that
the ESM entry imports `fs` and `path` at module level, which no browser bundle
can satisfy; the browserify build stubs both. If a future release drops those
imports, the alias and the indirection in `app/composables/useFinitio.ts` can
go away.

**The reference is versioned, and 0.4 has more pages than its predecessors.**
`app/utils/site.ts` maps each version to its page list — 0.1.x through 0.3.x
carry the two pages the old site shipped, 0.4.x adds the standard library and
imports, which is where `String` and friends went when they stopped being
builtin. `nuxt.config.ts` repeats that map for prerendering. The version
switcher falls back to the entry page when the current page does not exist in
the version being switched to.

**Where the two implementations disagree is documented, not guessed.**
`COMPATIBILITY.md` records what finitio.js and finitio-rb each support,
established by running the same cases through both. The reference marks those
points inline with the `ImplNote` component rather than presenting them as
language.

**Older reference versions must be listed explicitly for prerendering.** The
version switcher is a `<select>`, which the crawler cannot follow, so
`nuxt.config.ts` enumerates every `/reference/<version>/<page>` route.
