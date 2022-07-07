type EChartsOption = echarts.EChartsOption

export interface DataItem {
  name: string
  value: [string, number]
}

let now = new Date(1997, 9, 3)
const oneDay = 24 * 3600 * 1000
let value = Math.random() * 1000

export function randomData(): DataItem {
  now = new Date(+now + oneDay)
  value = value + Math.random() * 21 - 10
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value),
    ],
  }
}

export function generateChartData() {
  const data: DataItem[] = []
  for (let i = 0; i < 1000; i++)
    data.push(randomData())
  return data
}

export const defaultOption: EChartsOption = {
  title: {
    show: false,
  },
  legend: {
    show: true,
  },
  tooltip: {
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
  series: [],
}
