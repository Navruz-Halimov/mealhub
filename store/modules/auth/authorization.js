const state = () => ({
  isAuth: false,
  token: ''
})

const getters = {
  IS_AUTHORIZATION: state => state.isAuth,
  AUTHORIZATION_TOKEN: state => state.token
}

const mutations = {
  SET_IS_AUTHORIZATION: (state, value) => {
    state.isAuth = value
  },
  SET_AUTHORIZATION_TOKEN: (state, token) => {
    state.token = `Bearer ${token}`
  }
}

const actions = {
  AUTHORIZATION ({ getters, commit }, { cookiz, userData }) {
    // Clear verification state
    commit('STOP_VERIFICATION_TIMER')
    commit('REFRESH_VERIFICATION_TIME')
    commit('RESET_VERIFICATION_METHOD')
    // commit('RESET_VERIFICATION_CODE')
    // Authorization
    commit('SET_IS_AUTHORIZATION', true)
    commit('SET_AUTHORIZATION_TOKEN', userData.auth_token)
    // Set personal data
    commit('SET_PERSONAL_DATA', userData)

    // Set cookies data
    const date = new Date(Date.now())
    date.setMonth(date.getMonth() + 1)

    cookiz.set('user_phone', userData.phone, {
      path: '/',
      expire: date,
      maxAge: 60 * 60 * 24 * 7 * 4
    })
    cookiz.set('user_email', userData.email, {
      path: '/',
      expire: date,
      maxAge: 60 * 60 * 24 * 7 * 4
    })
    cookiz.set('user_token', getters.AUTHORIZATION_TOKEN, {
      path: '/',
      expire: date,
      maxAge: 60 * 60 * 24 * 7 * 4
    })
  },
  LOG_OUT ({ getters, commit }, cookiz) {
    // Log out
    commit('REFRESH_VERIFICATION_TIME')
    commit('RESET_VERIFICATION_METHOD')
    commit('RESET_VERIFICATION_CODE')
    commit('SET_IS_AUTHORIZATION', false)
    commit('SET_AUTHORIZATION_TOKEN', '')
    // Clear all cookie data
    cookiz.remove('user_phone')
    cookiz.remove('user_email')
    cookiz.remove('user_token')
  }
}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
