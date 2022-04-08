<i18n>
{
  "en": {
    "title": "Account Recovery",
    "titleError": "This Email is not registered",
    "titleRequired": "Check all fields",
    "emailLabel": "Enter your Email",
    "linkToCode": "Get an activation code"
  },
  "ru": {
    "title": "Восстановление",
    "titleError": "Данный адрес не зарегистрирован",
    "titleRequired": "Заполните все поля",
    "emailLabel": "Почта",
    "linkToCode": "Получить код"
  }
}
</i18n>

<template>
  <form class="formRecovery" @submit.prevent>
    <div class="formRecovery-logo">
      <AnimatedLogo :is-logo="true" />
    </div>
    <div class="formRecovery_body">
      <h1 class="formRecovery-title">
        {{ $t('title') }}

        <template v-if="!isMobile">
          <p v-if="VERIFICATION_ERROR.state" class="formRecovery-errorTitle">
            {{ VERIFICATION_ERROR.text || $t('titleError') }}
          </p>
          <p v-else-if="$v.email.$error" class="formRecovery-errorTitle">
            {{ $t('titleRequired') }}
          </p>
        </template>
      </h1>
      <basic-input-profile-text
        v-model="$v.email.$model"
        :is-error="$v.email.$error"
        placeholder="example@site.com"
      >
        <p>
          <span class="requiredLabelWithStar">{{ $t('emailLabel') }}:</span>
        </p>
      </basic-input-profile-text>
      <button
        class="formRecovery-btn eatme-btn-colorful"
        @click="goToConfirmation"
      >
        {{ $t('linkToCode') }}
      </button>
      <div class="formRecovery_links">
        <basic-link-register />
        <div class="spacer">
          |
        </div>
        <basic-link-login />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import AnimatedLogo from '../AnimatedLogo'
export default {
  components: { AnimatedLogo },
  props: {
    action: {
      type: String
    }
  },
  computed: {
    email: {
      get () {
        return this.$store.getters.RECOVERY_FORM.email
      },
      set (value) {
        this.$store.commit('SET_RECOVERY_FORM_DATA', {
          email: value
        })
      }
    },
    ...mapGetters(['VERIFICATION_ERROR'])
  },
  validations: {
    email: {
      required,
      email
    }
  },
  watch: {
    'VERIFICATION_ERROR.state' (state) {
      if (this.isMobile) {
        console.warn('VERIFICATION_ERROR.state', state)
        if (state) {
          this.$store.commit(
            'SET_SIMPLE_ERROR_POPUP',
            this.VERIFICATION_ERROR.text || this.$t('titleError')
          )
        } else {
          this.$store.commit('SET_SIMPLE_ERROR_POPUP', false)
        }
      }
    }
  },
  mounted () {
    this.email = ''
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.email = ''
    })
  },
  methods: {
    goToConfirmation () {
      const vm = this
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$store.commit('SET_VERIFICATION_ERROR', {
          state: true,
          method: 'phone'
        })
        this.$emit('toggle-error-popup')
      } else {
        this.$store
          .dispatch('SEND_VERIFICATION_CODE', 'recovery')
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
  font-size: 14px;

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

.formRecovery {
  position: relative;
  display: flex;
  border-radius: 7px;
  padding: 60px 15px 10px 15px;
  margin: 4rem 0 7rem;
  width: 100%;

  @media screen and (min-width: 992px) {
    padding: 0;
    width: 50%;
    margin: 0 auto;
  }

  &_body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: auto;

    @media screen and (min-width: 992px) {
      align-items: center;
      padding: 0 10%;
    }

    & /deep/ {
      p {
        font-size: $fz-md-sm !important;
      }

      .profileText-input {
        font-size: 14px;
      }
      .profileText-text {
        font-size: 12px !important;
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

  &-title {
    margin-bottom: 3rem;
    display: none;
    font-family: $ff-roboto;
    font-size: 18px;
    font-weight: bold;
    text-align: center;

    @media screen and (min-width: 992px) {
      display: block;
      font-size: 22px;
    }

    & > p {
      font-family: $ff-gilroy;
      font-size: 12px;
      font-weight: 300;
      color: $c-error;
    }
  }

  &-btn {
    margin-top: 3rem;
  }

  &_links {
    display: flex;
    align-items: center;
    font-size: 14px;

    @media screen and (min-width: 992px) {
      display: none;
    }

    .spacer {
      margin: 0 10px;
    }

    & /deep/ {
      .login {
        position: relative;
        background: none;
        border: none;
        border-radius: 0;
        box-shadow: none;
        font-family: $ff-gilroy;
        font-size: $fz-md-sm;
        font-weight: 300;
        color: $c-primary !important;
        letter-spacing: 1px;
        &:hover {
          background: none !important;
        }

        @media screen and (max-width: 768px) {
          font-size: 14px !important;
        }
        @media screen and (min-width: 992px) {
          padding-right: 1em;
          padding-left: 1em;
        }
      }

      .register {
        border: none;

        & > a:first-child {
          display: flex;
          align-items: center;
          border: none;
          text-decoration: none;
          font-family: $ff-gilroy;
          font-size: $fz-md-sm;
          font-weight: 300;
          color: $c-primary;
          letter-spacing: 1px;
        }

        & > *:not(:first-child) {
          display: none;
        }
      }
    }
  }
}
</style>
