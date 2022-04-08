<i18n>
{
  "en": {

    "restourantLabel": "Restourant",
    "chooseDishes": "Choose dishes",
    "payOrder": "Pay",

    "cancelm1": "If the order is canceled at this stage",
    "cancelm2": "money will not be returned!",
    "selectCancelCause": "If you want to cancel the order, please indicate the reason for the cancellation",

    "goeatType": "Go&Eat",
    "deliveryType": "Delivery",
    "pickupType": "Takeaway",
    "preorderType": "Pre-order",
    "reservetableType": "Booking",

    "dateidMenuLabel": "Time/order number",
    "serviceMenuLabel": "Service",
    "aboutMenuLabel": "Description of the establishment",
    "timeMenuLabel": "Ready time",
    "statusMenuLabel": "Status",
    "actionMenuLabel": "Action",
    "downloadMenuLabel": "Download receipt",

    "tablesNumbers": "Tables №",
    "guestLabel": "Guest",
    "dishCountLabel": "Dish count",
    "priceLabel": "Price",
    "prepaymentLabel": "Prepayment",

    "statusMarkNotPayed": "unpaid",
    "statusMarkPayed": "paid",
    "statusMarkCanceled": "canceled",

    "repeatOrder": "Repeat",
    "cancelOrder": "Cancel",
    "resultLabel": "Result"
  },
  "ru": {
    "restourantLabel": "Ресторан",
    "chooseDishes": "Выбрать блюда",
    "payOrder": "Оплатить",

    "cancelm1": "При отмене заказа на данном этапе",
    "cancelm2": "денежные средства возвращены не будут!",
    "selectCancelCause": "Если Вы хотите отменить заказ, пожалуйста, укажите причину отмены",

    "goeatType": "Go&Eat",
    "deliveryType": "Доставка",
    "pickupType": "Еда на вынос",
    "preorderType": "Предзаказ",
    "reservetableType": "Бронь",

    "dateidMenuLabel": "Время/номер заказа",
    "serviceMenuLabel": "Сервис",
    "aboutMenuLabel": "Описание заведения",
    "timeMenuLabel": "Время готовности",
    "statusMenuLabel": "Статус",
    "actionMenuLabel": "Действие",
    "downloadMenuLabel": "Скачать чек",

    "tablesNumbers": "Столы №",
    "guestLabel": "Гостей",
    "dishCountLabel": "Количество блюд",
    "priceLabel": "Стоимость",
    "prepaymentLabel": "Предоплата",

    "statusMarkNotPayed": "неоплачен",
    "statusMarkPayed": "оплачено",
    "statusMarkCanceled": "отменен",

    "repeatOrder": "Повторить заказ",
    "cancelOrder": "Отменить",
    "resultLabel": "Результаты поиска"
  }
}
</i18n>
<template>
  <div
    v-if="item"
    class="relative orderPageItem"
    :class="{ inhistory: inhistory }"
  >
    <div class="desktop">
      <div
        v-if="item && item.id !== 'tableheader'"
        class="orders_main_list_item waiting"
        :class="{ inhistory: inhistory }"
      >
        <div class="cl cl_date text-center flex col">
          <p>
            <b>{{ orderDate(item) }}</b><br>
            <b>{{ orderTime(item) }}</b>
          </p>
          <p class="roboto underline">
            <nuxt-link
              v-if="inhistory"
              :to="localePath({ path: `/history/` + item.id })"
            >
              {{ orderUID(item.id) }}
            </nuxt-link>
            <nuxt-link v-else :to="localePath({ path: `/orders/` + item.id })">
              {{ orderUID(item.id) }}
            </nuxt-link>
          </p>
        </div>
        <div class="cl cl_service">
          <span v-if="item.order_type === 'go_and_eat'">{{
            $t('goeatType')
          }}</span>
          <span v-if="item.order_type === 'delivery'">{{
            $t('deliveryType')
          }}</span>
          <span v-if="item.order_type === 'pickup'">{{
            $t('pickupType')
          }}</span>
          <span v-if="item.order_type === 'pre_order'">{{
            $t('preorderType')
          }}</span>
          <span v-if="item.order_type === 'reserve_table'">{{
            $t('reservetableType')
          }}</span>
        </div>
        <div class="cl cl_summary flex j_c a_i col">
          <div class="desktop wide text-right">
            <span class="orderstatus text-sm">
              <span
                v-if="item.status === 'payed' || item.status === 'finished'"
                class="payed"
              >{{ $t('statusMarkPayed') }}</span>
              <span v-else-if="item.status === 'canceled'" class="canceled">{{
                $t('statusMarkCanceled')
              }}</span>
              <span v-else>{{ $t('statusMarkNotPayed') }}</span>
            </span>
          </div>
          <p class="wide text-left">
            {{ $t('restourantLabel') }} "{{ item.catering }}"
          </p>
          <p v-if="item.catering_address" class="wide text-left">
            {{ item.catering_address.street }}, д.{{
              item.catering_address.building
            }}, кор.{{ item.catering_address.section }},
            {{ item.catering_address.city }}
          </p>
          <p
            v-if="
              (!isReserve && !isPreorder) ||
                (item.reserve && item.table_is_reserved)
            "
            class="wide text-left"
          >
            <span
              v-if="isReserve || isPreorder"
            >{{ $t('tablesNumbers') }}: {{ tablesRow }};</span>
            <span
              v-if="canShowPeopleAmount"
            >{{ $t('guestLabel') }}: {{ item.person_quantity }};</span>
            <span
              v-if="item.items_count || (isPreorder && item.table_is_reserved)"
            >{{ $t('dishCountLabel') }}:
              {{ item.items_count || '...' }};</span>
            <span
              v-if="item.price || isReserve || isPreorder"
              class="nowrap"
            >{{ $t('priceLabel') }}: &#8381; {{ orderPrice || 0 }};</span>
            <span
              v-if="isPreorder"
              class="nowrap"
            >{{ $t('prepaymentLabel') }}: &#8381; {{ prepayment }};</span>
          </p>
        </div>
        <div v-if="!inhistory" class="cl cl_time flex a_c j_c">
          <p class="green">
            <template
              v-if="
                readyDate(item) &&
                  (!(isReserve || isPreorder) || item.table_is_reserved)
              "
            >
              <!--e io qweqwe qwoqwe poqweqweqwe io qweqwe qwoqwe poqweqweqwe woqieio qweqwe qwoqwe poqweqweqwe woqieio qweqwe qwoqwe poqweqweqwe woqieio qweqwe qwoqwe poqweqweqwe woqiewoqie jwo  -->
              <b>{{ readyDate(item) || orderDate(item) }}</b><br>
              <b>{{ readyTime(item) ? readyTime(item) : '...' }}</b>
            </template>
            <template v-else>
              <b>...</b>
            </template>
          </p>
        </div>
        <div v-if="!inhistory" class="cl cl_status">
          <div class="col3 relative">
            <div class="text-center mt-1">
              <order-timer v-if="orderHasTimer(item)" :item="item" />
              <orders-status class="text-sm" :item="item" />
            </div>
          </div>
        </div>
        <div v-if="inhistory" class="cl cl_download">
          <a
            v-if="orderHasDownload(item)"
            href="/images/billexample.png"
            download
            class="downloadcheckicon cursor-pointer"
          >
            <img src="/icons/download_check1.svg" height="26" width="34">
          </a>
          <span v-else class="downloadcheckicon disabled-check">
            <img src="/icons/download_check2.svg" height="26" width="34">
          </span>
        </div>
        <div class="cl cl_action">
          <!--
            В истории
          -->
          <div v-if="inhistory" class="btn-repeat">
            <button class="eatme-btn-colorful" @click="repeatOrder(item)">
              <span class="desktop icon">
                <img src="/icons/repeat-btn.svg" alt="">
              </span>
            </button>
            <span class="desktop text-lg btn-repeat-text">
              {{ $t('repeatOrder') }}
            </span>
          </div>
          <div v-if="inhistory" class="btn-repeat-full">
            <button class="eatme-btn-colorful" @click="repeatOrder(item)">
              <span class="desktop text-lg btn-repeat-text">
                {{ $t('repeatOrder') }}
              </span>
            </button>
          </div>
          <!--
            Обычно
          -->
          <!--
          <button
            v-else-if="
              orderTimingState(item) === 'pay_an_order' ||
                orderTimingState(item) === 'delivery_pay_an_order' ||
                orderTimingState(item) === 'pickup_pay_an_order' ||
                orderTimingState(item) === 'preorder_wait_payment' ||
                orderTimingState(item) === 'reserve_wait_payment'
            "
            class="eatme-btn-colorful"
            @click="payOrder(item)"
          >
            {{ $t('payOrder') }}
          </button>

          <button
            v-else-if="orderTimingState(item) === 'pending_payment'"
            class="eatme-btn-disabled"
          >
            {{ $t('payOrder') }}
          </button>
          <button
            v-else-if=" orderTimingState(item) === 'choose_dishes' || orderTimingState(item) === 'delivery_choose_dishes' || orderTimingState(item) === 'pickup_choose_dishes' "
            class="eatme-btn-colorful"
            @click="$router.push(localePath({ path: `/catering/${item.catering_id}/menu` }) )"
          >
            {{ $t('chooseDishes') }}
          </button>
          -->
          <button
            v-else
            class="eatme-btn-grey relative"
            @click="cancelOrder(item)"
          >
            <label
              v-if="orderHasCaution(item)"
              class="caution-not-payable"
              @click.stop
            >
              <img height="22" width="22" src="/icons/caution.svg">
              <input
                :id="timeStamp + 'caution' + item.id"
                class="caution-checkbox"
              >
              <span class="caution-message red">
                {{ $t('cancelm1') }}
                {{ $t('cancelm2') }}
                {{ $t('selectCancelCause') }}
              </span>
            </label>

            {{ $t('cancelOrder') }}
          </button>
        </div>
        <div v-if="!inhistory" class="cl cl_download">
          <a
            v-if="orderHasDownload(item)"
            href="/images/billexample.png"
            download
            class="downloadcheckicon cursor-pointer"
          >
            <img src="/icons/download_check1.svg" height="26" width="34">
          </a>
          <span v-else class="downloadcheckicon disabled-check">
            <img src="/icons/download_check2.svg" height="26" width="34">
          </span>
        </div>
      </div>
      <div
        v-else
        class="orders_main_list_item tableheader compensate"
        :class="{ inhistory: inhistory }"
      >
        <div class="cl cl_date text-center flex a_c">
          {{ $t('dateidMenuLabel') }}
          <menu-eatmefilter
            :field="'id'"
            :flagasc="$parent.sortAsc"
            :flagdesc="$parent.sortDesc"
            :asc="sortAsc"
            :desc="sortDesc"
          />
        </div>
        <div class="cl cl_service">
          {{ $t('serviceMenuLabel') }}
          <menu-eatmefilter
            :field="'order_type'"
            :flagasc="$parent.sortAsc"
            :flagdesc="$parent.sortDesc"
            :asc="sortAsc"
            :desc="sortDesc"
          />
        </div>
        <div class="cl cl_summary nowrap">
          {{ $t('aboutMenuLabel') }}
          <menu-eatmefilter
            :field="'catering'"
            :flagasc="$parent.sortAsc"
            :flagdesc="$parent.sortDesc"
            :asc="sortAsc"
            :desc="sortDesc"
          />
        </div>
        <div v-if="!inhistory" class="cl cl_time">
          {{ $t('timeMenuLabel') }}
          <menu-eatmefilter
            :field="'orderDate'"
            :flagasc="$parent.sortAsc"
            :flagdesc="$parent.sortDesc"
            :asc="sortAsc"
            :desc="sortDesc"
          />
        </div>
        <div v-if="!inhistory" class="cl cl_status">
          {{ $t('statusMenuLabel') }}
          <menu-eatmefilter
            :field="'orderTimingState'"
            :flagasc="$parent.sortAsc"
            :flagdesc="$parent.sortDesc"
            :asc="sortAsc"
            :desc="sortDesc"
          />
        </div>
        <div v-if="inhistory" class="cl cl_download">
          {{ $t('downloadMenuLabel') }}
        </div>
        <div class="cl cl_action">
          {{ $t('actionMenuLabel') }}
        </div>
        <div v-if="!inhistory" class="cl cl_download">
          {{ $t('downloadMenuLabel') }}
        </div>
      </div>
    </div>

    <div
      class="orders_main_list_item_mobile mt-1 text-lg cl mobile cursor-pointer"
      @click="
        $router.push(
          localePath({ path: (inhistory ? `/history/` : `/orders/`) + item.id })
        )
      "
    >
      <div class="flex text-left wide j_b a_c">
        <div class="">
          <b class="roboto">
            <span v-if="item.order_type === 'go_and_eat'">{{
              $t('goeatType')
            }}</span>
            <span v-if="item.order_type === 'delivery'">{{
              $t('deliveryType')
            }}</span>
            <span v-if="item.order_type === 'pickup'">{{
              $t('pickupType')
            }}</span>
            <span v-if="item.order_type === 'pre_order'">{{
              $t('preorderType')
            }}</span>
            <span v-if="item.order_type === 'reserve_table'">{{
              $t('reservetableType')
            }}</span>

            <nuxt-link
              :to="
                localePath({
                  path: (inhistory ? `/history/` : `/orders/`) + item.id
                })
              "
            >, {{ orderUID(item.id) }}</nuxt-link>
          </b>
          <p>
            <span>{{ orderDate(item) }}</span>
            <span>{{ orderTime(item) }}</span>
          </p>
          <p class="wide text-left">
            {{ $t('restourantLabel') }} {{ item.catering }}
          </p>
          <p v-if="!inhistory">
            <orders-status class="text-sm" :item="item" />
          </p>
        </div>

        <div v-if="!inhistory" class="flex j_c a_c relative timerbox">
          <div class="text-center mt-1">
            <order-timer v-if="orderHasTimer(item)" :item="item" />
          </div>
        </div>
        <div v-if="inhistory" class="history-arrow flex a_c">
          <img class="" src="~/assets/icons/L_arrow.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inhistory: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object
    },
    itemscount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      timeStamp: 0
    }
  },
  computed: {
    tablesRow () {
      if (!this.item?.reserve?.tables) {
        return ''
      }

      return this.item.reserve.tables.map(item => item.table_number).join(', ')
    },
    orderPrice () {
      return Math.round(this.item.price * 100) / 100
    },
    prepayment () {
      const output =
        Math.round(this.item.price * this.item.min_preorder_percent) / 100
      return output || 0
    },
    canShowPeopleAmount () {
      return (
        this.item.person_quantity &&
        (this.isReserve || this.isPreorder) &&
        this.item.reserve
      )
    },
    isReserve () {
      return this.item.order_type === 'reserve_table'
    },
    isPreorder () {
      return this.item.order_type === 'pre_order'
    }
  },
  created () {
    this.timeStamp = Date.now()
  },
  methods: {
    payOrder (itm) {
      console.warn('payOrder', itm)
      this.setOrder(itm)
      localStorage.setItem('current_catering_order', JSON.stringify(itm))
      this.$router.push(
        this.localePath({ path: `/ordering/${itm.catering_id}/pay` })
      )
    },

    cancelOrder (itm) {
      const hasCaution = this.orderHasCaution(this.item)
      const timing = this.orderTimingState(this.item)
      console.log(hasCaution)

      const cookiz = this.$cookies
      const order = itm
      const vm = this

      if (hasCaution) {
        this.$store.commit('SET_ORDER_CANCEL_WHY_POPUP', {
          order,
          timing,
          success (reason) {
            vm.$store
              .dispatch('CANCEL_ORDER', { cookiz, order, reason })
              .then(() => {
                vm.setOrder(null)
                vm.$store.commit('SET_ORDER_CANCEL_WHY_POPUP', null)
              })
            return true
          },
          decline () {
            vm.$store.commit('SET_ORDER_CANCEL_WHY_POPUP', null)
            return false
          }
        })
      } else {
        this.$parent.iS_ORDER_CANCEL_POPUP = {
          success (reason) {
            vm.$store
              .dispatch('CANCEL_ORDER', { cookiz, order, reason })
              .then(() => {
                vm.setOrder(null)
                vm.$parent.iS_ORDER_CANCEL_POPUP = null
              })
            return true
          },
          decline () {
            vm.$parent.iS_ORDER_CANCEL_POPUP = null
            return false
          }
        }
      }
    },
    sortAsc (type) {
      this.$parent.sortAsc = this.$parent.sortAsc ? null : type
      this.$parent.sortDesc = null
    },
    sortDesc (type) {
      this.$parent.sortDesc = this.$parent.sortDesc ? null : type
      this.$parent.sortAsc = null
    }
  }
}
</script>

<style>
.timerbox {
  width: 40%;
  flex: 0 0 40%;
}

.compensate {
  /*
      Scroll compenator
    */
  /* margin-right: 10px; */
}
.compensate.inhistory {
  /* padding-right: 10px; */
}

.downloadcheckicon {
  width: 36px;
  height: 36px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 8px #c4c4c412;
  border: 2px solid #a09fa1;
  cursor: pointer;
}
.downloadcheckicon.disabled-check {
  border: 2px solid #efefef;
}

.tableheader > .cl {
  font-size: 12px;
  background: #eee;
  padding-top: 1rem !important;
}

.cl {
  margin-left: 3px;
}

.cl_date {
  width: 12rem;
  flex: 0 0 12rem;
}
.cl_service {
  width: 10%;
  flex: 0 0 10%;
  min-width: 10rem;
}
.cl_summary {
  width: 100%;
  text-align: center;
  white-space: normal !important;
}
.cl_time {
  width: 10%;
  flex: 0 0 10%;
  min-width: 10rem;
}
.cl_status {
  width: 12%;
  flex: 0 0 12%;
}
.cl_action {
  width: 16%;
  flex: 0 0 16%;
  min-width: 11rem;
}
.cl_download {
  width: 64px;
  flex: 0 0 64px;
  min-width: 64px;
}

.inhistory .cl_action {
  width: 18%;
  flex: 0 0 18%;
}

.cl_action button {
  width: 100%;
  padding-left: 15px !important;
  padding-right: 15px !important;
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/modificator';

@media screen and (min-width: 992px) {
  .orderPageItem {
    min-width: 770px;

    &.inhistory {
      min-width: 650px;
    }

    .btn-repeat {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @media screen and (min-width: 1750px) {
        display: none;
      }
      &-text {
        margin-top: 7px;
      }

      &-full {
        @media screen and (max-width: 1749px) {
          display: none;
        }
        .btn-repeat-text {
          color: #fff;
        }
      }
    }
  }
}

.caution-not-payable {
  text-align: right;
  position: absolute;
  top: -2.5rem;
  right: 0rem;
  // width: 100%;
}
.caution-message {
  display: none;
  position: absolute;
  top: -11rem;
  right: 0;
  width: 200px;
  padding: 9px;
  box-shadow: 6px 3px 6px #00000029;
  border: 1px solid #f3bd44;
  border-radius: 4px;
  background: white;
  text-align: center;
  font-size: 14px;
  word-wrap: break-word !important;
  white-space: unset !important;
}
.caution-checkbox {
  position: absolute;
  width: 0;
  height: 0;
  top: 0;
  right: 0;
}
.caution-checkbox:focus + .caution-message,
.caution-checkbox:hover + .caution-message {
  display: block !important;
}

.history-arrow {
  cursor: pointer;
  position: absolute;
  height: 100%;
  right: 1rem;
  top: 0;
  img {
    height: 1.25rem;
    width: 1.25rem;
    flex: 0 0 1.25rem;
  }
}

.orderstatus {
  span {
    border-radius: 5px;
    padding: 0 1rem;
    border: 1px solid #e2e2e2;
    background: #eee;
    color: #a2a2a2;
  }
  .payed {
    border: 1px solid $c-green;
    color: $c-green;
    background: white;
  }
  .canceled {
    border: 1px solid $c-error;
    color: $c-error;
    background: white;
  }
}

.title {
  font-family: $ff-roboto;
  font-weight: bold;
  font-size: 16px;
  color: black;
}

.clock_green {
  margin-right: 1rem;
}
.timer_state,
.item_state {
  font-size: 12px;
}
.waiting .timer_state {
  color: $c-error;
}
.item_date {
  position: absolute;
  display: flex;
  align-items: center;
  top: 2rem;
  right: 2rem;
  color: $c-green;
  font-size: 12px;
  font-weight: bold;
}
.col2_icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
  width: 48px;
  height: 48px;
}
.korz {
  position: absolute;
  width: 100%;
  height: 100%;
}

.item_price {
  color: #24a391;
  font-size: 16px;
  font-weight: bold;
}

.item_state {
  font-size: 12px;
}

.orders_main_list_item {
  font-size: 14px;
  display: flex;
  margin-bottom: 3px;
  min-width: 650px;
  &.inhistory {
    min-width: initial;

    @media screen and (min-width: 992px) {
      min-width: 650px;
      margin-right: 0px;
    }
  }
  @media screen and (min-width: 992px) {
    margin-right: 0px;
  }
}
.cl {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $c-line;
  border-radius: 4px;
  padding: 0.5rem 1.25rem;
  text-align: center;
}
.inhistory {
  .cl {
    padding: 1rem 1.25rem;
  }
}

.orders_main_list_item_mobile {
  padding: 1rem 1.25rem;
  border-radius: 6px;
  border-color: $c-line;
  box-shadow: 0px 1px 3px #11100029;
}
.tableheader {
  min-width: initial;
}
.green {
  cursor: auto !important;
}
</style>
