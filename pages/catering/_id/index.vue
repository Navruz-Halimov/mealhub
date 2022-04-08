<i18n>
{
  "en": {
    "popupErrorMessage": "Fill the full field",
    "popupSuccessMessage": "Data is updated",
    "timeLabel": "Opened",
    "reviewLabel": "Reviews",
    "place": "availible",
    "noplace": "unavailible",
    "menuLabel": "Menu",

    "linkCopied": "Catering link copied",
    "linkCopiedError": "An error occurred while trying to share a catering",

    "beginText":"Choose what you want to eat",
    "beginBtnText":"Go to menu",

    "label_goeat":"*go and eat",
    "label_preorder":"Pre-order",
    "label_b":"Table reservation",
    "label_pickup":"Takeaway",
    "label_delivery":"Delivery",
    "favoriteAdded":"Succesfully Added to Favorites!",
    "popupSuccessDeleteMessage": "Deleted successfuly",
    "popupDeleteMessage": "Are you sure you want to delete?",
    "popupErrorMessage": "Oops,error occured when deleting Your Favorites"
  },
  "ru": {
    "popupErrorMessage": "Заполните все поля",
    "popupSuccessMessage": "Данные успешно сохранены",
    "timeLabel": "Открыто",
    "reviewLabel": "Отзывы",
    "place": "Доступны",
    "noplace": "нет",
    "menuLabel": "Меню",

    "linkCopied": "Ссылка на заведение скопирована",
    "linkCopiedError": "Ошибка при попытке поделиться заведением",

    "beginText":"Для начала выберите блюда",
    "beginBtnText":"Перейти в меню",

    "label_goeat":"*иди и покушай",
    "label_preorder":"Предзаказ",
    "label_b":"Бронь стола",
    "label_pickup":"Еда на вынос",
    "label_delivery":"Доставка",
    "favoriteAdded":"Успешно добавлено в избранное!",
    "popupSuccessDeleteMessage": "Успешно удалено!",
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "popupErrorMessage": "К сожалению, при удалении избранного произошла ошибка"
  }
}
</i18n>

<template>
  <section ref="cateringBlock" class="catering">
    <div class="catering-back">
      <addition-back />
    </div>
    <div v-if="!$_.isNil(CURRENT_CATERING) && reloaded" class="catering_wrap">
      <h1 class="catering-title">
        {{ CURRENT_CATERING.name }}
      </h1>
      <div class="catering_block catering_rate">
        <p class="catering_rate-count">
          {{ CURRENT_CATERING.rating }}
        </p>
        <addition-stars
          :rate="CURRENT_CATERING.rating"
          @click.native="
            $router.push(
              localePath({ path: `/catering/${CURRENT_CATERING.id}/reviews` })
            )
          "
        />
        <p class="catering_rate-review">
          {{ $t('reviewLabel') }}:
          <span class="green">{{ CURRENT_CATERING.reviewsCount }}</span>
        </p>
      </div>
      <div class="catering_block catering_socialAction">
        <!--        <div class="catering_socialAction-item" :class="{ 'btn-disabled': !this.IS_AUTHORIZATION }" @click=" !IS_AUTHORIZATION && loginUserTypes() ">-->
        <div
          class="catering_socialAction-item"
          :class="{
            'btn-disabled': !IS_AUTHORIZATION,
            activeSelected: selectedStyle
          }"
          @click="
            selectedStyle
              ? togglePromptPopup()
              : addFavorite(CURRENT_CATERING.id),
            copyCateringLink
          "
        >
          <span class="favorites-icon">
            <svg
              width="13"
              height="11"
              viewBox="0 0 13 11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.985596 3.68768C0.985596 5.22257 1.29638 5.41343 2.5115 6.62755L6.41666 10.4768C7.40594 11.0304 8.20436 9.79125 8.76295 9.23266C10.1423 7.98171 11.4338 6.63717 12.6282 5.20858C12.8603 4.74889 12.9701 4.23716 12.9469 3.72272C12.9238 3.20827 12.7685 2.70846 12.4961 2.27145C12.2237 1.83445 11.8433 1.47498 11.3916 1.22771C10.9399 0.980445 10.432 0.85371 9.91712 0.859723C8.2783 0.859723 7.89358 2.00689 6.94027 2.64543C6.55954 2.39062 4.35614 -0.577234 1.9179 1.64616C1.35144 2.17807 1.01664 2.91124 0.985596 3.68768Z"
              />
            </svg>
          </span>
        </div>
        <div
          class="catering_socialAction-item desktop"
          :class="{ 'btn-disabled': !IS_AUTHORIZATION }"
          @click="copyCateringLink"
        >
          <img class="" src="/icons/catering/new/share-green.svg" alt="">
        </div>
        <div
          class="catering_socialAction-item mobile"
          :class="{ 'btn-disabled': !IS_AUTHORIZATION }"
          @click="copyCateringLink"
        >
          <img class="" src="/icons/catering/new/share-green.svg" alt="">
        </div>
      </div>
      <div class="catering_block catering_additionalInfo">
        <addition-work-time
          :is-open="isWorkTimeOpened"
          :work-time="CURRENT_CATERING.workTime"
        />
        <p class="catering_additionalInfo_seats">
          <span class="more_seats-icon" style="margin-right:.5rem">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.328"
              height="10"
              viewBox="0 0 15.328 10"
            >
              <defs>
                <style>
                  .a {
                  fill: #5c5c5c;
                  }
                </style>
              </defs>
              <path
                class="a"
                d="M345.279,85.333a.925.925,0,0,0-.911.938v4.062h-2.125a.938.938,0,0,0,0,1.875h1.518v2.5h-.911a.313.313,0,0,0,0,.625h2.428a.313.313,0,0,0,0-.625h-.911v-2.5h.911a.925.925,0,0,0,.911-.937v-5A.925.925,0,0,0,345.279,85.333Z"
                transform="translate(-330.861 -85.333)"
              />
              <path
                class="a"
                d="M3.946,90.333H1.821V86.271a.925.925,0,0,0-.911-.937A.925.925,0,0,0,0,86.271v5a.925.925,0,0,0,.911.937h.911v2.5H.911a.313.313,0,0,0,0,.625H3.339a.313.313,0,0,0,0-.625H2.428v-2.5H3.946a.938.938,0,0,0,0-1.875Z"
                transform="translate(0 -85.333)"
              />
              <path
                class="a"
                d="M112.193,152.02a2.41,2.41,0,0,0,2.5,0,1.558,1.558,0,0,1,.9-.258.318.318,0,0,0,.331-.3v-.911a1.273,1.273,0,0,0-1.322-1.214h-6.612a1.273,1.273,0,0,0-1.323,1.214v.911a.318.318,0,0,0,.331.3,1.55,1.55,0,0,1,.9.258,2.4,2.4,0,0,0,2.494,0,1.69,1.69,0,0,1,.574-.23v4.828h-1.323a.3.3,0,1,0,0,.607h3.306a.3.3,0,1,0,0-.607h-1.322v-4.826A1.708,1.708,0,0,1,112.193,152.02Z"
                transform="translate(-103.631 -147.225)"
              />
            </svg>
          </span>
          {{ CURRENT_CATERING.free_tables > 0 ? $t('place') : $t('noplace') }}
        </p>
        <p class="catering_additionalInfo_avgCheck">
          <img
            class="catering_additionalInfo_avgCheck-icon"
            src="/icons/catering/new/avg-check-grey.svg"
            alt=""
          >{{
            CURRENT_CATERING.avg_check_currency === 'USD' ? '&#8381;' : '$'
          }}
          {{
            (+CURRENT_CATERING.avg_check_min +
              +CURRENT_CATERING.avg_check_max) >>
              1
          }}
        </p>
      </div>
      <div class="catering_block catering_address">
        <img
          class="catering_address-icon"
          src="/icons/catering/new/point-grey.svg"
          alt=""
        >
        <p class="catering_address-txt">
          {{
            `${CURRENT_CATERING.address.city}, ${CURRENT_CATERING.address.street}, ${CURRENT_CATERING.address.building}`
          }}
        </p>
        <img
          class="catering_address-iconRoute desktop"
          :class="{ 'btn-disabled': !this.IS_AUTHORIZATION }"
          src="/icons/catering/new/map-burg.svg"
          alt=""
          @click="routingForCurrentCatering"
        >
        <img
          class="catering_address-iconRoute mobile"
          :class="{ 'btn-disabled-big': !this.IS_AUTHORIZATION }"
          src="/icons/_new/path-white.svg"
          alt=""
          @click="routingForCurrentCatering"
        >
      </div>
      <div class="catering_block catering_cuisines">
        <img
          class="catering_cuisines-icon"
          src="/icons/catering/new/cuisines-grey.svg"
          alt=""
        >
        <div class="catering_cuisines_carousel">
          <div class="kitchen_cuisines">
            <span
              v-for="(cuisine, idx) in CURRENT_CATERING.cuisines"
              :key="idx + '_' + cuisine.id"
              class="cusine_tip"
            >{{ cuisine.name }}</span>
            <!-- @click="removeCuisine(idx)" -->
          </div>
        </div>
        <div class="catering_cuisines_menu" @click="goToMenu">
          <img
            class="catering_cuisines_menu-icon"
            src="/icons/consumables/dinner.svg"
            alt=""
          >
          <span class="catering_cuisines_menu-text">
            {{ $t('menuLabel') }}
          </span>
        </div>
      </div>
      <div class="catering_block catering_mainActions">
        <div
          class="catering_mainActions_carousel"
          :style="{ width: sliderWidth }"
        >
          <carousel-catering-main-image
            v-if="
              CURRENT_CATERING &&
                CURRENT_CATERING.images &&
                CURRENT_CATERING.images.length
            "
            :images="CURRENT_CATERING.images"
            :ref-more-sliders="refMoreSliders"
            @click-handler="toggleSliderPopup"
          />
        </div>
        <div>
          <div class="flex wide j_c a_b mt-2 go-n-eat">
            <div>
              <button
                class="catering_mainActions-goEat flex a_c"
                :class="{
                  'eatme-btn-colorful': canGoEat,
                  'eatme-btn-disabled': !canGoEat
                }"
                @click="canGoEat && startGoEat(CURRENT_CATERING.id)"
              >
                <img src="/icons/catering/goneat.svg" alt="">
              </button>
            </div>
          </div>
          <div class="catering_mainActions_actionList">
            <div class="actionListItem-container">
              <div class="actionListItem takeaway">
                <button
                  class="catering_mainActions-actionItem"
                  :class="{
                    'eatme-btn-red': canPickup,
                    'eatme-btn-disabled': !canPickup
                  }"
                  @click="canPickup && startPickup(CURRENT_CATERING.id)"
                >
                  <img
                    class="catering_mainActions-actionItem-icon takeaway"
                    src="/icons/catering/takeaway.svg"
                    alt=""
                  >
                </button>
                <p class="info_labels">
                  {{ $t('label_pickup') }}
                </p>
              </div>

              <div class="actionListItem delivery">
                <button
                  class="catering_mainActions-actionItem"
                  :class="{
                    'eatme-btn-red': canDelivery,
                    'eatme-btn-disabled': !canDelivery
                  }"
                  @click="canDelivery && startDelivery(CURRENT_CATERING.id)"
                >
                  <img
                    class="catering_mainActions-actionItem-icon delivery"
                    src="/icons/catering/delivery.svg"
                    alt=""
                  >
                </button>
                <p class="info_labels">
                  {{ $t('label_delivery') }}
                </p>
              </div>
            </div>

            <div class="actionListItem-container">
              <div class="actionListItem reserve">
                <button
                  class="catering_mainActions-actionItem"
                  :class="{
                    'eatme-btn-red': canReserve,
                    'eatme-btn-disabled': !canReserve
                  }"
                  @click="canReserve && startReserve(CURRENT_CATERING.id)"
                >
                  <img
                    class="catering_mainActions-actionItem-icon reserve"
                    src="/icons/catering/reserve.svg"
                    alt=""
                  >
                </button>
                <p class="info_labels">
                  {{ $t('label_b') }}
                </p>
              </div>
              <div class="actionListItem preorder">
                <button
                  class="catering_mainActions-actionItem"
                  :class="{
                    'eatme-btn-red': canPreorder,
                    'eatme-btn-disabled': !canPreorder
                  }"
                  @click="canPreorder && startPreorder(CURRENT_CATERING.id)"
                >
                  <img
                    class="catering_mainActions-actionItem-icon preorder"
                    src="/icons/catering/preorder.svg"
                    alt=""
                  >
                </button>
                <p class="info_labels">
                  {{ $t('label_preorder') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="catering_block catering_moreInfo">
        <ul class="catering_moreInfo_features">
          <li
            v-for="(feature, i) in CURRENT_CATERING.features"
            :key="i"
            class="catering_moreInfo-feature"
          >
            <div class="catering_moreInfo-feature-icon">
              <img :src="feature.icon_path" alt="">
            </div>
            <p class="catering_moreInfo-feature-title">
              {{ feature.title }}
            </p>
          </li>
        </ul>
        <div
          class="catering_moreInfo-description"
          v-html="CURRENT_CATERING.description"
        />
      </div>
    </div>
    <popup-notification
      v-if="sliderPopupIsOpen"
      :no-padding="true"
      :is-full-height="true"
      class="catering-preview-popup"
      @close-popup="toggleSliderPopup"
    >
      <splide
        ref="popupCateringSplide"
        class="catering-preview-popup__slider"
        :slides="CURRENT_CATERING.images"
        :start="2"
        :data-splide="soptions()"
      >
        <splide-slide v-for="(image, i) in CURRENT_CATERING.images" :key="i">
          <img class="catering-preview-popup__img" :src="image.path" alt="">
        </splide-slide>
      </splide>
    </popup-notification>
    <!-- ERROR POPUP -->
    <!-- <div v-if="errorPopupIsOpen" class="addresses_popup">
      <popup-error @close-popup="toggleErrorPopup">
        {{
          errorPopupIsOpen.length ? errorPopupIsOpen : $t('popupErrorMessage')
        }}
      </popup-error>
    </div> -->
    <!-- SUCCESS DELETE POPUP -->
    <!-- <div v-if="successDeletePopupIsOpen" class="addresses_popup">
      <popup-success @close-popup="toggleSuccessDeletePopup">
        {{ $t('popupSuccessDeleteMessage') }}
      </popup-success>
    </div> -->
    <!-- PROMPT POPUP -->
    <div v-if="successPromptIsOpen" class="addresses_popup">
      <popup-delete
        @close-popup="togglePromptPopup"
        @delete="deleteFavorites(CURRENT_CATERING.id)"
      >
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'catering',
  middleware: 'auth-home',
  data () {
    return {
      favorites: [],
      selectedStyle: false,
      letDeleteFavorite: false,
      reloaded: false,
      sliderWidth: false,
      refMoreSliders: [],
      isWorkTimeOpened: true,
      sliderPopupIsOpen: false,
      errorPopupIsOpen: false,
      successDeletePopupIsOpen: false,
      successPromptIsOpen: false,
      sliderPopupInitialSlide: 0,
      splideCuisineOptions: {
        autoWidth: true,
        height: '30px',
        pagination: false,
        perPage: 4,
        perMove: 1,
        gap: '1rem',
        classes: {
          arrows: 'splide__arrows catering_cuisines_carousel-arrows',
          arrow: 'splide__arrow catering_cuisines_carousel-arrow'
        }
      },
      primaryOptions: {
        type: 'loop',
        height: '100%',
        pagination: false,
        cover: true,
        drag: true
      }
    }
  },
  computed: {
    canGoEat () {
      return (
        this.IS_AUTHORIZATION &&
        this.CURRENT_CATERING &&
        this.CURRENT_CATERING.available_go_and_eat
      )
    },
    canReserve () {
      return (
        this.IS_AUTHORIZATION &&
        this.CURRENT_CATERING &&
        this.CURRENT_CATERING.available_reserve
      )
    },
    canPreorder () {
      return (
        this.IS_AUTHORIZATION &&
        this.CURRENT_CATERING &&
        this.CURRENT_CATERING.available_preorder
      )
    },
    canDelivery () {
      return (
        this.IS_AUTHORIZATION &&
        this.CURRENT_CATERING &&
        this.CURRENT_CATERING.available_delivery
      )
    },
    canPickup () {
      return (
        this.IS_AUTHORIZATION &&
        this.CURRENT_CATERING &&
        this.CURRENT_CATERING.available_pickup
      )
    },
    ...mapGetters([
      'CURRENT_CATERING',
      'CURRENT_CATERING_ORDER',
      'CART_ITEMS',
      'IS_AUTHORIZATION',
      'IS_GOEATPOPUP',
      'IS_PICKUPPOPUP',
      'IS_DELIVERY_POPUP'
    ])
  },
  watch: {
    systemTime () {
      this.sliderWidth = this.isMobile
        ? '100%'
        : this.$refs.cateringBlock.getBoundingClientRect().width * 0.42 -
          20 +
          'px'
    }
  },
  created () {
    if (this.IS_AUTHORIZATION) {
      this.getFavorites()
    }
    setTimeout(() => {
      this.reloaded = true
    }, 500)
  },
  beforeRouteLeave (to, from, next) {
    this.reloaded = false
    next()
  },
  beforeCreate () {
    this.$nextTick(() => this.$nuxt.$loading.start())
  },
  mounted () {
    setTimeout(() => this.$nuxt.$loading.finish(), 500)
  },
  beforeDestroy () {
    this.reloaded = false
  },

  methods: {
    async getFavorites () {
      if (this.IS_AUTHORIZATION) {
        await this.$store
          .dispatch('fetchFavorites', this.$cookies)
          .then((res) => {
            this.favorites = res.data.data
            setTimeout(() => {
              if (this.favorites && this.favorites.length) {
                console.log(
                  this.favorites
                    .map(el => el.catering === this.CURRENT_CATERING.id)
                    .includes(true)
                )
                if (
                  this.favorites
                    .map(el => el.catering === this.CURRENT_CATERING.id)
                    .includes(true)
                ) {
                  this.selectedStyle = true
                  console.log('belgilandi')
                } else {
                  console.log('belgilanmadi')
                  this.selectedStyle = false
                }
              } else {
                console.log('belgilanmadi')
                this.selectedStyle = false
              }
            }, 500)
          })
      }
    },
    addFavorite (currentCateringId) {
      if (this.IS_AUTHORIZATION) {
        if (!this.selectedStyle) {
          this.$store
            .dispatch('addToFavorites', {
              id: currentCateringId,
              cookiz: this.$cookies
            })
            .then((res) => {
              if (res && res.data) {
                this.$store.commit(
                  'SET_SUCCESS_NOTIFY',
                  this.$t('favoriteAdded')
                )
                this.selectedStyle = true
                console.log('bu add response ', res.data)
              }
            })
        }
      } else {
        this.loginUserTypes()
      }
    },
    deleteFavorites (currentCateringId) {
      if (this.IS_AUTHORIZATION) {
        this.$store
          .dispatch('deleteFavorite', {
            id: currentCateringId,
            cookie: this.$cookies
          })
          .then((res) => {
            console.log('bu delete response', res.data)
            if (res && res.data && res.data.status === 'success') {
              this.$store.commit(
                'SET_SUCCESS_NOTIFY',
                this.$t('popupSuccessDeleteMessage')
              )
              this.getFavorites()
            }
          })
          .catch((err) => {
            console.log(err)
            this.$store.commit('SET_ERROR_NOTIFY', this.$t('popupErrorMessage'))
          })
      } else {
        this.loginUserTypes()
      }
    },

    soptions () {
      console.warn(`{"start": ${this.sliderPopupInitialSlide}}`)
      return `{"start": ${this.sliderPopupInitialSlide}}`
    },
    changeSliderPopupInitialSlide (index) {
      this.sliderPopupInitialSlide = index
    },
    // start () {

    // let elem = document.querySelector('.catering_mainActions_carousel .splide__slide.is-active')
    // if (elem) {
    //   let i = 0
    //   while ((elem = elem.previousElementSibling) != null) { ++i }
    //   return i - 2
    // }
    // return 0
    // },
    // ACTIONS AND LINKS
    toggleSuccessDeletePopup () {
      this.successDeletePopupIsOpen = !this.successDeletePopupIsOpen
    },
    togglePromptPopup () {
      this.successPromptIsOpen = !this.successPromptIsOpen
    },
    toggleSliderPopup (index) {
      this.sliderPopupIsOpen = !this.sliderPopupIsOpen
      this.changeSliderPopupInitialSlide(index)
    },
    onPopupSliderMounted () {
      this.refMoreSliders.push(this.$refs.popupCateringSplide)
    },
    scrollToTop () {
      if (this.isMobile) {
        window.scrollTo(0, 0)
      }
    },
    goToMenu () {
      const id = this.$route.params.id

      this.$router.push(
        this.localePath({
          path: `/catering/${id}/menu`
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';
@import '~/assets/styles/modificator';

.info_labels {
  font-size: 14px;
  width: 80%;
  margin: 1rem auto;
  line-height: 1.5rem;
  text-align: center;

  @media screen and (max-width: 991px) {
    font-size: 14px;
  }

  &.eat {
    @media screen and (max-width: 991px) {
      display: none;
    }
  }
}

.main {
  grid-area: main;
  height: 100%;
  overflow: hidden;

  &_body {
    position: relative;
    width: 100%;
    height: 100vh;
    height: calc(var(--vh) * 100);

    @media screen and (min-width: 992px) {
      position: relative;
      display: grid;
      grid-template-columns: 17% 69% 14%;
      grid-template-areas: 'menu body news';
      grid-column-gap: 5px;
      padding: 0 $p-side;
      width: 100%;
      height: 100%;
    }
  }

  &_menu {
    grid-area: menu;
    display: none;
    grid-template-rows: auto 1fr;
    border-radius: $br-block-desktop;
    background-color: $c-light;

    @media screen and (min-width: 992px) {
      display: grid;
    }

    &-back {
      padding: 5px 5px 5px 15px;
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
    }
  }
}

.catering {
  position: relative;
  grid-area: body;
  display: flex;
  border-radius: 0;
  background-color: $c-light;
  height: 100%;
  width: 100%;
  overflow: auto;

  @media screen and (min-width: 992px) {
    border-radius: $br-block-desktop;
    padding: 10px;
    width: 69%;
  }

  &_wrap {
    display: grid;
    grid-auto-rows: minmax(min-content, max-content);
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'title title'
      'rate social'
      'additional additional'
      'address address'
      'cuisine cuisine'
      'main main'
      'more more';
    grid-row-gap: 10px;
    align-items: center;
    padding: 10px;
    width: 100%;

    @media screen and (min-width: 992px) {
      position: relative;
      grid-template-rows: repeat(5, auto) 1fr;
      grid-template-columns: 42% repeat(2, 1fr) auto;
      grid-template-areas:
        'main title title social'
        'main rate rate rate'
        'main additional additional additional'
        'main address address address'
        'main cuisine cuisine cuisine'
        'main more more more';
      grid-row-gap: 10px;
      grid-column-gap: 20px;
      padding-top: 10px;
    }
  }

  &-back {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 5;

    @media screen and (max-width: 991px) {
      font-size: 14px !important;
    }

    @media screen and (min-width: 992px) {
      display: none;
    }
  }

  &_mainActions {
    grid-area: main;
    position: relative;
    align-self: start;
    width: initial;
    overflow: hidden;
    margin-top: 10px;

    &-goEat {
      height: 38px;
      padding-right: 56px !important;
      padding-left: 56px !important;

      img {
        height: 19px;
      }
    }

    &_actionList {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 20px;

      .actionListItem {
        margin: 0 auto;
        padding: 0 10px;

        &.takeaway {
          margin-left: 0;
          padding-left: 0;
        }
        &.preorder {
          margin-right: 0;
          padding-right: 0;
        }

        button {
          margin: 0 auto;
          width: 85px;
        }

        &-container {
          display: flex;
          flex: 0 1 50%;
          flex-wrap: nowrap;
        }
      }

      @media screen and (min-width: 992px) and (max-width: 1572px) {
        justify-content: center;

        .actionListItem {
          padding: 0;

          &.takeaway,
          &.reserve {
            margin-left: -10px;
          }
          &.delivery,
          &.preorder {
            margin-right: -10px;
          }

          &-container {
            width: 226px;
            flex: 0 1 auto;
            justify-content: space-between;
          }

          p {
            width: 104px;
          }
        }
      }
      @media screen and (max-width: 579px) {
        justify-content: center;

        .actionListItem {
          padding: 0;

          .catering_mainActions-actionItem {
            max-width: 90px;
          }
          p {
            width: 104px;
          }
        }
      }
    }

    &-actionItem {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 30px !important;
      height: 38px;

      @media screen and (max-width: 991px) {
        width: 75%;
        padding: 0.1em;
      }

      &-icon {
        &.takeaway {
          width: 20px;
          height: 22px;
        }
        &.delivery {
          width: 20px;
          height: 22px;
        }
        &.reserve {
          width: 25px;
          height: 18px;
        }
        &.preorder {
          width: 20px;
          height: 20px;
        }

        @media screen and (max-width: 991px) {
          height: 32px;
        }
      }
    }
  }

  &-title {
    grid-area: title;
    justify-self: center;
    width: 70%;
    font-family: $ff-roboto;
    font-size: 16px;
    font-weight: bold;
    color: $c-green;
    text-align: center;

    @media screen and (max-width: 991px) {
      font-size: 22px;
      margin-top: 3rem;
    }

    @media screen and (min-width: 992px) {
      width: 100%;
      font-size: 18px;
      color: $c-secondary;
      text-align: left;
    }
  }

  &_socialAction {
    grid-area: social;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 5px;
    align-items: center;

    @media screen and (max-width: 991px) {
      margin-right: 2rem;
    }

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 7px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      box-shadow: 0px 4px 8px #1ca79012;
      cursor: pointer;
      border: 1px solid $green;
      transition: all 0.3 ease-in-out;
      &.activeSelected {
        border: 1px solid $orange !important;
        svg {
          fill: $orange !important;
        }
      }
      .favorites-icon {
        margin-top: 5px;
      }
      svg {
        fill: $green;
      }
      &:hover {
        border: 1px solid #5c5c5c;
        svg {
          fill: #5c5c5c;
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &.desktop {
        display: none;

        @media screen and (min-width: 992px) {
          display: block;
          border: 1px solid $c-icon-green;
        }
      }

      &.mobile {
        border: 1px solid $c-icon-green;

        @media screen and (min-width: 992px) {
          display: none;
        }
      }
    }
  }

  &_rate {
    grid-area: rate;
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;

    @media screen and (max-width: 991px) {
      margin-left: 2rem;
    }

    & > *:not(:first-child) {
      margin-left: 5px;
    }

    &-count {
      font-family: $ff-roboto;
      font-size: 14px;
    }

    &-review {
      font-family: $ff-gilroy;
      font-size: 14px;

      span {
        color: $c-green;
      }
    }
  }

  &_additionalInfo {
    grid-area: additional;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-column-gap: 8px;
    align-items: center;

    @media screen and (max-width: 991px) {
      width: 90%;
      margin: auto;
    }
    @media screen and (min-width: 992px) {
      justify-items: center;
    }

    &_time {
      position: relative;
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-column-gap: 5px;
      align-items: center;
      padding: 10px 5px;
      box-shadow: 0px 3px 6px #11100029;
      border: 1px solid #e2e2e2;
      border-radius: 8px;
      background: #ffffff 0% 0% no-repeat padding-box;
      font-family: $ff-roboto;
      font-size: 14px;
      color: $c-green;
      cursor: pointer;

      @media screen and (min-width: 992px) {
        justify-self: start;
      }

      &-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 12px;
        height: 12px;

        @media screen and (min-width: 992px) {
          flex: 0 0 15px;
          width: 15px;
          height: 15px;
        }

        svg {
          width: 100%;
          height: 100%;
          fill: $c-green;
        }
      }

      &_list {
        position: absolute;
        z-index: 20;
        bottom: 0;
        left: 0;
        box-shadow: 0px 3px 6px #11100029;
        border: 1px solid #e2e2e2;
        border-radius: 5px;
        background-color: $light;
        color: $c-primary;
        transform: translateY(calc(100% + 5px));
        cursor: default;

        &-item {
          display: grid;
          grid-template-columns: 2em repeat(3, auto);
          grid-column-gap: 5px;
          padding: 5px;
          font-size: 14px;
          font-weight: 300;

          & > span:first-child {
            color: $c-green;
          }

          &:not(:first-child) {
            border-top: {
              width: 1px;
              style: solid;
              color: $c-line;
            }
          }

          &.holiday > span:first-child {
            color: #eb618d;
          }
        }
      }
    }

    &_seats {
      display: flex;
      align-items: center;
      font-family: $ff-gilroy;
      font-size: 14px;

      @media screen and (min-width: 992px) {
        font-size: 14px;
      }

      &-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
        margin-left: 5px;
        flex: 0 0 15px;
        width: 15px;
        height: 15px;

        svg {
          width: 100%;
          height: 100%;
        }
      }
    }

    &_avgCheck {
      display: flex;
      align-items: center;
      font-size: 14px;

      &-icon {
        margin-right: 5px;
        width: 20px;
        height: 20px;
        object-fit: cover;
      }

      @media screen and (min-width: 992px) {
        font-size: 14px;
        white-space: nowrap;
      }
    }
  }

  &_address {
    grid-area: address;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    grid-column-gap: 10px;

    @media screen and (max-width: 991px) {
      margin-top: 1rem;
      margin-bottom: 1rem;
      width: 90%;
      margin: auto;
    }

    &-icon {
      display: flex;
      align-items: center;
      margin-top: 3px;
      width: 20px;
      height: 20px;
      object-fit: cover;

      @media screen and (max-width: 991px) {
        align-self: start;
      }
    }

    &-txt {
      position: relative;
      width: 99%;
      word-wrap: break-word;
      font-family: $ff-gilroy;
      font-size: 14px;
      line-height: 1em;
    }

    &-iconRoute {
      @extend %btn-red;
      display: flex;
      align-items: center;
      margin-top: 3px;
      border-radius: 12px;
      padding: 5px;
      width: 50px;
      height: 30px;
      cursor: pointer;
      object-fit: contain;

      @media screen and (max-width: 991px) {
        border-radius: 32px;
        padding: 5px;
        width: 64px;
        height: 32px;
      }

      @media screen and (min-width: 992px) {
        background: transparent;
        border: 1px solid $c-icon-burg;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        object-fit: cover;
      }

      &.desktop {
        display: none;

        @media screen and (min-width: 992px) {
          display: block;
        }
      }

      &.mobile {
        @media screen and (min-width: 992px) {
          display: none;
        }
      }

      svg {
        width: 100%;
        height: 100%;
        fill: $light;

        @media screen and (min-width: 992px) {
          fill: #ba4a70;
        }
      }
    }
  }

  &_cuisines {
    grid-area: cuisine;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 10px;
    align-items: center;
    width: 100%;

    @media screen and (max-width: 991px) {
      width: 90%;
      margin: auto;
      flex-direction: row-reverse;
      display: flex;
      align-items: flex-start;
    }

    @media screen and (min-width: 992px) {
      grid-template-columns: auto 1fr;
    }

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      object-fit: cover;
      @media screen and (max-width: 991px) {
        display: none;
      }
    }

    &_carousel {
      overflow: hidden;

      @media screen and (max-width: 991px) {
        width: 100%;
      }

      &-img {
        border: {
          width: 1px;
          style: solid;
          color: $c-line;
          radius: 6px;
        }
        padding: 2px;
        flex: 0 0 30px;
        width: 30px;
        height: 30px;
      }

      & /deep/ &-arrow {
        display: none;
        visibility: hidden !important;
      }

      & /deep/ {
        & .cuisineCarousel {
          display: grid;
          align-items: center;
          margin: 0;

          &-arrow {
            display: none;
          }
        }
      }
    }

    &_menu {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5em 1.25em;
      border: {
        width: 1px;
        style: solid;
        color: $c-green;
        radius: 12px;
      }

      @media screen and (max-width: 991px) {
        border-radius: 32px;
        margin-right: 1rem;
        margin-top: 4px;
        cursor: pointer;
      }
      @media screen and (min-width: 992px) {
        display: none;
      }

      &-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
      }

      &-text {
        margin-left: 5px;
        font-family: $ff-gilroy;
        font-size: 14px;
        font-weight: bold;
        color: $c-green;
      }
    }
  }

  &_moreInfo {
    grid-area: more;
    &::-webkit-scrollbar {
      display: none;
    }
    border-top: {
      width: 1px;
      style: solid;
      color: $c-line;
    }
    @media screen and (max-width: 991px) {
      border: none;
      width: 95%;
      margin: auto;
    }
    @media screen and (min-width: 1200px) {
      align-self: stretch;
      overflow-y: scroll;
      // margin-right: -10px;
      min-height: 460px;
    }
    @media screen and (min-width: 1750px) {
      min-height: auto;
    }

    &_features {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: minmax(min-content, max-content);
      grid-gap: 15px;
      margin: 15px 10px 15px 0;
    }

    &-feature {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 8px;
      align-items: center;
      font-size: 14px;

      @media screen and (min-width: 1080px) {
        grid-column-gap: 5px;
        font-size: 14px;
      }

      &-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 10px 5px 0;
        width: 50px;
        height: 50px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    &-description {
      width: 95%;
      margin: 0 auto 0 0;
      font-size: 14px;
      padding-bottom: 3rem;
    }

    &-description /deep/ p {
      font-family: $ff-gilroy;
      font-size: 14px;

      &:not(:first-child) {
        margin-top: 20px;
      }
    }
  }
}

.catering-preview-popup {
  &__slider {
    //flex: 1 0 auto;
    height: 100%;
    cursor: grab;
    border-radius: 4px;
    overflow: hidden;

    @media screen and (max-width: 991px) {
      border-radius: 6px;
    }
  }

  & /deep/ .splide {
    &__track,
    &__list,
    &__slide {
      height: 100%;
    }
  }

  &__img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center center;
  }
}

.cateringSliderPopup {
  z-index: 10;
  & /deep/ {
    .popup {
      align-items: stretch;
      justify-content: stretch;
      padding: 0;

      &::before {
        display: none;
      }
    }

    .splide__track,
    .splide__slide {
      border-radius: 5px;
    }
    .splide__track,
    .splide__list,
    .splide__slide {
      width: 100% !important;
      height: 100% !important;
    }
  }

  &_slider {
    width: 100%;
    cursor: grab;

    &-img {
      width: 100%;
      height: 600px;
      max-height: 75vh;
      max-height: calc(var(--vh) * 75);
      object-fit: cover;
    }
  }
}

.kitchen {
  justify-items: center;
  grid-row-gap: 15px;
  width: 100%;

  &_cuisines {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    min-width: 100%;
    max-width: 100%;
    overflow: hidden;

    @media screen and (max-width: 991px) {
      /deep/ .cuisineSearch-input {
        font-size: 14px;
      }
    }

    .cusine_tip {
      position: relative;
      border-radius: 4px;
      border: 1px solid $c-green;
      color: $c-green;
      padding: 6px 10px 4px 6px;
      font-size: 12px;
      margin-right: 0.5em;
      margin-bottom: 0.5em;
      text-transform: capitalize;

      @media screen and (max-width: 991px) {
        color: #121212;
        margin-top: 0.42em;
        border-radius: 8px;
        padding-top: 4px;
      }
    }
  }
}

@media screen and (max-width: 991px) {
  /deep/ {
    .cateringWorkTime {
      display: inline-block;
      width: 13em;

      &-icon {
        margin: 0 0.75rem;
      }
    }
  }
}
</style>

<style>
@media screen and (max-width: 991px) {
  .catering .catering_mainActions_actionList .info_labels {
    margin-bottom: 2rem !important;
  }
  .catering .info_labels {
    line-height: 1rem !important;
    margin-top: 0.5rem;
  }
  .catering .catering_mainActions_actionList .actionListItem {
    width: 14rem !important;
  }
  .catering .catering_mainActions_actionList {
    margin-bottom: 2rem !important;
  }
  .catering .go-n-eat {
    margin-bottom: 2rem !important;
  }
}
</style>
