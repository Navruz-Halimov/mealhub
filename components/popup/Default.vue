<template>
  <div class="popup_wrap default_popup" @mousedown="close">
    <div class="popup" @mousedown.stop>
      <span class="popup-close" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.859 33.859"><path d="M21.8,9.833H14.536a.428.428,0,0,1-.428-.428V2.138a2.138,2.138,0,1,0-4.275,0V9.406a.428.428,0,0,1-.428.428H2.138a2.138,2.138,0,1,0,0,4.275H9.406a.428.428,0,0,1,.428.428V21.8a2.138,2.138,0,0,0,4.275,0V14.536a.428.428,0,0,1,.428-.428H21.8a2.138,2.138,0,0,0,0-4.275Zm0,0" transform="translate(16.93) rotate(45)" /></svg>
      </span>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    document.body.classList.add('overflow-hidden')
  },
  beforeDestroy () {
    document.body.classList.remove('overflow-hidden')
  },
  methods: {
    close () {
      this.$emit('close-popup')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var.scss';

.popup {
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 7px;
  padding: 3em 0;
  width: 90%;
  /*height: 80%;   Под сомнением*/
  background-color: #fff;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-image: url('/images/backgroundPopup.png');
    background-repeat: repeat;
    opacity: .1;
  }

  @media screen and (min-width: 992px) {
    width: 73rem;
    max-height: 70%;
  }

  &_wrap {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    height: calc(var(--vh) * 100);
    overflow: hidden;
    background-color: rgba(0,0,0,.5);
    @media screen and (min-width: 992px) {
      z-index: 999;
    }
  }

  &-close {
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

  & form {
    z-index: 2;
    background: transparent;
  }
}
</style>
