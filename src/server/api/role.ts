export class RoleApi {
  static fetchRoleList(query: Record<string, any>) {
    return useRequest.get('/roleApi/role', { urlAdd: query })
  }
}
