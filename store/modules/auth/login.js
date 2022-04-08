import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  loginForm: {
    phone: ''
  }
})

const getters = {
  LOGIN_FORM: state => state.loginForm
}

const mutations = {
  SET_LOGIN_FORM_DATA: (state, newData) => {
    state.loginForm = {
      ...state.loginForm,
      ...newData
    }
  },
  RESET_LOGIN_FORM_DATA: (state) => {
    state.loginForm = {
      phone: ''
    }
  }
}

const actions = {
  async LOG_IN ({ getters, commit, dispatch }, cookiz) {
    const verificationCode = `${getters.VERIFICATION_CODE.one}${getters.VERIFICATION_CODE.two}${getters.VERIFICATION_CODE.three}${getters.VERIFICATION_CODE.four}`
    const formData = {
      phone: getters.LOGIN_FORM.phone,
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
      console.error(err)
      commit('SET_VERIFICATION_ERROR', {
        state: true,
        method: 'code'
      })
    }

    return res
  }
}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
