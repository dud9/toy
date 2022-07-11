<script setup lang="ts">
import { IconRefresh, IconSearch } from '@arco-design/web-vue/es/icon'
import type { SelectOptionData } from '~/types'

const {
  roleOptions = [],
} = defineProps<{
  roleOptions: SelectOptionData[]
}>()
const emit = defineEmits(['fetchData'])
const dayjs = dayJs

function generateFormModel() {
  return {
    username: '',
    name: '',
    roleId: '',
    createTime: [],
    updateTime: [],
  }
}
const formModel = ref(generateFormModel())
function search() {
  const params: Record<string, any> = JSON.parse(JSON.stringify(unref(formModel)))
  const { createTime, updateTime } = params as any
  for (const [k, v] of Object.entries({ createTime, updateTime })) {
    if (!Array.isArray(v) || v.length === 0)
      continue
    const [start, end] = v
    if (start === end)
      params[k] = [`${start} 00:00:00`, `${end} 23:59:59`]
  }
  emit('fetchData', params)
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
          <a-col :span="8">
            <a-form-item field="username" label="账号" :hide-label="hideLabel">
              <a-input
                v-model="formModel.username"
                placeholder="请输入用户账号"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="name" label="名称" :hide-label="hideLabel">
              <a-input
                v-model="formModel.name"
                placeholder="请输入名称"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="roleId" label="角色" :hide-label="hideLabel">
              <a-select
                v-model="formModel.roleId"
                :options="roleOptions"
                placeholder="请选择角色"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="createTime" label="创建时间" :hide-label="hideLabel">
              <a-range-picker
                v-model="formModel.createTime" w-full allow-clear
                :disabled-date="(current: any) => dayjs(current).isAfter(dayjs())"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="updateTime" label="修改时间" :hide-label="hideLabel">
              <a-range-picker
                v-model="formModel.updateTime"
                :disabled-date="(current: any) => dayjs(current).isAfter(dayjs())"
                w-full allow-clear
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
    <a-divider class="!h-84px" direction="vertical" />
    <a-col flex="86px">
      <a-space direction="vertical" :size="18">
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
