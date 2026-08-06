/** Reference versions, newest last. */
export const REFERENCE_VERSIONS = ['0.1.x', '0.2.x', '0.3.x', '0.4.x'] as const

export type ReferenceVersion = (typeof REFERENCE_VERSIONS)[number]

/** The version `/reference` and `/reference/latest/*` resolve to. */
export const CURRENT_VERSION: ReferenceVersion =
  REFERENCE_VERSIONS[REFERENCE_VERSIONS.length - 1]!

export interface ReferencePage {
  slug: string
  label: string
}

/**
 * 0.4 split the reference in four: the standard library and imports became
 * their own pages, since builtin types moved out of the language and into
 * `finitio/data`. Earlier versions keep the two pages they shipped with.
 */
const PAGES_0_4: ReferencePage[] = [
  { slug: 'type-system', label: 'Type System' },
  { slug: 'stdlib', label: 'Standard Library' },
  { slug: 'imports', label: 'Imports' },
  { slug: 'information-contracts', label: 'Information Contracts' },
]

const PAGES_LEGACY: ReferencePage[] = [
  { slug: 'type-system', label: 'Type System' },
  { slug: 'information-contracts', label: 'Information Contracts' },
]

/** Pages of a reference version, in sidebar order. */
export const referencePages = (version: string): ReferencePage[] =>
  version === '0.4.x' ? PAGES_0_4 : PAGES_LEGACY

export const NAV_LINKS = [
  { to: '/try', label: 'Try it' },
  { to: `/reference/${CURRENT_VERSION}/type-system`, label: 'Reference', match: '/reference' },
  { to: '/use-cases', label: 'Use cases' },
  { to: '/download', label: 'Download' },
  { to: '/blog/data-deserves-a-language-too', label: 'Blog', match: '/blog' },
] as const

export const GITHUB_URL = 'https://github.com/enspirit/finitio.js'
export const FINITIO_RB_URL = 'https://github.com/enspirit/finitio-rb'
