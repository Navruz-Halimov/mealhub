class Cart {
  constructor (http) {
    this.http = http
  }

  async updateDishComment (dishId, comment) {
    const url = `/cart/${dishId}/update-comment`
    const body = { comment }
    const { data } = await this.http.post(url, body)
    return data.cart
  }

  async updateCartComment (orderId, comment) {
    const url = `/profile/orders/${orderId}/update-comment`
    const body = { comment }
    const { data } = await this.http.post(url, body)
    return data
  }
}

export default Cart
