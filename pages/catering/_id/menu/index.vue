<i18n>
{
  "en": {
    "promotionLabel": "Sale!",

    "linkCopied": "Dish link copied",
    "linkCopiedError": "An error occurred while trying to share a dish",

    "grLabel": "gr"
  },
  "ru": {
    "promotionLabel": "Акция!",

    "linkCopied": "Ссылка на блюдо скопирована",
    "linkCopiedError": "Ошибка при попытке поделиться блюдом",

    "grLabel": "гр"
  }
}
</i18n>

<template>
  <section class="cateringMenu">
    <div class="cateringMenu-back">
      <addition-back />
    </div>
    <div v-if="!$_.isNil(CURRENT_CATERING)" class="cateringMenu_wrap caterpage">
      <CateringHeader />

      <article class="cateringMenu_body">
        <ul
          v-if="
            !$_.isNil(CURRENT_CATERING_MENU_CATEGORIES) &&
              listState === listStates.categories
          "
          class="cateringMenu_list"
        >
          <li
            v-for="(category, i) in CURRENT_CATERING_MENU_CATEGORIES"
            :key="i"
            class="cateringMenu_list-item"
            @click="
              goToDishes({
                categoryId: category.id,
                categoryName: category.title
              })
            "
          >
            <img
              class="cateringMenu_list-item-img"
              :src="category.img_path"
              alt=""
            >
            <p class="cateringMenu_list-item-title">
              {{ category.title }}
            </p>
          </li>
        </ul>
        <ul
          v-if="!$_.isNil(availibleDishes) && listState === listStates.search"
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
                @click="goToCurrentDish({ dishId: dish.id, dish })"
              >
              <div class="cateringMenuDishes_item_actions">
                <div
                  class="cateringMenuDishes_item-action like"
                  @click="!IS_AUTHORIZATION && loginUserTypes()"
                >
                  <img
                    class=""
                    src="/icons/catering/new/heart-grey.svg"
                    alt=""
                  >
                </div>
                <div
                  class="cateringMenuDishes_item-action share"
                  @click.stop="copyDishLink(dish.id, dish)"
                >
                  <img
                    class="desktop"
                    src="/icons/catering/new/share-grey.svg"
                    alt=""
                  >
                  <img
                    class="mobile"
                    src="/icons/catering/new/share-green.svg"
                    alt=""
                  >
                </div>
              </div>
              <img
                src="/images/icons/promotion_percent.png"
                alt=""
                class="cateringMenuDishes_item-imagePromotion"
              >
            </header>
            <article class="cateringMenuDishes_item_body">
              <h3 class="cateringMenuDishes_item-title">
                <span>{{ $t('promotionLabel') }}</span> {{ dish.name }}
              </h3>
              <footer class="cateringMenuDishes_item_footer">
                <div class="cateringMenuDishes_item_counter">
                  <img
                    class="cateringMenuDishes_item-arrow left"
                    src="/icons/catering/new/arrow-grey.svg"
                    alt=""
                    @click="dishMinus(dish.id)"
                  >
                  <div class="cateringMenuDishes_item-count">
                    {{ dish.count_in_cart }}
                  </div>
                  <img
                    class="cateringMenuDishes_item-arrow right"
                    src="/icons/catering/new/arrow-grey.svg"
                    alt=""
                    @click="dishPlus(dish.id)"
                  >
                </div>
                <button
                  v-if="!findItemInCart(dish.id)"
                  class="cateringMenuDishes_item-add"
                  @click="
                    $store.dispatch('ADD_ITEM_IN_BASKET', {
                      cookiz: $cookies,
                      dishID: dish.id,
                      quantity: 1
                    })
                  "
                >
                  <img
                    class=""
                    src="/icons/catering/new/plus-green.svg"
                    alt=""
                  >
                </button>
                <button
                  v-else
                  class="cateringMenuDishes_item-add"
                  @click="
                    $store.dispatch('DELETE_ITEM_IN_BASKET', {
                      cookiz: $cookies,
                      dishID: dish.id
                    })
                  "
                >
                  <img
                    class=""
                    src="/icons/catering/new/minus-grey.svg"
                    alt=""
                  >
                </button>
                <p class="cateringMenuDishes_item-price">
                  $ {{ dish.price }}
                </p>
              </footer>
            </article>
          </li>
        </ul>
      </article>
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
      letDeleteFavorite: false,
      currentCategoryId: null,
      currentCategory: null,
      listState: 'categories',
      listStates: {
        categories: 'categories',
        search: 'search'
      },
      searchValue: '',
      isRequest: true
    }
  },
  computed: {
    availibleDishes () {
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
      return this.availibleDishes.map((dish, i) => {
        const findedDish = this.CART_ITEMS.find((item, j) => {
          if (dish.id === item.id) {
            return true
          }
        })

        return !vm.$_.isNil(findedDish) ? findedDish : dish
      })
    },
    ...mapGetters([
      'CURRENT_CATERING',
      'CURRENT_CATERING_MENU_CATEGORIES',
      'CURRENT_CATERING_MENU_DISHES',
      'CART_ITEMS'
    ])
  },

  watch: {
    searchValue (value) {
      if (value.length !== 0) {
        this.setListState(this.listStates.search)
        this.searchDishes()
      } else {
        this.setListState(this.listStates.categories)
      }
    }
  },
  beforeCreate () {
    this.$nextTick(() => this.$nuxt.$loading.start())
  },
  mounted () {
    setTimeout(() => this.$nuxt.$loading.finish(), 500)
  },
  methods: {
    dishMinus (dishID) {
      console.log(dishID)
      if (this.IS_AUTHORIZATION) {
        const cookiz = this.$cookies
        this.$store.dispatch('MINUS_DISH_COUNT', { cookiz, dishID })
      } else {
        this.loginUserTypes()
      }
    },
    dishPlus (dishID) {
      console.log(dishID)
      if (this.IS_AUTHORIZATION) {
        const cookiz = this.$cookies
        this.$store.dispatch('PLUS_DISH_COUNT', { cookiz, dishID })
      } else {
        this.loginUserTypes()
      }
    },

    goToCurrentDish ({ dishId, dish }) {
      const cateringId = this.$route.params.id
      const categoryId = dish.category_id

      this.$router.push(
        this.localePath({
          path: `/catering/${cateringId}/menu/${categoryId}/${dishId}`
        })
      )
    },
    goToBack () {
      if (this.listState !== this.listStates.categories) {
        this.backToCategoryList()
      } else {
        const cateringId = this.$route.params.id
        this.$router.push(this.localePath({ path: `/catering/${cateringId}` }))
      }
    },

    backToCategoryList () {
      this.$store.commit('RESET_CURRENT_CATERING_MENU_DISHES')
      this.setCurrentCategory(null)
      this.setListState(this.listStates.categories)
    },
    goToDishes ({ categoryId, categoryName }) {
      const cateringId = this.$route.params.id

      this.$router.push(
        this.localePath({ path: `/catering/${cateringId}/menu/${categoryId}` })
      )
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

    copyDishLink (dishId, dish) {
      console.warn('menu/index currentDish', dishId, dish)

      const cateringId = this.$route.params.id
      const categoryId = dish.category_id

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
