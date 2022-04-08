<i18n>
{
  "en": {
    "popupDeleteMessage": "Are you sure you want to delete?",
    "popupSuccessMessage": "Saved successfully",
    "leaveComment": "Leave comment to be first",
    "noResults": "Nothing to show",
    "loading": "loading",
    "noOrdersForReview": "In order to leave a review, you must make an order",
    "successDeleteTitle": "Deleted successfully"
  },
  "ru": {
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "popupSuccessMessage": "Успешно сохранено",
    "leaveComment": "Оставьте отзыв чтобы быть первым",
    "noResults": "Таких отзывов не найдено",
    "loading": "Идет загрузка",
    "noOrdersForReview": "Для того чтобы оставить отзыв необходимо сделать заказ",
    "successDeleteTitle": "Успешно удалено"
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

      <article class="cateringReviews_body">
        <div
          v-if="!$_.isNil(CURRENT_CATERING_REVIEWS)"
          class="cateringReviews_list"
        >
          <review-card
            v-for="(review, i) in CURRENT_CATERING_REVIEWS"
            :key="'review_card_' + i"
            class="cateringReviews_list-item"
            :review="review"
          />
          <p
            v-if="
              !$_.isNil(CURRENT_CATERING_REVIEWS) &&
                CURRENT_CATERING_REVIEWS.length === 0
            "
            class="wide green text-xl ml-1 text-center"
            @click="toggleCreatePopup()"
          >
            <br>
            <br>
            <br>
            <span v-if="loading === false">{{
              listState === listStates.search
                ? $t('noResults')
                : $t('leaveComment')
            }}</span>
            <span v-else>{{ $t('loading') }}</span>
            <br>
            <br>
            <br>
          </p>
        </div>
      </article>
    </div>
    <div v-if="deletePromptIsOpen && currentReviewId" class="popup">
      <popup-delete
        @close-popup="togglePromptDeletePopup"
        @delete="deleteReview"
      >
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>
    <div v-if="successDeletePopupIsOpen" class="popup">
      <popup-success @close-popup="toggleSuccessDeletePopup">
        {{ $t('successDeleteTitle') }}
      </popup-success>
    </div>

    <template v-if="createPopupIsOpen">
      <popup-notification
        v-if="CURRENT_CATERING && CURRENT_CATERING.can_make_review"
        class="addReviewPopup"
        @close-popup="toggleCreatePopup"
      >
        <form-review />
      </popup-notification>
      <popup-success
        v-else
        class="popup-noOrders"
        @close-popup="toggleCreatePopup"
      >
        {{ $t('noOrdersForReview') }}
      </popup-success>
    </template>

    <div v-if="successPopupIsOpen" class="popup">
      <popup-success @close-popup="toggleSuccessPopup">
        {{ $t('popupSuccessMessage') }}
      </popup-success>
    </div>
  </section>
</template>

<style scoped lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.cateringReviews_body {
  overflow: auto;
}
@media screen and (max-width: 991px) {
  /deep/ .popupSuccess {
    grid-template-rows: 1fr 3fr;
    height: 100vh;
    height: calc(var(--vh) * 100);
    &-message {
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
  }
  .popup-noOrders {
    height: 100vh !important;
  }
  .popup.create {
    position: absolute;

    .popup-noOrders {
      position: fixed;
      /deep/ .popupSuccess-message {
        margin: 15px 0;
      }
    }
  }
  //.addReviewPopup{
  //    position: absolute !important;
  //    left: 0 !important;
  //    display: flex !important;
  //    justify-content: center !important;
  //    align-items: center !important;
  //    width: 100vw !important;
  //    height: 100% !important;
  //    overflow: hidden !important;
  //    background-color: white !important;
  //    @media screen and (min-width: 992px) {
  //      z-index: 999 !important;
  //    }
  //
  //    /deep/ .popup{
  //      padding:0 !important;
  //      width: 100% !important;
  //      height: 100% !important;
  //    }
  //}
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'catering',
  middleware: 'auth-home',
  data () {
    return {
      loading: false,
      deletePromptIsOpen: false,
      createPopupIsOpen: false,
      successPopupIsOpen: false,
      successDeletePopupIsOpen: false,
      currentReviewId: null, // forDeletion
      currentReview: null,
      listState: 'reviews',
      listStates: {
        reviews: 'reviews',
        search: 'searchReviews'
      },
      searchValue: '',
      isRequest: true
    }
  },
  computed: {
    ...mapGetters(['CURRENT_CATERING', 'CURRENT_CATERING_REVIEWS'])
  },
  watch: {
    searchValue (value) {
      if (value.length !== 0) {
        this.setListState(this.listStates.search)
        this.searchReviews()
      } else {
        this.setListState(this.listStates.reviews)
        this.getReviews()
      }
    }
  },
  mounted () {
    if (this.$route.query && this.$route.query.addReview) {
      this.toggleCreatePopup() // rup create popup
    }
    this.getReviews()

    setTimeout(() => this.$nuxt.$loading.finish(), 500)
  },
  beforeCreate () {
    this.$nextTick(() => this.$nuxt.$loading.start())
  },
  methods: {
    deleteReview () {
      this.$store
        .dispatch('DELETE_REVIEW', {
          cookiz: this.$cookies,
          id: this.$route.params.id,
          reviewID: this.currentReviewId
        })
        .then(() => {
          this.togglePromptDeletePopup()
          this.toggleSuccessDeletePopup()
          this.getReviews()
        })
    },
    getReviews () {
      const cookiz = this.$cookies
      const id = this.$route.params.id
      this.loading = true
      this.$store
        .dispatch('GET_CURRENT_CATERING_REVIEWS', { cookiz, id })
        .then(() => {
          this.loading = false
        })
    },

    // Review removing
    togglePromptDeletePopup () {
      this.deletePromptIsOpen = !this.deletePromptIsOpen
      if (!this.deletePromptIsOpen) {
        this.currentReviewId = null
      }
    },
    toggleSuccessDeletePopup () {
      this.successDeletePopupIsOpen = !this.successDeletePopupIsOpen
    },
    toggleSuccessPopup () {
      this.successPopupIsOpen = !this.successPopupIsOpen
    },
    toggleCreatePopup () {
      this.createPopupIsOpen = !this.createPopupIsOpen
    },

    goToReview ({ reviewId }) {
      const cateringId = this.$route.params.id

      this.$router.push(
        this.localePath({ path: `/catering/${cateringId}/reviews/${reviewId}` })
      )
    },

    goToBack () {
      const cateringId = this.$route.params.id
      this.searchValue = ''
      this.$router.push(
        this.localePath({ path: `/catering/${cateringId}/reviews` })
      )
    },

    searchReviews () {
      if (!this.isRequest) {
        return false
      }

      this.isRequest = false
      const vm = this

      setTimeout(() => {
        const cookiz = vm.$cookies
        const id = vm.$route.params.id
        const q = vm.searchValue

        this.$store.dispatch('GET_CURRENT_CATERING_REVIEWS', { cookiz, id, q })
        this.isRequest = true
      }, 1000)
    },
    setCurrentReview (review) {
      this.currentreview = review
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
    }
  }
}
</script>
