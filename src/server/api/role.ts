export class RoleApi {
  static fetchRoleList(query: Record<string, any>) {
    return useRequest.get('/roleApi/role', { urlAdd: query })
  }

  static deleteRoleById(params: { id?: number }) {
    return useRequest.delete('/roleApi/role', { urlAdd: params })
  }

  static addRole(params: Record<string, any>) {
    return useRequest.post('/roleApi/role', { body: params })
  }

  static updateRole(params: Record<string, any>) {
    return useRequest.put('/roleApi/role', { body: params })
  }
}
