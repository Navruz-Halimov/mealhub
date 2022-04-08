<i18n>
{
  "en": {
    "paymentCompletedSuccessful": "Paid successfully",
    "tablesReservedSuccessfully": "Tables # {n} reserved successfully!",
    "orderId": "Order #",
    "check": "Check it",
    "yourId": "Your ID",
    "successfullyReservedIn": "Successfully reserved a table at the {n} restaurant",
    "inTheRestaurant": "in the restaurant \"{n}\"",
    "toTheAddress": "to the address",
    "guests": "Guests",
    "dishes": "dishes",
    "remind": "We remind you that the first course of your order will be ready in {n} minutes. The rest of the dishes will be served as soon as they are ready.",
    "pathFinding": "To get directions to the catering point, click the button below.",
    "findPathButton": "Get directions",
    "orderWillWaitYou": "The order will be waiting for you on",
    "inTime": "at",
    "refundRemind": "We remind you that you can refuse an order with a refund within 5 minutes after payment.",
    "pickingRemind": "We will send a notification about the readiness of the order here and to your email address",
    "waitDelivery": "Please expect delivery of your order.",
    "deliveryTimeText": "The order will be delivered in {n} minutes.",
    "orderIsWaiting": "We remind you that your order is ready",
    "tablesWasReservedAt": "Tables was reserved at {n}",
    "forPersonsAmount": "for quests amount: {n}",
    "reserveWarning": "Attention! The reservation is kept for 20 minutes after the time specified by you. If you do not come within this time, the reservation will be canceled and the money will not be returned!",
    "reserveAdvice": "We recommend pre-ordering dishes in order to avoid long waiting times their preparation in the restaurant on the day of the event.",
    "chooseDishes": "Choose dishes"
  },
  "ru": {
    "paymentCompletedSuccessful": "Оплата прошла успешно!",
    "tablesReservedSuccessfully": "Столы № {n} зарезервированы успешно!",
    "orderId": "Номер заказа:",
    "check": "Посмотреть",
    "yourId": "Ваш ID",
    "successfullyReservedIn": "Успешно зарезервирован стол в ресторане {n}",
    "inTheRestaurant": "в ресторане \"{n}\"",
    "toTheAddress": "по адресу",
    "guests": "Количество гостей",
    "dishes": "количество блюд",
    "remind": "Напоминаем, что первое блюдо Вашего заказа будет готово через {n} минут. Остальные блюда будут подаваться по мере готовности.",
    "pathFinding": "Чтобы проложить маршрут до заведения, нажмите кнопку ниже.",
    "findPathButton": "Проложить маршрут",
    "orderWillWaitYou": "Заказ будет ожидать Вас",
    "inTime": "в",
    "refundRemind": "Напоминаем, что отказаться от заказа с возвратом денежных средств Вы можете в течение 5 мин после оплаты.",
    "pickingRemind": "Мы пришлем уведомление о готовности заказа здесь и на адрес Вашей электронной почты",
    "waitDelivery": "Пожалуйста, ожидайте доставку заказа.",
    "deliveryTimeText": "Заказ будет доставлен через {n} мин.",
    "orderIsWaiting": "Напоминаем, что Вас ожидает заказ",
    "tablesWasReservedAt": "Столы забронированы на {n}",
    "forPersonsAmount": "на количество гостей: {n}",
    "reserveWarning": "Внимание! Бронь сохраняется в течении 20 минут после наступления указанного Вами времени. Если Вы не пришли за это время, бронь аннулируется!",
    "reserveAdvice": "Рекомендуем сделать предзаказ блюд во избежание длительного ожидания их приготовления в ресторане в день мероприятия.",
    "chooseDishes": "Выбрать блюда"
  }
}
</i18n>

<template>
  <div class="success-payment">
    <div class="success-payment__container">
      <div class="success-payment__title">
        {{ title }}
      </div>
      <div class="order-id">
        <div class="order-id__text">
          {{ orderIdText }} {{ info.id }}<span />
        </div>
        <div class="order-id__view">
          <span>(</span>
          <NuxtLink
            :to="localePath({ path: `/orders/${info.id}` })"
            class="order-id__link"
          >
            <span @click="close()">{{ $t('check') }}</span>
          </NuxtLink>
          <span>)</span>
        </div>
      </div>
      <div class="success-payment__info">
        <div v-if="canShowId" class="success-payment__id">
          {{ `${$t('yourId')}: ${info.payment.user_id}` }}
        </div>
        <div v-if="canShowTopOrderInfo" class="success-payment__order-info">
          {{ `${$t('guests')}: ${info.person_quantity}, ${$t('dishes')}: ${info.items_count}` }}
        </div>
        <!-- <div class="success-payment__delimiter">
          <br v-if="canShowTopDelimiter">
        </div> -->
        <div v-if="canShowTopOrderInfo" class="success-payment__order-info">
          {{ $t('orderWillWaitYou') }} {{ selfPickingDate }}
        </div>
        <div v-if="canShowCatering" class="success-payment__catering">
          {{ $tc('successfullyReservedIn', info.catering) }}
        </div>
        <div v-if="canShowDeliveryTime" class="success-payment__delivery-time">
          {{ $tc('deliveryTimeText', ~~(orderDeliveryTimeLeft(info)/60) ) }}
        </div>
        <div v-if="canShowUserId" class="success-payment__order-info">
          {{ `${$t('yourId')}: ${info.user_id}` }}
        </div>
        <div v-if="canReserveInfo" class="success-payment__order-info">
          <span>{{ $tc('tablesWasReservedAt', reservePreparedDate) }}.</span>
          <span>{{ $tc('forPersonsAmount', info.person_quantity) }}</span>
        </div>
        <div v-if="canShowAddress" class="success-payment__address">
          <span v-if="canShowCateringInAddress">{{ $tc('inTheRestaurant', info.catering) }}</span>
          {{ addressText }}: {{ info.catering_address.address_string }}
        </div>
        <div v-if="canShowOrderInfo" class="success-payment__order-info">
          {{ `${$t('guests')}: ${info.person_quantity}, ${$t('dishes')}: ${info.items_count}` }}
        </div>
        <div v-if="canShowBottomId" class="success-payment__payment__id">
          {{ `${$t('yourId')}: ${info.payment.user_id}` }}
        </div>
        <!-- <div class="success-payment__delimiter">
          <br v-if="canShowMiddleDelimiter">
        </div> -->
        <div v-if="canShowPaymentRemind" class="success-payment__remind">
          {{ $tc('remind', orderTimeToFirstDish(info) ) }}
        </div>
        <div v-if="canShowRefundRemind" class="success-payment__refund-remind">
          {{ $t('refundRemind') }}
        </div>
        <div v-if="canShowPickingRemind" class="success-payment__picking-remind">
          {{ $t('pickingRemind') }}
        </div>
        <div v-if="canShowWaitDelivery" class="success-payment__wait-delivery">
          {{ $t('waitDelivery') }}
        </div>
        <div v-if="canShowReserveWarning" class="success-payment__reserve-warning">
          {{ $t('reserveWarning') }}
        </div>
        <div v-if="canShowReserveAdvice" class="success-payment__reserve-advice">
          {{ $t('reserveAdvice') }}
        </div>

        <div class="path">
          <div v-if="canShowPathText" class="path__text">
            {{ $t('pathFinding') }}
          </div>
          <!-- <div class="success-payment__delimiter">
            <br v-if="canShowBottomDelimiter">
          </div> -->
          <Logo v-if="canShowLogo" class="path__img" />
          <div class="path__controls">
            <div
              v-if="canShowChooseDishes"
              class="path__choose-dishes eatme-btn-red"
              @click="chooseDishes"
            >
              {{ $t('chooseDishes') }}
            </div>

            <div
              v-if="canShowFindPathButton"
              class="path__redirect eatme-btn-red"
              @click="findPath"
            >
              {{ $t('findPathButton') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      required: true,
      type: Object
    },
    type: {
      required: true,
      type: String
    }
  },
  computed: {
    title () {
      if (this.type === 'order_payment') {
        return this.$t('paymentCompletedSuccessful')
      } else if (this.type === 'wait_reserve_confirmed_free') {
        return this.$tc('tablesReservedSuccessfully', this.tablesRow)
      }

      return this.$t('orderIsWaiting')
    },
    tablesRow () {
      const reserve = this.info.reserve
      if (!reserve) { return '' }

      return reserve.tables
        .map(item => item.table_number)
        .join(', ')
    },
    orderIdText () {
      return this.type === 'order_payment' || this.type === 'wait_reserve_confirmed_free'
        ? this.$t('orderId')
        : '№'
    },
    addressText () {
      if (this.type !== 'goandeat_dish_ready') { return this.$t('toTheAddress') }

      const text = this.$t('toTheAddress')
      return text[0].toUpperCase() + text.substr(1)
    },
    canShowId () {
      return this.type === 'order_payment'
    },
    canShowUserId () {
      return this.type === 'wait_reserve_confirmed_free'
    },
    canShowTopOrderInfo () {
      return this.info.order_type === 'pickup'
    },
    canShowTopDelimiter () {
      return (this.info.order_type === 'pickup' &&
        this.isMobile !== true) ||
        this.type === 'goandeat_dish_ready'
    },
    canShowCatering () {
      return this.info.order_type === 'go_and_eat' &&
        this.type !== 'goandeat_dish_ready'
    },
    canShowDeliveryTime () {
      return this.info.order_type === 'delivery'
    },
    canReserveInfo () {
      return this.type === 'wait_reserve_confirmed_free' ||
        this.info.order_type === 'reserve_table' ||
        this.info.order_type === 'pre_order'
    },
    canShowAddress () {
      return this.info.order_type === 'go_and_eat' ||
        this.info.order_type === 'pickup' ||
        this.info.order_type === 'delivery' ||
        this.info.order_type === 'reserve_table' ||
        this.info.order_type === 'pre_order' ||
        this.type === 'wait_reserve_confirmed_free'
    },
    canShowCateringInAddress () {
      return this.type === 'wait_reserve_confirmed_free' ||
        this.info.order_type === 'reserve_table' ||
        this.info.order_type === 'pre_order'
    },
    canShowOrderInfo () {
      return this.info.order_type === 'go_and_eat' ||
        this.info.order_type === 'delivery'
    },
    canShowBottomId () {
      return this.type === 'goandeat_dish_ready'
    },
    canShowMiddleDelimiter () {
      return (this.info.order_type === 'delivery' &&
        this.isMobile !== true) ||
        this.type === 'goandeat_dish_ready'
    },
    canShowPaymentRemind () {
      return this.type === 'order_payment' &&
        this.info.order_type === 'go_and_eat'
    },
    canShowPathText () {
      return this.info.order_type === 'go_and_eat'
    },
    canShowRefundRemind () {
      return this.info.order_type === 'pickup' ||
        this.info.order_type === 'delivery'
    },
    canShowWaitDelivery () {
      return this.info.order_type === 'delivery'
    },
    canShowPickingRemind () {
      return this.info.order_type === 'pickup'
    },
    canShowReserveWarning () {
      return this.type === 'wait_reserve_confirmed_free' ||
        this.info.order_type === 'reserve_table'
    },
    canShowReserveAdvice () {
      return this.type === 'wait_reserve_confirmed_free' ||
        this.info.order_type === 'reserve_table'
    },
    canShowLogo () {
      return !this.isMobile &&
        this.type !== 'wait_reserve_confirmed_free' &&
        this.info.order_type !== 'reserve_table' &&
        this.info.order_type !== 'preorder'
    },
    canShowChooseDishes () {
      return this.orderTimingState(this.info) === 'reserve_choose_dishes'
    },
    canShowFindPathButton () {
      return this.info.order_type !== 'delivery'
    },
    canShowBottomDelimiter () {
      return this.type === 'goandeat_dish_ready'
    },
    selfPickingDate () {
      return this.getFormattedDatetime(this.info.order_date)
    },
    reservePreparedDate () {
      return this.getFormattedDate(this.info.order_date)
    }
  },
  methods: {
    async chooseDishes () {
      const cateringId = this.info.catering_id
      const orderId = this.info.id
      await this.$database.orders.changeTypeToPreorder(orderId)
      await this.$router.push(this.localePath({ path: `/catering/${cateringId}/menu` }))
      this.close()
    },
    findPath () {
      this.close()
      this.buildTheWay(this.info)
    },
    getFormattedDate (initialDate) {
      const [date] = initialDate.split(' ')
      const formattedDate = date
        .split('-')
        .reverse()
        .join('.')

      return formattedDate.replaceAll('-', '.')
    },
    getFormattedDatetime (initialDate) {
      const [date, time] = initialDate.split(' ')
      const [hours, minutes] = time.split(':')
      const formattedDate = date
        .split('-')
        .reverse()
        .join('.')

      return `${formattedDate} ${this.$t('inTime')} ${hours}:${minutes}`
    },
    close () {
      this.$emit('close-popup')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/abstract/var.scss";

.success-payment {
  position: relative;
  z-index: 1000;
  display: flex;
  justify-content: center;

  &__container {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    width: 100%;
  }

  &__title {
    font: normal normal bold 22px/29px $ff-roboto;
    letter-spacing: 0px;
    color: $c-primary;
    text-align: center;
  }

  .order-id {
    display: inline;
    font: normal normal normal 14px/16px $ff-gilroy;
    letter-spacing: 0;
    color: $bgc-green;
    margin-top: 1rem;
    text-align: center;

    &__text {
      display: inline;
    }

    &__view {
      display: inline-flex;
    }

    &__link {
      border-bottom: solid 1px;
    }

    a {
      color: inherit;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    text-align: center;
    font: normal normal normal 14px/22px $ff-gilroy;
    letter-spacing: 0;
    color: $c-primary;
  }

  &__remind,
  &__refund-remind,
  &__reserve-warning {
    color: $c-magenta;
  }

  &__reserve-warning {
    margin-top: 20px;
  }

  &__reserve-advice {
    margin-top: 10px;
  }

  &__picking-remind {
    max-width: 360px;
  }

  .path {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    &__controls {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      margin: 10px -15px 0 -15px;
      width: 100%;
    }

    &__img {
      width: 100px;
      height: 100px;
      margin-top: 10px;
    }

    &__redirect,
    &__choose-dishes {
      margin: 20px 15px 0 15px;
    }
  }

  @media screen and (max-width: 991px) {
    padding-left: 20px;
    padding-right: 20px;

    &__title {
      font: normal normal bold 20px/22px Roboto Slab;

      .order-id {
        font: normal normal normal 18px/20px Gilroy-Light;
        margin-top: 2rem;
      }

      &__info {
        font: normal normal 300 18px/20px Gilroy-Light;
      }

      .path {
        &__redirect {
          font: normal normal 300 18px/18px Gilroy-Light;
          margin-top: 40px;
          max-width: 500px;
        }
      }
    }
  }
}
</style>
