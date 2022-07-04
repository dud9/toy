<script setup lang="ts">
import NavStyleSettingPanel from '../widgets/NavStyleSettingPanel.vue'

const {
  visible = false,
} = defineProps<{
  visible?: boolean
}>()
const emits = defineEmits(['update:visible'])
const { updateByStage, resetStage } = useAppStore()
function handleOk() {
  updateByStage()
  emits('update:visible', false)
}
function handleCancel() {
  resetStage()
  emits('update:visible', false)
}
function onClick() {
  resetStage()
  emits('update:visible', !visible)
}
</script>

<template>
  <button
    icon-btn text-lg
    i-ic-round-settings
    @click="onClick"
  />
  <a-drawer
    :visible="visible"
    :width="300"
    unmount-on-close
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>
      页面风格设置
    </template>
    <NavStyleSettingPanel />
  </a-drawer>
</template>
