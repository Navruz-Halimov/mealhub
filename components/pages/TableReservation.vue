<i18n>
{
  "en": {
    "title" : "Reserve a table",
    "seats" : "Total seats",
    "infoTime" : "You can book a table or a hall",
    "from" : "from",
    "to" : "to",
    "infoPrice" : "1 table reservation cost",
    "free" : "FREE",
    "infoError" : "first please choose the table",
    "titleTable" : "First, choose a table on the presented plans of halls of the catering point:",
    "titleHall" : "Book 1 hall",
    "placeholderHall" : "Enter here № of the hall",
    "titleNumbers" : "Write here the number of preffed tables:",
    "placeholderNumbers" : "Enter numbers separated by commas",
    "titleOccasion" : "Choose an occasion:",
    "placeholderOccasion" : "Choose an occasion",
    "titleComment" : "Write here your comment:",
    "placeholderComment" : "No more than 5000 symbols",
    "attention" : "After selecting the data, press the \"Confirm booking\" button and wait for the confirmation of the booking from the manager. Confirmation timeout: 60 minutes.",
    "confirmBtn" : "Confirm booking",
    "reserveIsFinished": "Your message has been sent to the operator. Await reservation confirmation."
  },
  "ru": {
    "title" : "Забронируйте стол в заведении",
    "seats" : "Всего посадочных мест",
    "infoTime" : "Вы можете забронировать в заведении столы и или целый зал",
    "from" : "с",
    "to" : "до",
    "infoPrice" : "Стоимость брони",
    "free" : "БЕСПЛАТНО",
    "infoError" : "(выберите столы, чтобы узнать стоимость)",
    "titleTable" : "Выберите номера столов на плане залов заведения:",
    "titleHall" : "Бронь целого зала",
    "placeholderHall" : "Введите № зала",
    "titleNumbers" : "Впишите выбранные на плане номера столов:",
    "placeholderNumbers" : "Введите номера через запятую",
    "titleOccasion" : "Выберите мероприятие:",
    "placeholderOccasion" : "Выбрать из списка",
    "titleComment" : "Оставьте комментарий к брони:",
    "placeholderComment" : "Не более 5000 символов",
    "attention" : "После выбора данных нажмите кнопку \"Подтвердить бронирование\" и дождитесь подтверждения бронирования от менеджера. Время ожидания подтверждения 60 мин.",
    "confirmBtn" : "Подтвердить бронирование",
    "reserveIsFinished": "Ваше сообщение отправлено оператору. Ожидайте подтверждения бронирования"
  }
}
</i18n>

<template>
  <section v-if="!$_.isNil(currentCatering)" class="reservation">
    <p class="reservation__back">
      <addition-back />
    </p>
    <div class="reservation__container">
      <OrderingHeader v-if="currentCatering.id" type="reserv" />
      <div class="reservation__body">
        <p class="reservation__title">
          <booking-table-icon
            icon-width="36px"
            icon-height="36px"
            bg-color="#24A391"
          />
          <!-- <img src="/icons/catering/booking-table-green.svg" alt=""> -->
          {{ $t('title') }}
        </p>
        <p class="reservation__seats">
          {{ $t('seats') }}: {{ totalPlacesAmount }}
        </p>
        <div class="reservation__info">
          <span>{{ $t('infoTime') }}
            <span class="nowrap">
              {{
                `${$t('from')} ${workTime.open} ${$t('to')} ${workTime.close}`
              }}
            </span></span><br>
          <span>{{ $t('infoPrice') }}:
            <span
              v-if="isTablesFree && bookedTables.length !== 0"
              class="nowrap green"
            >
              {{ $t('free') }}</span>
            <template v-else>
              <span v-if="reservationCost === 0" class="nowrap">
                <span class="roboto green"> ...</span>
              </span>
              <span v-else class="nowrap green">
                <span class="gilroy"> &#8381; </span>
                {{ reservationCost }}
              </span>
            </template> </span><br>
          <span v-if="bookedTables.length === 0" class="errorText">
            {{ $t('infoError') }}
          </span>
        </div>
        <div class="reservation__pickers">
          <div
            class="reservation__pickers_date"
            :class="{ disabled: isDisabled }"
          >
            <div class="date">
              <img src="/icons/catering/new/calendar.svg" alt="">
              <basic-input-date
                :initial-date="initialDatetime"
                :is-disabled="isDisabled"
                @picked-date="getFormattedDate"
              />
            </div>
            <div class="time">
              <img src="/icons/catering/new/clock-black.svg" alt="">
              <basic-input-time
                :initial-time="initialDatetime"
                :is-disabled="isDisabled"
                :is-error="isTimeAvailable"
                @picked-time="getFormattedTime"
              />
            </div>
          </div>
          <div class="reservation__pickers_people">
            <img
              src="/icons/movement/foot.svg"
              alt=""
              :class="{ disabled: isDisabled }"
            >
            <basic-input-people
              v-model="peopleQuantity"
              :people="20"
              :initial-slide="initialPeopleQuantity"
              :is-disabled="isDisabled"
              class="slider"
            />
          </div>
        </div>

        <div class="reservation__table">
          <span :class="{ disabled: isHall || isDisabled }">{{
            $t('titleTable')
          }}</span>
          <basic-input-halls
            v-model="hall"
            :halls="halls"
            :is-disabled="isHall || isDisabled"
            :initial-slide="initialHall"
            @plan-preview="showPlanPreview"
          />
        </div>
        <div v-if="!denyReserveHall" class="reservation__hall">
          <basic-input-checkbox
            v-model="isHall"
            class="checkbox"
            :is-disabled="isDisabled"
            :class="{ errorText: isHallError, disabled: isDisabled }"
          >
            {{ $t('titleHall') }}
          </basic-input-checkbox>
          <basic-input-profile-text
            v-model.trim="selectedHallNumber"
            :is-disabled="!isHall || isDisabled"
            :is-error="isHallError"
            :placeholder="$t('placeholderHall')"
            :class="{
              disabled:
                (!isHall && $v.numbers.$model) ||
                (!isHall && !$v.hall.$error) ||
                isDisabled
            }"
          />
        </div>
        <div class="reservation__occasion">
          <span
            :class="{ errorText: $v.occasion.$error, disabled: isDisabled }"
          >
            {{ $t('titleOccasion') }}
          </span>
          <basic-input-profile-select
            v-model="occasion"
            label="occasion"
            :reduce="item => item.id"
            :options="occasions"
            :is-disabled="isDisabled"
            :is-error="$v.occasion.$error"
            :placeholder="$t('placeholderOccasion')"
          />
        </div>
        <div
          class="reservation__numbers"
          :class="{ disabled: isHall || isDisabled }"
        >
          <span :class="{ errorText: isNumbersError && !isHall }">
            {{ $t('titleNumbers') }}
          </span>
          <basic-input-profile-text
            v-model="numbers"
            :placeholder="$t('placeholderNumbers')"
            :is-disabled="isHall || isDisabled"
            :is-error="isNumbersError && !isHall"
            @input="updateNumbers"
          />
        </div>
        <div class="reservation__comment">
          <span :class="{ disabled: isDisabled }">{{
            $t('titleComment')
          }}</span>
          <textarea
            ref="comment"
            v-model="comment"
            class="reservation__comment_text"
            :class="{ error: $v.comment.$error, disabled: isDisabled }"
            :placeholder="$t('placeholderComment')"
            :readonly="isDisabled"
            @input="changeComment"
          />
        </div>
        <span class="reservation__attention">
          {{ $t('attention') }}
        </span>
        <button
          v-if="!isReserveAdded"
          class="reservation__btn eatme-btn-red"
          @click="createReservation"
        >
          {{ $t('confirmBtn') }}
        </button>
        <button v-else class="reservation__btn eatme-btn-disabled">
          {{ $t('confirmBtn') }}
        </button>
      </div>
    </div>
    <popup-notification v-if="selectedHallData" @close-popup="closePlanPreview">
      <form-plan :hall-data="selectedHallData" @close-plan="closePlanPreview" />
    </popup-notification>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  required,
  numeric,
  maxLength,
  requiredIf
} from 'vuelidate/lib/validators'

export default {
  props: {
    currentCatering: {
      type: Object,
      default: () => ({})
    },
    halls: {
      type: Array,
      default: () => []
    },
    totalPlacesAmount: {
      type: Number,
      default: 0
    },
    occasions: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      order: null,
      date: '',
      time: '',
      isHall: false,
      hall: -1,
      initialHall: 1,
      selectedHallNumber: '',
      bookedTables: [],
      peopleQuantity: 1,
      initialPeopleQuantity: 1,
      numbers: '',
      occasion: '',
      comment: '',
      isReserveAdded: false,
      selectedHallData: '',
      initialDatetime: null,
      isReserveRejected: false
    }
  },
  computed: {
    ...mapGetters(['CURRENT_POPUPS_FIRST_ITEM']),
    isDisabled () {
      return this.isReserveAdded
    },
    orderId () {
      return this.$route.params.id
    },
    workTime () {
      const weekDaysAmount = 7
      const currentDay = new Date().getDay()
      const dayIndex = (currentDay - 1 + weekDaysAmount) % weekDaysAmount
      return this.currentCatering.workTime[dayIndex]
    },
    isTimeAvailable () {
      let workTime
      if (!this.date) {
        workTime = this.workTime
      } else {
        const weekDaysAmount = 7
        // const selectedDate = new Date(...[this.date.split('-')])
        const selectedDate = new Date(this.date.replace(/-/g, '/'))
        const selectedDay = selectedDate.getDay()
        const dayIndex = (selectedDay - 1 + weekDaysAmount) % weekDaysAmount
        workTime = this.currentCatering.workTime[dayIndex]
      }

      if (workTime !== undefined) {
        let open = workTime.open
        open = open.split(':')
        let close = workTime.close
        close = close.split(':')
        let choosedTime = this.time
        choosedTime = choosedTime.split(':')

        if (+open[0] <= +choosedTime[0] && +close[0] > +choosedTime[0]) {
          if (+open[1] <= +choosedTime[1]) {
            return false
          } else {
            return true
          }
        } else if (+close[0] < +open[0] && +open[0] <= +choosedTime[0]) {
          if (+close[1] <= +choosedTime[1]) {
            return false
          } else {
            return true
          }
        } else if (+close[0] < +open[0] && +close[0] > +choosedTime[0]) {
          if (+close[1] <= +choosedTime[1]) {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      } else {
        return false
      }
    },
    reservationCost () {
      return this.getReservationCost()
    },
    selectedHallIndex () {
      return this.getHallIndexById(this.hall)
    },
    isTablesFree () {
      if (!this.halls.length) {
        return false
      }

      const selectedHall = this.hall !== -1 ? this.selectedHallIndex : 0
      const firstReservePrice = +this.halls[selectedHall].tables[0]
        .reserve_price

      return !firstReservePrice
    },
    isNumbersError () {
      if (this.bookedTables.length === 0 && this.$v.numbers.$model) {
        this.$v.numbers.$touch()
      }
      return (
        this.$v.numbers.$error ||
        (this.bookedTables.length === 0 && this.$v.numbers.$dirty) ||
        this.isReserveRejected
      )
    },
    isHallError () {
      if (!this.isHall && this.$v.numbers.$model) {
        this.$v.hall.$reset()
      }
      if (
        this.isHall &&
        this.bookedTables.length === 0 &&
        this.$v.hall.$model
      ) {
        this.$v.hall.$touch()
      }
      return this.$v.hall.$error && !this.isReserveRejected
    },
    activeEvent () {
      return this.CURRENT_POPUPS_FIRST_ITEM
    },
    isActiveReserveRejected () {
      if (!this.activeEvent) {
        return false
      }

      // if (this.activeEvent.type === 'wait_reserve_confirmed') { return true }
      // if (this.activeEvent.type === 'wait_reserve_confirmed_free') { return true }
      if (this.activeEvent.type === 'wait_reserve_rejected') {
        return true
      }
      // if (this.activeEvent.type === 'wait_reserve_rejected_reason') { return true }

      return false
    },
    denyReserveHall () {
      return this.currentCatering?.deny_reserve_hall
    },
    reserveInfo () {
      return this.order?.reserve
    },
    tmpReserve () {
      return this.order?.tmp_reserve
    }
  },
  watch: {
    selectedHallNumber (value) {
      const hallIndex = this.getHallIndexByNumber(+value)
      if (hallIndex !== -1) {
        this.hall = this.halls[hallIndex].id
      } else {
        this.hall = -1
      }
    },
    numbers () {
      this.updateBookedTables()
    },
    selectedHallIndex () {
      this.updateBookedTables()
    },
    isHall (value) {
      if (this.isReserveRejected) {
        this.isReserveRejected = false
      }

      if (!value) {
        this.hall = -1
        this.selectedHallNumber = ''
      }
    },
    isActiveReserveRejected (value) {
      if (value) {
        this.isHall = false
        this.numbers = ''
        this.hall = -1
        this.isReserveRejected = true
        this.isReserveAdded = false
      }
    }
  },
  validations: {
    date: {
      required
    },
    time: {
      required
    },
    hall: {
      numeric,
      required: requiredIf(function () {
        return !this.isHall && this.bookedTables.length === 0
      })
    },
    numbers: {
      required: requiredIf(function () {
        return this.isHall && this.bookedTables.length === 0
      })
    },
    occasion: {
      required
    },
    comment: {
      maxLength: maxLength(5000)
    }
  },
  async mounted () {
    this.order = await this.$database.orders.getById(this.orderId)
    this.updateInitialValues()
    this.changeComment()
  },
  methods: {
    changeComment () {
      this.$v.comment.$touch()
      const el = this.$refs.comment
      el.style.minHeight = '65%'
      const fullHeight = el.scrollHeight
      el.style.minHeight = `${fullHeight}px`
    },
    updateInitialDatetime () {
      const date = this.order?.order_date
      if (date) {
        this.initialDatetime = new Date(date)
        return
      }

      const orderType = this.order?.order_type
      const dateValue = new Date()
      if (orderType === 'reserve_table') {
        dateValue.setHours(dateValue.getHours() + 2)
      } else if (orderType === 'pre_order') {
        dateValue.setDate(dateValue.getDate() + 1)
      }

      this.initialDatetime = dateValue
    },
    updateInitialPeopleQuantity () {
      this.initialPeopleQuantity = this.peopleQuantity
    },
    updatePeopleQuantity () {
      this.peopleQuantity = this.order?.person_quantity ?? 1
      this.updateInitialPeopleQuantity()
    },
    updateInitialNumbers () {
      const tables = this.order?.reserve?.tables
      if (tables) {
        this.isReserveRejected = true
      }
    },
    updateInitialOccasion () {
      const occasion = this.order?.reserve?.occasion
      if (!occasion) {
        return
      }

      const occasionItem = this.occasions.find(
        item => item.occasion === occasion
      )
      if (!occasionItem) {
        return
      }

      this.occasion = occasionItem
    },
    updateInitialComment () {
      this.comment = this.order?.comment || this.reserveInfo?.comment || ''
    },
    copyPeopleQuantity () {
      this.peopleQuantity = this.order?.person_quantity ?? 1
      this.updateInitialPeopleQuantity()
    },
    copyHall () {
      const table = this.tmpReserve.tables_list[0]
      this.hall = table?.hall_number ?? -1
      this.initialHall = this.selectedHallIndex + 1
    },
    copyTables () {
      const tablesList = this.tmpReserve.tables_list
      const hallIndex = this.getHallIndexById(this.hall)
      const selectedHall = this.halls[hallIndex]

      if (
        tablesList.length === selectedHall.tables.length &&
        !this.denyReserveHall
      ) {
        this.isHall = true
        const hallNumber = selectedHall.hall_number
        this.selectedHallNumber = hallNumber ? hallNumber.toString() : ''
      } else {
        this.numbers = tablesList.map(item => item.table_number).join(', ')
      }
    },
    copyOccasion () {
      const occasionItem = this.occasions.find(
        item => item.id === this.tmpReserve.occasion_id
      )
      if (!occasionItem) {
        return
      }

      this.occasion = occasionItem
    },
    copyComment () {
      this.comment = this.tmpReserve?.comment ?? ''
    },
    updateInitialValues () {
      this.updateInitialDatetime()

      if (this.tmpReserve) {
        this.copyPeopleQuantity()
        this.copyHall()
        this.copyTables()
        this.copyOccasion()
        this.copyComment()
      } else {
        this.updatePeopleQuantity()
        this.updateInitialNumbers()
        this.updateInitialOccasion()
        this.updateInitialComment()
      }
    },
    updateNumbers () {
      if (this.isReserveRejected) {
        this.isReserveRejected = false
      }
    },
    showPlanPreview (hallData) {
      this.selectedHallData = hallData
    },
    closePlanPreview () {
      this.selectedHallData = ''
    },
    getHallIndexById (id) {
      return this.halls.findIndex(item => item.id === id)
    },
    getHallIndexByNumber (number) {
      return this.halls.findIndex(item => item.hall_number === number)
    },
    checkBookedTable (newTable, bookedTables) {
      if (!newTable) {
        return false
      }

      const matchInList = bookedTables.find(
        item => item.table_number === newTable.table_number
      )
      return !matchInList
    },
    getBookedTablesFromSelected (selectedHall, tableNumbers) {
      let bookedTables = []

      for (const number of tableNumbers) {
        const match = selectedHall.tables.find(
          item => item.table_number === number
        )

        if (this.checkBookedTable(match, bookedTables)) {
          bookedTables.push(match)
        } else {
          bookedTables = []
          break
        }
      }

      return bookedTables
    },
    updateBookedTables () {
      if (this.selectedHallIndex === -1) {
        this.bookedTables = []
        return
      }

      const selectedHall = this.halls[this.selectedHallIndex]

      if (this.isHall) {
        this.bookedTables = selectedHall.tables
        return
      }

      const noSpaces = this.numbers.replaceAll(' ', '')
      const tableNumbers = noSpaces
        .substr(
          0,
          noSpaces[noSpaces.length - 1] === ','
            ? noSpaces.length - 1
            : noSpaces.length
        )
        .split(',')

      this.bookedTables = this.getBookedTablesFromSelected(
        selectedHall,
        tableNumbers
      )
    },
    getReservationCost () {
      if (!this.halls.length || this.isTablesFree) {
        return 0
      }

      const totalPrice = this.bookedTables.reduce(
        (prev, item) => prev + +item.reserve_price,
        0
      )
      return Math.floor(totalPrice * 100) / 100
    },
    getFormattedDate (newDate) {
      this.date = newDate
    },
    getFormattedTime (newTime) {
      this.time = newTime
    },
    async addReserveToOrder (createdReserve) {
      const cateringId = this.currentCatering.id
      const orderId = this.orderId
      const reserveId = createdReserve.id
      const personQuantity = this.peopleQuantity
      await this.$database.reservation.reserveToOrder(
        cateringId,
        orderId,
        reserveId,
        personQuantity
      )
    },
    async createReservation () {
      this.$v.$touch()

      if (!this.$v.$invalid && !this.isTimeAvailable) {
        this.isReserveAdded = true

        const requestBody = {
          date: this.date,
          time: this.time,
          tables: this.bookedTables,
          personQuantity: this.peopleQuantity,
          occasion: this.occasion ? this.occasion.id : -1,
          comment: this.comment
        }

        try {
          const cateringId = this.currentCatering.id
          const createdReserve = await this.$database.reservation.create(
            cateringId,
            requestBody
          )
          await this.addReserveToOrder(createdReserve)

          this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('reserveIsFinished'))
        } catch {
          this.isReserveAdded = false
        }
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

.reservation {
  position: relative;
  border-radius: 0;
  background-color: $c-light;
  height: 100%;
  width: 100%;
  overflow: auto;
  font-size: 14px;
  @media screen and (max-width: 991px) {
    width: 100vw;
  }

  .error {
    border: 1px solid $magenta;
    color: $magenta;
  }
  .errorText {
    color: $magenta;

    /deep/ .checkbox-icon {
      border: 1px solid $magenta;
    }
  }
  .disabled {
    filter: grayscale(1);
    opacity: 0.3;
    cursor: default;
  }

  &__container {
    padding: 1rem 2rem;
  }
  &__body {
    @media screen and (max-width: 991px) {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 0.5fr repeat(8, auto) 1fr;
      grid-template-areas: 'seats' 'info' 'pickers' 'table' 'numbers' 'hall' 'occasion' 'comment' 'attention' 'btn';
    }

    @media screen and (min-width: 992px) {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(7, auto);
      gap: 20px 20px;
      grid-template-areas:
        'title title title title title title'
        'seats seats info info info info'
        'pickers pickers pickers pickers pickers pickers'
        'table table table table hall hall'
        'numbers numbers numbers occasion occasion occasion'
        'comment comment comment comment attention attention'
        'btn btn btn btn btn btn';
    }

    @media screen and (min-width: 1366px) {
      display: grid;
      grid-template-columns: 0.5fr 0.6fr 0.2fr 0.3fr 0.5fr 0.5fr 0.2fr repeat(
          3,
          0.5fr
        );
      grid-template-rows: auto 42px repeat(5, auto);
      gap: 20px 0px;
      grid-template-areas:
        'title title title title title . . . seats seats'
        'pickers pickers pickers pickers pickers pickers . info info info'
        'table table table . hall hall . info info info'
        'numbers numbers . occasion occasion occasion . comment comment comment'
        '. . . . . . . comment comment comment'
        'attention attention attention attention attention attention attention attention attention attention'
        'btn btn btn btn btn btn btn btn btn btn';
    }
  }

  &__title {
    grid-area: title;
    display: flex;
    align-items: center;
    font: normal normal bold 16px/22px Roboto Slab;
    svg {
      margin-right: 1rem;
    }
    @media screen and (max-width: 991px) {
      display: none;
    }
  }
  &__seats {
    grid-area: seats;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font: normal normal 400 14px/20px Gilroy-Light;
    @media screen and (max-width: 991px) {
      margin: 0 auto;
    }
    @media screen and (min-width: 992px) and (max-width: 1365px) {
      justify-content: flex-start;
    }
  }
  &__info {
    grid-area: info;
    width: 100%;
    padding: 14px;
    margin-bottom: auto;
    font: normal normal 400 14px/16px Gilroy-Light;
    background: #f3bd4424;
    @media screen and (max-width: 991px) {
      margin-bottom: 2rem;
    }

    span {
      &.error {
        color: $magenta;
      }
    }
  }
  &__pickers {
    grid-area: pickers;
    width: 60%;
    display: flex;
    align-items: flex-start;
    @media screen and (max-width: 991px) {
      flex-direction: column;
      order: 2;
      width: 100%;
      margin-bottom: 20px;
    }

    &_date {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media screen and (max-width: 991px) {
        margin: 0 auto;
      }

      .date {
        width: 175px;
        max-height: 40px;
        position: relative;
        padding-left: 26px;
        @media screen and (max-width: 991px) {
          width: 155px;
        }

        img {
          width: 20px;
          position: absolute;
          top: 10px;
          left: 0;
          @media screen and (max-width: 991px) {
            top: 7px;
          }
        }
        &-picker {
          height: 40px;
        }
      }
      .time {
        width: 130px;
        max-height: 40px;
        position: relative;
        margin-left: 26px;
        @media screen and (max-width: 991px) {
          width: 102px;
        }

        img {
          width: 20px;
          position: absolute;
          top: 10px;
          left: 0;
          @media screen and (max-width: 991px) {
            top: 7px;
          }
        }
        &-picker {
          height: 40px;
        }
      }
    }
    &_people {
      width: 100%;
      position: relative;
      margin-left: 20px;

      img {
        width: 10px;
        filter: contrast(0);
        position: absolute;
        top: 10px;
      }
      .slider {
        margin-left: 20px;
      }
      @media screen and (max-width: 991px) {
        max-width: 300px;
        margin: 20px auto 0;
      }
      @media screen and (min-width: 992px) {
        max-width: 100px;
      }
      @media screen and (min-width: 1051px) {
        max-width: 143px;
      }
      @media screen and (min-width: 1130px) {
        max-width: 236px;
      }
      @media screen and (min-width: 1230px) {
        max-width: 321px;
      }
      @media screen and (min-width: 1366px) {
        max-width: 143px;
      }
      @media screen and (min-width: 1500px) {
        max-width: 230px;
      }
      @media screen and (min-width: 1650px) {
        max-width: 280px;
      }
      @media screen and (min-width: 1750px) {
        max-width: 363px;
      }
    }
  }
  &__table {
    position: relative;
    grid-area: table;
    width: 100%;
    @media screen and (max-width: 991px) {
      margin-bottom: 2rem;
    }
  }
  &__hall {
    grid-area: hall;
    @media screen and (max-width: 991px) {
      margin-top: 2rem;
      display: flex;
    }

    .checkbox {
      margin-bottom: 0.5rem;
      @media screen and (max-width: 991px) {
        margin: 0 6px 0 0;
        min-width: 120px;

        /deep/ .checkbox-icon {
          box-shadow: 0px 3px 6px #11100029;
          margin-right: 6px;
        }
      }
    }
  }
  &__occasion {
    grid-area: occasion;
    align-self: flex-end;
    @media screen and (max-width: 991px) {
      margin-top: 2rem;
    }
  }
  &__numbers {
    grid-area: numbers;
  }
  &__comment {
    grid-area: comment;
    margin-top: -54px;
    @media screen and (max-width: 991px) {
      margin: 2rem 0 3rem;
    }
    @media screen and (min-width: 992px) and (max-width: 1365px) {
      margin: 0;
    }

    span {
      display: block;
      margin-bottom: 1rem;
      @media screen and (max-width: 991px) {
        color: $bgc-green;
      }
    }

    &_text {
      width: 100%;
      height: 65%;
      overflow: hidden;
      resize: none;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #e2e2e2;
      padding: 1rem;
      @media screen and (max-width: 991px) {
        box-shadow: 0px 3px 6px #11100029;
      }
      @media screen and (max-width: 1365px) {
        min-height: 134px;
      }
    }
  }
  &__table {
    span {
      margin-bottom: 1rem !important;
    }
  }
  &__table,
  &__occasion,
  &__numbers {
    span {
      display: block;
      margin-bottom: 0.5rem;
      @media screen and (max-width: 991px) {
        color: $bgc-green;
      }
    }
  }

  &__attention {
    grid-area: attention;
    max-width: 600px;
    font: normal normal 400 14px/16px Gilroy-Light;
    margin: 0 auto;
    text-align: center;
    color: $magenta;
  }
  &__btn {
    grid-area: btn;
    margin: 10px auto 30px;
    @media screen and (max-width: 991px) {
      margin: 37px auto 23px;
    }
  }

  .reservation__back {
    font-size: 14px;
    padding: 0 1rem;
    position: absolute;
    cursor: pointer;

    .link-back {
      font-size: 14px !important;
      margin-top: 0.75rem;
      padding: 0 !important;
      display: flex;
      align-items: center;
      color: #c4c4c4;
    }

    @media screen and (min-width: 992px) {
      display: none;
    }
  }
}
</style>

<style lang="scss">
.reservation {
  .vs__dropdown-menu > .vs__dropdown-option--highlight {
    background: #f3bd4432 !important;
  }
  .vs__dropdown-menu > .vs__dropdown-option--selected {
    background: #f3bd44 !important;
  }
  @media screen and (max-width: 991px) {
    .profileText-input {
      font-size: 14px !important;
    }
  }

  // datepicker
  // .mx-datepicker {
  //   width: 100%;
  //   height: 100%;

  //   .mx-input-wrapper{
  //     height: 100%;
  //   }
  //   .mx-input {
  //     height: 100%;
  //     padding: 6px 10px;
  //     color: #111;
  //     border: 1px solid #E2E2E2;
  //     text-align: center;
  //   }
  //   .mx-icon-calendar {
  //     display: none;
  //   }
  // }
  // datepicker end

  // timepicker
  // .vue__time-picker {
  //   width: 100%;
  //   height: 100%;
  //   position: relative;

  //   input.display-time {
  //     width: 102px;
  //     height: 100%;
  //     padding: 6px 20px;
  //     font: normal normal 400 14px/16px Gilroy-Light;
  //     text-align: center;
  //     border: 1px solid #E2E2E2;
  //     border-radius: 4px;
  //   }
  //   .dropdown {
  //     width: 130px;
  //     height: 98px;
  //     position: absolute;
  //     overflow: hidden;
  //     top: -30px;

  //     ::-webkit-scrollbar {
  //       width: 0;
  //     }
  //     .hint {
  //       display: none;
  //     }

  //     .select-list {
  //       width: 100%;
  //       height: 100%;
  //     }
  //     .hours,
  //     .minutes {
  //       flex: 0 0 65px;
  //     }
  //     .hours li {
  //       margin: 0 5px 0 10px;
  //     }
  //     .minutes li {
  //       margin: 0 10px 0 5px;
  //     }
  //     li {
  //       color: #A5A5A5;
  //       border-top: 1px solid rgba(255, 255, 255, 0);
  //       border-bottom: 1px solid rgba(255, 255, 255, 0);
  //     }
  //     li:not([disabled]).active,
  //     li:not([disabled]).active:focus,
  //     li:not([disabled]).active:hover {
  //       color: #111;
  //       background: #fff;
  //       border-top: 1px solid #23A290;
  //       border-bottom: 1px solid #23A290;
  //     }
  //     li:not(.hint):not([disabled]):hover {
  //       background: #fff;
  //     }
  //   }
  // }
  // timepicker end
}
</style>
