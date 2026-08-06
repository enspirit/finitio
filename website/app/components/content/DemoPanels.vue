<script setup lang="ts">
/**
 * Side-by-side panels used on the landing page to put a document next to the
 * schema (or the errors) that describes it. Content comes from MDC named
 * slots so the code blocks go through the normal highlighting pipeline.
 */
withDefaults(
  defineProps<{
    leftTitle?: string
    rightTitle?: string
    leftBadge?: string
    rightBadge?: string
    leftTone?: 'neutral' | 'valid' | 'invalid'
    rightTone?: 'neutral' | 'valid' | 'invalid'
  }>(),
  {
    leftTitle: 'document',
    rightTitle: 'schema',
    leftBadge: undefined,
    rightBadge: undefined,
    leftTone: 'neutral',
    rightTone: 'neutral',
  },
)
</script>

<template>
  <div class="not-prose my-8 grid gap-4 md:grid-cols-2">
    <CodeCard :title="leftTitle" :badge="leftBadge" :tone="leftTone">
      <slot name="left" />
    </CodeCard>
    <CodeCard :title="rightTitle" :badge="rightBadge" :tone="rightTone">
      <slot name="right" />
    </CodeCard>
  </div>
</template>
