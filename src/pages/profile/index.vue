<script setup lang="ts">
import { IconInfoCircle, IconLock } from '@arco-design/web-vue/es/icon'
import UserPanel from './components/UserPanel.vue'
import BasicInformation from './components/BasicInformation.vue'
import SecuritySettings from './components/SecuritySettings.vue'

const activeTabIdx = ref(1)
function changeTabIdx(key: any) {
  activeTabIdx.value = key
}
</script>

<template>
  <div>
    <PageHeader />
    <a-row mb-16px>
      <a-col :span="24">
        <UserPanel />
      </a-col>
    </a-row>

    <a-row class="wrapper">
      <a-col :span="24">
        <a-tabs :active-key="activeTabIdx" type="rounded" @change="changeTabIdx">
          <a-tab-pane :key="1">
            <template #title>
              <IconInfoCircle /> 基础信息
            </template>
            <BasicInformation :tab-idx="activeTabIdx" />
          </a-tab-pane>
          <a-tab-pane :key="2">
            <template #title>
              <IconLock /> 安全设置
            </template>
            <SecuritySettings :tab-idx="activeTabIdx" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
  .wrapper {
    padding: 20px 0 0 20px;
    min-height: 250px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }
  :deep(.section-title) {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 14px;
  }
</style>
