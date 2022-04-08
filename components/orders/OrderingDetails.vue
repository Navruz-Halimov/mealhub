<i18n>
{
  "en": {
    "orderDate":"Order date",
    "pickupReady": "Approximate cooking time",
    "pickupReadyEnding": "minutes",
    "deliveryReady": "Estimated delivery time",
    "deliveryReadyEnding": "minutes",
    "tablesLabel1":"Tables №",
    "tablesLabel2":"at",
    "guestsLabel":"people",

    "dishCount":"Dishes",
    "dishCountEnding":" ",
    "summaryCount":"totally",
    "guestCount":"Peoples count"
  },
  "ru": {
    "orderDate": "Дата заказа",
    "pickupReady": "Примерное время приготовления",
    "pickupReadyEnding": "минут",
    "deliveryReady": "Примерное время доставки",
    "deliveryReadyEnding": "минут",
    "tablesLabel1": "Столики №",
    "tablesLabel2": "на",
    "guestsLabel": "Количество гостей",

    "dishCount":"Количество блюд",
    "dishCountEnding":"шт.",
    "summaryCount":"Общая стоимость"
  }
}
</i18n>

<template>
  <div class="div1 flex j_c text-xl mt-1 mb-1">
    <template v-if="order">
      <div class="desktop w-6 text-center text-sm text-xl roboto">
        <span
          v-if="order.items_count"
          class="nowrap mr-1"
        >{{ $t('dishCount') }}: <b class="green">{{ order.items_count }}</b>;
        </span>
        <span
          v-if="order.person_quantity"
          class="nowrap mr-1"
        >{{ $t('guestsLabel') }}:
          <b class="green">{{ order.person_quantity }}</b>;
        </span>
        <span
          v-if="order.price"
          class="nowrap mr-1"
        >{{ $t('summaryCount') }}:
          <b
            class="nowrap green"
          ><span class="gilroy-bold">&#8381;</span> {{ order.price }};</b>
        </span>
        <span v-if="order.order_type === 'pickup'" class="nowrap mr-1">
          {{ $t('pickupReady') }}: <b> {{ orderTimeToFirstDish(order) }} </b>
          {{ $t('pickupReadyEnding') }}
        </span>
        <span v-else-if="order.order_type === 'delivery'" class="nowrap mr-1">
          {{ $t('deliveryReady') }}: <b> {{ orderTimeToFirstDish(order) }} </b>
          {{ $t('deliveryReadyEnding') }}
        </span>
        <span
          v-else-if="order.order_created"
          class="nowrap mr-1"
        >{{ $t('orderDate') }}:
          <b> {{ order.order_created.replace('-', '.').replace('-', '.') }}</b>;
        </span>
      </div>

      <div class="mobile w-9 text-lg">
        <div class="text-center">
          <span
            v-if="order.items_count"
            class="nowrap"
          >{{ $t('dishCount') }}:
            <b class="green">
              {{ order.items_count }} {{ $t('dishCountEnding') }}</b>,</span>
          <span
            v-if="order.person_quantity"
            class="nowrap"
          >{{ $t('guestsLabel') }}: <b>{{ order.person_quantity }}</b>,</span>
          <span
            v-if="order.price"
            class="nowrap"
          >{{ $t('summaryCount') }}:
            <b
              class="green nowrap"
            ><span class="gilroy-bold">&#8381;</span> {{ order.price }}
            </b></span>
        </div>
        <div class="text-center">
          <template v-if="order.order_type === 'pickup'">
            <span>
              {{ $t('pickupReady') }}:
              <b class="roboto"> {{ orderTimeToFirstDish(order) }} </b>
              {{ $t('pickupReadyEnding') }}
            </span>
          </template>
          <template v-else-if="order.order_type === 'delivery'">
            <span>
              {{ $t('deliveryReady') }}:
              <b class="roboto"> {{ orderTimeToFirstDish(order) }} </b>
              {{ $t('deliveryReadyEnding') }}
            </span>
          </template>
          <template v-else-if="order.order_created">
            <span>{{ $t('orderDate') }}:
              <b class="roboto"> {{ order.order_created }}</b></span>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';
@import '~/assets/styles/modificator';
</style>

<script>
export default {
  props: {
    item: Object
  },
  created () {
    this.order = this.item || this.currentOrder
  }
}
</script>
