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

async function fetchCollectStatusItemData(params: Record<string, any>) {
  if (!equipment || !equipment.id) {
    Message.error('设备不存在')
    return
  }
  params = { ...basePagination, ...params, equipmentId: equipment.id }
  setLoading(true)
  try {
    const { data: { records, total } } = await CollectApi.fetchCollectStatusItems(params) as any
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
fetchCollectStatusItemData({})

function checkAlarmState(data: Record<string, any>[]) {
  const clone: Record<string, any>[] = []
  data.forEach((i: any) => {
    clone.push({
      ...i,
      toMes: i.toMes === null ? null : Number(i.toMes),
      isAlarm: i.alarmValue === null ? null : Number(i.alarmValue),
    })
  })
  return clone
}

function onPageChange(current: number) {
  fetchCollectStatusItemData({ ...basePagination, current })
}
function formatRowIndex(idx: number) {
  const { current, pageSize } = pagination
  return (current - 1) * pageSize + idx + 1
}

async function saveChanged() {
  const clone = JSON.parse(JSON.stringify(unref(tabledata)))
  const { code } = await CollectApi.saveCollectStatusItems(clone) as any
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
          <span font-bold text="![rgb(var(--primary-6))]">状态型</span>
        </template>
      </a-table-column>
      <a-table-column
        title="位置"
        data-index="position"
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
            @change="(value: any) => {
              record.alarmValue = value === 1
                ? true
                : value === 0
                  ? false
                  : null
            }"
          >
            <a-option :value="1" label="是" />
            <a-option :value="0" label="否" />
          </a-select>
        </template>
      </a-table-column>
      <a-table-column
        title="是否传给MES"
        data-index="toMes"
        align="center"
      >
        <template #cell="{ record }">
          <a-select
            v-model="record.toMes" placeholder="请选择是否传给MES..."
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

