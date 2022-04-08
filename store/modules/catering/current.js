import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  isGoeat: false,
  isPickup: false,
  deliveryPopupStatus: null,
  deliveryAddressPopup: false,
  isReservation: false,
  isPreorder: false,
  isAnotherOrderActive: null,
  isOrderCancelWhy: null,

  currentCatering: null,
  selectedCatering: null,
  unavailableDeliveryDishes: [],
  currentPopups: []
})

const getters = {
  IS_SOMEPOPUP: state => state.isGoeat || state.isPickup || state.isDelivery || state.isAnotherOrderActive,
  IS_GOEATPOPUP: state => state.isGoeat,
  IS_PICKUPPOPUP: state => state.isPickup,
  IS_DELIVERY_POPUP: state => state.deliveryPopupStatus !== null,
  IS_DELIVERY_POPUP_WORK: state => state.deliveryPopupStatus === 'work',
  IS_DELIVERY_POPUP_SUCCESS: state => state.deliveryPopupStatus === 'success',
  IS_DELIVERY_POPUP_AREA_WARNING: state => state.deliveryPopupStatus === 'area_warning',
  IS_DELIVERY_POPUP_AREA_ERROR: state => state.deliveryPopupStatus === 'area_error',
  IS_DELIVERY_POPUP_DISHES_ERROR: state => state.deliveryPopupStatus === 'dishes_error',
  IS_DELIVERY_ADDRESS_POPUP_OPENED: state => state.deliveryAddressPopup,
  IS_RESERVATION_POPUP: state => state.isReservation,
  IS_PREORDER_POPUP: state => state.isPreorder,
  IS_ANOTHER_ORDER_ACTIVE_POPUP: state => state.isAnotherOrderActive,
  IS_ORDER_CANCEL_WHY_POPUP: state => state.isOrderCancelWhy,

  CURRENT_CATERING: state => state.currentCatering,
  SELECTED_CATERING: state => state.selectedCatering,
  UNAVAILABLE_DELIVERY_DISHES: state => state.unavailableDeliveryDishes,
  CURRENT_POPUPS: state => state.currentPopups,
  CURRENT_POPUPS_FIRST_ITEM: state => state.currentPopups.length ? state.currentPopups[0] : null
}

const mutations = {
  SET_GOEATPOPUP: (state, isactive) => {
    state.isGoeat = isactive || false
  },
  SET_PICKUPPOPUP: (state, isactive) => {
    state.isPickup = isactive || false
  },
  SET_DELIVERY_POPUP_WORK: (state) => {
    state.deliveryPopupStatus = 'work'
  },
  SET_DELIVERY_POPUP_SUCCESS: (state) => {
    state.deliveryPopupStatus = 'success'
  },
  SET_DELIVERY_POPUP_AREA_WARNING: (state) => {
    state.deliveryPopupStatus = 'area_warning'
  },
  SET_DELIVERY_POPUP_AREA_ERROR: (state) => {
    state.deliveryPopupStatus = 'area_error'
  },
  SET_DELIVERY_POPUP_DISHES_ERROR: (state) => {
    state.deliveryPopupStatus = 'dishes_error'
  },
  CLOSE_DELIVERY_POPUP: (state) => {
    state.deliveryPopupStatus = null
  },
  OPEN_DELIVERY_ADDRESS_POPUP: (state) => {
    state.deliveryAddressPopup = true
  },
  CLOSE_DELIVERY_ADDRESS_POPUP: (state) => {
    state.deliveryAddressPopup = false
  },
  SET_RESERVATION_POPUP: (state, isActive = false) => {
    state.isReservation = isActive
  },
  SET_PREORDER_POPUP: (state, isActive = false) => {
    state.isPreorder = isActive
  },
  SET_ORDER_CANCEL_WHY_POPUP: (state, isactive) => {
    state.isOrderCancelWhy = isactive || false
  },
  SET_ANOTHER_ORDER_ACTIVE: (state, isactive) => {
    state.isAnotherOrderActive = isactive || false
  },

  SET_CURRENT_CATERING: (state, newCurrentCatering) => {
    state.currentCatering = { ...newCurrentCatering }
  },
  RESET_CURRENT_CATERING: (state) => {
    state.currentCatering = null
  },
  SET_SELECTED_CATERING: (state, newSelectedCatering) => {
    state.selectedCatering = { ...newSelectedCatering }
  },
  SET_UNAVAILABLE_DELIVERY_DISHES: (state, newValue) => {
    state.unavailableDeliveryDishes = newValue
  },
  PUSH_CURRENT_POPUPS: (state, item) => {
    state.currentPopups.push(item)
  },
  SHIFT_CURRENT_POPUPS: (state) => {
    console.log(state.currentPopups.length)
    return state.currentPopups.shift()
  }
}

const actions = {
  async GET_CURRENT_CATERING ({ commit }, { cookiz, id }) {
    const Auth = cookiz.get('user_token') ? {
      Authorization: cookiz.get('user_token')
    } : {}

    let res
    try {
      res = await axios.get(`${apiAddress(this)}/catering/detail-view/${id}`, {
        headers: {
          ...Auth
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING', data.item)
      }
    } catch (err) {
      console.error(err)
    }

    return res
  },
  async GET_CURRENT_CATERING_LITE ({ commit }, { cookiz, id }) {
    let res

    try {
      res = await axios.get(`${apiAddress(this)}/catering/view/${id}`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING', data.item)
      }
    } catch (err) {
      console.error('GET_CURRENT_CATERING_LITE', err)
    }

    return res
  },
  async ADD_CURRENT_CATERING_TO_FAVORIT ({ getters, commit }, cookiz) {
    let res

    try {
      res = await axios.get(`${apiAddress(this)}/user/add-catering-to-favorite/${getters.CURRENT_CATERING.id}`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
    } catch (err) {
      console.error(err)
    }

    return res
  }
}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
