import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  tablesPlan: '/images/tables_test.png',
  occasionList: [],
  reserve: {}
})

const getters = {
  TABLES_PLAN: state => state.tablesPlan,
  OCCASION_LIST: state => state.occasionList,
  RESERVE: state => state.reserve
}

const mutations = {

  SET_TABLES_PLAN: (state, plan) => {
    state.tablesPlan = '' + plan
  },
  SET_OCCASION_LIST: (state, items) => {
    state.occasionList = items
  },
  SET_CURRENT_RESERVE: (state, reserve) => {
    state.reserve = reserve
  }
}

const actions = {

  async GET_TABLES_PLAN ({ commit }, { cookiz, id }) {
    let res

    try {
      res = await axios.get(`${apiAddress(this)}/catering/${id}/reserve/tables-plan`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_TABLES_PLAN', data.plan)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('GET_TABLES_PLAN', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },

  async GET_OCCASION_LIST ({ commit }, { cookiz, id }) {
    let res

    try {
      res = await axios.get(`${apiAddress(this)}/catering/${id}/reserve/occasion-list`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_OCCASION_LIST', data.items)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('GET_OCCASION_LIST', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  },

  async CREATE_RESERVE ({ commit }, { cookiz, id, orderID, form }) {
    let res

    console.warn(form)

    const formData = {
      date: form.date || 'string', // дата резерва в формате год(4 знака)-месяц-день
      time: form.time || 'string', // время начала в формате часы:минуты
      tables: form.tables || 'string', // столики для резерва
      occasion: form.occasion || 0, // Id повода посещения заведения до 6 человек
      event: form.event || 0, // Id повода посещения заведения больше 6 человек
      person_quantity: form.person_quantity || 0, // Предполагаемое количество персон
      reserve_hall: form.reserve_hall || true, // Резерв всего зала?
      reserve_all: form.reserve_all || true // Резерв всего заведения?
    }

    try {
      res = await axios.post(`${apiAddress(this)}/catering/${id}/reserve/create`, formData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_CURRENT_RESERVE', data.reserve)
      } else {
        throw new Error(data)
      }
    } catch (err) {
      console.error('CREATE_RESERVE', err)
      return new Promise(resolve => resolve(err))
    }

    return res
  }

}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
