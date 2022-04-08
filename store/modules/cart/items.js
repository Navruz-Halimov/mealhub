import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  cart: {
    dishes: []
  },
  isCartLoaded: false,
  isCreatingAddress: false,
  createdAddress: null
})

const getters = {
  CART_DATA: state => state.cart,
  CART_ITEMS: state => state.cart.dishes,
  IS_CART_LOADED: state => state.isCartLoaded,
  IS_CREATING_ADDRESS: state => state.isCreatingAddress,
  CREATED_ADDRESS: state => state.createdAddress
}

const mutations = {
  SET_CART: (state, newCart) => {
    state.cart = newCart

    if (!state.isCartLoaded) {
      state.isCartLoaded = true
    }
  },
  SET_DISH_COUNT: (state, count) => {
    state.cart.dishes_count = count
  },
  SET_CREATING_ADDRESS: (state, value) => {
    state.isCreatingAddress = value || false
  },
  SET_CREATED_ADDRESS: (state, address) => {
    state.createdAddress = address
  }
}

const actions = {
  async GET_CART_ITEMS ({ commit }, cookiz) {
    let res
    try {
      res = await axios.get(`${apiAddress(this)}/cart/get-cart`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CART', data.cart)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('GET_CART_ITEMS', err)
    }

    return res
  },
  async GET_CART_DISH_COUNT ({ commit }, cookiz) {
    let res
    try {
      res = await axios.get(`${apiAddress(this)}/cart/dish-in-cart-quantity`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_DISH_COUNT', data.quantity)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('GET_CART_DISH_COUNT', err)
    }

    return res
  },
  async ADD_ITEM_IN_BASKET (
    { commit },
    { cookiz, dishID, quantity, clearOldCart }
  ) {
    let res
    console.log(
      'dishID',
      dishID,
      'quantity',
      quantity,
      'clearOldCart',
      clearOldCart
    )
    const formData = {
      quantity: quantity || 0,
      clear_old_cart: clearOldCart || false
    }

    try {
      res = await axios.post(
        `${apiAddress(this)}/cart/add-to-cart/${dishID}`,
        formData,
        {
          headers: {
            Authorization: cookiz.get('user_token')
          }
        }
      )
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CART', data.cart)
      } else {
        throw data
      }
    } catch (err) {
      console.error('ADD_ITEM_IN_BASKET', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },
  async DELETE_ITEM_IN_BASKET ({ commit }, { cookiz, dishID }) {
    let res

    try {
      res = await axios.post(
        `${apiAddress(this)}/cart/remove-from-cart/${dishID}`,
        null,
        {
          headers: {
            Authorization: cookiz.get('user_token')
          }
        }
      )
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CART', data.cart)
      } else {
        throw data
      }
    } catch (err) {
      console.error('DELETE_ITEM_IN_BASKET', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },
  async CLEAR_CART ({ commit }, { cookiz }) {
    let res

    try {
      res = await axios.post(`${apiAddress(this)}/cart/clear`, null, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CART', data.cart)
      } else {
        throw data
      }
    } catch (err) {
      console.error('CLEAR_CART', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },
  async PLUS_DISH_COUNT ({ commit }, { cookiz, dishID }) {
    let res

    const formData = {
      clear_old_cart: false
    }

    try {
      res = await axios.post(
        `${apiAddress(this)}/cart/dish-plus-one/${dishID}`,
        formData,
        {
          headers: {
            Authorization: cookiz.get('user_token')
          }
        }
      )
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CART', data.cart)
      } else {
        throw data
      }
    } catch (err) {
      console.error('PLUS_DISH_COUNT', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },
  async MINUS_DISH_COUNT ({ commit }, { cookiz, dishID }) {
    let res
    try {
      res = await axios.post(
        `${apiAddress(this)}/cart/dish-minus-one/${dishID}`,
        null,
        {
          headers: {
            Authorization: cookiz.get('user_token')
          }
        }
      )
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CART', data.cart)
      } else {
        throw data
      }
    } catch (err) {
      console.error('MINUS_DISH_COUNT', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  }
}

const moduleStore = {
  state,
  getters,
  mutations,
  actions
}

export default moduleStore
