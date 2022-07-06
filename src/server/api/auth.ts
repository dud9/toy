export class AuthApi {
  static login(params: Record<string, any>) {
    return useRequest.get('/authApi/login', { urlAdd: params })
  }
}
