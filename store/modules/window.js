const state = () => ({
  isMobile: true
})

const getters = {
  IS_MOBILE: state => state.isMobile
}

const mutations = {
  SET_MOBILE: (state, value = false) => {
    console.log(value)
    state.isMobile = value
  }
}

const moduleStore = {
  state, getters, mutations
}

export default moduleStore
