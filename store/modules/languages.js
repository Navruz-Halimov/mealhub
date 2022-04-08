import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  languages: []
})

const getters = {
  LANGUAGES: state => state.languages
}

const mutations = {
  SET_LANGUAGES: (state, newLanguageList) => {
    state.languages = [...newLanguageList]
  }
}

const actions = {
  async GET_LANGUAGES ({ commit }, cookiz) {
    const Auth = cookiz.get('user_token')
      ? {
        Authorization: cookiz.get('user_token')
      }
      : {}

    let res
    try {
      res = await axios.get(`${apiAddress(this)}/languages`, {
        headers: {
          ...Auth
        }
      })
      const data = res.data
      if (data.status === 'success') {
        commit('SET_LANGUAGES', data.languages)
      }
    } catch (err) {
      console.error(err)
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
