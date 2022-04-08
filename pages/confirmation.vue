<i18n>
{
  "en": {
    "title": "Confirmation"
  },
  "ru": {
    "title": "Подтверждение"
  }
}
</i18n>

<template>
  <!-- FORM CONFIRM for mobile -->
  <div class="main_formConfirm">
    <h1 class="main_formConfirm-title">
      {{ $t('title') }}
    </h1>
    <form-confirmation />
  </div>
</template>

<script>
export default {
  layout: 'auth'
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';

  .confirmMainBody > .popup_wrap {
    display: none !important;
  }
  @media screen and (min-width: 992px) {
    .confirmMainBody > .popup_wrap {
      display: flex !important;
    }
  }

  .main_popup {
    width: 100%;
    height: 100%;
    @media screen and (min-width: 992px) {
      display: none;
    }
  }

  .main {
    width: 100%;
    height: 100%;
    overflow: visible;
    position: relative;

    &_body {
      grid-area: main;
      position: relative;
      z-index: 2 !important;
      width: 100%;
      overflow: visible;
      height: auto;
      min-height: 77vh;
      min-height: calc(var(--vh) * 77);

      @media screen and (min-width: 992px) {
        position: absolute;
        display: grid;
        grid-template-columns: 17vw auto 250px;
        grid-template-rows: 50px 50px 1fr;
        grid-template-areas: 'actions map news' 'search map news' 'tops map news';
        grid-gap: 5px;
        padding: 0 $p-side;
        width: 100%;
        height: 100%;
      }
    }

    &_actions {
      grid-area: actions;
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      display: none;
      grid-template-columns: repeat(2, 1fr);
      padding: 5px 10px;
      width: 100%;
      height: 50px;
      background-color: rgba(250, 250, 250, .84);

      @media screen and (min-width: 992px) {
        position: static;
        display: block;
        padding: 0;
        height: 100%;
        background-color: transparent;
      }
    }

    &_search-input {
      grid-area: search;
      display: none;

      @media screen and (min-width: 992px) {
        display: block;
      }
    }

    &_tops {
      grid-area: tops;
      position: relative;
      display: none;
      width: 100%;
      height: 100%;
      overflow: hidden;

      @media screen and (min-width: 992px) {
        display: flex;
      }
    }

    &_map {
      grid-area: map;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      display: none;
      width: 100%;
      height: 100%;
    border-radius: 5px;

      @media screen and (min-width: 992px) {
        position: relative;
        top: auto;
        left: auto;
        display: flex;
        width: 100%;
        height: 100%;
      }
    }

    &_news {
      grid-area: news;
      position: relative;
      display: none;
      width: 100%;
      height: 100%;
      overflow: hidden;

      @media screen and (min-width: 992px) {
        display: flex;
      }
    }

    &_formConfirm {
      display: grid;
      grid-template-rows: auto 1fr;
      margin-bottom: 10px;
      height: 95%;

      @media screen and (min-width: 992px) {
        display: none;
      }

      &-title {
        font-family: Roboto Slab, serif;
        // height: 40px;
        font-size: 20px;
        letter-spacing: 1px;
        color: $c-light;
        // padding: 15px 10px;
        padding: 20px 15px 10px;
        margin: -5px 0 0;

        &-error {
          font-family: $ff-gilroy;
          font-size: 12px;
          color: $c-error;
        }
      }
    }
  }

</style>
