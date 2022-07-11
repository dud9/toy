<script setup lang="ts">
import { IconEmpty } from '@arco-design/web-vue/es/icon'
import type { DataItem } from '../chart'
import { defaultOption, generateChartData } from '../chart'
import type { CollectItemNumber } from '~/types'

const {
  wrapperWidth = 0,
  wrapperHeight = 0,
} = defineProps<{
  wrapperWidth?: number
  wrapperHeight?: number
}>()
type EChartsOption = echarts.EChartsOption
type EChart = echarts.ECharts

const refChart = ref()

const baseSearchForm = {
  datePicker: '',
  itemId: '',
}
const searchForm = reactive({
  ...baseSearchForm,
})
const showChart = computed(() => {
  const { datePicker, itemId } = searchForm
  return [datePicker, itemId].every(i => i && i !== '')
})

let itemOptions = $ref([])
async function fetchItemOptions() {
  const { data: { records } } = await CollectApi.fetchCollectNumberItems({}) as any
  itemOptions = records.map((i: CollectItemNumber) => ({ value: i.id, label: i.paramName })) || []
}
fetchItemOptions()

const chartData = ref<DataItem[]>(generateChartData())

const chartOption = computed(() => {
  return {
    ...defaultOption,
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        showSymbol: false,
        data: chartData.value,
      },
    ],
  }
})

let reactChart: EChart
onMounted(() => {
  reactChart = echarts.init(refChart.value) as EChart
  chartOption.value && reactChart.setOption(chartOption.value)
})

function resizeChart() {
  if (!reactChart)
    return
  reactChart?.resize()
}
const debouncedResizeChart = useDebounceFn(resizeChart, 500, { maxWait: 3000 })
watch([() => wrapperWidth, () => wrapperHeight], debouncedResizeChart)

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
      <a-date-picker v-model="searchForm.datePicker" style="width: 20%;" mr-5 />
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
      <a-button type="primary" ml-5 font-bold>
        查询
      </a-button>
      <a-button ml-3 font-bold>
        重置
      </a-button>
    </div>
    <div w-full h-full flex justify-center items-center>
      <div v-show="showChart" ref="refChart" class="!w-full !h-full" />
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
