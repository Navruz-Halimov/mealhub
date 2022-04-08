<i18n>
{
  "en": {
    "km": "km",
    "search": "Search",
    "inputSearchPlaceholder": "The search query",
    "buttonChangeLabel": "Change",
    "authError": "You are not authorized!"
  },
  "ru": {
    "km": "км",
    "search": "Поиск",
    "inputSearchPlaceholder": "Поиск",
    "buttonChangeLabel": "Изменить",
    "authError": "Вы не авторизованы!"
  }
}
</i18n>

<template>
  <main v-if="CURRENT_CATERING" class="main">
    <div class="main_body" :class="{ choose_on_the_map: MAP_CHOISE_OPTION === 'map', compact: MAP_CHOISE_OPTION !== 'map' }">
      <div class="main_actions desktop">
        <MainActions @select-action="selectDesktopAction" />
      </div>
      <!-- Route form action -->
      <div class="main_action action_route">
        <FormFilterRoute ref="FilterRouteWay" :type="'way'" :reset-action="resetMobileAction" />
      </div>
      <!-- View map -->
      <div class="main_map">
        <MapViewWay ref="mapViewWay" />
      </div>

      <FormSubactions class="mobile" />
      <!-- News for desktop to left bar -->
      <div class="main_news">
        <MainNews />
      </div>
    </div>
  </main>
</template>

<script>
import { required, minValue, maxValue, numeric } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  layout: 'primary',
  middleware: 'auth',
  data () {
    return {
      way: {},
      isRequest: true,
      currentActionDesktop: 'search',
      currentActionMobile: '',
      radius: 1,
      reloadSuccess: false
    }
  },
  computed: {
    ...mapGetters(['IS_AUTHORIZATION', 'CURRENT_CATERING', 'GMAP_CIRCLE_OPTIONS', 'MAP_CHOISE_OPTION'])
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      const cookiz = vm.$cookies
      Promise.all([vm.$store.dispatch('GET_PERSONAL_DATA', cookiz), vm.$store.dispatch('GET_CATERING_LIST', 'search'), vm.$store.dispatch('GET_CATERING_FILTER_SETTINGS')])
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('CLEAR_NOTIFICATIONS')
    this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
    this.$store.commit('RESET_GMAP_ROUTE_DATA')
    this.$store.commit('RESET_CHOISE_OPTION')
    next()
  },
  async created () {
    const cookiz = this.$cookies
    if (process.browser) {
      const q = this.b64d(this.$route.query.q)
      this.way = JSON.parse(q)

      if (this.way) {
        if (this.way.catering) {
          const id = this.way.catering
          await this.$store.dispatch('GET_CURRENT_CATERING', { cookiz, id })
        }
      }
      setTimeout(() => {
        this.$forceUpdate()
        console.warn('Vue $forceUpdated by eatme')
      }, 1000)
    }
  },
  mounted () {
    if (this.$route.query.action) {
      this.currentActionDesktop = this.$route.query.action
      this.currentActionMobile = this.$route.query.action
    } else {
      this.currentActionDesktop = 'search'
    }

    this.wait(() => {
      if (this.$refs.mapViewWay) {
        this.$refs.mapViewWay.getUserGeolocation()
        return true
      }
      return false
    })
  },
  validations: {
    radius: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(50),
      numeric
    }
  },
  methods: {
    showTopCardPC (topID) {
      this.$refs.mapViewWay.$refs.gMap.map.markers.forEach((item, i) => {
        if (item.infoWindow) {
          if (item.catering === topID) {
            item.infoWindow.open(this.$refs.mapViewWay.$refs.gMap.map, item)
          } else {
            item.infoWindow.close()
          }
        }
      })
    },

    selectTop (top) {
      this.$store.commit('SET_CURRENT_CATERING', top)
    },
    selectDesktopAction (action) {
      this.$store.commit('RESET_GMAP_ROUTE_DATA')
      this.$store.commit('RESET_CHOISE_OPTION')
      this.selectMobileAction(action)
    },
    selectMobileAction (action) {
      this.currentActionDesktop = action
      this.currentActionMobile = action
      this.$router.push(this.localePath({ name: 'index', query: { action } }))
    },
    resetMobileAction () {
      this.$store.commit('RESET_GMAP_ROUTE_DATA')
      this.$store.commit('RESET_CHOISE_OPTION')
      this.currentActionDesktop = 'search'
      this.currentActionMobile = ''
      this.$router.push(this.localePath({ name: 'index' }))
    },

    changeMapRadius () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const radius = this.radius
        this.$store.commit('SET_GMAP_CIRCLE_OPTIONS', { radius })
        this.toggleRadiusPopup()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.search_disabled {
    /deep/ .search-icon {
        background: #d6d6d6;
        border: 1px solid transparent;
    }
}

.main {
    width: 100vw;
    height: 100%;
    overflow: hidden;

    &_body {
        grid-area: main;
        position: relative;
        width: 100%;
        height: 100vh;
        height: calc(var(--vh) * 100);

        @media screen and (min-width: 992px) {
            position: relative;
            display: grid;
            grid-template-columns: 19vw auto 250px;
            grid-template-rows: 50px 50px 1fr;
            grid-template-areas: 'actions map news' 'tops map news' 'tops map news';
            grid-gap: 5px;
            padding: 0 $p-side;
            width: 100%;
            height: 100%;
        }
        @media screen and (min-width: 1080px) {
            grid-template-columns: 17vw auto 250px;
        }
    }

    &-radius {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 15px;
        width: 100%;
        height: 100%;
        font-family: $ff-gilroy;
        text-align: center;

        &_wrap {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            align-items: center;

            .profileNumber /deep/ {
                height: auto !important;

                .profileNumber-number {
                    text-align: center;
                }
            }
        }

        &-title {
            font-size: 14px;
            font-weight: normal;
        }

        &-count {
            font-size: 14px;
        }

        & /deep/ .label {
            grid-row-gap: 0;
        }

        &-default {
            // display: flex;
            // align-items: center;
            margin: 15px auto 0;

            & /deep/ .checkbox {
                grid-template-columns: auto 1fr;
                grid-column-gap: 0;
                justify-content: center;

                &-txt {
                    display: flex;
                    font-size: 14px;
                    margin-left: 10px;
                }
            }
        }

        &-btn {
            margin: 15px auto;
            margin-bottom: 0;
        }
    }

    .radiusPopup {
        /deep/ {
            & .popup_wrap {
                z-index: 2;
                .popup {
                    height: auto;
                    &::before {
                        display: none;
                    }
                }
            }
        }
    }

    &_actions {
        grid-area: actions;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding: 5px 10px;
        width: 100%;
        height: 100%;
        background-color: rgba(250, 250, 250, 0.84);

        @media screen and (max-width: 991px) {
            padding: 0 10px;
        }
        @media screen and (min-width: 992px) {
            position: static;
            display: block;
            padding: 0;
            height: 100%;
            background-color: transparent;
        }

        &.desktop {
            display: none;
            @media screen and (min-width: 992px) {
                display: block;
            }
        }

        &.mobile {
            display: grid;
            padding: 10px;
            height: 60px;

            @media screen and (min-width: 992px) {
                display: none;
            }
        }
    }

    &_radius {
        display: flex;
        align-items: center;
        font-family: $ff-gilroy;
        font-size: 14px;

        @media screen and (min-width: 992px) {
            display: none;
        }
    }

    &_tops {
        grid-area: tops;
        position: absolute;
        display: none;
        width: 100%;
        height: 100%;
        overflow: hidden;

        @media screen and (min-width: 992px) {
            display: flex;
            border-radius: 0px 0px 4px 4px;
            overflow: hidden;
        }
    }

    &_action {
        position: absolute;
        z-index: 3;
        display: flex;
        flex-direction: column;
        padding: 5px 20px 20px 20px;
        width: 100%;
        height: 100%;
        background-color: $bgc-light;

        @media screen and (min-width: 992px) {
            border-radius: 0px 0px 4px 4px;
            overflow: hidden;
        }

        &-title {
            font-family: $ff-roboto;
            font-size: 24px;
            margin-top: 1rem;
            text-align: center;
            color: $c-green;

            @media screen and (max-width: 991px) {
                border-radius: 0px 0px 4px 4px;
                margin: 3rem 0;
            }
        }

        &-back {
            z-index: 3;
            position: absolute;
            margin: 2px 0 0 0.5rem;
            font-family: $ff-gilroy;
            font-size: 12px;
            color: #c4c4c4;

            @media screen and (min-width: 992px) {
                display: none;
                &.show {
                    display: block;
                }
            }

            @media screen and (max-width: 991px) {
                top: 10px;
                left: 10px;
                margin: 0;
            }

            &-icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 25px;
                height: 10px;
                overflow: hidden;

                svg {
                    width: 100%;
                    height: 100%;
                    fill: #c4c4c4;
                    transform: scale(6, 5);
                }
            }
        }

        &-blure {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            padding: 20px;
            width: 100%;
            height: calc(100% - 3em);
            background-color: rgba(0, 0, 0, 0);
        }
    }

    &_map {
        grid-area: map;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;

        @media screen and (max-width: 991px) {
            position: relative;
            height: 480px;
            min-height: calc(var(--vh) * 77);
        }
        @media screen and (min-width: 992px) {
            position: absolute;
            top: auto;
            left: auto;
            display: flex;
            width: 100%;
            height: 100%;
        }
    }

    &_news {
        grid-area: news;
        position: absolute;
        display: none;
        width: 100%;
        height: 100%;
        overflow: hidden;

        @media screen and (min-width: 992px) {
            display: flex;
            margin-left: 0;
        }
    }

    &_carousel {
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0;
        width: 100%;
        height: auto;
        background-color: #fff;

        &.open {
            height: auto;
        }

        @media screen and (min-width: 992px) {
            display: none;
        }

        &-toggle {
            position: absolute;
            top: 0;
            left: 50%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            background-color: $bgc-light;
            transform: translate(-50%, -20.5px);

            &.open {
                justify-content: flex-end;
                transform: translate(-50%, -20.5px) rotate(180deg);
                transform-origin: center;

                svg {
                    top: auto;
                    bottom: 0;
                    transform: translate(-50%, -10%) rotate(-90deg);

                    &:last-child {
                        transform: translate(-50%, -15%) rotate(-90deg);
                    }
                }
            }

            svg {
                position: absolute;
                top: 0;
                left: 50%;
                width: 60%;
                height: 60%;
                transform: translateX(-50%) rotate(-90deg);
                transform-origin: center;

                &:last-child {
                    width: 40%;
                    height: 40%;
                    transform: translate(-50%, 50%) rotate(-90deg);
                }
            }
        }
    }
}

.main_action.action_search {
    grid-template-rows: 40px 40px 1fr;
    grid-row-gap: 15px;
    justify-content: stretch;

    @media screen and (min-width: 992px) {
        display: none;
    }

    /deep/ .search {
        @media screen and (max-width: 991px) {
            height: 4.2rem;
            font-size: 18px;
            &-icon {
                width: 48px;
            }
        }
    }

    & /deep/ {
        input {
            font-size: 16px;
        }
    }

    & /deep/ {
        .top_list {
            border: none;
            overflow: auto;

            @media screen and (min-width: 992px) {
                position: relative;
                width: 100%;
            }
        }

        .top {
            grid-template-columns: 1fr auto;
            grid-template-areas: 'header header' 'article footer' 'article footer';
            grid-column-gap: 10px;
            padding: 7px 0 7px 15px;

            @media screen and (max-width: 991px) {
                padding: 7px 10px;

                &:first-child {
                    margin-top: 1rem;
                }
            }

            &_header-title {
                @media screen and (max-width: 991px) {
                    font-size: $fz-md-low - 2;
                }
            }

            &_article-address {
                @media screen and (max-width: 991px) {
                    font-size: $fz-md-low - 2;
                }
            }

            &_article-review {
                @media screen and (max-width: 991px) {
                    font-size: $fz-md-low - 2;
                }
                margin-top: 3px;
            }

            &_footer {
                align-self: end;
                flex-direction: column;

                &-time {
                    width: 100%;
                    @media screen and (max-width: 991px) {
                        font-size: $fz-md-low - 2;
                    }

                    &-icon {
                        flex: 0 0 15px;
                        width: 15px;
                        height: 15px;
                    }
                }

                &-seats {
                    align-self: flex-start;
                    justify-self: flex-start;
                    margin-left: 0;
                    align-items: center;
                    @media screen and (max-width: 991px) {
                        font-size: $fz-md-low - 2;
                    }

                    &-icon {
                        flex: 0 0 15px;
                        width: 15px;
                        height: 15px;
                        margin-left: 0;
                    }
                }
            }
        }

        .top-arrow {
            display: none;
        }
    }
}

.action_filter {
    @media screen and (min-width: 992px) {
        grid-area: tops;
        display: block;
        padding: 0;
    }

    @media screen and (max-width: 992px) {
        & /deep/ {
            .top_list {
                border: none;
                overflow: auto;
            }

            .top {
                grid-template-columns: 1fr auto;
                grid-template-areas: 'header footer' 'article footer' 'article footer';
                grid-column-gap: 10px;
                padding: 7px 10px;

                &:first-child {
                    margin-top: 1rem;
                }

                &_header-title {
                    font-size: $fz-md-low - 2;
                }

                &_article-address {
                    font-size: $fz-md-low - 2;
                }

                &_article-review {
                    font-size: $fz-md-low - 2;
                    margin-top: 3px;
                }

                &_footer {
                    align-self: end;
                    flex-direction: column;

                    &-time {
                        width: 100%;
                        font-size: $fz-md-low - 2;

                        &-icon {
                            flex: 0 0 15px;
                            width: 15px;
                            height: 15px;
                        }
                    }

                    &-seats {
                        align-self: flex-start;
                        justify-self: flex-start;
                        margin-left: 0;
                        align-items: center;
                        font-size: $fz-md-low - 2;

                        &-icon {
                            flex: 0 0 15px;
                            width: 15px;
                            height: 15px;
                            margin-left: 0;
                        }
                    }
                }
            }

            .top-arrow {
                display: none;
            }
        }
    }
}

.action_route {
    @media screen and (min-width: 992px) {
        grid-area: tops;
        display: block;
        padding: 0;
    }
}

@media screen and (max-width: 991px) {
    .main_action {
        position: relative !important;
        // min-height: 77vh;
        // min-height: calc(var(--vh) * 77);
        height: 240px;
        padding: 5px 20px 0 20px;
    }

    .main_body {
        height: auto !important;
        min-height: auto;
        &.compact {
            .main_action {
                min-height: initial;
            }
            .main_map {
                min-height: 0;
                max-height: 42vh;
            }
        }
        &.choose_on_the_map {
            .main_action {
                min-height: initial;
                height: auto;
            }
        }
    }
}
</style>
