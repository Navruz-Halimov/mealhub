<i18n>
{
  "en": {
    "phone": "Phone number",
    "formTitle": "Enter your activation code",
    "titleError": "Incorrect verify code",
    "titleSuccessLogin": "Login is successful",
    "titleSuccessRegistration": "Registration is successful",
    "titleSuccessRecovery": "Recovery is successful",
    "inputCodeLabel": "Activation code",
    "buttonConfirmLabel": "Confirm",
    "confirmAgainText": "Get an activation code again in",
    "timeLabel": "sec",
    "sendedToEmail": "Activation code sent to email",
    "buttonConfirmAgainLabel": "Get an activation code"
  },
  "ru": {
    "phone": "Номер телефона",
    "formTitle": "Введите код активации",
    "titleError": "Неверный код",
    "titleSuccessLogin": "Выполняется вход",
    "titleSuccessRegistration": "Регистрация прошла успешно",
    "titleSuccessRecovery": "Восстановление прошло успешно",
    "inputCodeLabel": "Код активации",
    "buttonConfirmLabel": "Подтвердить",
    "confirmAgainText": "Получить повторный код через",
    "timeLabel": "сек",
    "sendedToEmail": "Код активации выслан на электронную почту",
    "buttonConfirmAgainLabel": "Получить код"
  }
}
</i18n>

<template>
  <form class="formConfirm ml-a mr-a" @submit.prevent>
    <div class="formConfirm-logo">
      <AnimatedLogo :is-logo="true" />
    </div>
    <div class="formConfirm_body">
      <h1 class="formConfirm-title">
        {{ $t('formTitle') }}
      </h1>
      <p
        v-if="VERIFICATION_ERROR.state"
        class="formConfirm-title-error red text-center"
      >
        {{ VERIFICATION_ERROR.text || $t('titleError') }}
      </p>
      <span v-else class="main_formConfirm-title-error" />
      <div class="formConfirm_group">
        <basic-input-auth-code
          ref="Code"
          :is-error="VERIFICATION_ERROR.state"
          @resetVerification="resetVerification"
        >
          {{ $t('inputCodeLabel') }}:
        </basic-input-auth-code>
        <button
          class="formConfirm-btn confirm eatme-btn-colorful"
          @click="confirmCode"
        >
          {{ $t('buttonConfirmLabel') }}
        </button>
      </div>
      <div class="formConfirm_group">
        <div class="formConfirm_wrap">
          <p class="formConfirm-text">
            {{ $t('confirmAgainText') }}:
          </p>

          <p class="formConfirm-timer">
            <svg class="countdown_svg" width="64" height="64">
              <path
                fill="none"
                stroke="#eee"
                stroke-width="2"
                d="M 31.45897540044421 1.0047214501518695 A 31 31 0 1 0 32 1"
              />
              <path
                fill="none"
                stroke="#21bc96"
                stroke-width="2"
                :d="describeArc(32, 32, 31, 0, 6 * VERIFICATION_TIME)"
              />
            </svg>
            <span class="formConfirm-timer-count">{{ VERIFICATION_TIME }}</span>
            <span class="formConfirm-timer-sec">{{ $t('timeLabel') }}</span>
          </p>
        </div>
        <button
          v-if="VERIFICATION_TIME === 0"
          class="formConfirm-btn again eatme-btn-grey"
          @click="getCode"
        >
          {{ $t('buttonConfirmAgainLabel') }}
        </button>
        <button v-else class="formConfirm-btn again eatme-btn-disabled">
          {{ $t('buttonConfirmAgainLabel') }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    action: {
      type: String
    }
  },
  data: () => ({
    al: 100,
    diff: null,
    bar: null
  }),
  beforeRouteLeave (to, from, next) {
    this.$store.commit('CLEAR_NOTIFICATIONS')
    this.$store.commit('STOP_VERIFICATION_TIMER')
    this.$store.commit('REFRESH_VERIFICATION_TIME')
  },

  computed: {
    ...mapGetters(['VERIFICATION_TIME', 'VERIFICATION_ERROR'])
  },
  watch: {
    VERIFICATION_TIME (value) {
      if (value <= 0) {
        this.$store.commit('STOP_VERIFICATION_TIMER')
      }
    }
  },
  created () {
    this.$store.commit('RESET_VERIFICATION_CODE')
    this.$store.commit('REFRESH_VERIFICATION_TIME')
    this.$store.commit('SET_VERIFICATION_TIMER', () => {
      this.$store.commit('SET_VERIFICATION_TIME', this.VERIFICATION_TIME - 1)
    })
    this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('sendedToEmail'))
  },
  methods: {
    resetVerification () {
      this.$store.commit('RESET_VERIFICATION_ERROR')
    },
    polarToCartesian (centerX, centerY, radius, angleInDegrees) {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      }
    },
    describeArc (x, y, radius, startAngle, endAngle) {
      const start = this.polarToCartesian(x, y, radius, endAngle)
      const end = this.polarToCartesian(x, y, radius, startAngle)

      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

      const d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
      ].join(' ')

      return d
    },
    progressBar () {
      if (this.al <= 0) {
        clearTimeout(this.bar)
      }
      this.al--
    },
    resetVerificationInput () {
      this.$store.commit('RESET_VERIFICATION_CODE')
      this.$store.commit('SET_VERIFICATION_ERROR', {
        state: true,
        method: 'code'
      })

      this.$nextTick(() => this.$refs.Code.reset())
    },
    async confirmCode () {
      const vm = this
      this.$refs.Code.$v.$touch()

      if (this.$refs.Code.$v.$invalid) {
        this.resetVerificationInput()
        this.$emit('toggle-error-popup')
      } else {
        let s1, s2

        switch (this.$store.getters.VERIFICATION_METHOD) {
          case 'login': {
            s1 = 'LOG_IN' // Call Login/Register/Recovery abd then call AUTORIZATION authorizarion.js
            s2 = 'SET_ACTIVATE_NOTIFY'
            break
          }
          case 'registration': {
            s1 = 'REGISTRATION' // Call Login/Register/Recovery abd then call AUTORIZATION authorizarion.js
            s2 = 'SET_REGISTER_NOTIFY'
            break
          }
          case 'recovery': {
            s1 = 'RECOVERY' // Call Login/Register/Recovery abd then call AUTORIZATION authorizarion.js
            s2 = 'SET_RESTORE_NOTIFY'
            break
          }
        }
        if (!(s1 && s2)) {
          return
        }

        const res = await vm.$store.dispatch(s1, vm.$cookies)

        if (res.data.status.toLowerCase() === 'success') {
          await vm.$store.dispatch('CLOSE_GLOBAL_POPUPS')
          vm.$store.commit('RESET_VERIFICATION_ERROR')
          vm.$store.commit('CLEAR_NOTIFICATIONS')
          vm.$store.commit('STOP_VERIFICATION_TIMER')
          vm.$store.commit('REFRESH_VERIFICATION_TIME')
          vm.$store.commit('RESET_VERIFICATION_CODE')

          if (s1 === 'REGISTRATION') {
            const locale = this.$store.getters.PERSONAL_DATA.prefer_lang
            console.log(vm.localePath('profile', locale))
            await vm.$router.push({
              path: vm.localePath('profile', locale),
              params: { notifyaction: s2 }
            })
            // location.reload()
            // return true
          } else if (vm.$route.name && ~vm.$route.name.indexOf('index')) {
            location.reload()
            // return true
          } else {
            await vm.$router.replace({
              path: vm.localePath('index'),
              params: { notifyaction: s2 }
            })
          }

          console.log('hello')
          // Обновляем карту
          this.$nextTick(() => {
            localStorage.setItem('notifyaction', s2)
          })
        } else {
          this.resetVerificationInput()
        }
      }
    },
    getCode () {
      this.resetVerification()
      this.$store.dispatch('RESEND_VERIFICATION_CODE')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
.countdown_svg {
  position: absolute;
  transform: rotateY(180deg);
  background-color: transparent;
}

.formConfirm {
  position: relative;
  display: flex;
  border-radius: 7px;
  padding: 20px 10px 10px 10px;
  width: 100%;

  @media screen and (min-width: 992px) {
    padding: 10px;
  }

  &_body {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
    overflow: auto;

    @media screen and (min-width: 992px) {
      padding: 0 10%;
      grid-template-rows: 1fr repeat(2, 2fr);
      align-items: center;
      justify-items: center;
    }
  }

  &_group {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 3rem;
    margin-bottom: 2rem;

    &:not(:first-of-type) {
      margin: 0;
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
    display: none;
    font-family: $ff-roboto;
    font-size: 18px;
    font-weight: bold;

    @media screen and (min-width: 992px) {
      display: block;
      font-size: 22px;
      margin-bottom: 1rem;
    }

    &-error {
      font-family: $ff-gilroy;
      font-size: $fz-md-sm;
      font-weight: 300;
      color: $c-error;
    }

    span {
      margin-top: 2rem;
      display: block;
      width: 100%;
      text-align: center;
      font-family: $ff-gilroy;
      font-size: 14px;
      font-weight: 300;
      color: $c-error;
    }
  }

  &-btn {
    align-self: center;

    &.confirm {
      margin-top: 40px;
    }

    &.again {
      margin: 4rem 0 2rem;

      &:disabled {
        box-shadow: none;
        background: none;
        background-color: #9d9d9d;
        cursor: not-allowed;
      }
    }
  }

  &_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    @media screen and (min-width: 992px) {
      margin-top: 2rem;
      flex-direction: row;
    }
  }

  &-text {
    font-family: $ff-gilroy;
    font-size: 16px;
    text-align: center;

    @media screen and (min-width: 992px) {
      display: inline-block;
    }
  }

  &-timer {
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    font-family: $ff-gilroy;
    font-size: 14px;
    line-height: 14px;

    @media screen and (min-width: 992px) {
      display: inline-flex;
      margin-left: 4rem;
    }

    &-count {
      font-size: 18px;
    }
  }
}
</style>

<style>
@media screen and (max-width: 991px) {
  .formConfirm .formConfirm-timer {
    margin-top: 4rem !important;
  }
  .formConfirm .code-label {
    margin-left: 10% !important;
  }
  .formConfirm .code-input {
    width: 6rem !important;
  }
  .formConfirm .code_group {
    display: flex;
    flex-direction: row;
    width: 86%;
    margin-left: 7%;
    flex-wrap: nowrap !important;
    justify-content: space-around !important;
  }
  .formConfirm .list-item:not(:first-child) {
    margin: 1rem 0 0;
  }
}
</style>
