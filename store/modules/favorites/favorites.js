import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({})

const getters = {}
const mutations = {}

const actions = {
  async addToFavorites (_, { id, cookiz }) {
    return await axios.post(
      `${apiAddress(this)}/catering-favorites`,
      {
        catering_id: id
      },
      {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      }
    )
  },
  async fetchFavorites (_, cookiz) {
    return await axios.get(`${apiAddress(this)}/catering-favorites`, {
      headers: {
        Authorization: cookiz.get('user_token')
      }
    })
  },
  async deleteFavorite (_, payload) {
    return await axios.delete(
      `${apiAddress(this)}/catering-favorites/${payload.id}`,
      {
        headers: {
          Authorization: payload.cookie.get('user_token')
        }
      }
    )
  }
}

const moduleStore = {
  state,
  getters,
  mutations,
  actions
}

export default moduleStore
