<i18n>
{
  "en": {
    "start": "Start without any registration",
    "registration": "Registration of the catering point"
  },
  "ru": {
    "start": "Начать без регистрации",
    "registration": "Регистрация точки общественного питания"
  }
}
</i18n>

<template>
  <!-- FORM REGISTER for mobile -->
  <div class="main_formRegistrate">
    <form-registrate-type />
  </div>
</template>

<script>
export default {
  layout: 'auth',
  name: 'RegistrateTypeUsers'
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';

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
    height: 100%;
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
    background-color: rgba(250, 250, 250, 0.84);

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

  &_formRegistrate {
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    height: 100%;

    @media screen and (min-width: 992px) {
      display: none;
    }

    &-link {
      display: grid;
      grid-template-columns: 1fr 4fr 1fr;
      grid-column-gap: 10px;
      align-items: center;
      border-radius: 7px;
      padding: 10px;
      background: #ffffff 0% 0% no-repeat padding-box;
    }

    &-img {
      justify-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      object-fit: contain;
    }

    &-icon {
      justify-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;

      svg {
        width: 100%;
        height: 100%;
        fill: $c-green;
      }
    }

    &-label {
      position: relative;
      font-family: $ff-gilroy;
      font-size: $fz-md-sm;
      overflow-y: auto;
    }

    &-arrow {
      justify-self: end;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 25px;
      width: 25px;
      height: 20px;
      object-fit: contain;
    }
  }

  & /deep/ .popup_wrap {
    display: none;

    @media screen and (min-width: 992px) {
      display: flex;
    }
  }
}
</style>
