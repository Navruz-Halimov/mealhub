import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  cateringFilterData: {
    searchQuery: '',
    limit: 15,
    page: 1,
    lat: 59.9361782,
    lng: 30.3140578,
    radius: 1000,
    cuisine: '',
    cateringType: '',
    keyProduct: '',
    additional: '',
    avgCheck: 1,
    delivery: true,
    takeaway: true
  },
  cateringFilterSettings: {
    avgCheck: {
      min: 1,
      max: 1000
    },
    radius: {
      min: 1,
      max: 50,
      defaultWalking: 1,
      defaultDriving: 5,
      defaultTransit: 5
    },
    cuisine: {
      mainList: [],
      forwardList: []
    },
    cateringType: {
      mainList: [],
      forwardList: []
    },
    keyProduct: {
      mainList: [],
      forwardList: []
    },
    additional: {
      mainList: [],
      forwardList: []
    }
  }
})

const getters = {
  CATERING_FILTER_DATA: state => state.cateringFilterData,
  CATERING_FILTER_SETTINGS: state => state.cateringFilterSettings
}

const mutations = {
  RESET_CATERING_FILTER_DATA: (state) => {
    const avgCheck = state.cateringFilterSettings.avgCheck.min

    state.cateringFilterData = {
      ...state.cateringFilterData,
      ...{
        searchQuery: '',
        limit: 15,
        page: 1,
        radius: 1000,
        cuisine: [],
        cateringType: '',
        keyProduct: '',
        additional: '',
        avgCheck,
        delivery: true,
        takeaway: true
      }
    }
  },
  SET_CATERING_FILTER_DATA: (state, newFilterData) => {
    state.cateringFilterData = {
      ...state.cateringFilterData,
      ...newFilterData
    }
  },
  SET_CATERING_FILTER_SETTINGS: (state, newFilterSettings) => {
    state.cateringFilterSettings = {
      ...state.cateringFilterSettings,
      ...newFilterSettings
    }
  }
}

const actions = {
  async GET_CATERING_FILTER_SETTINGS ({ getters, commit }) {
    const newCuisineData = await axios.get(`${apiAddress(this)}/cuisine/get-list`)
    const newCateringTypesData = await axios.get(`${apiAddress(this)}/catering-types/get-list`)
    const newCateringKeyProductsData = await axios.get(`${apiAddress(this)}/catering-key-products/get-list`)
    const newAdditionalData = await axios.get(`${apiAddress(this)}/additional-services/get-list`)
    const newAvgCheckData = await axios.get(`${apiAddress(this)}/get-min-max-check`)

    commit('SET_CATERING_FILTER_SETTINGS', {
      avgCheck: {
        min: newAvgCheckData.data.av_check.min,
        max: newAvgCheckData.data.av_check.max
      },
      cuisine: {
        mainList: [...newCuisineData.data.cuisines],
        forwardList: [...newCuisineData.data.cuisines.slice(0, 6)]
      },
      cateringType: {
        mainList: [...newCateringTypesData.data.catering_types],
        forwardList: [...newCateringTypesData.data.catering_types.slice(0, 6)]
      },
      keyProduct: {
        mainList: [...newCateringKeyProductsData.data.key_products],
        forwardList: [...newCateringKeyProductsData.data.key_products.slice(0, 6)]
      },
      additional: {
        mainList: [...newAdditionalData.data.services],
        forwardList: [...newAdditionalData.data.services.slice(0, 6)]
      }
    })
    commit('SET_CATERING_FILTER_DATA', {
      avgCheck: +newAvgCheckData.data.av_check.min
    })
  }
}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
