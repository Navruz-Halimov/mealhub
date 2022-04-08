import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  recoveryForm: {
    email: ''
  }
})

const getters = {
  RECOVERY_FORM: state => state.recoveryForm
}

const mutations = {
  SET_RECOVERY_FORM_DATA: (state, newData) => {
    state.recoveryForm = {
      ...state.registrationForm,
      ...newData
    }
  },
  RESET_RECOVERY_FORM_DATA: (state) => {
    state.recoveryForm = {
      email: ''
    }
  }
}

const actions = {
  async RECOVERY ({ getters, commit, dispatch }, cookiz) {
    const verificationCode = `${getters.VERIFICATION_CODE.one}${getters.VERIFICATION_CODE.two}${getters.VERIFICATION_CODE.three}${getters.VERIFICATION_CODE.four}`
    const formData = {
      email: getters.RECOVERY_FORM.email,
      verify_code: verificationCode,
      device_name: 'web_app'
    }
    let res

    try {
      res = await axios.post(`${apiAddress(this)}/auth/verify-by-email`, formData)
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
  state, getters, mutations, actions
}

export default moduleStore
