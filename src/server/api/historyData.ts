export class HistoryDataApi {
  static fetchHistoryChartData(params: Record<string, any>) {
    return useRequest.get('/data/data', { urlAdd: params })
  }
}
