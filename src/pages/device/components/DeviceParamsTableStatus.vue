<script setup lang="ts">
import { } from '../helper'
import type { Pagination } from '~/types'

const { loading, setLoading } = useLoading()
let tabledata = $ref([])
const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}
const pagination = reactive({
  ...basePagination,
})
async function fetchRoleData(params: Record<string, any>) {
  params = { ...basePagination, ...params }
  setLoading(true)
  try {
    const { data: { records, total } } = await RoleApi.fetchRoleList(params) as any
    tabledata = records as any
    pagination.current = params.current
    pagination.total = total
  }
  catch (err) {
    // you can report use errorHandler or other
  }
  finally {
    useTimeoutFn(() => {
      setLoading(false)
    }, 1000)
  }
}
const refSearchForm = ref()
function onPageChange(current: number) {
  if (!refSearchForm.value)
    return
  const params = refSearchForm.value.formModel
  fetchRoleData({ ...params, ...basePagination, current })
}
function formatRowIndex(idx: number) {
  const { current, pageSize } = pagination
  return (current - 1) * pageSize + idx + 1
}
</script>

<template>
  <a-table
    row-key="id"
    :loading="loading"
    :data="tabledata"
    :bordered="false"
    :pagination="pagination.total! > pagination.pageSize ? pagination : false"
    @page-change="onPageChange"
  >
    <template #columns>
      <a-table-column
        title="序号"
        data-index="number"
        align="center"
      >
        <template #cell="{ rowIndex }">
          {{ formatRowIndex(rowIndex) }}
        </template>
      </a-table-column>
      <a-table-column
        title="采集项名称"
        data-index="paramName"
        align="center"
      />
      <a-table-column
        title="采集值类型"
        data-index="valueType"
        align="center"
      >
        <template #cell>
          <span font-bold text="![rgb(var(--primary-6))]">数值型</span>
        </template>
      </a-table-column>
      <a-table-column
        title="单位"
        data-index="paramUnit"
        align="center"
      >
        <template #cell="{ record }">
          <a-input v-model="record.paramUnit" />
        </template>
      </a-table-column>
      <a-table-column
        title="是否告警"
        data-index="isAlarm"
        align="center"
      >
        <template #cell="{ record }">
          <a-select v-model="record.isAlarm" @change="() => { record.maxValue = undefined; record.minValue = undefined; }">
            <a-option value="true" label="是" />
            <a-option value="false" label="否" />
          </a-select>
        </template>
      </a-table-column>
      <a-table-column
        title="最大值"
        data-index="maxValue"
        align="center"
      >
        <template #cell="{ record }">
          <a-input-number v-model="record.maxValue" :disabled="!record.isAlarm" />
        </template>
      </a-table-column>
      <a-table-column
        title="最小值"
        data-index="minValue"
        align="center"
      >
        <template #cell="{ record }">
          <a-input-number v-model="record.minValue" :disabled="!record.isAlarm" />
        </template>
      </a-table-column>
      <a-table-column
        title="是否传给MES"
        data-index="toMes"
        align="center"
      >
        <template #cell="{ record }">
          <a-select v-model="record.toMes">
            <a-option value="true" label="是" />
            <a-option value="false" label="否" />
          </a-select>
        </template>
      </a-table-column>
    </template>
  </a-table>
</template>
