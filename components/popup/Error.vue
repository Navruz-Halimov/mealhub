<i18n>
{
  "en": {
    "yes": "Yes",
    "no": "No"
  },
  "ru": {
    "yes": "Да",
    "no": "Нет"
  }
}
</i18n>
<template>
  <popup-notification class="popupError" @close-popup="$emit('close-popup')">
    <div class="popupError__container">
      <svg
        class="popupError__logo"
        viewBox="0 0 100 101"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M58.858 49.9762L67.6923 41.1419C68.9136 39.9207 68.9136 37.954 67.6923 36.7327L63.2831 32.3077C62.0618 31.0864 60.0793 31.0864 58.858 32.3077L50.0238 41.1419L41.1895 32.3077C39.9683 31.0864 37.9857 31.0864 36.7645 32.3077L32.3394 36.7327C31.1182 37.954 31.1182 39.9207 32.3394 41.1419L41.1737 49.9762L32.3553 58.7946C31.134 60.0159 31.134 61.9825 32.3553 63.2038L36.7803 67.6289C38.0016 68.8501 39.9841 68.8501 41.2054 67.6289L50.0079 58.8263L58.8898 67.7082C60.111 68.9294 62.0936 68.9294 63.3148 67.7082L67.7399 63.299C68.9611 62.0777 68.9611 60.0951 67.7399 58.8739L58.858 49.9762ZM50.0079 0C22.3949 0 0 22.3949 0 50.0079C0 77.6209 22.3949 100.016 50.0079 100.016C77.6209 100.016 100 77.6368 100 50.0238C100.016 22.3949 77.6209 0.0158604 50.0079 0ZM50.0079 90.6265C27.5654 90.6423 9.37351 72.4504 9.37351 50.0079C9.37351 27.5654 27.5654 9.37351 50.0079 9.37351C72.4504 9.37351 90.6265 27.5654 90.6265 50.0079C90.6265 50.0079 90.6265 50.0079 90.6265 50.0238C90.6265 72.4504 72.4504 90.6423 50.0079 90.6265C50.0079 90.6423 50.0079 90.6423 50.0079 90.6265Z" fill="#EB618F" />
      </svg>

      <h2 class="popupError__message" @click.stop>
        <slot />
      </h2>
    </div>

  </popup-notification>
</template>

<script>
export default {
  methods: {
    close () {
      this.$emit('close-popup')
    },
    deleteHandler () {
      this.$emit('delete')
      this.$emit('close-popup')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var.scss';

  .popupError {
    &__container {
      padding: 80px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 464px;
    }

    &__logo {
      width: 75px;
      height: 75px;

      @media screen and (max-width: 991px) {
        width: 65px;
        height: 65px;
      }
    }

    &__message {
      text-align: center;
      margin-top: 15px;
      margin-bottom: 3rem;
      font-family: $ff-roboto;
      font-size: 22px;
    }
  }
</style>
