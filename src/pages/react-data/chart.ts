type EChartsOption = echarts.EChartsOption

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
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false,
    },
  },
  series: [],
}
