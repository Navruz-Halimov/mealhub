import Reservation from './reservation'
import Orders from './orders'
import Catering from './catering'
import Cart from './cart'

class Database {
  constructor (http) {
    this.http = http
    this.reservation = new Reservation(http)
    this.orders = new Orders(http)
    this.catering = new Catering(http)
    this.cart = new Cart(http)
  }
}

export default Database
