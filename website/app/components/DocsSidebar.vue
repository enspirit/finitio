<script setup lang="ts">
const route = useRoute()

/** Which section of the docs we're in, if any. */
const section = computed(() => {
  if (route.path.startsWith('/reference')) return 'reference'
  if (route.path.startsWith('/use-cases')) return 'use-cases'
  return null
})

/** The reference version being read, from the URL. */
const version = computed(() => {
  const match = route.path.match(/^\/reference\/([^/]+)/)
  const found = REFERENCE_VERSIONS.find((v) => v === match?.[1])
  return found ?? CURRENT_VERSION
})

const pages = computed(() => referencePages(version.value))

/**
 * Switching version keeps you on the same page when it exists there, and
 * falls back to the entry page when it does not — 0.4 has pages the older
 * versions never had.
 */
const switchVersion = (target: string) => {
  const slug = route.path.match(/^\/reference\/[^/]+\/(.+)$/)?.[1]
  const available = referencePages(target)
  const kept = available.find((p) => p.slug === slug)
  return navigateTo(`/reference/${target}/${(kept ?? available[0]!).slug}`)
}

const { data: useCases } = await useAsyncData('use-cases-nav', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/use-cases%')
    .order('order', 'ASC')
    .select('path', 'title')
    .all(),
)

const isCurrent = (path: string) => route.path === path
</script>

<template>
  <nav v-if="section" class="space-y-6 text-sm">
    <template v-if="section === 'reference'">
      <div>
        <label
          for="version-select"
          class="mb-2 block text-xs font-semibold tracking-wide text-slate-900 uppercase dark:text-white"
        >
          Version
        </label>
        <select
          id="version-select"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          :value="version"
          @change="switchVersion(($event.target as HTMLSelectElement).value)"
        >
          <option v-for="v in [...REFERENCE_VERSIONS].reverse()" :key="v" :value="v">
            {{ v }}{{ v === CURRENT_VERSION ? ' (latest)' : '' }}
          </option>
        </select>
      </div>

      <div>
        <p
          class="mb-3 text-xs font-semibold tracking-wide text-slate-900 uppercase dark:text-white"
        >
          Reference
        </p>
        <ul class="space-y-1">
          <li v-for="page in pages" :key="page.slug">
            <NuxtLink
              :to="`/reference/${version}/${page.slug}`"
              class="block rounded-lg px-3 py-1.5 transition-colors"
              :class="
                isCurrent(`/reference/${version}/${page.slug}`)
                  ? 'bg-brand-50 text-brand-700 font-medium dark:bg-brand-500/10 dark:text-brand-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white'
              "
            >
              {{ page.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </template>

    <template v-else-if="section === 'use-cases'">
      <p
        class="mb-3 text-xs font-semibold tracking-wide text-slate-900 uppercase dark:text-white"
      >
        Use cases
      </p>
      <ul class="space-y-1">
        <li v-for="page in useCases" :key="page.path">
          <NuxtLink
            :to="page.path"
            class="block rounded-lg px-3 py-1.5 transition-colors"
            :class="
              isCurrent(page.path)
                ? 'bg-brand-50 text-brand-700 font-medium dark:bg-brand-500/10 dark:text-brand-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white'
            "
          >
            {{ page.title }}
          </NuxtLink>
        </li>
      </ul>
    </template>
  </nav>
</template>
