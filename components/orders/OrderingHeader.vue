<i18n>
  {
    "en": {
        "titleStep" : "Pay an order",
        "titleStepDelivery" : "Delivery options",
        "titleStepPickup" : "Takeaway options",
        "restourantLabel": "Restourant",
        "reviewsLabel": "Reviews",
        "deliveryLabel": "Delivery",
        "reservLabel": "Reserve a table",
        "orderLabel": "My cart",
        "leaveReview": "Add review",
        "menuLabel": "Menu",
        "resultLabel": "Result"
    },
    "ru": {
        "titleStep" : "Оплата заказа",
        "titleStepDelivery" : "Детали доставки",
        "titleStepPickup" : "Выбор условий самовывоза",
        "restourantLabel": "Ресторан",
        "reviewsLabel": "Отзывы",
        "deliveryLabel": "Доставка",
        "reservLabel": "Забронировать стол",
        "orderLabel": "Моя корзина",
        "leaveReview": "Оставить отзыв",
        "menuLabel": "Меню",
        "resultLabel": "Результаты поиска"
    }
  }
</i18n>
<template>
  <header v-if="CURRENT_CATERING" class="cateringMenu_header cartPage">
    <div class="cateringMenu_header_top">
      <h1 class="cateringMenu-name mobile">
        <span v-if="type==='pay'" class="green text-xxl mt-2 roboto">
          {{ $t('titleStep') }}
        </span>
        <span v-else-if="type==='delivery'" class="green text-xxl mt-2 roboto">
          {{ $t('deliveryLabel') }}
        </span>
        <span v-else-if="type==='reserv'" class="green text-xxl mt-2 mb-1 roboto">
          {{ $t('reservLabel') }}
        </span>
        <span v-else class="green text-xxl mt-2">
          {{ $t('orderLabel') }}
        </span>
      </h1>
      <h1 class="cateringMenu-name">
        <nuxt-link :to="localePath({ path: `/catering/${CURRENT_CATERING.id}` })">
          {{ $t('restourantLabel') }} {{ CURRENT_CATERING.name }}
        </nuxt-link>
      </h1>

      <div class="cateringMenu_address">
        <img class="cateringMenu_address-icon" src="/icons/catering/new/point-green.svg" alt="">
        <p class="cateringMenu_address-txt flex a_c">
          <span class="mr-2">{{ `${CURRENT_CATERING.address.city}, ${CURRENT_CATERING.address.street}, ${CURRENT_CATERING.address.building}` }}</span>
          <span class="cateringMenu_action-item  ml-1 ml-2 route" :class="{ 'btn-disabled': !IS_AUTHORIZATION }" @click="routingForCurrentCatering">
            <img
              src="/icons/catering/new/map-burg.svg"
              alt=""
            >
          </span>
        </p>

        <div class="desktop">
          <div class="cateringMenu_rate" @click="$router.push(localePath({ path: `/catering/${CURRENT_CATERING.id}/reviews` }))">
            <p class="cateringMenu_rate-count">
              {{ CURRENT_CATERING.rating }}
            </p>
            <addition-stars :rate="CURRENT_CATERING.rating" />
            <p class="cateringMenu_rate-review">
              {{ $t('reviewsLabel') }}: <span class="green">{{ CURRENT_CATERING.reviewsCount }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="cateringMenu_header_bottom desktop orderingHeaderMenu">
      <div v-if="type==='pay'" class="cateringMenu_crumbs">
        <img class="cateringMenu_crumbs-icon-cart" src="/icons/catering/new/cart-green.svg" alt="">
        <p class="cateringMenu_crumbs-route">
          <span class="cateringMenu_crumbs-route">{{ $t('titleStep') }}</span>
        </p>
      </div>

      <div v-if="type==='delivery'" class="cateringMenu_crumbs">
        <img class="cateringMenu_crumbs-icon-cart" src="/icons/catering/new/cart-green.svg" alt="">
        <p class="cateringMenu_crumbs-route">
          <span class="cateringMenu_crumbs-route">{{ $t('titleStepDelivery') }}</span>
        </p>
      </div>

      <div v-if="type==='pickup'" class="cateringMenu_crumbs">
        <img class="cateringMenu_crumbs-icon-cart" src="/icons/catering/new/cart-green.svg" alt="">
        <p class="cateringMenu_crumbs-route">
          <span class="cateringMenu_crumbs-route">{{ $t('titleStepPickup') }}</span>
        </p>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    searchValue: {
      get () {
        return this.$parent.searchValue
      },
      set (value) {
        if (this.$parent.redirectToReviews) {
          this.$router.push(this.localePath({ path: `/catering/${this.$router.currentRoute.params.id}/reviews/` }))
        }
        this.$parent.searchValue = value
      }
    },
    listState () {
      return this.$parent.listState || ''
    },
    listStates () {
      return this.$parent.listStates || {}
    },
    CURRENT_CATERING () {
      return this.$parent.CURRENT_CATERING || this.$parent.currentCatering
    }
  },
  methods: {
    backTo () {
      this.$parent.goToBack()
    },
    addReview () {
      if (this.$parent.redirectToReviews) {
        this.$router.push({ path: this.localePath({ path: `/catering/${this.$router.currentRoute.params.id}/reviews/` }), query: { addReview: true } })
      } else {
        this.$parent.toggleCreatePopup()
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

  .cartPage .cateringMenu_action-item.route {
    filter: grayscale(1);
  }

  @media screen and (max-width: 991px) {

    .reviewPage{
      .cateringMenu_header_bottom,
      .cateringMenu_header_top
      {
        display:none !important;
      }
    }

    .cateringMenu-title{
      margin-top:.5rem;
    }

    .addReview {
      padding: 1rem .5rem;
      border: 1px solid $c-green;
      border-radius:8px;
      img{
        display:none;
      }
    }

    .cateringMenu_rate{
      display:flex !important;
      justify-content: center;
      margin-top: .75rem;
      &-review {
        display: none;
      }
    }
    .cateringMenu-name{
      font-size: 14px !important;

      span {
        display: block;
      }
    }
    .cateringMenu_header_bottom{
      padding: 0 1rem;
    }

  }

 .roboto {
    font-family: $ff-roboto;
  }

  .addReview {
    display: flex;
    align-items:center;
    justify-content: center;
    font-size: 14px;
    color: $c-green;
    font-weight: bold;
    cursor: pointer;
  }

  .add_review_icon{
    height: 28px;
    margin-right:0.75rem;
  }

  .cateringMenu {
    grid-area: body;
    display: flex;
    border-radius: 0;
    background-color: $c-light;
    height: 100%;
    width: 100%;
    overflow: hidden;

    @media screen and (min-width: 992px) {
      position: relative;
      border-radius: $br-block-desktop;
      // padding: 10px;
      overflow: auto;
    }

    &_wrap {
      display: grid;
      grid-template-rows: auto 1fr;
      grid-row-gap: 20px;
      padding: 10px;
      padding-top: 25px;
      width: 100%;

      @media screen and (max-width: 991px) {
        padding-top: 0;
      }
      @media screen and (min-width: 992px) {
        grid-auto-rows: minmax(min-content, max-content);
        grid-row-gap: 20px;
        padding-top: 10px;
      }
    }

    &-back {
      position: absolute;
      top: 10px;
      left: 10px;

      @media screen and (min-width: 992px) {
        display: none;
      }
    }

    &_header {
      display: grid;
      grid-auto-rows: minmax(min-content, max-content);

      @media screen and (min-width: 992px) {
        grid-auto-rows: minmax(min-content, max-content);
      }

      &_top {
        display: flex;
        flex-direction: column;
        align-items: center;

        @media screen and (min-width: 992px) {
          display: grid;
          grid-template-columns: 1fr repeat(2, auto);
          grid-template-rows: repeat(2, auto);
          grid-template-areas: 'name rate actions' 'address address address';
          justify-items: start;
        }
      }

      &_bottom {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-column-gap: 10px;
        margin-top: 10px;

        @media screen and (min-width: 992px) {
          grid-template-columns: 1fr auto 28%;
          grid-column-gap: 25px;
          margin-top: 10px;
          padding-top: 10px;
          border-top: {
            width: 1px;
            style: solid;
            color: $c-line;
          }
        }
      }
    }

    &_body {
      overflow: auto;
      @media screen and (min-width: 992px) {
        overflow: visible;
      }
    }

    &-title {
      font-family: $ff-roboto;
      font-size: 18px;
      font-weight: bold;
      color: $c-green;
      @media screen and (min-width: 992px) {
        display: none;
      }
    }

    &-name {
      grid-area: name;
      width: 70%;
      font-family: $ff-gilroy;
      font-size: 12px;
      color: $c-secondary;
      text-align: center;

      @media screen and (min-width: 992px) {
        width: 100%;
        font-family: $ff-roboto;
        font-size: 14px;
        font-weight: bold;
        color: $c-secondary;
        text-align: left;
      }
    }

    &_rate {
      grid-area: rate;
      display: none;
      align-items: center;
      width: 100%;
      cursor: pointer;

      @media screen and (min-width: 992px) {
        display: flex;
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

    &_action {
      grid-area: actions;
      display: none;
      grid-template-columns: repeat(3, auto);
      grid-column-gap: 5px;
      align-items: center;

      @media screen and (min-width: 992px) {
        display: grid;
      }

      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        border: {
          width: 1px;
          style: solid;
          color: $c-icon-grey;
          radius: 50%;
        }
        padding: 6px;
        width: 30px;
        height: 30px;
        box-shadow: 0px 4px 8px #1CA79012;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
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

        &.route {
          border-color: $c-icon-burg;
        }
      }
    }

    &_address {
        width: 100%;
      grid-area: address;
      display: none;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      grid-column-gap: 10px;

      @media screen and (min-width: 992px) {
        display: grid;
      }

      &-icon {
        display: flex;
        align-items: center;
        width: 20px;
        height: 20px;
        object-fit: cover;
      }

      &-txt {
        position: relative;
        width: 99%;
        word-wrap: break-word;
        font-family: $ff-gilroy;
        font-size: 14px;
        line-height: 1em;
      }
    }

    &_crumbs {
      display: none;

      @media screen and (min-width: 992px) {
        display: flex;
        align-items: center;
      }

      &-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
        object-fit: cover;

        &-cart{
          padding: 5px;
          width: 32px;
          height: 32px;
          border: 1px solid $c-green;
          border-radius: 999px;
        }

      }

      &-route {
        margin-left: 10px;
        font-family: $ff-roboto;
        font-weight: bold;
        font-size: 16px;

        &.menu {
          cursor: pointer;
        }

        &.result {
          color: $c-green;
        }

        &.category {
          margin-left: 0;
          color: $c-green;
        }
      }
    }

    &_basket.desktop {
      display: none;
      align-items: center;

      @media screen and (min-width: 992px) {
        display: flex;
      }

      &.active {
        cursor: pointer;

        .cateringMenu_basket {
          &-count {
            color: $c-green;
            border-bottom: 1px solid $c-green;
          }
        }
      }

      .cateringMenu_basket {
        &-icon {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 24px;
          height: 24px;
          filter: contrast(0.6);

          object-fit:contain;
          color: #d7d7d7;
        }

        &-count {
          margin-left: 10px;
          font-family: $ff-gilroy;
          font-size: 14px;
          color: #d7d7d7;
          border-bottom: 1px solid $c-line;
        }
      }
    }

    &_basket.mobile {
      display: flex;
      align-items: center;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #11100029;
      border: 2px solid $c-green;
      border-radius: 8px;
      height: 40px;
      cursor: pointer;

      @media screen and (min-width: 992px) {
        display: none;
      }

      .cateringMenu_basket {
        &-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px;
          width: 35px;
          height: 35px;
          filter: contrast(0.6);

          object-fit: contain;
          color: $c-green;
        }

        &-count {
          margin-left: 10px;
          font-family: $ff-roboto;
          font-size: 14px;
          color: $c-green;
          border-bottom: 1px solid $c-green;
        }
      }
    }

    &_list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: minmax(min-content, max-content);
      grid-gap: 10px;
      padding-bottom: 20px;

      @media screen and (min-width: 992px) {
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 20px;
      }

      &-item {
        position: relative;
        width: 100%;
        height: 100px;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;

        @media screen and (min-width: 992px) {
          height: 150px;
        }

        &-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        &-title {
          position: absolute;
          bottom: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 35px;
          background-color: rgba(255, 255, 255, .8);
          font-family: $ff-roboto;
          font-size: 14px;
          color: $c-green;

          @media screen and (min-width: 992px) {
            height: 50px;
            font-family: $ff-gilroy;
            font-size: 14px;
            color: $c-secondary;
          }
        }
      }
    }
  }

  .cateringMenuDishes {
    &_list {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: minmax(min-content, max-content);
      grid-row-gap: 10px;
      padding-bottom: 20px;

      @media screen and (min-width: 992px) {
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 20px;
      }
    }

    &_item {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      min-height: 105px;
      border: {
        width: 1px;
        style: solid;
        color: $c-line;
        radius: 5px;
      }
      overflow: hidden;

      @media screen and (min-width: 992px) {
        flex-direction: column;
        grid-template-columns: 100%;
        grid-template-rows: 60% 40%;
        grid-column-gap: 0;
        height: 246px;
      }

      &.promotion {
        border-width: 2px;
        border-color: $c-promotion;

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

      &_header {
        position: relative;
      }

      &-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
      }

      &_actions {
        position: absolute;
        top: 0;
        left: 0;
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-column-gap: 5px;
        align-items: center;
        margin: 5px;
      }

      &-action {
        display: flex;
        justify-content: center;
        align-items: center;
        border: {
          width: 1px;
          style: solid;
          color: $c-line;
          radius: 50%;
        }
        padding: 5px;
        width: 30px;
        height: 30px;
        background-color: rgba(255, 255, 255, .8);
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media screen and (min-width: 992px) {
          padding: 5px;
          width: 25px;
          height: 25px;
          background-color: rgba(255, 255, 255, 1);
        }
      }

      &-imagePromotion {
        position: absolute;
        top: 0;
        right: 0;
        display: none;
        margin: 5px;
        width: 50px;
        height: 50px;
        object-fit: cover;
      }

      &_body {
        display: flex;
        flex-direction: column;
        align-content: space-between;
        padding: 5px 5px 0;
        background-color: $light;
      }

      &_footer {
        display: grid;
        grid-template-columns: 5fr 1fr auto;
        grid-column-gap: 5px;
        align-items: center;
      }

      &-title {
        position: relative;
        font-family: $ff-gilroy;
        font-size: 13px;
        font-weight: 300;
        color: $c-secondary;
        word-wrap: break-word;
        min-height: 3em;
        line-height: 1.5em;

        @media screen and (max-width: 991px) {
          margin: 0;
          -webkit-line-clamp: 3;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        span {
          display: none;
          font-family: $ff-roboto;
          color: $c-promotion;
        }
      }

      &_counter {
        display: flex;
        align-items: center;
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
        width: 40px;
        height: 40px;
        background-image: url('/icons/catering/new/dinner-grey.svg');
        background-repeat: no-repeat;
        background-size: cover;
        font-family: $ff-roboto;
        font-weight: bold;
        font-size: 12px;
        color: $c-secondary;
      }

      &-add {
        display: flex;
        justify-content: center;
        align-items: center;
        border: {
          radius: 50%;
        }
        padding: 0;
        width: 30px;
        height: 30px;
        background-color: $light;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &-price {
        font-family: $ff-roboto;
        font-weight: bold;
        font-size: 14px;
        color: $c-green;
      }
    }
  }

</style>
