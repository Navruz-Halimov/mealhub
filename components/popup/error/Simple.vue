<i18n>
{
  "en": {
    "errorTitle": "Please wait completion of payment."
  },
  "ru": {
    "errorTitle": "Пожалуйста, дождитесь завершения оплаты."
  }
}
</i18n>

<template>
  <form-reserve-error>
    <template v-slot:title>
      <div>{{ $t('errorTitle') }}</div>
    </template>
    <template v-slot:btn-usual>
      <div class="eatme-btn-red">OK</div>
    </template>
  </form-reserve-error>
</template>
