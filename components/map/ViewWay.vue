<i18n>
{
  "en": {
    "geoerror": "Your location could not be determined",
    "myGeolocation": "Your location"
  },
  "ru": {
    "geoerror": "Невозможно определить местоположение",
    "myGeolocation": "Ваша геолокация"
  }
}
</i18n>

<template>
  <div class="map way">
    <GMap
      ref="gMapView"
      :key="108 + wrapKey"
      :language="
        $route.name.search('ru') !== -1 ? 'ru' : GMAP_SETTINGS.language
      "
      :center="GMAP_SETTINGS.center"
      :options="GMAP_SETTINGS.options"
      :zoom="GMAP_SETTINGS.zoom"
      :gesture-handling="GMAP_SETTINGS.gestureHandling"
      @click="clickMapHandler"
      @init="gmapInit"
    >
      <!-- Center marker -->
      <GMapMarker
        :key="0"
        :position="GMAP_CENTER_SETTINGS.position"
        :options="GMAP_CENTER_SETTINGS.options"
      >
        <GMapInfoWindow :options="{ maxWidth: 200 }">
          <p class="myGeolocation">
            {{ $t('myGeolocation') }}
          </p>
        </GMapInfoWindow>
      </GMapMarker>
      <!-- CATERING markers -->
      <GMapMarker
        :key="CURRENT_CATERING.id"
        :position="{
          lat: CURRENT_CATERING.latitude,
          lng: CURRENT_CATERING.longitude
        }"
        :options="{
          icon: topPointOptions(CURRENT_CATERING),
          catering: CURRENT_CATERING.id
        }"
      >
        <GMapInfoWindow :options="{ maxWidth: 428, zIndex: 8888 }">
          <MapTopCard :top-data="CURRENT_CATERING" :isbuild="true" />
        </GMapInfoWindow>
      </GMapMarker>
    </GMap>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      wrapKey: 0,
      way: {},
      isRequest: true, // Поиск ретсоранов
      directionServiceObject: {},
      directionRendererArray: [],
      map: {},
      geocoder: {},
      autocompleteService: {},
      pins: {
        selected: '/icons/consumables/dinner-pink.svg',
        premium: '/icons/consumables/premium-top.svg',
        withlogo: '/icons/consumables/withlogo.svg',
        notSelected: '/icons/consumables/dinner.svg'
      },
      clusterStyle: [
        {
          url:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'SELECTED_CATERING',
      'CURRENT_CATERING',
      'GMAP_ROUTE',
      'MAP_CHOISE_OPTION',
      'CATERING_LIST',
      'GMAP_SETTINGS',
      'GMAP_CENTER_SETTINGS'
    ])
  },
  watch: {
    systemTime (val) {
      if (val % 2 === 0) {
        this.$forceUpdate()
        this.map.setZoom(this.map.getZoom())
        this.map.panBy(0, 0)
      }
    },
    GMAP_CENTER_SETTINGS (coords) {
      this.wrapKey++ // reload Map
      console.warn('GMAP_CENTER_SETTINGS watch', coords)
    },
    CURRENT_CATERING () {
      this.wrapKey++ // reload Map
      const vm = this
      vm.calculateAndDisplayRoute(vm.directionServiceObject)
    },
    'GMAP_CIRCLE_OPTIONS.radius' (value) {
      requestAnimationFrame(() => {
        this.$refs.gMapCircle.circle.setRadius(value)
      })
      this.searchForAnCatering()
    },
    MAP_CHOISE_OPTION () {
      if (this.MAP_CHOISE_OPTION === 'user') {
        this.getUserGeolocation()
      }
    },
    'GMAP_ROUTE.from' () {
      const vm = this
      vm.calculateAndDisplayRoute(vm.directionServiceObject)
    },
    'GMAP_ROUTE.to' () {
      const vm = this
      vm.calculateAndDisplayRoute(vm.directionServiceObject)
    },
    'GMAP_ROUTE.movementType' () {
      const vm = this

      if (
        vm.directionRendererArray &&
        vm.directionRendererArray[0] &&
        vm.directionRendererArray[1] &&
        vm.directionRendererArray[2]
      ) {
        vm.directionRendererArray[0].setOptions({
          polylineOptions: {
            strokeColor: '#f4c372'
          }
        })
        vm.directionRendererArray[1].setOptions({
          polylineOptions: {
            strokeColor: '#9f44de'
          }
        })
        vm.directionRendererArray[2].setOptions({
          polylineOptions: {
            strokeColor: '#42b6ec'
          }
        })
        vm.calculateAndDisplayRoute(vm.directionServiceObject)
      }
    }
  },
  async created () {
    const vm = this
    const cookiz = this.$cookies

    if (process.browser) {
      const q = this.b64d(this.$route.query.q)
      this.way = JSON.parse(q)
      console.warn('this.way: ', this.way, this.b64e(this.way))

      if (this.way) {
        // FROM
        if (this.way.catering) {
          const id = this.way.catering
          await this.$store.dispatch('GET_CURRENT_CATERING', { cookiz, id })

          const top = this.CURRENT_CATERING
          const coords = {
            lat: parseFloat(top.latitude),
            lng: parseFloat(top.longitude)
          }

          vm.wait(() => {
            if (vm.$refs.gMapView && vm.$refs.gMapView.map) {
              this.getReverseGeocodeLocation(coords)
                .then((formattedAddress) => {
                  console.warn('ViewWay: to catering address', formattedAddress)
                  vm.$store.commit('SET_GMAP_ROUTE', { to: formattedAddress })
                  vm.$store.commit('SET_MAP_CHOISE_OPTION', '')
                })
                .catch((latLngString) => {
                  console.warn('ViewWay: to catering coords', latLngString)
                  vm.$store.commit('SET_GMAP_ROUTE', {
                    to: `${top.address.street}, ${top.address.building}, ${top.address.city}`
                  })
                  vm.$store.commit('SET_MAP_CHOISE_OPTION', '')
                })

              vm.$forceUpdate()

              return true
            } else {
              return false
            }
          })
        } else if (this.way.to) {
          this.$store.commit('SET_GMAP_ROUTE', { to: this.way.to })
          this.$store.commit('SET_MAP_CHOISE_OPTION', '')
        }
        this.getUserGeolocation()
      }
    }
  },

  methods: {
    setAllPositions (coords) {
      this.$refs.gMapView.map.setCenter(coords)

      this.$store.dispatch('GET_GMAP_CENTER_POSITION', coords)
      this.$store.commit('SET_USER_LOCATION', { coords })
    },
    gmapInit () {
      const vm = this

      this.directionServiceObject = new this.$refs.gMapView.google.maps.DirectionsService()
      this.map = this.$refs.gMapView.map

      const options = {
        map: vm.map,
        preserveViewport: true,
        polylineOptions: {
          strokeColor: '#6e6e6e'
        }
      }

      // Add DirectionRenderer Object for map
      this.$set(
        this.directionRendererArray,
        0,
        new this.$refs.gMapView.google.maps.DirectionsRenderer({
          ...options,
          polylineOptions: {
            strokeColor: '#f4c372'
          }
        })
      )
      this.$set(
        this.directionRendererArray,
        1,
        new this.$refs.gMapView.google.maps.DirectionsRenderer({
          ...options,
          polylineOptions: {
            strokeColor: '#9f44de'
          }
        })
      )
      this.$set(
        this.directionRendererArray,
        2,
        new this.$refs.gMapView.google.maps.DirectionsRenderer({
          ...options,
          polylineOptions: {
            strokeColor: '#42b6ec'
          }
        })
      )

      this.$store.commit(
        'SET_GMAP_GEOCODER',
        new this.$refs.gMapView.google.maps.Geocoder()
      )
      this.$store.commit(
        'SET_GMAP_AUTOCOMPLETE_SERVICE',
        new this.$refs.gMapView.google.maps.places.AutocompleteService()
      )

      // this.trafficLayer = new this.$refs.gMapView.google.maps.TrafficLayer()
      // this.trafficLayer.setMap(this.map)
    },
    closeCurrentWindowInfo (index) {
      const vm = this

      this.CATERING_LIST.forEach((top, i) => {
        console.dir(vm.$refs)
        if (index < 0) {
          vm.$refs[`infoWindow-${i}`].close()
        } else if (i !== index) {
          vm.$refs[`infoWindow-${i}`].close()
        }
      })
    },
    topPointOptions (top) {
      let selectPin, size, scaledSize
      size = {
        height: 25,
        width: 30
      }
      scaledSize = {
        height: 25,
        width: 30
      }

      if (!this.SELECTED_CATERING) {
        selectPin = this.pins.notSelected
      } else {
        selectPin =
          this.SELECTED_CATERING.latitude === top.latitude &&
          this.SELECTED_CATERING.longitude === top.longitude
            ? this.pins.selected
            : this.pins.notSelected
      }

      if (top.subscription_plan === 'premium') {
        selectPin = this.pins.premium
      }

      // Ставим логотип на заведение Северяне
      if (top.id === 2395) {
        selectPin = this.pins.withlogo
        size = {
          height: 36,
          width: 36
        }
        scaledSize = {
          height: 36,
          width: 36
        }
      }

      return {
        url: selectPin,
        size,
        scaledSize,
        origin: {
          x: 0,
          y: 0
        }
      }
    },
    resetDirections (softreset) {
      if (!softreset) {
        this.$store.commit('SET_GMAP_ROUTE_DURATION', {
          transit: 0,
          driving: 0,
          walking: 0
        })
      }
      for (let i = 0; i <= 2; i++) {
        this.directionRendererArray &&
          this.directionRendererArray[i] &&
          this.directionRendererArray[i].set('directions', null)
      }
    },
    calculateAndDisplayRoute (service) {
      const vm = this
      const origin = this.GMAP_ROUTE.from
      const destination = this.GMAP_ROUTE.to
      const travelMode = [
        vm.$refs.gMapView.google.maps.DirectionsTravelMode.TRANSIT,
        vm.$refs.gMapView.google.maps.DirectionsTravelMode.DRIVING,
        vm.$refs.gMapView.google.maps.DirectionsTravelMode.WALKING
      ]
      const types = ['transit', 'driving', 'walking']
      let delayFactor = 0

      const generateRoute = (index) => {
        const request = {
          origin,
          destination,
          travelMode: travelMode[index]
        }

        return new Promise((resolve) => {
          service.route(request, function (response, status) {
            if (status === 'OK') {
              const duration = {}
              const key = types[index]
              duration[key] = Math.floor(
                response.routes[0].legs[0].duration.value / 60
              )
              if (types.indexOf(vm.GMAP_ROUTE.movementType) === index) {
                // Отрисовываем только выбраный путь
                vm.directionRendererArray[index].setDirections(response)
              }
              vm.$store.commit('SET_GMAP_ROUTE_DURATION', duration)
              resolve(duration)
            } else if (
              status ===
              vm.$refs.gMapView.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
            ) {
              console.log('over limit')
              delayFactor++
              setTimeout(function () {
                generateRoute(index)
              }, delayFactor << 9)
            } else {
              console.log('Directions request failed due to ' + status)
              if (status === 'ZERO_RESULTS') {
                console.log('zero result')
                vm.resetDirections()
                console.log('Directions request failed due to ' + status)
              }
            }
          })
        })
      }
      async function calculate () {
        await generateRoute(0)
        await generateRoute(1)
        await generateRoute(2)
      }

      if (
        this.GMAP_ROUTE.from &&
        this.GMAP_ROUTE.to &&
        this.GMAP_ROUTE.movementType
      ) {
        vm.resetDirections(true)
        setTimeout(calculate, 100)
      }
    },
    getReverseGeocodeLocation (coords) {
      this.geocoder = new this.$refs.gMapView.google.maps.Geocoder()
      return this.getAddressFromLocation(this.geocoder, coords)
    },
    closeInfoWindows () {
      const isInfoWindowOpen = (infoWindow) => {
        const map = infoWindow.getMap()
        return map !== null && typeof map !== 'undefined'
      }

      let state = false
      this.$refs.gMapView.map.markers.forEach((item) => {
        if (item.infoWindow) {
          if (isInfoWindowOpen(item.infoWindow)) {
            state = true
            item.infoWindow.close()
          }
        }
      })
      return state
    },

    clickMapHandler (e) {
      const event = e.event ? e.event : e
      const state = this.closeInfoWindows()

      // If user want to input his location by click on the map
      if (state === false) {
        const coords = event.latLng.toJSON()
        this.setCoordinates(coords)
      }
    },
    getUserGeolocation () {
      const vm = this
      vm.eatmeUserGeolocation().then((position) => {
        const coords = {
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude)
        }
        vm.setCoordinates(coords)
      })
    },
    setCoordinates (coords) {
      const vm = this
      vm.wait(() => {
        if (vm.$refs.gMapView && vm.$refs.gMapView.map) {
          vm.setAllPositions(coords)
          vm.getReverseGeocodeLocation(coords)
            .then((formattedAddress) => {
              vm.$store.commit('SET_GMAP_ROUTE', { from: formattedAddress })
              vm.$store.commit('SET_MAP_CHOISE_OPTION', '')
            })
            .catch((latLngString) => {
              vm.$store.commit('SET_GMAP_ROUTE', { from: latLngString })
              vm.$store.commit('SET_MAP_CHOISE_OPTION', '')
            })

          return true
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.myGeolocation {
  border-radius: $br-block-desktop;
  background: white !important;
  padding: 15px 20px;
}

.map {
  position: relative;
  background-color: $light;
  width: 100%;
  height: 100%;
  overflow: visible;

  @media screen and (min-width: 992px) {
    border-radius: $br-block-desktop;
  }

  /deep/ .GMap {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    overflow: visible;

    &__Wrapper {
      height: 100%;
      overflow: visible;
    }

    &__InfoWindow {
      display: none;
      width: 100%;
      height: 100%;
      overflow: visible;

      @media screen and (min-width: 992px) {
        display: flex;
      }
    }
    .gm-style-iw {
      overflow: visible !important;
    }
    .gm-style-iw-c {
      background-color: transparent;
      box-shadow: none;
    }
    .gm-style-iw-t {
      &::after {
        display: none;
        @media screen and (min-width: 992px) {
          display: block;
        }
      }
    }
    .gm-style-iw-d {
      overflow: visible !important;
      background-color: transparent;
    }
    .gm-ui-hover-effect {
      display: none !important;
    }
  }
}
</style>
