<i18n>
{
  "en": {
    "home": " Go Home page",
    "errorTextPartial":"Error!",
    "errorText":"The requested page was not found.",
    "error":"Oops something went wrong!"
  },
  "ru": {
    "home": "Вернуться на главную",
     "errorTextPartial":"Ошибка!",
    "errorText":"Запрашиваемая страница не найдена.",
    "error":"Упс! Что-то пошло не так"
  }
}
</i18n>
<template>
  <div class="notfound">
    <div class="notfound__inner">
      <div class="notfound__logo-wrapper">
        <div class="notfound__logo">
          <DarkLogo :is-logo="true" class="notfound__logo-logo" />
        </div>
      </div>
      <div class="notfound__404">
        {{ error.statusCode }}
      </div>
      <div v-if="error.statusCode === 404" class="notfound__title">
        {{ $t('errorTextPartial') }} <br>{{ $t('errorText') }}
      </div>
      <div v-else class="notfound__title">
        {{ $t('errorTextPartial') }} <br>{{ $t('error') }}
      </div>
      <div class="notfound__home">
        <button class="eatme-btn-red" @click="goToHome()">
          {{ $t('home') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: ['error'],
  methods: {
    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
.notfound {
  background-color: #fff;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  &__404 {
    font-family: $ff-roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 63px;
    text-align: center;
    color: $c-icon-green;
    margin-top: 30px;
  }
  &__title {
    font-family: $ff-gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: $dark;
    margin-top: 20px;
  }
  &__home {
    margin-top: 30px;
    text-align: center;
  }
  &__logo-wrapper {
    text-align: center;
    .logo {
      margin-left: 6px;
    }
  }
  &__logo {
    width: 120px;
    height: 60px;
    margin: 0 auto;
  }
}
</style>
