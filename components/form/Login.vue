<i18n>
{
  "en": {
    "phone": "Phone number",
    "titleErrorRequired": "Fill the full field",
    "titleErrorInvalid": "Invalid phone number",
    "formTitle": "Login",
    "inputPhoneLabel": "Enter your phone number",
    "linkToCode": "Get an activation code",
    "linkToRecovery": "Account Recovery"
  },
  "ru": {
    "phone": "Номер телефона",
    "titleErrorRequired": "Заполните все поля",
    "titleErrorInvalid": "Неправильный номер",
    "formTitle": "Вход",
    "inputPhoneLabel": "Номер телефона",
    "linkToCode": "Получить код",
    "linkToRecovery": "Востановление аккаунта"
  }
}
</i18n>

<template>
  <form class="formLogin ml-a mr-a" @submit.prevent>
    <div
      class="formLogin_body"
      @click="$store.commit('RESET_VERIFICATION_ERROR')"
    >
      <h1 class="formLogin-title">
        <span class="desktop">{{ $t('formTitle') }}</span>
        <template v-if="!isMobile">
          <p
            v-if="tryAct && VERIFICATION_ERROR.state && VERIFICATION_ERROR.text"
            class="formLogin-errorTitle"
          >
            {{ VERIFICATION_ERROR.text }}
          </p>
          <p
            v-else-if="tryAct && $v.phone.$error && !phone"
            class="formLogin-errorTitle"
          >
            {{ $t('titleErrorRequired') }}
          </p>
          <p v-else-if="tryAct && $v.phone.$error" class="formLogin-errorTitle">
            {{ $t('titleErrorInvalid') }}
          </p>
        </template>
      </h1>
      <basic-input-auth-phone
        v-model="$v.phone.$model"
        :is-error="
          tryAct &&
            (($v.phone.$error && !phone) ||
              $v.phone.$error ||
              (VERIFICATION_ERROR.state && VERIFICATION_ERROR.text))
        "
        @input="$store.commit('RESET_VERIFICATION_ERROR')"
      >
        <span>{{ $t('inputPhoneLabel') }}:</span>
      </basic-input-auth-phone>
      <a class="formLogin-recovery desktop" @click.stop="recoveryHandle">
        {{ $t('linkToRecovery') }}
      </a>
      <button
        class="formLogin-btn eatme-btn-colorful"
        @click="goToConfirmation"
      >
        {{ $t('linkToCode') }}
      </button>
      <a class="formLogin-recovery mobile" @click.stop="recoveryHandle">
        {{ $t('linkToRecovery') }}
      </a>
      <list-social />
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  required,
  minLength,
  maxLength,
  numeric
} from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      localePhone: '',
      tryAct: false
    }
  },
  computed: {
    phone: {
      get () {
        return this.localePhone
      },
      set (phone) {
        const shortPhone = phone.split(' | ')[0]
        const longPhone = phone.split(' | ')[1]
        this.localePhone = shortPhone
        this.$store.commit('SET_LOGIN_FORM_DATA', { phone: longPhone })
      }
    },
    ...mapGetters(['VERIFICATION_ERROR'])
  },
  validations: {
    phone: {
      required,
      numeric,
      minLength: minLength(9),
      maxLength: maxLength(11)
    }
  },
  watch: {
    'VERIFICATION_ERROR.state' (state) {
      if (this.isMobile) {
        console.warn('VERIFICATION_ERROR.state', state)
        if (state) {
          if (this.tryAct && this.$v.phone.$error && !this.phone) {
            this.$store.commit(
              'SET_SIMPLE_ERROR_POPUP',
              this.VERIFICATION_ERROR.text || this.$t('titleErrorRequired')
            )
          } else if (this.tryAct && this.$v.phone.$error) {
            this.$store.commit(
              'SET_SIMPLE_ERROR_POPUP',
              this.VERIFICATION_ERROR.text || this.$t('titleErrorInvalid')
            )
          } else {
            this.$store.commit(
              'SET_SIMPLE_ERROR_POPUP',
              this.VERIFICATION_ERROR.text || this.$t('titleErrorInvalid')
            )
          }
          // } else {
          //   this.$store.commit('SET_SIMPLE_ERROR_POPUP', false)
        }
      }
    }
  },
  beforeRouteLeave () {
    this.$store.commit('RESET_VERIFICATION_ERROR')
  },
  beforeRouteEnter () {
    this.$store.commit('RESET_VERIFICATION_ERROR')
  },
  beforeDestroy () {
    this.$store.commit('RESET_VERIFICATION_ERROR')
  },
  methods: {
    goToConfirmation () {
      const vm = this
      this.tryAct = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$store.commit('SET_VERIFICATION_ERROR', {
          state: true,
          method: 'phone'
        })
        this.$emit('toggle-error-popup')
      } else {
        this.$store
          .dispatch('SEND_VERIFICATION_CODE', 'login')
          .then(({ data }) => {
            if (data.send_verify_code) {
              vm.confirmationHandle()
              vm.$store.commit('RESET_VERIFICATION_ERROR')
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
.requiredLabelWithStar {
  &::after {
    content: ' *';
    display: inline-block;
    color: #eb608f;
    line-height: 1rem;
    font-size: 2rem;
    position: relative;
    top: 0.5rem;
    left: 0.1em;
  }
}
.formLogin {
  position: relative;
  display: flex;
  border-radius: 7px;
  padding: 28px 15px 10px 15px;
  width: 100%;
  @media screen and (min-width: 992px) {
    padding: 0;
  }
  &_body {
    display: grid;
    /*grid-template-rows: calc(1em + 60px) repeat(2, 40px);*/
    justify-items: center;
    grid-row-gap: 30px;
    width: 100%;
    height: 100%;
    overflow: auto;
    @media screen and (min-width: 992px) {
      padding: 0px 30%;
      grid-template-rows: 1fr calc(1em + 60px) repeat(2, 40px) 1fr;
      align-items: center;
    }
    & /deep/ {
      .authPhone-text {
        font-size: $fz-md-sm !important;
        @media screen and (max-width: 991px) {
          font-size: 14px !important;
          margin-bottom: 5px;
        }
      }
    }
  }
  &-logo {
    position: absolute;
    top: 0;
    right: 0;
    width: 75px;
    height: 65px;
    transform: translate(-15px, -70%);
    @media screen and (min-width: 992px) {
      display: none;
    }
  }
  &-errorTitle {
    position: relative;
  }
  &-title {
    font-family: $ff-roboto;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    @media screen and (min-width: 992px) {
      font-size: 22px;
    }
    & > p {
      font-family: $ff-gilroy;
      font-size: $fz-md-sm;
      font-weight: 300;
      color: $c-error;
    }
  }
  &-recovery {
    font-family: $ff-gilroy;
    font-size: 14px;
    text-decoration: underline;
    position: relative;
    top: -1em;
    cursor: pointer;
    &.desktop {
      display: block;
    }
    &.mobile {
      display: none;
    }
    @media screen and (max-width: 991px) {
      &.desktop {
        display: none;
      }
      &.mobile {
        display: block;
      }
    }
    @media screen and (min-width: 992px) {
      font-size: 14px;
      color: #b3b3b3;
      text-decoration: underline;
    }
  }
  & /deep/ .social {
    display: none;
    @media screen and (min-width: 992px) {
      display: flex;
    }
    &-item {
      border-color: #b3b3b3;
    }
    svg {
      fill: #b3b3b3;
    }
  }
}
</style>
