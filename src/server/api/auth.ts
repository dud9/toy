export class AuthApi {
  static login(params: Record<string, any>) {
    return useRequest.get('/authApi/login', { urlAdd: params })
  }

  static updatePassword(params: Record<string, any>) {
    return useRequest.post('/authApi/password', { body: params })
  }
}
