<script setup lang="ts">
import { IconDriveFile, IconExclamationCircleFill, IconRefresh } from '@arco-design/web-vue/es/icon'
import DeviceParamsTableNumber from './DeviceParamsTableNumber.vue'
import DeviceParamsTableStatus from './DeviceParamsTableStatus.vue'
import type { Equipment } from '~/types'

const activeRadioValue = ref<'number' | 'status'>('number')

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

const refNumberTable = ref()
const refNumberStatus = ref()

function save() {
  if (activeRadioValue.value === 'number') {
    if (!refNumberTable.value)
      return
    refNumberTable.value.saveChanged()
  }
  else {
    // if (!refNumberStatus.value)
    //   return
    // refNumberStatus.value.saveChanged()
  }
}
</script>

<template>
  <div px-15px mb-20px w-full>
    <div flex justify-between items-center>
      <a-radio-group v-model="activeRadioValue" type="button">
        <a-radio value="number">
          数值型
        </a-radio>
        <a-radio value="status">
          状态型
        </a-radio>
      </a-radio-group>
      <div>
        <a-button type="primary" font-bold>
          发布配置
        </a-button>
        <a-button font-bold text="![rgb(var(--primary-6))]" ml-3 @click="save">
          <template #icon>
            <IconDriveFile />
          </template>
          保存
        </a-button>
        <a-button font-bold ml-3>
          <template #icon>
            <IconRefresh />
          </template>
          还原
        </a-button>
      </div>
    </div>
    <div mt-15px>
      <DeviceParamsTableNumber v-if="equipment && activeRadioValue === 'number'" ref="refNumberTable" :equipment="equipment" />
      <DeviceParamsTableStatus v-if="equipment && activeRadioValue === 'status'" ref="refNumberStatus" :equipment="equipment" />
      <a-empty v-if="!equipment" w-full h-auto min-h-250px flex="~ col" justify-center items-center>
        <template #image>
          <IconExclamationCircleFill :size="80" />
        </template>
        <div text-30px font-bold mt-30px>
          设备不存在
        </div>
      </a-empty>
    </div>
  </div>
</template>
