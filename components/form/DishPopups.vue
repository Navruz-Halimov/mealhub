<i18n>
{
  "en": {
    "popupDeleteMessage": "Are you sure you want to delete?",
    "successDeleteTitle": "Deleted successfully"
  },
  "ru": {
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "successDeleteTitle": "Успешно удалено"
  }
}
</i18n>

<template>
  <div class="dish-preview">
    <popup-notification
      v-if="canShowDishCard"
      :is-dish-card="true"
      :no-padding="true"
      :border="isPromoDish(currentDish)"
      :prev-dish="prevDish !== null"
      :next-dish="nextDish !== null"
      @prev-click="$emit('prev-click')"
      @next-click="$emit('next-click')"
      @close-popup="closeDishPopup"
      @dish-deleted="$emit('dish-deleted')"
      @update-dish="$emit('update-dish')"
    >
      <form-dish-card
        v-if="currentDish"
        :current-dish="currentDish"
        :is-read-only="isReadOnly"
        :quantity="quantity"
        :favorites-dish="favoritesDish"
        @img-preview="openDishPreview"
        @dish-deleted="$emit('dish-deleted')"
        @update-dish="$emit('update-dish')"
        @open-delete-popup="togglePromptPopup"
      />
    </popup-notification>

    <popup-notification
      v-show="isDishPreview"
      :no-padding="true"
      :is-full-height="true"
      @close-popup="closeDishPreview"
    >
      <img class="preview" :src="isDishPreview">
    </popup-notification>

    <popup-delete
      v-if="successPromptIsOpen"
      @close-popup="togglePromptPopup"
      @delete="deleteDishFromCart"
    >
      {{ $t('popupDeleteMessage') }}
    </popup-delete>
    <popup-success
      v-if="successDeletePopupIsOpen"
      @close-popup="toggleSuccessDeletePopup"
    >
      {{ $t('successDeleteTitle') }}
    </popup-success>
  </div>
</template>

<script>
export default {
  props: {
    favoritesDish: {
      type: [Object, null],
      default: null
    },
    currentDish: {
      type: [Object, null],
      default: null
    },
    prevDish: {
      type: [Number, null],
      default: null
    },
    nextDish: {
      type: [Number, null],
      default: null
    },
    isMenu: {
      type: Boolean,
      default: false
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
      isDishPreview: null,

      successPromptIsOpen: false,
      successDeletePopupIsOpen: false
    }
  },
  computed: {
    canShowDishCard () {
      return (
        this.currentDish &&
        !this.isDishPreview &&
        !this.successPromptIsOpen &&
        !this.successDeletePopupIsOpen
      )
    }
  },
  methods: {
    isPromoDish (dish) {
      return dish.id % 3 === 0
    },
    closeDishPopup () {
      console.log(this.isMenu)
      if (this.isMenu) {
        this.redirectToMenu()
      } else {
        this.clearCurrentDish()
      }
    },
    clearCurrentDish () {
      this.$emit('update:current-dish', null)
    },
    redirectToMenu () {
      const cateringId = this.$route.params.id
      const categoryId = this.$route.params.category
      this.$router.push(
        this.localePath({ path: `/catering/${cateringId}/menu/${categoryId}` })
      )
    },
    openDishPreview (value) {
      this.isDishPreview = value || null
    },
    closeDishPreview () {
      this.isDishPreview = null
    },

    togglePromptPopup () {
      this.successPromptIsOpen = !this.successPromptIsOpen
    },
    toggleSuccessDeletePopup () {
      this.successDeletePopupIsOpen = !this.successDeletePopupIsOpen
    },
    async deleteDishFromCart () {
      const data = { cookiz: this.$cookies, dishID: this.currentDish.id }
      await this.$store.dispatch('DELETE_ITEM_IN_BASKET', data)
      // this.toggleSuccessDeletePopup()
      this.$emit('dish-deleted')
      this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('successDeleteTitle'))
    }
  }
}
</script>

<style lang="scss" scoped>
.dish-preview {
  .preview {
    height: 100%;
    width: 100%;
    border-radius: 6px;
    object-fit: cover;
    display: block;
  }
}
</style>
