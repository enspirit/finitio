<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(`content-${route.path}`, () =>
  queryCollection('content').path(route.path).first(),
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const hasSidebar = computed(
  () =>
    route.path.startsWith('/reference') || route.path.startsWith('/use-cases'),
)

const isBlogPost = computed(() => route.path.startsWith('/blog/'))

const toc = computed(() => page.value?.body?.toc?.links ?? [])

const hasToc = computed(() => toc.value.length > 0)

const gridColumns = computed(() => {
  if (hasSidebar.value) {
    return hasToc.value
      ? 'lg:grid-cols-[15rem_minmax(0,1fr)_14rem]'
      : 'lg:grid-cols-[15rem_minmax(0,1fr)]'
  }
  return hasToc.value ? 'lg:grid-cols-[minmax(0,1fr)_14rem]' : ''
})

const formattedDate = computed(() =>
  page.value?.date
    ? new Date(page.value.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null,
)

useSeoMeta({
  title: `${page.value.title} — Finitio`,
  description: page.value.description,
  ogTitle: `${page.value.title} — Finitio`,
  ogDescription: page.value.description,
})
</script>

<template>
  <div v-if="page" class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
    <!-- Columns are only reserved for the rails that actually have content.
         A page without headings (the blog post) would otherwise leave a
         14rem gutter to the right of the text. -->
    <div class="lg:grid lg:gap-10" :class="gridColumns">
      <aside v-if="hasSidebar" class="mb-8 lg:mb-0">
        <div class="lg:sticky lg:top-24">
          <DocsSidebar />
        </div>
      </aside>

      <article class="min-w-0">
        <header class="mb-8">
          <p
            v-if="page.version"
            class="text-brand-600 dark:text-brand-400 mb-2 text-sm font-medium"
          >
            Finitio {{ page.version }}
          </p>
          <h1
            class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            {{ page.title }}
          </h1>
          <p
            v-if="formattedDate || page.author"
            class="mt-3 text-sm text-slate-500 dark:text-slate-500"
          >
            <template v-if="page.author">{{ page.author }}</template>
            <template v-if="page.author && formattedDate"> &middot; </template>
            <template v-if="formattedDate">{{ formattedDate }}</template>
          </p>
        </header>

        <ContentRenderer
          :value="page"
          class="prose-finitio"
          :class="{ 'prose-blog': isBlogPost }"
        />
      </article>

      <aside v-if="hasToc" class="mt-10 hidden lg:mt-0 lg:block">
        <div class="lg:sticky lg:top-24">
          <TableOfContents :links="toc" />
        </div>
      </aside>
    </div>
  </div>
</template>
