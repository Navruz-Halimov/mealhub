import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  registrationForm: {
    phone: '',
    email: '',
    language: 'en',
    currency_code: 'USD',
    isAgree: false
  }
})

const getters = {
  REGISTRATION_FORM: state => state.registrationForm
}

const mutations = {
  SET_REGISTRATION_FORM_DATA: (state, newData) => {
    state.registrationForm = {
      ...state.registrationForm,
      ...newData
    }
  },
  RESET_REGISTRATION_FORM_DATA: (state) => {
    state.registrationForm = {
      phone: '',
      email: '',
      language: 'en',
      currency_code: 'USD',
      isAgree: false
    }
  }
}

const actions = {
  async REGISTRATION ({ getters, commit, dispatch }, cookiz) {
    const verificationCode = `${getters.VERIFICATION_CODE.one}${getters.VERIFICATION_CODE.two}${getters.VERIFICATION_CODE.three}${getters.VERIFICATION_CODE.four}`
    const formData = {
      phone: getters.REGISTRATION_FORM.phone,
      verify_code: verificationCode,
      device_name: 'web_app'
    }
    let res

    try {
      res = await axios.post(`${apiAddress(this)}/auth/verify`, formData)
      const data = res.data
      const userData = data.user_data

      if (data.status === 'success') {
        dispatch('AUTHORIZATION', { cookiz, userData })
      }
    } catch (err) {
      console.error(err.response)
      commit('SET_VERIFICATION_ERROR', {
        state: true,
        method: 'code'
      })
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
