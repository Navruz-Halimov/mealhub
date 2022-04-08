import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const actions = {
  async CATERINGREGISTRATION ({ commit }, formData) {
    console.log(formData)
    let res
    try {
      res = await axios.post(`${apiAddress(this)}/auth/register`, formData)
      // const data = res.data
      console.log('registratsiya korxona', res)

      if (res.data.status === 'success') {
        commit('SET_SUCCESS_NOTIFY', true)
        commit('SET__CATERINGPOINT_POPUP', false)
      } else {
        commit('SET_ERROR_NOTIFY', false)
      }
    } catch (err) {
      console.error(err.response)
      // commit('SET_VERIFICATION_ERROR', {
      //   state: true,
      //   method: 'code'
      // })
    }

    return res
  }
}

const moduleStore = {
  // state,
  // getters,
  // mutations,
  actions
}

export default moduleStore
