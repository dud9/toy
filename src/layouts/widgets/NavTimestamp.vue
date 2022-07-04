<script setup lang="ts">
function getCurrentTime() {
  return dayJs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}
let currentTime = $ref(getCurrentTime())
useIntervalFn(() => {
  currentTime = getCurrentTime()
}, 1000)
</script>

<template>
  <div op-30 text-4 font-bold>
    {{ currentTime }}
  </div>
</template>
