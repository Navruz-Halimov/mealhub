<i18n>
{
  "en": {
    "radius": "Radius",
    "km": "km"
  },
  "ru": {
    "radius": "Радиус",
    "km": "км"
  }
}
</i18n>

<template>
  <div class="map_aside">
    <div class="map_radius">
      <p class="map_radius-count">
        {{ $t('radius') }}:
        <span>{{ mapRadius }} {{ $t('km') }}</span>
      </p>
      <div class="map_radius-range">
        <basic-input-vertical-range v-model="mapRadius" min="1" max="50" />
        <!-- <basic-input-vertical-range
          v-else
          v-model="mapRadius"
          min="1"
          max="50"
        /> -->
      </div>
    </div>
    <!--<div class="map_incdec">
      <button class="map_incdec-btn" @click="plusRadiusValue">
        <span>+</span>
      </button>
      <button class="map_incdec-btn" @click="minusRadiusValue">
        <span>-</span>
      </button>
    </div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    mapRadius: {
      get () {
        return this.GMAP_CIRCLE_OPTIONS.radius
      },
      set (radius) {
        this.$store.commit('SET_GMAP_CIRCLE_OPTIONS', { radius })
      }
    },
    ...mapGetters(['GMAP_CIRCLE_OPTIONS'])
  },
  methods: {
    plusRadiusValue () {
      const newRadius = +this.GMAP_CIRCLE_OPTIONS.radius + 1
      if (newRadius > 100) {
        return
      }
      this.mapRadius = newRadius
    },
    minusRadiusValue () {
      const newRadius = +this.GMAP_CIRCLE_OPTIONS.radius - 1
      if (newRadius < 1) {
        return
      }
      this.mapRadius = newRadius
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.map {
  &_aside {
    position: absolute;
    z-index: 2;
    display: none;
    grid-template-columns: 3fr 1fr;
    grid-column-gap: 16px;
    margin: 15px;
    width: 62vh;
    width: calc(var(--vh) * 62);
    transform: rotate(90deg) translateY(-50%);
    transform-origin: center left;

    @media screen and (max-height: 720px) {
      top: -3rem;
      margin: 4px 15px;
    }

    @media screen and (min-width: 992px) {
      display: grid;
    }
  }

  &_radius {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 5px;
    width: 100%;
    background-color: $bgc-light;
    border: 1px solid $c-line;

    &-count {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
      font-family: $ff-gilroy;
      font-size: 12px;
      letter-spacing: 0.89px;

      transform: rotate(-90deg);

      span {
        font-family: $ff-roboto;
        font-size: 15px;
        color: $c-green;
      }
    }

    &-range {
      display: flex;
      align-items: center;
      border-left: {
        width: 1px;
        style: solid;
        color: $c-line;
      }
      padding: 15px;

      input {
        transform: rotate(180deg);
      }
    }
  }

  &_incdec {
    display: flex;
    background-color: $bgc-light;
    border: 1px solid $c-line;

    &-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-size: 28px;
      cursor: pointer;

      &:not(:first-child) {
        border-left: {
          width: 1px;
          style: solid;
          color: $c-line;
        }
      }

      span {
        transform: rotate(-90deg);
      }
    }
  }
}
</style>
