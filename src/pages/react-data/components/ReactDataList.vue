<script setup lang="ts">
</script>

<template>
  <div w-full h-full flex="~ col" justify-start items-center pt-10px of="x-hidden y-auto" px="1/10">
    <div v-for="i, idx in 10" :key="idx" w-full flex="~ wrap" justify-between items-center mt-2 font-bold>
      <div flex-inline>
        <div i-carbon-data-1 mr-2 />
        <span>头座模块自检报警{{ i }}</span>:
      </div>
      <div flex-inline>
        <div i-carbon-dot-mark mr-5 text="!24px green-500" class="shadow-cyan-500/50" />
        <div i-carbon-dot-mark text="!24px red-500" class="shadow-cyan-500/50" />
      </div>
    </div>
  </div>
</template>
