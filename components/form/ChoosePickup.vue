<i18n>
{
  "en": {

    "dayLabel":"Day:",
    "timeLabel":"Time:",

      "prevBtn":"Back",
      "nextBtn":"Next",
      "nextBtnMobile":"Choose and go next",

      "choosePickupAddress":"Select time",
      "cateringDontWork":"The selected time for this order is too short or incorrect",

      "chooseOneOf":"Choose one of the provided methods below",
      "createAddress":"Add new address",

    "commentLabel" : "Description:",
    "commentPlaceholder" : "Comment text (maximun 100 symbols)",

    "needInTime" : "Need order in time",
    "addressMylocationLabel" : "Choose my geolocation",
    "addressFromAddressessLabel" : "Choose from 'my addresses' ",

    "pickupBtn" : "Accept reserv",
    "waitLabel" : "After selecting the data, wait for the confirmation of the booking from the manager",
    "checkYourFields" : "Check your fields",
    "waitNotify" : "Wait for manager's response",

    "dateframes": "You can make an order for another date, but no later than 7 days from the current",
    "howtopick1": "To receive an order in issue",
    "howtopick2": "name your",
    "howtopick3": "and order number:"
  },
  "ru": {

    "dayLabel":"День:",
    "timeLabel":"Время:",

      "prevBtn":"Назад",
      "nextBtn":"Оплатить",
      "nextBtnMobile":"Выбрать и продолжить",

      "choosePickupAddress":"Выберите время",
      "cateringDontWork":"Выбранное время для данного заказа слишком мало или оно некорректно",

      "chooseOneOf":"Выберите один из ниже предоставленых способов",
      "createAddress":"Добавить новый адрес доставки",

    "commentLabel" : "Комментарий к заказу:",
    "commentPlaceholder" : "Текст комментария (не более 100 символов)",

    "needInTime" : "Нужен заказ в определенное время",
    "addressMylocationLabel" : "Выбрать моё местоположение",
    "addressFromAddressessLabel" : "Выбрать адрес из списка 'мои адреса' ",

    "pickupBtn" : "Подтвердить бронирование",
    "waitLabel" : "После выбора данных дождитесь подтверждения бронирование от менеджера",
    "checkYourFields" : "Проверте введённую информацию",
    "waitNotify" : "Ожидайте подтверждения от менеджера",

    "dateframes": "Вы можете сделать заказ на другую дату, но не позже 7 дней от текущей",
    "howtopick1": "Для получения заказа в пункте выдачи",
    "howtopick2": "назовите Ваш ",
    "howtopick3": "и номер заказа: "
  }
}
</i18n>

<template>
  <div class="aboutPickup wide">
    <section class="deliverY">
      <div class="container" @click="closeDate()">
        <div class="body">
          <div class="pickup_form">
            <h1 class="title roboto text-20 green flex a_c j_c mb-2 mobile">
              <b>
                {{ $t('choosePickupAddress') }}
              </b>
            </h1>
            <h1 class="title roboto text-xxl flex a_c j_c mb-3 desktop">
              <b>
                {{ $t('choosePickupAddress') }}
              </b>
            </h1>

            <OrderingDetails />

            <div class="howtopick flex wide j_c pt-1 pb-1">
              <div class="text-center w-7 text-lg">
                {{ $t('howtopick1') }}<br>
                {{ $t('howtopick2') }} <span class="roboto green">ID: 00000{{ PERSONAL_DATA.id }}</span>
                {{ $t('howtopick3') }} <span class="roboto green">{{ orderUID(currentOrder.id) }}</span>
              </div>
            </div>

            <p v-if="cateringDontWork" class="wide text-center red mt-1e">
              <b class="text-lg">{{ $t('cateringDontWork') }}</b>
            </p>

            <div v-if="!isMobile" class="wrapPickupInfo desktop">
              <div class="pickup_columns flex wide j_c a_i">
                <div class="wide">
                  <div class="wide flex">
                    <div class="validBlock ml-2 text-left" :class="{error: $v.my_date.$error}">
                      <span class="res_lable text-lg">{{ $t('dayLabel') }}</span>
                      <div class="res_input date mt-1" @click.stop>
                        <DatePicker
                          v-model="$v.my_date.$model"
                          class="pickupDatePicker"
                          type="date"
                          :lang="lang"
                          format="DD.MM.YYYY"
                          placeholder="DD.MM.YYYY"
                          value-type="DD.MM.YYYY"
                          :default-value="new Date()"
                          :disabled-date="notBeforeToday"
                          :editable="false"
                          :clearable="false"
                          @input="$v.my_date.$touch()"
                          @change="handleChangeTime"
                        />
                      </div>
                    </div>

                    <div class="ml-1 validBlock w-4 text-left" :class="{error: $v.my_time_normal.$error}">
                      <span class="res_lable text-lg">{{ $t('timeLabel') }}</span>
                      <div class="res_input time mt-1" @click.stop>
                        <img class="time_img mobile" height="18" src="/icons/catering/new/clock-grey.svg">

                        <VueTimepicker
                          v-model="$v.my_time_normal.$model"
                          class="pickupTimePicker"
                          format="HH:mm"
                          placeholder="00:00"
                          :minute-interval="5"
                          close-on-complete
                          hide-clear-button
                          drop-direction="up"
                          @input="$v.my_time_normal.$touch()"
                          @change="handleChangeTime"
                        />
                      </div>
                    </div>
                  </div>
                  <p class="text-left ml-2 mt-1e text-14 grey">
                    {{ $t('dateframes') }}
                  </p>
                </div>
                <div class="ml-3 wide">
                  <div class="validBlock wide" :class="{error: $v.writeHere.$error}">
                    <p class="textareaWrap flex col a_c text-left wide text-xl">
                      <span class="wide text-left text-lg">{{ $t('commentLabel') }}</span>
                      <textarea
                        ref="comment_writeHere_update"
                        v-model="writeHere"
                        class="writeHere wide text-lg mt-1"
                        :class="{error: $v.writeHere.$error}"
                        :placeholder="$t('commentPlaceholder')"
                        @input="$v.writeHere.$touch()"
                      />
                      <span class="textarea_counter">{{ writeHere && writeHere.length }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="isMobile" class="wrapPickupInfo mobile">
              <div class="pickup_columns flex wide j_c a_i">
                <div class="w-9 ml-a mr-a">
                  <div class="wide flex j_b">
                    <div class="validBlock text-left" :class="{error: $v.my_date.$error}">
                      <div class="res_input date flex a_c" @click.stop>
                        <DatePicker
                          v-model="$v.my_date.$model"
                          class="pickupDatePicker"
                          type="date"
                          :lang="lang"
                          format="DD.MM.YYYY"
                          placeholder="DD.MM.YYYY"
                          value-type="DD.MM.YYYY"
                          :default-value="new Date()"
                          :disabled-date="notBeforeToday"
                          :editable="false"
                          :clearable="false"
                          @input="$v.my_date.$touch()"
                          @change="handleChangeTime"
                        />
                      </div>
                    </div>

                    <div class="ml-1 validBlock w-4 text-left" :class="{error: $v.my_time_normal.$error}">
                      <div class="res_input time flex a_c" @click.stop>
                        <img class="time_img mobile mr-1" height="18" src="/icons/catering/new/clock-grey.svg">
                        <VueTimepicker
                          v-model="$v.my_time_normal.$model"
                          class="pickupTimePicker"
                          format="HH:mm"
                          placeholder="00:00"
                          :minute-interval="5"
                          close-on-complete
                          hide-clear-button
                          drop-direction="up"
                          @input="$v.my_time_normal.$touch()"
                          @change="handleChangeTime"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-9 ml-a mr-a mt-2">
                  <div class="validBlock wide" :class="{error: $v.writeHere.$error}">
                    <p class="textareaWrap flex col a_c text-left wide text-lg">
                      <textarea
                        ref="comment_writeHere_update"
                        v-model="writeHere"
                        class="writeHere wide text-lg mt-1"
                        :class="{error: $v.writeHere.$error}"
                        :placeholder="$t('commentPlaceholder')"
                        @input="$v.writeHere.$touch()"
                      />
                      <span class="textarea_counter">{{ writeHere && writeHere.length }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <br>
            <div class="mt-1e flex j_c">
              <div class="buttonsCart desktop text-lg ">
                <div class="buttonsCart-prev">
                  <button class="prevBtn eatme-btn-grey" @click="goToBack">
                    <span> {{ $t("prevBtn") }}</span>
                  </button>
                </div>
                <div>
                  <button v-if="!($v.$invalid || cateringDontWork ) " class="nextBtn eatme-btn-red flex a_c j_c" @click="goToPayment()">
                    <span> {{ $t("nextBtn") }}</span>
                  </button>
                  <button v-else class="nextBtn eatme-btn-disabled flex a_c j_c">
                    <span> {{ $t("nextBtn") }}</span>
                  </button>
                </div>
              </div>
              <div class="buttonsCart mobile text-lg">
                <button class="prevBtn eatme-btn-grey" @click="goToBack">
                  <span> {{ $t("prevBtn") }}</span>
                </button>
                <button v-if="!($v.$invalid || cateringDontWork ) " class="nextBtn eatme-btn-red" @click="goToPayment()">
                  <span> {{ $t("nextBtn") }}</span>
                </button>
                <button v-else class="nextBtn eatme-btn-disabled">
                  <span> {{ $t("nextBtn") }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { required, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import DatePicker from 'vue2-datepicker'
import VueTimepicker from 'vue2-timepicker'

import 'vue2-datepicker/index.css'

export default {

  components: { DatePicker, VueTimepicker },
  props: {
    catering: {
      type: Object
    }
  },
  data () {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        }
      },
      cateringDontWork: false,
      isfromaddr: true,
      ismyloc: false,

      isWaitLabel: false,

      writeHere: '',
      needInTime: false,
      my_date: '',
      my_time: '',

      type: 'occasion',
      occasion: '',
      event: '',

      p_count: 0,
      tables: '',
      reserve_hall: false,
      reserve_all: false

    }
  },
  watch: {
    'my_date' (val) {
      if (this.CURRENT_CATERING_ORDER.order_date) {
        // Time from order
        let ctime = this.CURRENT_CATERING_ORDER.order_date.split(' ')
        ctime = ctime[1].split(':')
        this.my_time_normal = ctime[0] + ':' + ctime[1]
      } else {
        // Default time
        const tt = new Date()
        tt.setMinutes(tt.getMinutes() + ((this.CURRENT_CATERING_ORDER && this.CURRENT_CATERING_ORDER.max_cook_time) || 5) + 5)

        const normalize = n => (n < 10) ? ('0' + n) : n
        let minutes = normalize((~~(tt.getMinutes() / 5) + 1) * 5)
        let hours = normalize(tt.getHours())

        if (minutes === '60') {
          minutes = '00'
        }
        if (hours === '24') {
          hours = '00'
        }

        this.my_time_normal = hours + ':' + minutes
      }
    },
    'cateringDontWork' (val) {
      console.warn('cateringDontWork', val)
      if (val) {
        this.$v.$touch()
      }
    },
    'writeHere' (val) {
      if (val !== this.CURRENT_CATERING_ORDER.comment) {
        this.closeDate()
        this.$v.writeHere.$touch()
      }
    }
  },

  created () {
    this.$v.$reset()

    const tt = new Date()
    const normalize = n => (n < 10) ? ('0' + n) : n
    this.my_date = normalize(tt.getDate()) + '.' + normalize(tt.getMonth() + 1) + '.' + normalize(tt.getFullYear())
    this.writeHere = this.CURRENT_CATERING_ORDER.comment
  },

  validations: {
    my_date: {
      required
    },
    my_time_normal: {
      required
    },
    writeHere: {
      maxLength: maxLength(100)
    }
  },

  computed: {
    my_time_normal: {
      get () {
        return this.my_time
      },
      set (value) {
        this.my_time = value.replace('mm', '00').replace('HH', '00')
      }
    },
    cateringId () {
      const id = this.CART_ITEMS[0] && this.CART_ITEMS[0].catering_id
      return id
    },
    ...mapGetters(['RESERVE', 'CART_ITEMS', 'PERSONAL_DATA', 'CURRENT_CATERING', 'CURRENT_CATERING_ORDER'])
  },
  methods: {
    refreshCateringDontWork () {
      if (this.CURRENT_CATERING && this.my_time_normal) {
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

        let date = this.my_date ? this.my_date.split('.').reverse() : []
        date = date.join('-')

        let curWeekDay = this.my_date ? new Date(date) : new Date()
        const curWeekDayNumber = curWeekDay.getDate()
        curWeekDay = weekday[curWeekDay.getDay()]

        const d = new Date()
        const ddNumber = d.getDate()
        const dd = weekday[d.getDay()]
        console.warn('Current day', dd)
        const hh = d.getHours()
        const mmDelta = (this.CURRENT_CATERING_ORDER && this.CURRENT_CATERING_ORDER.max_cook_time) || 5 // Минимум за время готовки блюда
        const mm = (hh * 60) + mmDelta + d.getMinutes()
        console.warn('mmDelta', mmDelta, this.CURRENT_CATERING_ORDER)

        const hmtm = (hm) => {
          const bhm = hm.split(':')
          return bhm[0] * 60 + (+bhm[1])
        }
        let openM = null
        let closeM = null
        const nowM = hmtm(this.my_time_normal)

        const shedule = Object.values(this.CURRENT_CATERING.workTime)
        shedule.unshift(shedule.pop())

        for (const i in shedule) {
          const e = shedule[i]

          openM = hmtm(e.open)
          closeM = hmtm(e.close)

          if (closeM < openM) {
            // Увеличиваем конечную дату если ресторан работает например с 9 утра до часа ночи
            // чтобы конец интервала был больше начала
            closeM += 24 * 60
          }

          if ((dd === curWeekDay) && (ddNumber === curWeekDayNumber) && (nowM < mm)) {
            // Отсекаем даты до текущего момента
            this.cateringDontWork = 'smaller than now'
            return true
          }
          if ((dd === curWeekDay) && (ddNumber !== curWeekDayNumber) && (nowM >= (mm - (mmDelta * 2)))) {
            // Отсекаем время и даты через неделю
            this.cateringDontWork = 'larger than 7 days'
            return true
          }

          if ((e.day === curWeekDay) && (nowM <= openM || nowM >= closeM)) {
            this.cateringDontWork = 'not in range'
            return true
          }
        }
      }

      this.cateringDontWork = false
      return false
    },

    notBeforeToday (date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date < today || date > new Date(today.getTime() + 7 * 24 * 3600 * 1000)
    },
    notBeforeNow (date) {
      const now = new Date()

      const day = new Date(this.my_date).getTime()
      const dayN = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
      return (day === dayN) && (date < now)
    },

    /*
      @EVENTS
    */
    handleChangeTime (value) {
      requestAnimationFrame(() => {
        this.refreshCateringDontWork()
      })
    },
    goToPayment () {
      this.closeDate()

      this.$v.$touch()
      if (this.$v.$invalid && (!this.cateringDontWork)) {
        setTimeout(() => {
          this.$store.commit('SET_ERROR_NOTIFY', this.$t('checkYourFields'))
        }, 100)
      } else {
        const currentOrder = this.currentOrderMethod()

        const cookiz = this.$cookies
        const id = currentOrder.catering_id
        const orderID = currentOrder.id

        const form = {
          comment: this.writeHere
        }
        if (this.my_time_normal) {
          form.time = this.my_time_normal
        }
        if (this.my_date) {
          let date = this.my_date.split('.').reverse()
          date = date.join('-')
          form.date = date
        }
        this.$store.dispatch('PICKUP_TO_CURRENT_CATERING_ORDER', { cookiz, id, orderID, form }).then((res) => {
          const data = res && res.data
          console.warn('goToPayment PICKUP_TO_CURRENT_CATERING_ORDER', data)
          if (data && data.status === 'success') {
            if (data.order) { this.setOrder(data.order) }
            this.$router.push(this.localePath({ path: `/ordering/${id}/pay` }))
          } else {
            this.$store.commit('SET_ERROR_NOTIFY', true)
          }
        })
      }
    },
    closeDate () {
      // Hotfix
      this.refreshCateringDontWork()

      if (document.querySelector('.cell.active')) {
        document.querySelector('.cell.active').click()
      } else {
        document.querySelector('.cell.today') && document.querySelector('.cell.today').click()
      }
    },
    goToBack () {
      this.closeDate()
      this.$parent.$emit('close-popup')
    }

  }
}
</script>

<style lang="scss"  scoped>
  @import "~/assets/styles/abstract/var";
  @import "~/assets/styles/abstract/mixins";
  @import "~/assets/styles/classes/class";
  @import '~/assets/styles/modificator';

  .howtopick {
    border-top: 2px dotted #969696;
    border-bottom: 2px dotted #969696;
  }

  .orderPickup_group-select.error{
    border-color: $c-error !important;
     color: $c-error;
  }

  .FromAdressess{
    align-items:flex-start;
  }
  .res_tip{
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-top: 1px;
    font-size: 4rem;
    color: #E2E2E2;
    width: 2.5rem;
    flex: 0 0 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid #E2E2E2;

    line-height: 1rem;
  }
  .res_tip.active{
    color:$orange;
  }

  .wrapPickupInfo{
    width: 60em;
    max-width: 100%;
    margin: 1.5rem auto 1rem;
  }
  @media screen and (max-width: 991px) {
    .wrapPickupInfo{
      margin-top: 2rem;
    }
  }

  .infoWindow{
    padding: 0 0 4rem 0;
    /*border-top:1px dashed #E2E2E2;
    border-bottom:1px dashed #E2E2E2;*/

    text-align:center;
  }

  * ::selection { background: transparent !important; }

  .container{
    padding:0 1rem;
  }
  .header{
    padding:2rem 0 1rem;
    color: #555;
    border-bottom: 1px solid $c-line;
    .first{
      b{
        color: #979797;
        color: initial;
      }
      b, .spanid{
        margin-right:2rem;
      }
    }

    .route{
      display: flex;
      justify-content: center;
      align-items: center;
      border-width: 1px;
      border-style: solid;
      border-color: #A2A2A2;
      border-radius: 50%;
      padding: 6px;
      width: 30px;
      height: 30px;
      margin-left:1rem;
      box-shadow: 0px 4px 8px #1ca79012;
      cursor: pointer;
      img{
        filter: grayscale(1);
        height:16px;
      }
    }

    .social{
      &-review {
        font-family: $ff-gilroy;
        font-size: 14px;

        &-count {
          color: $c-green;
        }
      }
    }

    /*asda sd*/
    .headeractions{
      margin:0 .5rem 0 1rem;
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

          border: 1px solid #A2A2A2;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          &.desktop {
            @media screen and (min-width: 992px) {
              display: flex;
              border: 1px solid #A2A2A2;
              margin-left:.5rem;
            }
          }

          &.mobile {
            border: 1px solid $c-icon-green;
          }
        }
      }

  }

  .deliverY{
    position: relative;
    grid-area: body;
    display: flex;
    border-radius: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    flex-direction: column;
    font-size:16px;
  }

</style>

<style lang="scss"  scoped>

  @import "~/assets/styles/abstract/var";
  @import "~/assets/styles/abstract/mixins";
  @import "~/assets/styles/classes/class";

  .res_checkbox{
    display:flex;
    font-size: 14px;
  }
  .rchk2{
    margin-top:1rem;
  }

  .body{
    padding:1rem 0;

    .icon_table{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 7px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      box-shadow: 0px 4px 8px #1ca79012;
      border:1px solid $c-green;
      cursor: pointer;
      margin-right:1rem;
    }

    .pickup_form{
      padding: 2rem 4rem;
      width:100%;

      .costTitle{
        margin:1rem 0;
      }

      .buttonsCart {
        display: flex;

        button {
          white-space: nowrap;
        }
        .nextBtn {
          margin-left: 80px;
        }
        @media screen and (max-width: 992px) {
          flex-direction: row;
        }
        @media screen and (max-width: 425px) {
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .nextBtn {
            margin-bottom: 1rem;
            margin-left: 0;
          }
          .prevBtn {
            order: 2;
          }
          &-prev {
            order: 2;
          }
        }
      }
    }

    .some_small_inputs{
      &>div{
        margin-right:2rem;
        font-size: 14px;
        .res_input{
          position:relative;
          margin-top:.5rem;
          font-size: 16px;
          border:1px solid $c-line;
          border-radius: 5px;
          input{
            font-size: 16px;
          }
          span{
            display:inline-block;
            border-right:1px solid $c-line;
          }

          .time_img{
            position: absolute;
            top: 1rem;
            left: -2.15rem;
          }

          &.date{
            border:none;
            /deep/ .mx-input{
              height: 42px;
              border-radius: 5px;
              border-color:$c-line;
              font-family:$ff-gilroy;
              font-size: 14px;
            }
          }
          &.time{
            border:none;
            width:9rem;

            /deep/ .display-time {
              height: 42px;
              border-radius:5px;
              border-color:$c-line;
              font-family:$ff-gilroy;
              font-size:16px;
            }

            /deep/ .time-picker {
              height: 40px;
              border-radius:5px;
              width:100%;
              input {
              width:100%;
                font-size: 16px;
                padding: 1rem 0;
                text-align:center;
              }
            }
          }

          &.person{
            display:flex;
            span{
              padding:.75rem 1.35rem;
              &:last-child{
                border-right: none;
              }
            }
          }
        }
      }
    }

    .selectPlan{
      white-space: nowrap;
      padding: 0 2rem;
      height: 42px;
      border-radius:5px;
      border:1px solid $c-line;
      font-family:$ff-gilroy;
      font-size:16px;
      cursor:pointer;
      img{
        height:32px;
        margin-right:1rem;
      }
    }
    .selectTable {
      display: block;
      margin-top: 2.5rem;
      width: 100%;
      input{
        border: 1px solid #E2E2E2;
        border-radius: 5px;
        padding: 5px 10px;
        width: 100%;
        height: 40px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        text-align: left;
        font-family: inherit;
        font-size: inherit;
      }
    }

    .pickupBtn{
      margin-top: 10vh;
      margin-top: calc(var(--vh) * 10);
      width: 32rem;
      font-size: 16px;
    }
    .waitLabel{
      color: $c-error;
    }

  }
</style>

<style lang="scss"  scoped>
  .aboutPickup {
    z-index: 100;
  }

  @import "~/assets/styles/abstract/var";
  @import "~/assets/styles/abstract/mixins";
  @import "~/assets/styles/classes/class";

  @media screen and (max-width: 1280px) {
    .pickup_columns {
      justify-content:center;
      .col1{
        width:100% !important;
      }
      .some_small_inputs {
        width:100% !important;
        justify-content:space-between;
      }
      .select_cont {
        width:100% !important;
      }
      .select_cont .select{
        width:100% !important;
      }
    }
  }
  @media screen and (max-width: 991px) {

    .p_count{
      cursor:pointer;
      text-align:center;
      padding: .85rem 1.15rem;
      width: 40px;
      border-radius:7px;
      box-shadow: 0px 1px 4px #ddd;
      border: 1px solid #eee;
    }
    .p_count.active{
      background:$orange;
      box-shadow: 0px 1px 4px $orange;
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

    .res_lable{
      font-size:13px;
      color:$c-green;
      margin-bottom: 0.75rem !important;
      display:block;
    }

    .res_input{
      height: 32px !important;
      .time{
        width:10rem !important;
      }
    }
    .res_checkbox{
      height: 40px !important;
      padding: 0.5rem 1rem;
      border-radius:7px;
      box-shadow: 0px 2px 5px #ddd;
      border: 1px solid #eee;
      display:flex;
      align-items:center;
    }

    .body{
      font-size:14px;

      padding:0;
      .titleStep {
        margin-top: .25rem;
        justify-content: center;
        text-align:center;
        color:$c-green;
        font-size:18px;
        .icon_table{
          display:none;
        }
        b{
          width:65vw;
        }
      }

      .pickup_form{
        padding: 0 5%;
        .costTitle{
            text-align: center;
            .costTitle_value{
              font-family:$ff-roboto;
              font-size: 20px;
              font-weight: bold;
              color:$c-green;
            }
        }
      }

      .some_small_inputs{
        margin-bottom: 3rem;
        justify-content: space-between;

        .res_lable{
          display: none !important;
        }

        &>div{
          margin:0 !important;
          &:last-child{
            display:none;
          }
          .res_input{

            &.date{

              /deep/ .mx-input{
                border-radius:7px;
                box-shadow: 0px 2px 5px #ddd;
                border: 1px solid #eee;
              }
            }
            &.time{

              /deep/ .time-picker {

                input {
                  border-radius:7px;
                  box-shadow: 0px 2px 5px #ddd;
                  border: 1px solid #eee;
                }
              }
            }
          }
        }
      }
      .pickup_columns{
        display:block;

        .selectPlan{
            box-shadow: 0px 2px 5px #ddd;
            border: 1px solid #eee;
            border-radius:7px;
          }
          .selectTable {
            display:block;
            margin-top:2rem;
            width:100%;
            input{
              box-shadow: 0px 2px 5px #ddd;
              border: 1px solid #eee;
              border-radius:7px;
            }
        }
      }

      .pickupBtn{
        margin-top: 3rem;
      }

    }
  }

</style>

<style class="scss" scoped>
  .textareaWrap{
    position:relative;
  }

  .textareaWrap .textarea_counter{
    position:absolute;
    bottom: .5em;
    right:1.5em;
    font-size:.8em;
    background:white;
  }

  .writeHere{
    position:relative;
    margin-bottom: 3px;
    border-radius: 4px;
    font-size: 14px !important;

    border: 1px solid #E2E2E2;
    padding: 1rem;
    min-height: 6.5em !important;
    width: 100% !important;
    font-size: inherit;
  }
  .writeHere.error{
    border:1px solid #EB608F;
  }

</style>

<style>

  .pickupTimePicker {
    font-size: 14px !important;
    font-family: inherit !important;
  }
  .pickupTimePicker .mx-icon-calendar{
    display: none !important;
  }
  .pickupTimePicker input{
    border: 1px solid #E2E2E2 !important;
    background: white;
    border-radius: 5px !important;
    font-size: inherit !important;
    font-family: inherit !important;
    height: 4rem !important;
  }
  .pickupDatePicker {
    font-size: 14px !important;
    font-family: inherit !important;
  }
  .pickupDatePicker input{
    border: 1px solid #E2E2E2 !important;
    background: white;
    border-radius: 5px !important;
    font-size: inherit !important;
    font-family: inherit !important;
    height: 4rem !important;
  }
  .deliverY .orderPickup_group-select {
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    padding: 5px 10px 5px 3px;
    width: 100%;
    height: 40px;
    background: #fff 0 0 no-repeat padding-box;
  }
  .deliverY .orderPickup_group-select.disabled {
    background: #f8f8f8;
  }

  .deliverY .vs__dropdown-toggle {
    border: none;
  }

  .orderPickup_group_selectWrap{
    width: 24em;
  }
  .orderPickup_group_selectWrap .vs__selected{
    white-space: nowrap;
    width: 42rem;
    overflow: hidden;
  }

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

  .pickup_form .mx-datepicker{
    width: 10em !important;
  }

  .deliverY {
    text-align: center;
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

    .pickupTimePicker input{
      width: 100% !important;
    }

  }
</style>
