export class EquipmentApi {
  static fetchEquipmentByIp(params: Record<string, string>) {
    return useRequest.get('/equipment/selectByIp', { urlAdd: params })
  }
}
