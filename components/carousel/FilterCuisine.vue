<template>
  <vue-slick-carousel v-if="!$_.isEmpty(cuisineList)" v-bind="settings ? settings : carouselSettings" class="cuisineCarousel">
    <template #prevArrow>
      <span class="cuisineCarousel-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736"><g><path d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z" /></g></svg>
      </span>
    </template>

    <div
      v-for="(cuisine, i) in cuisineList"
      :key="i"
      class="cuisineCarousel_wrap"
      data-class="carouselItem"
      data-value="cuisine"
      @click="$emit('click-handler', cuisine)"
    >
      <div class="cuisineCarousel_item">
        <img class="cuisineCarousel-img" src="/images/flags/britain.png" alt="">
      </div>
    </div>

    <template #nextArrow>
      <span class="cuisineCarousel-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736"><g><path d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z" /></g></svg>
      </span>
    </template>
  </vue-slick-carousel>
  <div v-else class="cuisineCarousel" />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    settings: {
      type: Object
    },
    cuisines: {
      type: Array
    }
  },
  data () {
    return {
      carouselSettings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        touchThreshold: 5
      }
    }
  },
  computed: {
    cuisineList () {
      if (this.cuisines) {
        return this.cuisines
      } else if (!this.$_.isEmpty(this.CATERING_FILTER_SETTINGS.cuisine.forwardList)) {
        return this.CATERING_FILTER_SETTINGS.cuisine.forwardList
      } else {
        return []
      }
    },
    ...mapGetters(['CATERING_FILTER_SETTINGS'])
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';

  .cuisineCarousel {
    position: relative;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;

    @media screen and (min-width: 992px) {
      width: 75%;
      max-width: 75%;
    }

    &_wrap {
      padding: 5px;
    }

    &_item {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #939393;
      border-radius: 7px;
      padding: 5px;
      background-color: $light;
    }

    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-arrow {
      display: none;
      align-items: center;
      justify-content: center;
      flex: 0 0 20px;
      width: 20px;
      height: 15px;

      @media screen and (min-width: 992px) {
        display: flex;
      }

      &:first-child {

        & svg {
          transform-origin: center;
          transform: rotate(180deg);
        }
      }

      svg {
        width: 100%;
        height: 100%;
        fill: $c-primary;
      }
    }

    & /deep/ .slick-arrow::before {
      display: none;
    }
  }

</style>
