<script setup lang="ts">
/**
 * `note` is for a negative answer that is informative rather than wrong —
 * a value legitimately not belonging to a type before it is dressed.
 */
type Tone = 'ok' | 'note' | 'error' | 'idle'

const props = defineProps<{
  title: string
  /** What this step means, shown beside the title. */
  hint: string
  step?: Step
  /** Tone to use when the step did not succeed. Defaults to `error`. */
  failureTone?: Extract<Tone, 'note' | 'error'>
  /** Rendered instead of the body when the step never ran. */
  skipped?: string
}>()

const tone = computed<Tone>(() => {
  if (!props.step) return 'idle'
  if (props.step.ok) return 'ok'
  return props.failureTone ?? 'error'
})

const borderClass = {
  idle: 'border-slate-200 dark:border-slate-800',
  ok: 'border-valid/40',
  note: 'border-note/40',
  error: 'border-invalid/40',
}

const headerClass = {
  idle: 'border-slate-200 dark:border-slate-800',
  ok: 'border-valid/40 bg-valid/5',
  note: 'border-note/40 bg-note/5',
  error: 'border-invalid/40 bg-invalid/5',
}

const titleClass = {
  idle: 'text-slate-500',
  ok: 'text-valid',
  note: 'text-note',
  error: 'text-invalid',
}
</script>

<template>
  <section
    class="flex min-h-0 flex-col overflow-hidden rounded-xl border"
    :class="borderClass[tone]"
  >
    <header class="border-b px-4 py-2" :class="headerClass[tone]">
      <h3 class="text-sm font-semibold" :class="titleClass[tone]">{{ title }}</h3>
      <p class="mt-0.5 text-xs leading-snug text-slate-500 dark:text-slate-500">
        {{ hint }}
      </p>
    </header>

    <pre
      v-if="step"
      class="min-h-0 flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap"
      >{{ step.text }}</pre
    >
    <p
      v-else
      class="min-h-0 flex-1 overflow-auto px-4 py-3 text-xs text-slate-400 dark:text-slate-600"
    >
      {{ skipped }}
    </p>
  </section>
</template>
