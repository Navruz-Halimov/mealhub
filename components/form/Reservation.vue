<i18n>
{
  "en": {
    "reservationTitle": "Сервис бронирования",
    "preorderTitle": "Сервис предзаказа",
    "reserveAddition": "Сервис включает в себя бронирование мест в заведении для различных мероприятий максимально на 20 человек",
    "preorderAddition": "Сервис включает в себя бронирование мест в заведении с обязательным предзаказом блюд для различных мероприятий максимально на 20 человек",
    "tablesAmount": "Количество залов",
    "placesAmount": "общее количество посадочных мест",
    "savingWarning": "Бронь сохраняется в течении 20 минут после наступления указанного Вами времени. Если Вы не пришли за это время, бронь аннулируется!",
    "warning": "Внимание!",
    "cancelingWarning": "Отказаться от заказа с возвратом денежных средств Вы можете не позднее, чем за {n} суток до начала мероприятия.",
    "preorderPrepayment": "Обязательная предоплата {n}% стоимости заказа.",
    "dishPreorderWarning": "Рекомендуем сделать предзаказ блюд во избежание длительного ожидания их приготовления в ресторане в день мероприятия.",
    "startReservation": "Перейти к бронированию",
    "startPreorder": "Начать с бронирования",
    "minPreorderPrice": "Минимальная сумма предзаказа",
    "tableReserveTime": "Бронирование столов доступно",
    "tableReservePrice": "Стоимость брони 1 стола:",
    "free": "Бесплатно"
  },
  "ru": {
    "reservationTitle": "Сервис бронирования",
    "preorderTitle": "Сервис предзаказа",
    "reserveAddition": "Сервис включает в себя бронирование мест в заведении для различных мероприятий максимально на 20 человек",
    "preorderAddition": "Сервис включает в себя бронирование мест в заведении с обязательным предзаказом блюд для различных мероприятий максимально на 20 человек",
    "tablesAmount": "Количество залов",
    "placesAmount": "общее количество посадочных мест",
    "savingWarning": "Бронь сохраняется в течении 20 минут после наступления указанного Вами времени. Если Вы не пришли за это время, бронь аннулируется!",
    "warning": "Внимание!",
    "cancelingWarning": "Отказаться от заказа с возвратом денежных средств Вы можете не позднее, чем за {n} суток до начала мероприятия.",
    "preorderPrepayment": "Обязательная предоплата {n}% стоимости заказа.",
    "dishPreorderWarning": "Рекомендуем сделать предзаказ блюд во избежание длительного ожидания их приготовления в ресторане в день мероприятия.",
    "startReservation": "Перейти к бронированию",
    "startPreorder": "Начать с бронирования",
    "minPreorderPrice": "Минимальная сумма предзаказа",
    "tableReserveTime": "Бронирование столов доступно",
    "tableReservePrice": "Стоимость брони 1 стола:",
    "free": "Бесплатно"
  }
}
</i18n>

<template>
  <div class="reserve">
    <div class="reserve__wrap">
      <div class="reserve__head">
        <div class="reserve__title">
          {{ isPreorder ? $t('preorderTitle') : $t('reservationTitle') }}
        </div>
        <div class="reserve__subtitle">
          {{ isPreorder ? $t('preorderAddition') :$t('reserveAddition') }}
        </div>
      </div>

      <div class="catering-info reserve__catering-info">
        <form-inner-catering />

        <div class="catering-info__reserve">
          <span class="catering-info__tables">
            {{ $t('tablesAmount') }}: {{ halls.length }},
          </span>
          <span class="catering-info__places">
            {{ $t('placesAmount') }}: {{ placesAmount }}
          </span>
        </div>
      </div>

      <div class="table-reserve">
        <div
          v-if="isPreorder"
          class="table-reserve__min-preorder-price"
        >
          {{ $t('minPreorderPrice') }}:
          <span class="flex_inline">
            <span><span class="gilroy-bold">&#8381;</span> {{ preorderDeposit }}</span>
          </span>
        </div>
        <div class="table-reserve__time">
          {{ $t('tableReserveTime') }}:
          <span class="flex_inline">{{ workTime }}</span>
        </div>
        <div class="table-reserve__price">
          {{ $t('tableReservePrice') }}
          <span class="flex_inline">
            <span v-if="!isReservingFree">
              <span class="gilroy-bold">&#8381;</span> {{ minTableCost }}
              -
              <span class="gilroy-bold">&#8381;</span> {{ maxTableCost }}
            </span>
            <span v-else>
              {{ $t('free') }}
            </span>
          </span>
        </div>
      </div>

      <div class="warnings reserve__warnings">
        <div class="warnings__saving">
          <div>
            <span>{{ $t('warning') }}</span>
            <span v-if="!isReservingFree || isPreorder">{{ $tc('cancelingWarning', cancelReserveDays ) }}</span>
            <span v-if="!isPreorder">{{ $t('savingWarning') }}</span>
          </div>
          <div v-if="isPreorder">
            {{ $tc('preorderPrepayment', minPreorderPercent) }}
          </div>
        </div>
        <div v-if="!isPreorder" class="warnings__dish-preorder">
          {{ $t('dishPreorderWarning') }}
        </div>
      </div>

      <div class="reserve__start">
        <button
          class="reserve__start-btn eatme-btn-colorful"
          @click="runReservation"
        >
          {{ $t(isPreorder ? 'startPreorder' : 'startReservation') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    isPreorder: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      halls: [],
      minTableCost: 0,
      maxTableCost: 0,
      placesAmount: 0
    }
  },
  computed: {
    ...mapGetters(['CURRENT_CATERING', 'COPIED_CATERING_ORDER']),
    cateringId () {
      return this.CURRENT_CATERING.id
    },
    workTime () {
      const weekDaysAmount = 7
      const currentDay = new Date().getDay()
      const dayIndex = (currentDay - 1 + weekDaysAmount) % weekDaysAmount
      const workDay = this.CURRENT_CATERING.workTime[dayIndex]

      return [workDay.open, workDay.close].join(' - ')
    },
    preorderDeposit () {
      return this.CURRENT_CATERING.preorder_deposit
    },
    cancelReserveDays () {
      return this.CURRENT_CATERING?.cancel_reserve_days
    },
    minPreorderPercent () {
      return this.CURRENT_CATERING?.min_preorder_percent
    },
    isReservingFree () {
      return this.minTableCost === 0 && this.maxTableCost === 0
    }
  },
  beforeDestroy () {
    this.$store.commit('RESET_COPIED_CATERING_ORDER')
  },
  async mounted () {
    await this.initData()
  },
  methods: {
    async initData () {
      const reserveInfo = await this.$database.reservation.getHallsWithTables(this.cateringId)
      this.halls = reserveInfo.items
      this.minTableCost = Math.round(reserveInfo.min_table_reserve * 100) / 100
      this.maxTableCost = Math.round(reserveInfo.max_table_reserve * 100) / 100
      this.placesAmount = reserveInfo.seat_places_count
    },
    close () {
      if (this.isPreorder) {
        this.$store.commit('SET_PREORDER_POPUP', false)
      } else {
        this.$store.commit('SET_RESERVATION_POPUP', false)
      }
    },
    async runReservation () {
      const id = this.CURRENT_CATERING.id
      const orderType = this.isPreorder ? 'pre_order' : 'reserve_table'
      const personQuantity = this.person_quantity
      const cookiz = this.$cookies

      let order

      if (this.COPIED_CATERING_ORDER) {
        order = await this.$store.dispatch('REPEAT_ORDER', { cookiz, order: this.COPIED_CATERING_ORDER })
      } else {
        order = await this.createOrder(id, orderType, personQuantity)
      }

      await this.$store.dispatch('GET_PERSONAL_DATA', cookiz)

      this.$store.commit('RESET_COPIED_CATERING_ORDER')

      await this.$router.push(this.localePath({ path: `/ordering/${order.id}/reservation` }))
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/abstract/var";

.reserve {
  display: flex;
  justify-content: center;
  width: 100%;
  font-family: "Gilroy-Light", sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: $dark;
  text-align: center;

  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    width: 85%;
    margin-left: auto;
    margin-right: auto;
  }

  &__head {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid $c-icon-grey;
  }

  &__title {
    font-family: "Roboto Slab", serif;
    font-weight: bold;
    font-size: 22px;
    line-height: 29px;
    @media screen and (max-width: 991px) {
      font-size: 20px;
      color: $c-green;
    }
  }

  &__subtitle {
    margin-top: 9px;
    max-width: 520px;
  }

  .reserve__catering-info {
    margin-top: 10px;

    @media screen and (max-width: 991px) {
      width: 100%;
      padding-bottom: 10px;
      border-bottom: 1px solid $c-icon-grey;
    }
  }

  .catering-info {
    &__reserve {
      margin-top: 10px;
      font-weight: bold;
      line-height: 15px;
    }
  }

  .table-reserve {
    margin-top: 20px;
    font-family: "Roboto Slab", serif;
    font-weight: bold;
    font-size: 16px;
    line-height: 21px;
    color: $bgc-green;
  }

  .reserve__warnings {
    margin-top: 20px;
  }

  .warnings {
    &__saving {
      color: $magenta;
    }

    &__dish-preorder {
      margin-top: 10px;
    }
  }

  &__start {
    margin-top: 30px;
  }
}
</style>
