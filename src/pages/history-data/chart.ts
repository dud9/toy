type EChartsOption = echarts.EChartsOption

export type DataItem = [Date, number][]

export const defaultOption: EChartsOption = {
  title: {
    show: false,
  },
  legend: {
    show: true,
    textStyle: {
      color: unref(isDark) ? '#fff' : '#333',
    },
  },
  toolbox: {
    show: false,
  },
  tooltip: {
    backgroundColor: unref(isDark) ? '#232324' : '#fff',
    borderColor: unref(isDark) ? '#232324' : '#fff',
    textStyle: {
      color: unref(isDark) ? '#fff' : '#333',
    },
    trigger: 'axis',
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false,
    },
    maxInterval: 3600 * 1000,
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false,
    },
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100,
    },
    {
      start: 0,
      end: 100,
    },
  ],
  series: [
    {
      type: 'line',
      smooth: true,
      symbol: 'none',
    },
  ],
}
