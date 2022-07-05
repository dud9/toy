<script setup lang="ts">
import { IconArrowRise } from '@arco-design/web-vue/es/icon'
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
        <div grid="~ xs:cols-2 sm:cols-3 md:cols-5">
          <div flex items-center>
            查询告警
          </div>
          <div flex items-center font-bold lt-md:hidden>
            <span mr-4 op-80>告警总计</span>
            <a-statistic :value="1000" :precision="0" :value-from="0" :start="true" animation :value-style="{ color: '#0fbf60' }">
              <template #prefix>
                <IconArrowRise />
              </template>
              <template #suffix>
                条
              </template>
            </a-statistic>
          </div>
          <div flex items-center font-bold lt-sm:hidden>
            <span mr-4 op-80>轻微告警</span>
            <a-statistic :value="453" :precision="0" :value-from="0" :start="true" animation :value-style="{ color: '#f59e0b' }">
              <template #prefix>
                <IconArrowRise />
              </template>
              <template #suffix>
                条
              </template>
            </a-statistic>
          </div>
          <div flex items-center font-bold lt-sm:hidden>
            <span mr-4 op-80>严重告警</span>
            <a-statistic :value="547" :precision="0" :value-from="0" :start="true" animation :value-style="{ color: '#e11d48' }">
              <template #prefix>
                <IconArrowRise />
              </template>
              <template #suffix>
                条
              </template>
            </a-statistic>
          </div>
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
            title="设备名称"
            data-index="equipName"
            align="center"
          />
          <a-table-column
            title="告警等级"
            data-index="alarmLevel"
            align="center"
          >
            <template #cell="{ record }">
              <span v-if="record.alarmLevel === 1" font-bold text-yellow-500>轻微告警</span>
              <span v-else font-bold text-red-500> 严重告警</span>
            </template>
          </a-table-column>
          <a-table-column
            title="告警内容"
            data-index="alarmContent"
            align="center"
          />
          <a-table-column
            title="告警时间"
            data-index="createTime"
            align="center"
          >
            <template #cell="{ record }">
              {{ formartDate(record.alarmTime) }}
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
