<i18n>
{
  "en": {
    "radius": "Radius",
    "km": "km",
    "search": "Search",
    "inputSearchPlaceholder": "The search query",
    "buttonChangeLabel": "Change",
    "authError": "You are not authorized!",
    "defaultRadiusLabel": "Default radius"
  },
  "ru": {
    "radius": "Радиус",
    "km": "км",
    "search": "Поиск",
    "inputSearchPlaceholder": "Поиск",
    "buttonChangeLabel": "Изменить",
    "authError": "Вы не авторизованы!",
    "defaultRadiusLabel": "Радиус по умолчанию"
  }
}
</i18n>

<template>
  <main class="main homepage">
    <div
      class="main_body mainpagebody"
      :step="isCompactHeight"
      :class="{
        choose_on_the_map: MAP_CHOISE_OPTION === 'map',
        compact: isCompactHeight,
        search:
          currentActionMobile !== 'search' || currentActionDesktop !== 'search'
      }"
    >
      <!-- Action list for desktop -->
      <div class="main_actions desktop">
        <MainActions
          :current-action="currentActionDesktop"
          @select-action="selectDesktopAction"
        />
      </div>
      <!-- Action list for mobile -->
      <div class="main_actions mobile">
        <p class="main_radius" @click="toggleRadiusPopup">
          {{ $t('radius') }}: {{ GMAP_CIRCLE_OPTIONS.radius }} {{ $t('km') }}
        </p>
        <MainActions
          :current-action="currentActionMobile"
          @select-action="selectMobileAction"
        />
      </div>
      <!-- Search all tops for desktop -->
      <div
        v-if="
          currentActionMobile === 'search' || currentActionDesktop === 'search'
        "
        class="main_search-input"
      >
        <!-- <basic-input-search
          v-if="
            currentActionMobile === 'filter' ||
              currentActionDesktop === 'filter'
          "
          v-model="cateringFiltredSearchQuery"
        /> -->
        <basic-input-search v-model="cateringSearchQuery" />
      </div>
      <!-- Searchable top list for desktop -->
      <div v-if="currentActionDesktop === 'search'" class="main_tops">
        <ListTop />
      </div>
      <!-- Searchable action for mobile -->
      <div
        v-if="currentActionMobile === 'search'"
        class="main_action action_search"
      >
        <div class="main_action-back">
          <addition-back :stricted="true" @click-handler="resetMobileAction" />
        </div>
        <h2 class="main_action-title">
          {{ $t('search') }}
        </h2>
        <basic-input-search
          v-model="cateringSearchQuery"
          :class="{ search_disabled: !IS_AUTHORIZATION }"
          :placeholder="$t('inputSearchPlaceholder')"
        />
        <ListTop />
      </div>
      <!-- Filter form action -->
      <div
        v-if="
          currentActionMobile === 'filter' || currentActionDesktop === 'filter'
        "
        class="main_action action_filter"
      >
        <FormFilterTops
          :reset-action="resetMobileAction"
          :search-string="cateringFiltredSearchQuery"
        />
      </div>
      <!-- Route form action -->
      <div
        v-if="
          currentActionMobile === 'route' || currentActionDesktop === 'route'
        "
        class="main_action action_route"
      >
        <FormFilterRoute ref="FilterRoute" :reset-action="resetMobileAction" />
      </div>
      <!-- View map -->
      <div v-show="isMapVisible" class="main_map">
        <MapView ref="mapView" />
      </div>

      <FormSubactions v-show="currentActionMobile === 'route'" class="mobile" />

      <!-- News for desktop to left bar -->
      <div class="main_news">
        <MainNews />
      </div>
      <!-- Carousel with top list for mobile -->
      <div
        v-if="isMobileCarousel"
        class="main_carousel"
        :class="{ open: carouselIsOpen }"
      >
        <span
          class="main_carousel-toggle cursor-pointer"
          :class="{ open: carouselIsOpen }"
          @click="toggleCarouselState"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path
                d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z"
              />
            </g>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path
                d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z"
              />
            </g>
          </svg>
        </span>
        <CarouselTops
          :key="carouselKey"
          :is-open="carouselIsOpen"
          @click-item-handler="selectTop"
        />
      </div>
    </div>
    <!-- mobile News -->
    <MainNewsMobile v-if="isMobile" />
    <div v-if="radiusPopupIsOpen" class="radiusPopup">
      <popup-default @close-popup="toggleRadiusPopup">
        <form class="main-radius" @submit.prevent>
          <div class="main-radius_wrap">
            <h3 class="main-radius-title">
              {{ $t('radius') }}:
            </h3>
            <basic-input-profile-number
              v-model.number="$v.radius.$model"
              class="main-radius_wrap-input"
              :is-error="$v.radius.$error"
              min="1"
              max="100"
              @custom-focus="resetDefaultFilterRadius"
            />
            <p class="main-radius-count">
              {{ $t('km') }}
            </p>
          </div>
          <div class="main-radius-default">
            <basic-input-checkbox
              v-model="isDefault"
              @changeInput="setDefaultRadius"
            >
              {{ $t('defaultRadiusLabel') }}
            </basic-input-checkbox>
          </div>
          <button
            class="main-radius-btn eatme-btn-colorful"
            @click="changeMapRadius"
          >
            {{ $t('buttonChangeLabel') }}
          </button>
        </form>
      </popup-default>
    </div>
    <SecretCodeModal
      v-show="secretModalShow"
      @goodCode="secretModalShow = false"
    />
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
      isRequest: true,
      isCompactHeight: false,
      carouselKey: 0,
      carouselIsOpen: false,
      cateringFiltredSearchQuery: '',
      currentActionDesktop: 'search',
      currentActionMobile: '',
      radiusPopupIsOpen: false,
      radius: 1,
      reloadSuccess: false,
      isDefault: false,
      secretModalShow: true
    }
  },
  computed: {
    isMobileCarousel () {
      return (
        !this.$_.isEmpty(this.CATERING_LIST) &&
        this.isMobile &&
        !this.IS_SOMEPOPUP &&
        this.currentActionMobile !== 'route'
      )
    },
    isMapVisible () {
      if (this.isMobile) {
        if (this.MAP_CHOISE_OPTION === 'map') {
          return true
        }
        if (this.currentActionMobile === 'route') {
          if (this.isCompactHeight) {
            return true
          } else {
            return false
          }
        }
        if (
          this.currentActionMobile === 'search' ||
          this.currentActionMobile === 'filter'
        ) {
          return false
        }
      }
      return true
    },

    filterRouteStep () {
      if (this.$refs.FilterRoute && this.$refs.FilterRoute.currentStep) {
        return this.$refs.FilterRoute.currentStep
      }
      return false
    },

    cateringSearchQuery: {
      get () {
        return this.$store.getters.CATERING_FILTER_DATA.searchQuery
      },
      set (value) {
        this.$store.commit('SET_CATERING_FILTER_DATA', {
          searchQuery: value
        })
      }
    },
    ...mapGetters([
      'IS_AUTHORIZATION',
      'CATERING_LIST',
      'GMAP_CIRCLE_OPTIONS',
      'MAP_CHOISE_OPTION',
      'IS_SOMEPOPUP',
      'IS_GOEATPOPUP'
    ])
  },
  watch: {
    radius (newValue, oldValue) {
      /* if (!newValue || newValue < 1) {
        this.radius =
      } else */
      if (newValue.toString().length > 2) {
        this.radius = oldValue
      }
    },
    CATERING_LIST () {
      this.carouselKey++
    },
    cateringSearchQuery () {
      if (!this.isRequest) {
        return false
      }

      this.isRequest = false

      this.$store.dispatch('GET_CATERING_LIST', 'search').then(() => {
        this.isRequest = true
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      Promise.all([vm.$store.dispatch('GET_CATERING_FILTER_SETTINGS')])
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('RESET_GMAP_ROUTE_DATA')
    this.$store.commit('RESET_CHOISE_OPTION')
    this.$store.commit('CLEAR_NOTIFICATIONS')
    this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
    this.$refs.mapView.resetDirections()
    next()
  },
  beforeCreate () {
    this.$nextTick(() => this.$nuxt.$loading.start())
  },
  mounted () {
    console.log('currentActionDesktop', this.currentActionDesktop)
    this.checkSecretCode()
    setTimeout(() => this.$nuxt.$loading.finish(), 500)

    if (this.$route.query.action) {
      this.currentActionDesktop = this.$route.query.action
      this.currentActionMobile = this.$route.query.action
    } else {
      this.currentActionDesktop = 'search'
    }

    this.$refs.mapView.getUserGeolocation()

    if (process.browser) {
      if (localStorage.notifyaction) {
        this.$store.commit(localStorage.notifyaction, true)
      }
      localStorage.removeItem('notifyaction')
    }
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
    checkSecretCode () {
      const secretCode = this.$cookies.get('SUBSCRIBER')
      // try {
      //   await this.$axios.$get(`http://ovz16.kotvkompe.n50jp.vps.myjino.ru:49356/api/v1/auth_web?code=${secretCode}`)
      //   this.secretModalShow = false
      // } catch (error) {
      //   console.log(`error invalid code`);
      // }
      if (secretCode && secretCode.length > 1) {
        this.secretModalShow = false
      } else {
        console.log('error invalid code')
      }
    },
    setDefaultRadius () {
      if (!this.IS_AUTHORIZATION) {
        this.loginUserTypes()
      } else if (this.isDefault) {
        this.radius = 1
        this.$store.commit('SET_GMAP_CIRCLE_OPTIONS', { radius: this.radius })
      }
    },
    resetDefaultFilterRadius () {
      if (!this.IS_AUTHORIZATION) {
        this.loginUserTypes()
      } else {
        this.radius = ''
        this.isDefault = false
      }
    },

    showTopCardPC (topID) {
      this.$refs.mapView.$refs.gMap.map.markers.forEach((item, i) => {
        if (item.infoWindow) {
          if (item.catering === topID) {
            item.infoWindow.open(this.$refs.mapView.$refs.gMap.map, item)
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
      this.currentActionDesktop = action
      this.currentActionMobile = action
      this.$refs.mapView.resetDirections()
      this.$router.push(this.localePath({ name: 'index', query: { action } }))
    },
    selectMobileAction (action) {
      this.currentActionDesktop = action
      this.currentActionMobile = action
      this.$refs.mapView.resetDirections()
      this.$router.push(this.localePath({ name: 'index', query: { action } }))
    },
    resetMobileAction () {
      this.$store.commit('RESET_GMAP_ROUTE_DATA')
      this.$store.commit('RESET_CHOISE_OPTION')
      this.currentActionDesktop = 'search'
      this.currentActionMobile = ''
      this.$refs.mapView.resetDirections()
      this.$router.back()
    },
    toggleCarouselState () {
      this.carouselIsOpen = !this.carouselIsOpen
    },
    toggleRadiusPopup () {
      this.radiusPopupIsOpen = !this.radiusPopupIsOpen
      if (this.radiusPopupIsOpen) {
        this.radius = this.GMAP_CIRCLE_OPTIONS.radius
        if (this.radius === 1) {
          this.isDefault = true
        } else {
          this.isDefault = false
        }
      }
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

<style>
@media screen and (max-width: 991px) {
  .mainpagebody .goeatpopup .popup_wrap {
    height: 100vh !important;
  }
}
</style>

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
      grid-template-areas: 'actions map news' 'search map news' 'tops map news';
      grid-gap: 5px;
      padding: 0 $p-side;
      width: 100%;
      height: 100%;
      &.search {
        grid-template-rows: 50px 0 1fr !important;
      }
    }
    @media screen and (min-width: 1080px) {
      grid-template-columns: 17vw auto 250px;
      &.search {
        grid-template-rows: 50px 0 1fr !important;
      }
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

  &_search-input {
    grid-area: search;
    display: none;
    font-size: 14px;

    @media screen and (min-width: 992px) {
      display: block;
    }

    & /deep/ {
      .search-clear {
        display: block;
      }
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
    min-height: 77vh;
    min-height: calc(var(--vh) * 77);
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
        min-height: initial;
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
