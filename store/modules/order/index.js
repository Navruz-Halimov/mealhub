import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  currentCateringOrder: {},
  orderTypes: {}
})

const getters = {
  CURRENT_CATERING_ORDER: state => state.currentCateringOrder,
  ORDER_TYPES: state => state.currentCateringOrder
}

const mutations = {
  SET_CURRENT_CATERING_ORDER: (state, newOrder) => {
    state.currentCateringOrder = newOrder
  }
}

const actions = {

  // Создание заказа по типпу (reserve_table / online_order / go_and_eat)
  async ORDER_CREATE ({ getters, commit }, { cookiz, id, type }) {
    let res

    const formData = {
      order_type: type
    }

    try {
      res = await axios.post(`${apiAddress}/catering/${id}/order/create`, formData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING_ORDER', data.item)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('ORDER_CREATE', err)
    }

    return res
  },

  // Информация о заказе
  async GET_CURRENT_CATERING_ORDER ({ commit }, { cookiz, id, q, orderID, limit, page }) {
    let res

    const params = {
      limit: limit || 15,
      page: page || 1,
      q: q || ''
    }

    try {
      res = await axios.get(`${apiAddress}/catering/${id}/order/get-order/${orderID}`, {
        params,
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
    }

    return res
  }

}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
