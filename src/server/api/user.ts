export class UserApi {
  static fetchUserList(query: Record<string, any>) {
    return useRequest.get('/userApi/user', { urlAdd: query })
  }
}
