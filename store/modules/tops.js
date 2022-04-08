import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  tops: [],
  topsSearch: '',
  topsFilterSettings: {
    limit: 15,
    page: 1,
    reservation: true,
    radius: '5',
    kitchen: '',
    averageCheck: '30',
    isTakeaway: true,
    isDelivery: true
  },
  currentTop: {},
  topCuisines: [
    {
      id: 1,
      name: 'britain',
      description: 'Rerum reprehenderit qui voluptatum aperiam tempora consequuntur. Repellendus eum et nesciunt qui. Se…'
    },
    {
      id: 2,
      name: 'turkey',
      description: 'Rerum reprehenderit qui voluptatum aperiam tempora consequuntur. Repellendus eum et nesciunt qui. Se…'
    },
    {
      id: 3,
      name: 'france',
      description: 'Rerum reprehenderit qui voluptatum aperiam tempora consequuntur. Repellendus eum et nesciunt qui. Se…'
    },
    {
      id: 4,
      name: 'korea',
      description: 'Rerum reprehenderit qui voluptatum aperiam tempora consequuntur. Repellendus eum et nesciunt qui. Se…'
    }
  ],
  selectedTop: null
})

const getters = {
  TOPS: state => state.tops,
  CURRENT_TOP: state => state.currentTop,
  TOPS_SEARCH: state => state.topsSearch,
  TOPS_FILTER_SETTINGS: state => state.topsFilterSettings,
  TOP_CUISINES: state => state.topCuisines,
  SELECTED_TOP: state => state.selectedTop
}

const mutations = {
  SET_TOPS: (state, newTopList) => {
    state.tops = [...newTopList]
  },
  SET_CURRENT_TOP: (state, newTopObject) => {
    const newCurrentTop = {
      ...state.currentTop,
      ...newTopObject
    }
    state.currentTop = newCurrentTop
  },
  CLEAR_CURRENT_TOP: (state) => {
    state.currentTop = {}
  },
  SET_TOPS_SEARCH: (state, searchValue) => {
    state.topsSearch = searchValue
  },
  SET_TOPS_FILTER_SETTINGS: (state, objWithNewValue) => {
    const newTopsFilterSettings = {
      ...state.topsFilterSettings,
      ...objWithNewValue
    }
    state.topsFilterSettings = newTopsFilterSettings
  },
  RESET_TOPS_FILTER_SETTINGS: (state) => {
    state.topsFilterSettings = {
      radius: '',
      kitchen: '',
      averageCheck: '1',
      isTakeaway: true,
      isDelivery: true
    }
  },
  SET_MORE_TOPS: (state, moreTopList) => {
    const newTopList = [...state.tops].concat(moreTopList)
    state.tops = newTopList
  },
  SET_SELECTED_TOP: (state, selectedTop) => {
    state.selectedTop = selectedTop
  }
}

const actions = {
  async  GET_TOPS ({ getters, commit }) {
    const limit = getters.TOPS_FILTER_SETTINGS.limit
    const page = getters.TOPS_FILTER_SETTINGS.page
    const latitude = getters.USER_LOCATION.lat
    const longitude = getters.USER_LOCATION.lng
    const radius = getters.TOPS_FILTER_SETTINGS.radius
    const searchValue = getters.TOPS_SEARCH

    const searchingParams = {
      limit,
      page,
      latitude,
      longitude,
      radius,
      q: searchValue
    }
    const { data } = await axios.get(`${apiAddress(this)}/search`, { params: searchingParams })
    commit('SET_TOPS', data.items.data)
  },
  GET_MORE_TOPS ({ commit }) {
    commit('SET_MORE_TOPS', [1, 2, 3])
  },
  GET_SEARCHED_TOPS ({ commit }) {
    commit('SET_TOPS', [])
  },
  GET_FILTERED_TOPS ({ commit }) {
    commit('SET_TOPS', [])
  }
}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
