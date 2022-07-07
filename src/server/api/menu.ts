export class MenuApi {
  static fetchMenuList() {
    return useRequest.get('/menuApi/tree', {})
  }

  static fetchMenuListByRoleId(params: Record<string, number>) {
    return useRequest.get('/menuApi/menus', { urlAdd: params })
  }
}
