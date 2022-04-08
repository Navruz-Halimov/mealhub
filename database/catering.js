class Catering {
  constructor (http) {
    this.http = http
  }

  async getById (cateringId) {
    const url = `/catering/detail-view/${cateringId}`
    const result = await this.http.get(url)
    return result.data.item
  }
}

export default Catering
