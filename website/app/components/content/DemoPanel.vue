<script setup lang="ts">
/** A single full-width panel, for outputs that have no counterpart. */
withDefaults(
  defineProps<{
    title?: string
    badge?: string
    tone?: 'neutral' | 'valid' | 'invalid'
  }>(),
  { title: 'output', badge: undefined, tone: 'neutral' },
)
</script>

<template>
  <div class="not-prose my-8">
    <CodeCard :title="title" :badge="badge" :tone="tone">
      <slot />
    </CodeCard>
  </div>
</template>
