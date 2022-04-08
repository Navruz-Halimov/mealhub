<template>
  <div ref="wrapper" class="wrapper">
    <div class="wrapper-container">
      <Header ref="header" />
      <div class="primary_layout">
        <Nuxt />
      </div>
      <Footer />
    </div>

    <Notifications />
    <Popups />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      notificationManager: null
    }
  },
  computed: {
    ...mapGetters(['PERSONAL_DATA'])
  },
  mounted () {
    this.$subscribe()
  },
  beforeDestroy () {
    this.$unsubscribe()
  }
}
</script>

<style lang="scss">
  @import '~/assets/styles/index';

  .primary_layout{
    position: relative;
    overflow: auto;

    @media screen and (max-width: 991px) {
      background: #fff;
    }
  }

  .wrapper {
    &-container{
      display: flex;
      flex-direction: column;
      width: 100vw;
      overflow: hidden;
      height: auto;
      min-height: 100vh;
      min-height: calc(var(--vh) * 100);

      @media screen and (min-width: 992px) {
        display: grid;
        grid-template-rows: 80px 1fr 108px;
        grid-template-areas: 'header' 'main' 'footer';
        grid-row-gap: 10px;
        height: 100vh;
        height: calc(var(--vh) * 100);
      }
    }
  }
</style>
