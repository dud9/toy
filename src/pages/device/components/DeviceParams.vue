<script setup lang="ts">
import { IconDriveFile, IconRefresh } from '@arco-design/web-vue/es/icon'

const activeRadioValue = ref<'number' | 'status'>('number')
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
          <template #icon>
            <IconRefresh />
          </template>
          重启
        </a-button>
        <a-button font-bold text="![rgb(var(--primary-6))]" ml-4>
          <template #icon>
            <IconDriveFile />
          </template>
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>
