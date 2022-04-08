<i18n>
{
  "en": {
    "logo-subtitle": "food in touch"
  },
  "ru": {
    "logo-subtitle": "на связи с едой"
  }
}
</i18n>

<template>
  <header class="header">
    <div class="header_logo">
      <Logo />
      <!-- <h2 class="header_logo-title">
        Meal hub<span class="header_logo-subtitle">{{ $t('logo-subtitle') }}!</span>
      </h2> -->
    </div>
    <div
      class="header_info"
      :class="{
        authLogin: active === 'login',
        authRegistration: active === 'registration',
        authRecovery: active === 'recovery'
      }"
    >
      <basic-link-register />
      <basic-link-login />
    </div>
    <div class="header_addition">
      <div class="header_language">
        <Language />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ['active']
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';

  .header {
    grid-area: header;
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 2rem 5px;

    @media screen and (min-width: 992px) {
      display: grid;
      grid-template-columns: 17vw auto 250px;
      grid-template-rows: 100%;
      grid-column-gap: 5px;
      padding: 10px $p-side 0 $p-side;
    }

    &_logo {
      display: none;
      grid-template-columns: 100%;
      align-items: center;
      width: 100%;
      height: 100%;

      @media screen and (min-width: 992px) {
        display: flex;
        align-items: flex-end;
        width: 100%;
        height: 100%;
        max-height: 50px;

        & /deep/ .logo {
          max-width: 60px;
        }
      }

      &-title {
        display: none;
        flex-direction: column;
        font-family: $ff-roboto;
        font-size: 20px;
        letter-spacing: 1.48px;
        line-height: 1.2;
        color: $c-light;

        @media screen and (min-width: 992px) {
          display: flex;
          margin-left: 1rem;
        }
      }

      &-subtitle {
        font-family: $ff-gilroy;
        font-size: 12px;
        font-weight: 300;
        letter-spacing: 0.89px;
      }
    }

    &_info {
      display: flex;
      justify-self: end;
      align-items: center;
      width: 100%;

      @media screen and (max-width: 991px) {
        height: 40px;
        justify-content: flex-start;
        & > *:not(:first-child) {
          margin-left: 25px !important;
        }
      }

      @media screen and (min-width: 992px) {
        justify-content: flex-end;
      }

      & > *:not(:first-child) {
        margin: 0 10px;
      }

      & /deep/ {
        .login,
        .register {
          @media screen and (max-width: 991px) {
            padding-left: 0px !important;
            padding-right: 0px !important;
            margin-left: 5px;
          }
        }
      }

      &.authLogin /deep/ {
        .login {
          border-bottom: {
            width: 1px;
            style: solid;
            color: #FEBB37;
          }
          @media screen and (min-width: 992px) {
            border: none;
          }
        }
        @media screen and (max-width: 991px) {
          .register {
            border-bottom: {
              width: 1px;
              style: solid;
              color: rgba(255, 255, 255, 0);
            }
          }
        }
      }

      &.authRegistration /deep/ {
        .register {
          border-bottom: {
            width: 1px;
            style: solid;
            color: #FEBB37;
          }
          border-radius: 0;

          @media screen and (min-width: 992px) {
            border: none;
            border-radius: 21px;
          }
        }
        @media screen and (max-width: 991px) {
          .login {
            border-bottom: {
              width: 1px;
              style: solid;
              color: rgba(255, 255, 255, 0);
            }
          }
        }
      }

      & /deep/ {
        .login {
          @media screen and (max-width: 991px) {
            position: relative;
            background: none;
            border: none;
            border-radius: 0;
            box-shadow: none;
            font-family: $ff-roboto;
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 1px;
          }

          &:active, &:focus {
            color: $light;
          }
        }

        .register {
          @media screen and (max-width: 991px) {
            border: none;
          }

          & > a:first-child {
            @media screen and (max-width: 991px) {
              display: flex;
              align-items: center;
              border: none;
              text-decoration: none;
              font-family: $ff-roboto;
              font-size: 16px;
              font-weight: bold;
              letter-spacing: 1px;
              line-height: 3rem;
            }
            &:active, &:focus {
              color: $light;
            }
          }
        }
      }
    }

    &_addition {
      display: none;
      justify-content: center;

      @media screen and (min-width: 992px) {
        display: block;
        border-left: {
          width: 1px;
          style: solid;
          color: #21bc96;
        }
        padding-left: 13px;
      }
    }

    &_language {
      display: block;

      @media screen and (min-width: 992px) {
        display: block;
      }

      &.auth {
        display: none;

        @media screen and (min-width: 992px) {
          display: block;
        }
      }
    }

    @media screen and (max-width: 991px) {
      .authRecovery {
        display: none;
      }
      .main_formConfirm-title{
        margin: .5rem 0 1.5rem;
        padding: 0 1rem;
      }
    }

  }

</style>
