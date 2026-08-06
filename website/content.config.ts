import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        // Reference pages carry the spec version they document, so the docs
        // sidebar and version switcher can group them.
        version: z.string().optional(),
        // Ordering within a section's sidebar.
        order: z.number().optional(),
        date: z.string().optional(),
        author: z.string().optional(),
      }),
    }),
  },
})
