<script setup lang="ts">
import type { Ref } from 'vue'
import ReactDataChart from './components/ReactDataChart.vue'
import ReactDataList from './components/ReactDataList.vue'
import type { Equipment } from '~/types'

const { width, height } = useWindowSize()
function getLeftSideWidth(width: number | Ref<number>) {
  return unref(width) >= 1200
    ? unref(width) * 0.75
    : unref(width) * 0.7
}
const leftSideWidth = ref(getLeftSideWidth(width))
watch(width, (val) => {
  leftSideWidth.value = getLeftSideWidth(val)
})

const { equipIp } = useAppStore()
let equipment = $ref<Equipment>()
async function getEquipmentInfo() {
  const { code, data, message } = await EquipmentApi.fetchEquipmentByIp({ ip: equipIp }) as any
  if (code !== 0) {
    Message.error(message || '设备不存在')
    return
  }
  equipment = {
    ...data,
  }
}
getEquipmentInfo()
</script>

<template>
  <div>
    <PageHeader />
    <div
      style="height: calc(100vh - 140px);"
      w-full flex="inline nowrap" lt-md="grid grid-rows-2 !h-600px" bg="white dark:!transparent"
      border="1 neutral-600/10 dark:![var(--color-neutral-3)]"
    >
      <a-resize-box
        v-model:width="leftSideWidth"
        :directions="['right']"
        :style="{ minWidth: '50%', maxWidth: '100%', textAlign: 'center' }"
        lt-md="!w-full"
      >
        <ReactDataChart v-if="equipment" :equipment="equipment" :wrapper-width="leftSideWidth" :wrapper-height="height" />
      </a-resize-box>
      <div lt-md="mt-20px !w-full" of="x-hidden y-auto" flex-1>
        <ReactDataList v-if="equipment" :equipment="equipment" :width="width" :wrapper-width="leftSideWidth" />
      </div>
    </div>
  </div>
</template>
