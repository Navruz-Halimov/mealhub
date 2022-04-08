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
  <div class="map">
    <MapRadiusRange v-if="isbuild !== true" />
    <GMap
      ref="gMap"
      :key="wrapKey"
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
        v-for="(catering, i) in CATERING_LIST"
        :key="catering.id"
        :position="{ lat: catering.latitude, lng: catering.longitude }"
        :options="{ icon: topPointOptions(catering), catering: catering.id }"
        @click="clickMarkerHandler($event, catering, i)"
      >
        <GMapInfoWindow :options="{ maxWidth: 428, zIndex: 8888 }">
          <MapTopCard
            :top-data="catering"
            :isbuild="isbuild"
            :close="closeInfoWindows"
          />
        </GMapInfoWindow>
      </GMapMarker>

      <GMapCircle ref="gMapCircle" :options="circleOptions" />
    </GMap>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    isbuild: {
      type: Boolean
    }
  },
  data () {
    return {
      wrapKey: 0,
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
      'IS_AUTHORIZATION',
      'CURRENT_CATERING',
      'GMAP_ROUTE',
      'MAP_CHOISE_OPTION',
      'CATERING_LIST',
      'GMAP_SETTINGS',
      'GMAP_CENTER_SETTINGS',
      'GMAP_CIRCLE_OPTIONS'
    ]),
    circleOptions () {
      const a = { ...this.GMAP_CIRCLE_OPTIONS }
      a.radius = a.radius * 1000
      return {
        ...a
      }
    }
  },
  watch: {
    CATERING_LIST () {
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

  methods: {
    scrollToSelectedCatering (catering) {
      // console.warn('scrollTtoSelectedCatering(catering)', catering)

      // const bounds = new this.$refs.gMap.google.maps.LatLngBounds()

      // bounds.extend(
      const center = new this.$refs.gMap.google.maps.LatLng(
        catering.latitude,
        catering.longitude
      )
      // )

      this.$refs.gMap.map.setCenter(center)
      // this.$refs.gMap.map.setZoom(center)
      // this.$refs.gMap.map.fitBounds(bounds)
      // this.$refs.gMap.map.fitBounds(bounds)
    },

    setAllPositions (coords) {
      this.$refs.gMap.map.setCenter(coords)

      this.$store.dispatch('GET_GMAP_CENTER_POSITION', coords)
      this.$store.commit('SET_USER_LOCATION', { coords })

      this.searchForAnCatering()
    },
    gmapInit () {
      const vm = this

      this.directionServiceObject = new this.$refs.gMap.google.maps.DirectionsService()
      this.map = this.$refs.gMap.map

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
        new this.$refs.gMap.google.maps.DirectionsRenderer({
          ...options,
          polylineOptions: {
            strokeColor: '#f4c372'
          }
        })
      )
      this.$set(
        this.directionRendererArray,
        1,
        new this.$refs.gMap.google.maps.DirectionsRenderer({
          ...options,
          polylineOptions: {
            strokeColor: '#9f44de'
          }
        })
      )
      this.$set(
        this.directionRendererArray,
        2,
        new this.$refs.gMap.google.maps.DirectionsRenderer({
          ...options,
          polylineOptions: {
            strokeColor: '#42b6ec'
          }
        })
      )

      this.$store.commit(
        'SET_GMAP_GEOCODER',
        new this.$refs.gMap.google.maps.Geocoder()
      )
      this.$store.commit(
        'SET_GMAP_AUTOCOMPLETE_SERVICE',
        new this.$refs.gMap.google.maps.places.AutocompleteService()
      )

      this.$refs.gMap.google.maps.event.addListener(
        this.$refs.gMapCircle.circle,
        'click',
        this.clickMapHandler
      )
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

      // Ставим логотип на заведение "Северяне"
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
        vm.$refs.gMap.google.maps.DirectionsTravelMode.TRANSIT,
        vm.$refs.gMap.google.maps.DirectionsTravelMode.DRIVING,
        vm.$refs.gMap.google.maps.DirectionsTravelMode.WALKING
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
              vm.$refs.gMap.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
            ) {
              delayFactor++
              setTimeout(function () {
                generateRoute(index)
              }, delayFactor << 9)
            } else {
              console.log('Directions request failed due to ' + status)
              vm.resetDirections()
              console.log('status', status)
              if (status === 'ZERO_RESULTS') {
                vm.resetDirections()
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
        this.$parent.currentActionDesktop === 'route' ||
        this.$parent.currentActionMobile === 'route'
      ) {
        if (
          this.IS_AUTHORIZATION &&
          this.GMAP_ROUTE.from &&
          this.GMAP_ROUTE.to &&
          this.GMAP_ROUTE.movementType
        ) {
          vm.resetDirections(true)
          setTimeout(calculate, 100)
        }
      }
    },
    getReverseGeocodeLocation (coords) {
      this.geocoder = new this.$refs.gMap.google.maps.Geocoder()
      return this.getAddressFromLocation(this.geocoder, coords)
    },
    clickMarkerHandler (e, top, index) {
      if (this.CURRENT_CATERING && this.CURRENT_CATERING.id === top.id) {
        this.$store.commit('RESET_CURRENT_CATERING')
        this.$store.commit('SET_SELECTED_CATERING', null)
      }

      this.$store.commit('SET_CURRENT_CATERING', top)

      this.$store.commit('SET_SELECTED_CATERING', top)
      this.$refs.gMap.map.markers.forEach((item, i) => {
        if (item.infoWindow && i !== index + 1) {
          item.infoWindow.close()
        }
      })

      const vm = this
      const event = e.event ? e.event : e
      const coords = event.latLng.toJSON()
      vm.$store.commit('SET_GMAP_ROUTE', {
        to: `${top.address.street}, ${top.address.building}, ${top.address.city}`
      })

      this.getReverseGeocodeLocation(coords)
        .then((formattedAddress) => {
          vm.$store.commit('SET_GMAP_ROUTE', { to: formattedAddress })
        })
        .catch((latLngString) => {
          vm.$store.commit('SET_GMAP_ROUTE', { to: latLngString })
        })
    },
    closeInfoWindows () {
      const isInfoWindowOpen = (infoWindow) => {
        const map = infoWindow.getMap()
        return map !== null && typeof map !== 'undefined'
      }

      let state = false
      this.$refs.gMap.map.markers.forEach((item) => {
        if (item.infoWindow) {
          if (isInfoWindowOpen(item.infoWindow)) {
            state = true
            item.infoWindow.close()
          }
        }
      })
      return state
    },
    searchForAnCatering () {
      if (this.isRequest === true) {
        this.isRequest = false
        setTimeout(() => {
          this.$store.dispatch('GET_CATERING_LIST', 'search').then((res) => {
            if (res && res.status && res.status === 'success') {
              this.isRequest = true
            }
          })
        }, 200)
      }
    },

    clickMapHandler (e) {
      const event = e.event ? e.event : e
      const state = this.closeInfoWindows()

      // Убираем старые состояния
      if (this.SELECTED_CATERING && this.SELECTED_CATERING.id) {
        this.$store.commit('SET_SELECTED_CATERING', null)
      }

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
        if (vm.$refs.gMap && vm.$refs.gMap.map) {
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
      outline: none;
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
