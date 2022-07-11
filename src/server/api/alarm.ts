export class AlarmApi {
  static fetchAlarmList(params: Record<string, any>) {
    return useRequest.get('/data/alarmData', { urlAdd: params })
  }

  static fetchAlarmCnt() {
    return useRequest.get('/data/alarmDataCnt', {})
  }
}
