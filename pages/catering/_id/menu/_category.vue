<i18n>
{
"en": {
"timeLabel": "Opened",
"placeLabel": "places",
"menuLabel": "Menu",
"restourantLabel": "Restourant",
"promotionLabel": "Sale!",
"grLabel": "gr",
"popupDeleteMessage": "Are you sure you want to delete?",
"deleteOldCart": "Cannot add dishes from different establishments to the basket. Delete dishes from another establishment?",
"successDeleteTitle": "Deleted successfully",

"linkCopied": "Dish link copied",
"linkCopiedError": "An error occurred while trying to share a dish",

"resultLabel": "Result",
"favoriteAdded":"Succesfully Added to Favorites Dish!"
},
"ru": {
"timeLabel": "Открыто",
"placeLabel": "мест",
"menuLabel": "Меню",
"restourantLabel": "Ресторан",
"promotionLabel": "Акция!",
"grLabel": "гр",
"popupDeleteMessage": "Вы уверены, что хотите удалить?",
"deleteOldCart": "Нельзя добавить в корзину блюда из разных заведений. Удалить блюда из другого заведения?",
"successDeleteTitle": "Успешно удалено",

"linkCopied": "Ссылка на блюдо скопирована",
"linkCopiedError": "Ошибка при попытке поделиться блюдом",

"resultLabel": "Результаты поиска",
"favoriteAdded":"Успешно добавлено в избранное!"
}
}
</i18n>

<template>
  <section class="cateringMenu">
    <div class="cateringMenu-back">
      <addition-back />
    </div>
    <div v-if="!$_.isNil(CURRENT_CATERING)" class="cateringMenu_wrap caterpage">
      <CateringHeader :type="'menu_category'" />

      <article class="cateringMenu_body">
        <ul
          v-if="
            (!$_.isNil(availableDishes) && listState === listStates.dishes) ||
              listState === listStates.search
          "
          class="cateringMenuDishes_list"
        >
          <li
            v-for="(dish, i) in mergedMenuDishes"
            :key="i"
            class="cateringMenuDishes_item"
            :class="{ promotion: dish.id % 3 === 0 }"
          >
            <header class="cateringMenuDishes_item_header">
              <img
                class="cateringMenuDishes_item-image"
                :src="dish.img_path"
                alt=""
                @click="goToCurrentDish({ dishId: dish.id })"
              >
              <div class="cateringMenuDishes_item_actions">
                <div
                  :class="[
                    'cateringMenuDishes_item-action like',
                    {
                      activeSelected: selectedList.find(el => el === dish.id)
                    }
                  ]"
                  @click="
                    selectedList.find(el => el === dish.id)
                      ? toggleHeartPromptPopup(dish.id)
                      : addFavoritesDish(dish.id)
                  "
                >
                  <svg
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.649902 3.68768C0.649902 5.22257 0.960685 5.41343 2.1758 6.62755L6.08097 10.4768C7.07025 11.0304 7.86866 9.79125 8.42726 9.23266C9.8066 7.98171 11.0981 6.63717 12.2925 5.20858C12.5246 4.74889 12.6344 4.23716 12.6112 3.72272C12.5881 3.20827 12.4328 2.70846 12.1604 2.27145C11.888 1.83445 11.5076 1.47498 11.0559 1.22771C10.6042 0.980445 10.0963 0.85371 9.58142 0.859723C7.94261 0.859723 7.55788 2.00689 6.60457 2.64543C6.22385 2.39062 4.02044 -0.577234 1.58221 1.64616C1.01575 2.17807 0.680942 2.91124 0.649902 3.68768Z"
                    />
                  </svg>
                </div>
                <div
                  class="cateringMenuDishes_item-action share"
                  @click.stop="copyDishLink(dish.id)"
                >
                  <img
                    class="desktop"
                    src="~/static/icons/catering/new/share-green.svg"
                    alt=""
                  >
                  <img
                    class="mobile"
                    src="~/static/icons/catering/new/share-green.svg"
                    alt=""
                  >
                </div>
              </div>
              <img
                src="~/static/images/icons/promotion_percent.png"
                alt=""
                class="cateringMenuDishes_item-imagePromotion"
              >
            </header>
            <article class="cateringMenuDishes_item_body">
              <h3
                class="cateringMenuDishes_item-title"
                @click="goToCurrentDish({ dishId: dish.id })"
              >
                <span>{{ $t('promotionLabel') }}</span> {{ dish.name }},
                {{ dish.weight }} {{ $t('grLabel') }}
              </h3>
              <footer class="cateringMenuDishes_item_footer">
                <div class="cateringMenuDishes_item_counter">
                  <img
                    class="cateringMenuDishes_item-arrow left"
                    src="~/static/icons/catering/new/arrow-grey.svg"
                    alt=""
                    @click="dishMinus(dish.id)"
                  >
                  <div class="cateringMenuDishes_item-count">
                    {{ countInCart(dish.id) }}
                  </div>
                  <img
                    class="cateringMenuDishes_item-arrow right"
                    src="~/static/icons/catering/new/arrow-grey.svg"
                    alt=""
                    @click="dishPlus(dish)"
                  >
                </div>

                <button
                  v-show="findItemInCart(dish.id)"
                  class="cateringMenuDishes_item-delete dishbtn eatme-btn-orange"
                  @click="
                    togglePromptPopup()
                    removeItemId = dish.id
                  "
                >
                  <img
                    class=""
                    src="~/static/icons/catering/icons4_trush-basket-white.svg"
                    alt=""
                  >
                </button>
                <button
                  v-show="!findItemInCart(dish.id)"
                  class="cateringMenuDishes_item-add dishbtn"
                  @click="addDish(dish)"
                >
                  <img
                    class=""
                    src="~/static/icons/catering/new/plus-green.svg"
                    alt=""
                  >
                </button>

                <p class="cateringMenuDishes_item-price mobile nowrap">
                  <span class="gilroy-bold">&#8381;</span> {{ dish.price }}
                </p>

                <p
                  class="cateringMenuDishes_item-price desktop ml-1 mr-1 nowrap"
                >
                  <span class="gilroy-bold">&#8381;</span> {{ dish.price }}
                </p>
              </footer>
            </article>
          </li>
        </ul>
      </article>
    </div>

    <template v-if="currentDish">
      <NuxtChild
        :current-dish="currentDish"
        :prev-dish="prevDish"
        :next-dish="nextDish"
        @redirect-to-prev="redirectToPrev"
        @redirect-to-next="redirectToNext"
        @update-dish="updateDish"
        @dish-deleted="updateDish"
      />
    </template>

    <!-- toggle favoritesDish -->
    <div v-if="successPromptHeartIsOpen" class="popup">
      <popup-delete
        @close-popup="toggleHeartPromptPopup"
        @delete="deleteFavoritesDish"
      >
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>

    <div v-if="successPromptIsOpen" class="popup">
      <popup-delete
        @close-popup="togglePromptPopup"
        @delete="
          $store
            .dispatch('DELETE_ITEM_IN_BASKET', {
              cookiz: $cookies,
              dishID: removeItemId
            })
            .then(() => {
              $store.commit('SET_SUCCESS_NOTIFY', $t('successDeleteTitle'))
            })
        "
      >
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>
    <div v-if="successDeletePopupIsOpen" class="popup successfulyDeleted">
      <popup-success @close-popup="toggleSuccessDeletePopup">
        {{ $t('successDeleteTitle') }}
      </popup-success>
    </div>
    <div v-if="isPopupDeleteOldCart" class="popup">
      <popup-delete
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
      isSortPromo: false,
      isSortAsc: '',
      isSortDesc: '',

      removeItemId: null,

      successPromptIsOpen: false,
      successDeletePopupIsOpen: false,
      isPopupDeleteOldCart: false,
      successPromptHeartIsOpen: false,

      currentCategoryId: null,
      currentCategory: null,
      listState: 'dishes',
      listStates: {
        dishes: 'dishes',
        search: 'search'
      },
      searchValue: '',
      isRequest: true,

      currentDish: null,
      prevDish: null,
      nextDish: null,
      favoritesDish: [],
      deleteDishID: null,
      selectedList: []
    }
  },
  computed: {
    dishId () {
      return this.$route.params.dish
    },
    availableDishes () {
      const currentOrder = this.currentOrderMethod()

      return this.CURRENT_CATERING_MENU_DISHES.filter((dish) => {
        if (
          !(
            (currentOrder &&
              dish &&
              currentOrder.order_type === 'delivery' &&
              !dish.available_for_delivery) ||
            (currentOrder &&
              dish &&
              currentOrder.order_type === 'go_and_eat' &&
              !dish.available_for_go_and_eat) ||
            (currentOrder &&
              dish &&
              currentOrder.order_type === 'pickup' &&
              !dish.available_for_pickup) ||
            (currentOrder &&
              dish &&
              currentOrder.order_type === 'preorder' &&
              !dish.available_for_preorder) ||
            (currentOrder &&
              dish &&
              currentOrder.order_type === 'reserve' &&
              !dish.available_for_reserve)
          )
        ) {
          return dish
        } else {
          return false
        }
      })
    },
    mergedMenuDishes () {
      const vm = this
      let buff = this.availableDishes.map((dish, i) => {
        const findedDish = this.CART_ITEMS.find((item, j) => {
          if (dish.id === item.id) {
            return true
          }
        })

        return !vm.$_.isNil(findedDish) ? findedDish : dish
      })

      if (this.isSortAsc || this.isSortDesc) {
        buff.sort(function (a, b) {
          return a.price - b.price
        })
      }
      if (this.isSortDesc) {
        buff = buff.reverse()
      }

      if (this.isSortPromo) {
        const a1 = []
        const a2 = []
        let dish
        for (const i in buff) {
          dish = buff[i]
          if (dish.id % 3 === 0) {
            a1.push(dish)
          } else {
            a2.push(dish)
          }
        }
        buff = [...a1, ...a2]
      }

      return buff
    },
    ...mapGetters([
      'CURRENT_CATERING',
      'CURRENT_CATERING_MENU_CATEGORIES',
      'CURRENT_CATERING_MENU_DISHES',
      'CART_ITEMS'
    ])
  },
  watch: {
    async searchValue (value) {
      if (value.length !== 0) {
        this.setListState(this.listStates.search)
        this.searchDishes()
      } else {
        this.$store.commit('RESET_CURRENT_CATERING_MENU_DISHES')
        const cookiz = this.$cookies
        const id = this.$route.params.id
        const categoryId = this.$route.params.category
        await this.$store.dispatch(
          'GET_CURRENT_CATERING_MENU_DISHES_IN_CATEGORY',
          { cookiz, cateringId: id, categoryId }
        )
        this.setListState(this.listStates.dishes)
      }
    },
    async dishId () {
      await this.updateCurrentDish()
    }
  },
  async mounted () {
    await this.updateCurrentDish()
    await this.updateMenuDishes()
    if (this.IS_AUTHORIZATION) {
      this.getFavoritesDish()
    }
    console.log('something')
  },
  methods: {
    async getFavoritesDish () {
      if (this.IS_AUTHORIZATION) {
        await this.$store
          .dispatch('fetchFavoritesDish', this.$cookies)
          .then((res) => {
            this.favoritesDish = res.data.data
          })
        const dishID = this.mergedMenuDishes.map(dish => dish.id)
        const favorites = this.favoritesDish.map(favorite => favorite.dish)

        console.log('dishID', dishID)
        console.log('favorites', favorites)
        if (favorites.length >= dishID.length) {
          for (let i = 0; i < favorites.length; i++) {
            if (dishID.includes(favorites[i]) && favorites.length >= 1) {
              this.selectedList.push(favorites[i])
            }
          }
        } else {
          for (let i = 0; i < dishID.length; i++) {
            if (favorites.includes(dishID[i])) {
              this.selectedList.push(dishID[i])
            }
          }
        }
        console.log('selectedList listed', this.selectedList)
      }
    },
    addFavoritesDish (dish) {
      if (this.IS_AUTHORIZATION) {
        this.$store
          .dispatch('addToFavoritesDish', {
            id: dish,
            cookiz: this.$cookies
          })
          .then((res) => {
            if (res && res.data) {
              this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('favoriteAdded'))
              this.selectedList.push(dish)
              console.log('bu add response ', res.data)
            }
          })
      } else {
        this.loginUserTypes()
      }
    },

    deleteFavoritesDish () {
      if (this.IS_AUTHORIZATION) {
        this.$nuxt.$loading.start()
        this.$store
          .dispatch('deleteFavoritesDish', {
            id: this.deleteDishID,
            cookie: this.$cookies
          })
          .then((res) => {
            console.log('bu delete response', res.data)
            if (res && res.data && res.data.status === 'success') {
              this.$store.commit(
                'SET_SUCCESS_NOTIFY',
                this.$t('successDeleteTitle')
              )
              this.selectedList = []
              this.getFavoritesDish()
              this.$nuxt.$loading.finish()
            }
          })
          .catch((err) => {
            this.$nuxt.$loading.finish()
            console.log(err)
          })
      } else {
        this.loginUserTypes()
      }
    },
    redirectToPrev () {
      if (this.prevDish === null) {
        return
      }
      const id = this.$route.params.id
      const category = this.$route.params.category
      this.$router.push(
        this.localePath({
          path: `/catering/${id}/menu/${category}/${this.prevDish}`
        })
      )
    },
    redirectToNext () {
      console.log('next')
      if (this.nextDish === null) {
        return
      }
      const id = this.$route.params.id
      const category = this.$route.params.category
      this.$router.push(
        this.localePath({
          path: `/catering/${id}/menu/${category}/${this.nextDish}`
        })
      )
    },
    findDishIndexInArray (id) {
      return this.availableDishes.findIndex(item => +id === +item.id)
    },
    async updateCurrentDish () {
      if (this.dishId === undefined) {
        this.currentDish = null
        this.prevDish = null
        this.nextDish = null
        return
      }

      const cookiz = this.$cookies
      const categoryId = this.$route.params.category
      const cateringId = this.$route.params.id
      const dishId = this.dishId
      const { data } = await this.$store.dispatch('GET_CURRENT_DISH', {
        cookiz,
        cateringId,
        categoryId,
        dishId
      })

      const index = this.findDishIndexInArray(dishId)

      this.currentDish = data.item
      this.currentDish.category_id = categoryId
      this.currentDish.catering_id = cateringId

      this.prevDish = index > 0 ? this.availableDishes[index - 1].id : null
      this.nextDish =
        index < this.availableDishes.length - 1
          ? this.availableDishes[index + 1].id
          : null
    },
    async updateDish () {
      const index = this.availableDishes.findIndex(
        item => this.availableDishes.id === item.dish_id
      )
      if (index !== -1) {
        await this.updateCurrentDish(this.availableDishes[index], index)
      }
    },
    async updateMenuDishes () {
      const vm = this
      const cookiz = this.$cookies
      const id = this.$route.params.id
      const categoryId = this.$route.params.category

      await this.$store
        .dispatch('GET_CURRENT_CATERING_MENU_DISHES_IN_CATEGORY', {
          cookiz,
          cateringId: id,
          categoryId
        })
        .then((res) => {
          const data = (res && res.data) || {}
          vm.currentCategory = data.category_name
        })
    },
    sortAsc () {
      this.isSortAsc = this.isSortAsc ? '' : 'price'
      this.isSortDesc = ''
    },
    sortDesc () {
      this.isSortAsc = ''
      this.isSortDesc = this.isSortDesc ? '' : 'price'
    },
    togglePromptPopup (paymentId) {
      this.successPromptIsOpen = !this.successPromptIsOpen
    },
    toggleSuccessDeletePopup () {
      this.successDeletePopupIsOpen = !this.successDeletePopupIsOpen
    },
    toggleHeartPromptPopup (id) {
      this.deleteDishID = id
      this.successPromptHeartIsOpen = !this.successPromptHeartIsOpen
    },

    countInCart (dishID) {
      const q = this.CART_ITEMS.find(item => item.dish_id === dishID)
      return (q && q.quantity) || 0
    },

    dishMinus (dishID) {
      if (this.IS_AUTHORIZATION) {
        const cookiz = this.$cookies
        this.$store.dispatch('MINUS_DISH_COUNT', { cookiz, dishID })
      } else {
        this.loginUserTypes()
      }
    },
    dishPlus (dish) {
      if (this.IS_AUTHORIZATION) {
        const cookiz = this.$cookies
        const dishID = dish.id
        this.$store
          .dispatch('PLUS_DISH_COUNT', { cookiz, dishID })
          .then((data) => {
            if (data) {
              if (data.status === 'error') {
                // Если есть блюда из других ресторанов
                this.isPopupDeleteOldCart = dish
              }
            }
            if (typeof data === 'string') {
              this.isPopupDeleteOldCart = dish
            }
          })
      } else {
        this.loginUserTypes()
      }
    },
    addDish (dish) {
      if (this.IS_AUTHORIZATION) {
        this.$store
          .dispatch('ADD_ITEM_IN_BASKET', {
            cookiz: this.$cookies,
            dishID: dish.id,
            quantity: 1
          })
          .then((data) => {
            if (data) {
              if (data.status === 'error') {
                this.isPopupDeleteOldCart = dish
              }
            }
            if (typeof data === 'string') {
              this.isPopupDeleteOldCart = dish
            }
          })
      } else {
        this.loginUserTypes()
      }
    },

    goToCurrentDish ({ dishId }) {
      const cateringId = this.$route.params.id
      const categoryId = this.$route.params.category

      this.$router.push(
        this.localePath({
          path: `/catering/${cateringId}/menu/${categoryId}/${dishId}`
        })
      )
    },
    goToBack () {
      if (this.listState !== this.listStates.dishes) {
        this.backToDishes()
      } else {
        const cateringId = this.$route.params.id
        this.$router.push(
          this.localePath({ path: `/catering/${cateringId}/menu` })
        )
      }
    },
    backToDishes () {
      this.$store.commit('RESET_CURRENT_CATERING_MENU_DISHES')
      this.setListState(this.listStates.dishes)
    },
    backToMenu () {
      const cateringId = this.$route.params.id
      this.$router.push(
        this.localePath({ path: `/catering/${cateringId}/menu` })
      )
    },
    async goToDishes ({ categoryId, categoryName }) {
      const cookiz = this.$cookies
      const cateringId = this.$route.params.id

      await this.$store.dispatch(
        'GET_CURRENT_CATERING_MENU_DISHES_IN_CATEGORY',
        { cookiz, cateringId, categoryId }
      )
      this.setCurrentCategory(categoryName)
      this.setListState(this.listStates.dishes)
      this.currentCategoryId = categoryId
    },
    searchDishes () {
      if (!this.isRequest) {
        return false
      }

      this.isRequest = false
      const vm = this

      setTimeout(() => {
        const cookiz = vm.$cookies
        const cateringId = vm.$route.params.id
        const q = vm.searchValue

        this.$store.dispatch('GET_CURRENT_CATERING_MENU_DISHES_FROM_SEARCH', {
          cookiz,
          cateringId,
          q
        })
        this.isRequest = true
      }, 1000)
    },
    setCurrentCategory (category) {
      this.currentCategory = category
    },
    setListState (state) {
      this.listState = state
    },
    findItemInCart (itemId) {
      const foundItem = this.CART_ITEMS.find((item) => {
        if (item.dish_id === itemId) {
          return true
        }
      })

      if (!this.$_.isNil(foundItem)) {
        return true
      } else {
        return false
      }
    },
    copyDishLink (dishId) {
      console.warn('_category currentDish', this.currentDish, dishId)
      const categoryId = this.$route.params.category
      const cateringId = this.$route.params.id

      const path =
        window.location.origin +
        this.localePath({
          path: `/catering/${cateringId}/menu/${categoryId}/${dishId}`
        })

      navigator.clipboard
        .writeText(path)
        .then(() => {
          this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('linkCopied'))
        })
        .catch((err) => {
          console.error('copyDishLink', err)
          this.$store.commit('SET_ERROR_NOTIFY', this.$t('linkCopiedError'))
        })
    }
  }
}
</script>

<style>
@media screen and (max-width: 991px) {
  .successfulyDeleted .popupSuccess {
    padding: 5vh 0 0 !important;
    padding: calc(var(--vh) * 5) 0 0 !important;
    /* height: 50vh; */
  }
  .successfulyDeleted .popupSuccess .logo {
    height: 14em;
  }
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/modificator';
.like {
  svg {
    fill: $green !important;
  }
  &.activeSelected {
    border: 1px solid $orange !important;
    svg {
      fill: $orange !important;
    }
  }
}
.cateringMenuDishes_item-action.share {
  @media screen and (max-width: 991px) {
    border-color: $c-green;
  }
}

.popup {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
}

@media screen and (max-width: 991px) {
  .cateringMenuDishes_item_header {
    width: 15rem;
    height: 100%;
    margin-right: 0.5rem;
    border-radius: 4px;
    overflow: hidden;
  }
  .cateringMenuDishes_item_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cateringMenuDishes_item_body {
    width: 100%;
    padding-right: 2rem;
  }
  .cateringMenuDishes_item-counter {
    order: initial;
    width: 8rem;
    flex: 0 0 8rem;
  }
  .cateringMenuDishes_item-price {
    font-size: 16px;
  }
}
</style>
