<i18n>
{
  "en": {
    "title": "Booking a table",
    "step1" : "Choose a meal",
    "step2" : "Pay&go",
    "youChoosed" : "You choosed a:",
    "place": "availible",
    "hasCartMessage": "You have cart in this catering",
    "reviewsLabel": "Reviews",
    "noplace": "unavailible",
    "restorantLabel": "Restaurant",
    "personLabel":"Choose how many persons want to come",
    "startBtn" : "Get a vacant table",
    "startBtnMenu" : "Select dishes",

    "chooseAnotherService1" : "Unfortunately there are no free tables",
    "chooseAnotherService2" : "Please choose another service or another catering",
    "chooseAnotherService3" : "Please choose another service",
    "chooseAnotherServiceBtn" : "Choose another service",

    "startBtnCart" : "My cart",
    "minuta" : "min",
    "secunda" : "sec",
    "tableReservedSuccessfully" : "The table has been successfully reserved",
    "minutes20" : "You have 20 minutes to choose dishes and pay for the order",
    "minutes20Notify" : "Attention! You have 20 minutes",
    "minutes20Notify2" : "on the choice of dishes and payment of the order",
    "waitManager" : "Wait for the manager's response. Waiting time is 3 minutes.",
    "start" : "Go&eat"
  },
  "ru": {
    "title": "Бронирование столика",
    "step1" : "Выберите еду онлайн",
    "step2" : "Оплатите и идите кушать",
    "youChoosed" : "Вы выбрали:",
    "place": "доступны",
    "hasCartMessage": "У Вас есть корзина в этом заведении",
    "reviewsLabel": "Отзывы",
    "noplace": "нет",
    "restorantLabel": "Ресторан",
    "personLabel":"Укажите, сколько гостей хочет прийти",
    "startBtn" : "Занять свободный стол",
    "startBtnMenu" : "Выбрать блюда",

    "chooseAnotherService1" : "К сожалению, свободных столов нет",
    "chooseAnotherService2" : "Пожалуйста, выберите другой сервис или другое заведение",
    "chooseAnotherService3" : "Пожалуйста, выберите другой сервис",
    "chooseAnotherServiceBtn" : "Выбрать другой сервис",

    "startBtnCart" : "К корзине",
    "minuta" : "мин",
    "secunda" : "сек",
    "tableReservedSuccessfully" : "Стол успешно зарезервирован",
    "minutes20" : "У Вас есть 20 минут на выбор блюд и оплату заказа",
    "minutes20Notify" : "Внимание! У Вас есть 20 минут",
    "minutes20Notify2" : "на выбор блюд и оплату заказа",
    "waitManager" : "Дождитесь ответа менеджера. Время ожидания до 3-х минут.",
    "start" : "Go&eat"
  }
}
</i18n>

<template>
  <section v-if="!$_.isNil(CURRENT_CATERING)" class="aboutGo">
    <div class="toll aboutGo__container">
      <div class="heading wide">
        <h1 class="heading-title">
          <img
            height="38"
            src="/icons/consumables/goeat-service.svg"
            alt=""
          >
          <span>{{ $t('start') }}</span>
        </h1>
        <div class="flex j_c">
          <div class="steps flex a_c j_c">
            <div class="step step1">
              <div class="step__inner">
                {{ $t('step1') }}
              </div>
            </div>
            <div class="spacer">
              <img v-if="!isMobile" src="/icons/arrow-Go-and-eat-PC.svg" alt="" class="spacer-desktop">
              <img v-else src="/icons/arrow-Go-and-eat-Mob.svg" alt="" class="spacer-mobile">
            </div>
            <div class="step step2">
              <div class="step__inner">
                {{ $t('step2') }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="catering text-lg">
        <p class="youChoosed">
          {{ $t('youChoosed') }}
        </p>
        <h2 class="cateringName">
          {{ $t('restorantLabel') }} {{ CURRENT_CATERING.name }}
        </h2>
        <p class="cateringAddress">
          {{ `${CURRENT_CATERING.address.street}, ${CURRENT_CATERING.address.building}, ${CURRENT_CATERING.address.city}` }}
        </p>

        <div class="flex j_c a_c wide mt-1">
          <div class="flex a_c">
            <b class="mr-05 roboto">
              {{ CURRENT_CATERING.rating }}
            </b>
            <addition-stars :rate="CURRENT_CATERING.rating" />
            <p class="cateringMenu_rate-review ml-1">
              {{ $t('reviewsLabel') }}: <span class="green">{{ CURRENT_CATERING.reviewsCount }}</span>
            </p>
            <p class="desktop more_seats ml-1">
              <span class="more_seats-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="15.328" height="10" viewBox="0 0 15.328 10"><defs><style>.a{fill:#5c5c5c;}</style></defs><path class="a" d="M345.279,85.333a.925.925,0,0,0-.911.938v4.062h-2.125a.938.938,0,0,0,0,1.875h1.518v2.5h-.911a.313.313,0,0,0,0,.625h2.428a.313.313,0,0,0,0-.625h-.911v-2.5h.911a.925.925,0,0,0,.911-.937v-5A.925.925,0,0,0,345.279,85.333Z" transform="translate(-330.861 -85.333)" /><path class="a" d="M3.946,90.333H1.821V86.271a.925.925,0,0,0-.911-.937A.925.925,0,0,0,0,86.271v5a.925.925,0,0,0,.911.937h.911v2.5H.911a.313.313,0,0,0,0,.625H3.339a.313.313,0,0,0,0-.625H2.428v-2.5H3.946a.938.938,0,0,0,0-1.875Z" transform="translate(0 -85.333)" /><path class="a" d="M112.193,152.02a2.41,2.41,0,0,0,2.5,0,1.558,1.558,0,0,1,.9-.258.318.318,0,0,0,.331-.3v-.911a1.273,1.273,0,0,0-1.322-1.214h-6.612a1.273,1.273,0,0,0-1.323,1.214v.911a.318.318,0,0,0,.331.3,1.55,1.55,0,0,1,.9.258,2.4,2.4,0,0,0,2.494,0,1.69,1.69,0,0,1,.574-.23v4.828h-1.323a.3.3,0,1,0,0,.607h3.306a.3.3,0,1,0,0-.607h-1.322v-4.826A1.708,1.708,0,0,1,112.193,152.02Z" transform="translate(-103.631 -147.225)" /></svg>
              </span> {{ CURRENT_CATERING.free_tables > 0 ? $t('place') : $t('noplace') }}
            </p>
          </div>
        </div>
        <div class="mobile flex j_c a_c wide mt-1">
          <p class="more_seats ml-2">
            <span class="more_seats-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="15.328" height="10" viewBox="0 0 15.328 10"><defs><style>.a{fill:#5c5c5c;}</style></defs><path class="a" d="M345.279,85.333a.925.925,0,0,0-.911.938v4.062h-2.125a.938.938,0,0,0,0,1.875h1.518v2.5h-.911a.313.313,0,0,0,0,.625h2.428a.313.313,0,0,0,0-.625h-.911v-2.5h.911a.925.925,0,0,0,.911-.937v-5A.925.925,0,0,0,345.279,85.333Z" transform="translate(-330.861 -85.333)" /><path class="a" d="M3.946,90.333H1.821V86.271a.925.925,0,0,0-.911-.937A.925.925,0,0,0,0,86.271v5a.925.925,0,0,0,.911.937h.911v2.5H.911a.313.313,0,0,0,0,.625H3.339a.313.313,0,0,0,0-.625H2.428v-2.5H3.946a.938.938,0,0,0,0-1.875Z" transform="translate(0 -85.333)" /><path class="a" d="M112.193,152.02a2.41,2.41,0,0,0,2.5,0,1.558,1.558,0,0,1,.9-.258.318.318,0,0,0,.331-.3v-.911a1.273,1.273,0,0,0-1.322-1.214h-6.612a1.273,1.273,0,0,0-1.323,1.214v.911a.318.318,0,0,0,.331.3,1.55,1.55,0,0,1,.9.258,2.4,2.4,0,0,0,2.494,0,1.69,1.69,0,0,1,.574-.23v4.828h-1.323a.3.3,0,1,0,0,.607h3.306a.3.3,0,1,0,0-.607h-1.322v-4.826A1.708,1.708,0,0,1,112.193,152.02Z" transform="translate(-103.631 -147.225)" /></svg>
            </span> {{ CURRENT_CATERING.free_tables > 0 ? $t('place') : $t('noplace') }}
          </p>
        </div>

        <div class="divider" />

        <div
          v-if="CURRENT_CATERING && (cartCatering() === CURRENT_CATERING.id)"
          class="flex j_c wide mt-1e"
        >
          <p class="text-bold">
            {{ $t('hasCartMessage') }}
          </p>
        </div>

        <template v-if="state === 1">
          <div class="flex wide j_c mt-1e mb-1">
            <b class="desktop text-16 roboto">
              {{ $t('personLabel') }}
            </b>
            <b class="mobile green text-xl roboto">
              {{ $t('personLabel') }}
            </b>
          </div>
          <div class="flex wide j_c">
            <div class="flex w-9 a_c validBlockp p_containter" :class="{error: $v.person_quantity.$error}">
              <img class="p_count_img mr-1" src="/icons/movement/foot.svg">
              <div class="flex a_c wide">
                <div class="flex j_a wide">
                  <span class="p_count" :class="{active:person_quantity === p_count + 1}" @click=" $v.person_quantity.$touch(); person_quantity = p_count + 1">{{ p_count + 1 }}</span>
                  <span class="p_count" :class="{active:person_quantity === p_count + 2}" @click=" $v.person_quantity.$touch(); person_quantity = p_count + 2">{{ p_count + 2 }}</span>
                  <span class="p_count" :class="{active:person_quantity === p_count + 3}" @click=" $v.person_quantity.$touch(); person_quantity = p_count + 3">{{ p_count + 3 }}</span>
                  <span class="p_count" :class="{active:person_quantity === p_count + 4}" @click=" $v.person_quantity.$touch(); person_quantity = p_count + 4">{{ p_count + 4 }}</span>
                  <span class="p_count" :class="{active:person_quantity === p_count + 5}" @click=" $v.person_quantity.$touch(); person_quantity = p_count + 5">{{ p_count + 5 }}</span>
                  <span class="p_count" :class="{active:person_quantity === p_count + 6}" @click=" $v.person_quantity.$touch(); person_quantity = p_count + 6">{{ p_count + 6 }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex wide j_c mt-3">
            <button class="btn eatme-btn-colorful desktop" @click="runManager()">
              <span>{{ $t('startBtn') }}</span>
            </button>
            <button class="btn eatme-btn-colorful w-8 mobile" @click="runManager()">
              <span>{{ $t('startBtn') }}</span>
            </button>
          </div>
          <div class="flex wide j_c">
            <p class="waitManager text-center mt-1e">
              {{ $t('waitManager') }}
            </p>
          </div>
        </template>
        <template v-else-if="state === 2">
          <div class="flex wide j_c col a_c mt-1e mb-1 ">
            <order-timer :large="true" :largetime="secunda" :largemax="180">
              {{ ~~((180-secunda)/60) }} {{ $t('minuta') }} {{ ((180 - secunda) % 60) }} {{ $t('secunda') }}
            </order-timer>
            <p class="waitManager text-center mt-1e">
              {{ $t('waitManager') }}
            </p>
          </div>
        </template>
        <template v-else-if="state === 3">
          <div class="wide text-center mt-1e">
            <p class="text-xl green roboto">
              {{ $t('tableReservedSuccessfully') }}
            </p>
            <p class="mt-1e">
              {{ $t('minutes20') }}
            </p>
          </div>
          <!-- HAS CART MESSAGE -->
          <div class="flex wide btns">
            <button class="btn eatme-btn-red" @click="runGoAndEat()">
              {{ $t('startBtnMenu') }}
            </button>
            <button
              v-if="CURRENT_CATERING && (cartCatering() === CURRENT_CATERING.id)"
              class="btn eatme-btn-red"
              @click="runGoAndEat(true)"
            >
              {{ $t('startBtnCart') }}
            </button>
          </div>
        </template>
        <template v-else-if="state === 4">
          <div class="wide text-center mt-1e">
            <p class="text-xl red roboto">
              {{ $t('chooseAnotherService1') }}
            </p>
            <p class="mt-1e mb-1">
              {{ $t('chooseAnotherService2') }}
            </p>
          </div>
          <div class="flex wide btns">
            <button class="btn eatme-btn-red" @click="closeDialog(CURRENT_CATERING.id)">
              {{ $t('chooseAnotherServiceBtn') }}
            </button>
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
      type: 'go_and_eat',
      person_quantity: 1,
      p_count: 0,
      secunda: 0,
      state: 1,
      interval: null
    }
  },
  validations: {
    person_quantity: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(6)
    }
  },
  watch: {
    'CURRENT_POPUPS_FIRST_ITEM' (value) {
      if (!value || value.type !== 'goandeat_booking') { return }

      this.state = value.data.table_is_reserved ? 3 : 4

      clearInterval(this.interval)
      this.$store.commit('SHIFT_CURRENT_POPUPS')
    },
    COPIED_CATERING_ORDER (value) {
      if (value) {
        this.person_quantity = value.person_quantity
      }
    },
    IS_GOEATPOPUP (value) {
      if (!value) {
        this.person_quantity = 1
        clearInterval(this.interval)
      }
      if (value === 2) {
        this.secunda = this.sec()
        this.state = value
      }
    }
  },
  computed: {
    ...mapGetters(['CURRENT_CATERING', 'CURRENT_CATERING_ORDER', 'CART_ITEMS', 'IS_GOEATPOPUP', 'COPIED_CATERING_ORDER', 'CURRENT_POPUPS_FIRST_ITEM'])
  },
  created () {
    if (this.COPIED_CATERING_ORDER) {
      this.person_quantity = this.COPIED_CATERING_ORDER.person_quantity
    }

    if (this.IS_GOEATPOPUP === 2) {
      this.secunda = this.sec()
      this.state = 2
    }

    this.interval = setInterval(() => {
      const order = this.currentOrderMethod()
      if (order) {
        this.syncOrder(order.id)
        this.proccessState()
      }
      this.secunda = this.sec()
    }, 1000)
  },
  beforeDestroy () {
    this.$store.commit('RESET_COPIED_CATERING_ORDER')
    clearInterval(this.interval)
  },
  methods: {
    sec () {
      let s
      const co = this.currentOrderMethod()
      if (co) {
        s = this.orderGoEatTimeManager(co)
      }
      return s || 0
    },
    async runManager () {
      this.state = 2
      this.secunda = 0

      const id = this.CURRENT_CATERING.id
      const orderType = 'go_and_eat'
      const personQuantity = this.person_quantity

      let order
      if (this.COPIED_CATERING_ORDER) {
        const cookiz = this.$cookies
        const data = { cookiz, order: this.COPIED_CATERING_ORDER, personQuantity }
        order = await this.$store.dispatch('REPEAT_ORDER', data)
      } else {
        order = await this.createOrder(id, orderType, personQuantity)
      }

      const cookiz = this.$cookies
      const orderID = order.id
      order = await this.$store.dispatch('RESERVE_TO_CURRENT_CATERING_ORDER', { cookiz, id, orderID })

      console.warn('GOEAT CREATE ORODER', order)
      await this.loadPersonalData()
    },
    async syncOrder (orderID) {
      if (orderID) {
        const cookiz = this.$cookies
        const res = await this.$store.dispatch('GET_ORDER', { cookiz, orderID })
        if (res.status === 'success') {
          if (res.order) {
            this.$store.commit('SET_CURRENT_ORDER', res.order)
            return res.order
          }
        }
        this.$store.commit('SET_CURRENT_ORDER', null)
      }
    },
    proccessState () {
      const order = this.currentOrderMethod()
      if (this.state === 2) {
        if (order.table_is_reserved === true) {
          clearInterval(this.interval)
          this.state = 3
        }
        if (order.table_is_reserved === false) {
          clearInterval(this.interval)
          this.state = 4
        }
      }
    },
    runGoAndEat (tocart) {
      if (tocart === true) {
        // Если корзина в этом заведении
        this.$router.push(this.localePath({ path: '/profile/cart' }))
      } else {
        this.$router.push(this.localePath({ path: `/catering/${this.CURRENT_CATERING.id}/menu` }))
      }
      this.closeDialog()
    },
    closeDialog (redirectToCatering) {
      if (this.state === 4) {
        this.cancelCurrentOrder()
      }

      this.state = 1

      this.$store.commit('RESET_COPIED_CATERING_ORDER')
      this.$store.commit('SET_GOEATPOPUP', false)

      if (redirectToCatering) {
        this.$router.push(this.localePath({ path: `/catering/${redirectToCatering}` }))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/abstract/var";
@import "~/assets/styles/abstract/mixins";
@import "~/assets/styles/classes/class";

  .horizon{
    margin-top: 2rem;
    margin-bottom: 3rem;
    border-top:2px solid $c-line;
  }

  .aboutGo{
    position: relative;
    display: flex;
    border-radius: 0;
    overflow: auto;
    text-align:center;
    font-size:16px;
    z-index: 1000 !important;
    justify-content: center;
    flex: 100px 1 1;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;

    &__container {
      width: 100%;
    }

    @media screen and (min-width: 992px) {
      height: inherit;
    }
    .title {
      margin-bottom:1rem;
      font-weight: 100;
    }
    .steps{
      position:relative;
      margin: 0 0 1rem;
      cursor:initial;

      .step{
        position:relative;
        width:8em;
        font-size: 14px;
        text-transform: uppercase;
        text-align: center;

        &.step1 {
          display: flex;
          justify-content: flex-end;
        }

        &.step2 {
          display: flex;
        }
      }

      .spacer {
        margin: 0 2px;
        width: 6.7rem;

        @media screen and (max-width: 991px) {
          width: 5rem;
          margin: 0 12px;
        }

        @media screen and (max-width: 575px) {
          margin-left: 8px;
          margin-right: 8px;
        }

        &-desktop {
          width: 100%;
          opacity: 0.85;
          margin: -27px 0;
        }
        &-mobile {
          width: 100%;
          min-width: 5rem;
          margin: -20px 0;
        }
      }
    }
  }

  .p_containter{
      width: 28rem;
      .p_count{
        font-size: 14px;
        cursor:pointer;
        text-align:center;
        padding: .85rem 1.15rem;
        width: 40px;
        border-radius:7px;
        box-shadow: 0px 1px 2px #ddd;
        border: 1px solid #eee;
      }
      .p_count.active{
        background:$orange;
        box-shadow: 0px 1px 2px $orange;
        border: 1px solid $orange;
        color:white;
      }
      .p_count_img{
        filter:contrast(0);
        margin-right:.5rem;
      }
      .p_count_ar{
        cursor:pointer;
        transform:rotate(-180deg)
      }
      .p_count_al{
        cursor:pointer;
      }
      .select_cont{
        width:100%;
      }
  }

</style>

<style lang="scss" scoped>
@import "~/assets/styles/abstract/var";
@import "~/assets/styles/abstract/mixins";
@import "~/assets/styles/classes/class";

  .catering{
    border-top: 1px solid $c-line;

    .divider {
      display: none;
      margin-top: 1rem;
      margin-bottom: 1rem;
      border-top: 1px solid $c-line;

      @media screen and (max-width: 991px) {
        display: block;
      }
    }

    .youChoosed{
      margin-top: 1rem;
      font-size: 14px;
    }
    .cateringName,
    .cateringAddress  {
      font-size: 14px;
      font-weight: normal;
    }

    .btns{
      margin-top: 3rem;
      margin-bottom: 1rem;

      .btn {
        margin: 10px auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .waitManager {
      color: $c-magenta;
    }

  }

  @media screen and (max-width: 991px) {
    .waitManager {
      width: 80%;
    }

    .aboutGo{
      font-size:14px;

      &>div{
        width:85%;
        margin-left:auto;
        margin-right:auto;
      }
      .aboutText{
        font-weight:initial;
        color:#5d5d5d;
        text-align:center;
        width: 80%;
        margin: auto;
      }
      .title{
        font-size:14px;
        img{
          height:24px;
        }
      }
      .steps{
        font-weight:initial;
        color:#3b3b3b;
        margin-bottom: 1rem;
        .step{
          font-size: 14px;
          text-transform: initial;
          font-weight:initial;
          width: auto;
        }
      }
    }

    .catering{
      font-size: 14px;

      .youChoosed{
        font-size: 14px;
        color: #111;
        margin-top: 1rem;
        margin-bottom: 0rem;
      }

      .btns{
        display: block;
        width: 100%;
        margin-top: 3rem;
        .btn {

        }

        .btn.disabled {
          width:10em;
          margin-bottom:4rem;
        }
      }

    }

    .heading {
      &-title {
        img {
          height: 20px;
        }
        span {
          line-height: 16px;
          font-size: 22px;
        }
      }

      &>div{
        display:block;
      }
    }
  }

  @media screen and (min-width: 992px) {
    .heading {
      &-title {
        img {
          height: 22px;
        }
        span {
          line-height: 18px;
          font-size: 24px;
        }
      }
    }

  }
  .heading {
    &-title {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      margin-bottom: 10px;
      color: $c-green;

      span {
        display: block;
        margin-left: 10px;
        font-weight: 400;
      }
    }
  }

  .goeat-popup-back.mobile{
    position:absolute;
    left:0;
    top: 10px;
    font-size:14px;
    padding: 0 1rem;
  }
</style>

<style>

  .validBlock.error .res_lable{
    color:#EB608F !important;
  }
  .validBlock.error input,
  .validBlock.error .p_count,
  .validBlock.error .res_input.person,
  .validBlock .display-time.is-empty
  {
    color:#EB608F !important;
    border:1px solid #EB608F !important;
  }

  .reservation_form .mx-datepicker{
    width: 10em !important;
  }

  .selectOccasion .vs__dropdown-toggle{
    padding:.5rem;
  }

  .selectOccasion .vs__actions::before{
    display: block;
    content: " ";
    background-image: url('~assets/icons/L_arrow.svg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 12px;
    height: 12px;
    overflow: visible;
  }
  .selectOccasion .vs__open-indicator{
    display:none !important;
  }

  .selectOccasion .vs__dropdown-menu{
    border-color:#e2e2e2 !important;
    width:100%;
  }
  .selectOccasion .vs__dropdown-option{
    padding: .75rem;
    font-size: 16px !important;
  }
  .selectOccasion .vs__dropdown-menu > .vs__dropdown-option--selected,
  .selectOccasion .vs__dropdown-menu > .vs__dropdown-option--highlight{
    color: inherit;
    background: white;
  }

  @media screen and (max-width: 991px) {
    .selectOccasion .vs__actions{
      transform: rotate(90deg);
    }
    .some_small_inputs .mx-input,
    .some_small_inputs .mx-datepicker,
    .some_small_inputs .time-picker{
      height: 40px !important;
    }
    .some_small_inputs .mx-datepicker input,
    .some_small_inputs .time-picker input{
      font-size: 14px !important;
      height: 40px !important;
      border-radius:7px;
    }
    .selectOccasion .vs__dropdown-toggle{
      height: 40px !important;
      padding: .25rem .5rem;
      box-shadow: 0px 2px 5px #ddd;
      border: 1px solid #eee;
      border-radius:7px;
    }

    .res_input.time .dropdown,
    .res_input.time .time-picker .select-list{
      width:10rem !important
    }

    .res_input.time .dropdown .hint{
      display:none !important;
    }

  }
</style>
