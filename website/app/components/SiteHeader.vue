<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)

// Close the mobile drawer whenever we navigate.
watch(() => route.path, () => (mobileOpen.value = false))

const isActive = (link: (typeof NAV_LINKS)[number]) => {
  const prefix = 'match' in link ? link.match : link.to
  return route.path === prefix || route.path.startsWith(`${prefix}/`)
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/85"
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
      <NuxtLink
        to="/"
        class="flex shrink-0 items-center gap-2.5 font-semibold tracking-tight text-slate-900 dark:text-white"
      >
        <FinitioMark class="h-7 w-7" />
        <span class="text-lg">Finitio</span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="link in NAV_LINKS"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          :class="
            isActive(link)
              ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white'
          "
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <a
          :href="GITHUB_URL"
          target="_blank"
          rel="noopener"
          aria-label="Finitio on GitHub"
          class="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white"
        >
          <svg class="h-5 w-5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
            />
          </svg>
        </a>

        <button
          class="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden dark:text-slate-400 dark:hover:bg-slate-800/60"
          :aria-expanded="mobileOpen"
          aria-label="Toggle navigation"
          @click="mobileOpen = !mobileOpen"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              :d="mobileOpen ? 'M6 18 18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'"
            />
          </svg>
        </button>
      </div>
    </div>

    <nav
      v-if="mobileOpen"
      class="border-t border-slate-200 px-4 py-3 md:hidden dark:border-slate-800"
    >
      <NuxtLink
        v-for="link in NAV_LINKS"
        :key="link.to"
        :to="link.to"
        class="block rounded-lg px-3 py-2 text-sm font-medium"
        :class="
          isActive(link)
            ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
            : 'text-slate-600 dark:text-slate-400'
        "
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
