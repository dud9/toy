<script setup lang="ts">
import ReactDataChart from './components/ReactDataChart.vue'
import ReactDataList from './components/ReactDataList.vue'
import type { Equipment } from '~/types'

const { width, height } = useWindowSize()
const leftSideWidth = ref(unref(width) * 0.7)
watch(width, (val) => {
  leftSideWidth.value = val * 0.7
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
      w-full flex="inline nowrap" lt-md="grid grid-rows-2" bg="white dark:!transparent"
      border="1 neutral-600/10 dark:![var(--color-neutral-3)]"
    >
      <a-resize-box
        v-model:width="leftSideWidth"
        :directions="['right']"
        :style="{ minWidth: '50%', maxWidth: '100%', textAlign: 'center' }"
        lt-md="!w-full"
      >
        <ReactDataChart v-if="equipment" :wrapper-width="leftSideWidth" :wrapper-height="height" :equipment="equipment" />
      </a-resize-box>
      <div lt-md="mt-20px !w-full" of="x-hidden y-auto" flex-1>
        <ReactDataList v-if="equipment" :equipment="equipment" />
      </div>
    </div>
  </div>
</template>
