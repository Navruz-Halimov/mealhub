<i18n>
{
  "en": {
    "text": "Sign in"
  },
  "ru": {
    "text": "Войти"
  }
}
</i18n>

<template>
  <a
    class="login"
    :class="{ 'eatme-btn-colorful': !isMobile }"
    @click.stop="loginUserTypes()"
  >
    {{ $t('text') }}
  </a>
</template>
<style lang="scss">
@import '~/assets/styles/abstract/var';

.login {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  // padding: .2em .7em !important;
  // text-decoration: underline;

  &.eatme-btn-colorful {
    padding: 0.2em 0.7em !important;
  }

  @media screen and (max-width: 991px) {
    line-height: 3rem;
  }
  @media screen and (min-width: 992px) {
    padding: 0.3em 2.5em !important;
  }
  @media screen and (min-width: 1080px) {
    padding: 0.3em 4em !important;
  }
}
</style>
