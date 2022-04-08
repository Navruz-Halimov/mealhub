<template>
  <div class="popup__wrap notification_popup" @pointerdown="close">
    <div
      :class="{
        background: hasBackground,
        'dish-card': isDishCard,
        'red-border': border,
        'full-height': isFullHeight
      }"
      class="popup"
      @pointerdown.stop
    >
      <span class="popup__close" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.859 33.859">
          <path
            d="M21.8,9.833H14.536a.428.428,0,0,1-.428-.428V2.138a2.138,2.138,0,1,0-4.275,0V9.406a.428.428,0,0,1-.428.428H2.138a2.138,2.138,0,1,0,0,4.275H9.406a.428.428,0,0,1,.428.428V21.8a2.138,2.138,0,0,0,4.275,0V14.536a.428.428,0,0,1,.428-.428H21.8a2.138,2.138,0,0,0,0-4.275Zm0,0"
            transform="translate(16.93) rotate(45)"
          />
        </svg>
      </span>
      <div v-body-scroll-lock="modalIsOpen" class="popup__container">
        <div
          :class="{ popup__content_padding: !noPadding }"
          class="popup__content"
        >
          <slot />
        </div>
      </div>

      <div
        v-if="isDishCard && prevDish && !imgPreview"
        class="dishCard-arrow prev cursor-pointer"
        @click="prevClick"
      >
        <img
          class="dishCard_nav-arrow left"
          src="/icons/catering/new/arrow-grey.svg"
          alt=""
        >
      </div>
      <div
        v-if="isDishCard && nextDish && !imgPreview"
        class="dishCard-arrow next cursor-pointer"
        @click="nextClick"
      >
        <img
          class="dishCard_nav-arrow right"
          src="/icons/catering/new/arrow-grey.svg"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasBackground: {
      type: Boolean,
      default: true
    },
    isDishCard: {
      type: Boolean,
      default: false
    },
    condition: {
      type: [Boolean, null],
      default: null
    },
    noPadding: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    prevDish: {
      type: Boolean,
      default: false
    },
    nextDish: {
      type: Boolean,
      default: false
    },
    imgPreview: {
      type: Boolean,
      default: false
    },
    isFullHeight: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      modalIsOpen: false
    }
  },
  watch: {
    condition (value) {
      if (value === null) {
        return
      }

      if (value) {
        this.lockBody()
      } else {
        this.unlockBody()
      }
    }
  },
  mounted () {
    if (this.condition === null) {
      this.lockBody()
    }
  },
  beforeDestroy () {
    if (this.condition === null) {
      this.unlockBody()
    }
  },
  methods: {
    close () {
      this.$emit('close-popup')
    },
    lockBody () {
      // this.modalIsOpen = true
      this.$set(this, 'modalIsOpen', true)
      // document.body.classList.add('overflow-hidden')
    },
    unlockBody () {
      // this.modalIsOpen = false
      this.$set(this, 'modalIsOpen', false)
      // document.body.classList.remove('overflow-hidden')
    },
    prevClick () {
      this.$emit('prev-click')
    },
    nextClick () {
      this.$emit('next-click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var.scss';

.popup {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  width: 90%;
  min-height: 600px;
  max-height: calc(100% - 65px);
  margin-top: 45px;
  margin-bottom: 20px;
  background-color: #fff;

  &.dish-card {
    justify-content: flex-start;
    @media screen and (max-width: 991px) {
      min-height: auto;
      margin-bottom: 65px;
      max-height: calc(100% - 108px);
    }
  }

  &.red-border {
    border: #eb618d 2px solid;
    box-sizing: content-box;
  }

  &.full-height {
    height: 600px;

    @media screen and (max-width: 991px) {
      height: calc(100% - 65px);
    }

    .popup {
      &__container {
        height: 100%;
      }

      &__content {
        height: 100%;
      }
    }
  }

  @media screen and (max-height: 660px) {
    min-height: auto;
  }

  &.background::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-image: url('/images/backgroundPopup.png');
    background-repeat: repeat;
    opacity: 0.1;
  }

  @media screen and (min-width: 992px) {
    width: 800px;
  }

  &__wrap {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12312312;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);
    touch-action: none;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    width: 35px;
    height: 35px;
    transform: translateY(calc(-100% - 5px));
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
      fill: $c-light;
    }
  }

  &__container {
    overflow: auto;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  &__content {
    &_padding {
      padding: 3em 0;
    }
  }
}

.dishCard-arrow {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  padding: 1rem;
  width: 35vw;
  background-color: rgba(250, 250, 250, 0.65);
  transform: translateY(100%);

  @media screen and (min-width: 992px) {
    width: auto;
    transform: translateY(-50%);
  }

  &.prev {
    bottom: -10px;
    left: 0;

    @media screen and (min-width: 992px) {
      top: 50%;
      bottom: auto;
      left: -15px;
      transform: translateX(-100%);
      width: 5rem;
      border-radius: 50%;
      height: 5rem;
      margin-right: 8px;
    }
  }

  &.next {
    bottom: -10px;
    right: 0;

    @media screen and (min-width: 992px) {
      top: 50%;
      bottom: auto;
      right: -15px;
      transform: translateX(100%);
      width: 5rem;
      border-radius: 50%;
      height: 5rem;
      margin-left: 3px;
    }
  }
}
.dishCard_nav-arrow {
  margin-left: 3px;
  flex: 0 0 15px;
  width: 15px;
  height: 15px;
  object-fit: contain;
  cursor: pointer;

  &.left {
    margin-left: 0;
    margin-right: 3px;
    transform: rotate(180deg);
  }
}
</style>
