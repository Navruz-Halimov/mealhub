import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  cateringList: []
})

const getters = {
  CATERING_LIST: state => state.cateringList
}

const mutations = {
  SET_CATERING_LIST: (state, newCateringList) => {
    if (newCateringList) { state.cateringList = [...newCateringList] } else { state.cateringList = [] }
  },
  SET_MORE_CATERING_LIST: (state, moreCateringList) => {
    const newCateringList = [...state.cateringList].concat(moreCateringList)
    state.cateringList = newCateringList
  }
}

const actions = {
  async GET_CATERING_LIST ({ getters, commit }, method) {
    let formData
    let cuisineIdsList = []
    let res = {}
    commit('SET_CATERING_LIST', [])

    switch (method) {
      case 'search':
        formData = {
          limit: getters.CATERING_FILTER_DATA.limit,
          page: getters.CATERING_FILTER_DATA.page,
          latitude: getters.CATERING_FILTER_DATA.lat,
          longitude: getters.CATERING_FILTER_DATA.lng,
          radius: ~~getters.GMAP_CIRCLE_OPTIONS.radius,
          q: getters.CATERING_FILTER_DATA.searchQuery
        }

        try {
          const { data } = await axios.get(`${apiAddress(this)}/search`, { params: formData })
          commit('SET_CATERING_LIST', data.items)
          res = data
        } catch (err) {
          console.error('GET_CATERING_LIST search error', err)
        }

        break
      case 'filter':

        if (getters.CATERING_FILTER_DATA.cuisine) {
          cuisineIdsList = getters.CATERING_FILTER_DATA.cuisine.map(
            kit => kit.id
          )
        }

        formData = {
          limit: getters.CATERING_FILTER_DATA.limit,
          page: getters.CATERING_FILTER_DATA.page,
          latitude: getters.CATERING_FILTER_DATA.lat,
          longitude: getters.CATERING_FILTER_DATA.lng,
          radius: ~~getters.GMAP_CIRCLE_OPTIONS.radius,
          q: getters.CATERING_FILTER_DATA.searchQuery,
          delivery: getters.CATERING_FILTER_DATA.delivery ? 1 : 0,
          takeaway: getters.CATERING_FILTER_DATA.takeaway ? 1 : 0,
          cuisine: cuisineIdsList,
          avgCheck: getters.CATERING_FILTER_DATA.avgCheck
        }

        try {
          const { data } = await axios.get(`${apiAddress(this)}/filter`, { params: formData })
          commit('SET_CATERING_LIST', data.items)
          res = data
        } catch (err) {
          console.error('GET_CATERING_LIST filter error', err)
        }

        break
    }
    return res
  },
  async GET_MORE_CATERING_LIST ({ getters, commit }, method) {
    let formData
    let cuisineIdsList = []

    switch (method) {
      case 'search':
        formData = {
          limit: getters.CATERING_FILTER_DATA.limit,
          page: getters.CATERING_FILTER_DATA.page,
          latitude: getters.CATERING_FILTER_DATA.lat,
          longitude: getters.CATERING_FILTER_DATA.lng,
          radius: ~~getters.GMAP_CIRCLE_OPTIONS.radius,
          q: getters.CATERING_FILTER_DATA.searchQuery
        }

        try {
          const { data } = await axios.get(`${apiAddress(this)}/search`, { params: formData })
          commit('SET_MORE_CATERING_LIST', data.items)
        } catch (err) {
          console.error('GET_CATERING_LIST search error', err)
        }

        break
      case 'filter':

        if (getters.CATERING_FILTER_DATA.cuisine) {
          cuisineIdsList = getters.CATERING_FILTER_DATA.cuisine.map(
            kit => kit.id
          )
        }

        formData = {
          limit: getters.CATERING_FILTER_DATA.limit,
          page: getters.CATERING_FILTER_DATA.page,
          latitude: getters.CATERING_FILTER_DATA.lat,
          longitude: getters.CATERING_FILTER_DATA.lng,
          radius: ~~getters.GMAP_CIRCLE_OPTIONS.radius,
          q: getters.CATERING_FILTER_DATA.searchQuery,
          delivery: getters.CATERING_FILTER_DATA.delivery ? 1 : 0,
          takeaway: getters.CATERING_FILTER_DATA.takeaway ? 1 : 0,
          cuisine: cuisineIdsList,
          avgCheck: getters.CATERING_FILTER_DATA.avgCheck
        }

        try {
          const { data } = await axios.get(`${apiAddress(this)}/filter`, { params: formData })
          commit('SET_MORE_CATERING_LIST', data.items)
        } catch (err) {
          console.error('GET_CATERING_LIST filter error', err)
        }

        break
    }
  }
}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
