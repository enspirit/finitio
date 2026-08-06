<script setup lang="ts">
const { ready, version, conformance, loadError, run } = useFinitio()

const first = EXAMPLES[0]!
const selectedId = ref(first.id)
const schema = ref(first.schema)
const data = ref(first.data)
const context = ref(first.context ?? '')
const outcome = ref<Outcome | null>(null)
const running = ref(false)

const current = computed(
  () => EXAMPLES.find((e) => e.id === selectedId.value) ?? first,
)

/** Examples grouped for the <optgroup> list, in curriculum order. */
const grouped = computed(() =>
  EXAMPLE_GROUPS.map((group) => ({
    group,
    items: EXAMPLES.filter((e) => e.group === group),
  })),
)

const loadExample = (id: string) => {
  const example = EXAMPLES.find((e) => e.id === id)
  if (!example) return
  selectedId.value = id
  schema.value = example.schema
  data.value = example.data
  context.value = example.context ?? ''
}

// Re-run shortly after typing stops, so every keystroke isn't a parse.
let timer: ReturnType<typeof setTimeout> | undefined
const schedule = () => {
  clearTimeout(timer)
  timer = setTimeout(execute, 350)
}

const execute = async () => {
  if (!ready.value) return
  running.value = true
  try {
    outcome.value = await run(schema.value, data.value, context.value)
  } finally {
    running.value = false
  }
}

watch([schema, data, context], schedule)
watch(ready, (isReady) => isReady && execute(), { immediate: true })
onBeforeUnmount(() => clearTimeout(timer))

const setupErrorTitle = computed(() => {
  const kind = outcome.value?.setupError?.kind
  if (!kind) return ''
  return {
    schema: 'The schema could not be compiled',
    json: 'The document is not well-formed JSON',
    context: 'The JavaScript context could not be evaluated',
  }[kind]
})

const hasContext = computed(() => Boolean(current.value.context))
</script>

<template>
  <div class="space-y-3">
    <!-- Toolbar -->
    <div
      class="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900/50"
    >
      <label for="example" class="text-sm font-medium text-slate-700 dark:text-slate-300">
        Example
      </label>
      <select
        id="example"
        class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        :value="selectedId"
        @change="loadExample(($event.target as HTMLSelectElement).value)"
      >
        <optgroup v-for="section in grouped" :key="section.group" :label="section.group">
          <option v-for="example in section.items" :key="example.id" :value="example.id">
            {{ example.label }}
          </option>
        </optgroup>
      </select>

      <p class="min-w-0 flex-1 text-sm text-slate-600 dark:text-slate-400">
        {{ current.blurb }}
      </p>

      <span
        v-if="ready"
        class="hidden font-mono text-xs whitespace-nowrap text-slate-400 xl:block dark:text-slate-600"
      >
        finitio.js {{ version }} &middot; Finitio {{ conformance }}
      </span>
    </div>

    <div
      v-if="loadError"
      class="border-invalid/30 bg-invalid/5 text-invalid rounded-xl border px-4 py-3 text-sm"
    >
      Could not load finitio.js: {{ loadError }}
    </div>

    <!-- Editors. Heights track the viewport so the whole playground —
         editors and all three outcomes — fits without scrolling. The floor
         must clear the longest example's schema, main type included: a
         truncated last line hides the very thing being demonstrated. -->
    <div
      class="grid gap-4 [&>*]:h-[clamp(21rem,38vh,26rem)]"
      :class="hasContext ? 'lg:grid-cols-3' : 'lg:grid-cols-2'"
    >
      <PlaygroundEditor v-model="schema" title="schema.fio" lang="Finitio" label="Finitio schema" />
      <PlaygroundEditor v-model="data" title="data.json" lang="JSON" label="JSON document" language="json" />
      <PlaygroundEditor
        v-if="hasContext"
        v-model="context"
        title="context.js"
        lang="JavaScript"
        label="JavaScript context"
      />
    </div>

    <!-- Results -->
    <div v-if="!ready" class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500 dark:border-slate-800">
      Loading finitio.js…
    </div>

    <div
      v-else-if="outcome?.setupError"
      class="border-invalid/40 overflow-hidden rounded-xl border"
      aria-live="polite"
    >
      <header class="border-invalid/40 bg-invalid/5 text-invalid border-b px-4 py-2.5 text-sm font-semibold">
        {{ setupErrorTitle }}
      </header>
      <pre class="max-h-[22vh] overflow-auto p-4 font-mono text-xs whitespace-pre-wrap">{{ outcome.setupError.message }}</pre>
    </div>

    <div
      v-else-if="outcome"
      class="grid gap-4 lg:grid-cols-3 [&>*]:h-[clamp(9rem,19vh,14rem)]"
      aria-live="polite"
    >
      <ResultPane
        title="Validating"
        hint="Does the value already belong to the type?"
        :step="outcome.validation"
        failure-tone="note"
      />
      <ResultPane
        title="Dressing"
        hint="Coerced into host-language values."
        :step="outcome.dressing"
      />
      <ResultPane
        title="Undressing"
        hint="Put back into exchange form, through Output."
        :step="outcome.undressing"
        skipped="This schema defines no Output type, so there is nothing to undress to. See the Undressing example."
      />
    </div>
  </div>
</template>
