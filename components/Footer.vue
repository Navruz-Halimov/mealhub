<i18n>
{
  "en": {
    "logo-subtitle": "food in touch",
    "law": "All rights reserved",
    "support": "Customer Support",
    "partner":"Be Meal hub partner"
  },
  "ru": {
    "logo-subtitle": "на связи с едой",
    "law": "Все права защищены",
    "support": "Служба поддержки",
    "partner": "Стань партнером Meal hub"
  }
}
</i18n>

<template>
  <div class="wide">
    <footer class="footer desktop">
      <div class="footer_logo">
        <Logo />
        <!-- <h3 class="footer_logo-title">
          Meal Hub<span class="footer_logo-subtitle">{{ $t('logo-subtitle') }}!</span>
        </h3> -->
      </div>

      <p class="footer-copyright">
        Copyright © Meal Hub 2021 {{ $t('law') }}
      </p>

      <p class="footer-support green" @click="$store.commit('SET_SUPPORT_POPUP', true)">
        {{ $t('support') }}
      </p>

      <ListSocial />

      <div class="flex j_c">
        <div class="partnet-container" @click="$store.commit('SET_PARTNER_POPUP', true)">
          <a class="icon_partner"><img src="~/assets/icons/partnership.svg"></a>
          <a class="footer-partner">{{ $t('partner') }}</a>
        </div>
        <ListApp />
      </div>
    </footer>
    <footer class="footer mobile">
      <p class="footer-support green" @click="$store.commit('SET_SUPPORT_POPUP', true)">
        {{ $t('support') }}
      </p>

      <div class="flex j_c mb-2">
        <div class="partnet-container" @click="$store.commit('SET_PARTNER_POPUP', true)">
          <a class="icon_partner"><img src="~/assets/icons/partnership.svg"></a>
          <a class="footer-partner">{{ $t('partner') }}</a>
        </div>
        <ListApp />
      </div>

      <ListSocial />

      <div class="flex mb-2">
        <div class="footer_logo">
          <Logo />
          <!-- <h3 class="footer_logo-title">
            Meal Hub<span class="footer_logo-subtitle">{{ $t('logo-subtitle') }}!</span>
          </h3> -->
        </div>

        <p class="footer-copyright">
          Copyright © Meal Hub 2020 {{ $t('law') }}
        </p>
      </div>
    </footer>
  </div>
</template>

<style>

  @media screen and (max-width: 1440px) {
    .footer .list{
      flex-direction: column;
    }
    .footer .list-item:not(:first-child){
      margin: 0 !important;
    }
  }
  @media screen and (max-width: 991px) {
    .footer .social-item {
      width: 42px !important;
      height: 42px !important;
    }
    .footer .list-item:not(:first-child){
      margin: 0 0 0 10px !important;
    }
  }
</style>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';
  @import '~/assets/styles/modificator';

  .partnet-container{
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 991px) {
      margin-right: 10px;
    }
    @media screen and (min-width: 1441px) {
      margin-right: 6em !important;
    }
  }
  .icon_partner{
    margin-right: 1rem;
    width: 54px;
    height: 54px;
    cursor: pointer;
    display: block;
  }

  .footer {
    // grid-area: footer;
    position: relative;
    display: flex;
    align-items: center;
    // padding: 20px $p-side;
    background-color: #2B2E2B;
    color: $c-light;
    justify-content: space-between;

    @media screen and (max-width: 991px) {
      flex-direction: column;

      &-support {
        margin: 3rem 0 2rem !important;
        padding: .25em 1.5em !important;
        font-weight: normal !important;
        width: auto !important;
        font-size: 20px!important;
        margin-top: 2rem;
      }

      .icon_partner {
        width: 45px !important;
        height: 45px !important;
      }
      .footer_logo{
        width: 12rem !important;
        &-title {
          width: 12em !important;
          font-size: 12px !important;
          margin-top: 0;
        }
        &-subtitle {
          font-size: 8px !important;
        }
      }
      .footer-copyright{
        font-size: 11px !important;
        width: auto !important;
      }
      .logo{
        height: 3.5rem !important;
      }

      .social {
        margin-top:1rem;
        margin-bottom: 2rem !important;
      }

      .list{
        flex-direction: row !important;
        width: auto !important;
        justify-content: center;
        @media screen and (max-width: 320px) {
          flex-direction: column !important;
        }
      }

    }

    @media screen and (min-width: 992px) {
      height: 100%;
      justify-content: space-between;
      // padding: 0 3rem;
      padding: 0 3rem 0 25px;

      .partnet-container {
        margin-right: 1%;

        @media screen and (min-width: 1200px) {
          margin-right: 5%;
        }
      }

    }

    @media screen and (max-width: 1440px) {
      .list{
        flex-direction: column;
      }

      &-copyright {
        min-width: auto !important;
      }
    }

    &_logo {
      display: flex;
      align-items: center;
      width: 17em;
      flex: 0 0 17em;
      height: 100%;
      margin-right: 3%;
      // margin-left: -1rem;

      @media screen and (max-width: 1080px) {
        margin-right: 1%;
        flex: 0 0 15em;
      }

      .logo{
        // margin-top:-1rem;
        align-items: center;
        height: 47px;
        // height: 5rem;
        // width: 8rem;
      }

      &-title {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        margin-left: 2%;
        font-family: $ff-roboto;
        font-size: 16px;
        letter-spacing: 1.48px;
        line-height: 1.2;
        color: $c-light;
      }

      &-subtitle {
        font-family: $ff-gilroy;
        font-size: 10px;
        font-weight: 300;
        letter-spacing: 0.89px;
        margin-top: 3px;
      }
    }

    &-copyright {
      width: 15%;
      min-width: 18rem;
      max-width: 18rem;
      font-family: $ff-gilroy;
      font-size: 14px;
      color: #979797;
    }

    &-support {
      display: inline-block;

      text-align: center;
      padding: 7px 30px;
      font-family: $ff-gilroy;
      font-size: 14px;
      font-weight: 900;

      color: #24A391;
      border: 1px solid #24A391;
      border-radius: 21px;
      cursor: pointer;

      @media screen and (max-width: 1080px) {
        margin: 0px 2%;
      }
    }

    &-partner {
      font-size: 12px;
      line-height: 16px;
      width: 7rem;
      color: #24A391;
      cursor: pointer;
    }

    .social {
      max-width: 35em;
      margin: 0 1%;
      align-items: center;
    }

  }
</style>
