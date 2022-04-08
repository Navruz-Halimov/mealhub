<i18n>
{
  "en": {
    "cooking_timer": "pending execution",
    "can_return_timer": "time to cancel the order",
    "choose_dishes": "choice of dishes",
    "pending_payment": "payment in proccessing",
    "pay_an_order": "pending payment",
    "delivery_choose_dishes": "choose dishes",
    "delivery_pay_an_order": "pending payment",
    "pickup_choose_dishes": "choice of dishes",
    "pickup_pay_an_order": "pending payment",
    "reserve_wait_manager": "pending confirmation",
    "reserve_wait_payment": "pay",
    "preorder_wait_payment": "pay",
    "wait_manager": "waiting for manager response",

    "delivery_timer": "wait delivery",
    "pickup_timer": "wait cooking",
    "delivery_choose_dishes": "choose dish",
    "pickup_choose_dishes": "choose dishes",
    "preorder_choose_dishes": "choose dishes",
    "waiting_reserve": "choosing a table",
    "reserve_timer": "wait cooking",
    "reserve_choose_dishes": "choose dishes",
    "reserve_cancel_time": "order canceling time",
    "preorder_cancel_time": "order canceling time"
  },
  "ru": {
    "cooking_timer": "ожидание приготовления",
    "can_return_timer": "время на отмену заказа",
    "choose_dishes": "выбор блюд",
    "pending_payment": "платеж в обработке",
    "pay_an_order": "ожидание оплаты",
    "delivery_choose_dishes": "выбор блюд",
    "delivery_pay_an_order": "ожидание оплаты",
    "pickup_choose_dishes": "выбор блюд",
    "pickup_pay_an_order": "ожидание оплаты",
    "reserve_wait_manager": "ожидание подтверждения",
    "reserve_wait_payment": "оплатить",
    "preorder_wait_payment": "оплатить",
    "wait_manager": "ожидание ответа менеджера",

    "delivery_timer": "ожидание доставки",
    "pickup_timer": "ожидание приготовления",
    "delivery_choose_dishes": "выбор блюд",
    "pickup_choose_dishes": "выбор блюд",
    "preorder_choose_dishes": "выбор блюд",
    "waiting_reserve": "выбор стола",
    "reserve_timer": "ожидание приготовления",
    "reserve_choose_dishes": "выбор блюд",
    "reserve_cancel_time": "время на отмену заказа",
    "preorder_cancel_time": "время на отмену заказа"
  }
}
</i18n>

<template>
  <div
    v-if="item"
    :key="item.id + 'orderstatus_' + systemTime"
    class="order-status"
  >
    <p v-if="isColorGreen" class="green">
      {{ $t(orderTimingState(item)) }}
    </p>
    <p v-else class="red">
      {{ $t(orderTimingState(item)) }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    isColorGreen () {
      const status = this.orderTimingState(this.item)
      return (
        status === 'cooking_timer' ||
        status === 'delivery_timer' ||
        status === 'pickup_timer' ||
        status === 'reserve_timer'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.order-status {
  font-size: 14px !important;
}
</style>
