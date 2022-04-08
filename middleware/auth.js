export default function ({ app, store, redirect }) {
  if (app.$cookies.get('user_token') && app.$cookies.get('user_token').length !== 0) {
    store.dispatch('GET_PERSONAL_DATA', app.$cookies)
    store.commit('SET_IS_AUTHORIZATION', true)
    store.commit('SET_AUTHORIZATION_TOKEN', app.$cookies.get('user_token').replace('Bearer ', ''))
  }
}
