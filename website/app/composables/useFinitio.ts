/**
 * Lazily loads finitio.js in the browser and runs a schema against a document.
 *
 * We load `finitio/browser` (aliased in `nuxt.config.ts` to the package's
 * browserify UMD bundle) rather than the ESM entry, which imports `fs` and
 * `path` at module level and so cannot be bundled for a browser. The UMD
 * bundle stubs both.
 */

/** One of the three things Finitio does, or the failure that stopped it. */
export interface Step {
  ok: boolean
  text: string
}

export interface Outcome {
  /** Set when the schema, JSON or JavaScript context could not be read. */
  setupError?: { kind: 'schema' | 'json' | 'context'; message: string }
  /** The main type, as Finitio prints it. */
  typeLabel?: string
  /** Does the raw value belong to the type? Pure set membership, no coercion. */
  validation?: Step
  /** The value dressed into host-language types. */
  dressing?: Step
  /** The dressed value undressed through `Output`, when the schema defines one. */
  undressing?: Step
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

let loader: Promise<Any> | null = null

const loadFinitio = (): Promise<Any> => {
  loader ??= import('finitio/browser').then((m) => m.default ?? m)
  return loader
}

export const useFinitio = () => {
  const ready = ref(false)
  const version = ref('')
  const conformance = ref('')
  const loadError = ref('')

  onMounted(async () => {
    try {
      const Finitio = await loadFinitio()
      version.value = Finitio.VERSION
      conformance.value = Finitio.CONFORMANCE
      ready.value = true
    } catch (error) {
      loadError.value = message(error)
    }
  })

  const run = async (
    schemaSource: string,
    dataSource: string,
    contextSource?: string,
  ): Promise<Outcome> => {
    const Finitio = await loadFinitio()

    // 1. The JavaScript context, evaluated as a CommonJS module. Its exports
    //    become the host classes that abstract data types bind to.
    let context: Record<string, unknown> = {}
    if (contextSource?.trim()) {
      try {
        const module = { exports: {} as Record<string, unknown> }
        new Function('module', contextSource)(module)
        context = module.exports
      } catch (error) {
        return { setupError: { kind: 'context', message: message(error) } }
      }
    }

    // 2. The schema must parse and compile to a system.
    let system: Any
    let main: Any
    try {
      system = Finitio.system(schemaSource, { JsTypes: context })
      main = system.resolve('Main')
    } catch (error) {
      return { setupError: { kind: 'schema', message: explain(error) } }
    }

    // 3. The document must be well-formed JSON.
    let data: unknown
    try {
      data = JSON.parse(dataSource)
    } catch (error) {
      return { setupError: { kind: 'json', message: message(error) } }
    }

    const outcome: Outcome = { typeLabel: safeToString(main) }

    // 4. Validation: does the raw value already belong to the type?
    try {
      const belongs = main.include(data)
      outcome.validation = {
        ok: belongs,
        text: belongs
          ? `Yes — the value belongs to the type\n\n  ${outcome.typeLabel}`
          : `No — the value does not belong, as it stands, to the type\n\n  ${outcome.typeLabel}\n\nDressing may still be able to coerce it.`,
      }
    } catch (error) {
      outcome.validation = { ok: false, text: explain(error) }
    }

    // 5. Dressing: coerce the exchange value into host-language values.
    let dressed: unknown
    let dressedOk = false
    try {
      dressed = system.dress(data)
      dressedOk = true
      outcome.dressing = { ok: true, text: inspect(dressed) }
    } catch (error) {
      outcome.dressing = { ok: false, text: explain(error) }
    }

    // 6. Undressing, only when the schema names an `Output` type to target.
    let output: Any = null
    try {
      output = system.resolve('Output')
    } catch {
      // No Output type: undressing is not part of this example.
    }

    if (output && dressedOk) {
      try {
        outcome.undressing = {
          ok: true,
          text: inspect(main.undress(dressed, output.trueOne())),
        }
      } catch (error) {
        outcome.undressing = { ok: false, text: explain(error) }
      }
    }

    return outcome
  }

  return { ready, version, conformance, loadError, run }
}

const message = (error: unknown): string =>
  error instanceof Error ? error.message : String(error)

/** Finitio errors carry a structured explanation; anything else is a plain error. */
const explain = (error: unknown): string => {
  const candidate = error as {
    explain?: () => string
    rootCause?: { message?: string }
    message?: string
  }
  if (typeof candidate?.explain === 'function') {
    try {
      const text = candidate.explain()
      if (text?.trim()) return text.trimEnd()
    } catch {
      // Fall through.
    }
  }
  return candidate?.rootCause?.message ?? candidate?.message ?? String(error)
}

const safeToString = (value: Any): string => {
  try {
    return value.trueOne().toString()
  } catch {
    return 'the main type'
  }
}

/**
 * Renders dressed values the way the original demo did: host objects that
 * define their own `toString` show it, so a Color prints as `Color(12,13,14)`
 * rather than as its innards.
 */
const inspect = (value: unknown, depth = 0): string => {
  const pad = (n: number) => '  '.repeat(n)

  if (value === undefined) return 'undefined'
  if (value === null) return 'null'
  if (typeof value === 'boolean' || typeof value === 'number') return String(value)
  if (typeof value === 'string') return JSON.stringify(value)
  if (value instanceof Date) return `${value.toISOString()} (Date)`

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    const items = value.map((item) => inspect(item, depth + 1))
    const oneLine = `[ ${items.join(', ')} ]`
    if (oneLine.length <= 72 && !oneLine.includes('\n')) return oneLine
    return `[\n${items.map((i) => pad(depth + 1) + i).join(',\n')}\n${pad(depth)}]`
  }

  if (value instanceof Set) return inspect([...value], depth)

  if (typeof value === 'object') {
    // A host class with a meaningful toString speaks for itself.
    const asString = Object.prototype.toString.call(value)
    const own = String(value)
    if (asString === '[object Object]' && own !== '[object Object]') return own
    if (asString !== '[object Object]') return own

    const entries = Object.entries(value as Record<string, unknown>)
    if (entries.length === 0) return '{}'
    const body = entries
      .map(([k, v]) => `${pad(depth + 1)}${k}: ${inspect(v, depth + 1)}`)
      .join(',\n')
    return `{\n${body}\n${pad(depth)}}`
  }

  return String(value)
}
