<script setup lang="ts">
const { openAnimation, animationMode } = storeToRefs(useAppStore())
const animateName = computed(() => {
  return unref(openAnimation)
    ? unref(animationMode)
    : undefined
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="animateName" mode="out-in" appear>
      <KeepAlive v-if="route.meta?.cached">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
      <component :is="Component" v-else :key="route.fullPath" />
    </Transition>
  </RouterView>
</template>
