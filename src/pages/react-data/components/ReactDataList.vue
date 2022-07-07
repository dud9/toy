<script setup lang="ts">
</script>

<template>
  <div w-full h-full flex="~ col" justify-center items-center>
    <div v-for="i, idx in 10" :key="idx" flex="~ wrap">
      头座模块自检报警{{ i }}: 离线
    </div>
  </div>
</template>
