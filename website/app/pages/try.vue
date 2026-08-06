<script setup lang="ts">
useSeoMeta({
  title: 'Try Finitio online — Finitio',
  description:
    'Write a Finitio schema, paste a JSON document, and validate it in your browser. Powered by finitio.js; nothing leaves your machine.',
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6">
    <header
      class="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
    >
      <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Try it online
      </h1>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        Each example introduces one idea, and everything re-runs as you type.
        This is
        <a class="text-brand-600 dark:text-brand-400 hover:underline" :href="GITHUB_URL" target="_blank" rel="noopener">finitio.js</a>
        in your browser — nothing is sent to a server.
      </p>
    </header>

    <FinitioPlayground />

    <section class="prose-finitio mt-16 max-w-3xl">
      <h2>The three things Finitio does</h2>
      <p>
        Every example above reports each one separately, because they answer
        different questions.
      </p>
      <ul>
        <li>
          <strong>Validating</strong> asks whether a value already belongs to the
          type, as a plain question of set membership. Nothing is converted.
        </li>
        <li>
          <strong>Dressing</strong> converts an exchange-level document into
          host-language values: a string becomes a <code>Date</code>, a triple of
          integers becomes a <code>Color</code>. A value can fail validation and
          still dress successfully — that is the point of a contract.
        </li>
        <li>
          <strong>Undressing</strong> is the inverse, turning host values back
          into something you can serialise. A schema opts in by naming an
          <code>Output</code> type.
        </li>
      </ul>

      <h2>A few pointers</h2>
      <ul>
        <li>
          Since Finitio 0.4 the builtin types live in the standard library, so
          schemas start with <code>@import finitio/data</code>.
        </li>
        <li>
          The last anonymous type in a schema is the <em>main</em> type: it is
          what the document is checked against.
        </li>
        <li>
          Constraints are expressions of the host language — JavaScript here —
          and can be named, as in
          <code>String( s | nonEmpty: s.length > 0 )</code>, so failures say
          which rule broke.
        </li>
        <li>
          Types can take type parameters, as in
          <code>Resource&lt;T&gt; = { data: T, links: [String] }</code>, and are
          instantiated with <code>Resource&lt;Person&gt;</code>.
        </li>
        <li>
          The full grammar is in the
          <NuxtLink :to="`/reference/${CURRENT_VERSION}/type-system`">type system reference</NuxtLink>.
        </li>
      </ul>
    </section>
  </div>
</template>
