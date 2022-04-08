<i18n>
{
  "en": {
    "titleMobile": "My orders",

    "title": "Active",
    "titleHistory": "Completed",
    "titleEnding": "orders",

    "redirectToCurrentCatering": "Back to catering",
    "popupErrorMessage": "Fill the full field",
    "emptycart1": "To place an order, go",
    "emptycart2": "to map",
    "emptycart3": ", select a suitable food outlet and place an order there. For all questions, write to",
    "emptycart4": "Customer Support.",

    "var1": "Changed plans",
    "var2": "I don't have time",
    "var3": "I'll go somewhere else",
    "varYour": "Another reason",

    "mobileMenuLabel1": "Active",
    "mobileMenuLabel2": "Completed",

    "popupCancelMessage": "Are you sure you want to cancel order?",
    "popupSuccessMessage": "Successfully canceled"
  },
  "ru": {
    "titleMobile": "Мои заказы",

    "title": "Активные",
    "titleHistory": "Завершенные",
    "titleEnding": "заказы",

    "redirectToCurrentCatering": "обратно в заведение",
    "popupErrorMessage": "Заполните все поля",
    "emptycart1": "Для того, чтобы сделать заказ, перейдите",
    "emptycart2": "на карту",
    "emptycart3": ", выберите подходящую точку питания и сделайте там заказ. По всем вопросам, пишите в",
    "emptycart4": "Службу поддержки.",

    "var1": "Поменялись планы",
    "var2": "Не успеваю",
    "var3": "Пойду в другое место",
    "varYour": "Ваш вариант",

    "mobileMenuLabel1": "Активные",
    "mobileMenuLabel2": "Завершенные",

    "popupCancelMessage": "Вы уверены, что хотите отменить заказ?",
    "popupSuccessMessage": "Успешно отменено"
  }
}
</i18n>

<template>
  <div class="orders_container">
    <!-- SECTION FOR MOBILE -->
    <section class="orders mobile">
      <div class="orders-back">
        <addition-back
          v-if="order"
          :text="$t('redirectToCurrentCatering')"
          :route="localePath({ path: `/catering/${order.catering_id}` })"
        />
        <addition-back v-else />
      </div>
      <header class="orders_header mt-05">
        <h1 class="orders-title text-xl">
          {{ $t('titleMobile') }}
        </h1>
      </header>

      <div class="flex wide j_c mt-3">
        <div class="flex w-95 mobile_nav">
          <button class="eatme-btn-orange roboto half">
            {{ $t('mobileMenuLabel1') }}
          </button>
          <button
            class="eatme-btn-grey roboto half"
            @click="$router.push(localePath('/history'))"
          >
            {{ $t('mobileMenuLabel2') }}
          </button>
        </div>
      </div>

      <div v-if="CURRENT_ORDERS && CURRENT_ORDERS.length" class="orders_list">
        <div class="orders_main_list">
          <order-page-item
            v-for="(item, i) in sortedTable"
            :key="i"
            :item="item"
          />
        </div>
      </div>
      <div v-else class="orders_empty h-8">
        <div>
          <p class="emptycart_text mt-2 text-left">
            {{ $t('emptycart1') }}
            <router-link class="green underline" :to="localePath('index')">
              {{ $t('emptycart2') }}
            </router-link>
            {{ $t('emptycart3') }}
            <span
              class="green cursor-pointer underline"
              @click="$store.commit('SET_SUPPORT_POPUP', true)"
            >
              {{ $t('emptycart4') }}
            </span>
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION FOR DESKTOP -->
    <section class="orders desktop flex col overflow-auto">
      <header class="orders_header mb-2">
        <h1 class="orders-title mt-1e">
          {{ $t('title') }} {{ $t('titleEnding') }}
          /
          <span
            class="text-ltgray cursor-pointer underline"
            @click="$router.push(localePath('/history'))"
          >
            {{ $t('titleHistory') }} {{ $t('titleEnding') }}
          </span>
        </h1>
      </header>

      <template v-if="CURRENT_ORDERS && CURRENT_ORDERS.length">
        <order-page-item
          :itemscount="CURRENT_ORDERS.length"
          :item="{ id: 'tableheader' }"
        />
        <div class="orders_main_list_container">
          <order-page-item
            v-for="(item, i) in sortedTable"
            :key="i"
            :item="item"
          />
        </div>
      </template>
      <div v-else class="orders_empty h-8">
        <div>
          <router-link class="emptycart_image" :to="localePath('index')">
            <img src="/icons/catering/menu/cart_grey_no_borders.svg" alt="">
          </router-link>
          <p class="emptycart_text">
            {{ $t('emptycart1') }}
            <router-link class="green underline" :to="localePath('index')">
              {{ $t('emptycart2') }}
            </router-link>
            {{ $t('emptycart3') }}
            <span
              class="green cursor-pointer underline"
              @click="$store.commit('SET_SUPPORT_POPUP', true)"
            >
              {{ $t('emptycart4') }}
            </span>
          </p>
        </div>
      </div>
    </section>

    <!-- <div v-if="errorPopupIsOpen" class="popup">
      <popup-error @close-popup="toggleErrorPopup">
        {{ $t('popupErrorMessage') }}
      </popup-error>
    </div>
    <div v-if="successPopupIsOpen" class="popup">
      <popup-success @close-popup="toggleSuccessPopup">
        {{ $t('popupSuccessMessage') }}
      </popup-success>
    </div> -->
    <div v-if="iS_ORDER_CANCEL_POPUP" class="popup">
      <popup-delete
        @close-popup="
          iS_ORDER_CANCEL_POPUP.decline && iS_ORDER_CANCEL_POPUP.decline()
        "
        @delete="
          iS_ORDER_CANCEL_POPUP.success && iS_ORDER_CANCEL_POPUP.success()
        "
      >
        {{ $t('popupCancelMessage') }}
      </popup-delete>
    </div>
    <popup-notification
      v-if="IS_ORDER_CANCEL_WHY_POPUP"
      @close-popup="
        IS_ORDER_CANCEL_WHY_POPUP.decline && IS_ORDER_CANCEL_WHY_POPUP.decline()
      "
    >
      <form-cancel-why :order="IS_ORDER_CANCEL_WHY_POPUP.order" />
    </popup-notification>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'orderssection',
  middleware: 'auth-home',
  data () {
    return {
      sortAscBuff: null,
      sortDescBuff: null,
      vyr: false,
      cancelFormText: '',
      iS_ORDER_CANCEL_POPUP: null,
      list: [],
      carouselIsOpen: false,
      // errorPopupIsOpen: false,
      // successPopupIsOpen: false,
      currentActionDesktop: 'search',
      currentActionMobile: ''
    }
  },
  computed: {
    order () {
      console.log(this.currentOrderMethod())
      return this.currentOrderMethod()
    },
    sortAsc: {
      get () {
        return this.sortAscBuff
      },
      set (s) {
        this.sortAscBuff = s || null
      }
    },
    sortDesc: {
      get () {
        return this.sortDescBuff
      },
      set (s) {
        this.sortDescBuff = s || null
      }
    },

    var1: {
      get () {
        return this.cancelFormText === this.$t('var1')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var1') : ''
      }
    },
    var2: {
      get () {
        return this.cancelFormText === this.$t('var2')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var2') : ''
      }
    },
    var3: {
      get () {
        return this.cancelFormText === this.$t('var3')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var3') : ''
      }
    },
    varYour: {
      get () {
        return this.vyr
      },
      set (s) {
        if (s) {
          this.var1 = false
          this.var2 = false
          this.var3 = false
        }
        this.vyr = s
      }
    },
    sortedTable () {
      const vm = this
      const buff = this.CURRENT_ORDERS.slice()
      const sorters = [this.sortAsc, this.sortDesc]

      if (~sorters.indexOf('id')) {
        buff.sort(function (a, b) {
          return a.id - b.id
        })
      }
      if (~sorters.indexOf('order_type')) {
        buff.sort(function (a, b) {
          return ('' + a.order_type).localeCompare(b.order_type)
        })
      }
      if (~sorters.indexOf('catering')) {
        buff.sort(function (a, b) {
          return ('' + a.catering).localeCompare(b.catering)
        })
      }
      if (~sorters.indexOf('orderDate')) {
        buff.sort(function (a, b) {
          let at = a.order_date || a.first_dish_ready_at || a.order_created
          let bt = b.order_date || b.first_dish_ready_at || b.order_created
          if (at) {
            at = vm.newDate(at)
          } else {
            return 1
          }
          if (bt) {
            bt = vm.newDate(bt)
          } else {
            return -1
          }

          return at - bt
        })
      }
      if (~sorters.indexOf('orderTimingState')) {
        buff.sort(function (a, b) {
          return vm.orderTimingState(a).localeCompare(vm.orderTimingState(b))
        })
      }

      if (this.sortDesc) {
        buff.reverse()
      }

      return buff
    },
    ...mapGetters(['IS_ORDER_CANCEL_WHY_POPUP', 'CURRENT_ORDERS'])
  },
  methods: {
    // toggleErrorPopup () {
    //   this.errorPopupIsOpen = !this.errorPopupIsOpen
    // },
    // toggleSuccessPopup () {
    //   this.successPopupIsOpen = !this.successPopupIsOpen
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.half {
  width: 50% !important;
}

.main_menu {
  height: 100% !important;
  flex: 1 0 100px !important;
}

.menucontainernew {
  grid-area: menu !important;
  display: flex !important;
  flex-direction: column !important;
}

.orders_main_list_container {
  // overflow: scroll;

  @media screen and (min-width: 992px) {
    min-width: 770px;
    // padding-right: 20px;
  }
}

@media screen and (max-width: 991px) {
  .main_body {
    min-height: 100vh;
    min-height: calc(var(--vh) * 100);
    height: auto;
  }
}

.mobile_nav {
  .eatme-btn-orange {
    border-radius: 6px;
    font-family: $ff-roboto;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .eatme-btn-grey {
    border-radius: 6px;
    font-family: $ff-roboto;
    box-shadow: 0px 3px 6px #11100029;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background: white;
    color: #c9c9c9 !important;
  }
}

.emptycart_image::after {
  position: absolute;
  top: 1rem;
  right: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.25rem;
  font-weight: bold;
  content: '+';
  color: $c-green;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  background: white;
  box-shadow: 0px 3px 9px #ececec;
}
.emptycart_image {
  position: relative;
  border: 2px solid $c-line;
  border-radius: 4px;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 1rem;

  img {
    width: 90%;
  }
}
.emptycart_text {
  font-size: 16px;
  padding: 0 10%;
}

.orders {
  &-back {
    position: absolute;
    top: -5px;
    left: -10px;
    & /deep/ {
      .link-back {
        font-size: 14px;

        &-icon {
          flex: 0 0 15px;
          width: 15px;
          height: 10px;
        }
      }
    }
  }
}
</style>

<style>
.orders_page .default_popup .popup {
  overflow: initial !important;
}
</style>
