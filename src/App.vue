<script setup lang="ts">
import { replacePrimaryColor } from '~/utils'

useHead({
  title: 'TOY',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})

// reset primary color
const { primaryColor } = storeToRefs(useAppStore())
replacePrimaryColor(primaryColor.value)
const { appReloading, handleReload } = useReload()
handleReload(1000)
</script>

<template>
  <WaitForWindowReload v-if="appReloading" />
  <RouterView v-else />
</template>
