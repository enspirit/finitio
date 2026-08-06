import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import finitioGrammar from './shiki/finitio.tmLanguage.json'

// Mirrors `app/utils/site.ts`; that module is auto-imported in the app but not
// available here in the config's own module scope.
// 0.4 split the reference in four pages; earlier versions keep their two.
const REFERENCE_PAGES: Record<string, string[]> = {
  '0.1.x': ['type-system', 'information-contracts'],
  '0.2.x': ['type-system', 'information-contracts'],
  '0.3.x': ['type-system', 'information-contracts'],
  '0.4.x': ['type-system', 'stdlib', 'imports', 'information-contracts'],
}
const CURRENT_VERSION = '0.4.x'

// Older reference versions are only reachable through the sidebar's <select>,
// which the prerender crawler cannot follow, so list them explicitly.
const referenceRoutes = Object.entries(REFERENCE_PAGES).flatMap(
  ([version, pages]) => pages.map((page) => `/reference/${version}/${page}`),
)

// The `finitio` package only exposes `.` in its `exports` map, so the
// browser-ready UMD bundle can't be deep-imported by specifier. Resolve it to
// an absolute path here and alias it. That bundle is the browserify build,
// which stubs `fs` and `path`; the ESM entry imports both at module level and
// so cannot be bundled for a browser as it stands.
const finitioBrowser = fileURLToPath(
  new URL('./node_modules/finitio/dist/finitio.global.js', import.meta.url),
)

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  modules: ['@nuxt/content'],

  css: ['~/assets/css/main.css'],

  // Fully static: every route is crawled and written out as HTML.
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/try',
        '/download',
        '/use-cases',
        '/reference',
        '/404.html',
        ...referenceRoutes,
        ...REFERENCE_PAGES[CURRENT_VERSION]!.map(
          (page) => `/reference/latest/${page}`,
        ),
      ],
    },
  },

  // Keep the old site's shorthand URLs working. Under the static preset these
  // are emitted as small HTML files that redirect, so they survive on any
  // plain file host.
  routeRules: {
    '/reference': { redirect: { to: `/reference/${CURRENT_VERSION}/type-system`, statusCode: 301 } },
    '/reference/latest/**': { redirect: { to: `/reference/${CURRENT_VERSION}/**`, statusCode: 301 } },
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        'finitio/browser': finitioBrowser,
      },
    },
    optimizeDeps: {
      // The UMD bundle needs esbuild's CJS->ESM interop, so it must be
      // pre-bundled rather than served raw.
      include: ['finitio/browser'],
    },
  },

  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: {
          theme: { default: 'github-light', dark: 'github-dark' },
          // Shiki has no Finitio grammar, and the old site worked around that
          // by handing GitHub's renderer `ruby`. We ship a real TextMate
          // grammar instead so the 70-odd schema blocks highlight correctly.
          langs: [
            'json',
            'ruby',
            'javascript',
            'bash',
            'yaml',
            'csv',
            finitioGrammar as never,
          ],
        },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      script: [
        {
          // Set the theme class before first paint. Pages are prerendered as
          // static HTML, so without this the light theme would flash for
          // dark-mode readers on every navigation.
          innerHTML: `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
        },
      ],
    },
  },
})
