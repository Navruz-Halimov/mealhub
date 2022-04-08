<i18n>
{
  "en": {

    "goeatType": "Go&Eat",
    "deliveryType": "Delivery",
    "pickupType": "Takeaway",
    "preorderType": "Pre-order",
    "reservetableType": "Booking",

    "restourantLabel": "Restourant"
  },
  "ru": {
    "goeatType": "Go&Eat",
    "deliveryType": "Доставка",
    "pickupType": "Еда на вынос",
    "preorderType": "Предзаказ",
    "reservetableType": "Бронь",

    "restourantLabel": "Ресторан"
  }
}
</i18n>
<template>
  <div
    class="menu-submenu-item"
    :class="{ selected: +this.$route.params.id === item.id }"
    @click="$router.push(to)"
  >
    <div
      :class="{
        wide: $slots.default === undefined,
        'w-7': $slots.default !== undefined
      }"
    >
      <p class="title roboto">
        <span v-if="item.order_type === 'go_and_eat'">{{
          $t('goeatType')
        }}</span>
        <span v-if="item.order_type === 'delivery'">{{
          $t('deliveryType')
        }}</span>
        <span v-if="item.order_type === 'pickup'">{{ $t('pickupType') }}</span>
        <span v-if="item.order_type === 'pre_order'">{{
          $t('preorderType')
        }}</span>
        <span v-if="item.order_type === 'reserve_table'">{{
          $t('reservetableType')
        }}</span>
        <span>, {{ orderUID(item.id) }}</span>
      </p>
      <p>
        <span>{{ orderDate(item) }}</span> <span>{{ orderTime(item) }}</span>
      </p>
      <p>{{ $t('restourantLabel') }} "{{ item.catering }}"</p>
    </div>

    <div :key="item.id + 'submenu_' + systemTime" class="item-progress">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    to: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.menu-submenu-item:hover .eatme-timer-count.waiting:after {
  position: absolute;
  content: '✕';
  font-size: 14px;
  left: 0.5rem;

  font-weight: bold;
  color: #b56e86;
}
.menu-submenu-item:hover .eatme-timer-count.waiting {
  color: transparent;
  position: relative;
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.menu-submenu-item {
  position: relative;
  padding: 0.75rem 1rem 1rem 2rem;
  border-bottom: 1px solid #e2e2e2;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  font-size: 14px;

  &.selected {
    background-color: #f5f5f5;
  }

  p {
    font-size: 14px;
  }
}

.item-progress {
  display: flex;
  text-align: center;
  width: 100%;
  height: 100%;

  & /deep/ {
    .order-status {
      margin-top: 5px;
      p {
        text-align: start;
        font-size: 14px;
      }
    }
    .eatme-timer {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
}
</style>
