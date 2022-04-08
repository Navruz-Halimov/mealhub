<template>
  <div class="sliders">
    <vue-slick-carousel
      v-if="primarySettings"
      ref="c1"
      v-bind="primarySettings"
      class="primary"
    >
      <div
        v-for="(image, i) in images"
        :key="i"
        class="primary__slide"
        @mousedown="startPreviewClick"
        @mouseup="(e) => endPreviewClick(e, i)"
      >
        <div
          class="primary__img"
          :style="`background-image: url('${image.path}');`"
        />
      </div>
    </vue-slick-carousel>

    <vue-slick-carousel
      v-if="secondarySettings"
      ref="c2"
      v-bind="secondarySettings"
      class="secondary"
      @afterChange="changeSlide"
    >
      <div
        v-for="(image, i) in images"
        :key="i"
        class="secondary__slide"
      >
        <div
          class="secondary__img"
          :class="{ selected: selectedSlide === i }"
          :style="`background-image: url('${image.path}');`"
        />
      </div>
    </vue-slick-carousel>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array
    }
  },
  data () {
    return {
      primarySettings: {},
      secondarySettings: {},
      cursorPosition: {},
      selectedSlide: 0
    }
  },
  computed: {
    imageList () {
      if (this.images) {
        return this.images
      } else {
        return []
      }
    }
  },
  mounted () {
    this.setDefaultSliderSettings()
  },
  methods: {
    startPreviewClick (event) {
      this.cursorPosition = {
        x: event.clientX,
        y: event.clientY
      }
    },
    endPreviewClick (event, index) {
      if (this.cursorPosition.x === event.clientX && this.cursorPosition.y === event.clientY) {
        this.$emit('click-handler', index)
      }
    },
    changeSlide (index) {
      this.selectedSlide = index
    },
    setDefaultSliderSettings () {
      this.primarySettings = {
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: this.$refs.c2,
        edgeFriction: 0.35,
        arrows: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              arrows: true
            }
          }
        ]
      }

      this.secondarySettings = {
        initialSlide: 0,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: this.$refs.c1,
        responsive: [
          {
            breakpoint: 1300,
            settings: {
              slidesToShow: 2
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

.sliders {
  .primary {
    margin: 0 -10px;
    &__slide {
      position: relative;
      width: 100%;
      padding-top: 56.25%;
      margin: 0 5px;
    }

    &__img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center center;
    }
  }

  .secondary {
    margin: 0 -3px;

    @media screen and (max-width: 991px) {
      display: none;
    }

    &__slide {
      position: relative;
      width: 100%;
      padding-top: 56.25%;
    }

    &__img {
      position: absolute;
      top: 0;
      left: 0;
      width: calc(100% - 3px);
      height: 100%;
      background-size: cover;
      background-position-x: center;
      background-origin: border-box;
      margin: 0 3px;

      &.selected {
        border: $bgc-green 3px solid;
      }
    }
  }

  & /deep/ {
    .slick-prev {
      left: 10px;
    }

    .slick-next {
      right: 10px;
    }

    @media screen and (max-width: 991px) {
      .slick-prev {
        left: 20px;
      }

      .slick-next {
        right: 20px;
      }
    }

    .slick-prev,
    .slick-next {
      z-index: 2;
      width: 30px;
      height: 30px;

      &::before {
        font-size: 30px;

        @media screen and (max-width: 991px) {
          font-size: 45px;
        }

        @media screen and (max-width: 575px) {
          font-size: 30px;
        }
      }

      @media screen and (max-width: 991px) {
        width: 45px;
        height: 45px;
      }

      @media screen and (max-width: 575px) {
        width: 30px;
        height: 30px;
      }

      &:focus::before {
        opacity: 0.75;
      }

      &:hover::before {
        opacity: 1;
      }
    }
  }
}
</style>
