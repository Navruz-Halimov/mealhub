<i18n>
{
  "en": {
    "title": "Table selection. Hall",
    "btn": "Back"
  },
  "ru": {
    "title": "Выбор стола. План зала",
    "btn": "Выбрать"
  }
}
</i18n>

<template>
  <div class="plan">
    <div class="plan__title">{{ $t('title') }} {{ hallData.hall_number }}</div>
    <div class="plan__preview-container">
      <div class="plan__preview">
        <!-- <img :src="hallData.img_path" alt=""> -->
        <img src="/icons/plan.png" alt="">
      </div>
    </div>
    <button class="plan__controls eatme-btn-red" @click="$emit('close-plan')">
      {{ $t('btn') }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    hallData: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/abstract/var";
  @import '~/assets/styles/modificator';

  .plan {
    font-size: $fz-md-sm;
    display: flex;
    flex-direction: column;
    padding: 0 20px;

    &__title {
      max-width: 50%;
      text-align: center;
      margin: 0 auto 20px;
      font-family: $ff-roboto;
      font-size: 22px;
      line-height: 30px;

      @media screen and (max-width: 991px) {
        max-width: 90%;
        font-size: 20px;
        line-height: 26px;
      }
    }

    &__preview {
      overflow: auto;

      img {
        // height: 100%;
        max-height: 410px;
      }

      &-container {
        display: flex;
        justify-content: center;
        max-width: 760px;
        max-height: 410px;
      }
    }

    &__controls {
      margin: 20px auto 0;
      text-align: center;
    }
  }
</style>
