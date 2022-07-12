<script setup lang="ts">
import { IconEmpty } from '@arco-design/web-vue/es/icon'
import type { DataItem } from '../chart'
import { defaultOption, generateChartData, randomData } from '../chart'
import type { CollectItemNumber, Equipment } from '~/types'

const {
  equipment = {},
  wrapperWidth = 0,
  wrapperHeight = 0,
} = defineProps<{
  equipment?: Equipment
  wrapperWidth?: number
  wrapperHeight?: number
}>()
type EChartsOption = echarts.EChartsOption
type EChart = echarts.ECharts

let collectNumberOptions = $ref([])
async function getCollectNumberOptions() {
  if (!equipment?.id)
    return
  const { data: { records } } = await CollectApi.fetchCollectNumberItems({ equipmentId: equipment.id })
  collectNumberOptions = records.map((i: CollectItemNumber) => ({ label: i.paramName, value: i.id })) || []
}
getCollectNumberOptions()

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
  // reactChart = echarts.init(refChart.value) as EChart
  // chartOption.value && reactChart.setOption(chartOption.value)
  // useIntervalFn(fetchReactChartData, 5000)
})

let showChart = $ref(false)
function fetchReactChartData() {
  const data = chartData.value
  for (let i = 0; i < 10; i++) {
    data.shift()
    data.push(randomData())
  }

  if (!reactChart) {
    reactChart = echarts.init(refChart.value) as EChart
    chartOption.value && reactChart.setOption(chartOption.value)
  }
  else {
    reactChart.setOption<EChartsOption>({
      series: [
        {
          data: chartData.value,
        },
      ],
    })
  }
  showChart = true
  useIntervalFn(fetchReactChartData, 5000)
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
        :style="{ width: '60%' }" multiple :limit="5"
        placeholder="请选择属性..." allow-clear
      >
        <a-option
          v-for="{ label, value }, idx in collectNumberOptions"
          :key="idx" :label="label" :value="value"
        />
      </a-select>
      <a-button type="primary" ml-4 font-bold @click="fetchReactChartData">
        查询
      </a-button>
      <a-button ml-2 font-bold>
        重置
      </a-button>
    </div>
    <div w-full h-full flex justify-center items-center>
      <div v-show="showChart" ref="refChart" class="!w-full !h-full" />
      <a-empty
        v-show="!showChart" w-full h-full
        flex="~ col" justify-center items-center mb-50px
      >
        <template #image>
          <IconEmpty :size="100" />
        </template>
        <div text-30px font-bold>
          请选择属性
        </div>
      </a-empty>
    </div>
  </div>
</template>
