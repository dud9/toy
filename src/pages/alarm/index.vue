<script setup lang="ts">
import { IconArrowRise } from '@arco-design/web-vue/es/icon'
import AlarmSearchForm from './components/AlarmSearchForm.vue'
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

const itemTypeOptions = [
  { value: 'collect', label: '数值型' },
  { value: 'status', label: '状态型' },
]

let alarmCnt = $ref({
  total: 0,
  number: 0,
  status: 0,
})
async function fetchAlarmCnt() {
  const { data } = await AlarmApi.fetchAlarmCnt() as any
  alarmCnt = data
}
fetchAlarmCnt()

async function fetchAlarmData(params: Record<string, any>) {
  params = { ...basePagination, ...params }
  setLoading(true)
  try {
    const { data: { records, total } } = await AlarmApi.fetchAlarmList(params) as any
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
        <div grid="~ xs:cols-2 sm:cols-3 md:cols-4 lg:cols-5">
          <div flex items-center>
            查询告警
          </div>
          <div flex items-center font-bold>
            <span mr-4 op-80>告警总计</span>
            <a-statistic :value="alarmCnt.total" :precision="0" :value-from="0" :start="true" animation :value-style="{ color: '#0fbf60' }">
              <template #prefix>
                <IconArrowRise />
              </template>
              <template #suffix>
                条
              </template>
            </a-statistic>
          </div>
          <div flex items-center font-bold lt-md:hidden>
            <span mr-4 op-80>数值型告警</span>
            <a-statistic :value="alarmCnt.number" :precision="0" :value-from="0" :start="true" animation :value-style="{ color: '#f59e0b' }">
              <template #prefix>
                <IconArrowRise />
              </template>
              <template #suffix>
                条
              </template>
            </a-statistic>
          </div>
          <div flex items-center font-bold lt-md:hidden>
            <span mr-4 op-80>状态型告警</span>
            <a-statistic :value="alarmCnt.status" :precision="0" :value-from="0" :start="true" animation :value-style="{ color: '#e11d48' }">
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
      <AlarmSearchForm ref="refSearchForm" :item-type-options="itemTypeOptions" @fetchData="fetchAlarmData" />
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
            title="设备名称"
            data-index="devName"
            align="center"
          />
          <a-table-column
            title="数据类型"
            data-index="itemType"
            align="center"
          >
            <template #cell="{ record }">
              <span v-if="record.itemType === 'collect'" font-bold text-yellow-500> 数值型告警 </span>
              <span v-else font-bold text-red-500> 状态型告警</span>
            </template>
          </a-table-column>
          <a-table-column
            title="采集项名称"
            data-index="paramName"
            align="center"
          />
          <a-table-column
            title="告警内容"
            data-index="content"
            align="center"
          />
          <a-table-column
            title="告警时间"
            data-index="time"
            align="center"
          >
            <template #cell="{ record }">
              {{ formartDate(record.time) }}
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
