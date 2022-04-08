<i18n>
{
  "en": {
    "reservedTables" : "Reserved tables",
    "reviews" : "Reviews",

    "popupDeleteMessage": "Are you sure you want to delete?",
    "costTitle":"Reservation cost",

    "favoritePlaces":"Preferred tables:",

      "bankLabel":"Credit card",
      "systemLabel":"Payment system",

      "addCard":"Add debet card",
      "cardsDontWork":"Card payments disabled",

      "message1":"Attention!",
      "message2":"After payment",
      "message3":"You will have 5 minutes,",
      "message4":"to cancel the order.",
      "message5":"After this time has elapsed",
      "message6":"the order is considered complete, ",
      "message7":"and cash ",
      "message8":"non-refundable!",
      "yandexDetails":"Payment time from 5 to 60 minutes",

      "prevBtn":"Back",
      "nextBtn":"Choose and pay",

    "waitLabel" : "After selecting the data, wait for the confirmation of the booking from the manager",
    "checkYourFields" : "Check your fields",
    "waitNotify" : "Wait for manager's response"
  },
  "ru": {
    "reservedTables" : "Зарезервированые столики",
    "reviews" : "Отзывы",

    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "costTitle":"Стоимость брони",

    "favoritePlaces":"Предпочтительные столики:",

      "bankLabel":"Банковская карта",
      "systemLabel":"Платежная система",

      "addCard":"Добавить банковскую карту",
      "cardsDontWork":"Оплата картой не доступна",

      "message1":"Внимание!",
      "message2":"После оплаты",
      "message3":"у Вас будет 5 минут,",
      "message4":"чтобы отменить заказ.",
      "message5":"По истечении этого времени",
      "message6":"заказ считаеться исполненным, ",
      "message7":"и денежные средства ",
      "message8":"возврату не подлежат!",
      "yandexDetails":"Время оплаты от 5 до 60 минут",

      "prevBtn":"Назад",
      "nextBtn":"Оплатить",

    "waitLabel" : "После выбора данных дождитесь подтверждения бронирование от менеджера",
    "checkYourFields" : "Проверте введённую информацию",
    "waitNotify" : "Ожидайте подтверждения от менеджера"
  }
}
</i18n>
<template>
  <section v-if="!$_.isNil(currentCatering)" class="orderPay">
    <p class="main_menu-back mobile">
      <addition-back />
    </p>
    <div class="container mt-1e">
      <OrderingHeader v-if="currentCatering.id" type="pay" />

      <div class="body">
        <div class="reservation_form">
          <OrderingDetails v-if="order && !isPreorder" :item="order" />
          <CartSummary
            v-if="order && isPreorder"
            :order-data="order"
            class="mt-2"
          />

          <div class="payment_tabs desktop flex j_c">
            <div class="w-7 flex j_c ">
              <span
                class="paymenuLabel bank half"
                :class="{ inactive: payment_type !== 'card' }"
                @click="payment_type = 'card'"
              >
                <bank-card
                  v-if="payment_type !== 'card'"
                  icon-width="30px"
                  icon-height="30px"
                  bg-color="#A2A2A2"
                />
                <!-- <img
                  v-if="payment_type !== 'card'"
                  src="/icons/card/bank-cards-unactive.svg"
                  alt=""
                > -->
                <!-- <img v-else src="/icons/card/bank-cards-active.svg" alt=""> -->
                <bank-card
                  v-else
                  icon-width="30px"
                  icon-height="30px"
                  bg-color="#24A391"
                />
                {{ $t('bankLabel') }}
              </span>
              <span
                class="paymenuLabel system half"
                :class="{ inactive: payment_type !== 'system' }"
                @click="payment_type = 'system'"
              >
                <payment-icon
                  v-if="payment_type !== 'system'"
                  bg-color="#A2A2A2"
                  icon-width="30px"
                  icon-height="30px"
                />
                <!-- <img
                  v-if="payment_type !== 'system'"
                  src="/icons/card/payment-system-unactive.svg"
                  alt=""
                > -->
                <payment-icon
                  v-else
                  bg-color="#24A391"
                  icon-width="30px"
                  icon-height="30px"
                />
                <!-- <img
                  v-else
                  src="/icons/card/payment-system-active.svg"
                  alt=""
                > -->
                {{ $t('systemLabel') }}
              </span>
            </div>
          </div>

          <div class="payment_details desktop flex j_c">
            <div class="w-7 flex j_c text-lg">
              <div class="half flex j_c">
                <list-payment
                  v-if="payment_type === 'card'"
                  page="order"
                  :selected="SELECTED_CARD"
                  @toggle-prompt-popup="togglePromptPopup"
                  @click="
                    $store.dispatch('SET_ERROR_NOTIFY', $t('cardsDontWork'))
                  "
                />
                <div
                  v-if="payment_type === 'system'"
                  class="systemBlocks"
                  @toggle-prompt-popup="togglePromptPopup"
                >
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-paypal.svg"
                      alt=""
                    >
                  </div>
                  <div
                    class="systemBlock cursor-pointer"
                    :class="{ active: yandexMoney === true }"
                    @click="yandexMoney = !yandexMoney"
                  >
                    <img
                      class="address-icon"
                      src="/icons/card/system-yandex.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-webmoney.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-bitcoin.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-qiwi.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-romb.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-amazon.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-block.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-line.svg"
                      alt=""
                    >
                  </div>
                </div>
              </div>
              <div class="half">
                <div class="wide">
                  <p class="mt-2 text-center roboto">
                    <b>{{ $t('message1') }}</b>
                    <b>{{ $t('message2') }}</b><br>
                    <b>{{ $t('message3') }}</b> <br>
                    <b>{{ $t('message4') }}</b>
                  </p>
                  <p class="mt-2 text-center">
                    {{ $t('message5') }}<br>
                    {{ $t('message6') }}<br>
                    {{ $t('message7') }}
                    {{ $t('message8') }}<br><br>
                    <span v-if="yandexMoney === true" class="payment__small">{{
                      $t('yandexDetails')
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mobile">
            <basic-input-collapse
              :title="$t('bankLabel')"
              :active="payment_type === 'card'"
              @click-handler="payment_type = 'card'"
            >
              <div class="wide flex col a_c">
                <list-payment-mobile
                  page="order"
                  :selected="SELECTED_CARD"
                  @toggle-prompt-popup="togglePromptPopup"
                  @click="
                    $store.dispatch('SET_ERROR_NOTIFY', $t('cardsDontWork'))
                  "
                />

                <div class="mt-1e flex j_c wide">
                  <button
                    class="nextBtn eatme-btn-orange flex a_c j_c"
                    @click="PayAnOrder"
                  >
                    <span> {{ $t('nextBtn') }}</span>
                  </button>
                </div>
                <div class="w-9 mt-1e mb-1">
                  <p class="text-center roboto text-sm">
                    <b>{{ $t('message1') }}</b>
                    <b>{{ $t('message2') }}</b>
                    <b>{{ $t('message3') }}</b>
                    <b>{{ $t('message4') }}</b>
                    <b>{{ $t('message5') }}</b>
                    <b>{{ $t('message6') }}</b>
                    <b>{{ $t('message7') }}</b>
                    <b>{{ $t('message8') }}</b>
                  </p>
                </div>
              </div>
            </basic-input-collapse>

            <basic-input-collapse
              :title="$t('systemLabel')"
              :active="payment_type === 'system'"
              class="mt-1e"
              @click-handler="payment_type = 'system'"
            >
              <div class="wide flex a_c col">
                <div
                  class="systemBlocks"
                  @toggle-prompt-popup="togglePromptPopup"
                >
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-paypal.svg"
                      alt=""
                    >
                  </div>
                  <div
                    class="systemBlock cursor-pointer"
                    :class="{ active: yandexMoney === true }"
                    @click="yandexMoney = !yandexMoney"
                  >
                    <img
                      class="address-icon"
                      src="/icons/card/system-yandex.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-webmoney.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-bitcoin.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-qiwi.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-romb.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-amazon.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-block.svg"
                      alt=""
                    >
                  </div>
                  <div class="systemBlock cursor-pointer">
                    <img
                      class="address-icon"
                      src="/icons/card/system-line.svg"
                      alt=""
                    >
                  </div>
                </div>
                <div class="mt-1e mb-1 flex j_c wide">
                  <button
                    class="nextBtn eatme-btn-orange flex a_c j_c"
                    @click="PayAnOrder"
                  >
                    <span> {{ $t('nextBtn') }}</span>
                  </button>
                </div>
                <div class="w-9 mr-a ml-a mb-1">
                  <p class="text-center roboto text-sm">
                    <b>{{ $t('message1') }}</b>
                    <b>{{ $t('message2') }}</b>
                    <b>{{ $t('message3') }}</b>
                    <b>{{ $t('message4') }}</b>
                    <b>{{ $t('message5') }}</b>
                    <b>{{ $t('message6') }}</b>
                    <b>{{ $t('message7') }}</b>
                    <b>{{ $t('message8') }}</b>
                  </p>
                </div>
              </div>
            </basic-input-collapse>
          </div>

          <br>
          <div class="desktop mt-1 flex j_c">
            <div class="w-7 flex j_c text-lg">
              <div class="half flex j_c">
                <button
                  class="prevBtn eatme-btn-grey flex a_c j_c"
                  @click="$router.go(-1)"
                >
                  <span> {{ $t('prevBtn') }}</span>
                </button>
                <br>
              </div>
              <div class="half flex j_c">
                <br>
                <button
                  v-if="loadingPayment || !yandexMoney"
                  class="nextBtn flex a_c j_c eatme-btn-disabled"
                >
                  <span> {{ $t('nextBtn') }}</span>
                </button>
                <button
                  v-else
                  class="nextBtn flex a_c j_c eatme-btn-red"
                  @click="PayAnOrder"
                >
                  <span> {{ $t('nextBtn') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="successPromptIsOpen" class="popup payments_popup">
      <popup-delete @close-popup="togglePromptPopup" @delete="deletePayment">
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>
  </section>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

// CSS
import 'vue2-timepicker/dist/VueTimepicker.css'
import 'vue2-datepicker/index.css'
import paymentIcon from '../icons/paymentIcon.vue'

export default {
  components: { paymentIcon },
  props: {
    currentCatering: {
      type: Object
    }
  },

  data () {
    return {
      order: null,
      loadingPayment: false,

      yandexMoney: true,
      isWaitLabel: false,
      payment_type: 'system',

      successPromptIsOpen: false,
      paymentIdForDelete: '',

      my_date: '26.02.2021',
      my_time: {
        HH: '14',
        mm: '00'
      },

      type: 'occasion',
      occasion: '',
      event: '',

      p_count: 0,
      tables: '',
      reserve_hall: false,
      reserve_all: false
    }
  },
  async created () {
    const cookiz = this.$cookies
    const id = this.$route.params.id

    this.$store.dispatch('GET_PAY_OTHER_METHODS_LIST', { cookiz })
    await this.$store.dispatch('GET_CURRENT_CATERING', { cookiz, id })

    if (this.$route.query.order) {
      cookiz.order = this.$route.query.order
    }
    await this.$store.dispatch('GET_PERSONAL_DATA', cookiz)

    this.order = this.currentOrderMethod()
    if (!(this.order && this.order.id)) {
      if (this.CURRENT_CATERING) {
        this.$router.push(this.localePath({ path: `/catering/${id}` }))
      } else {
        this.$router.push(this.localePath('index'))
      }
    }

    await this.$store.dispatch('GET_PAYMENTS', cookiz)
    if (this.SELECTED_CARD) {
      this.payment_type = 'card'
    }
  },
  computed: {
    isPreorder () {
      return this.orderTimingState(this.order) === 'preorder_choose_dishes'
    },
    time () {
      return this.my_time.HH + ':' + this.my_time.mm
    },
    ...mapGetters([
      'RESERVE',
      'PAYMENTS',
      'CURRENT_CATERING',
      'OTHER_PAYMENTS',
      'SELECTED_CARD'
    ])
  },
  validations: {
    tables: {
      required
    },
    my_date: {
      required
    },
    my_time: {
      required
    }
  },
  methods: {
    togglePromptPopup (paymentId) {
      this.paymentIdForDelete = paymentId
      this.successPromptIsOpen = !this.successPromptIsOpen
    },
    PayAnOrder () {
      const cookiz = this.$cookies
      const id = this.$route.params.id

      if (this.order && this.order.id) {
        this.loadingPayment = true
        const orderID = this.order.id
        const form = {
          payment_type: 'payment_system',
          payment_system_id: 2
        }

        this.$store
          .dispatch('PAY_CURRENT_CATERING_ORDER', { cookiz, id, orderID, form })
          .then((res) => {
            console.warn('PayAnOrder res', res)
            let ac = res.data
            if (ac && ac.status && ac.status === 'success' && ac.order) {
              ac = ac.order
              console.warn('Order to pay:', ac)
              if (ac.pay_url) {
                this.setOrder(null)
                localStorage.pendingStart = Date.now()
                Object.assign(document.createElement('a'), {
                  href: ac.pay_url
                }).click()
              } else {
                console.error('No pay_url in pay. order', ac)
              }
            } else {
              this.$store.commit('SET_ERROR_NOTIFY', true)
            }
          })
      } else {
        this.$store.commit('SET_ERROR_NOTIFY', true)
      }
    },
    deletePayment () {
      const vm = this
      const cookiz = this.$cookies
      const id = this.paymentIdForDelete

      this.$store
        .dispatch('DELETE_CURRENT_PAYMENT', { cookiz, id })
        .then((res) => {
          if (res.data.status === 'success') {
            vm.toggleSuccessDeletePopup()
          } else {
            this.$store.commit('SET_ERROR_NOTIFY', true)
            console.error('DELETE_CURRENT_PAYMENT', res)
          }
        })
    },

    /*
      @CONTROLLS
    */
    waitForAnMeneger () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        setTimeout(() => {
          this.$store.commit('SET_ERROR_NOTIFY', this.$t('checkYourFields'))
        }, 100)
      } else {
        this.isWaitLabel = true
        setTimeout(() => {
          this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('waitNotify'))
          setTimeout(() => {
            this.isWaitLabel = false
            this.$parent.isPopupReserved = true
            this.$store.commit('CLEAR_NOTIFICATIONS')
          }, 2500)
        }, 500)
      }
    }
  }
}
</script>

<style>
.orderPay .popupDelete_wrap {
  position: fixed !important;
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';
@import '~/assets/styles/modificator';
.payment__small {
  color: $bgc-btn-gradient-to;
  font-size: 12px;
}
.systemBlocks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 6px;
  margin-top: 20px;

  .systemBlock {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 78px;
    height: 60px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;

    @media screen and (max-width: 991px) {
      height: 42px;
      border-radius: 6px;
    }

    &.active {
      border: 1px solid #f3bd44; // $orange
    }
    .address-icon {
    }
  }
}
.payment_details {
  border-top: 1px solid $c-line;
}
.paymenuLabel {
  cursor: pointer;
  display: flex;
  font-size: 16px;
  border: 1px solid $c-line;
  padding: 1rem 2rem;
  border-top-left-radius: 5px;
  border-bottom: none;

  svg {
    display: none;
  }

  @media screen and (min-width: 992px) {
    padding: 1rem;
    justify-content: flex-start;
    align-items: center;

    svg {
      display: block;
      margin-right: 15px;
    }
  }

  &.system {
    border-top-left-radius: 0;
    border-top-right-radius: 5px;
  }
  &.inactive {
    border-color: #efefef;
  }
}

.roboto {
  font-family: $ff-roboto;
}
.text-sm {
  font-size: 14px !important;
}

.menu_cart_icon {
  padding: 5px;
  width: 32px;
  height: 32px;
  margin-right: 1rem;
  border: 1px solid $c-green;
  border-radius: 999px;
}

* ::selection {
  background: transparent !important;
}

.container {
  padding: 0 2rem;
}
.header {
  padding: 2rem 0 1rem;
  color: #555;
  border-bottom: 1px solid $c-line;
  .first {
    b {
      color: #979797;
      color: initial;
    }
    b,
    .spanid {
      margin-right: 2rem;
    }
  }
  .cateringAddress {
    color: initial;
    & > img {
      height: 20px;
      margin-right: 1rem;
    }
  }
  .route {
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-color: #a2a2a2;
    border-radius: 50%;
    padding: 6px;
    width: 30px;
    height: 30px;
    margin-left: 1rem;
    box-shadow: 0px 4px 8px #1ca79012;
    cursor: pointer;
    img {
      filter: grayscale(1);
      height: 16px;
    }
  }

  .social {
    &-review {
      font-family: $ff-gilroy;
      font-size: 14px;

      &-count {
        color: $c-green;
      }
    }
  }

  /*asda sd*/
  .headeractions {
    margin: 0 0.5rem 0 1rem;
  }
  .catering_socialAction {
    grid-area: social;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 5px;
    align-items: center;

    @media screen and (max-width: 991px) {
      margin-right: 2rem;
    }

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 7px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      box-shadow: 0px 4px 8px #1ca79012;
      cursor: pointer;

      border: 1px solid #a2a2a2;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &.desktop {
        @media screen and (min-width: 992px) {
          display: flex;
          border: 1px solid #a2a2a2;
          margin-left: 0.5rem;
        }
      }

      &.mobile {
        border: 1px solid $c-icon-green;
      }
    }
  }
}

.orderPay {
  position: relative;
  grid-area: body;
  display: flex;
  border-radius: 0;
  background-color: $c-light;
  height: 100%;
  width: 100%;
  overflow: auto;
  flex-direction: column;
  font-size: 16px;
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';

.res_checkbox {
  display: flex;
  font-size: 14px;
}
.rchk2 {
  margin-top: 1rem;
}

.body {
  padding: 1rem 0;

  .icon_table {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0px 4px 8px #1ca79012;
    border: 1px solid $c-green;
    cursor: pointer;
    margin-right: 1rem;
  }

  .reservation_form {
    padding: 0 4rem;
    width: 100%;
    .costTitle {
      margin: 1rem 0;
    }
  }

  .some_small_inputs {
    & > div {
      margin-right: 2rem;
      font-size: 14px;
      .res_input {
        position: relative;
        margin-top: 0.5rem;
        font-size: 16px;
        border: 1px solid $c-line;
        border-radius: 5px;
        input {
          font-size: 16px;
        }
        span {
          display: inline-block;
          border-right: 1px solid $c-line;
        }

        .time_img {
          position: absolute;
          top: 1rem;
          left: -2.15rem;
        }

        &.date {
          border: none;
          /deep/ .mx-input {
            height: 42px;
            border-radius: 5px;
            border-color: $c-line;
            font-family: $ff-gilroy;
            font-size: 16px;
          }
        }
        &.time {
          border: none;
          width: 9rem;

          /deep/ .display-time {
            height: 42px;
            border-radius: 5px;
            border-color: $c-line;
            font-family: $ff-gilroy;
            font-size: 16px;
          }

          /deep/ .time-picker {
            height: 40px;
            border-radius: 5px;
            width: 100%;
            input {
              width: 100%;
              font-size: 16px;
              padding: 1rem 0;
              text-align: center;
            }
          }
        }

        &.person {
          display: flex;
          span {
            padding: 0.75rem 1.35rem;
            &:last-child {
              border-right: none;
            }
          }
        }
      }
    }
  }

  .col1 {
    .selectOccasion {
      position: relative;

      &.active {
        & > span {
          color: $orange;
        }
      }

      & > span {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1px;

        font-size: 4rem;
        color: $c-line;

        margin-right: 1rem;
        margin-top: 0.25rem;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        border: 1px solid $c-line;
      }

      .select {
        width: 22em;
      }
    }
  }

  .col2 {
    margin-top: 2.5rem;
    width: 19em;
  }
  .selectPlan {
    white-space: nowrap;
    padding: 0 2rem;
    height: 42px;
    border-radius: 5px;
    border: 1px solid $c-line;
    font-family: $ff-gilroy;
    font-size: 16px;
    cursor: pointer;
    img {
      height: 32px;
      margin-right: 1rem;
    }
  }
  .selectTable {
    display: block;
    margin-top: 2.5rem;
    width: 100%;
    input {
      border: 1px solid #e2e2e2;
      border-radius: 5px;
      padding: 5px 10px;
      width: 100%;
      height: 40px;
      background: #ffffff 0% 0% no-repeat padding-box;
      text-align: left;
      font-family: inherit;
      font-size: inherit;
    }
  }

  .waitLabel {
    color: $c-error;
  }
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';

@media screen and (max-width: 1280px) {
  .reservation_columns {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .col1 {
      width: 100% !important;
    }
    .col2 {
      width: 100% !important;
    }
    .some_small_inputs {
      width: 100% !important;
      justify-content: space-between;
    }
    .select_cont {
      width: 100% !important;
    }
    .select_cont .select {
      width: 100% !important;
    }
  }
}
@media screen and (max-width: 991px) {
  .menu_cart_icon {
    display: none !important;
  }

  .p_count {
    cursor: pointer;
    text-align: center;
    padding: 0.85rem 1.15rem;
    width: 40px;
    border-radius: 7px;
    box-shadow: 0px 1px 4px #ddd;
    border: 1px solid #eee;
  }
  .p_count.active {
    background: $orange;
    box-shadow: 0px 1px 4px $orange;
    border: 1px solid $orange;
    color: white;
  }
  .p_count_img {
    filter: contrast(0);
    margin-right: 0.5rem;
  }
  .p_count_ar {
    cursor: pointer;
    transform: rotate(-180deg);
  }
  .p_count_al {
    cursor: pointer;
  }

  .select_cont {
    width: 100%;
  }
  .res_tip {
  }
  .res_lable {
    font-size: 13px;
    color: $c-green;
    margin-bottom: 0.75rem !important;
    display: block;
  }

  .tablesImage {
  }

  .res_input {
    height: 32px !important;
    .time {
      width: 10rem !important;
    }
  }
  .res_checkbox {
    height: 40px !important;
    padding: 0.5rem 1rem;
    border-radius: 7px;
    box-shadow: 0px 2px 5px #ddd;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
  }
  .rchk2 {
  }

  .body {
    font-size: 14px;

    padding: 0;
    .titleStep {
      margin-top: 0.25rem;
      justify-content: center;
      text-align: center;
      color: $c-green;
      font-size: 18px;
      .icon_table {
        display: none;
      }
      b {
        width: 65vw;
      }
    }

    .reservation_form {
      padding: 0 5%;
      .costTitle {
        text-align: center;
        .costTitle_value {
          font-family: $ff-roboto;
          font-size: 20px;
          font-weight: bold;
          color: $c-green;
        }
      }
    }

    .some_small_inputs {
      margin-bottom: 3rem;
      justify-content: space-between;

      .res_lable {
        display: none !important;
      }

      & > div {
        margin: 0 !important;
        &:last-child {
          display: none;
        }
        .res_input {
          input {
          }
          span {
          }

          &.date {
            /deep/ .mx-input {
              border-radius: 7px;
              box-shadow: 0px 2px 5px #ddd;
              border: 1px solid #eee;
            }
          }
          &.time {
            /deep/ .display-time {
            }

            /deep/ .time-picker {
              input {
                border-radius: 7px;
                box-shadow: 0px 2px 5px #ddd;
                border: 1px solid #eee;
              }
            }
          }

          &.person {
            span {
              &:last-child {
              }
            }
          }
        }
      }
    }
    .reservation_columns {
      display: block;
      .col1 {
        width: 100%;
        .selectOccasion {
          &.active {
            & > span {
            }
          }

          & > span {
          }

          .select {
            width: 100% !important;
          }
        }
      }

      .col2 {
        width: 100%;
      }
      .selectPlan {
        box-shadow: 0px 2px 5px #ddd;
        border: 1px solid #eee;
        border-radius: 7px;
        img {
        }
      }
      .selectTable {
        display: block;
        margin-top: 2rem;
        width: 100%;
        input {
          box-shadow: 0px 2px 5px #ddd;
          border: 1px solid #eee;
          border-radius: 7px;
        }
      }
    }
  }
}
</style>

<style>
.validBlock.error .res_lable {
  color: #eb608f !important;
}
.validBlock.error input,
.validBlock.error .p_count,
.validBlock.error .res_input.person,
.validBlock .display-time.is-empty {
  color: #eb608f !important;
  border: 1px solid #eb608f !important;
}

.reservation_form .mx-datepicker {
  width: 10em !important;
}

.selectOccasion .vs__dropdown-toggle {
  padding: 0.5rem;
}

.selectOccasion .vs__actions::before {
  display: block;
  content: ' ';
  background-image: url('~assets/icons/L_arrow.svg');
  background-size: contain;
  background-repeat: no-repeat;
  width: 12px;
  height: 12px;
  overflow: visible;
}
.selectOccasion .vs__open-indicator {
  display: none !important;
}

.selectOccasion .vs__dropdown-menu {
  border-color: #e2e2e2 !important;
  width: 100%;
}
.selectOccasion .vs__dropdown-option {
  padding: 0.75rem;
  font-size: 16px !important;
}
.selectOccasion .vs__dropdown-menu > .vs__dropdown-option--selected,
.selectOccasion .vs__dropdown-menu > .vs__dropdown-option--highlight {
  color: inherit;
  background: white;
}

@media screen and (max-width: 991px) {
  .selectOccasion .vs__actions {
    transform: rotate(90deg);
  }
  .some_small_inputs .mx-input,
  .some_small_inputs .mx-datepicker,
  .some_small_inputs .time-picker {
    height: 40px !important;
  }
  .some_small_inputs .mx-datepicker input,
  .some_small_inputs .time-picker input {
    font-size: 14px !important;
    height: 40px !important;
    border-radius: 7px;
  }
  .selectOccasion .vs__dropdown-toggle {
    height: 40px !important;
    padding: 0.25rem 0.5rem;
    box-shadow: 0px 2px 5px #ddd;
    border: 1px solid #eee;
    border-radius: 7px;
  }

  .res_input.time .dropdown,
  .res_input.time .time-picker .select-list {
    width: 10rem !important;
  }

  .res_input.time .dropdown .hint {
    display: none !important;
  }
}
</style>
