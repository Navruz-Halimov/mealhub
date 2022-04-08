import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  current_order: {},
  current_orders: [],
  history_orders: [],
  isCurrentOrdersLoaded: false,
  isHistoryLoaded: false
})

const getters = {
  CURRENT_ORDER: state => state.current_order,
  CURRENT_ORDERS: state => state.current_orders,
  HISTORY_ORDERS: state => state.history_orders,
  IS_CURRENT_ORDERS_LOADED: state => state.isCurrentOrdersLoaded,
  IS_HISTORY_LOADED: state => state.isHistoryLoaded
}

const mutations = {
  SET_CURRENT_ORDER: (state, order) => {
    state.current_order = order
  },
  SET_CURRENT_ORDERS: (state, orders) => {
    state.current_orders = orders

    if (!state.isCurrentOrdersLoaded) {
      state.isCurrentOrdersLoaded = true
    }
  },
  SET_HISTORY_ORDERS: (state, orders) => {
    state.history_orders = orders

    if (!state.isHistoryLoaded) {
      state.isHistoryLoaded = true
    }
  }
}

const actions = {

  async GET_CURRENT_ORDERS ({ commit }, cookiz) {
    let res

    if (cookiz.get('user_token') === undefined) {
      return Promise.reject(new Error('Unauthorized'))
    }

    try {
      res = await axios.get(`${apiAddress(this)}/profile/orders/get-current-list`, {
        params: {
          limit: 50,
          page: 1
        },
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })

      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_ORDERS', data.items)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('GET_CURRENT_ORDERS', err)
    }

    return res
  },
  async GET_HISTORY_ORDERS ({ commit }, cookiz) {
    let res

    if (cookiz.get('user_token') === undefined) {
      return Promise.reject(new Error('Unauthorized'))
    }

    try {
      res = await axios.get(`${apiAddress(this)}/profile/orders/get-history-list`, {
        params: {
          limit: 50,
          page: 1
        },
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })

      const data = res.data

      if (data.status === 'success') {
        commit('SET_HISTORY_ORDERS', data.items)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('GET_HISTORY_ORDERS', err)
    }

    return res
  },

  async GET_ORDER ({ commit }, { cookiz, orderID }) {
    let res

    if (cookiz.get('user_token') === undefined) {
      return Promise.reject(new Error('Unauthorized'))
    }

    try {
      res = await axios.get(`${apiAddress(this)}/profile/orders/view/${orderID}`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })

      const data = res.data
      if (data && data.status === 'success') {
        res = data
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('GET_ORDER', err)
      res = err
    }
    return res
  },

  async SEND_REPEAT_ORDER ({ dispatch, commit }, { cookiz, cateringId, orderId, personQuantity }) {
    let res
    const data = { person_quantity: personQuantity }

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${cateringId}/order/repeat/${orderId}`, data, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })

      const resData = res.data

      if (resData.status === 'success') {
        dispatch('GET_CURRENT_ORDERS', cookiz)
        dispatch('GET_CART_ITEMS', cookiz)
      } else {
        throw resData
      }
    } catch (err) {
      console.error('REPEAT_ORDER', err)
      return new Promise(resolve => resolve(err))
    }

    return res.data
  },

  async REPEAT_ORDER ({ commit, dispatch }, { cookiz, order, personQuantity }) {
    const orderId = order.id
    const cateringId = order.catering_id

    const res = await dispatch('SEND_REPEAT_ORDER', { cookiz, orderId, cateringId, personQuantity })

    commit('RESET_COPIED_CATERING_ORDER')

    return res.order
  },

  async CALL_REPEAT_ORDER ({ commit, dispatch }, { cookiz, order }) {
    const id = order.catering_id

    commit('SET_COPIED_CATERING_ORDER', order)
    await dispatch('GET_CURRENT_CATERING', { cookiz, id })
    if (order.order_type === 'go_and_eat') {
      commit('SET_GOEATPOPUP', true)
    } else if (order.order_type === 'pickup') {
      commit('SET_PICKUPPOPUP', true)
    } else if (order.order_type === 'delivery') {
      commit('SET_DELIVERY_POPUP_WORK')
    } else if (order.order_type === 'reserve_table') {
      commit('SET_RESERVATION_POPUP', true)
    } else if (order.order_type === 'pre_order') {
      commit('SET_PREORDER_POPUP', true)
    }
  },

  async CANCEL_ORDER ({ dispatch }, { cookiz, order, reason }) {
    let res

    if (cookiz.get('user_token') === undefined) {
      return Promise.reject(new Error('Unauthorized'))
    }

    let formData = null
    if (reason) {
      formData = {
        cancel_reason: reason
      }
    }

    try {
      res = await axios.post(`${apiAddress(this)}/profile/orders/cancel/${order.id}`, formData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        dispatch('GET_CURRENT_ORDERS', cookiz)
      } else {
        throw data
      }
    } catch (err) {
      console.error('CANCEL_ORDER', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  }

}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
