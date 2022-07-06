export class RoleApi {
  static fetchRoleList(query: Record<string, any>) {
    return useRequest.get('/roleApi/role', { urlAdd: query })
  }

  static deleteRoleById(params: { id?: number }) {
    return useRequest.delete('/roleApi/role', { urlAdd: params })
  }
}
