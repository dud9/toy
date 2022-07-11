type EChartsOption = echarts.EChartsOption

export interface DataItem {
  name: string
  value: [string, number]
}

let base = +new Date(1988, 9, 3)
const oneDay = 24 * 3600 * 1000
const data = [[base, Math.random() * 300]]
for (let i = 1; i < 20000; i++) {
  const now = new Date((base += oneDay))
  data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])])
}

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
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      restore: {},
      saveAsImage: {},
    },
  },
  tooltip: {
    backgroundColor: unref(isDark) ? '#232324' : '#fff',
    borderColor: unref(isDark) ? '#232324' : '#fff',
    textStyle: {
      color: unref(isDark) ? '#fff' : '#333',
    },
    trigger: 'axis',
    formatter(params: any) {
      params = params[0]
      const date = new Date(params.name)
      return (
        `${date.getDate()
        }/${
        date.getMonth() + 1
        }/${
        date.getFullYear()
        } : ${
        params.value[1]}`
      )
    },
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
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20,
    },
    {
      start: 0,
      end: 20,
    },
  ],
  series: [
    {
      name: 'test',
      type: 'line',
      smooth: true,
      symbol: 'none',
      data,
    },
  ],
}
