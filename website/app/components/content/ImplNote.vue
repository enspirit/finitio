<script setup lang="ts">
/**
 * Flags a feature the two implementations do not agree on. Used in the
 * reference so the page can document the language while still saying plainly
 * what is portable.
 */
withDefaults(
  defineProps<{
    /** Implementation that has it, e.g. "finitio.js". Omit for "neither". */
    impl?: string
    /** Set when no implementation supports it yet. */
    unsupported?: boolean
  }>(),
  { impl: undefined, unsupported: false },
)
</script>

<template>
  <aside
    class="not-prose my-6 rounded-xl border px-4 py-3 text-sm"
    :class="
      unsupported
        ? 'border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60'
        : 'border-note/40 bg-note/5'
    "
  >
    <p
      class="mb-1 text-xs font-semibold tracking-wide uppercase"
      :class="unsupported ? 'text-slate-500' : 'text-note'"
    >
      <template v-if="unsupported">Not implemented yet</template>
      <template v-else>{{ impl }} only</template>
    </p>
    <div class="text-slate-700 dark:text-slate-300 [&>p]:m-0 [&>p+p]:mt-2">
      <slot />
    </div>
  </aside>
</template>
