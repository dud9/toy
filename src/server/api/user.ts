export class UserApi {
  static fetchUserList(query: Record<string, any>) {
    return useRequest.get('/userApi/user', { urlAdd: query })
  }

  static deleteUserById(params: { id?: number }) {
    return useRequest.delete('/userApi/user', { urlAdd: params })
  }

  static addUser(params: Record<string, any>) {
    return useRequest.post('/userApi/user', { body: params })
  }

  static updateUser(params: Record<string, any>) {
    return useRequest.put('/userApi/user', { body: params })
  }

  static updateAvatar(params: Record<string, any>) {
    return useRequest.post('/userApi/avatar', { body: params })
  }
}
