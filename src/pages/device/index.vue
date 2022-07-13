<script setup lang="ts">
import { IconBug, IconInfoCircle } from '@arco-design/web-vue/es/icon'
import DeviceInformation from './components/DeviceInformation.vue'
import DeviceParams from './components/DeviceParams.vue'

const activeTabIdx = ref(1)
function changeTabIdx(key: any) {
  activeTabIdx.value = key
}
</script>

<template>
  <div>
    <PageHeader />
    <a-row min-h-250px bg="[var(--color-bg-2)]" rounded-sm py-5px>
      <a-col :span="24">
        <a-tabs :active-key="activeTabIdx" :destroy-on-hide="true" @change="changeTabIdx">
          <a-tab-pane :key="1">
            <template #title>
              <IconInfoCircle /> 设备信息
            </template>
            <DeviceInformation v-if="activeTabIdx === 1" mt-20px />
          </a-tab-pane>
          <a-tab-pane :key="2">
            <template #title>
              <IconBug /> 参数模型
            </template>
            <DeviceParams v-if="activeTabIdx === 2" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
:deep(.arco-tabs-tab) {
  outline-style: hidden !important;
}
</style>
