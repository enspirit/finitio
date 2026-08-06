<script setup lang="ts">
import { EditorState, type Extension } from '@codemirror/state'
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { bracketMatching, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language'
import { json } from '@codemirror/lang-json'
import { javascript } from '@codemirror/lang-javascript'

const props = withDefaults(
  defineProps<{
    language?: 'json' | 'javascript' | 'plain'
    ariaLabel?: string
  }>(),
  { language: 'plain', ariaLabel: 'Code editor' },
)

const model = defineModel<string>({ required: true })

const host = useTemplateRef<HTMLDivElement>('host')
let view: EditorView | null = null

const theme = EditorView.theme({
  '&': { height: '100%', fontSize: '13px', backgroundColor: 'transparent' },
  '.cm-scroller': {
    fontFamily: 'var(--font-mono)',
    lineHeight: '1.6',
    overflow: 'auto',
  },
  '.cm-content': { padding: '12px 0' },
  '.cm-gutters': {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'color-mix(in oklab, currentColor 35%, transparent)',
  },
  '&.cm-focused': { outline: 'none' },
  '.cm-activeLine': { backgroundColor: 'color-mix(in oklab, currentColor 4%, transparent)' },
})

onMounted(() => {
  const extensions: Extension[] = [
    lineNumbers(),
    history(),
    bracketMatching(),
    highlightActiveLine(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
    theme,
    EditorView.lineWrapping,
    EditorView.updateListener.of((update) => {
      if (update.docChanged) model.value = update.state.doc.toString()
    }),
  ]
  if (props.language === 'json') extensions.push(json())
  else if (props.language === 'javascript') extensions.push(javascript())

  view = new EditorView({
    state: EditorState.create({ doc: model.value, extensions }),
    parent: host.value!,
  })
  view.contentDOM.setAttribute('aria-label', props.ariaLabel)
})

// Reflect external changes (loading an example) without clobbering typing.
watch(model, (value) => {
  if (view && value !== view.state.doc.toString()) {
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value },
    })
  }
})

onBeforeUnmount(() => view?.destroy())
</script>

<template>
  <div ref="host" class="h-full min-h-0 overflow-hidden" />
</template>
