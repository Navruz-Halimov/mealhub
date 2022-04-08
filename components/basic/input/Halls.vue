<i18n>
{
  "en": {
    "hall" : "Hall"
  },
  "ru": {
    "hall" : "Зал"
  }
}
</i18n>

<template>
  <div class="container">
    <vue-slick-carousel
      v-if="halls.length"
      v-bind="SliderSettings"
      class="halls"
      :class="{ disabled: isDisabled }"
    >
      <div v-for="(hall, i) in tempArr" :key="i" class="halls__slide">
        <div
          class="halls__hall"
          :class="{ selected: selectedSlide === hall.id }"
          @click="showHall(hall)"
        >
          <img src="/icons/catering/choose-table-green.svg" alt="">
          <span>{{ $t('hall') }} {{ hall.hall_number || '' }}</span>
        </div>
      </div>
    </vue-slick-carousel>
    <div v-if="isDisabled" class="container__back" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: -1
    },
    halls: {
      type: Array,
      default: () => []
    },
    initialSlide: {
      type: Number,
      default: 1
    },
    isDisabled: {
      type: Boolean
    }
  },
  data () {
    return {
      SliderSettings: {},
      cursorPosition: {}
    }
  },
  computed: {
    tempArr () {
      const arr = []
      for (let i = 0; i < 6 - this.halls.length; i++) {
        arr.push({})
      }
      return [...this.halls, ...arr]
    },
    selectedSlide: {
      get () {
        // if (!this.isDisabled) {
        return this.value
        // } else { return -1 }
      },
      set (value) {
        this.$emit('input', value || 0)
      }
    }
  },
  watch: {
    initialSlide () {
      this.setDefaultSliderSettings()
      // },
      // isDisabled () {
      //   this.setDefaultSliderSettings()
    }
  },
  mounted () {
    this.setDefaultSliderSettings()
  },
  methods: {
    showHall (hall) {
      if (!this.isDisabled) {
        if (hall.id !== undefined) {
          this.selectedSlide = hall.id
          this.$emit('plan-preview', hall)
        }
      }
    },
    startPreviewClick (event) {
      this.cursorPosition = {
        x: event.clientX,
        y: event.clientY
      }
    },
    endPreviewClick (event) {
      if (
        this.cursorPosition.x === event.clientX &&
        this.cursorPosition.y === event.clientY
      ) {
        this.$emit('click-handler')
      }
    },
    setDefaultSliderSettings () {
      this.SliderSettings = {
        initialSlide: this.initialSlide - 1,
        infinite: false,
        // swipeToSlide: !this.isDisabled,
        swipeToSlide: true,
        speed: 500,
        slidesToShow: 5,
        // slidesToScroll: this.isDisabled ? 0 : 1,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1700,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 1450,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 1365,
            settings: {
              slidesToShow: 5
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 6
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 5
            }
          },
          {
            breakpoint: 350,
            settings: {
              slidesToShow: 4
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.container {
  position: relative;
  margin: 0 auto;
  @media screen and (min-width: 1200px) {
    width: 95%;
  }
  &__back {
    position: absolute;
    width: 101%;
    height: 100%;
    top: 0;
    margin-left: -3px;
  }
}

.halls {
  padding: 0 18px;
  max-width: 90vw;
  width: 100%;
  margin: 0 auto;

  &.disabled {
    filter: grayscale(1);
    opacity: 0.3;
    cursor: default;
  }

  &__slide {
    width: 50px;
    outline: none;

    @media screen and (max-width: 991px) {
      height: 56px;
    }
  }

  &__hall {
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font: normal normal 400 12px/14px $ff-gilroy;
    border: $c-line 1px solid;
    border-radius: 4px;

    @media screen and (max-width: 991px) {
      box-shadow: 0px 3px 6px #11100029;
    }

    &.selected {
      border: $bgc-green 1px solid;
    }
  }

  & /deep/ {
    .slick-prev {
      background: url('/icons/catering/new/arrow-grey.svg') 0 0 / 100% no-repeat;
      left: -3px;
      top: 16px;
      transform: rotateY(180deg);
    }

    .slick-next {
      background: url('/icons/catering/new/arrow-grey.svg') 0 0 / 100% no-repeat;
      right: 3px;
    }

    .slick-arrow {
      z-index: 2;
      width: 16px;
      opacity: 0.75;

      &::before {
        display: none;
      }
    }
  }
}
</style>
