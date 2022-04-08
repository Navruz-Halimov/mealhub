const state = () => ({
  isGeoNotify: false,

  isRegisterNotify: false,
  isActivateNotify: false,
  isRestoreNotify: false,
  isregisterUserTypeNotify: false,
  isTimer3Notify: false,
  isTimer20Notify: false,
  isTimer5Notify: false,

  isSuccessNotify: false,
  isFunctionalNotify: false,
  isErrorNotify: false
})

const getters = {
  geoNotify: state => state.isGeoNotify,

  registerNotify: state => state.isRegisterNotify,
  activateNotify: state => state.isActivateNotify,
  restoreNotify: state => state.isRestoreNotify,
  registerUserTypeNotify: state => state.isregisterUserTypeNotify,
  timer3Notify: state => state.isTimer3Notify,
  timer20Notify: state => state.isTimer20Notify,
  timer5Notify: state => state.isTimer5Notify,

  successNotify: state => state.isSuccessNotify,
  functionalNotify: state => state.isFunctionalNotify,
  errorNotify: state => state.isErrorNotify
}

const mutations = {
  SET_GEO_NOTIFY: (state, newVal) => {
    state.isGeoNotify = newVal || false
  },

  SET_REGISTER_NOTIFY: (state, newVal) => {
    state.isRegisterNotify = newVal || false
  },
  SET_registerUserType_NOTIFY: (state, newVal) => {
    state.isregisterUserTypeNotify = newVal || false
  },
  SET_ACTIVATE_NOTIFY: (state, newVal) => {
    state.isActivateNotify = newVal || false
  },
  SET_RESTORE_NOTIFY: (state, newVal) => {
    state.isRestoreNotify = newVal || false
  },

  SET_SUCCESS_NOTIFY: (state, newVal) => {
    state.isSuccessNotify = newVal || false
  },
  SET_FUNCTIONAL_NOTIFY: (state, newVal) => {
    state.isFunctionalNotify = newVal || false
  },
  SET_ERROR_NOTIFY: (state, newVal) => {
    state.isErrorNotify = newVal || false
  },

  CLEAR_NOTIFICATIONS: (state) => {
    state.isGeoNotify = false
    state.isRegisterNotify = false
    state.isregisterUserTypeNotify = false
    state.isActivateNotify = false
    state.isRestoreNotify = false
    state.isSuccessNotify = false
    state.isErrorNotify = false
    state.isFunctionalNotify = false
  }
}

const moduleStore = {
  state,
  getters,
  mutations
}

export default moduleStore
