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

// 刷新间隔
const REFRESH_INTERVAL = 10 * 1000

let statusList = $ref<Record<string, any>[]>([])
async function fetchCollectStatusItemList() {
  if (!equipment?.id)
    return
  const { data: { records } } = await CollectApi.fetchCollectStatusItems({ equipmentId: equipment.id }) as any
  statusList = records
}

const stateMap = $ref<Record<number, boolean>>({})
function checkOnlineState(data: Record<string, any>[], idx: number) {
  return stateMap[data[idx]?.id] || false
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

async function fetchItemState() {
  if (!equipment?.id)
    return
  const now = dayJs(new Date())
  const params = {
    start: now.subtract(60, 'second').format('YYYY-MM-DD HH:mm:ss'),
    stop: now.format('YYYY-MM-DD HH:mm:ss'),
    equipmentId: equipment.id,
    itemIdList: statusList.map(i => i.id) || [],
    itemType: 'status',
  }
  const { data } = await ReactDataApi.fetchReactData(params) as any
  if (data && Object.keys(data).length) {
    Object.keys(data).forEach((key: any) => {
      stateMap[key] = (data[key]?.slice(-1)[0]?.value ?? 0) === 1
    })
  }
}

async function init() {
  await fetchCollectStatusItemList()
  fetchItemState()
}
init()

useIntervalFn(() => {
  fetchItemState()
}, REFRESH_INTERVAL)
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
          <div i-carbon-dot-mark mr-3 text="!24px green-500" :class="{ 'op-30': !checkOnlineState(statusList, i - 1) }" />
        </a-tooltip>
        <a-tooltip content="离线" position="top" mini>
          <div i-carbon-dot-mark text="!24px red-500" :class="{ 'op-30': checkOnlineState(statusList, i - 1) }" />
        </a-tooltip>
      </div>
    </div>
  </div>
</template>
