<script setup lang="ts">
import type { DataItem } from '../chart'
import { defaultOption, generateChartData, randomData } from '../chart'

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
  useIntervalFn(fetchReactChartData, 5000)
})

function fetchReactChartData() {
  const data = chartData.value
  for (let i = 0; i < 10; i++) {
    data.shift()
    data.push(randomData())
  }

  reactChart.setOption<EChartsOption>({
    series: [
      {
        data: chartData.value,
      },
    ],
  })
}

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
      <span mr-4 text="xl [rgb(var(--primary-6))]" font-bold>筛选:</span>
      <a-select
        :default-value="['Beijing', 'Shanghai']"
        :style="{ width: '65%' }" multiple :limit="5"
        placeholder="请选择属性..." allow-clear
      >
        <a-option>Beijing</a-option>
        <a-option :tag-props="{ color: 'red' }">
          Shanghai
        </a-option>
        <a-option>Guangzhou</a-option>
        <a-option disabled>
          Disabled
        </a-option>
        <a-option>Shenzhen</a-option>
        <a-option>Wuhan</a-option>
      </a-select>
      <a-button type="primary" ml-4>
        重置
      </a-button>
    </div>
    <div w-full h-full flex justify-center items-center>
      <div ref="refChart" class="!w-full !h-full" />
    </div>
  </div>
</template>
