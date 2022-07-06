export class MenuApi {
  static fetchMenuList() {
    return useRequest.get('/menuApi/tree', {})
  }
}
