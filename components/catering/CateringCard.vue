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
"successDeleteTitle": "Deleted successfully",

"linkCopied": "Dish link copied",
"linkCopiedError": "An error occurred while trying to share a dish",

"resultLabel": "Result"
},
"ru": {
"timeLabel": "Открыто",
"placeLabel": "мест",
"menuLabel": "Меню",
"restourantLabel": "Ресторан",
"promotionLabel": "Акция!",
"grLabel": "гр",
"popupDeleteMessage": "Вы уверены, что хотите удалить?",
"successDeleteTitle": "Успешно удалено",

"linkCopied": "Ссылка на блюдо скопирована",
"linkCopiedError": "Ошибка при попытке поделиться блюдом",

"resultLabel": "Результаты поиска"
}
}
</i18n>
<template>
  <div v-if="!$_.isNil(CURRENT_CATERING)" class="cateringMenu_wrap">
    <CateringHeader />

    <article class="cateringMenu_body">
      <ul
        v-if="!$_.isNil(CURRENT_CATERING_MENU_DISHES)"
        class="cateringMenuDishes_list"
      >
        <li
          v-for="(dish, i) in mergedMenuDishes"
          :key="i"
          class="cateringMenuDishes_item"
          :class="{ promotion: dish.action === [] }"
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
                class="cateringMenuDishes_item-action like"
                @click="!IS_AUTHORIZATION && loginUserTypes()"
              >
                <img class="" src="/icons/catering/new/heart-grey.svg" alt="">
              </div>
              <div
                class="cateringMenuDishes_item-action share"
                @click="copyCateringLink"
              >
                <img
                  class="desktop"
                  src="/icons/catering/new/share-grey.svg"
                  alt=""
                  @click.stop="copyDishLink(dish.id)"
                >
                <img
                  class="mobile"
                  src="/icons/catering/new/share-green.svg"
                  alt=""
                  @click.stop="copyDishLink(dish.id)"
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
            <h3
              class="cateringMenuDishes_item-title"
              @click="goToCurrentDish({ dishId: dish.id })"
            >
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
                  {{ countInCart(dish.id) }}
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
                <img class="" src="/icons/catering/new/plus-green.svg" alt="">
              </button>
              <button
                v-else
                class="cateringMenuDishes_item-add"
                @click="
                  togglePromptPopup()
                  removeItemId = dish.id
                "
              >
                <img class="" src="/icons/catering/new/minus-grey.svg" alt="">
              </button>
              <p class="cateringMenuDishes_item-price">
                <span class="gilroy-bold">&#8381;</span> {{ dish.price }}
              </p>
            </footer>
          </article>
        </li>
      </ul>
    </article>
    <div v-if="successPromptIsOpen" class="popup">
      <popup-delete
        @close-popup="togglePromptPopup"
        @delete="
          $store.dispatch('DELETE_ITEM_IN_BASKET', {
            cookiz: $cookies,
            dishID: removeItemId
          })
          toggleSuccessDeletePopup()
        "
      >
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>
    <div v-if="successDeletePopupIsOpen" class="popup">
      <popup-success @close-popup="toggleSuccessDeletePopup">
        {{ $t('successDeleteTitle') }}
      </popup-success>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
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
    margin-right: 0.5rem;
    border-radius: 4px;
    overflow: hidden;
  }
  .cateringMenuDishes_item_footer {
    grid-template-columns: 2fr 2fr auto;
  }
  .cateringMenuDishes_item_body {
    width: 100%;
  }
  .cateringMenuDishes_item-price {
    order: 1;
  }
  .cateringMenuDishes_item-add {
    order: 2;
  }
  /deep/ .popupSuccess {
    padding: 3vh 0 0 !important;
    padding: calc(var(--vh) * 3) 0 0 !important;
    height: 50vh;
    height: calc(var(--vh) * 50);
    .logo {
      height: 14em;
    }
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    listState: {
      type: String,
      default: 'categories'
    },
    listStates: {
      type: Object,
      default: null
    },
    currentCategoryId: null,
    currentCategory: null
  },
  data () {
    return {
      removeItemId: null,
      successPromptIsOpen: false,
      successDeletePopupIsOpen: false
    }
  },
  computed: {
    mergedMenuDishes () {
      const vm = this
      return this.CURRENT_CATERING_MENU_DISHES.map((dish, i) => {
        const findedDish = this.CART_ITEMS.find((item, j) => {
          if (dish.id === item.id) {
            return true
          }
        })

        return !vm.$_.isNil(findedDish) ? findedDish : dish
      })
    },
    currentDish () {
      if (this.$_.isNil(this.CURRENT_DISH)) {
        return false
      }

      const vm = this
      const findedDish = this.CART_ITEMS.find((item, j) => {
        if (vm.CURRENT_DISH.dish.id === item.id) {
          return true
        }
      })

      return !vm.$_.isNil(findedDish) ? findedDish : vm.CURRENT_DISH.dish
    },
    ...mapGetters([
      'CURRENT_CATERING',
      'CART_ITEMS',
      'CURRENT_DISH',
      'CURRENT_CATERING_MENU_DISHES'
    ])
  },
  async created () {
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
      .then(({ data }) => {
        vm.currentCategory = data.category_name
      })
  },
  methods: {
    setCurrentCategory (category) {
      this.currentCategory = category
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

    goToCurrentDish ({ dishId }) {
      const cateringId = this.$route.params.id
      const categoryId = this.$route.params.category

      this.$router.push(
        this.localePath({
          path: `/catering/${cateringId}/menu/${categoryId}/${dishId}`
        })
      )
    },
    countInCart (dishID) {
      const q = this.CART_ITEMS.find(item => item.dish_id === dishID)
      return (q && q.quantity) || 0
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

    dishMinus (dishID) {
      if (this.IS_AUTHORIZATION) {
        const cookiz = this.$cookies
        this.$store.dispatch('MINUS_DISH_COUNT', { cookiz, dishID })
      } else {
        this.loginUserTypes()
      }
    },
    dishPlus (dishID) {
      if (this.IS_AUTHORIZATION) {
        const cookiz = this.$cookies
        this.$store.dispatch('PLUS_DISH_COUNT', { cookiz, dishID })
      } else {
        this.loginUserTypes()
      }
    },
    copyDishLink (dishId) {
      console.warn('CateringCard currentDish', this.currentDish, dishId)
      const cateringId = this.$route.params.id
      const categoryId = this.currentCategoryId

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
    },

    togglePromptPopup (paymentId) {
      this.successPromptIsOpen = !this.successPromptIsOpen
    },
    toggleSuccessDeletePopup () {
      this.successDeletePopupIsOpen = !this.successDeletePopupIsOpen
    }
  }
}
</script>
