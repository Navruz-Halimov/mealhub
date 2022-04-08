import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  personalData: {
    current_order: '',
    name: '',
    surname: '',
    phone: '',
    email: '',
    photo: '',
    photoFile: '',
    gender: 'unknown',
    birthday: '2021-01-01',
    receive_news: false,
    receive_support: false,
    receive_orders: false,
    receive_all: false,
    is_deleted: false,
    language: '',
    currency_code: '',
    id: ''
  },
  personalGeolocation: {
    coords: {
      lat: '',
      lng: ''
    },
    address: ''
  }
})

const getters = {
  PERSONAL_DATA: state => state.personalData,
  PERSONAL_GEOLOCATION: state => state.personalGeolocation
}

const mutations = {
  SET_PERSONAL_DATA: (state, newData) => {
    const newPersonalData = {
      ...state.personalData,
      ...newData
    }
    state.personalData = newPersonalData
  },
  CLEAR_PERSONAL_DATA: (state) => {
    state.personalData.id = ''
  },
  SET_PERSONAL_GEOLOCATION: (state, newData) => {
    const newPersonalGeolocation = {
      ...state.personalGeolocation,
      ...newData
    }
    state.personalGeolocation = newPersonalGeolocation
  },
  DELETE_PERSONAL_AVATAR: (state) => {
    state.photo = ''
  }
}

const actions = {
  async GET_PERSONAL_DATA ({ commit, dispatch }, cookiz) {
    if (!cookiz.get('user_token')) {
      return false
    }

    const { data } = await axios.get(`${apiAddress(this)}/profile/user`, {
      headers: {
        Authorization: cookiz.get('user_token')
      }
    })

    commit('SET_PERSONAL_DATA', data.user_data)
    commit('SET_PERSONAL_DATA', {
      photo: data.user_data.photo
        ? `${data.user_data.photo}`
        : data.user_data.photo
    })

    await dispatch('GET_CART_ITEMS', cookiz)
    const orderid = cookiz.order
    const orderID = +orderid || (data.user_data && data.user_data.current_order)
    if (orderID) {
      const res = await dispatch('GET_ORDER', { cookiz, orderID })
      if (res.status === 'success') {
        if (res.order) {
          commit('SET_CURRENT_ORDER', res.order)
          return res.order
        } else {
          commit('SET_CURRENT_ORDER', null)
        }
      } else {
        console.warn('GET_PERSONAL_DATA response error', res)
      }
    } else {
      // console.warn('GET_PERSONAL_DATA no orderID')
      commit('SET_CURRENT_ORDER', null)
      return null
    }
  },
  async UPDATE_PERSONAL_DATA ({ commit, getters }, cookiz) {
    let res

    let defaultDate = new Date().toLocaleDateString('ru-RU').split('.')
    defaultDate = defaultDate.reverse()
    defaultDate = defaultDate.join('-')

    const formData = new FormData()
    formData.append('name', getters.PERSONAL_DATA.name)
    formData.append('surname', getters.PERSONAL_DATA.surname || '')
    formData.append('email', getters.PERSONAL_DATA.email)
    formData.append('gender', getters.PERSONAL_DATA.gender || 'unknown')
    formData.append('birthday', getters.PERSONAL_DATA.birthday || defaultDate)
    formData.append('language', getters.PERSONAL_DATA.language || 'en')
    formData.append(
      'currency_code',
      getters.PERSONAL_DATA.currency_code || 'USD'
    )
    formData.append('receive_news', getters.PERSONAL_DATA.receive_news)
    formData.append('receive_support', getters.PERSONAL_DATA.receive_support)
    formData.append('receive_orders', getters.PERSONAL_DATA.receive_orders)
    formData.append('receive_all', getters.PERSONAL_DATA.receive_all)

    if (getters.PERSONAL_DATA.photoFile) {
      formData.append('photo', getters.PERSONAL_DATA.photoFile)
    }

    try {
      res = await axios.post(
        `${apiAddress(this)}/profile/user/update`,
        formData,
        {
          headers: {
            Authorization: cookiz.get('user_token'),
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    } catch (err) {
      return err && err.response
    }

    return res
  },
  async DELETE_PERSONAL_AVATAR ({ commit }, cookiz) {
    let res

    try {
      res = await axios.post(
        `${apiAddress(this)}/profile/user/remove-photo`,
        null,
        {
          headers: {
            Authorization: cookiz.get('user_token')
          }
        }
      )

      if (res.data.status === 'success') {
        commit('DELETE_PERSONAL_AVATAR')
      }
    } catch (err) {
      return err && err.response
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
