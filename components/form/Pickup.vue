<i18n>
{
  "en": {
    "title": "Booking a table",
    "youChoosed" : "You choosed a:",
    "place": "availible",
    "reviewsLabel": "Reviews",
    "noplace": "unavailible",
    "restorantLabel": "Restaurant",
    "attention": "If you want to make an order, click the button below",
    "startBtn" : "Get a vacant table",
    "startBtnMenu" : "Select dishes",
    "hasCartMessage": "You have cart in this catering",

    "pickupAvailible": "Takeaway available",

    "serviceDetails" : "The service includes the takeaway of dishes from the chosen restaurant to the address you specified on the current date",
    "secunda" : "sec",
    "minutes20" : "You have 20 minutes to choose dishes and pay for the order",
    "minutes20Notify" : "Attention! You have 20 minutes",
    "start" : "Takeaway service"
  },
  "ru": {
    "title": "Бронирование столика",
    "youChoosed" : "Вы выбрали:",
    "place": "Доступны",
    "reviewsLabel": "Отзывы",
    "noplace": "нет",
    "restorantLabel": "Ресторан",
    "attention": "Если хотите сделать заказ, нажмите кнопку ниже",
    "startBtn" : "Занять свободный стол",
    "startBtnMenu" : "Выбрать блюда",
    "hasCartMessage": "У Вас есть корзина в этом заведении",

    "pickupAvailible" : "Еда на вынос доступна",

    "serviceDetails" : "Сервис включает в себя заказ блюд в даном заведении с последующим самовывозом",
    "secunda" : "сек",
    "minutes20" : "У Вас есть 20 минут на выбор блюд и оплату заказа",
    "minutes20Notify" : "Внимание! У Вас есть 20 минут",
    "start" : "Еда на вынос"
  }
}
</i18n>

<template>
  <section v-if="!$_.isNil(CURRENT_CATERING)" class="aboutPickup">
    <div>
      <div class="heading w-75">
        <h1 class="desktop title roboto flex a_c j_c text-22">
          <b>{{ $t('start') }}</b>
        </h1>
        <h1 class="mobile title roboto green flex a_c j_c">
          <b>{{ $t('start') }}</b>
        </h1>
        <div class="flex j_c mb-1 text-lg">
          {{ $t('serviceDetails') }}
        </div>
      </div>

      <div class="catering text-lg">
        <p class="youChoosed">
          {{ $t('youChoosed') }}
        </p>
        <h2 class="cateringName text-lg text-normal">
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
            <p class="cateringMenu_rate-review ml-1">
              {{ $t('reviewsLabel') }}:
              <span class="green">{{ CURRENT_CATERING.reviewsCount }}</span>
            </p>
          </div>
          <p class="desktop more_seats ml-1">
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
          <p class="more_seats">
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

        <div
          v-if="CURRENT_CATERING && cartCatering() === CURRENT_CATERING.id"
          class="flex j_c wide mt-1e"
        >
          <p class="text-bold">
            {{ $t('hasCartMessage') }}
          </p>
        </div>

        <p class="horizon wide mobile" />

        <template v-if="state === 1">
          <div class="aboutPickup__time roboto green mt-1e mb-1 text-xl">
            <p>
              {{ $t('pickupAvailible') }}:
              <span
                class="flex_inline"
              >{{ cattime.open }} - {{ cattime.close }}</span>
            </p>
          </div>

          <div class="attention">
            <span>{{ $t('attention') }}</span>
          </div>

          <div class="flex wide j_c mt-3">
            <div
              class="btn eatme-btn-colorful startBtnMenu"
              @click="runPickup()"
            >
              <span>{{ $t('startBtnMenu') }}</span>
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
      type: 'go_and_eat',
      person_quantity: 1,
      p_count: 0,
      secunda: 0,
      state: 1
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
      'IS_GOEATPOPUP',
      'COPIED_CATERING_ORDER'
    ]),
    cattime () {
      const weekday = new Array(7)
      if (this._i18n.locale === 'ru') {
        weekday[0] = 'Вс'
        weekday[1] = 'Пн'
        weekday[2] = 'Вт'
        weekday[3] = 'Ср'
        weekday[4] = 'Чт'
        weekday[5] = 'Пт'
        weekday[6] = 'Сб'
      } else {
        weekday[0] = 'Sun'
        weekday[1] = 'Mon'
        weekday[2] = 'Tue'
        weekday[3] = 'Wed'
        weekday[4] = 'Thu'
        weekday[5] = 'Fri'
        weekday[6] = 'Sat'
      }

      let curWeekDay = new Date()
      curWeekDay = weekday[curWeekDay.getDay()]

      const shedule = Object.values(this.CURRENT_CATERING.workTime)
      shedule.unshift(shedule.pop())

      for (const i in shedule) {
        const e = shedule[i]
        if (e.day === curWeekDay) {
          return e
        }
      }
      return {}
    }
  },
  beforeDestroy () {
    this.$store.commit('RESET_COPIED_CATERING_ORDER')
  },
  methods: {
    async runPickup () {
      if (localStorage.personquantity) {
        this.person_quantity = +localStorage.personquantity || 1
        localStorage.removeItem('personquantity')
      }

      const id = this.CURRENT_CATERING.id
      const orderType = 'pickup'
      const personQuantity = this.person_quantity
      const cookiz = this.$cookies

      if (this.COPIED_CATERING_ORDER) {
        await this.$store.dispatch('REPEAT_ORDER', {
          cookiz,
          order: this.COPIED_CATERING_ORDER
        })
      } else {
        await this.createOrder(id, orderType, personQuantity)
      }

      await this.$store.dispatch('GET_PERSONAL_DATA', cookiz)

      this.$store.commit('RESET_COPIED_CATERING_ORDER')

      await this.$router.push(this.localePath({ path: `/catering/${id}/menu` }))
      this.$store.commit('SET_PICKUPPOPUP', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';

.horizon {
  margin-top: 1rem;
  border-top: 1px solid $c-line;
}

.aboutPickup {
  position: relative;
  display: flex;
  border-radius: 0;
  width: 100%;
  overflow: auto;
  text-align: center;
  font-size: 16px;
  z-index: 1000 !important;
  justify-content: center;

  @media screen and (min-width: 992px) {
    height: inherit;
  }

  .title {
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

.catering {
  border-top: 1px solid $c-line;
  margin: auto;
  max-width: 580px;

  .youChoosed {
    font-size: 14px;
    margin-top: 1rem;
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

  .attention {
    width: 80%;
    margin: 10px auto 0;
    font-size: 14px;
    line-height: 16px;
    color: $c-magenta;
  }
}

@media screen and (max-width: 991px) {
  .heading {
    max-width: 500px;
    width: 100% !important;
  }

  .heading {
    padding-left: 15px;
    padding-right: 15px;
  }

  .aboutPickup {
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
      font-size: 20px;
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
      color: #111;
      margin-top: 1rem;
      margin-bottom: 0rem;
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

.reservation_form .mx-calendar-content .cell.active {
  background-color: #f3bd44 !important;
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
