<script setup lang="ts">
const { data: page } = await useAsyncData('content-home', () =>
  queryCollection('content').path('/').first(),
)

const features = [
  {
    title: 'A type is a set of values',
    body: 'No fixed catalogue of booleans, strings and integers. Finitio gives you an abstract way of building information types: subtypes are subsets, supertypes are supersets. That is the whole definition.',
  },
  {
    title: 'Constraints, not just shapes',
    body: 'Attach named predicates to any type. A temperature is not a Real, it is a Real between 33.0 and 45.0 — and when a document fails, the error names the constraint it broke.',
  },
  {
    title: 'Information contracts',
    body: 'Dress low-level exchange data into rich host-language values, and undress it back. JSON has no date type; your program should not have to care.',
  },
  {
    title: 'Tuples, relations, unions, ADTs',
    body: 'Structural types borrowed from the relational model rather than from object orientation, because the goal is to capture information rather than behaviour.',
  },
  {
    title: 'Errors you can act on',
    body: 'Validation reports every problem with the path that located it, so a rejected payload tells you which field, which element, which constraint.',
  },
  {
    title: 'Ruby and JavaScript',
    body: 'finitio-rb implements the full specification. finitio.js brings the same schemas to Node and to the browser — it is what powers the playground on this site.',
  },
]

useSeoMeta({
  title: 'Finitio — A Data Language',
  description:
    'Finitio is a data definition language. Think "JSON/XML schema", but the right way: a real type system for data, plus information contracts for interoperability.',
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-brand-100),transparent)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-brand-950),transparent)]"
      />
      <div class="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
        <p
          class="text-brand-600 dark:text-brand-400 mb-4 text-sm font-semibold tracking-wide uppercase"
        >
          A data language
        </p>
        <h1
          class="text-4xl font-bold tracking-tight text-balance text-slate-900 sm:text-6xl dark:text-white"
        >
          Data deserves a language of its own
        </h1>
        <p
          class="mx-auto mt-6 max-w-2xl text-lg text-pretty text-slate-600 dark:text-slate-400"
        >
          <em>Finitio</em> is a data definition language. Think “JSON/XML
          schema”, but the right way — a dedicated type system for describing
          data, and a theory of <em>information contracts</em> for moving it
          between programming and exchange languages.
        </p>
        <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
          <NuxtLink
            to="/try"
            class="bg-brand-600 hover:bg-brand-700 focus-visible:outline-brand-600 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Try it in your browser
          </NuxtLink>
          <NuxtLink
            :to="`/reference/${CURRENT_VERSION}/type-system`"
            class="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800/60"
          >
            Read the reference
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Worked examples, authored as markdown so the code is highlighted -->
    <section class="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
      <ContentRenderer v-if="page" :value="page" class="prose-finitio" />
    </section>

    <!-- Features -->
    <section class="border-t border-slate-200 dark:border-slate-800">
      <div class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2
          class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          What you get
        </h2>
        <div class="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="feature in features" :key="feature.title">
            <h3 class="font-semibold text-slate-900 dark:text-white">
              {{ feature.title }}
            </h3>
            <p class="mt-2 text-sm/6 text-slate-600 dark:text-slate-400">
              {{ feature.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Closing CTA -->
    <section class="border-t border-slate-200 dark:border-slate-800">
      <div class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h2
          class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Write a schema, paste a document
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">
          The playground runs <code class="font-mono text-sm">finitio.js</code>
          entirely in your browser. Nothing is sent anywhere.
        </p>
        <NuxtLink
          to="/try"
          class="bg-brand-600 hover:bg-brand-700 mt-8 inline-block rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors"
        >
          Open the playground
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
