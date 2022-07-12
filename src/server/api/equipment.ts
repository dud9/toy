export class EquipmentApi {
  static fetchEquipmentOnlineState(params: Record<string, string>) {
    return useRequest.get('/equipment/status', { urlAdd: params })
  }

  static fetchEquipmentByIp(params: Record<string, string>) {
    return useRequest.get('/equipment/selectByIp', { urlAdd: params })
  }

  static updateEquipmentInformation(params: Record<string, string>) {
    return useRequest.post('/equipment/update', { body: params })
  }
}
