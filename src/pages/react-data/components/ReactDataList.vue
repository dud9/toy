<script setup lang="ts">
</script>

<template>
  <div w-full h-full flex="~ col" justify-start items-center pt-10px of="x-hidden y-auto">
    <div v-for="i, idx in 10" :key="idx" flex="~ wrap" mt-4 font-bold>
      <span>头座模块自检报警{{ i }}</span>: 离线
    </div>
  </div>
</template>
