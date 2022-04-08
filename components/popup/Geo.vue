<i18n>
{
  "en": {
    "logo-subtitle": "food in touch",
    "title": "For the site to work properly, you need to enable geolocation."
  },
  "ru": {
    "logo-subtitle": "на связи с едой",
    "title": "Для правильной работы сайта нуобходимо разрешить определение местоположения."
  }
}
</i18n>

<template>
  <div class="enable_geo">
    <div class="notify_logo">
      <DarkLogo :noclick="true" />
      <!-- <h3 class="notify_logo-title">
        Meal hub<span class="notify_logo-subtitle">{{ $t('logo-subtitle') }}!</span>
      </h3> -->
    </div>
    <p>{{ $t('title') }}</p>
    <span class="close" @click="close">✕</span>
  </div>
</template>

<script>
export default {
  methods: {
    close () {
      this.$store.commit('SET_GEO_POPUP', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';
    .close{
      position: absolute;
      top:.6rem;
      right:.6rem;
      cursor: pointer;
    }
    .enable_geo{
      position: fixed;
      top: 0;
      right: 0;
    max-width: 100%;
      padding: 2rem 0rem 2rem 2rem;
      font-size: 14px;
      line-height: 1.65rem;
      display: flex;
      align-items: center;
      z-index: 1000;
      background: #fff;
      border-bottom-left-radius: 5px;
      box-shadow: 0 3px 6px #cccccc55;
    }
    .enable_geo > p{
      width: 42rem;
      padding: 2rem 0 2rem 2rem;
      display: flex;
      align-items: center;
    }

    .logo{
      margin-top:-1rem;
      align-items: center;
      height: 5rem;
      width: 8rem;
    }

    .notify_logo {
      display: flex;
      align-items: center;
      height: 100%;
    }
    .notify_logo-title {
      display: flex;
      flex-direction: column;
      font-family: $ff-roboto;
      font-size: 20px;
      letter-spacing: 1.48px;
      line-height: 1.2;
    }
    .notify_logo-subtitle {
      font-family: $ff-gilroy;
      font-size: 10px;
      font-weight: 300;
      letter-spacing: 0.89px;
      margin-top: 3px;
    }

</style>
