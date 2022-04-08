<i18n>
{
  "en": {
    "commentsCount": "Comments",
    "readMore": "read more",
    "visitDate": "Date of visiting",
    "defaultTitle": "Default title",
    "reviewedDateLabel": "Reviewed",
    "cantLike": "Cant like again",

    "linkCopied": "Link to review copied",
    "linkCopiedError": "Share reveiw error",

    "addComment": "Add comment to review"
  },
  "ru": {
    "readMore": "Читать дальше",
    "commentsCount": "Комментарии",
    "visitDate": "Дата посещения ресторана",
    "defaultTitle": "Заголовок отзыва",
    "reviewedDateLabel": "Опубликовано",
    "cantLike": "Нельзя голосовать повторно",

    "linkCopied": "Ссылка на отзыв скопирована",
    "linkCopiedError": "Ошибка при попытке поделиться отзывом",

    "addComment": "Оставить комментарий к отзыву"
  }
}
</i18n>

<template>
  <div v-if="review && review.id" class="reviewCard flex">
    <div class="rc_first flex col j_c a_c text-sm">
      <img :src="(review.user && review.user.profile_photo && ( review.user.profile_photo) ) || '/icons/consumables/user.svg'">

      <span class="flex a_c text-center">
        <span class="name text-md">{{ (review.user && review.user.name) || 'Username' }}</span>
        <!--span class="flex a_c j_c user_activity mt-1 text-md">
          <img class="userlikes" src="~static/icons/catering/reviews/icons4_review-icon.svg" alt="">
          {{ (review.user && review.user.reviews_count) || '0' }}
        </span>
        <span class="flex a_c j_c user_activity text-md">
          <img class="userlikes text-md" src="~static/icons/catering/reviews/icons4_like.svg" alt="">
          {{ (review.user && review.user.total_likes) || '0' }}
        </span-->
      </span>

      <div class="reviewCard_share desktop" :class="{ 'btn-disabled': !IS_AUTHORIZATION }">
        <div class="editFields mobile">
          <img
            v-if="review.can_update"
            class="rc_calndaricon"
            src="~static/icons/catering/reviews/icons4_edit-review.svg"
            alt=""
            @click="
              type ?
                $parent.toggleUpdatePopup() :
                $router.push(localePath({path: `/catering/${$router.currentRoute.params.id}/reviews/${review.id}`, query: { 'updateReview':true } }))
            "
          >
          <img v-if="review.can_delete" class="rc_calndaricon" src="~static/icons/catering/reviews/icons4_trush-basket.svg" alt="" @click="togglePromptDeletePopup(review.id)">
        </div>
        <img src="/icons/catering/new/share-green.svg" alt="" @click="copyReviewLink">
      </div>
      <div class="editFields mobile wide text-right cursor-pointer">
        <img
          v-if="review.can_update"
          class="rc_calndaricon"
          src="~static/icons/catering/reviews/icons4_edit-review.svg"
          alt=""
          @click="
            type ?
              $parent.toggleUpdatePopup() :
              $router.push(localePath({path: `/catering/${$router.currentRoute.params.id}/reviews/${review.id}`, query: { 'updateReview':true } }))
          "
        >
        <img v-if="review.can_delete" class="rc_calndaricon" src="~static/icons/catering/reviews/icons4_trush-basket.svg" alt="" @click="togglePromptDeletePopup(review.id)">
      </div>
    </div>
    <div class="rc_second flex col">
      <div class="rc_body flex">
        <div class="rc_prethird" :class="{'wide': !(review.images && review.images[0]) }">
          <div class="flex a_c">
            <p class="flex mr-1">
              <b class="rc_mark">{{ (+review.mark).toFixed(1) }}</b> <addition-stars :rate=" +review.mark " />
            </p>
            <span class="reviewedDateLabel text-md flex a_c">
              <span>{{ $t('reviewedDateLabel') }} </span>
              <img class="rc_calndaricon" src="~static/icons/catering/reviews/icons4-calendar.svg" alt="">
              {{ formatDate(review.created_at) }}
            </span>
          </div>
          <p
            class="rc_title text-lg cursor-pointer"
            :class="{'collapsedTitle': collapsedTitle}"
            @click="collapsedTitle = !collapsedTitle; goToReview()"
          >
            {{ review.title }}
          </p>
          <p class="rc_readMore">
            {{ review.review }} <span
              v-if="!type && (~review.review.indexOf('...'))"
              class="green"
              @click="goToReview"
            >{{ $t('readMore') }}</span>
          </p>
          <p class="wide text-md visitText">
            {{ $t('visitDate') }}: {{ review.last_visit || '01.01.2021' }}
          </p>
          <div class="editFields desktop">
            <img
              v-if="review.can_update"
              class="rc_calndaricon"
              src="~static/icons/catering/reviews/icons4_edit-review.svg"
              alt=""
              @click="
                type ?
                  $parent.toggleUpdatePopup() :
                  $router.push(localePath({path: `/catering/${$router.currentRoute.params.id}/reviews/${review.id}`, query: { 'updateReview':true } }))
              "
            >
            <img v-if="review.can_delete" class="rc_calndaricon" src="~static/icons/catering/reviews/icons4_trush-basket.svg" alt="" @click="togglePromptDeletePopup(review.id)">
          </div>
        </div>
        <div v-if="(type && review.images[0]) ? review.images[0].img_path : review.images[0]" class="rc_gal_image desktop" @click="toggleSliderPopup()">
          <img :src="(type && review.images[0]) ? review.images[0].img_path : review.images[0]">
        </div>
        <div v-if="(type && review.images[1]) ? review.images[1].img_path : review.images[1]" class="rc_gal_image desktop" @click="toggleSliderPopup()">
          <img :src="(type && review.images[1]) ? review.images[1].img_path : review.images[1]">
        </div>

        <div class="mobile wide flex">
          <div v-if="(type && review.images[0] ? review.images[0].img_path : review.images[0])" class="rc_gal_image mobile" @click="toggleSliderPopup()">
            <img :src="(type && review.images[0]) ? review.images[0].img_path : review.images[0]">
          </div>
          <div v-if="(type && review.images[1] ? review.images[1].img_path : review.images[1])" class="rc_gal_image mobile" @click="toggleSliderPopup()">
            <img :src="(type && review.images[1]) ? review.images[1].img_path : review.images[1]">
          </div>
        </div>
      </div>
      <div class="rc_act text-lg flex j_i a_c" :class="{ 'unauthtorized' : !IS_AUTHORIZATION }">
        <span class="rc_likes flex a_c">
          <img v-if="review.has_like === true" class="reviewlike orange" src="~static/icons/catering/reviews/icons4_like_orange.svg" alt="" @click="likeReview(review.id)">
          <img v-else class="reviewlike" src="~static/icons/catering/reviews/icons4_like.svg" alt="" @click="likeReview(review.id)">
          {{ review.likes }}
        </span>
        <span class="rc_comments toll flex a_c cursor-pointer" @click.stop="type ? $parent.isAddComment = true : $router.push(localePath({path: `/catering/${$router.currentRoute.params.id}/reviews/${review.id}`, query: { addComment: true }}) )">{{ $t('commentsCount') }}: <b class="green"> {{ review.comments_count }}</b>
          <img class="commentit mobile" src="~static/icons/catering/comment-green.svg" alt="">
        </span>
        <span class="rc_add green flex a_c" :class="{ 'btn-disabled': !IS_AUTHORIZATION }" @click="type ? $parent.isAddComment = true : $router.push(localePath({path: `/catering/${$router.currentRoute.params.id}/reviews/${review.id}`, query: { addComment: true }}))">
          <img class="commentit desktop mr-1" src="~static/icons/catering/comment-green.svg" alt=""> {{ $t('addComment') }}
        </span>
      </div>
    </div>

    <div v-if="sliderPopupIsOpen" class="reviewSliderPopup">
      <popup-notification :no-padding="true" @close-popup="toggleSliderPopup">
        <splide
          ref="popupReviewSplide"
          class="reviewSliderPopup_slider"
          :slides="review.images"
        >
          <splide-slide v-for="(image, i) in review.images" :key="i">
            <div class="reviewSliderPopup_slider-container">
              <img
                class="reviewSliderPopup_slider-img"
                :src="type && image ? image.img_path : image"
                alt=""
              >
            </div>
          </splide-slide>
        </splide>
      </popup-notification>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: {
      type: Object,
      default: null
    },
    type: {
      type: String, // if alone or in list
      default: ''
    }
  },
  data () {
    return {
      collapsedTitle: false,
      // Slider
      sliderPopupIsOpen: false
    }
  },
  methods: {
    copyReviewLink () {
      if (this.IS_AUTHORIZATION) {
        const cateringId = this.$route.params.id
        const path = window.location.origin + this.localePath({
          path: `/catering/${cateringId}/reviews/${this.review.id}`
        })

        navigator.clipboard.writeText(path).then(() => {
          this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('linkCopied'))
        }).catch((err) => {
          console.error('copyReviewLink', err)
          this.$store.commit('SET_ERROR_NOTIFY', this.$t('linkCopiedError'))
        })
      } else {
        console.log('неавторизирован')
      }
    },
    goToReview () {
      this.$router.push(this.localePath({ path: `/catering/${this.$router.currentRoute.params.id}/reviews/${this.review.id}` }))
    },
    togglePromptDeletePopup (reviewID) {
      this.$parent.currentReviewId = reviewID
      this.$parent.togglePromptDeletePopup()
    },
    toggleSliderPopup () {
      this.sliderPopupIsOpen = !this.sliderPopupIsOpen
    },
    likeReview (reviewID) {
      const vm = this
      const cookiz = vm.$cookies
      this.$store.dispatch('LIKE_REVIEW', { cookiz, id: vm.$router.currentRoute.params.id, reviewID })
        .then(({ data }) => {
          if (data.status) {
            vm.$store.dispatch('GET_CURRENT_CATERING_REVIEW', { cookiz, id: vm.$router.currentRoute.params.id, reviewID })
            vm.$store.dispatch('GET_CURRENT_CATERING_REVIEWS', { cookiz, id: vm.$router.currentRoute.params.id })
          }
        }).catch((res) => {
          vm.$store.commit('SET_ERROR_NOTIFY', vm.$t('cantLike'))
        })
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
    }
  }

}
</script>

<style scoped lang="scss">
  @import '~/assets/styles/abstract/var';
  @import '~/assets/styles/modificator';

  .rc_act.unauthtorized *{
    cursor: pointer;
    pointer-events: none !important;
  }
  .rc_act.unauthtorized b.green{
    pointer-events: initial !important;
  }

  .visitText{
    color: #ccc;
  }

  .reviewCard {
    position:relative;
    display: flex;
    margin-bottom: 1rem;
    font-size: 14px;
  }

  .popup {
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: 1000;
  }

  .rc_calndaricon{
    height: 18px;
  }

  .reviewSliderPopup {
    & /deep/ {
      .popup {
        align-items: stretch;
        justify-content: stretch;
        padding: 0;

        &::before {
          display: none;
        }
      }

      .splide__track, .splide__slide {
        border-radius: 5px;
      }
      .splide__track, .splide__list, .splide__slide {
        width: 100% !important;
        height: 100% !important;
      }
    }

    &_slider {
      width: 100%;

      &-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      &-img {
        width: auto;
        max-width: 100%;
        //height: 100%;
        height: 80vh;
        height: calc(var(--vh) * 80);
        object-fit: cover;
      }
    }
  }

  .rc_first, .rc_body, .rc_act {
      border:1px solid #ddd;
      border-radius: 4px;
      margin: 1px;
      padding: 1rem;
  }
  .rc_body {
    justify-content: space-between;
    min-height: 11rem;
    height:100%;

    @media screen and (min-width: 992px) and (max-width: 1200px) {
      flex-wrap: wrap;
      justify-content: start;
      gap: 7px;
    }
  }
  .rc_act {
      padding: 3px 1rem;
  }
  .rc_prethird{
    position:relative;
    width: 100%;
    margin-right:1.5rem;
    overflow: hidden;

    &.wide{
      width:100%;
    }
    .rc_mark{
        margin-right: .5rem;
        font-family: $ff-roboto;
    }
    .editFields{
      position: absolute;
      top: 0;
      right: 0;
      img{
        cursor:pointer;
      }
    }
  }
  .rc_gal_image,
  .rc_gal_pdf {
    flex: 0 0 11rem;
    height: 5em;
    overflow: hidden;
    margin: auto 0 auto .25rem;

    position:relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    //display:inline-block;
    border-radius: 4px;
    cursor:pointer;
    background: #e7e7e7;
    &:after{
      content:'';
      position:absolute;
      top:0.75rem;
      right:0.75rem;
      width:1.5rem;
      height:1.5rem;
      background:url('~static/icons/catering/reviews/icons4_zoom.svg');
      background-size:contain;
    }
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }

    div {
      font-size: 32px;
      font-weight: 700;
    }

    .rc_prethird{
      position:relative;
    }
    &.mobile{
      margin:1rem 1rem 0 0;
    }
  }

  //.rc_gal_pdf {
  //
  //}

  .rc_first {
    width: 9rem;
    & > img {
      width: 5em;
      height: 5em;
      flex: 0 0 5em;
      border-radius: 50%;
      margin-bottom: 1rem;
      object-fit: cover;
    }
    .userlikes{
      height: 14px;
      margin-right: .5rem;
    }
    .name {
      @media screen and (min-width: 992px) {
        word-break: break-word;
      }
    }
  }

  .rc_likes {
    img {
      cursor: pointer;
        height: 22px;
        margin-right:.5rem;
    }
    .reviewlike{
      height: 19px;
      padding: 3px;
      border: 1px solid #C4C4C4;
      border-radius: 1rem;
      &.orange{
        /*border: 1px solid #22A391;*/
        border: 1px solid #F3BD44;
      }
    }
  }
  .rc_comments {
    margin-left: 3rem;
    .green {
      margin-left:.35rem;
    }
  }
  .rc_add {
    margin-left: 5rem;
  }

  .rc_title{
    font-family: $ff-roboto;
    font-weight:bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media screen and (min-width: 992px) {
      &:hover {
        word-break: break-word;
        white-space: normal;
      }
    }
    @media screen and (max-width: 991px) {
      &.collapsedTitle {
        word-break: break-word;
        white-space: normal;
      }
    }
  }

  .rc_readMore{
    word-break: break-word;
    margin:0 7px 7px 0;
    font-size: 12px;
    overflow-x:hidden;

    .green{
        position: relative;
        top: 1px;
        left: 4px;
    }
  }

  .reviewedDateLabel > .rc_calndaricon{
    margin-right: .5rem;
  }
  .reviewedDateLabel > span{
    display:none;
  }
  @media screen and (min-width: 992px) {
    .rc_second{
      // width: calc(100% - 10rem) !important;
      width: 100%;
    }
  }
  .reviewCard_share{
    .editFields {
      @media screen and (max-width: 400px) {
        right: 6rem !important;
      }
      @media screen and (min-width: 400px) and (max-width: 768px) {
        right: 7rem !important;
      }
    }
  }
  @media screen and (max-width: 991px) {

    .reviewedDateLabel{
      font-size:14px;
    }
    .reviewedDateLabel .rc_calndaricon{
      display:none;
    }
    .reviewedDateLabel > span{
      display:inline-block;
      margin-right:0.5rem;
    }

    .cateringMenu_header_bottom{
      padding: 0 1rem;
    }
    .reviewCard_share{
      width: 3.5em;
      height: 3.5em;
      padding: 8px 8px 8px;
      border-radius: 50%;
      border: 1px solid $c-green;
      margin-left: auto;
      .editFields {
        display:flex;
        position: absolute;
        right: 9rem;
        cursor:pointer;
        img {
          height: 20px !important;
        }
      }
    }
    .reviewCard {
      position:relative;
      flex-direction: column;
      border: 1px solid #ddd;
      border-radius:8px;
      border-radius:8px;

      .rc_first{
        flex-direction: row;
        justify-content: flex-start;
        padding: 1rem 0 0;
        flex: auto;
        width:90%;
        margin: auto;
        border: none;
        border-bottom: 1px solid #888;
        border-radius: 0;

          &>div{
            align-self: flex-start;
          }
          &>img{
            margin-right:1rem;
          }

          .name {
            display: block;
            font-size: 14px;
            margin-bottom: .5rem;

            max-width: 12ch;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;

            @media screen and (min-width: 400px) {
              max-width: 20ch;
              white-space: nowrap;
            }
            @media screen and (min-width: 576px) {
              max-width: 35ch;
            }
          }
          .user_activity{
            width: 3em;
            display: inline-flex;
            justify-content: flex-start;
          }
        }

      .rc_second{
        border: none;

        .rc_body {
          padding: 1rem 5%;
          border: none;
          flex-direction:column;
          border-bottom: 1px solid $c-line;
          border-radius: 0;

          .rc_prethird{
            width:100%;
            .rc_title {
              margin-top:1rem;
            }
            .rc_readMore{
              font-size: 14px;
              .green{
                top: initial;
              }
            }
          }
          .rc_third {
            width:100%;
            margin-left:0;
            color: #ccc;

            &>div.text-sm {
              font-size: 14px;
            }

            .rc_gal{text-align:left;}
          }
        }

        .rc_act {
          padding: .5rem 5% .5rem;
          border: none;
          .rc_add {
            display:none;
          }
          .rc_comments{
            display: flex;
            align-items: center;
            margin-left: auto;
            cursor:pointer;
            .commentit{
              margin-left: 2rem;
              height: 22px;
            }
          }
          .rc_likes{
            .reviewlike{
              height: 22px;
              padding: 5px;
              border: 1px solid #ddd;
            }
          }
        }
      }
    }
  }
</style>
