<i18n>
{
  "en": {
    "errorTitle": "Reservation of tables # {n} has been rejected",
    "errorMessage1": "Unfortunately, the service is unavailable for the following reason:",
    "errorMessage2": "Please choose another service or another restaurant.",
    "errorMessage3": "Thank you for understanding.",
    "errorBtn": "Choose tables"
  },
  "ru": {
    "errorTitle": "Бронь столов № {n} отклонена",
    "errorMessage1": "К сожалению, сервис бронирования недоступен по следующей причине:",
    "errorMessage2": "Пожалуйста, выбирете другой сервис или другой ресторан.",
    "errorMessage3": "Спасибо за понимание.",
    "errorBtn": "Выбрать другой сервис"
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
        {{ reason }}.<br>
        {{ $t('errorMessage2') }}<br>
        {{ $t('errorMessage3') }}
      </div>
    </template>
    <template v-slot:controls>
      <div class="eatme-btn-red" @click="openCatering">
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
    reason () {
      return this.info.reserve_unavailable_reason
    },
    reserve () {
      return this.info.reserve
    }
  },
  methods: {
    openCatering () {
      const cateringId = this.info.catering_id
      this.$router.push(this.localePath({ path: `/catering/${cateringId}` }))
      this.$emit('close-popup')
    }
  }
}
</script>
