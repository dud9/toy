<script setup lang="ts">
import { } from '../helper'
import type { Equipment, Pagination } from '~/types'
import { CollectApi } from '~/server/api/collect'

const {
  equipment = {},
} = defineProps<{
  equipment?: Equipment
}>()

const { loading, setLoading } = useLoading()
let tabledata = $ref([])
const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}
const pagination = reactive({
  ...basePagination,
})

async function fetchCollectNumberItemData(params: Record<string, any>) {
  if (!equipment || !equipment.id) {
    Message.error('设备不存在')
    return
  }
  params = { ...basePagination, ...params, equipmentId: equipment.id }
  setLoading(true)
  try {
    const { data: { records, total } } = await CollectApi.fetchCollectNumberItems(params) as any
    tabledata = checkAlarmState(records) as any
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
fetchCollectNumberItemData({})

function checkAlarmState(data: Record<string, any>[]) {
  const clone: Record<string, any>[] = []
  data.forEach((i: any) => {
    clone.push({
      ...i,
      toMes: i.toMes === null ? null : Number(i.toMes),
      isAlarm: (!!i.maxValue || !!i.minValue) ? 1 : 0,
    })
  })
  return clone
}

function onPageChange(current: number) {
  fetchCollectNumberItemData({ ...basePagination, current })
}
function formatRowIndex(idx: number) {
  const { current, pageSize } = pagination
  return (current - 1) * pageSize + idx + 1
}

async function saveChanged() {
  const clone = JSON.parse(JSON.stringify(unref(tabledata)))
  const { code } = await CollectApi.saveCollectNumberItems(clone) as any
  if (code !== 0) {
    Message.error('保存失败')
  }
  else {
    Message.success('保存成功')
    onPageChange(pagination.current)
  }
}

function reset() {
  onPageChange(pagination.current)
}

defineExpose({
  saveChanged,
  reset,
})
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
      />
      <a-table-column
        title="是否告警"
        :width="150"
        data-index="isAlarm"
        align="center"
      >
        <template #cell="{ record }">
          <a-select
            v-model="record.isAlarm" allow-clear placeholder="请选择..."
            @change="() => { record.maxValue = undefined; record.minValue = undefined; }"
          >
            <a-option :value="1" label="是" />
            <a-option :value="0" label="否" />
          </a-select>
        </template>
      </a-table-column>
      <a-table-column
        title="最大值"
        data-index="maxValue"
        align="center"
      >
        <template #cell="{ record }">
          <a-input-number v-if="record.isAlarm" v-model="record.maxValue" placeholder="请输入最大值..." allow-clear />
          <a-input-number v-else :disabled="true" placeholder="请输入最大值..." />
        </template>
      </a-table-column>
      <a-table-column
        title="最小值"
        data-index="minValue"
        align="center"
      >
        <template #cell="{ record }">
          <a-input-number v-if="record.isAlarm" v-model="record.minValue" placeholder="请输入最小值..." allow-clear />
          <a-input-number v-else :disabled="true" placeholder="请输入最小值..." />
        </template>
      </a-table-column>
      <a-table-column
        title="是否传给MES"
        data-index="toMes"
        align="center"
      >
        <template #cell="{ record }">
          <a-select
            v-model="record.toMes" placeholder="请选择..."
            allow-clear @clear="() => record.toMes = null"
          >
            <a-option :value="1" label="是" />
            <a-option :value="0" label="否" />
          </a-select>
        </template>
      </a-table-column>
    </template>
  </a-table>
</template>

