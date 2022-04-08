import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const defaultAddress = {
  isGeolocation: false,
  id: 0,
  address: '',
  city: '',
  street: '',

  house: '',
  section: null,
  flour: null,
  flat: null,

  office: '',
  front_door: '',
  building: '',
  intercom: '',

  address_comment: '',
  comment: '',

  zip: '',
  latitude: 0,
  longitude: 0
}

const state = () => ({
  addresses: [],
  currentAddress: defaultAddress
})

const getters = {
  ADDRESSES: state => state.addresses,
  CURRENT_ADDRESS: state => state.currentAddress
}

const mutations = {
  SET_ADDRESSES: (state, newAddressList) => {
    state.addresses = [...newAddressList]
  },
  SET_CURRENT_ADDRESS: (state, currentAddressId) => {
    const currentAddress = state.addresses.find((item) => {
      if (item.id === currentAddressId) {
        return true
      }
    })
    state.currentAddress = { ...currentAddress }
  },
  SET_CURRENT_ADDRESS_DATA: (state, objWithNewValue) => {
    const newAddressData = {
      ...state.currentAddress,
      ...objWithNewValue
    }
    state.currentAddress = newAddressData
  },
  RESET_CURRENT_ADDRESS_DATA: (state) => {
    state.currentAddress = defaultAddress
  },
  DELETE_ADDRESS: (state, addressId) => {
    const addressesClone = [...state.addresses]

    addressesClone.forEach((address, i) => {
      if (address.id.toString() === addressId.toString()) {
        addressesClone.splice(i, 1)
      }
    })

    state.addresses = [...addressesClone]
  },
  ADD_ADDRESS: (state) => {
    const currentAddress = state.currentAddress
    const addressesClone = [...state.addresses]
    addressesClone.push(currentAddress)
    state.addresses = [...addressesClone]
  },
  EDIT_ADDRESS: (state) => {
    const currentAddress = state.currentAddress
    const addressesClone = [...state.addresses]

    addressesClone.forEach((address, i) => {
      if (address.id === currentAddress.id) {
        addressesClone.splice(i, 1, currentAddress)
      }
    })

    state.addresses = [...addressesClone]
  }
}

const actions = {
  async GET_ADDRESSES ({ commit }, cookiz) {
    let res

    try {
      res = await axios.get(`${apiAddress(this)}/profile/address/get-list`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_ADDRESSES', data.items)
      }
    } catch (err) {
      console.error(err)
      res = Promise.resolve(err)
    }

    return res
  },
  async DELETE_CURRENT_ADDRESS ({ commit }, { cookiz, id }) {
    let res

    try {
      res = await axios.post(
        `${apiAddress(this)}/profile/address/delete/${id}`,
        null,
        {
          headers: {
            Authorization: cookiz.get('user_token')
          }
        }
      )
      const data = res.data

      if (data.status === 'success') {
        commit('DELETE_ADDRESS', id)
      }
    } catch (err) {
      console.error(err)
      res = Promise.resolve(err)
    }

    return res
  },
  async ADD_NEW_ADDRESS ({ commit, getters, dispatch }, cookiz) {
    let res

    const formData = {
      address: (getters.CURRENT_ADDRESS.address || '') + '',
      city: (getters.CURRENT_ADDRESS.city || '') + '',
      street: (getters.CURRENT_ADDRESS.street || '') + '',

      house: (getters.CURRENT_ADDRESS.house || '') + '',
      section: +getters.CURRENT_ADDRESS.section || null,
      building: (getters.CURRENT_ADDRESS.building || '') + '', // building
      flat: +getters.CURRENT_ADDRESS.flat || null,

      office: (getters.CURRENT_ADDRESS.office || '') + '', // office
      front_door: (getters.CURRENT_ADDRESS.front_door || '') + '', // front_door
      flour: +getters.CURRENT_ADDRESS.flour || null,
      intercom: (getters.CURRENT_ADDRESS.intercom || '') + '', // intercom

      address_comment: (getters.CURRENT_ADDRESS.address_comment || '') + '', // address_comment
      comment: (getters.CURRENT_ADDRESS.comment || '') + '' // comment
    }

    try {
      res = await axios.post(
        `${apiAddress(this)}/profile/address/add`,
        formData,
        {
          headers: {
            Authorization: cookiz.get('user_token')
          }
        }
      )
      const data = res.data

      if (data.status === 'success') {
        commit('ADD_ADDRESS')
        // commit('RESET_CURRENT_ADDRESS_DATA')
        dispatch('GET_ADDRESSES', cookiz)
      }
    } catch (err) {
      console.error(err)
      res = Promise.resolve(err)
    }

    return res
  },
  async EDIT_CURRENT_ADDRESS ({ commit, getters, dispatch }, { cookiz, id }) {
    let res
    const formData = {
      address: (getters.CURRENT_ADDRESS.address || '') + '',
      city: (getters.CURRENT_ADDRESS.city || '') + '',
      street: (getters.CURRENT_ADDRESS.street || '') + '',

      house: (getters.CURRENT_ADDRESS.house || '') + '',
      section: (getters.CURRENT_ADDRESS.section || '') + '',
      building: (getters.CURRENT_ADDRESS.building || '') + '', // building
      flat: (getters.CURRENT_ADDRESS.flat || '') + '',

      office: (getters.CURRENT_ADDRESS.office || '') + '', // office
      front_door: (getters.CURRENT_ADDRESS.front_door || '') + '', // front_door
      flour: (getters.CURRENT_ADDRESS.flour || '') + '',
      intercom: (getters.CURRENT_ADDRESS.intercom || '') + '', // intercom

      address_comment: (getters.CURRENT_ADDRESS.address_comment || '') + '', // address_comment
      comment: (getters.CURRENT_ADDRESS.comment || '') + '' // comment
    }

    try {
      res = await axios.post(
        `${apiAddress(this)}/profile/address/update/${id}`,
        formData,
        {
          headers: {
            Authorization: cookiz.get('user_token')
          }
        }
      )
      const data = res.data

      if (data.status === 'success') {
        commit('EDIT_ADDRESS')
        commit('RESET_CURRENT_ADDRESS_DATA')
        dispatch('GET_ADDRESSES', cookiz)
      }
    } catch (err) {
      console.error(err)
      res = Promise.resolve(err)
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
