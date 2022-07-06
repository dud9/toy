export class UserApi {
  static fetchUserList(query: Record<string, any>) {
    return useRequest.get('/userApi/user', { urlAdd: query })
  }

  static deleteUserById(params: { id?: number }) {
    return useRequest.delete('/userApi/user', { urlAdd: params })
  }
}
