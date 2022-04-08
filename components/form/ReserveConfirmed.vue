<i18n>
{
  "en": {
    "title": "Table reserving № {n} confirmed",
    "goToReservePayment": "Go to reserve payment.",
    "toPay": "To pay",
    "goToPaymentButton": "Go to payment",
    "goToChooseDishes": "Go to the selection of dishes.",
    "preorderDescription": "The menu contains only the dishes available in the banquet version, i.e. it is possible to place several portions on larger dishes. For each selected dish, you can leave your comment.",
    "chooseDishesButton": "Choose dishes"
  },
  "ru": {
    "title": "Бронь столов № {n} подтверждена",
    "goToReservePayment": "Перейдите к оплате брони.",
    "toPay": "К оплате",
    "goToPaymentButton": "Оплатить",
    "goToChooseDishes": "Перейдите к выбору блюд.",
    "preorderDescription": "В меню указаны только блюда, доступные в банкетном варианте, т.е. возможно размещение нескольких порций на посуде большого размера. К каждому выбранному блюду Вы можете оставить свой коментарий.",
    "chooseDishesButton": "Выбрать блюда"
  }
}
</i18n>

<template>
  <div class="confirmation">
    <div class="confirmation__wrap">
      <div class="confirmation__title">
        {{ $tc('title', tablesRow) }}
      </div>
      <div class="confirmation__logo">
        <logo />
      </div>
      <div class="confirmation__next-step">
        <span>{{ $t(isReserve ? 'goToReservePayment' : 'goToChooseDishes') }}</span>
        <br v-if="isPreorder">
        <span v-if="isPreorder">{{ $t('preorderDescription') }}</span>
      </div>
      <div v-if="isReserve" class="confirmation__price">
        {{ $t('toPay') }}: <span class="gilroy-bold">&#8381;</span> {{ reserve.price }}
      </div>
      <div class="confirmation__controls">
        <div v-if="isReserve" class="confirmation__btn eatme-btn-red" @click="goToPay">
          {{ $t('goToPaymentButton') }}
        </div>
        <div v-if="isPreorder" class="confirmation__btn eatme-btn-red" @click="chooseDishes">
          {{ $t('chooseDishesButton') }}
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
    }
  },
  computed: {
    tablesRow () {
      return this.reserve.tables
        .map(item => item.table_number)
        .join(', ')
    },
    reserve () {
      return this.info.reserve
    },
    isReserve () {
      return this.info.order_type === 'reserve_table'
    },
    isPreorder () {
      return this.info.order_type === 'pre_order'
    }
  },
  methods: {
    close () {
      this.$emit('close-popup')
    },
    goToPay () {
      this.payOrder(this.info)
      this.close()
    },
    async chooseDishes () {
      const cateringId = this.info.catering_id
      await this.$router.push(this.localePath({ path: `/catering/${cateringId}/menu` }))
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.confirmation {
  color: $dark;

  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }

  &__title {
    font-family: $ff-roboto;
    font-weight: bold;
    font-size: 22px;
    line-height: 29px;
    text-align: center;
  }

  &__logo {
    margin-top: 30px;
    width: 100px;
    height: 95px;
  }

  &__next-step {
    margin-top: 30px;
    font-family: $ff-gilroy;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    max-width: 655px;
  }

  &__price {
    margin-top: 20px;
    font-family: $ff-roboto;
    font-weight: bold;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: $bgc-green;
  }

  &__controls {
    margin-top: 30px;
  }

  &__btn {
    padding: 8px 45px;
  }
}
</style>
