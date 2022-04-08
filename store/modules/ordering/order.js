import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  currentCateringOrder: {},
  copiedCateringOrder: null,
  orderTypes: {},
  deliveryInfo: {},
  selectedCard: null,
  otherPayments: []
})

const getters = {
  CURRENT_CATERING_ORDER: state => state.currentCateringOrder,
  COPIED_CATERING_ORDER: state => state.copiedCateringOrder,
  ORDER_TYPES: state => state.orderTypes,
  ORDER_DELIVERY_INFO: state => state.deliveryInfo,
  SELECTED_CARD: state => state.selectedCard,

  OTHER_PAYMENTS: state => state.otherPayments
}

const mutations = {
  SET_SELECTED_CARD: (state, val) => {
    state.selectedCard = val
  },
  SET_CURRENT_CATERING_ORDER: (state, newOrder) => {
    state.currentCateringOrder = newOrder
  },
  SET_COPIED_CATERING_ORDER: (state, newOrder) => {
    state.copiedCateringOrder = newOrder
  },
  RESET_COPIED_CATERING_ORDER: (state) => {
    state.copiedCateringOrder = null
  },
  SET_CURRENT_CATERING_ORDER_TYPES: (state, types) => {
    state.orderTypes = types
  },
  SET_CURRENT_CATERING_ORDER_DELIVERY_INFO: (state, deliveryInfo) => {
    state.deliveryInfo = deliveryInfo
  },

  SET_OTHER_PAYMENTS: (state, paymentsList) => {
    state.otherPayments = [...paymentsList]
  }
}

const actions = {

  /**
   * ОБЩИЕ ФУНКЦИИ
  */

  // Доступные типы заказа
  async GET_ORDER_TYPES ({ commit }, { cookiz, id }) {
    let res
    try {
      res = await axios.get(`${apiAddress(this)}/catering/${id}/order/get-order-types`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING_ORDER_TYPES', data.available_types)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('GET_ORDER_TYPES', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },
  // Информация о заказе
  async GET_CURRENT_CATERING_ORDER ({ commit }, { cookiz, id, orderID }) {
    let res

    try {
      res = await axios.get(`${apiAddress(this)}/catering/${id}/order/get-order/${orderID}`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_ORDER', data.order)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('GET_CURRENT_CATERING_ORDER', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },

  // 0. Создание заказа по типпу (reserve_table / pre_order / go_and_eat / delivery / pickup )
  async CREATE_CURRENT_CATERING_ORDER ({ commit }, { cookiz, id, orderType, personQuantity }) {
    let res

    const formData = {
      order_type: orderType,
      person_quantity: personQuantity
    }

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/order/create`, formData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING_ORDER', data.order)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('CREATE_CURRENT_CATERING_ORDER', err)
      return Promise.reject(err.response)
    }

    return res
  },

  // 1. Добавление содержимого корзины в заказ
  async CART_TO_CURRENT_CATERING_ORDER ({ commit }, { cookiz, id, orderID, personQuantity }) {
    let res

    const formData = personQuantity ? {
      person_quantity: personQuantity
    } : {}

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/order/cart-to-order/${orderID}`, formData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING_ORDER', data.order)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('CART_TO_CURRENT_CATERING_ORDER', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },

  /**
   *        Доставка
   */

  // 2. Добавление информация о доставке в заказ. Зависит от установленого в настройках заведения типа (Всегда бесплатно, В зависимости от растояния, В зависимости от сумы заказа)
  async DELIVERY_TO_CURRENT_CATERING_ORDER ({ commit }, { cookiz, id, orderID, form }) {
    let res

    console.warn(form)

    const formData = form || {
      // Способ получения. Возможно 2 варианта: Самовывоз(pickup) или Доставка(address)
      delivery_type: form.delivery_type || 'pickup',

      // Id сохраненного адреса пользователя если указан способ получения address
      user_address_id: form.user_address_id || 2,
      // или
      // Адрес доставки в виде строки если если не указан Id сохраненного адреса
      address: form.address || "Kosmonavta Popova St, 11/3, Kirovohrad, Kirovohrads'ka oblast, Ukraine, 25000",

      city: form.city || 'Kirovohrad', // Город пользователя. указывается если пустой адрес или id сохраненного адреса
      street: form.street || 'Kosmonavta Popova St', // Улица пользователя. указывается если пустой адрес или id сохраненного адреса
      house: form.house || '11/3', // Дом пользователя. указывается если пустой адрес или id сохраненного адреса

      latitude: form.latitude || '48.379433', // Широта локации пользователя
      longitude: form.longitude || '40.2204802', // Долгода локации пользователя
      country_id: form.country_id || 160 // Страна
    }

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/order/delivery-to-order/${orderID}`, formData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING_ORDER', data.order)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        throw err
      }

      console.error('DELIVERY_TO_CURRENT_CATERING_ORDER', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },
  // Информация о доставке
  async GET_ORDER_DELIVERY_INFO ({ commit }, { cookiz, id, coords }) {
    let res

    try {
      const url = `${apiAddress(this)}/catering/${id}/order/get-delivery-info`
      const reqData = { latitude: coords.latitude, longitude: coords.longitude }

      res = await axios.post(url, reqData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING_ORDER_DELIVERY_INFO', data.delivery_info)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        throw err
      }

      console.error('GET_ORDER_DELIVERY_INFO', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },

  // 2. Добавление информация о доставке в заказ. Зависит от установленого в настройках заведения типа (Всегда бесплатно, В зависимости от растояния, В зависимости от сумы заказа)
  async PICKUP_TO_CURRENT_CATERING_ORDER ({ commit }, { cookiz, id, orderID, form }) {
    let res

    console.warn(form)

    const formData = form || {
      date: form.date || '2021-05-05',
      time: form.time || '14:00',
      comment: form.comment || ''
    }

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/order/pickup-to-order/${orderID}`, formData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING_ORDER', data.order)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('PICKUP_TO_CURRENT_CATERING_ORDER', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },

  /**
  *      Резерв
  */

  // Добавление информация о Резерве в заказ
  async RESERVE_TO_CURRENT_CATERING_ORDER ({ commit }, { cookiz, id, orderID, reserveID }) {
    let res

    console.warn(reserveID)

    const formData = {}

    //   reserve_id: reserveID
    if (reserveID !== undefined) { formData.reserve_id = reserveID }

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/order/reserve-to-order/${orderID}`, formData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING_ORDER', data.order)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('RESERVE_TO_CURRENT_CATERING_ORDER', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },

  // 3. Оплата заказа
  async PAY_CURRENT_CATERING_ORDER ({ commit }, { cookiz, id, orderID, form }) {
    let res

    console.warn(form)

    const formData = {
      payment_type: form.payment_type || 'card', // Оплата картой или через платежную систему (card, payment_system)
      payment_system_id: form.payment_system_id || 1
    }

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/order/pay/${orderID}`, formData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING_ORDER', data.order)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('PAY_CURRENT_CATERING_ORDER', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },
  async GET_PAY_OTHER_METHODS_LIST ({ commit }, { cookiz }) {
    let res

    try {
      res = await axios.get(`${apiAddress(this)}/payments/other-methods-list`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_OTHER_PAYMENTS', data.items)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('GET_PAY_OTHER_METHODS_LIST', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },

  // 4. Проверка корзины для доставки
  async CHECK_CART_FOR_DELIVERY ({ commit }, { cookiz, cateringId, orderType }) {
    let res

    try {
      const url = `${apiAddress(this)}/catering/${cateringId}/order/check-cart-for-current-order`
      const params = `?order_type=${orderType}`
      res = await axios.get(url + params, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
    } catch (err) {
      if (err.response && err.response.status === 422) {
        throw err
      }
    }

    return res
  }
}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
