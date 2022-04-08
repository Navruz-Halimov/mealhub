<i18n>
{
  "en": {
    "redirectToCurrentCatering": "Back to catering"
  },
  "ru": {
    "redirectToCurrentCatering": "обратно в заведение"
  }
}
</i18n>

<template>
  <div ref="wrapper" class="wrapper">
    <div class="wrapper-container">
      <Header ref="header" />
      <div class="orderssection_layout">
        <main
          class="main"
          :class="{
            'history_page': $route.name === '/history',
            'orders_page': $route.name === '/orders',
            'order_page': $route.name
          }"
        >
          <div class="main_body">
            <div class="menucontainernew">
              <MainActions :current-action="''" class="gbadfgadfgadsg desktop" @select-action="selectOrdersMenuAction" />
              <nav class="main_menu">
                <div v-if="order && isOrdersPage" class="main_menu-back">
                  <addition-back
                    :text="$t('redirectToCurrentCatering')"
                    :route="localePath({ path: `/catering/${order.catering_id}` })"
                  />
                </div>
                <div v-else class="main_menu-back">
                  <addition-back />
                </div>
                <menu-cart-menu :active-link="$route.name" />
              </nav>
            </div>

            <Nuxt />

            <div class="main_news">
              <MainNews />
            </div>
          </div>
        </main>
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
      interval: null,
      notificationManager: null
    }
  },
  computed: {
    ...mapGetters([
      'IS_CURRENT_ORDERS_LOADED',
      'IS_HISTORY_LOADED'
    ]),
    order () {
      return this.currentOrderMethod()
    },
    isOrdersPage () {
      const routes = this.$route.fullPath.split('/')

      return routes[routes.length - 1] === 'orders'
    }
  },
  watch: {
    'PERSONAL_DATA' () {
      try {
        this.reloadAllUserOrders()
      } catch (err) {
        console.warn('catch reloadAllUserOrders', err)
      }
    },
    'CURRENT_ORDER' () {
      try {
        this.reloadAllUserOrders()
      } catch (err) {
        console.warn('catch reloadAllUserOrders', err)
      }
    },
    IS_CURRENT_ORDERS_LOADED () {
      this.tryFinishLoading()
    },
    IS_HISTORY_LOADED () {
      this.tryFinishLoading()
    }
  },
  beforeCreate () {
    this.$nextTick(() => this.$nuxt.$loading.start())
  },
  mounted () {
    this.$subscribe()
    this.tryFinishLoading()
    this.$store.dispatch('GET_PERSONAL_DATA', this.$cookies)
  },
  created () {
    this.reloadAllUserOrders()
    this.interval = setInterval(() => {
      this.reloadAllUserOrders()
    }, 3500)
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('CLEAR_NOTIFICATIONS')
    this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
    clearInterval(this.interval)
    next()
  },
  beforeDestroy () {
    clearInterval(this.interval)
    this.$unsubscribe()
  },
  methods: {
    tryFinishLoading () {
      if (this.IS_CURRENT_ORDERS_LOADED && this.IS_HISTORY_LOADED) {
        this.$nextTick(() => this.$nuxt.$loading.finish())
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/styles/index';

  .orders_container{
    position: relative;
    justify-items: center;
    border-radius: 0;
    padding: 10px 20px;
    background-color: $c-light;
    height: 100%;
    width: 100%;

    @media screen and (min-width: 992px) {
      border-radius: $br-block-desktop;
      width: 69%;
    }

    .orders {
      &.mobile {
        min-height: 62vh;
        min-height: calc(var(--vh) * 62);
      }

      position: relative;
      justify-items: center;
      height: 100%;
      width: 100%;

      &_list {
        width:100%;
        margin-top:2rem;
        overflow: auto;
        height: 100%;
      }

      &-back {
        position: absolute;
        top: 10px;
        left: 10px;

        @media screen and (min-width: 992px) {
          display: none;
        }

        & /deep/ {
          .link-back {
            font-size: 14px;

            &-icon {
              flex: 0 0 15px;
              width: 15px;
              height: 10px;
            }
          }
        }
      }

      &_header {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &-title {
        font-family: $ff-roboto;
        font-size: 22px;
        font-weight: bold;
        color: $c-green;

        @media screen and (max-width: 991px) {
          margin-top: 3rem;
        }
        @media screen and (min-width: 992px) {
          color: $c-primary
        }
      }

      &_info {
        display: flex;
        font-family: $ff-gilroy;
        font-size: 20px;
        color: $c-green;

        @media screen and (min-width: 992px) {
          font-size: 14px;
          color: $c-primary
        }
      }

      &-phone {
        display: none;
        margin-left: 10px;

        @media screen and (min-width: 992px) {
          display: inline-block;
        }
      }

      &_empty {
        display: flex;
        justify-content: center;
        text-align: center;
        width: 100%;
        overflow: auto;

        @media screen and (min-width: 992px) {
          align-items: flex-start;
          padding-top: 3rem;
          position: relative;
          border: {
            width: 1px;
            style: solid;
            color: $c-line;
            radius: 6px;
          }
        }
      }

      &_form {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
        overflow: auto;

        @media screen and (min-width: 992px) {
          position: relative;
          border: {
            width: 1px;
            style: solid;
            color: $c-line;
            radius: 6px;
          }
        }
      }
    }
  }

  .main_menu {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
    flex: 1 0 17vw !important;
  }

  .menucontainernew {
    grid-area: menu !important;
    display: flex !important;
    flex-direction: column !important;
  }

  .gbadfgadfgadsg {
    height: 5rem !important;
    margin-bottom: 5px !important;
    width: 98% !important;
  }

  @media screen and (max-width: 991px) {
    .main_menu {
      display: none !important;
    }

    .main_body {
      min-height: 62vh;
      min-height: calc(var(--vh) * 62);
      height: auto;
      background-color: #fff;
    }
  }

  .orderssection_layout{
    position: relative;
    overflow: auto;
  }

  .wrapper {
    &-container{
      display: flex;
      flex-direction: column;
      width: 100vw;
      overflow: hidden;
      height: auto;
      min-height: 100vh;
      min-height: calc(var(--vh) * 62);

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
