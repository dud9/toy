<script setup lang="ts">
function checkOnlineState(key: number) {
  return (key & 1) === 1
}

const data = Array.from({ length: 20 }, (_, i) => `头座模块自检报警哈哈哈哈哈哈哈${i + 1}`)
</script>

<template>
  <div w-full h-full flex="~ col" justify-start items-center pt-10px of="x-hidden y-auto" px="1/18">
    <div v-for="i, idx in 10" :key="idx" w-full flex="~ wrap" justify-center items-center mt-2 font-bold>
      <div flex-inline items-center>
        <div i-carbon-data-1 mr-2 />
        <a-tooltip v-if="data[i - 1].length > 12" :content="data[i - 1]" position="top" mini>
          <span>{{ data[i - 1].slice(0, 12) }}... :</span>
        </a-tooltip>
        <span v-else>{{ data[i - 1] }} :</span>
      </div>
      <div flex-inline ml-4>
        <a-tooltip content="在线" position="top" mini>
          <div i-carbon-dot-mark mr-3 text="!24px green-500" :class="{ 'op-30': !checkOnlineState(i) }" />
        </a-tooltip>
        <a-tooltip content="离线" position="top" mini>
          <div i-carbon-dot-mark text="!24px red-500" :class="{ 'op-30': checkOnlineState(i) }" />
        </a-tooltip>
      </div>
    </div>
  </div>
</template>
