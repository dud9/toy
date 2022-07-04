<script setup lang="ts">
import BackTop from './widgets/BackTop.vue'
import TheMain from './components/TheMain.vue'
import TheNav from './components/TheNav.vue'

const { fixHeader } = storeToRefs(useAppStore())
const backTopTarget = computed(() => {
  return fixHeader.value
    ? '#content-wrapper'
    : '#main-wrapper'
})
</script>

<template>
  <a-layout id="main-wrapper" h-screen w-screen bg-base of="x-hidden y-auto">
    <a-layout-header bg-header :class="fixHeader ? 'fixed top-0 right-0 w-full z-100' : ''">
      <TheNav w-full h-50px bg-transparent />
    </a-layout-header>
    <a-layout
      id="content-wrapper"
      bg-transparent
      :class="
        fixHeader
          ? 'of-x-hidden of-y-auto !mt-50px'
          : '' "
    >
      <a-layout-content>
        <TheMain w-full h-full px-3 py-4 />
      </a-layout-content>
    </a-layout>
  </a-layout>
  <BackTop :target-container="backTopTarget" />
</template>
