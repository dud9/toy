export class EquipmentApi {
  static fetchEquipmentOnlineState() {

  }

  static fetchEquipmentByIp(params: Record<string, string>) {
    return useRequest.get('/equipment/selectByIp', { urlAdd: params })
  }

  static updateEquipmentInformation(params: Record<string, string>) {
    return useRequest.post('/equipment/update', { body: params })
  }
}
