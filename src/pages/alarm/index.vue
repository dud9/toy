<script setup lang="ts">
import AlarmSearchForm from './components/AlarmSearchForm.vue'
import type { Pagination, SelectOptionData } from '~/types'

const { loading, setLoading } = useLoading()
let tabledata = $ref([])
const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}
const pagination = reactive({
  ...basePagination,
})

let alarmLevelOptions = $ref<SelectOptionData[]>()
function fetchAlarmLevelOptions() {
  const { code, data } = AlarmApi.fetchAlarmLevelOptions()
  if (code === 0)
    alarmLevelOptions = data
}
fetchAlarmLevelOptions()

function fetchAlarmData(params: Record<string, any>) {
  params = { ...basePagination, ...params }
  setLoading(true)
  try {
    const { data } = AlarmApi.fetchAlarmList()
    tabledata = data as any
    pagination.current = params.current
    pagination.total = data.length
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
  fetchAlarmData({ ...params, ...basePagination, current })
}
function formartDate(date?: Date) {
  return date
    ? dayJs(date).format('YYYY-MM-DD HH:mm:ss')
    : ''
}
function formatRowIndex(idx: number) {
  const { current, pageSize } = pagination
  return (current - 1) * pageSize + idx + 1
}
</script>

<template>
  <div>
    <PageHeader />
    <a-card>
      <template #title>
        <div grid="~ cols-5" wrap>
          <span mr-10>查询告警</span>
          <span>共计: 1000</span>
          <span>严重告警: 1000</span>
          <span>轻微告警: 1000</span>
        </div>
      </template>
      <AlarmSearchForm ref="refSearchForm" :alarm-level-options="alarmLevelOptions" @fetchData="fetchAlarmData" />
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="tabledata"
        :bordered="false"
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
            title="名称"
            data-index="name"
            align="center"
          />
          <a-table-column
            title="角色描述"
            data-index="description"
            align="center"
          />
          <a-table-column
            title="创建时间"
            data-index="createTime"
            align="center"
          >
            <template #cell="{ record }">
              {{ formartDate(record.createTime) }}
            </template>
          </a-table-column>
          <a-table-column
            title="修改时间"
            data-index="updateTime"
            align="center"
          >
            <template #cell="{ record }">
              {{ formartDate(record.updateTime) }}
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
