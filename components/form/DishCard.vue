<i18n>
{
  "en": {
    "addButton": "Add",
    "removeButton": "Remove",
    "promotionLabel": "Sale!",
    "grLabel": "gr",
    "minLabel": "min",
    "ccalLabel": "Kcal",
    "popupDeleteMessage": "Are you sure you want to delete?",
    "popupErrorMessage": "Oops,error occured when deleting Your Favorites",
    "linkCopied": "Dish link copied",
    "linkCopiedError": "An error occurred while trying to share a dish",
    "deleteOldCart": "Cannot add dishes from different establishments to the basket. Delete dishes from another establishment?",
    "successDeleteTitle": "Deleted successfully",
    "favoriteDeleted":"Successfully Deleted!",
    "popupDeleteMessage": "Are you sure you want to delete?",
    "deleteFavoritesText":"Delete from favorites",
    "favoriteAdded":"Succesfully Added to Favorites Dish!"
  },
  "ru": {
    "addButton": "Добавить",
    "removeButton": "Удалить",
    "promotionLabel": "Акция!",
    "grLabel": "гр",
    "minLabel": "мин",
    "ccalLabel": "Ккал",
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "popupErrorMessage": "К сожалению, при удалении избранного произошла ошибка",
    "linkCopied": "Ссылка на блюдо скопирована",
    "linkCopiedError": "Ошибка при попытке поделиться блюдом",
    "deleteOldCart": "Нельзя добавить в корзину блюда из разных заведений. Удалить блюда из другого заведения?",
    "successDeleteTitle": "Успешно удалено",
    "favoriteDeleted":"Успешно удалено!",
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "deleteFavoritesText":"Удалить из избранного",
    "favoriteAdded":"Успешно добавлено в избранное!"
  }
}
</i18n>

<template>
  <div class="dish-card">
    <div class="dishCard_wrap" :class="{ promotion: isPromoDish(currentDish) }">
      <header class="dishCard_header">
        <div
          v-if="favoritesDish"
          class="dishCard__action-delete-mobile"
          @click="togglePromptPopup()"
        >
          {{ $t('deleteFavoritesText') }}
        </div>
        <h1 class="dishCard-title flex a_c">
          <div class="wide">
            <span v-if="isPromoDish(currentDish)" class="promoLabel roboto red">
              {{ $t('promotionLabel') }}
            </span>
            {{ currentDish.name }}
          </div>
          <div class="dishCard_action desktop">
            <div
              v-if="!favoritesDish"
              :class="[
                'dishCard_action-item-like',
                { activeFavorites: favoritesToggle }
              ]"
              @click.stop="
                !IS_AUTHORIZATION && loginUserTypes(),
                favoritesToggle ? deleteFavoritesDish() : addFavoritesDish()
              "
            >
              <svg
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 3.42388C0 4.95988 0.311008 5.15088 1.52701 6.36588L5.435 10.2179C6.425 10.7719 7.22399 9.53188 7.78299 8.97288C9.16333 7.72103 10.4557 6.37551 11.651 4.94588C11.8833 4.48586 11.9931 3.97376 11.97 3.45895C11.9469 2.94413 11.7915 2.44395 11.5189 2.00663C11.2462 1.56931 10.8656 1.20958 10.4135 0.962134C9.96147 0.714688 9.45329 0.587862 8.93799 0.593879C7.29799 0.593879 6.91298 1.74188 5.95898 2.38088C5.57798 2.12588 3.37298 -0.844119 0.932983 1.38088C0.366111 1.91319 0.0310622 2.64688 0 3.42388Z"
                />
              </svg>
            </div>
            <div
              class="dishCard_action-item share"
              @click.stop="copyDishLink(currentDish.id)"
            >
              <img
                class="desktop"
                src="/icons/catering/new/share-green.svg"
                alt=""
                @click.stop="copyDishLink(currentDish.id)"
              >
              <img
                class="mobile"
                src="/icons/catering/new/share-green.svg"
                alt=""
                @click.stop="copyDishLink(currentDish.id)"
              >
            </div>
          </div>
        </h1>
        <div v-if="favoritesDish" class="dishCard__action-downside">
          <div class="dishCard__action-address">
            <span class="dishCard__action-favoritesRestaurant">
              {{ favoritesDish.catering }}
              <span class="dishCard__action-favoritesAddress">
                {{ favoritesDish.address }}
              </span>
            </span>

            <div class="dishCard__action-home">
              <svg
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.08781 9.3043C6.08781 9.28577 6.08781 9.26106 6.08781 9.23636C6.10017 8.40258 6.11869 7.5688 6.12487 6.7412C6.12487 6.56827 6.10017 6.39534 6.08781 6.2224C6.08781 6.12359 6.01988 6.0433 5.92106 6.02477C5.78518 5.99389 5.64931 5.95683 5.50726 5.9383C5.21698 5.90124 4.92052 5.88889 4.63025 5.9136C4.50672 5.91977 4.3832 5.9383 4.25968 5.96918C4.04351 6.01859 3.98793 6.07418 3.97558 6.29652C3.95705 6.72885 3.93234 7.16118 3.93234 7.59351C3.92617 8.13701 3.94469 8.68051 3.95087 9.22401C3.95087 9.24871 3.95087 9.27342 3.95087 9.31047C3.85823 9.31665 3.75941 9.329 3.66677 9.329C3.32708 9.329 2.98122 9.33518 2.64153 9.329C2.53036 9.32282 2.41301 9.31047 2.30184 9.29194C2.10421 9.25489 1.9251 9.13754 1.81393 8.97078C1.64717 8.76697 1.52365 8.53228 1.45571 8.27906C1.44954 8.25435 1.44336 8.22347 1.44336 8.19877C1.44336 7.03765 1.44336 5.87654 1.44336 4.70925C1.44336 4.67219 1.46189 4.63514 1.48659 4.61661C2.65388 3.67784 3.82117 2.74524 4.98846 1.80647L5.03169 1.76941L5.43314 2.09057C6.48926 2.93052 7.54538 3.77048 8.59533 4.61661C8.62621 4.64131 8.64473 4.67837 8.64473 4.71543C8.64473 5.88272 8.64473 7.05001 8.64473 8.22347C8.64473 8.26053 8.63856 8.30376 8.62621 8.34082C8.53356 8.62492 8.37298 8.87814 8.163 9.08813C7.99624 9.23636 7.78625 9.329 7.56391 9.34753C7.14393 9.39076 6.72396 9.39076 6.31016 9.34135C6.24222 9.33518 6.17428 9.329 6.11252 9.31665C6.10017 9.31047 6.09399 9.31047 6.08781 9.3043Z"
                />
                <path
                  d="M7.13798 1.75711C7.13798 1.59036 7.13798 1.4236 7.13798 1.25684C7.13798 1.24449 7.13798 1.23214 7.13798 1.21979C7.14415 1.05303 7.16886 1.02833 7.33561 1.00362C7.69383 0.954213 8.05205 0.941861 8.41644 0.978918C8.66348 1.00362 8.67584 1.02215 8.68819 1.25067C8.69436 1.52859 8.69436 1.8127 8.68819 2.0968C8.68201 2.3809 8.65731 2.65265 8.63878 2.93675C8.63878 2.97381 8.65731 3.01704 8.68819 3.04175C9.0464 3.34438 9.4108 3.65319 9.76901 3.96199C9.83695 4.02993 9.90489 4.09787 9.96665 4.1658C10.0037 4.20286 10.0099 4.26462 9.98518 4.31403C9.89871 4.47461 9.75048 4.59196 9.57138 4.64754C9.51579 4.6599 9.46021 4.64137 9.42315 4.59813C9.22551 4.43138 9.0217 4.2708 8.82406 4.10404C7.91617 3.31967 7.01446 2.52913 6.10656 1.74476C5.80393 1.47918 5.48895 1.22596 5.17397 0.978918C5.01956 0.855395 5.03809 0.855395 4.88369 0.978918C4.48842 1.2939 4.09932 1.60888 3.71022 1.93622C2.74057 2.74529 1.77092 3.5729 0.801262 4.39432C0.702444 4.47461 0.597449 4.54873 0.498631 4.62284C0.461574 4.65372 0.412165 4.65372 0.375108 4.63519C0.202176 4.54255 0.0663012 4.38815 0.0045398 4.20286C-0.00781247 4.15963 0.0045402 4.10404 0.0477732 4.07934C0.270114 3.87553 0.492455 3.67171 0.720972 3.47408C1.91297 2.45501 3.11731 1.46066 4.35254 0.497179C4.544 0.348952 4.74164 0.206901 4.93927 0.0648494C5.0628 -0.0216165 5.06897 -0.0216165 5.18632 0.0648494C5.40248 0.225429 5.61247 0.392185 5.81628 0.571293C6.24244 0.941861 6.66242 1.32478 7.08239 1.7077L7.13798 1.75711Z"
                />
              </svg>
            </div>
          </div>
          <div class="dishCard__action-delete" @click="togglePromptPopup()">
            {{ $t('deleteFavoritesText') }}
          </div>
        </div>
        <div class="dishCard_avatar relative">
          <img
            class="dishCard_avatar-img"
            :src="currentDish.img_path"
            alt=""
            @click="setPreviewImg(currentDish.img_path)"
          >
          <div class="dishCard_avatar_action mobile">
            <div class="dishCard_avatar_action-item-like">
              <img class="" src="/icons/catering/new/heart-green.svg" alt="">
            </div>
            <div
              class="dishCard_avatar_action-item-share"
              @click.stop="copyDishLink(currentDish.id)"
            >
              <img class="" src="/icons/catering/new/share-green.svg" alt="">
            </div>
          </div>
          <img
            v-if="isPromoDish(currentDish)"
            src="/images/icons/promotion_percent.png"
            alt=""
            class="dishe_item-imagePromotion"
          >
          <div v-if="isPromoDish(currentDish)" class="promobck mobile">
            <p class="text-lg">
              Блюдо дня! Успей попробовать всего за &#8381; 450!
            </p>
          </div>
        </div>
      </header>
      <article class="dishCard_body">
        <div class="dishCard_ingredient">
          <p class="dishCard_ingredient-text mobile">
            {{ currentDish.description.join(', ') }}
          </p>
          <img
            src="/icons/catering/new/ingred-list-grey.svg"
            alt=""
            class="dishCard_ingredient-icon desktop"
          >
          <ul class="dishCard_ingredient_list desktop">
            <li
              v-for="(item, i) in currentDish.description"
              :key="i"
              class="dishCard_ingredient-item"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="dishCard_additionalInfo">
          <div class="dishCard_additionalInfo-item">
            <img
              class="dishCard_additionalInfo-icon"
              src="/icons/catering/new/weight-grey.svg"
              alt=""
            >
            <p class="dishCard_additionalInfo-label">
              {{ currentDish.weight }} {{ $t('grLabel') }}
            </p>
          </div>
          <div class="dishCard_additionalInfo-item">
            <img
              class="dishCard_additionalInfo-icon"
              src="/icons/catering/new/clock-grey.svg"
              alt=""
            >
            <p class="dishCard_additionalInfo-label">
              {{ currentDish.cook_time }} {{ $t('minLabel') }}
            </p>
          </div>
          <div class="dishCard_additionalInfo-item">
            <img
              class="dishCard_additionalInfo-icon"
              src="~/assets/icons/kcal.svg"
              alt=""
            >
            <p class="dishCard_additionalInfo-label">
              {{ currentDish.energy_value }} {{ $t('ccalLabel') }}
            </p>
          </div>
          <div class="dishCard_additionalInfo-item flex a_b desktop">
            <img
              class="dishCard_additionalInfo-icon"
              src="~/assets/icons/reatpop.svg"
              alt=""
            >
            <div class="dishCard_additionalInfo-list">
              <p v-for="(dishkeyword, iii) in currentDish.keywords" :key="iii">
                {{ dishkeyword }}
              </p>
            </div>
          </div>
        </div>
        <div class="dishCard_specials desktop">
          <div v-if="isPromoDish(currentDish)" class="flex wide">
            <img
              src="/images/icons/promotion_percent.png"
              alt=""
              class="dish_small_imagePromotion"
            >
            <p class="red text-lg">
              Блюдо дня!<br>-30%<br>Успей попробовать!
            </p>
          </div>
        </div>
        <div class="dishCard_pricing">
          <div class="dishCard_pricing-container">
            <div v-if="isPromoDish(currentDish)" class="dishCard-price">
              <span
                class="dishCard-text text-xl grey wide text-right nowrap"
              ><span class="gilroy-bold">&#8381;</span>
                {{ +currentDish.price + 50 }}</span>
            </div>
            <div class="dishCard-price">
              <p
                :class="{
                  red: isPromoDish(currentDish),
                  green: !isPromoDish(currentDish)
                }"
                class="dishCard-price-value nowrap"
              >
                <span class="gilroy-bold">&#8381;</span>
                {{ +currentDish.price }}
              </p>
            </div>
          </div>
          <div class="dishCard_counter">
            <div class="dishCard_counter-count">
              <img
                v-if="!isReadOnly"
                class="dishCard_counter-arrow left"
                src="/icons/catering/new/arrow-grey.svg"
                alt=""
                @click="dishMinus(currentDish)"
              >
              <div class="dishCard_counter-count-img">
                {{ countInCart() }}
              </div>
              <img
                v-if="!isReadOnly"
                class="dishCard_counter-arrow right"
                src="/icons/catering/new/arrow-grey.svg"
                alt=""
                @click="dishPlus(currentDish)"
              >
            </div>
            <p
              class="dishCard-btn-price mobile"
              :class="{
                red: isPromoDish(currentDish),
                green: !isPromoDish(currentDish)
              }"
            >
              <span
                :class="{
                  red: isPromoDish(currentDish),
                  green: !isPromoDish(currentDish)
                }"
                class="nowrap cursor-default"
              >
                <span class="gilroy-bold">&#8381;</span> {{ +reducePrice }}
              </span>
            </p>
          </div>
          <div class="dishCard-btn">
            <p class="dishCard-btn-price desktop">
              <span
                :class="{
                  red: isPromoDish(currentDish),
                  green: !isPromoDish(currentDish)
                }"
                class="nowrap cursor-default"
              >
                <span class="gilroy-bold">&#8381;</span> {{ +reducePrice }}
              </span>
            </p>
            <template v-if="!isReadOnly">
              <button
                v-if="countInCart()"
                class="dishCard-btn-add eatme-btn-orange remove"
                @click="$emit('open-delete-popup')"
              >
                <div>
                  <img
                    class="dishCard-btn-remove-icon"
                    src="~static/icons/catering/new/minus-grey.svg"
                    alt=""
                  >{{ $t('removeButton') }}
                </div>
              </button>
              <button
                v-else
                class="dishCard-btn-add eatme-btn-colorful"
                @click="addDish(currentDish)"
              >
                <div>
                  <img
                    class="dishCard-btn-add-icon"
                    src="~static/icons/catering/new/plus-green.svg"
                    alt=""
                  >{{ $t('addButton') }}
                </div>
              </button>
            </template>
          </div>
        </div>
      </article>
      <div class="dishCard_ingredient mobile">
        <img
          src="/icons/catering/new/ingred-list-grey.svg"
          alt=""
          class="dishCard_ingredient-icon mobile"
        >
        <p class="dishCard_ingredient-text mobile">
          {{ currentDish.description.join(', ') }}
        </p>
      </div>
      <div class="dishCard_ingredient mobile cuisines">
        <img
          src="/icons/catering/new/cuisines-grey.svg"
          alt=""
          class="dishCard_ingredient-icon mobile"
        >
        <p class="dishCard_ingredient-text mobile">
          <span v-for="(dishkeyword, iii) in currentDish.keywords" :key="iii">
            {{ dishkeyword }},
          </span>
        </p>
      </div>
    </div>
    <popup-delete
      v-if="isPopupDeleteOldCart"
      @close-popup="isPopupDeleteOldCart = false"
      @delete="
        $store.dispatch('ADD_ITEM_IN_BASKET', {
          cookiz: $cookies,
          dishID: isPopupDeleteOldCart.id,
          quantity: 1,
          clearOldCart: true
        })
        isPopupDeleteOldCart = false
      "
    >
      {{ $t('deleteOldCart') }}
    </popup-delete>
    <!-- PROMPT POPUP -->
    <div v-if="successPromptIsOpen" class="addresses_popup">
      <popup-delete
        @close-popup="togglePromptPopup"
        @delete="deleteFavoritesDish"
      >
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    favoritesDish: {
      type: [Object, null],
      default: null
    },
    currentDish: {
      required: true,
      type: Object
    },
    isReadOnly: {
      type: Boolean,
      default: false
    },
    quantity: {
      type: [Number, null],
      default: null
    }
  },
  data () {
    return {
      isPopupDeleteOldCart: false,
      imgPreview: null,
      successPromptIsOpen: false,
      selectedList: [],
      favoritesDishList: [],
      favoritesToggle: false
    }
  },
  computed: {
    ...mapGetters(['CART_ITEMS']),
    reducePrice () {
      const count = this.countInCart()
      if (count > 0) {
        return this.currentDish.price * count
      } else {
        return this.currentDish.price
      }
    }
  },
  async created () {
    if (this.IS_AUTHORIZATION) {
      await this.getFavoritesDish()
    }
  },
  methods: {
    // getting favoriteslist
    async getFavoritesDish () {
      if (this.IS_AUTHORIZATION) {
        await this.$store
          .dispatch('fetchFavoritesDish', this.$cookies)
          .then((res) => {
            this.favoritesDishList = res.data.data
            if (this.favoritesDishList.length > 0) {
              this.favoritesToggle = !!this.favoritesDishList.map(
                el => el.dish === this.currentDish.id
              )
            }
          })
      }
    },
    // add to favorites new element
    addFavoritesDish () {
      if (this.IS_AUTHORIZATION) {
        if (!this.favoritesToggle) {
          console.log('add favorites dish', this.currentDish)
          this.$store
            .dispatch('addToFavoritesDish', {
              id: this.currentDish.id,
              cookiz: this.$cookies
            })
            .then((res) => {
              if (res && res.data) {
                this.$store.commit(
                  'SET_SUCCESS_NOTIFY',
                  this.$t('favoriteAdded')
                )
                this.favoritesToggle = !this.favoritesToggle
              }
            })
        }
      } else {
        this.loginUserTypes()
      }
    },
    // delete element from favoriteslist
    deleteFavoritesDish () {
      if (this.IS_AUTHORIZATION) {
        if (this.favoritesToggle) {
          this.$store
            .dispatch('deleteFavoritesDish', {
              id: this.currentDish.id,
              cookie: this.$cookies
            })
            .then((res) => {
              console.log('bu delete response', res.data)
              if (res && res.data && res.data.status === 'success') {
                this.$store.commit(
                  'SET_SUCCESS_NOTIFY',
                  this.$t('favoriteDeleted')
                )
                this.$emit('dish-deleted')
                this.favoritesToggle = !this.favoritesToggle
              } else {
                this.$store.commit(
                  'SET_ERROR_NOTIFY',
                  this.$t('popupErrorMessage')
                )
              }
            })
            .catch((err) => {
              console.log(err)
              this.$store.commit(
                'SET_ERROR_NOTIFY',
                this.$t('popupErrorMessage')
              )
            })
        }
      } else {
        this.loginUserTypes()
      }
    },
    togglePromptPopup () {
      this.successPromptIsOpen = !this.successPromptIsOpen
    },
    setPreviewImg (path) {
      this.imgPreview = path
      this.$emit('img-preview', this.imgPreview)
    },
    countInCart () {
      return this.quantity || this.currentDish.count_in_cart
    },
    isPromoDish (dish) {
      return dish.id % 3 === 0
    },
    copyDishLink (dishId) {
      const cateringId = this.$route.params.id || this.currentDish.catering_id
      const categoryId =
        this.$route.params.category ||
        this.currentCategoryId ||
        this.currentDish.category_id
      const href =
        window.location.origin +
        this.localePath({
          path: `/catering/${cateringId}/menu/${categoryId}/${dishId}`
        })
      navigator.clipboard
        .writeText(href)
        .then(() => {
          this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('linkCopied'))
        })
        .catch((err) => {
          console.error('copyDishLink', err)
          this.$store.commit('SET_ERROR_NOTIFY', this.$t('linkCopiedError'))
        })
    },
    async dishMinus (dish) {
      if (this.IS_AUTHORIZATION) {
        const dishesCount = this.countInCart()
        if (dishesCount - 1 <= 0) {
          this.$emit('dish-deleted')
          // this.toggleSuccessDeletePopup()
          this.$store.commit(
            'SET_SUCCESS_NOTIFY',
            this.$t('popupSuccessMessage')
          )
        }
        const cookiz = this.$cookies
        const dishID = dish.id
        await this.$store.dispatch('MINUS_DISH_COUNT', { cookiz, dishID })
        this.$emit('update-dish')
      } else {
        this.loginUserTypes()
      }
    },
    async dishPlus (dish) {
      if (this.IS_AUTHORIZATION) {
        const cookiz = this.$cookies
        const dishID = dish.id
        const data = await this.$store.dispatch('PLUS_DISH_COUNT', {
          cookiz,
          dishID
        })
        if (data) {
          if (data.status === 'error') {
            // Если есть блюда из других ресторанов
            this.isPopupDeleteOldCart = dish
            return
          }
        }
        this.$emit('update-dish')
      } else {
        this.loginUserTypes()
      }
    },
    async addDish (dish) {
      if (this.IS_AUTHORIZATION) {
        const data = await this.$store.dispatch('ADD_ITEM_IN_BASKET', {
          cookiz: this.$cookies,
          dishID: dish.id,
          quantity: 1
        })
        if (data) {
          if (data.status === 'error') {
            // Если есть блюда из других ресторанов
            this.isPopupDeleteOldCart = dish
          }
          if (typeof data === 'string') {
            this.isPopupDeleteOldCart = dish
          }
        }
        this.$emit('update-dish')
      } else {
        this.loginUserTypes()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';
@import '~/assets/styles/modificator';
.preview {
  height: 100%;
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
  display: block;
}
.dishCard__action-downside {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dishCard__action-address {
  display: flex;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 968px) {
    justify-content: space-between;
  }
}
.dishCard__action-favoritesRestaurant {
  font-family: $ff-gilroy-reg;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: $dark;
  margin-right: 5px;
}
.dishCard__action-favoritesAddress {
  font-family: $ff-gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: $dark;
}

.dishCard__action-home {
  flex-shrink: 0;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #a2a2a2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
  svg {
    width: 10px;
    height: 10px;
    fill: #a2a2a2;
  }
  &:hover {
    border: 1px solid $c-icon-hover;
    svg {
      fill: $c-icon-hover;
    }
    box-shadow: rgba(149, 157, 165, 0.5) 0px 0px 15px;
  }
}
.dishCard__action-delete {
  font-family: $ff-gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-decoration-line: underline;
  color: #111111;
  cursor: pointer;
  white-space: nowrap;
  padding-right: 5px;
  @media screen and (max-width: 968px) {
    display: none;
  }
}
.dishCard__action-delete-mobile {
  text-align: center;
  font-family: $ff-gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-decoration-line: underline;
  color: #111111;
  cursor: pointer;
  white-space: nowrap;
  padding-right: 5px;
  padding-top: 20px;
  padding-bottom: 5px;
  @media screen and (min-width: 968px) {
    display: none;
  }
}

.dish-card {
  @media screen and (max-width: 991px) {
    padding: 0 15px;
  }
}
@media screen and (max-width: 991px) {
  .dishCard_wrap.promotion .dishe_item-imagePromotion {
    flex: 0 0 64px;
    width: 64px;
    height: 64px;
  }
  .dishCard_wrap.promotion .dishCard_avatar {
    border: 2px solid $c-error;
    border-radius: 8px;
    border-right-width: 1px;
    background: $c-error;
    height: 42vh;
    height: calc(var(--vh) * 42);
  }
  .promobck {
    color: #fff;
    background-color: $c-error;
    position: absolute;
    bottom: 0;
    padding: 2rem 1rem;
    width: 100%;
  }
}
.dishe_item-imagePromotion {
  position: absolute;
  top: 0;
  right: 1rem;
  margin: 5px;
  flex: 0 0 80px;
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.dish_small_imagePromotion {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  margin-right: 1rem;
  object-fit: cover;
}
.cateringMenuDishes_item-action.share {
  @media screen and (max-width: 991px) {
    border-color: $c-green;
  }
}
.dishCard_wrap.promotion {
  @media screen and (min-width: 992px) {
    border-style: solid;
    border-radius: 6px;
  }
  .cateringMenuDishes_item {
    &-imagePromotion {
      @media screen and (min-width: 992px) {
        display: block;
      }
    }
    &-title {
      span {
        display: inline-block;
      }
    }
    &-price {
      color: $c-promotion;
    }
  }
}
.dishCard_avatar_action-item-like {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  img {
    padding: 7px;
    border-radius: 32px;
    background: white;
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media screen and (max-width: 991px) {
      border: 1px solid #21bc96;
      fill: #21bc96;
    }
  }
}
.dishCard_action-item-like {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  border: 1px solid $green;
  border-radius: 50%;
  svg {
    width: 12px;
    height: 10px;
    fill: $green;
  }
  &.activeFavorites {
    border: 1px solid $orange;
    svg {
      fill: $orange;
    }
  }
  img {
    padding: 7px;
    border: 1px solid $green;
    border-radius: 32px;
    background: white;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.cateringMenuDishes_item-delete {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0;
  width: 30px;
  height: 30px;
  padding: 7px;
  background-color: $orange;
  img {
    filter: brightness(2);
  }
}
.dishCard-btn-add {
  margin-top: 0.5rem;
  @media screen and (max-width: 991px) {
    width: 180px;
  }
  & > div {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  img {
    filter: brightness(10);
    height: 1.55rem;
    margin-right: 1rem;
    object-fit: contain;
  }
}
@media screen and (max-width: 991px) {
  .dishCard_avatar_action-item-share {
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-color: $green;
    background: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    box-shadow: 0px 4px 8px #1ca79012;
    cursor: pointer;
    align-self: start;
    img {
      height: 1.65rem !important;
    }
  }
  .dishCard_wrap {
    display: flex !important;
    flex-direction: column;
  }
  .dishCard_body {
    padding-bottom: 1rem !important;
  }
  .dishCard_avatar_action {
    left: 0.75rem;
    top: 0.75rem !important;
    right: initial !important;
    img {
      height: 3rem;
    }
  }
  .dishCard_ingredient.mobile {
    display: flex;
    width: 90%;
    margin: 0 auto;
    p {
      width: 100%;
    }
    img {
      align-self: start;
      width: 20px;
      height: 20px;
      margin-right: 1rem;
    }
    &.cuisines {
      margin-bottom: 3rem;
    }
  }
  .dishCard_ingredient,
  .dishCard_specials {
    display: none;
  }
  .dishCard_pricing {
    width: 55% !important;
    .dishCard_pricing-container {
      display: flex;
      justify-content: flex-end;
      .dishCard-text {
        font-family: $ff-roboto;
        font-size: $fz-md-high;
        font-weight: 700;
        margin-right: 3rem;
      }
    }
  }
  .dishCard_additionalInfo {
    width: 45% !important;
  }
  .dishCard-price {
    justify-content: end !important;
    margin-bottom: 2rem;
  }
  .dishCard-btn-remove-icon {
    margin-right: 0.5rem;
  }
  .dishCard-btn-price {
    font-size: 14px;
  }
}
.popup {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
}
.dishCard {
  @media screen and (max-width: 991px) {
    position: absolute !important;
    left: 0 !important;
    z-index: 2 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100vw !important;
    height: 100% !important;
    overflow: hidden !important;
    background-color: white !important;
    /deep/ .popup {
      width: 100% !important;
      height: 100% !important;
    }
    &_header {
      display: flex;
      flex-direction: column;
    }
    &-title {
      width: 70%;
      // margin-top: 3rem;
      margin: 0 auto;
      @media screen and (max-width: 575px) {
        width: 90%;
      }
    }
    &_wrap {
      grid-template-rows: none !important;
    }
    &-btn {
      display: flex !important;
      justify-content: flex-end !important;
      grid-area: none !important;
    }
  }
  & /deep/ {
    & .popup {
      padding: 10px;
      overflow: initial;
      @media screen and (min-width: 992px) {
        padding: 0;
      }
      &::before {
        content: unset;
      }
    }
  }
  & *.mobile {
    @media screen and (min-width: 992px) {
      display: none;
    }
  }
  & *.desktop {
    @media screen and (max-width: 991px) {
      display: none;
    }
  }
  &_wrap {
    display: grid;
    grid-template-rows: 3fr 2fr;
    grid-row-gap: 5px;
    overflow: auto;
    @media screen and (max-width: 991px) {
      grid-template-rows: 1fr 2fr;
      -webkit-overflow-scrolling: touch;
    }
    @media screen and (min-width: 992px) {
      grid-template-rows: auto 1fr;
      width: 100%;
    }
  }
  &_header {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-template-rows: 3em 1fr;
    font-size: 16px;
    @media screen and (min-width: 992px) {
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto;
      grid-column-gap: 5px;
      grid-row-gap: 0;
    }
  }
  &-title {
    text-align: center;
    font-family: $ff-roboto;
    font-size: 22px;
    font-weight: bold;
    color: $c-green;
    margin-bottom: 10px;
    @media screen and (min-width: 992px) {
      padding: 12px 20px;
      text-align: left;
      font-size: 16px;
      color: $c-secondary;
      margin-bottom: 0;
    }
  }
  &_action {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 5px;
    align-items: center;
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      border: {
        width: 1px;
        style: solid;
        color: $green;
        radius: 50%;
      }
      padding: 6px;
      width: 30px;
      height: 30px;
      box-shadow: 0px 4px 8px #1ca79012;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &-share {
        border-color: $green;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  &_avatar {
    position: relative;
    max-height: 350px;
    overflow: hidden;
    border-radius: 7px;
    @media screen and (min-width: 992px) {
      align-self: start;
      grid-column: 1/3;
      width: 100%;
      overflow: hidden;
      border-radius: 0;
    }
    @media screen and (max-width: 575px) {
      max-height: 300px;
    }
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 7px;
      @media screen and (min-width: 992px) {
        height: 250px;
        object-fit: cover;
        border-radius: 0px;
      }
    }
    &_action {
      position: absolute;
      top: 0;
      right: 0;
      display: grid;
      grid-template-columns: repeat(2, auto);
      grid-column-gap: 5px;
      align-items: center;
      padding: 10px;
      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        border: {
          width: 1px;
          style: solid;
          color: #ddd;
          radius: 50%;
        }
        padding: 6px;
        width: 30px;
        height: 30px;
        box-shadow: 0px 4px 8px #1ca79012;
        background-color: #fff;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  &_body {
    // display: grid;
    // grid-template-columns: repeat(3, 1fr);
    // grid-template-rows: 2fr repeat(2, 25%);
    // grid-template-areas: 'ingredient ingredient ingredient'
    //                     'addition addition price'
    //                     'counter btn btn';
    // grid-gap: 5px;
    // @media screen and (min-width: 992px) {
    //   grid-template-rows: repeat(2, auto) 1fr;
    //   grid-template-areas: 'ingredient addition price'
    //                       'ingredient . counter'
    //                       'ingredient btn btn';
    //   padding: 20px;
    // }
    display: flex;
    padding: 1.5rem 2rem 4rem 1rem;
    @media screen and (min-width: 992px) {
      padding: 1rem 2rem 1rem 1rem;
    }
  }
  &_ingredient {
    //grid-area: ingredient;
    width: 28%;
    @media screen and (min-width: 992px) {
      display: flex;
      margin-left: 2%;
    }
    &-text {
      font-family: $ff-gilroy;
      font-size: 14px;
      color: $c-secondary;
      overflow-y: auto;
    }
    &-icon {
      width: 24px;
      height: 24px;
      object-fit: cover;
    }
    &_list {
      margin-left: 5px;
    }
    &-item {
      font-family: $ff-gilroy;
      font-size: 14px;
      color: $c-secondary;
      overflow-y: auto;
    }
  }
  &_additionalInfo {
    // grid-area: addition;
    // display: grid;
    // grid-template-columns: repeat(2, 1fr);
    // grid-column-gap: 5px;
    // align-items: center;
    display: block;
    width: 25%;
    @media screen and (min-width: 992px) {
      margin-left: 5%;
      align-self: start;
    }
    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      &.a_b {
        align-items: flex-start;
      }
    }
    &-icon {
      width: 22px;
      height: 22px;
      object-fit: cover;
    }
    &-label {
      margin-left: 5px;
      font-family: $ff-gilroy;
      font-size: 14px;
      color: $c-secondary;
      display: flex;
      align-items: center;
      @media screen and (min-width: 992px) {
        font-size: 14px;
      }
    }
    &-list {
      margin-left: 5px;
      font-family: $ff-gilroy;
      font-size: 14px;
      color: $c-secondary;
    }
  }
  &_specials {
    width: 20%;
  }
  &_pricing {
    width: 27%;
  }
  &-price {
    grid-area: price;
    display: grid;
    align-items: center;
    justify-items: center;
    &-value {
      font-family: $ff-roboto;
      font-size: 20px;
      font-weight: bold;
      cursor: default;
      @media screen and (min-width: 992px) {
        justify-self: end;
        font-size: 22px;
      }
    }
  }
  &_counter {
    grid-area: counter;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (min-width: 992px) {
      margin-top: 1rem;
      margin-bottom: 1rem;
      justify-content: flex-end;
    }
    &-arrow {
      margin-top: 5px;
      margin-left: 3px;
      flex: 0 0 15px;
      width: 15px;
      height: 20px;
      object-fit: contain;
      cursor: pointer;
      &.left {
        margin-left: 0;
        margin-right: 3px;
        transform: rotate(180deg);
      }
    }
    &-count {
      display: flex;
      align-items: center;
      justify-content: center;
      &-img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        background-image: url('/icons/catering/new/dinner-grey.svg');
        background-repeat: no-repeat;
        background-size: cover;
        font-family: $ff-roboto;
        font-weight: bold;
        font-size: 14px;
        color: $c-secondary;
        @media screen and (min-width: 992px) {
          width: 48px;
          height: 48px;
        }
      }
    }
  }
  &-btn {
    grid-area: btn;
    display: grid;
    justify-items: end;
    @media screen and (min-width: 992px) {
      align-items: center;
      border-top: {
        width: 1px;
        style: solid;
        color: $c-line;
      }
      padding: 1rem 0;
    }
    &-price {
      font-family: $ff-roboto;
      font-size: 20px;
      @media screen and (min-width: 992px) {
        font-size: 22px;
      }
      font-weight: bold;
      color: $c-green;
    }
    &-add {
      justify-self: end;
      @extend %btn-colorful;
      display: flex;
      align-items: center;
      justify-content: center;
      // width: 80%;
      height: 2.5em;
      padding: 5px;
      font-size: 14px;
      @media screen and (min-width: 992px) {
        margin-top: 1.5rem;
        width: 100%;
        padding: 5px 1em;
      }
      &-icon {
        margin-right: 5px;
        width: 20px;
        height: 20px;
        object-fit: cover;
      }
    }
  }
}
</style>
