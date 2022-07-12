<script setup lang="ts">
import type { Equipment } from '~/types'

const {
  width = 0,
  equipment = {},
  wrapperWidth = 0,
} = defineProps<{
  width?: number
  equipment?: Equipment
  wrapperWidth?: number
}>()

let statusList = $ref<Record<string, any>[]>([])
async function fetchCollectStatusItemList() {
  if (!equipment?.id)
    return
  const { data: { records } } = await CollectApi.fetchCollectStatusItems({ equipmentId: equipment.id }) as any
  statusList = records
}
fetchCollectStatusItemList()

function checkOnlineState(key: number) {
  return (key & 1) === 1
}
function getParamName(data: Record<string, any>[], idx: number) {
  return data?.[idx]?.paramName || ''
}

let hidden = $ref(false)
watch(() => wrapperWidth, (val) => {
  const factor = width >= 1200
    ? 0.90
    : 0.84
  hidden = width >= 850 && width * factor < val
})
</script>

<template>
  <div v-if="!hidden" w-full h-full flex="~ col" justify-start items-center pt-10px of="x-hidden y-auto" px="1/18">
    <div v-for="i, idx in 10" :key="idx" w-full grid="~ cols-3" mt-2 font-bold>
      <div flex-inline items-center justify-start col-span-2>
        <div i-carbon-data-1 mr-2 />
        <a-tooltip v-if="getParamName(statusList, i - 1).length > 12" :content="getParamName(statusList, i - 1)" position="top" mini>
          <span>{{ getParamName(statusList, i - 1).slice(0, 12) }}... :</span>
        </a-tooltip>
        <span v-else>{{ getParamName(statusList, i - 1) }} :</span>
      </div>
      <div flex-inline items-center justify-end>
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
