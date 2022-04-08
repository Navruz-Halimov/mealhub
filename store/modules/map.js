const state = () => ({
  apiKey: 'AIzaSyBesbWEzXNLD82LezmO0CMxpYBNq2a3cgI',
  choiseOption: '',
  route: {
    from: '',
    to: '',
    movementType: ''
  },
  duration: {
    transit: '',
    driving: '',
    walking: ''
  },
  userLocation: {
    lat: 59.9361782,
    lng: 30.3140578
  },
  radius: '1'
})

const getters = {
  API_KEY: state => state.apiKey,
  MAP_CHOISE_OPTION: state => state.choiseOption,
  MAP_CIRCLE_RADIUS: state => ~~state.radius,
  ROUTE: state => state.route,
  ROUTE_DURATION: state => state.duration,
  USER_LOCATION: state => state.userLocation
}

const mutations = {
  SET_MAP_CHOISE_OPTION: (state, option) => {
    state.choiseOption = option
  },
  SET_MAP_CIRCLE_RADIUS: (state, value) => {
    state.radius = ~~value
  },
  SET_ROUTE_INFO: (state, objWithNewValue) => {
    const newRouteData = {
      ...state.route,
      ...objWithNewValue
    }
    state.route = newRouteData
  },
  SET_USER_LOCATION: (state, letlngObject) => {
    state.userLocation = letlngObject
  },
  SET_ROUTE_DURATION: (state, objWithNewValue) => {
    const newDurationData = {
      ...state.duration,
      ...objWithNewValue
    }
    state.duration = newDurationData
  },
  CHANGE_LOCATIONS: (state) => {
    const oldFrom = state.route.from
    const oldTo = state.route.to

    const newObjectRoute = {
      ...state.route,
      from: oldTo,
      to: oldFrom
    }

    state.route = newObjectRoute
  },
  RESET_ROUTE: (state) => {
    const resetRouteObject = {
      from: '',
      to: '',
      movementType: '',
      duration: ''
    }

    state.route = resetRouteObject
  },
  RESET_CHOISE_OPTION: (state) => {
    state.choiseOption = ''
  }
}

const moduleStore = {
  state, getters, mutations
}

export default moduleStore
