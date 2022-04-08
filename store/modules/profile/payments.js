import axios from 'axios'
import CryptoJS from 'crypto-js'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  payments: [],
  currentPayment: {
    id: '',
    number: '',
    owner: '',
    expire_m: 0,
    expire_y: 0,
    cvv: ''
  }
})

const getters = {
  PAYMENTS: state => state.payments,
  CURRENT_PAYMENT: state => state.currentPayment
}

const mutations = {
  SET_PAYMENTS: (state, newPaymentList) => {
    state.payments = [...newPaymentList]
  },
  SET_CURRENT_PAYMENT: (state, currentPaymentId) => {
    const currentPayment = state.payments.find((item) => {
      if (item.id === currentPaymentId) {
        return true
      }
    })
    state.currentPayment = { ...currentPayment }
  },
  SET_CURRENT_PAYMENT_DATA: (state, objWithNewValue) => {
    const newPaymentData = {
      ...state.currentPayment,
      ...objWithNewValue
    }
    state.currentPayment = newPaymentData
  },
  RESET_CURRENT_PAYMENT_DATA: (state) => {
    state.currentPayment = {
      id: '',
      number: '',
      owner: '',
      expire_m: 0,
      expire_y: 0,
      cvv: ''
    }
  },
  DELETE_PAYMENT: (state, paymentId) => {
    const paymentsClone = [...state.payments]

    paymentsClone.forEach((payment, i) => {
      if (payment.id.toString() === paymentId.toString()) {
        paymentsClone.splice(i, 1)
      }
    })

    state.payments = [...paymentsClone]
  },
  ADD_PAYMENT: (state) => {
    const currentPayment = state.currentPayment
    const paymentsClone = [...state.payments]
    paymentsClone.push(currentPayment)
    state.payments = [...paymentsClone]
  },
  EDIT_PAYMENT: (state) => {
    const currentPayment = state.currentPayment
    const paymentsClone = [...state.payments]

    paymentsClone.forEach((payment, i) => {
      if (payment.id === currentPayment.id) {
        paymentsClone.splice(i, 1, currentPayment)
      }
    })

    state.payments = [...paymentsClone]
  }
}

const actions = {
  async GET_PAYMENTS ({ commit }, cookiz) {
    let res

    try {
      res = await axios.get(`${apiAddress(this)}/profile/cards/get-list`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('SET_PAYMENTS', data.items)
      }
    } catch (err) {
      console.error(err)
    }

    return res
  },
  async DELETE_CURRENT_PAYMENT ({ commit }, { cookiz, id }) {
    let res

    try {
      res = await axios.post(`${apiAddress(this)}/profile/cards/delete/${id}`, null, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = res.data

      if (data.status === 'success') {
        commit('DELETE_PAYMENT', id)
      }
    } catch (err) {
      console.error(err)
    }

    return res
  },
  async ADD_NEW_PAYMENT ({ commit, getters, dispatch }, cookiz) {
    let res, dataToSend

    const cardData = {
      number: getters.CURRENT_PAYMENT.number,
      owner: getters.CURRENT_PAYMENT.owner.toString(),
      expire_m: getters.CURRENT_PAYMENT.expire_m.toString(),
      cvv: getters.CURRENT_PAYMENT.cvv,
      expire_y: getters.CURRENT_PAYMENT.expire_y.toString()
    }
    /*
      Testing data
      https://www.hsbc.co.uk/content/dam/hsbc/gb/images/credit-cards/premier-credit-card-uk.jpg
      4000 0012 3456 7899
      ALEX LIVINGSON
      03/21
      (from 03/18 to )
    */

    try {
      res = await axios.get(`${apiAddress(this)}/profile/user`, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })

      if (res.data && res.data.status === 'success') {
        let phone = res.data.user_data
        phone = phone.phone || ''

        if (phone) {
          const pwd = CryptoJS.MD5(phone)
          const iv = ('' + pwd).split('').reverse().join('').substring(0, 16)
          dataToSend = CryptoJS.AES.encrypt(
            JSON.stringify(cardData),
            CryptoJS.enc.Utf8.parse(pwd),
            { iv: CryptoJS.enc.Utf8.parse(iv) }
          ).ciphertext.toString(CryptoJS.enc.Base64)

          console.warn('ENCRYPTED DATA = ', dataToSend)
        } else {
          throw new Error('No phone number')
        }
      } else {
        throw new Error('profile user. No response')
      }
    } catch (err) {
      console.error('1', err, CryptoJS)
    }

    const formData = {
      data: dataToSend
    }

    let resp = {}

    try {
      resp = await axios.post(`${apiAddress(this)}/profile/cards/add`, formData, {
        headers: {
          Authorization: cookiz.get('user_token')
        }
      })
      const data = resp.data

      if (data.status === 'success') {
        commit('ADD_PAYMENT')
        // commit('RESET_CURRENT_PAYMENT_DATA')
      }
      await dispatch('GET_PAYMENTS', cookiz)

      if (data.status === 'success') {
        // commit('ADD_PAYMENT')
        commit('RESET_CURRENT_PAYMENT_DATA')
      }
    } catch (err) {
      console.error('3', err)
      resp = err
    }

    return resp
  }

}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
