export class ReactDataApi {
  static fetchReactData(params: Record<string, any>) {
    return useRequest.get('/data/dataByIdList', { urlAdd: params })
  }
}
