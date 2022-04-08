<i18n>
{
  "en": {
    "month": "month",
    "days": "days",
    "hours": "hours",
    "min": "min",
    "sec": "sec",
    "popupSuccessMessage": "Successfully canceled"
  },
  "ru": {
    "month": "мес.",
    "days": "дней",
    "hours": "часов",
    "min": "мин",
    "sec": "сек",
    "popupSuccessMessage": "Успешно отменено"
  }
}
</i18n>
<template>
  <div v-if="item || large || disabled" class="eatme-timer relative">
    <svg
      :key="'timer_' + localTiming(1)"
      :timemark="'timer_' + localTiming(1)"
      class="countdown_svg"
      :class="{'inheader': inheader, 'large': large }"
      :viewBox=" large ? '-2 -2 70 70' : '0 0 64 64' "
    >
      <template v-if="large">
        <!--
          Большой таймер для уведомлений
        -->
        <path fill="none" stroke="#FDBF3E" stroke-width="4" d="M 31.45897540044421 1.0047214501518695 A 31 31 0 1 0 32 1" />
        <path
          fill="none"
          stroke="#eee"
          stroke-width="4"
          :d="describeArc(32, 32, 31, 0, clockPhase() )"
        />
      </template>
      <template v-else-if="!disabled">
        <!--
          Маленькие таймеры в заказах и хедере
        -->
        <!-- ЗЕЛЕНЫЕ -->
        <path
          v-if="
            orderTimingState(item) === 'cooking_timer' ||
            orderTimingState(item) === 'delivery_timer' ||
            orderTimingState(item) === 'pickup_timer' ||
            orderTimingState(item) === 'reserve_timer' ||
            orderTimingState(item) === 'delivery_choose_dishes' ||
            orderTimingState(item) === 'pickup_choose_dishes'
          "
          fill="none"
          :stroke="'#21bc96'"
          stroke-width="2"
          d="M 31.45897540044421 1.0047214501518695 A 31 31 0 1 0 32 1"
        />
        <!-- СЕРЫЕ -->
        <path
          v-else-if="orderTimingState(item) === 'waiting_reserve'"
          fill="none"
          stroke="#DCDCDC"
          stroke-width="2"
          d="M 31.45897540044421 1.0047214501518695 A 31 31 0 1 0 32 1"
        />
        <!-- КРАСНЫЕ/ОРАНЖЕВЫЕ -->
        <path
          v-else
          fill="none"
          :stroke="
            orderTimingState(item) === 'wait_manager' ||
            orderTimingState(item) === 'can_return_timer' ||
            orderTimingState(item) === 'reserve_wait_payment' ||
            orderTimingState(item) === 'preorder_wait_payment' ||
            orderTimingState(item) === 'reserve_choose_dishes' ||
            orderTimingState(item) === 'preorder_choose_dishes' ||
            orderTimingState(item) === 'preorder_cancel_time'
            ? '#FDBF3E'
            : '#EB608F'
          "
          stroke-width="2"
          d="M 31.45897540044421 1.0047214501518695 A 31 31 0 1 0 32 1"
        />
        <path
          fill="none"
          stroke="#eee"
          stroke-width="2"
          :d="describeArc(32, 32, 31, 0, clockPhase() )"
        />
      </template>
      <path v-else fill="none" :stroke="'#c0c0c0'" stroke-width="2" d="M 31.45897540044421 1.0047214501518695 A 31 31 0 1 0 32 1" />
    </svg>
    <span
      :key="'timerstats_' + localTiming(2)"
      class="eatme-timer-count text-center">
      <template v-if="inheader || large || disabled">
        <slot />
      </template>
      <template v-else>
        {{ transformTimeNow(max() - conter()) }}/{{ transformTimeMax(max(), conter()) }}<br>{{ $t(typeOfTime(max() - conter())) }}
      </template>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object
    },
    largetime: {
      type: Number
    },
    largemax: {
      type: Number
    },
    inheader: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    large: {
      type: Boolean
    }
  },
  data () {
    return {
      mark: ~~(Math.random() * 1000)
    }
  },
  methods: {
    localTiming (s) {
      return this.systemTime + '_' + this.mark + s
    },
    conter () {
      // if (localStorage.conter) { return +localStorage.conter }
      const mx = this.max()
      let result = mx

      if (this.largetime) {
        result = this.largetime
      } else if (this.item) {
        const timing = this.orderTimingState(this.item)

        if (timing === 'can_return_timer') {
          result = this.orderCanReturnTimeLeft(this.item)
        }
        if (timing === 'choose_dishes' || timing === 'pay_an_order') {
          result = this.orderChooseAndPayTimeLeft(this.item)
        }
        if (timing === 'pending_payment') {
          result = this.orderPendingPaymentTimeLeft(this.item)
        }
        if (timing === 'reserve_wait_manager') {
          result = this.orderReserveTimeFromManagerRequest(this.item)
        }

        if (timing === 'waiting_reserve') {
          return 0
          // return 0 если нужны нули
        }
        if (timing === 'wait_manager') {
          result = this.orderGoEatTimeManager(this.item)
        }
        if (timing === 'cooking_timer') {
          result = mx - this.orderGoEatTimeLeft(this.item)
        }
        if (timing === 'delivery_timer') {
          result = mx - this.orderDeliveryTimeLeft(this.item)
        }
        if (timing === 'pickup_timer') {
          result = mx - this.orderPickupTimeLeft(this.item)
        }
        if (timing === 'reserve_timer' ||
          timing === 'reserve_wait_payment' ||
          timing === 'preorder_wait_payment' ||
          timing === 'reserve_choose_dishes' ||
          timing === 'reserve_cancel_time' ||
          timing === 'preorder_cancel_time' ||
          timing === 'preorder_choose_dishes'
        ) {
          result = this.orderReserveTimeLeft(this.item)
        }
      }

      return Math.max(((~~result) || 1), 1)
    },
    max () {
      // if (localStorage.max) { return +localStorage.max }

      if (this.largemax) {
        return this.largemax
      }

      const timing = this.orderTimingState(this.item)

      if (timing === 'cooking_timer') {
        return this.orderGoEatTimeFull(this.item)
      }
      if (timing === 'pickup_timer') {
        return this.orderPickupTimeFull(this.item)
      }
      if (timing === 'delivery_timer') {
        return this.orderDeliveryTimeFull(this.item)
      }
      if (timing === 'reserve_timer' ||
        timing === 'reserve_wait_payment' ||
        timing === 'preorder_wait_payment' ||
        timing === 'reserve_cancel_time' ||
        timing === 'preorder_cancel_time' ||
        timing === 'reserve_choose_dishes' ||
        timing === 'preorder_choose_dishes'
      ) {
        return this.orderReserveTimeFull(this.item)
      }

      let minutes = 20

      if (timing === 'can_return_timer') {
        minutes = 5
      }

      if (timing === 'choose_dishes') {
        minutes = 20
      }

      if (timing === 'pay_an_order') {
        minutes = 20
      }
      if (timing === 'pending_payment') {
        minutes = 2
      }

      if (timing === 'wait_manager') {
        minutes = 3
      }
      if (timing === 'waiting_reserve') {
        minutes = 0
        // return 0 если нужны нули
      }

      if (timing === 'reserve_wait_manager') {
        minutes = 60
      }

      return minutes * 60 // переводим в секунды
    },

    typeOfTime (seconds) {
      const sec = seconds
      let min = Math.ceil(seconds / 60)
      let hours = Math.ceil(min / 60)
      let days = Math.ceil(hours / 24)
      let month = Math.ceil(days / 30)

      min = min > 1 ? min : 0
      hours = hours > 1 ? hours : 0
      days = days > 1 ? days : 0
      month = month > 1 ? month : 0

      if (month) { return 'month' }
      if (days) { return 'days' }
      if (hours) { return 'hours' }
      if (min) { return 'min' }
      if (sec) { return 'sec' }
    },
    transformTimeNow (seconds) {
      const sec = seconds
      let min = Math.ceil(sec / 60)
      let hours = Math.ceil(min / 60)
      let days = Math.ceil(hours / 24)
      let month = Math.ceil(days / 30)

      min = min > 1 ? min : 0
      hours = hours > 1 ? hours : 0
      days = days > 1 ? days : 0
      month = month > 1 ? month : 0

      const time = month || days || hours || min || sec
      // если нужны нули
      const timing = this.orderTimingState(this.item)
      if (timing === 'waiting_reserve') {
        return 0
      }

      return Math.max(time, 1)
    },
    transformTimeMax (max, conter) {
      const MAXsec = max
      const MAXmin = Math.ceil(MAXsec / 60)
      const MAXhours = Math.ceil(MAXmin / 60)
      const MAXdays = Math.ceil(MAXhours / 24)
      const MAXmonth = Math.ceil(MAXdays / 30)

      const sec = (max - conter) || 1
      let min = Math.ceil(sec / 60)
      let hours = Math.ceil(min / 60)
      let days = Math.ceil(hours / 24)
      // let month = Math.ceil(days / 30)

      min = min > 1 ? min : 0
      hours = hours > 1 ? hours : 0
      days = days > 1 ? days : 0
      // month = month > 1 ? month : 0

      if (days > 1 && days <= 30) { return Math.min(MAXdays, 30) }
      if (hours > 1 && hours <= 24) { return Math.min(MAXhours, 24) }
      if (min > 1 && min <= 60) { return Math.min(MAXmin, 60) }
      if (sec && sec <= 60) { return Math.min(MAXsec, 60) }

      const time = MAXmonth || MAXdays || MAXhours || MAXmin || MAXsec

      return Math.max(time, 1)
    },

    clockPhase () {
      return Math.min((360 / this.max()) * this.conter(), 360) || 0
    },
    polarToCartesian (centerX, centerY, radius, angleInDegrees) {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      }
    },
    describeArc (x, y, radius, startAngle, endAngle) {
      const start = this.polarToCartesian(x, y, radius, endAngle)
      const end = this.polarToCartesian(x, y, radius, startAngle)

      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

      const d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(' ')

      return d
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';
  .countdown_svg {
    transform: rotateY(180deg);
    background-color: transparent;
    width:5rem;
    height:5rem;
  }
  .countdown_svg.large {
    width: 11rem;
    height: 11rem;
  }

  .waiting{
    color: $c-error;
  }
  .cooking{
    color: $c-green;
  }
  .eatme {

    &-timer {
      align-self: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: $ff-gilroy;
      font-size: 10px;
      line-height: 10px;

      @media screen and (min-width: 992px) {
        display: inline-flex;
        margin-top: 0;
      }

      &-count {
        position: absolute;
        font-size: 12px;
        color: $c-primary;
      }
    }
  }
</style>
