<i18n>
{
  "en": {
    "title": "My Favorites",
    "phone": "Phone number",
    "popupErrorMessage": "Oops,error occured when deleting Your Favorites",
    "popupSuccessDeleteMessage": "Deleted successfuly",
    "popupDeleteMessage": "Are you sure you want to delete?",
    "favoriteDeleted":"Successfully Deleted!",
    "mobileMenuLabelFavorite": "Catering points",
    "mobileMenuLabelFavoriteMeal": "Dishes"
  },

  "ru": {
    "title": "Избранные заведения",
    "phone": "Номер телефона",
    "popupErrorMessage": "К сожалению, при удалении избранного произошла ошибка",
    "popupSuccessDeleteMessage": "Успешно удалено!",
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "favoriteDeleted":"Успешно удалено!",
    "mobileMenuLabelFavorite": "Избранные заведения",
    "mobileMenuLabelFavoriteMeal": "Избранные блюда"
  }
}
</i18n>

<template>
  <main class="main favorites_page">
    <div class="main_body">
      <div class="menucontainernew">
        <MainActions
          :current-action="''"
          class="gbadfgadfgadsg desktop"
          @select-action="selectOrdersMenuAction"
        />
        <nav class="main_menu">
          <div class="main_menu-back">
            <addition-back />
          </div>
          <menu-favorites-view :active-link="activeLink" />
        </nav>
      </div>

      <!-- SECTION FOR MOBILE -->
      <section v-if="isMobile" class="favorites mobile">
        <div class="favorites-back">
          <addition-back :stricted="true" @click-handler="goToBack" />
        </div>
        <header v-if="currentStep === 0" class="favorites_header">
          <h1 class="favorites-title mt-3">
            {{ $t('title') }}
          </h1>
        </header>
        <div class="flex wide j_c">
          <div class="flex mobile_nav">
            <button class="eatme-btn-orange roboto half">
              {{ $t('mobileMenuLabelFavorite') }}
            </button>
            <button
              class="eatme-btn-grey roboto half"
              @click="$router.push(localePath('/profile/FavoritesDish'))"
            >
              {{ $t('mobileMenuLabelFavoriteMeal') }}
            </button>
          </div>
        </div>

        <BasicInputCateringMenuSearch
          v-model="search"
          :reviews="true"
          class="favorites__mobile-search"
        />

        <main v-if="favorites.length" class="favorites__card">
          <div class="favorites__card-inner">
            <div
              v-for="(favorite, index) in filteredFavorites"
              :key="index"
              class="favorites__card-outwrap"
            >
              <div class="favorites__card-item">
                <div class="favorites__card-header">
                  <img
                    :src="favorite && favorite.image"
                    :alt="favorite && favorite.name"
                    class="favorites__card-img"
                  >
                  <delete-icon
                    :has-position="true"
                    bg-color="#a2a2a2"
                    icon-width="10"
                    icon-height="10"
                    @click.native="togglePromptPopup(favorite.catering)"
                  />
                </div>
                <div class="favorites__card-body">
                  <div class="favorites__card-body-inner">
                    <div class="favorites__card-body-title">
                      {{ favorite && favorite.name }}
                    </div>
                    <p class="favorites__card-body-subtitle">
                      {{ favorite && favorite.address }}
                    </p>
                  </div>
                  <home-icon
                    class="favorites__card-home"
                    icon-width="10"
                    icon-height="10"
                    bg-color="#a2a2a2"
                    :link="`/catering/${favorite.catering}`"
                  />
                </div>
              </div>
            </div>
            <!-- /.favorites__card-outwrap -->
          </div>
          <!-- /.favorites__card-inner -->
          <!-- end of favorites card item -->
        </main>
      </section>
      <!-- SECTION FOR DESKTOP -->
      <section class="favorites desktop">
        <header class="favorites_header">
          <h1 class="favorites-title">
            {{ $t('title') }}
          </h1>
          <div class="favorites_info">
            <div class="favorites_info-inner">
              <p class="favorites-id">
                ID: {{ PERSONAL_DATA.id }}
              </p>
              <p
                v-if="~PERSONAL_DATA.phone.indexOf('+7')"
                class="favorites-phone ml-1"
              >
                {{ $t('phone') }}:
                <span>{{ PERSONAL_DATA.phone.slice(0, 2) }}</span>
                {{ parsePhone(PERSONAL_DATA.phone, 2) }}
              </p>
              <p v-else class="favorites-phone ml-1">
                {{ $t('phone') }}:
                <span>{{ PERSONAL_DATA.phone.slice(0, 3) }}</span>
                {{ parsePhone(PERSONAL_DATA.phone) }}
              </p>
            </div>
            <BasicInputCateringMenuSearch
              v-model="search"
              :reviews="true"
              class="favorites_info-search"
            />
          </div>
        </header>
        <main v-if="favorites.length" class="favorites__card">
          <div class="favorites__card-inner">
            <div
              v-for="(favorite, index) in filteredFavorites"
              :key="index"
              class="favorites__card-outwrap"
            >
              <div class="favorites__card-item">
                <div class="favorites__card-header">
                  <img
                    :src="favorite && favorite.image"
                    :alt="favorite && favorite.name"
                    class="favorites__card-img"
                  >
                  <delete-icon
                    :has-position="true"
                    bg-color="#a2a2a2"
                    icon-width="10"
                    icon-height="10"
                    @click.native="togglePromptPopup(favorite.catering)"
                  />
                </div>
                <div class="favorites__card-body">
                  <div class="favorites__card-body-inner">
                    <div class="favorites__card-body-title">
                      {{ favorite && favorite.name }}
                    </div>
                    <p class="favorites__card-body-subtitle">
                      {{ favorite && favorite.address }}
                    </p>
                  </div>
                  <home-icon
                    class="favorites__card-home"
                    icon-width="10"
                    icon-height="10"
                    bg-color="#a2a2a2"
                    :link="`/catering/${favorite.catering}`"
                  />
                </div>
              </div>
            </div>
            <!-- /.favorites__card-outwrap -->
          </div>
          <!-- /.favorites__card-inner -->
          <!-- end of favorites card item -->
        </main>
        <div v-else class="favorites__empty">
          Здесь будут заведения, которые Вам нравятся
        </div>
      </section>

      <div class="main_news">
        <MainNews />
      </div>
    </div>

    <!-- PROMPT POPUP -->
    <div v-if="successPromptIsOpen" class="addresses_popup">
      <popup-delete @close-popup="togglePromptPopup" @delete="deleteFavorites">
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'primary',
  middleware: 'auth-home',
  data () {
    return {
      search: '',
      formAction: '',
      currentStep: 0,
      successPromptIsOpen: false,
      favorites: [],
      favoritesId: null
    }
  },

  beforeRouteLeave (to, from, next) {
    this.$store.commit('CLEAR_NOTIFICATIONS')
    this.$store.dispatch('CLOSE_GLOBAL_POPUPS')

    next()
  },

  computed: {
    ...mapGetters(['PERSONAL_DATA']),
    filteredFavorites () {
      return this.favorites.filter((favorite) => {
        return favorite.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    activeLink () {
      return 'favorites'
    }
  },
  beforeCreate () {
    this.$nextTick(() => this.$nuxt.$loading.start())
  },
  async created () {
    await this.$store.dispatch('GET_PERSONAL_DATA', this.$cookies)
  },
  mounted () {
    this.getFavorites()
    this.tryFinishLoading()
  },
  methods: {
    togglePromptPopup (id) {
      this.favoritesId = id
      this.successPromptIsOpen = !this.successPromptIsOpen
    },
    tryFinishLoading () {
      if (this.PERSONAL_DATA && this.favorites) {
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      }
    },
    async getFavorites () {
      await this.$store.dispatch('fetchFavorites', this.$cookies).then((res) => {
        if (res && res.data) {
          this.favorites = res.data.data
        }
      })
    },
    deleteFavorites () {
      this.$store
        .dispatch('deleteFavorite', {
          id: this.favoritesId,
          cookie: this.$cookies
        })
        .then((res) => {
          if (res && res.data && res.data.status === 'success') {
            this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('favoriteDeleted'))
            this.getFavorites()
          } else {
            this.$store.commit('SET_ERROR_NOTIFY', this.$t('popupErrorMessage'))
          }
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('SET_ERROR_NOTIFY', this.$t('popupErrorMessage'))
        })
    },
    goToBack () {
      console.warn(this.currentStep)
      if (this.currentStep > 0) {
        this.selectStep(--this.currentStep)
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/classes/class';
@import '~/assets/styles/abstract/mixins';
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
    min-height: 100vh;
    min-height: calc(var(--vh) * 100);
    height: auto;
  }
}
.main_menu-back {
  position: relative;
  top: 0;
  left: 10px;
  @media screen and (max-width: 991px) {
    position: absolute;
    top: 10px;
    font-size: 14px !important;
  }
}
.popupMap_body {
  position: relative;
}
.map_incdec {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  font-size: 2rem;
  z-index: 90;
  display: flex;
  flex-direction: column;
  border: 1px solid $c-line;
}
.map_incdec-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  width: 75px;
  padding: 1.5rem;
  font-size: 3rem;
  background: $light;
  &:first-child {
    border-bottom: 1px solid $c-line;
  }
}
.favorites {
  position: relative;
  grid-area: body;
  grid-template-rows: auto 1fr;
  grid-row-gap: 20px;
  justify-items: center;
  background-color: $c-light;
  height: 100%;
  width: 100%;
  padding: 10px 20px;
  @media screen and (min-width: 992px) {
    border-radius: $br-block-desktop;
    padding: 20px 15px 20px 20px;
    border-radius: 4px;
  }
  &.mobile {
    display: grid;
    min-height: 100vh;
    min-height: calc(var(--vh) * 100);
    @media screen and (min-width: 992px) {
      display: none;
    }
  }
  &.desktop {
    display: none;
    @media screen and (min-width: 992px) {
      display: grid;
    }
  }
  &_header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
  }
  &-title {
    width: 75%;
    font-family: $ff-roboto;
    font-size: 22px;
    font-weight: bold;
    color: $c-green;
    text-align: center;
    margin-bottom: 10px;
    @media screen and (min-width: 992px) {
      color: $c-primary;
      width: auto;
    }
  }
  &_info {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    &-inner {
      display: flex;
      font-family: $ff-gilroy;
      font-size: 14px;
    }
    &-search {
      max-width: 150px;
    }
    @media screen and (min-width: 1090px) {
      &-search {
        max-width: 259px !important;
      }
    }
    @media screen and (min-width: 992px) {
      font-size: 14px;
      color: $c-primary;
    }
  }
  &-phone {
    display: none;
    margin-left: 10px;
    @media screen and (min-width: 992px) {
      display: inline-block;
    }
  }
  &-icon {
    margin-top: 10px;
    width: 60px;
    height: 60px;
    svg {
      fill: $c-green;
    }
    @media screen and (min-width: 992px) {
      display: none;
    }
    svg {
      width: 100%;
      height: 100%;
      fill: $c-green;
    }
  }
  &-id {
    display: none;
    @media screen and (min-width: 992px) {
      display: block;
    }
  }
  // card wrapper
  &__card {
    overflow-y: auto;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    &-inner {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      & > * {
        flex-shrink: 0;
        width: 100%;
        max-width: 100%;
      }
    }
    &-outwrap {
      padding-left: 5px;
      padding-right: 5px;
      overflow: hidden;
      margin-bottom: 10px;
      @media (min-width: 986px) {
        flex: 0 0 auto;
        width: 50%;
      }
      @media (min-width: 1200px) {
        flex: 0 0 auto;
        width: 33.33%;
      }
      @media (min-width: 1400px) {
        flex: 0 0 auto;
        max-width: 25%;
      }
      @media (min-width: 1920px) {
        flex: 0 0 auto;
        max-width: 16.66667%;
      }
    }
    &-item {
      transition: all 0.3s ease;
      overflow: hidden;
      border-radius: 5px;
      border: 1px solid $c-line;
      height: 100%;
      &:hover {
        border: 1px solid $orange;
        box-shadow: rgba(149, 157, 165, 0.2) 0 0 15px;
      }
    }
    &-header {
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      overflow: hidden;
      position: relative;
    }
    &-img {
      display: block;
      max-height: 120px;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    &-body {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      padding: 9px 11px 10px 11px;
      font-size: 14px;
      line-height: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      min-height: 65px;
      &-title {
        font-weight: 700;
        font-family: $ff-gilroy-reg;
        margin-bottom: 3px;
        @include textWrapper(1);
      }
      &-subtitle {
        @include textWrapper(2);
        font-family: $ff-gilroy;
      }
    }
    &-home {
      margin-left: 10px;
    }
  }
  &__empty {
    font-family: $ff-gilroy;
    font-size: 14px;
    line-height: 17px;
    color: #c4c4c4;
    font-weight: 400;
  }
}
.favorites.mobile {
  min-height: auto;
  .mobile_nav {
    width: 100%;
    @media (max-width: 968px) {
      max-width: 800px !important;
    }
    @media (max-width: 768px) {
      max-width: 700px !important;
    }
    @media (max-width: 576px) {
      max-width: 350px !important;
    }
    .eatme-btn-orange {
      width: 50%;
      border-radius: 6px;
      font-family: $ff-roboto;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .eatme-btn-grey {
      width: 50%;
      border-radius: 6px;
      font-family: $ff-roboto;
      box-shadow: 0px 3px 6px #11100029;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      background: white;
      color: #c9c9c9 !important;
    }
  }
  .favorites {
    &_header {
      margin: 0;
    }
    &__mobile-search {
      @media (max-width: 968px) {
        max-width: 800px !important;
      }
      @media (max-width: 768px) {
        max-width: 700px !important;
      }
      @media (max-width: 576px) {
        max-width: 350px !important;
      }
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
    &__card {
      @media (max-width: 968px) {
        display: flex;
        width: 100%;
      }
      &-inner {
        display: flex;
        flex-wrap: wrap;
        @media (max-width: 768px) {
          justify-content: center;
        }
        & > * {
          flex-shrink: 0;
          width: 100%;
          max-width: 100%;
        }
        @media (max-width: 968px) {
          max-width: 800px !important;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          max-width: 700px !important;
        }
        @media (max-width: 576px) {
          max-width: 350px !important;
        }
      }
      &-outwrap {
        margin-bottom: 20px;
        @media (max-width: 320px) {
          flex: 0 0 auto;
          width: 100%;
        }
        @media (max-width: 576px) {
          padding: 0 !important;
        }
        @media (min-width: 576px) {
          flex: 0 0 auto;
          width: 50%;
        }
      }
      &-img {
        max-height: 180px !important;
      }
    }
  }
}
</style>
