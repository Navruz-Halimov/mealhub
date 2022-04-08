import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({})

const getters = {}
const mutations = {}

const actions = {
  async addToFavoritesDish (_, { id, cookiz }) {
    return await axios.post(
      `${apiAddress(this)}/dish-favorites`,
      {
        dish_id: id
      },
      {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      }
    )
  },
  async fetchFavoritesDish (_, cookiz) {
    return await axios.get(`${apiAddress(this)}/dish-favorites`, {
      headers: {
        Authorization: cookiz.get('user_token')
      }
    })
  },
  async deleteFavoritesDish (_, payload) {
    console.log('bu payload', payload)
    return await axios.delete(
      `${apiAddress(this)}/dish-favorites/${payload.id}`,
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
