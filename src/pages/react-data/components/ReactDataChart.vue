<script setup lang="ts">
import { IconEmpty } from '@arco-design/web-vue/es/icon'
import type { Pausable } from '@vueuse/core'
import { defaultOption } from '../chart'
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

const REFRESH_INTERVAL = 10 * 1000

let collectNumberOptions = $ref([])
let itemNameMap = $ref<Record<number, string>>({})
async function getCollectNumberOptions() {
  if (!equipment?.id)
    return
  const { data: { records } } = await CollectApi.fetchCollectNumberItems({ equipmentId: equipment.id })
  collectNumberOptions = records.map((i: CollectItemNumber) => ({ label: i.paramName, value: i.id })) || []
  const nameMap: Record<number, string> = {}
  records.forEach((i: CollectItemNumber) => {
    nameMap[i.id!] = i.paramName!
  })
  itemNameMap = nameMap
}
getCollectNumberOptions()

const refChart = ref()

let showChart = $ref(false)
let chartData = $ref<Record<number, Record<string, any>>>()
let selectedItemIdList = $ref<number[]>([])

const chartOption = computed(() => {
  if (!selectedItemIdList || selectedItemIdList.length === 0) {
    return {
      ...defaultOption,
    }
  }
  const series: Record<string, any>[] = []
  selectedItemIdList.forEach((i: number) => {
    const data = unref(chartData)[i]?.map((v: Record<string, any>) => (
      [new Date(v.timestamp), Number(v.value.toFixed(2))]
    )) || []
    series.push({
      name: itemNameMap[i] || '',
      type: 'line',
      showSymbol: false,
      data,
    })
  })

  return {
    ...defaultOption,
    series,
  }
})

let reactChart: EChart

let timer: Pausable
const { loading, setLoading } = useLoading()
/**
 * type - 'query' | 'update'
 */
async function fetchReactChartData(type: 'query' | 'update') {
  if (type === 'query') {
    if (reactChart)
      reactChart.dispose()
    showChart = false
    if (timer)
      timer.pause()
  }
  if (!equipment?.id)
    return
  if (selectedItemIdList.length === 0)
    return Message.warning('请选择属性')
  if (type === 'query')
    setLoading(true)

  const now = dayJs(new Date())
  const { data } = await ReactDataApi.fetchReactData({
    start: now.subtract(8, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    stop: now.format('YYYY-MM-DD HH:mm:ss'),
    equipmentId: equipment.id,
    itemIdList: selectedItemIdList,
    itemType: 'collect',
  }) as any

  chartData = data

  if (type === 'query') {
    showChart = true
    useTimeoutFn(() => {
      reactChart = echarts.init(refChart.value) as EChart
      chartOption.value && reactChart.setOption(chartOption.value)
    }, 50)
  }
  else {
    chartOption.value && reactChart.setOption(chartOption.value)
  }

  if (type === 'query') {
    if (!timer)
      timer = useIntervalFn(() => fetchReactChartData('update'), REFRESH_INTERVAL)
    else
      timer.resume()
    useTimeoutFn(() => setLoading(false), 1000)
  }
}

function reset() {
  // 销毁 Echarts 实例
  if (reactChart)
    reactChart.dispose()
  if (timer)
    timer.pause()
  showChart = false
  selectedItemIdList = []
}

function resizeChart() {
  if (!reactChart)
    return
  reactChart?.resize()
}
const debouncedResizeChart = useDebounceFn(resizeChart, 500, { maxWait: 3000 })
watch([() => wrapperWidth, () => wrapperHeight], debouncedResizeChart)

watch(isDark, (val) => {
  if (!showChart || !reactChart)
    return
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
        v-model="selectedItemIdList"
        :style="{ width: '60%' }" multiple :limit="5"
        placeholder="请选择属性..." allow-clear
      >
        <a-option
          v-for="{ label, value }, idx in collectNumberOptions"
          :key="idx" :label="label" :value="value"
        />
      </a-select>
      <a-button type="primary" ml-4 font-bold @click="fetchReactChartData('query')">
        查询
      </a-button>
      <a-button ml-2 font-bold @click="reset">
        重置
      </a-button>
    </div>
    <a-spin :loading="loading" dot tip="正在加载中..." w-full h-full>
      <div w-full h-full flex justify-center items-center>
        <div v-show="showChart" ref="refChart" class="!w-full !h-full" />
        <a-empty
          v-show="!loading && !showChart" w-full h-full
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
    </a-spin>
  </div>
</template>

<style scoped>
:deep(.arco-spin-mask) {
  background-color: transparent !important;
}
</style>
