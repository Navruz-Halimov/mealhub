<i18n>
{
  "en": {
    "addButton": "Add to cart",
    "removeButton": "Remove",
    "timeLabel": "Opened",
    "placeLabel": "places",
    "menuLabel": "Menu",
    "restourantLabel": "Restourant",
    "promotionLabel": "Sale!",
    "grLabel": "gr",
    "minLabel": "min",
    "ccalLabel": "Kcal",
    "resultLabel": "Result",
    "popupDeleteMessage": "Are you sure you want to delete?",
    "deleteOldCart": "Cannot add dishes from different establishments to the basket. Delete dishes from another establishment?",
    "successDeleteTitle": "Deleted successfully"
  },
  "ru": {
    "addButton": "Добавить в заказ",
    "removeButton": "Удалить",
    "timeLabel": "Открыто",
    "placeLabel": "мест",
    "menuLabel": "Меню",
    "restourantLabel": "Ресторан",
    "promotionLabel": "Акция!",
    "grLabel": "гр",
    "minLabel": "мин",
    "ccalLabel": "Ккал",
    "resultLabel": "Результаты поиска",
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "deleteOldCart": "Нельзя добавить в корзину блюда из разных заведений. Удалить блюда из другого заведения?",
    "successDeleteTitle": "Успешно удалено"
  }
}
</i18n>

<template>
  <section v-if="!$_.isNil(CURRENT_CATERING)">
    <form-dish-popups
      v-if="currentDish"
      :current-dish="currentDish"
      :prev-dish="prevDish"
      :next-dish="nextDish"
      :is-menu="true"
      @prev-click="redirectToPrev"
      @next-click="redirectToNext"
      @dish-deleted="deleteDish"
      @update-dish="updateCurrentDish"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'catering',
  middleware: 'auth-home',
  props: {
    currentDish: {
      required: true,
      type: [Object, null]
    },
    prevDish: {
      type: [Number, null],
      default: null
    },
    nextDish: {
      type: [Number, null],
      default: null
    }
  },
  data () {
    return {
      loaded: true,
      successPromptIsOpen: false,
      successDeletePopupIsOpen: false,
      isPopupDeleteOldCart: false,
      searchValue: '',
      listState: 'categories',
      listStates: {
        dishes: 'categories',
        search: 'search'
      },
      previewOpenData: null
    }
  },
  computed: {
    reducePrice () {
      const count = this.countInCart(this.CURRENT_DISH.dish.id)
      if (count > 0) {
        return this.CURRENT_DISH.dish.price * count
      } else {
        return this.CURRENT_DISH.dish.price
      }
    },
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
    ...mapGetters([
      'CURRENT_CATERING',
      'CART_ITEMS',
      'CURRENT_DISH',
      'CURRENT_CATERING_MENU_DISHES'
    ])
  },
  methods: {
    deleteDish () {
      this.$emit('dish-deleted')
    },
    previewImg (value) {
      this.previewOpenData = value || null
    },
    redirectToPrev () {
      this.$emit('redirect-to-prev')
    },
    redirectToNext () {
      this.$emit('redirect-to-next')
    },
    isPromoDish () {
      return this.currentDish.id % 3 === 0
    },
    togglePromptPopup (paymentId) {
      this.successPromptIsOpen = !this.successPromptIsOpen
    },
    toggleSuccessDeletePopup () {
      this.successDeletePopupIsOpen = !this.successDeletePopupIsOpen
    },
    countInCart (dishID) {
      const q = this.CART_ITEMS.find((item) => {
        if (item.dish_id === dishID) {
          return true
        }
      })

      return (q && q.quantity) || 0
    },
    dishMinus (dishID) {
      console.log(dishID)
      if (this.IS_AUTHORIZATION) {
        const cookiz = this.$cookies
        this.$store.dispatch('MINUS_DISH_COUNT', { cookiz, dishID })
      } else {
        this.loginUserTypes()
      }
    },
    dishPlus (dish) {
      console.log(dish)
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
          })
      } else {
        this.loginUserTypes()
      }
    },
    updateCurrentDish () {
      this.$emit('update-dish')
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
                // Если есть блюда из других ресторанов
                this.isPopupDeleteOldCart = dish
              }
              if (typeof data === 'string') {
                this.isPopupDeleteOldCart = dish
              }
            }
          })
      } else {
        this.loginUserTypes()
      }
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
    }
  }
}
</script>

<style>
@media screen and (max-width: 991px) {
  .successfulyDeleted .popupSuccess {
    padding: 5vh 0 0 !important;
    padding: calc(var(--vh) * 5) 0 0 !important;
    height: 50vh;
    height: calc(var(--vh) * 50);
  }
  .successfulyDeleted .popupSuccess .logo {
    height: 14em;
  }
}
</style>
