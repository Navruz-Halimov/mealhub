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
  <popup-notification class="popupDelete" @close-popup="close">
    <div class="popupDelete-content">
      <svg
        class="logo"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="enable-background:new 0 0 36 36;"
        version="1.1"
        viewBox="0 0 36 36"
        xml:space="preserve"
      ><g id="Layer_1" /><g id="icons"><path id="close_1_" class="st0" d="M6.2,3.5L3.5,6.2c-0.7,0.7-0.7,1.9,0,2.7l9.2,9.2l-9.2,9.2c-0.7,0.7-0.7,1.9,0,2.7l2.6,2.6   c0.7,0.7,1.9,0.7,2.7,0l9.2-9.2l9.2,9.2c0.7,0.7,1.9,0.7,2.7,0l2.6-2.6c0.7-0.7,0.7-1.9,0-2.7L23.3,18l9.2-9.2   c0.7-0.7,0.7-1.9,0-2.7l-2.6-2.6c-0.7-0.7-1.9-0.7-2.7,0L18,12.7L8.8,3.5C8.1,2.8,6.9,2.8,6.2,3.5z" /></g></svg>

      <h2 class="popupDelete-message" @click.stop>
        <slot />
      </h2>
      <div class="popupDelete_actions">
        <button class="popupDelete-action eatme-btn-grey cursor-pointer yes" @click="deleteHandler">
          {{ $t('yes') }}
        </button>
        <button class="popupDelete-action eatme-btn-red no" @click="close">
          {{ $t('no') }}
        </button>
      </div>
    </div>
  </popup-notification>
</template>

<script>
export default {
  mounted () {
    document.body.classList.add('overflow-hidden')
  },
  beforeDestroy () {
    document.body.classList.remove('overflow-hidden')
  },
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

  .popupDelete {
    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;

      @media screen and (max-height: 660px) {
        padding: 80px 0;
      }
    }

    &-message {
      text-align: center;
      margin-top: 15px;
      margin-bottom: 3rem;
      font-family: $ff-roboto;
      font-size: 22px;
      width: 80%;
    }

    &_actions {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: .5rem;
    }

    &-action {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: .5em 2em;
      text-transform: uppercase;
      cursor: pointer;

      &.no {
        margin-left: 6rem;
      }
    }

    & .logo {
      align-self: center;
      height: 6.5rem;
      border-radius: 50%;
      fill: #eb5887 !important;
      width: 6.5rem;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 5px solid #eb5887;
    }
  }
</style>
