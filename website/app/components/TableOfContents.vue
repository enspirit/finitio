<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{ links: TocLink[] }>()

const activeId = ref<string>('')
let observer: IntersectionObserver | null = null

// Flatten so a single observer covers nested headings too.
const flat = computed(() => {
  const out: TocLink[] = []
  const walk = (links: TocLink[]) => {
    for (const l of links) {
      out.push(l)
      if (l.children?.length) walk(l.children)
    }
  }
  walk(props.links)
  return out
})

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      // Prefer the topmost heading currently intersecting the viewport band.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length && visible[0]) activeId.value = visible[0].target.id
    },
    // Band just below the sticky header, so the highlight tracks reading position.
    { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
  )

  for (const link of flat.value) {
    const el = document.getElementById(link.id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <nav v-if="links.length" aria-label="On this page">
    <p
      class="mb-3 text-xs font-semibold tracking-wide text-slate-900 uppercase dark:text-white"
    >
      On this page
    </p>
    <ul class="space-y-1 border-l border-slate-200 text-sm dark:border-slate-800">
      <li v-for="link in flat" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="-ml-px block border-l py-1 transition-colors"
          :class="[
            link.depth >= 3 ? 'pl-6' : 'pl-4',
            activeId === link.id
              ? 'border-brand-500 text-brand-600 font-medium dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:text-slate-500 dark:hover:border-slate-700 dark:hover:text-white',
          ]"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
