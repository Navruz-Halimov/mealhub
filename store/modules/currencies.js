import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  currencies: []
})

const getters = {
  CURRENCIES: (state) => {
    const list = []

    for (const cc in state.currencies) {
      list.push({
        code: cc,
        name: state.currencies[cc]
      })
    }

    return list
  }
}

const mutations = {

  SET_CURRENCIES: (state, newCurList) => {
    state.currencies = newCurList
  }
}

const actions = {
  async GET_CURRENCIES ({ commit }, cookiz) {
    const Auth = cookiz.get('user_token') ? {
      Authorization: cookiz.get('user_token')
    } : {}

    let res
    try {
      res = await axios.get(`${apiAddress(this)}/currency-list`, {
        headers: {
          ...Auth
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENCIES', data.currencies)
      }
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
