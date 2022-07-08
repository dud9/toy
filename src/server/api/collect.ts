export class CollectApi {
  static fetchCollectNumberItems(query: Record<string, any>) {
    return useRequest.get('/collectItem/select', { urlAdd: query })
  }

  static fetchCollectStatusItems(query: Record<string, any>) {
    return useRequest.get('/statusItem/select', { urlAdd: query })
  }

  static saveCollectNumberItems(params: Record<string, any>) {
    return useRequest.post('/collectItem/updateByBatch', { body: params })
  }
}
