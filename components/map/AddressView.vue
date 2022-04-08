<i18n>
{
  "en": {
    "geoerror": "Your location could not be determined",
    "myGeolocation": "Your address"
  },
  "ru": {
    "geoerror": "Невозможно определить местоположение",
    "myGeolocation": "Ваша адрес"
  }
}
</i18n>
<template>
  <div class="map">
    <GMap
      ref="gMap"
      :key="wrapKey"
      :language="GMAP_SETTINGS.language"
      :center="{
        lat: +addressData.latitude || 59.9361782,
        lng: +addressData.longitude || 30.3140578
      }"
      :options="GMAP_SETTINGS.options"
      :zoom="GMAP_SETTINGS.zoom"
      @init="gmapInit"
      @click="clickMapHandler"
    >
      <!-- Center marker -->
      <GMapMarker
        ref="gMapCenterMarker"
        :position="{
          lat: +addressData.latitude || 59.9361782,
          lng: +addressData.longitude || 30.3140578
        }"
        :options="GMAP_CENTER_SETTINGS.options"
      >
        <GMapInfoWindow>
          <code>
            <p class="myGeolocation">
              {{ $t('myGeolocation') }}
            </p>
          </code>
        </GMapInfoWindow>
      </GMapMarker>
    </GMap>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    addressData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      wrapKey: 'mapkey_' + ~~(Math.random() * 100000),
      map: null,
      geocoder: null,
      marker: null,
      pins: {
        selected: '/images/dinner-pink.png',
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
    ...mapGetters(['GMAP_SETTINGS', 'GMAP_CENTER_SETTINGS'])
  },
  watch: {
    addressData () {
      this.wrapKey++
    }
  },
  methods: {
    gmapInit () {
      console.warn('gmapInit')
      if (this.$refs && this.$refs.gMap) {
        this.map = this.$refs.gMap.map
        this.marker = this.$refs.gMapCenterMarker
        this.geocoder = new this.$refs.gMap.google.maps.Geocoder()
      }
    },
    changeMarkerPosition (lat, lng) {
      const latlng = new this.$refs.gMap.google.maps.LatLng(
        parseFloat(lat),
        parseFloat(lng)
      )
      this.marker.marker.setPosition(latlng)
    },
    setCoords (coords) {
      const vm = this
      console.warn('setCoords', coords)

      vm.$store.commit('SET_GMAP_SETTINGS', { center: coords })
      vm.$store.commit('SET_GMAP_CENTER_SETTINGS', { position: coords })
      vm.$store.commit('SET_GMAP_CIRCLE_OPTIONS', { center: coords })
      vm.$store.commit('SET_USER_LOCATION', coords)

      vm.getAddressFromLocation(vm.geocoder, coords)
        .then((formattedAddress) => {
          vm.map.setCenter(coords)
          vm.changeMarkerPosition(coords.lat, coords.lng)
          vm.$emit('input', {
            address: formattedAddress,
            latitude: coords.lat,
            longitude: coords.lng
          })
        })
        .catch(() => {
          setTimeout(() => {
            vm.map.setCenter(coords)
          }, 2000)

          vm.changeMarkerPosition(coords.lat, coords.lng)
          vm.$emit('input', { latitude: coords.lat, longitude: coords.lng })
        })
    },

    getUserGeolocation () {
      const vm = this
      vm.eatmeUserGeolocation().then((position) => {
        vm.setCoords({
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude)
        })
      })
    },
    clickMapHandler (e) {
      const event = e.event ? e.event : e
      const coords = event.latLng.toJSON()
      this.setCoords(coords)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
.myGeolocation {
  background: white;
  padding: 6px;
  border-radius: 30px;
}
.map {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

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

    &__Wrapper {
      height: 100%;
    }

    &__InfoWindow {
      display: none;
      width: 100%;
      height: 100%;

      @media screen and (min-width: 992px) {
        display: flex;
      }
    }

    .gm-style-iw-c {
      background-color: transparent;
      box-shadow: none;
    }
    .gm-style-iw-d {
      overflow: hidden !important;
      background-color: transparent;
    }

    .gm-ui-hover-effect {
      top: -5px !important;
      right: 0 !important;
    }
  }
}
</style>
