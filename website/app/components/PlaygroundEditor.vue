<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    lang: string
    label: string
    language?: 'json' | 'javascript' | 'plain'
  }>(),
  { language: 'plain' },
)

const model = defineModel<string>({ required: true })
</script>

<template>
  <div
    class="flex h-80 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60"
  >
    <div
      class="flex items-center justify-between border-b border-slate-200 px-4 py-2.5 dark:border-slate-800"
    >
      <span class="font-mono text-xs text-slate-500 dark:text-slate-500">{{ title }}</span>
      <span class="text-xs text-slate-400 dark:text-slate-600">{{ lang }}</span>
    </div>
    <ClientOnly>
      <CodeEditor v-model="model" :language="language" :aria-label="label" />
      <template #fallback>
        <pre class="overflow-auto p-4 font-mono text-xs">{{ model }}</pre>
      </template>
    </ClientOnly>
  </div>
</template>
