const state = () => ({
  gmapApiKey: 'AIzaSyBesbWEzXNLD82LezmO0CMxpYBNq2a3cgI'
})

const getters = {
  GMAP_API_KEY: state => state.gmapApiKey
}

const moduleStore = {
  state, getters
}

export default moduleStore
