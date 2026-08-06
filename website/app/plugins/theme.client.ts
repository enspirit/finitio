/**
 * Applies the stored (or system) colour scheme. The matching inline script in
 * `nuxt.config.ts` runs before paint; this plugin keeps the runtime state in
 * sync and exposes a toggle.
 */
export default defineNuxtPlugin(() => {
  const isDark = useState('theme-dark', () => false)

  const apply = (dark: boolean) => {
    document.documentElement.classList.toggle('dark', dark)
    isDark.value = dark
  }

  const stored = localStorage.getItem('theme')
  apply(
    stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  // Follow the OS while the user hasn't expressed a preference.
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) apply(e.matches)
    })

  return {
    provide: {
      toggleTheme: () => {
        const next = !isDark.value
        localStorage.setItem('theme', next ? 'dark' : 'light')
        apply(next)
      },
    },
  }
})
