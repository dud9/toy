<script setup lang="ts">
import { IconEmpty } from '@arco-design/web-vue/es/icon'
import type { DataItem } from '../chart'
import { defaultOption } from '../chart'
import type { CollectItemNumber, Equipment } from '~/types'

type EChartsOption = echarts.EChartsOption
type EChart = echarts.ECharts

const dayjs = dayJs
const { equipIp } = useAppStore()
let equipment = $ref<Equipment>()
async function getEquipmentInfo() {
  const { data } = await EquipmentApi.fetchEquipmentByIp({ ip: equipIp }) as any
  equipment = data
}
getEquipmentInfo()

const refChart = ref()

let itemOptions = $ref<Record<string, any>>([])
async function fetchItemOptions() {
  const { data: { records } } = await CollectApi.fetchCollectNumberItems({}) as any
  itemOptions = records.map((i: CollectItemNumber) => ({ value: i.id, label: i.paramName })) || []
}
fetchItemOptions()

const baseSearchForm = {
  datePicker: '',
  itemId: '',
}
const searchForm = ref({
  ...baseSearchForm,
})
function checkSearchForm() {
  const { datePicker, itemId } = searchForm.value
  return [datePicker, itemId].every(i => i && i !== '')
}
function getSearchParams() {
  const { datePicker, itemId } = searchForm.value
  const start = `${datePicker} 00:00:00`
  const stop = `${datePicker} 23:59:59`

  return {
    start,
    stop,
    itemId: Number(itemId),
    equipmentId: equipment.id,
    itemType: 'collect',
  }
}

const { bool: showChart, setBool } = useBoolean()

let chartData = $ref<DataItem[]>([])
async function fetchChartData() {
  if (!equipment?.id) {
    Message.error('设备不存在')
    return
  }
  if (!checkSearchForm()) {
    setBool(false)
    Message.error('请选择日期和属性')
    return
  }
  chartData = []
  const { data } = await HistoryDataApi.fetchHistoryChartData({
    ...getSearchParams(),
  }) as any
  if (data?.length > 0)
    chartData = data.map((i: Record<string, any>) => ([new Date(i.timestamp), i.value]))

  setBool(true)
  useTimeoutFn(() => {
    renderChart()
  }, 200)
}

function reset() {
  setBool(false)
  searchForm.value = {
    ...baseSearchForm,
  }
}

let reactChart: EChart
function renderChart() {
  const { itemId } = searchForm.value
  const name = itemOptions.filter((i: Record<string, any>) => i.value === itemId)[0]?.label || ''
  const chartOption = {
    ...defaultOption,
    series: [
      {
        name,
        type: 'line',
        showSymbol: false,
        data: chartData,
      },
    ],
  }
  reactChart = echarts.init(refChart.value) as EChart
  reactChart.setOption(chartOption)
}

function resizeChart() {
  if (!reactChart)
    return
  reactChart?.resize()
}

const { width, height } = useWindowSize()
const debouncedResizeChart = useDebounceFn(resizeChart, 200, { maxWait: 3000 })
watch([width, height], debouncedResizeChart)

watch(isDark, (val) => {
  reactChart.setOption<EChartsOption>({
    legend: {
      textStyle: {
        color: val ? '#fff' : '#333',
      },
    },
    tooltip: {
      backgroundColor: unref(isDark) ? '#232324' : '#fff',
      borderColor: unref(isDark) ? '#232324' : '#fff',
      textStyle: {
        color: unref(isDark) ? '#fff' : '#333',
      },
    },
  })
})
</script>

<template>
  <div w-full h-full of-hidden flex="~ col">
    <div my-20px flex justify-center items-center>
      <span mr-4 text="xl [rgb(var(--primary-6))]" font-bold lt-md:hidden>日期:</span>
      <a-date-picker
        v-model="searchForm.datePicker"
        :disabled-date="(current: any) => dayjs(current).isAfter(dayjs())"
        style="width: 20%;" mr-5
      />
      <span mr-4 text="xl [rgb(var(--primary-6))]" font-bold lt-md:hidden>属性:</span>
      <a-select
        v-model="searchForm.itemId"
        :style="{ width: '20%' }" allow-search
        placeholder="请选择属性..." allow-clear
      >
        <a-option
          v-for="{ label, value }, idx in itemOptions" :key="idx"
          :label="label"
          :value="value"
        />
      </a-select>
      <a-button type="primary" ml-5 font-bold @click="fetchChartData">
        查询
      </a-button>
      <a-button ml-3 font-bold @click="reset">
        重置
      </a-button>
    </div>
    <div w-full h-full flex justify-center items-center>
      <div v-show="showChart" ref="refChart" class="!w-full !h-full !min-h-300px" />
      <a-empty
        v-show="!showChart" w-full h-full
        flex="~ col" justify-center items-center
      >
        <template #image>
          <IconEmpty :size="100" />
        </template>
        <div text-30px font-bold>
          请选择日期和属性
        </div>
      </a-empty>
    </div>
  </div>
</template>
