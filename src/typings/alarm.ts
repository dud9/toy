export interface Alarm {
  id?: number
  itemId?: number
  itemType?: string
  equipmentId?: Date
  index?: Date
  devName?: string
  paramName?: string
  paramUnit?: string
  value?: number
  maxValue?: number
  minValue?: number
  time?: Date
}
