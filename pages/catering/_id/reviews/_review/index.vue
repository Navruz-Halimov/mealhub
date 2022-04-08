<i18n>
{
  "en": {
    "popupDeleteMessage": "Are you sure you want to delete?",
    "popupSuccessMessage": "Saved successfully",
    "toLong": "Comment is to long",
    "toShort": "Comment is to short",
    "respondLabel": " comment this review",
    "writeHere": "Write your comment here",
    "successDeleteTitle": "Deleted successfully"
  },
  "ru": {
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "popupSuccessMessage": "Успешно сохранено",
    "toLong": "Комментарий слишком длинный",
    "toShort": "Комментарий слишком короткий",
    "respondLabel": " ответил(а) на этот отзыв",
    "writeHere": "Пишите свой комментарий тут",
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
        <div v-if="!$_.isNil(CURRENT_REVIEW)" class="cateringReviews_list">
          <review-card
            class="cateringReviews_list-item"
            :type="'large'"
            :review="CURRENT_REVIEW"
          />

          <div class="comments">
            <div v-if="isAddComment" class="comment form flex j_sb a_c">
              <p class="com_datetime text-md">
                <img
                  class="com_calndaricon"
                  src="~static/icons/catering/reviews/icons4-calendar.svg"
                  alt=""
                >
                <span>{{ curDate }}</span>
                <br>
                <span>{{ curTime }}</span>
              </p>
              <p class="textareaWrap flex a_c wide">
                <textarea
                  ref="comment_writeHere"
                  v-model="writeHere"
                  class="writeHere"
                  :class="{ error: $v.writeHere.$error }"
                  :placeholder="$t('writeHere')"
                  @input="$v.writeHere.$touch()"
                />
                <span class="textarea_counter">{{
                  writeHere && writeHere.length
                }}</span>
              </p>
              <button
                v-if="loaded"
                class="commentSendButton"
                @click="sendComment()"
              >
                <img src="/icons/catering/btn-send-arrow-green.svg" alt="">
              </button>
              <button v-else class="commentSendButton">
                <img src="/icons/catering/btn-send-arrow-green.svg" alt="">
              </button>
            </div>

            <div
              v-for="(item, i) in CURRENT_REVIEW_COMMENTS.items"
              :key="i"
              class="comment flex "
              :class="{ 'form edit': item.id === commentID }"
            >
              <!-- EDIT FORM -->
              <template v-if="item.id === commentID">
                <p class="com_datetime text-md">
                  <img
                    class="com_calndaricon"
                    src="~static/icons/catering/reviews/icons4-calendar.svg"
                    alt=""
                  >
                  <span>{{ formatDate(item.created_at) }}</span>
                  <br>
                  <span>{{ formatTime(item.created_at) }}</span>
                </p>
                <p class="textareaWrap flex a_c wide">
                  <textarea
                    ref="comment_writeHere_update"
                    v-model="writeHere"
                    class="writeHere"
                    :class="{ error: $v.writeHere.$error }"
                    :placeholder="$t('writeHere')"
                    @input="$v.writeHere.$touch()"
                  />
                  <span class="textarea_counter">{{
                    writeHere && writeHere.length
                  }}</span>
                </p>
                <button
                  v-if="loaded"
                  class="commentSendButton"
                  @click="sendComment()"
                >
                  <img src="/icons/catering/btn-send-arrow-green.svg" alt="">
                </button>
                <button v-else class="commentSendButton">
                  <img src="/icons/catering/btn-send-arrow-green.svg" alt="">
                </button>
              </template>
              <template v-else>
                <p class="com_datetime text-md">
                  <img
                    class="com_calndaricon"
                    src="~static/icons/catering/reviews/icons4-calendar.svg"
                    alt=""
                  >
                  <span>{{ formatDate(item.created_at) }}</span>
                  <br>
                  <span>{{ formatTime(item.created_at) }}</span>
                </p>
                <p class="wide mt-1">
                  <span v-if="item.user.is_top" class="com_name green">{{
                    item.user.name
                  }}</span>
                  <span v-else class="com_name">{{ item.user.name }}</span>
                  <span>{{ $t('respondLabel') }}</span>
                  <br>
                  <span class="com_text">{{ item.comment }}</span>
                </p>
                <div class="editCommentFields">
                  <img
                    v-if="item.can_update"
                    class="rc_calndaricon"
                    src="~static/icons/catering/reviews/icons4_edit-review.svg"
                    alt=""
                    @click="
                      commentID = item.id
                      writeHere = item.comment
                      isAddComment = false
                    "
                  >
                  <img
                    v-if="item.can_delete"
                    class="rc_calndaricon"
                    src="~static/icons/catering/reviews/icons4_trush-basket.svg"
                    alt=""
                    @click="togglePromptDeleteCommentPopup(item.id)"
                  >
                </div>
              </template>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div v-if="deletePromptIsOpen" class="popup">
      <popup-delete
        @close-popup="togglePromptDeletePopup"
        @delete="deleteReview"
      >
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>
    <div v-if="deleteCommentPromptIsOpen" class="popup">
      <popup-delete
        @close-popup="togglePromptDeleteCommentPopup"
        @delete="deleteComment"
      >
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>

    <div
      v-if="
        !$_.isNil(CURRENT_CATERING) &&
          !$_.isNil(CURRENT_REVIEW) &&
          updatePopupIsOpen
      "
      class="popup update"
    >
      <popup-notification
        class="updateReviewPopup"
        @close-popup="toggleUpdatePopup"
      >
        <form-review :review="CURRENT_REVIEW" />
      </popup-notification>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  layout: 'catering',
  middleware: 'auth-home',

  data () {
    return {
      loaded: true,
      commentID: null,
      writeHere: '',

      redirectToReviews: true, // Redirect to list if user try to search
      isAddComment: false,
      deletePromptIsOpen: false,
      deleteCommentPromptIsOpen: false,
      updatePopupIsOpen: false,
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
  validations: {
    writeHere: {
      required,
      maxLength: maxLength(1000)
    }
  },

  computed: {
    curDate () {
      const today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
      const yyyy = today.getFullYear()
      return dd + '.' + mm + '.' + yyyy
    },
    curTime () {
      return new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
      })
    },
    ...mapGetters([
      'CURRENT_CATERING',
      'CURRENT_CATERING_REVIEWS',
      'CURRENT_REVIEW',
      'CURRENT_REVIEW_COMMENTS'
    ])
  },

  watch: {
    searchValue (value) {
      if (value.length !== 0) {
        this.setListState(this.listStates.search)
        this.searchReviews()
      } else {
        this.setListState(this.listStates.reviews)

        const cookiz = this.$cookies
        const id = this.$route.params.id
        this.$store.dispatch('GET_CURRENT_CATERING_REVIEWS', { cookiz, id })
      }
    }
  },
  created () {
    this.getReview()
    /* setTimeout(() => {
      if (!this.IS_AUTHORIZATION) {
        this.$router.push(this.localePath({ path: `/catering/${this.$route.params.id}/reviews/` }))
      }
    }, 500) */
  },
  beforeCreate () {
    this.$nextTick(() => this.$nuxt.$loading.start())
  },
  mounted () {
    const wait = () =>
      requestAnimationFrame(
        +this.CURRENT_REVIEW.id === +this.$route.params.review
          ? this.toggleUpdatePopup
          : wait
      )

    this.$store.commit('SET_CURRENT_REVIEW', {})
    if (this.$route.query && this.$route.query.updateReview) {
      wait()
    }
    if (this.$route.query && this.$route.query.addComment) {
      this.isAddComment = true
    }
    this.getReview()

    setTimeout(() => this.$nuxt.$loading.finish(), 500)
  },
  methods: {
    getReview () {
      const cookiz = this.$cookies
      this.$store.dispatch('GET_CURRENT_CATERING_REVIEW', {
        cookiz,
        id: this.$route.params.id,
        reviewID: this.$route.params.review
      })
    },
    deleteReview () {
      this.togglePromptDeletePopup()
      this.$store
        .dispatch('DELETE_REVIEW', {
          cookiz: this.$cookies,
          id: this.$route.params.id,
          reviewID: this.$route.params.review
        })
        .then(() => {
          this.toggleSuccessDeletePopup()
          this.$router.push(
            this.localePath({
              path: `/catering/${this.$route.params.id}/reviews/`
            })
          )
        })
    },

    sendComment () {
      if (this.IS_AUTHORIZATION) {
        const vm = this
        const cookiz = vm.$cookies
        const form = {
          comment: vm.writeHere
        }

        vm.$v.$touch()

        if (vm.$v.$invalid) {
          console.error('EATME ERROR sendComment', vm.$v.writeHere)
          if (vm.writeHere.length > 3) {
            requestAnimationFrame(() => {
              vm.$store.commit('SET_ERROR_NOTIFY', vm.$t('toLong'))
            })
          } else {
            requestAnimationFrame(() => {
              vm.$store.commit('SET_ERROR_NOTIFY', vm.$t('toShort'))
            })
          }
        } else {
          this.loaded = false
          vm.$store.commit('SET_CURRENT_COMMENT', form)

          let req
          if (vm.commentID) {
            req = [
              'UPDATE_REVIEW_COMMENT',
              {
                cookiz,
                id: vm.$route.params.id,
                reviewID: vm.$route.params.review,
                commentID: vm.commentID
              }
            ]
          } else {
            req = [
              'ADD_REVIEW_COMMENT',
              {
                cookiz,
                id: vm.$route.params.id,
                reviewID: vm.$route.params.review
              }
            ]
          }
          vm.$store
            .dispatch(...req)
            .then((res) => {
              const data = res.data
              if (data && data.status) {
                vm.isAddComment = false
                vm.commentID = null
                vm.writeHere = ''
                vm.toggleSuccessPopup()
                vm.getReview()
                vm.$nextTick(() => {
                  vm.$v.$reset()
                })
                vm.loaded = true
              }
            })
            .catch((err) => {
              console.warn(err)
              vm.$store.commit('SET_ERROR_NOTIFY', err.message || err)
              vm.loaded = true
            })
        }
      } else {
        this.loginUserTypes()
      }
    },
    deleteComment () {
      if (this.IS_AUTHORIZATION) {
        const vm = this
        vm.$store
          .dispatch('DELETE_REVIEW_COMMENT', {
            cookiz: vm.$cookies,
            id: vm.$route.params.id,
            reviewID: vm.$route.params.review,
            commentID: vm.commentID
          })
          .then(() => {
            vm.commentID = null
            vm.writeHere = ''
            vm.toggleSuccessDeletePopup()
            vm.getReview()
          })
      } else {
        this.loginUserTypes()
      }
    },

    // Review removing
    togglePromptDeletePopup () {
      if (this.IS_AUTHORIZATION) {
        this.deletePromptIsOpen = !this.deletePromptIsOpen
      } else {
        this.loginUserTypes()
      }
    },
    toggleSuccessDeletePopup () {
      if (this.IS_AUTHORIZATION) {
        this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('successDeleteTitle'))
      } else {
        this.loginUserTypes()
      }
    },
    toggleSuccessPopup () {
      if (this.IS_AUTHORIZATION) {
        this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('popupSuccessMessage'))
      } else {
        this.loginUserTypes()
      }
    },
    toggleUpdatePopup () {
      if (this.IS_AUTHORIZATION) {
        this.updatePopupIsOpen = !this.updatePopupIsOpen
      } else {
        this.loginUserTypes()
      }
    },

    // Comments
    togglePromptDeleteCommentPopup (commentID) {
      if (this.IS_AUTHORIZATION) {
        this.commentID = commentID || null
        this.deleteCommentPromptIsOpen = !this.deleteCommentPromptIsOpen
      } else {
        this.loginUserTypes()
      }
    },

    goToReview ({ reviewId }) {
      const cateringId = this.$route.params.id

      this.$router.push(
        this.localePath({ path: `/catering/${cateringId}/reviews/${reviewId}` })
      )
    },

    goToBack () {
      const cateringId = this.$route.params.id
      this.$router.push(this.localePath({ path: `/catering/${cateringId}` }))
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
    },
    formatDate (date) {
      if (date) {
        let p = date
        p = p && p.substr(0, 10)
        p = p && p.split('-')
        p = p && p.reverse()
        p = p && p.join('.')
        return p
      }
      return ''
    },
    formatTime (date) {
      if (date) {
        let p = date
        p = p && p.substr(11, 5)
        return p
      }
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/modificator';

.textareaWrap {
  font-size: 12px;
  .textarea_counter {
    position: absolute;
    bottom: 0.5em;
    right: 1.5em;
    font-size: 0.8em;
    background: white;
  }
}
.com_name,
.com_text {
  word-break: break-word;
}

.editCommentFields {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 1.75rem;
  height: 3.75rem;
  margin: 0.5rem 2rem;
  img {
    cursor: pointer;
    width: 1.75rem;
    max-width: 1.75rem;
    margin: 0.27rem 0;
  }
}

.com_calndaricon {
  height: 12px;
  margin-top: 3px;
  margin-right: 0.5rem;
  position: relative;
  top: 2px;
}
.commentSendButton {
  text-align: center;
  margin-left: 1rem;
  margin-right: 1.7rem;
  padding: 0;
  @media screen and (min-width: 992px) {
    margin: 0 1rem;
  }
  img {
    width: 35px;
  }
}
@media screen and (max-width: 991px) {
  .com_datetime {
    padding-right: 1rem !important;
    width: 10rem !important;
  }

  .com_calndaricon {
    display: none;
  }

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

  .comment.form {
    .com_datetime {
      display: none;
    }
    .writeHere {
      padding: 0 1rem !important;
      height: 3.5em !important;
      width: 100% !important;
    }
  }
}
</style>

<style scoped>
.comment {
  position: relative;
  margin-bottom: 3px;
  border-radius: 4px;
  padding: 0.55rem 0;
  font-size: 11px;
  background: #f0f0f0;
}
.comment.form {
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  height: auto;
  min-height: 5.5em;
}
.writeHere {
  padding: 0.5rem;
  width: 100% !important;
  height: 100%;
  font-size: inherit;
  border: none;
}
.writeHere.error {
  border: 1px solid #eb608f;
}
.com_datetime {
  width: 13rem;
  text-align: right;
  padding: 0.5rem 3rem 0.5rem 0;
}

.cateringReviews_body {
  overflow: auto;
}
</style>
