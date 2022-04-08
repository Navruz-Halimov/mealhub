import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  currentCateringMenuСategories: null,
  currentCateringMenuDishes: []
})

const getters = {
  CURRENT_CATERING_MENU_CATEGORIES: state => state.currentCateringMenuСategories,
  CURRENT_CATERING_MENU_DISHES: state => state.currentCateringMenuDishes
}

const mutations = {
  SET_CURRENT_CATERING_MENU_CATEGORIES: (state, newСategories) => {
    state.currentCateringMenuСategories = [...newСategories]
  },
  SET_CURRENT_CATERING_MENU_DISHES: (state, newDishes) => {
    state.currentCateringMenuDishes = [...newDishes]
  },
  RESET_CURRENT_CATERING_MENU_DISHES: (state) => {
    state.currentCateringMenuDishes = []
  }

}

const actions = {
  async GET_CURRENT_CATERING_MENU_CATEGORIES ({ commit }, { cookiz, id }) {
    const Auth = cookiz.get('user_token') ? {
      Authorization: cookiz.get('user_token')
    } : {}
    let res

    try {
      res = await axios.get(`${apiAddress(this)}/catering/${id}/menu/category-list`, {
        headers: {
          ...Auth
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING_MENU_CATEGORIES', data.items)
      }
    } catch (err) {
      console.error(err)
    }

    return res
  },
  async GET_CURRENT_CATERING_MENU_DISHES_IN_CATEGORY ({ commit }, { cookiz, cateringId, categoryId }) {
    let res

    try {
      res = await axios.get(`${apiAddress(this)}/catering/${cateringId}/menu/${categoryId}/dishes-list`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING_MENU_DISHES', data.items)
      }
    } catch (err) {
      console.error(err)
    }

    return res
  },
  async GET_CURRENT_CATERING_MENU_DISHES_FROM_SEARCH ({ commit }, { cookiz, cateringId, q }) {
    let res

    try {
      res = await axios.get(`${apiAddress(this)}/catering/${cateringId}/menu/search`, {
        params: {
          q,
          limit: 15,
          page: 1
        },
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_CATERING_MENU_DISHES', data.items)
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
