<script setup lang="ts">
import logo from '~/assets/logo.svg'

const title = 'Toy'
const { width } = useWindowSize()
let hiddenTitle = $ref(false)
const { showTheLogo } = storeToRefs(useAppStore())
watchEffect(() => {
  // when the screen width less than 1200px, hide the title
  hiddenTitle = width.value < 800
})
</script>

<template>
  <div v-if="showTheLogo" h-50px flex justify-center items-center>
    <img :src="logo" alt="" h-34px w-34px :class="hiddenTitle ? '' : 'mr-5'">
    <h1 v-if="!hiddenTitle" font="bold serif" text-2xl op50>
      {{ title }}
    </h1>
  </div>
</template>
