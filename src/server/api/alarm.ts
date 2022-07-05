export class AlarmApi {
  static fetchAlarmList() {
    return {
      code: 0,
      data: [
        {
          id: 1,
          equipName: '数控拼焊C',
          alarmLevel: 2,
          alarmContent: '设备故障',
          alarmTime: new Date('2022-06-19 09:42:35'),
        },
        {
          id: 2,
          equipName: '数控拼焊C',
          alarmLevel: 1,
          alarmContent: '设备故障',
          alarmTime: new Date('2022-06-19 09:42:35'),
        },
        {
          id: 3,
          equipName: '数控拼焊A',
          alarmLevel: 1,
          alarmContent: '设备故障',
          alarmTime: new Date('2022-06-19 09:42:35'),
        },
        {
          id: 4,
          equipName: '数控拼焊C',
          alarmLevel: 1,
          alarmContent: '设备故障',
          alarmTime: new Date('2022-06-19 09:42:35'),
        },
      ],
    }
  }

  static fetchAlarmLevelOptions() {
    return {
      code: 0,
      data: [
        { label: '轻微告警', value: 1 },
        { label: '严重告警', value: 2 },
      ],
    }
  }
}
