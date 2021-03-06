interface CollectItem {
  id?: number
  equipmentId?: number
  paramName?: string
  toMes?: boolean
}

export interface CollectItemNumber extends CollectItem {
  index?: number
  devName?: string
  paramUnit?: string
  precision?: number
  minValue?: number
  maxValue?: number
}

export interface CollectItemStatus extends CollectItem {
  position?: string
  alarmValue?: number
}
