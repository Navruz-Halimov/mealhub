import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  isLoginPopup: false,
  isRegistratePopup: false,
  isRecoveryPopup: false,
  isConfirmationPopup: false,
  isuserType: false,
  isSimpleErrorPopup: false,
  isCateringPoint: false,
  isSupportPopup: false,
  isPartnerPopup: false,
  isLoginUserTypesPopup: false
})

const getters = {
  loginPopup: state => state.isLoginPopup,
  loginUserTypesPopup: state => state.isLoginUserTypesPopup,
  registratePopup: state => state.isRegistratePopup,
  userTypePopup: state => state.isuserType,
  cateringPointPopup: state => state.isCateringPoint,
  recoveryPopup: state => state.isRecoveryPopup,
  confirmationPopup: state => state.isConfirmationPopup,
  simpleErrorPopup: state => state.isSimpleErrorPopup,

  supportPopup: state => state.isSupportPopup,
  partnerPopup: state => state.isPartnerPopup
}

const mutations = {
  SET_LOGIN_POPUP: (state, newVal) => {
    state.isLoginPopup = newVal || false
  },
  SET_LOGIN_USERTYPES_POPUP: (state, newVal) => {
    state.isLoginUserTypesPopup = newVal || false
  },
  SET_REGISTRATE_POPUP: (state, newVal) => {
    state.isRegistratePopup = newVal || false
  },
  SET_SETUSERTYPE_POPUP: (state, newVal) => {
    state.isuserType = newVal || false
  },
  SET__CATERINGPOINT_POPUP: (state, newVal) => {
    state.isCateringPoint = newVal || false
  },
  SET_RECOVERY_POPUP: (state, newVal) => {
    state.isRecoveryPopup = newVal || false
  },
  SET_COMFIRMATION_POPUP: (state, newVal) => {
    state.isConfirmationPopup = newVal || false
  },

  SET_SIMPLE_ERROR_POPUP: (state, newVal) => {
    state.isSimpleErrorPopup = newVal || false
  },

  SET_SUPPORT_POPUP: (state, newVal) => {
    state.isSupportPopup = newVal || false
  },
  SET_PARTNER_POPUP: (state, newVal) => {
    state.isPartnerPopup = newVal || false
  }
}

const actions = {
  CLOSE_GLOBAL_POPUPS ({ commit, getters, dispatch }, form, cookiz) {
    commit('SET_LOGIN_POPUP', false)
    commit('SET_LOGIN_USERTYPES_POPUP', false)
    commit('SET_REGISTRATE_POPUP', false)
    commit('SET_SETUSERTYPE_POPUP', false)
    commit('SET__CATERINGPOINT_POPUP', false)

    commit('SET_RECOVERY_POPUP', false)
    commit('SET_COMFIRMATION_POPUP', false)

    commit('SET_GOEATPOPUP', false)
    commit('SET_PICKUPPOPUP', false)
    commit('CLOSE_DELIVERY_POPUP')
    commit('SET_RESERVATION_POPUP', false)
    commit('SET_PREORDER_POPUP', false)
    commit('SET_ANOTHER_ORDER_ACTIVE', false)
    commit('SET_SIMPLE_ERROR_POPUP', false)

    commit('SET_SUPPORT_POPUP', false)
    commit('SET_PARTNER_POPUP', false)

    commit('RESET_COPIED_CATERING_ORDER')
  },
  async SEND_PARTNER_FORM ({ commit, getters, dispatch }, form, cookiz) {
    let res

    const formData = {
      phone: form.phone.toString(),
      email: form.email.toString(),
      name: form.name.toString(),
      company: form.company.toString(),
      offer: form.offer.toString()
    }
    try {
      res = await axios.post(
        `${apiAddress(this)}/partnership-request`,
        formData
      )
      const data = res.data

      if (data.status === 'success') {
        return data
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  },
  async SEND_SUPPORT_FORM ({ commit, getters, dispatch }, form, cookiz) {
    let res

    try {
      const formData = {
        title: 'Help for ' + form.name.toString(),
        name: form.name.toString(),
        email: form.email.toString(),
        question: form.question.toString()
      }

      res = await axios.post(`${apiAddress(this)}/helpdesk-request`, formData)
      const data = res.data

      if (data.status === 'success') {
        return data
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  }
}

const moduleStore = {
  state,
  getters,
  mutations,
  actions
}

export default moduleStore
