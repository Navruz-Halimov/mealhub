class Orders {
  constructor (http) {
    this.http = http
  }

  async getById (orderId) {
    const url = `/profile/orders/view/${orderId}`
    const result = await this.http.get(url)
    return result.data.order
  }

  async changeType (orderId, newType) {
    const url = `/profile/orders/${orderId}/change-type`
    const body = { order_type: newType }
    const { data } = await this.http.post(url, body)
    return data
  }

  async changeTypeToPreorder (orderId) {
    const type = 'pre_order'
    return await this.changeType(orderId, type)
  }
}

export default Orders
