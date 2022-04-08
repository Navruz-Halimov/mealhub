class ReserveInfo {
  constructor ({
    date,
    time,
    tables,
    halls,
    comment,
    occasion,
    event,
    personQuantity,
    reserveHall,
    reserveAll
  }) {
    this.date = date
    this.time = time

    if (tables) { this.tables = this.getStringWithId(tables) }
    if (halls) { this.halls = this.getStringWithId(halls) }
    if (comment) { this.comment = comment }
    if (occasion) { this.occasion = occasion }
    if (event) { this.event = event }
    if (personQuantity) { this.person_quantity = personQuantity }
    if (reserveHall) { this.reserve_hall = reserveHall }
    if (reserveAll) { this.reserve_all = reserveAll }
  }

  getStringWithId (items) {
    return items
      .map(item => item.id)
      .join(',')
  }
}

class Reservation {
  constructor (http) {
    this.http = http
  }

  async create (cateringId, info) {
    const url = `/catering/${cateringId}/reserve/create`
    const body = new ReserveInfo(info)
    const { data } = await this.http.post(url, body)
    return data.reserve
  }

  async reserveToOrder (cateringId, orderId, reserveId, personQuantity) {
    const url = `/catering/${cateringId}/order/reserve-to-order/${orderId}`
    const body = {
      reserve_id: reserveId,
      person_quantity: personQuantity
    }
    const data = await this.http.post(url, body)
    return data
  }

  async getHallsWithTables (cateringId) {
    const url = `/catering/${cateringId}/reserve/halls-with-tables-list`
    const { data } = await this.http.get(url)
    return data
  }

  async getOccasionsList (cateringId) {
    const url = `/catering/${cateringId}/reserve/occasion-list`
    const { data } = await this.http.get(url)
    return data.items
  }
}

export default Reservation
