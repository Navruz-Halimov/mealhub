<i18n>
{
  "en": {
    "errorTitle": "Reservation of tables # {n} has been rejected",
    "errorMessage1": "Unfortunately, these tables are not available for booking.",
    "errorMessage2": "Please select other tables.",
    "errorMessage3": "Thank you for understanding.",
    "errorBtn": "Choose tables"
  },
  "ru": {
    "errorTitle": "Бронь столов № {n} отклонена",
    "errorMessage1": "К сожалению, данные столы недоступны для бронирования.",
    "errorMessage2": "Пожалуйста, выберете другие столы.",
    "errorMessage3": "Спасибо за понимание.",
    "errorBtn": "Выбрать столы"
  }
}
</i18n>

<template>
  <form-reserve-error>
    <template v-slot:title>
      <div>{{ $tc('errorTitle', tablesRow) }}</div>
    </template>
    <template v-slot:attention>
      <div>
        {{ $t('errorMessage1') }}<br>
        {{ $t('errorMessage2') }}<br>
        {{ $t('errorMessage3') }}
      </div>
    </template>
    <template v-slot:controls>
      <div class="eatme-btn-red" @click="openReservation">
        {{ $t('errorBtn') }}
      </div>
    </template>
  </form-reserve-error>
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
    }
  },
  methods: {
    async openReservation () {
      const orderId = this.info.id
      await this.$router.push(this.localePath({ path: `/ordering/${orderId}/reservation` }))
      this.$emit('close-popup')
    }
  }
}
</script>
