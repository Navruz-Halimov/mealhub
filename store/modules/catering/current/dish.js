import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  currentDish: null
})

const getters = {
  CURRENT_DISH: state => state.currentDish
}

const mutations = {
  SET_CURRENT_DISH: (state, dish) => {
    state.currentDish = { ...dish }
  }
}

const actions = {
  async GET_CURRENT_DISH ({ commit }, { cookiz, cateringId, categoryId, dishId }) {
    let res

    try {
      res = await axios.get(`${apiAddress(this)}/catering/${cateringId}/menu/category/${categoryId}/view/${dishId}`, {
        params: {
          catering: cateringId,
          category: categoryId,
          dish: dishId
        },
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        const dishObject = {
          dish: data.item,
          prev: data.prev,
          next: data.next
        }

        commit('SET_CURRENT_DISH', dishObject)
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
