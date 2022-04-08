<i18n>
{
  "en": {
    "title": "Booking a table",
    "youChoosed" : "You choosed a:",
    "place": "availible",
    "reviewsLabel": "Reviews",
    "noplace": "unavailible",
    "restorantLabel": "Restaurant",
    "deliveryRadiusLabel":"Delivery is carried out within a raduis of {n} km",
    "startBtn" : "Get a vacant table",
    "startBtnMenu" : "Select dishes",
    "hasCartMessage": "You have cart in this catering",

    "minimunPrice": "Minimum order amount",
    "deliveryAvailible": "Delivery available",
    "deliveryPrice": "Shipping cost",

    "serviceDetails" : "The service includes the delivery of dishes from the chosen restaurant to the address you specified on the current date",
    "secunda" : "sec",
    "minutes20" : "You have 20 minutes to choose dishes and pay for the order",
    "start" : "Delivery service",
    "deliveryAreaError": "Unfortunately, there is no delivery from this establishment to your area. If you want to make delivery to another address, click \"Continue\"",
    "free": "free",
    "cancel": "Cancel",
    "understand": "Continue",
    "attention": "If you want to make an order, click the button below",
    "checkingDelivery": "We're checking delivery...",
    "unavailableDishes": "Warning! The next dishes from your card is unavailable for delivery:",
    "toCorrectOrder": "Correct order",
    "chooseAnotherAddress": "Choose another address"
  },
  "ru": {
    "title": "Бронирование столика",
    "youChoosed" : "Вы выбрали:",
    "place": "Доступны",
    "reviewsLabel": "Отзывы",
    "noplace": "нет",
    "restorantLabel": "Ресторан",
    "deliveryRadiusLabel": "Доставка осуществляеться в радиусе {n} км",
    "startBtn" : "Занять свободный стол",
    "startBtnMenu" : "Выбрать блюда",
    "hasCartMessage": "У Вас есть корзина в этом заведении",

    "minimunPrice" : "Минимальная сумма заказа",
    "deliveryAvailible" : "Доставка доступна",
    "deliveryPrice" : "Стоимость доставки",

    "serviceDetails" : "Сервис включает в себя доставку блюд из выбранного заведения на текущую дату по указанному Вами адресу",
    "secunda" : "сек",
    "minutes20" : "У Вас есть 20 минут на выбор блюд и оплату заказа",
    "start" : "Сервис доставки",
    "deliveryAreaError": "К сожалению, доставка из данного заведения в ваш район не осуществляется. Если Вы хотите сделать доставку на другой адрес, нажмите \"Продолжить\"",
    "free": "бесплатно",
    "cancel": "Отмена",
    "understand": "Продолжить",
    "attention": "Если хотите сделать заказ, нажмите кнопку ниже",
    "checkingDelivery": "Проверяем доставку...",
    "unavailableDishes": "Внимание! Следующие блюда из вашей корзины недоступны для доставки:",
    "toCorrectOrder": "Скорректировать заказ",
    "chooseAnotherAddress": "Выбрать другой адрес"
  }
}
</i18n>

<template>
  <section v-if="!$_.isNil(CURRENT_CATERING)" class="aboutDelivery">
    <div class="aboutDelivery__container">
      <div class="heading w-75">
        <h1 class="desktop title roboto flex a_c j_c text-xxl">
          <b>{{ $t('start') }}</b>
        </h1>
        <h1 class="mobile title roboto green flex a_c j_c text-20">
          <b>{{ $t('start') }}</b>
        </h1>
        <div class="flex j_c mb-1 text-lg">
          {{ $t('serviceDetails') }}
        </div>
      </div>

      <div class="catering w-75 text-lg">
        <p class="youChoosed">
          {{ $t('youChoosed') }}
        </p>
        <h2 class="cateringName">
          {{ $t('restorantLabel') }} {{ CURRENT_CATERING.name }}
        </h2>
        <p class="cateringAddress">
          {{
            `${CURRENT_CATERING.address.street}, ${CURRENT_CATERING.address.building}, ${CURRENT_CATERING.address.city}`
          }}
        </p>

        <div class="flex j_c a_c wide mt-1">
          <div class="flex a_c">
            <b class="mr-05 roboto">
              {{ CURRENT_CATERING.rating }}
            </b>
            <addition-stars :rate="CURRENT_CATERING.rating" />
            <p class="cateringMenu_rate-review ml-05">
              {{ $t('reviewsLabel') }}:
              <span class="green">{{ CURRENT_CATERING.reviewsCount }}</span>
            </p>
          </div>
          <p class="desktop more_seats ml-2">
            <span class="more_seats-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.328"
                height="10"
                viewBox="0 0 15.328 10"
              >
                <defs>
                  <style>
                    .a {
                    fill: #5c5c5c;
                    }
                  </style>
                </defs>
                <path
                  class="a"
                  d="M345.279,85.333a.925.925,0,0,0-.911.938v4.062h-2.125a.938.938,0,0,0,0,1.875h1.518v2.5h-.911a.313.313,0,0,0,0,.625h2.428a.313.313,0,0,0,0-.625h-.911v-2.5h.911a.925.925,0,0,0,.911-.937v-5A.925.925,0,0,0,345.279,85.333Z"
                  transform="translate(-330.861 -85.333)"
                />
                <path
                  class="a"
                  d="M3.946,90.333H1.821V86.271a.925.925,0,0,0-.911-.937A.925.925,0,0,0,0,86.271v5a.925.925,0,0,0,.911.937h.911v2.5H.911a.313.313,0,0,0,0,.625H3.339a.313.313,0,0,0,0-.625H2.428v-2.5H3.946a.938.938,0,0,0,0-1.875Z"
                  transform="translate(0 -85.333)"
                />
                <path
                  class="a"
                  d="M112.193,152.02a2.41,2.41,0,0,0,2.5,0,1.558,1.558,0,0,1,.9-.258.318.318,0,0,0,.331-.3v-.911a1.273,1.273,0,0,0-1.322-1.214h-6.612a1.273,1.273,0,0,0-1.323,1.214v.911a.318.318,0,0,0,.331.3,1.55,1.55,0,0,1,.9.258,2.4,2.4,0,0,0,2.494,0,1.69,1.69,0,0,1,.574-.23v4.828h-1.323a.3.3,0,1,0,0,.607h3.306a.3.3,0,1,0,0-.607h-1.322v-4.826A1.708,1.708,0,0,1,112.193,152.02Z"
                  transform="translate(-103.631 -147.225)"
                />
              </svg>
            </span>
            {{ CURRENT_CATERING.free_tables > 0 ? $t('place') : $t('noplace') }}
          </p>
        </div>
        <div class="mobile flex j_c a_c wide mt-1">
          <p class="more_seats ml-2">
            <span class="more_seats-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.328"
                height="10"
                viewBox="0 0 15.328 10"
              >
                <defs>
                  <style>
                    .a {
                    fill: #5c5c5c;
                    }
                  </style>
                </defs>
                <path
                  class="a"
                  d="M345.279,85.333a.925.925,0,0,0-.911.938v4.062h-2.125a.938.938,0,0,0,0,1.875h1.518v2.5h-.911a.313.313,0,0,0,0,.625h2.428a.313.313,0,0,0,0-.625h-.911v-2.5h.911a.925.925,0,0,0,.911-.937v-5A.925.925,0,0,0,345.279,85.333Z"
                  transform="translate(-330.861 -85.333)"
                />
                <path
                  class="a"
                  d="M3.946,90.333H1.821V86.271a.925.925,0,0,0-.911-.937A.925.925,0,0,0,0,86.271v5a.925.925,0,0,0,.911.937h.911v2.5H.911a.313.313,0,0,0,0,.625H3.339a.313.313,0,0,0,0-.625H2.428v-2.5H3.946a.938.938,0,0,0,0-1.875Z"
                  transform="translate(0 -85.333)"
                />
                <path
                  class="a"
                  d="M112.193,152.02a2.41,2.41,0,0,0,2.5,0,1.558,1.558,0,0,1,.9-.258.318.318,0,0,0,.331-.3v-.911a1.273,1.273,0,0,0-1.322-1.214h-6.612a1.273,1.273,0,0,0-1.323,1.214v.911a.318.318,0,0,0,.331.3,1.55,1.55,0,0,1,.9.258,2.4,2.4,0,0,0,2.494,0,1.69,1.69,0,0,1,.574-.23v4.828h-1.323a.3.3,0,1,0,0,.607h3.306a.3.3,0,1,0,0-.607h-1.322v-4.826A1.708,1.708,0,0,1,112.193,152.02Z"
                  transform="translate(-103.631 -147.225)"
                />
              </svg>
            </span>
            {{ CURRENT_CATERING.free_tables > 0 ? $t('place') : $t('noplace') }}
          </p>
        </div>

        <div class="flex wide j_c mt-1 mb-1">
          <b class="desktop text-lg text-bold">
            {{ $tc('deliveryRadiusLabel', maxDistance) }}
          </b>
          <b class="mobile gilroy w-7 mr-a ml-a">
            {{ $tc('deliveryRadiusLabel', maxDistance) }}
          </b>
        </div>

        <p class="horizon wide mobile" />

        <div class="delivery-info roboto green mt-1e mb-1">
          <p>
            <span>{{ $t('minimunPrice') }}: </span><span class="nowrap">
              <template
                v-if="CURRENT_CATERING.avg_check_currency === 'USD'"
              >$
              </template>
              <span v-else class="gilroy-bold">&#8381; </span>
              {{ minOrderPrice }}</span>
          </p>
          <p>
            <span>{{ $t('deliveryAvailible') }}: </span><span class="nowrap"> {{ workTime }}</span>
          </p>
          <p class="mb-1">
            {{ $t('deliveryPrice') }}: {{ costType }}
          </p>
        </div>

        <div
          v-if="CURRENT_CATERING && cartCatering() === CURRENT_CATERING.id"
          class="flex j_c wide mt-1e mb-1 text-lg"
        >
          <p class="text-bold">
            {{ $t('hasCartMessage') }}
          </p>
        </div>

        <div v-if="IS_DELIVERY_POPUP_WORK" class="flex wide j_c mt-3">
          <span class="warning-text">{{ $t('checkingDelivery') }}</span>
        </div>

        <div
          v-else-if="IS_DELIVERY_POPUP_SUCCESS"
          class="startBtnMenu-attention"
        >
          <div class="attention">
            <span>{{ $t('attention') }}</span>
          </div>
          <div
            class="btn eatme-btn-colorful startBtnMenu mt-3"
            @click="runAndGoToMenu()"
          >
            <span>{{ $t('startBtnMenu') }}</span>
          </div>
        </div>
        <template
          v-else-if="
            IS_DELIVERY_POPUP_AREA_WARNING || IS_DELIVERY_POPUP_AREA_ERROR
          "
        >
          <div class="area-error">
            {{ $t('deliveryAreaError') }}
          </div>
          <div class="attention">
            <span>{{ $t('attention') }}</span>
          </div>
          <div class="controls">
            <template v-if="IS_DELIVERY_POPUP_AREA_WARNING">
              <div
                class="btn eatme-btn-red startBtnMenu controls__item"
                @click="close()"
              >
                <span>{{ $t('cancel') }}</span>
              </div>
              <div
                class="btn eatme-btn-red startBtnMenu controls__item"
                @click="runDishesCheck()"
              >
                <span>{{ $t('understand') }}</span>
              </div>
            </template>
            <template v-else-if="IS_DELIVERY_POPUP_AREA_ERROR">
              <div
                class="btn eatme-btn-red startBtnMenu controls__item"
                @click="closeDelivery()"
              >
                <span>{{ $t('cancel') }}</span>
              </div>
              <div
                class="btn eatme-btn-red startBtnMenu controls__item"
                @click="close()"
              >
                <span>{{ $t('chooseAnotherAddress') }}</span>
              </div>
            </template>
          </div>
        </template>
        <template v-else-if="IS_DELIVERY_POPUP_DISHES_ERROR">
          <div class="warning-text">
            {{ $t('unavailableDishes') }} {{ unavailableDishes }}
          </div>
          <div class="warning-button-container">
            <div
              class="btn eatme-btn-red startBtnMenu wide-warning-button"
              @click="runAndGoToCart()"
            >
              <span>{{ $t('toCorrectOrder') }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { required, minValue, maxValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      person_quantity: 1,
      p_count: 0,
      secunda: 0,
      state: 1,
      orderType: 'delivery',
      maxDistance: '...',
      minOrderPrice: '...',
      workTime: '...',
      costType: '...'
    }
  },
  validations: {
    person_quantity: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(6)
    }
  },
  computed: {
    ...mapGetters([
      'CURRENT_CATERING',
      'CURRENT_CATERING_ORDER',
      'CART_ITEMS',
      'COPIED_CATERING_ORDER',
      'IS_DELIVERY_POPUP_WORK',
      'IS_DELIVERY_POPUP_SUCCESS',
      'IS_DELIVERY_POPUP_AREA_WARNING',
      'IS_DELIVERY_POPUP_AREA_ERROR',
      'IS_DELIVERY_POPUP_DISHES_ERROR',
      'CLOSE_DELIVERY_POPUP',
      'UNAVAILABLE_DELIVERY_DISHES'
    ]),
    unavailableDishes () {
      const output = this.UNAVAILABLE_DELIVERY_DISHES.map(
        item => item.name
      ).join(', ')

      const max = this.isMobile ? 50 : 100

      return output.length > max ? output.substr(0, max) + '...' : output
    }
  },
  beforeDestroy () {
    this.$store.commit('RESET_COPIED_CATERING_ORDER')
  },
  mounted () {
    this.runChecks()
  },
  methods: {
    close () {
      this.$store.commit('CLOSE_DELIVERY_POPUP')
    },
    closeDelivery () {
      this.$store.commit('CLOSE_DELIVERY_ADDRESS_POPUP')
      this.$store.commit('CLOSE_DELIVERY_POPUP')
    },
    runAndGoToMenu () {
      this.runDelivery()

      const id = this.CURRENT_CATERING.id
      this.$router.push(this.localePath({ path: `/catering/${id}/menu` }))
      this.$store.commit('CLOSE_DELIVERY_POPUP')
    },
    runAndGoToCart () {
      this.runDelivery()

      this.$router.push(this.localePath({ path: '/profile/cart' }))
      this.$store.commit('CLOSE_DELIVERY_POPUP')
    },
    async runDishesCheck () {
      const cartValidation = await this.checkCart()
      if (!cartValidation) {
        this.$store.commit('SET_DELIVERY_POPUP_DISHES_ERROR')
      } else {
        this.runAndGoToMenu()
      }
    },
    async createDeliveryOrder () {
      if (localStorage.personquantity) {
        this.person_quantity = +localStorage.personquantity || 1
        localStorage.removeItem('personquantity')
      }

      const id = this.CURRENT_CATERING.id
      const personQuantity = this.person_quantity
      const cookiz = this.$cookies

      if (this.COPIED_CATERING_ORDER) {
        await this.$store.dispatch('REPEAT_ORDER', {
          cookiz,
          order: this.COPIED_CATERING_ORDER
        })
        this.$store.commit('RESET_COPIED_CATERING_ORDER')
      } else {
        await this.createOrder(id, this.orderType, personQuantity)
      }

      await this.$store.dispatch('GET_PERSONAL_DATA', cookiz)
    },
    async runDelivery () {
      try {
        await this.createDeliveryOrder()
      } catch (err) {
        if (err.status === 422) {
          this.$store.commit('SET_DELIVERY_POPUP_AREA_WARNING')
        }
      }
    },
    setDeliveryInfo (info) {
      this.maxDistance = info.max_distance
      this.minOrderPrice = info.min_order_price
        ? info.min_order_price.split('.')[0]
        : 0
      this.workTime = info.work_time
      this.costType = info.cost_type === 'free' ? this.$t('free') : info.price
    },
    async checkGeolocation () {
      try {
        const cookiz = this.$cookies
        const id = this.CURRENT_CATERING.id
        const { coords } = await this.eatmeUserGeolocation()

        const { data } = await this.$store.dispatch('GET_ORDER_DELIVERY_INFO', {
          cookiz,
          id,
          coords
        })
        this.setDeliveryInfo(data.delivery_info)

        return true
      } catch (err) {
        if (err.response && err.response.status === 422) {
          this.setDeliveryInfo(err.response.data.delivery_info)
          return false
        }
        return false
      }
    },
    async checkCart () {
      try {
        const cookiz = this.$cookies
        const cateringId = this.CURRENT_CATERING.id
        const orderType = this.orderType
        await this.$store.dispatch('CHECK_CART_FOR_DELIVERY', {
          cookiz,
          cateringId,
          orderType
        })

        return true
      } catch (e) {
        if (e.response && e.response.status === 422) {
          const unavailableDishes = e.response.data.unavailable_dishes
          this.$store.commit(
            'SET_UNAVAILABLE_DELIVERY_DISHES',
            unavailableDishes
          )
          return false
        }

        return false
      }
    },
    async runChecks () {
      const geoValidation = await this.checkGeolocation()
      if (!geoValidation && this.IS_DELIVERY_POPUP_WORK) {
        this.$store.commit('SET_DELIVERY_POPUP_AREA_WARNING')
        return
      }

      if (!this.IS_DELIVERY_POPUP_WORK) {
        return
      }

      const cartValidation = await this.checkCart()
      if (!cartValidation) {
        this.$store.commit('SET_DELIVERY_POPUP_DISHES_ERROR')
      } else {
        this.$store.commit('SET_DELIVERY_POPUP_SUCCESS')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';

.horizon {
  border-top: 2px solid $c-line;
}

.aboutDelivery {
  position: relative;
  z-index: 1000;
  display: flex;
  justify-content: center;
  overflow: auto;
  border-radius: 0;
  width: 100%;
  text-align: center;
  font-size: 16px;

  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .title {
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: 100;
  }
  .steps {
    position: relative;
    margin: 1rem 0 2rem;
    cursor: initial;

    .step {
      position: relative;
      width: 8em;
      font-weight: bold;
      text-transform: uppercase;
    }
    .spacer {
      position: relative;
      display: block;
      width: 7rem;
      height: 1px;
      border-top: 2px dashed #555;
      margin: 0 1.5rem;
      &:after {
        position: absolute;
        top: -0.75em;
        font-size: 25px;
        right: -0.5em;
        color: #555;
        content: '►';
      }
    }
  }
}

.p_containter {
  width: 28rem;
  .p_count {
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    padding: 0.85rem 1.15rem;
    width: 40px;
    border-radius: 7px;
    box-shadow: 0px 1px 2px #ddd;
    border: 1px solid #eee;
  }
  .p_count.active {
    background: $orange;
    box-shadow: 0px 1px 2px $orange;
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
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';

.heading {
  margin: auto;
}

.startBtnMenu-attention {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.attention {
  width: 80%;
  margin: 10px auto 0;
  font-size: 14px;
  line-height: 16px;
  color: $c-magenta;
}

.catering {
  border-top: 2px solid $c-line;
  margin: auto;

  .youChoosed {
    font-size: 14px;
    margin-top: 1rem;
  }
  .cateringName,
  .cateringAddress {
    font-size: 14px;
    font-weight: normal;
  }
  .controls {
    display: flex;
    justify-content: space-evenly;
    margin-top: 30px;
    margin-left: -10px;
    margin-right: -10px;
    text-align: center;

    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      margin-right: 10px;

      & > span {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    @media screen and (max-width: 991px) {
      &__item {
        max-height: 38px;
        &:not(:first-child) {
          margin-bottom: 1rem;
        }
      }
    }

    @media screen and (max-width: 576px) {
      flex-direction: column-reverse;
      align-items: center;
      margin-left: -5px;
      margin-right: -5px;

      &__item {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }

  .btns {
    margin-top: 2em;
    padding: 0 10%;
    margin-bottom: 3em;

    .btn {
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;

      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
}

@media screen and (max-width: 991px) {
  .heading,
  .catering {
    width: 100% !important;
  }

  .aboutDelivery {
    font-size: 14px;

    & > div {
      width: 85%;
      margin-left: auto;
      margin-right: auto;
    }
    .aboutText {
      font-weight: initial;
      color: #5d5d5d;
      text-align: center;
      width: 80%;
      margin: auto;
    }
    .title {
      img {
        height: 24px;
      }
    }
    .steps {
      font-weight: initial;
      color: #5d5d5d;
      .step {
        font-size: 14px;
        text-transform: initial;
        font-weight: initial;
      }
    }
    .spacer {
      border-top: 2px dashed $c-green !important;
      &:after {
        color: $c-green !important;
      }
    }
  }

  .catering {
    font-size: 14px;

    .youChoosed {
      font-size: 14px;
      color: #111;
      margin-top: 1rem;
      margin-bottom: 0rem;
    }
    .cateringName,
    .cateringAddress {
      font-size: 14px;
    }

    .btns {
      display: block;
      width: 100%;
      margin-top: 1em;

      .btn.disabled {
        margin-bottom: 4rem;
      }
    }
  }

  .heading {
    & > div {
      display: block;
    }
  }
}
.goeat-popup-back.mobile {
  position: absolute;
  left: 0;
  top: 10px;
  font-size: 14px;
  padding: 0 1rem;
}

.delivery-info {
  font-size: 16px;
}

.area-error {
  font: normal normal normal 14px/18px $ff-gilroy;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: $magenta;

  @media screen and (max-width: 991px) {
    font-size: 14px;
  }
}

.warning-text {
  font: normal normal normal 14px/18px $ff-gilroy;
  color: $magenta;
}

.warning-button-container {
  display: flex;
  justify-content: center;
}

.wide-warning-button {
  margin-top: 20px;
  margin-bottom: 10px;
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
