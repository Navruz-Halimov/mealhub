<template>
  <div class="container">
    <vue-slick-carousel
      v-bind="SliderSettings"
      class="people"
      :class="{ disabled: isDisabled }"
      @beforeChange="changeCurrent"
    >
      <div v-for="(person, i) in peopleQuantity" :key="i" class="people__slide">
        <div
          class="people__person"
          :class="{ selected: quantity === person }"
          @click="chooseQuantity(person)"
        >
          {{ person }}
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
      required: true,
      type: Number
    },
    people: {
      type: Number,
      default: 20
    },
    oneSlide: {
      type: Boolean,
      default: false
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
    peopleQuantity () {
      const output = []
      for (let i = 1; i <= this.people; i++) {
        output.push(+i)
      }
      return output
    },
    quantity: {
      get () {
        // if (!this.isDisabled) {
        return this.value
        // } else { return -1 }
      },
      set (value) {
        this.$emit('input', value)
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
    if (this.oneSlide) {
      this.setOneSlideSliderSettings()
    } else {
      this.setDefaultSliderSettings()
    }
  },
  methods: {
    changeCurrent (oldIndex, newIndex) {
      if (this.oneSlide && !this.isMobile) {
        this.quantity = newIndex + 1
      }
    },
    chooseQuantity (person) {
      if (!this.isDisabled) {
        if (!this.oneSlide || this.isMobile) {
          this.quantity = person
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
    setOneSlideSliderSettings () {
      this.SliderSettings = {
        initialSlide: this.initialSlide - 1,
        infinite: false,
        swipeToSlide: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 6
            }
          }
        ]
      }
    },
    setDefaultSliderSettings () {
      this.SliderSettings = {
        initialSlide: this.initialSlide - 1,
        infinite: false,
        // swipeToSlide: !this.isDisabled,
        swipeToSlide: true,
        speed: 500,
        slidesToShow: 7,
        // slidesToScroll: this.isDisabled ? 0 : 1,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1750,
            settings: {
              slidesToShow: 5
            }
          },
          {
            breakpoint: 1650,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 1365,
            settings: {
              slidesToShow: 6
            }
          },
          {
            breakpoint: 1229,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 1129,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 1050,
            settings: {
              slidesToShow: 1
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 6
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

  &__back {
    position: absolute;
    width: 101%;
    height: 100%;
    top: 0;
    margin-left: -3px;
  }
}
.people {
  padding: 0 18px;
  position: relative;
  width: 100%;
  height: 100%;

  &.disabled {
    filter: grayscale(1);
    opacity: 0.3;
    cursor: default;
  }

  &__slide {
    width: 100%;
    height: 40px;
    @media screen and (max-width: 991px) {
      width: 32px;
    }
  }

  &__slide {
    width: 50px;
    outline: none;
  }

  &__person {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font: normal normal 400 14px/16px $ff-gilroy;
    border: 1px solid $c-line;
    border-radius: 4px;
    @media screen and (max-width: 991px) {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      box-shadow: 0px 3px 6px #11100029;
      margin: 7% auto;
    }

    &.selected {
      background: $orange;
      box-shadow: 0px 1px 4px $orange;
      border: 1px solid $orange;
      color: white;
    }
  }

  & /deep/ {
    .slick-prev {
      background: url('/icons/catering/new/arrow-grey.svg') 0 0 / 100% no-repeat;
      left: -3px;
      top: 13px;
      transform: rotateY(180deg);
    }

    .slick-next {
      background: url('/icons/catering/new/arrow-grey.svg') 0 0 / 100% no-repeat;
      top: 23px;
      right: 0px;
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
