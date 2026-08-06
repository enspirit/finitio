<script setup lang="ts">
const isDark = useState('theme-dark', () => false)
const { $toggleTheme } = useNuxtApp()
</script>

<template>
  <ClientOnly>
    <button
      class="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white"
      :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
      @click="$toggleTheme()"
    >
      <svg
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        viewBox="0 0 24 24"
      >
        <path
          v-if="isDark"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v1.5m0 15V21m9-9h-1.5m-15 0H3m15.36-6.36-1.06 1.06M6.7 17.3l-1.06 1.06m12.72 0-1.06-1.06M6.7 6.7 5.64 5.64M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
        />
      </svg>
    </button>
    <template #fallback>
      <span class="block h-9 w-9" />
    </template>
  </ClientOnly>
</template>
