<template>
  <div
    :class="{
      'cursor-pointer': isLogo,
    }"
    class="logo"
    @click="clickLogo"
  >
    <div class="logo__wrapper">
      <!-- <div class="logo__plate">
        <img src="~/static/icons/animated-logo/plate.svg">
      </div>
      <div class="logo__text">
        <img src="~/static/icons/logo/label.svg">
      </div>
      <div class="logo__steam">
        <img src="~/static/icons/animated-logo/steam.svg">
      </div>
      <div class="logo__steam logo__steam_second">
        <img src="~/static/icons/animated-logo/steam.svg">
      </div> -->
      <div class="logo__plate">
        <!-- <img src="~/static/icons/logo/logo.png"> -->
        <div class="logo_img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLogo: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickLogo () {
      if (!this.isLogo) { }

      const m = document.querySelector('.homepage .main_action-back button') // search
      const f = document.querySelector('.homepage .filter-back button') // filter
      const r = document.querySelector('.homepage .route-back button') // route

      if (f) { f.click() }
      if (r) { r.click() }
      if (m) { m.click() }

      this.$router.push(this.localePath('index'))
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  position: relative;
  width: 100%;
  padding-top: 100%;

  &__wrapper {
    position: absolute;
    top: -0%;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__steam {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 30%;
    margin: 0 auto;

    img {
      width: 25%;
      animation: SteamMovementAnimation 4s infinite 0.1s;
      opacity: 0;
    }

    &_second img {
      animation: SteamMovementAnimation 4s infinite 1.5s;
    }
  }

  &__plate {
    position: absolute;
    display: flex;
    // justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 27px;

    .logo_img {
      margin-top: 17%;
      // width: 80%;
      // height: 80%;
      background-image: url(/icons/logo/logo.png);
      background-repeat: no-repeat;
      background-size: contain;
      height: 47px;
      width: 100%
      // animation: PlateRotatingAnimation 2.2s infinite 0.1s linear;
    }
  }

  &__text {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100%;
    width: 100%;

    img {
      width: 72%;
      height: 72%;
      animation: TextShowingAnimation 4s forwards;
      opacity: 0;
    }
  }
}
@media screen and (max-width: 992px) {
    .logo__plate{
      top: unset;
      .logo_img{
        height: 40px;
        margin-top: 30%;
        background-image: url(/icons/logo/logo_short.png);
      }
    }
  }
@keyframes SteamMovementAnimation {
  0% {
    transform: translateY(20%);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  35% {
    opacity: 1;
  }
  70% {
    transform: translateY(-55%);
    opacity: 0;
  }
}

@keyframes PlateRotatingAnimation {
  0% {
    transform: rotateZ(0deg);
  }
  12.5% {
    transform: rotateZ(7deg);
  }
  25% {
    transform: rotateZ(10deg);
  }
  37.5% {
    transform: rotateZ(7deg);
  }
  50% {
    transform: rotateZ(0deg);
  }
  62.5% {
    transform: rotateZ(-7deg);
  }
  75% {
    transform: rotateZ(-10deg);
  }
  87.5% {
    transform: rotateZ(-7deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}

@keyframes TextShowingAnimation {
  0% {
    transform: scale(80%);
    opacity: 0;
  }
  25% {
    transform: scale(100%);
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
</style>
