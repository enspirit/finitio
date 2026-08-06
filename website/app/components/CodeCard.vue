<script setup lang="ts">
defineProps<{
  title: string
  /** Optional status chip, e.g. "valid" / "rejected". */
  tone?: 'neutral' | 'valid' | 'invalid'
  badge?: string
}>()
</script>

<template>
  <div
    class="flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60"
  >
    <div
      class="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-2.5 dark:border-slate-800"
    >
      <span class="font-mono text-xs text-slate-500 dark:text-slate-500">{{ title }}</span>
      <span
        v-if="badge"
        class="rounded-full px-2 py-0.5 text-xs font-medium"
        :class="{
          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400': !tone || tone === 'neutral',
          'bg-valid/10 text-valid': tone === 'valid',
          'bg-invalid/10 text-invalid': tone === 'invalid',
        }"
      >
        {{ badge }}
      </span>
    </div>
    <div
      class="min-w-0 flex-1 overflow-x-auto text-sm [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!bg-transparent [&_pre]:p-4"
    >
      <slot />
    </div>
  </div>
</template>
