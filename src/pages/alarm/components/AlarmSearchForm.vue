<script setup lang="ts">
import { IconRefresh, IconSearch } from '@arco-design/web-vue/es/icon'
import type { SelectOptionData } from '~/types'

const {
  alarmLevelOptions = [],
} = defineProps<{
  alarmLevelOptions: SelectOptionData[]
}>()
const emit = defineEmits(['fetchData'])
function generateFormModel() {
  return {
    alarmLevel: '',
    alarmTime: [],
  }
}
const formModel = ref(generateFormModel())
function search() {
  emit('fetchData', formModel.value)
}
search()
function reset() {
  formModel.value = ref(generateFormModel()) as any
}

const hideLabel = isLabelHidden

defineExpose({
  formModel,
})
</script>

<template>
  <a-row>
    <a-col :flex="1">
      <a-form
        :model="formModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <a-row :gutter="16">
          <a-col :xs="12" :lg="8">
            <a-form-item field="alarmLevel" label="告警等级" :hide-label="hideLabel">
              <a-select
                v-model="formModel.alarmLevel"
                :options="alarmLevelOptions"
                placeholder="请选择告警等级"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :xs="12" :lg="8">
            <a-form-item field="alarmTime" label="告警时间" :hide-label="hideLabel">
              <a-range-picker
                v-model="formModel.alarmTime"
                w-full
              />
            </a-form-item>
          </a-col>
          <a-col :xs="0" :lg="8" />
        </a-row>
      </a-form>
    </a-col>
    <a-divider class="!h-34px" direction="vertical" />
    <a-col flex="172px">
      <a-space :size="18">
        <a-button type="primary" font-bold @click="search">
          <template #icon>
            <icon-search />
          </template>
          搜索
        </a-button>
        <a-button font-bold @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          重置
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>

