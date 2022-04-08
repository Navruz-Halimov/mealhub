<i18n>
{
  "en": {
    "text": "Sign up",
    "text-user": "Register",
    "text-business": "for business"
  },
  "ru": {
    "text": "Регистрация",
    "text-user": "Регистрация ",
    "text-business": "для бизнеса"
  }
}
</i18n>

<template>
  <p class="register">
    <a style="display:block;" @click.stop="registrateUserTypeHandle()">
      {{ $t('text') }}
    </a>
  </p>
</template>

<style lang="scss">
@import '~/assets/styles/abstract/var';

.register {
  display: flex;
  align-items: center;
  justify-content: center;
  border: {
    width: 1px;
    style: solid;
    color: $orange;
    radius: 999px;
  }
  // text-decoration: underline;
  // padding: .2em .7em;
  color: $c-light;

  & > a:first-child {
    width: 100%;
    height: 100%;

    @media screen and (min-width: 992px) {
      display: none;
    }
  }

  & > *:not(:first-child) {
    display: none;
    margin-left: 5px;

    @media screen and (min-width: 992px) {
      display: inline-block;
    }
  }

  a {
    font-family: $ff-gilroy;
    font-size: 14px;
    font-weight: 300;
    color: $c-light;
    display: block;
    // text-decoration: underline;
    cursor: pointer;
    @media screen and (min-width: 992px) {
      padding: 0.3em 1.875em;
    }
    @media screen and (max-width: 768px) {
      line-height: 19px;
    }

    // &:hover {
    //   text-decoration: none;
    // }
  }
}
</style>
