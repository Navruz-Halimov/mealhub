<i18n>
{
  "en": {
    "shareTitle": "Meal hub: Way to catering",
    "time": "min"
  },
  "ru": {
    "shareTitle": "Meal hub: Маршрут к заведению",
    "time": "мин"
  }
}
</i18n>

<template>
  <div class="route_subactions">
    <div class="routeMobileSubmenu flex j_b a_c">
      <div class="sn1 flex a_c">
        <template>
          <span>{{ routeDuration }} {{ $t('time') }},</span>
          <span class="text-gray">(~{{ routeDistance }} km)</span>
        </template>
        <img
          class="share-icon"
          src="/images/icons/actions/share_disabled.png"
          alt=""
          @click="shareWay"
        >
      </div>

      <div class="sn2 flex a_c eatme-btn-orange">
        <img class="go-icon" src="/images/icons/go.svg" alt="">GO
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    routeDistance () {
      const type = this.GMAP_ROUTE.movementType
      let dist = this.routeDuration
      if (type === 'transit') {
        dist *= 0.73
      } else if (type === 'driving') {
        dist *= 0.83
      } else if (type === 'walking') {
        dist *= 0.083
      }

      return (dist && dist.toFixed(2)) || 0
    },
    routeDuration () {
      const type = this.GMAP_ROUTE.movementType
      const duration = this.GMAP_ROUTE_DURATION
      if (type === 'transit') {
        return duration.transit || 0
      }
      if (type === 'driving') {
        return duration.driving || 0
      }
      if (type === 'walking') {
        return duration.walking || 0
      }
      return 0
    },
    ...mapGetters(['GMAP_ROUTE', 'GMAP_ROUTE_DURATION'])
  },
  methods: {
    shareWay () {
      let way = {
        catering: this.CURRENT_CATERING.id,
        to: `${this.CURRENT_CATERING.address.city}, ${this.CURRENT_CATERING.address.street}, ${this.CURRENT_CATERING.address.building}`
      }
      way = JSON.stringify(way)
      way = this.b64e(way)
      const url =
        window.location.origin +
        this.localePath({ path: '/way', query: { q: way } })
      this.shareData({
        title: this.$t('shareTitle'),
        url
      })
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/abstract/var';
.share-icon {
  margin-left: 15px;
  width: 25px;
  height: 25px;
  box-shadow: 0px 3px 6px #11100026;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;

  @media screen and (min-width: 992px) {
    width: 30px;
    height: 30px;
  }
}
.sn2 {
  padding: 0 1.55rem;
}
.go-icon {
  height: 1.25em;
  margin-right: 10px;
}
.route_subactions {
  padding: 5px 16px;
}
.routeMobileSubmenu {
  display: none;
}
.compact .routeMobileSubmenu {
  display: flex;
  font-size: 14px;
  padding: 2rem 0;
}
</style>
