<template>
  <footer class="border-t border-slate-200 dark:border-slate-800">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:px-6 md:flex-row md:items-start md:justify-between"
    >
      <div class="max-w-sm space-y-3">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 font-semibold text-slate-900 dark:text-white"
        >
          <FinitioMark class="h-6 w-6" />
          Finitio
        </NuxtLink>
        <p class="text-slate-500 dark:text-slate-500">
          A data definition language, and a theory of information contracts for
          moving data safely between programming and exchange languages.
        </p>
      </div>

      <div class="flex gap-12">
        <div>
          <h3 class="mb-3 font-semibold text-slate-900 dark:text-white">Learn</h3>
          <ul class="space-y-2 text-slate-500 dark:text-slate-500">
            <li><NuxtLink class="hover:text-brand-600 dark:hover:text-brand-400" to="/try">Try it online</NuxtLink></li>
            <li><NuxtLink class="hover:text-brand-600 dark:hover:text-brand-400" :to="`/reference/${CURRENT_VERSION}/type-system`">Reference</NuxtLink></li>
            <li><NuxtLink class="hover:text-brand-600 dark:hover:text-brand-400" to="/use-cases">Use cases</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h3 class="mb-3 font-semibold text-slate-900 dark:text-white">Code</h3>
          <ul class="space-y-2 text-slate-500 dark:text-slate-500">
            <li><NuxtLink class="hover:text-brand-600 dark:hover:text-brand-400" to="/download">Download</NuxtLink></li>
            <li><a class="hover:text-brand-600 dark:hover:text-brand-400" :href="GITHUB_URL" target="_blank" rel="noopener">finitio.js</a></li>
            <li><a class="hover:text-brand-600 dark:hover:text-brand-400" :href="FINITIO_RB_URL" target="_blank" rel="noopener">finitio-rb</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="border-t border-slate-200 px-4 py-6 text-center text-xs text-slate-500 sm:px-6 dark:border-slate-800 dark:text-slate-600"
    >
      This Finitio material is licensed under a
      <a
        class="underline hover:text-brand-600 dark:hover:text-brand-400"
        href="http://creativecommons.org/licenses/by-sa/4.0/"
        rel="license noopener"
        target="_blank"
        >Creative Commons Attribution-ShareAlike 4.0 International License</a
      >.
    </div>
  </footer>
</template>
