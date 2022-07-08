<script setup lang="ts">
import { IconBug, IconInfoCircle } from '@arco-design/web-vue/es/icon'
import DeviceInformation from './components/DeviceInformation.vue'

const activeTabIdx = ref(1)
function changeTabIdx(key: any) {
  activeTabIdx.value = key
}
</script>

<template>
  <div>
    <PageHeader />
    <a-row min-h-250px bg="[var(--color-bg-2)]" rounded-sm py-10px>
      <a-col :span="24">
        <a-tabs :active-key="activeTabIdx" @change="changeTabIdx">
          <a-tab-pane :key="1">
            <template #title>
              <IconInfoCircle /> 设备信息
            </template>
            <DeviceInformation :tab-idx="activeTabIdx" mt-20px />
          </a-tab-pane>
          <a-tab-pane :key="2">
            <template #title>
              <IconBug /> 参数模型
            </template>
            <!-- <SecuritySettings :tab-idx="activeTabIdx" mt-20px /> -->
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>
