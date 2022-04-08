<i18n>
{
  "en": {
    "title": "User registration",
    "titleError": "Check required fields",
    "titleValidError": "Please check your data and try again",
    "phoneLabel": "Enter your phone number",
    "emailLabel": "Enter your Email",
    "langLabel": "Choose the language",
    "linkToCode": "Get an activation code",
    "currencyLabel": "Your currency",
    "requiredLabel": "Fields are required",
    "errorEmptyFields": "Check your fields",
    "agreeLabel": "I agree with the processing of my personal data.",
    "agreeLabelLink": "View the text of the Agreement."
  },
  "ru": {
    "title": "Регистрация пользователя",
    "titleError": "Проверьте введенные данные",
    "titleValidError": "Пожалуйста проверьте Ваши данные и попробуйте снова",
    "phoneLabel": "Номер телефона",
    "emailLabel": "Почта",
    "langLabel": "Язык",
    "linkToCode": "Получить код",
    "currencyLabel": "Ваша валюта",
    "requiredLabel": "Поля обязательные для заполнения",
    "errorEmptyFields": "Заполните все поля",
    "agreeLabel": "Я согласен(а) на обработку моих персональных данных.",
    "agreeLabelLink": "Посмотреть текст соглашения."
  }
}
</i18n>

<template>
  <form class="formRegistrate ml-a mr-a" @submit.prevent>
    <div
      class="formRegistrate_body"
      @click="$store.commit('RESET_VERIFICATION_ERROR')"
    >
      <h1 class="formRegistrate-title">
        {{ $t('title') }}
        <template v-if="!isMobile">
          <p v-if="VERIFICATION_ERROR.state" class="formRegistrate-title-error">
            {{ VERIFICATION_ERROR.text || $t('titleError') }}
          </p>
          <p
            v-else-if="$v.$error && (!phone || !email || !isAgree)"
            class="formRegistrate-title-error"
          >
            {{ $t('errorEmptyFields') }}
          </p>
        </template>
      </h1>
      <div class="formRegistrate_group">
        <basic-input-auth-phone
          v-model="$v.phone.$model"
          :is-error="tryAct && $v.phone.$error"
          class="spacing"
        >
          <span class="requiredLabelWithStar">{{ $t('phoneLabel') }}:</span>
        </basic-input-auth-phone>

        <div class="formRegistrate_group_selectWrap spacing">
          <p>
            <span
              class="requiredLabelWithStar"
            >{{ $t('currencyLabel') }}:</span>
          </p>
          <basic-input-select
            v-model="$v.currency.$model"
            :is-error="$v.currency.$error"
            placeholder="(₽ рубли)"
            :options="CUR_LIST"
            :searchable="false"
            :clearable="false"
            label="name"
            class="formRegistrate_group-select "
          />
        </div>

        <basic-input-profile-text
          v-model="$v.email.$model"
          :is-error="$v.email.$error"
          placeholder="example@site.com"
          type="email"
        >
          <span class="requiredLabelWithStar">{{ $t('emailLabel') }}:</span>
        </basic-input-profile-text>

        <div class="formRegistrate_group_selectWrap">
          <p>
            <span class="requiredLabelWithStar">{{ $t('langLabel') }}:</span>
          </p>
          <basic-input-select
            v-model="$v.lang.$model"
            :is-error="$v.lang.$error"
            placeholder="English"
            :options="LANG_LIST"
            :searchable="false"
            :clearable="false"
            label="name"
            class="formRegistrate_group-select"
          />
        </div>
      </div>
      <basic-input-checkbox
        v-model="$v.isAgree.$model"
        :is-error="$v.isAgree.$error"
        class="checkboxSpacer"
      >
        {{ $t('agreeLabel') }} <span><br>{{ $t('agreeLabelLink') }}</span>
      </basic-input-checkbox>

      <button
        class="formRegistrate-btn eatme-btn-colorful "
        @click="goToConfirmation"
      >
        {{ $t('linkToCode') }}
      </button>
      <div class="formRegistrate-required-message">
        {{ $t('requiredLabel') }}
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  required,
  email,
  sameAs,
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
        this.$store.commit('SET_REGISTRATION_FORM_DATA', { phone: longPhone })
      }
    },
    email: {
      get () {
        return this.$store.getters.REGISTRATION_FORM.email
      },
      set (value) {
        this.$store.commit('SET_REGISTRATION_FORM_DATA', { email: value })
      }
    },
    currency: {
      get () {
        const curcode = this.$store.getters.REGISTRATION_FORM.currency_code
        const foundItem = this.CUR_LIST.find((item) => {
          if (item.code === curcode) {
            return true
          }
        })

        if (!this.$_.isNil(foundItem)) {
          return foundItem
        }

        return { code: null, name: '' }
      },
      set (item) {
        this.$store.commit('SET_REGISTRATION_FORM_DATA', {
          currency_code: item.code
        })
      }
    },

    lang: {
      get () {
        const langcode = this.$store.getters.REGISTRATION_FORM.language
        const foundItem = this.LANG_LIST.find((item) => {
          if (item.code === langcode) {
            return true
          }
        })

        if (!this.$_.isNil(foundItem)) {
          return foundItem
        }

        return { code: null, name: '' }
      },
      set (item) {
        this.$store.commit('SET_REGISTRATION_FORM_DATA', {
          language: item.code
        })
      }
    },
    LANG_LIST: {
      get () {
        return this.$store.getters.LANGUAGES
      }
    },
    CUR_LIST: {
      get () {
        return this.$store.getters.CURRENCIES
      }
    },

    isAgree: {
      get () {
        return this.$store.getters.REGISTRATION_FORM.isAgree
      },
      set (value) {
        this.$store.commit('SET_REGISTRATION_FORM_DATA', { isAgree: value })
      }
    },
    ...mapGetters(['VERIFICATION_ERROR'])
  },
  watch: {
    'VERIFICATION_ERROR.state' (state) {
      if (this.isMobile) {
        console.warn('VERIFICATION_ERROR.state', state)
        if (state) {
          if (!this.phone || !this.email || !this.isAgree) {
            // if (this.$v.$error && (!this.phone || !this.email || !this.isAgree)) {
            this.$store.commit(
              'SET_SIMPLE_ERROR_POPUP',
              this.$t('errorEmptyFields')
            )
          } else {
            this.$store.commit(
              'SET_SIMPLE_ERROR_POPUP',
              this.VERIFICATION_ERROR.text || this.$t('titleError')
            )
          }
          // } else {
          //   this.$store.commit('SET_SIMPLE_ERROR_POPUP', false)
        }
      }
    }
  },

  validations: {
    phone: {
      required,
      numeric,
      minLength: minLength(9),
      maxLength: maxLength(11)
    },
    email: {
      required,
      email
    },
    currency: {
      required
    },
    lang: {
      required
    },
    isAgree: {
      required,
      sameAs: sameAs(() => true)
    }
  },
  created () {
    this.$store.commit('RESET_REGISTRATION_FORM_DATA')
    this.$store.commit('RESET_VERIFICATION_ERROR')

    this.$store.dispatch('GET_LANGUAGES', this.$cookies)
    this.$store.dispatch('GET_CURRENCIES', this.$cookies)
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.$store.commit('RESET_REGISTRATION_FORM_DATA')
      vm.$store.commit('RESET_VERIFICATION_ERROR')
    })
  },
  methods: {
    async goToConfirmation () {
      this.tryAct = true
      this.$v.$touch()
      const vm = this

      if (this.$v.$invalid && this.$v.phone.$error) {
        this.$store.commit('SET_VERIFICATION_ERROR', {
          state: true,
          method: 'phone'
        })
        this.$emit('toggle-error-popup')
      } else if (this.$v.$invalid && this.$v.email.$error) {
        this.$store.commit('SET_VERIFICATION_ERROR', {
          state: true,
          method: 'email'
        })
        this.$emit('toggle-error-popup')
      } else if (this.$v.$invalid) {
        this.$store.commit('SET_VERIFICATION_ERROR', {
          state: true,
          method: 'phone'
        })
        this.$emit('toggle-error-popup')
      } else {
        const { data } = await this.$store.dispatch(
          'SEND_VERIFICATION_CODE',
          'registration'
        )

        if (data.send_verify_code) {
          vm.confirmationHandle()
          // vm.$store.commit('RESET_REGISTRATION_FORM_DATA')
          vm.$store.commit('RESET_VERIFICATION_ERROR')
        }
      }
    }
  }
}
</script>
<style>
.vs__actions::before {
  display: block;
  content: ' ';
  background-image: url('~assets/icons/L_arrow.svg');
  background-size: contain;
  background-repeat: no-repeat;
  width: 12px;
  height: 12px;
  overflow: visible;
}
.vs__open-indicator {
  display: none !important;
}

.vs__dropdown-menu {
  border-color: #e2e2e2 !important;
  width: 100%;
  padding: 0 !important;
}
.vs__dropdown-option {
  padding: 0.75rem;
  font-size: 14px !important;
}
.vs__dropdown-menu > .vs__dropdown-option--selected,
.vs__dropdown-menu > .vs__dropdown-option--highlight {
  color: inherit;
  background: white;
}
</style>
<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
.spacing {
  margin-bottom: 8px;
}
.checkboxSpacer {
  margin-top: 20px !important;
  margin-bottom: 15px !important;
}
@media screen and (min-width: 992px) {
  /deep/ .vs__dropdown-menu > .vs__dropdown-option--highlight {
    background: #f3bd4432;
  }
  /deep/ .vs__dropdown-menu > .vs__dropdown-option--selected {
    background: #f3bd44;
    color: white !important;
  }
}

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

.formRegistrate {
  position: relative;
  display: flex;
  border-radius: 7px;
  padding: 10px 15px;
  width: 100%;

  @media screen and (min-width: 992px) {
    padding: 0;
  }

  &_body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: auto;

    @media screen and (min-width: 992px) {
      padding: 0 10%;
      display: grid;
      grid-template-rows: 1fr repeat(3, auto) 1fr;
      grid-row-gap: 10px;
      align-items: center;
      justify-items: center;
    }

    & > *:not(:first-child) {
      margin-top: 20px;

      @media screen and (min-width: 992px) {
        margin-top: 5px;
      }
    }

    & /deep/ {
      .checkbox {
        grid-column-gap: 15px;
        padding: 0 5px;
        width: 100%;

        &-icon {
          align-self: start;
        }

        &-txt {
          width: 90%;
          font-size: 14px;

          @media screen and (min-width: 992px) {
            width: 100%;
          }

          span {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }

  &_group_selectWrap {
    margin-top: 15px;
    p {
      margin-bottom: 5px;
      font-family: $ff-gilroy;
      font-size: $fz-md-sm;
    }

    & /deep/ {
      .formRegistrate_group-select {
        border: 1px solid #e2e2e2;
        border-radius: 5px;
        padding: 5px 10px 5px 3px;
        width: 100%;
        height: 40px;
        background: #fff 0 0 no-repeat padding-box;
      }

      .vs__dropdown-toggle {
        border: none;
        font-size: $fz-md-sm;
      }
    }
  }
  @media screen and (max-width: 991px) {
    &_group_selectWrap {
      & /deep/ {
        .vs__dropdown-toggle {
          border: none;
          font-size: 14px;
        }
      }
    }
  }

  &_group {
    width: 100%;
    padding: 0 5px;

    @media screen and (min-width: 992px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      grid-column-gap: 3rem;
      grid-row-gap: 1rem;
    }
    & > *:not(:first-child) {
      margin-top: 20px;

      @media screen and (min-width: 992px) {
        margin-top: 0;
      }
    }

    & /deep/ {
      p {
        font-size: $fz-md-medium !important;

        @media screen and (min-width: 992px) {
          font-size: 12px !important;
        }
      }

      .profileText-input {
        font-size: 14px;
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
    display: none;
    font-family: $ff-roboto;
    font-size: $fz-md-high;
    font-weight: bold;
    text-align: center;

    @media screen and (min-width: 992px) {
      display: block;
      font-size: 22px;
      margin-bottom: 13px;
    }

    &-error {
      font-family: $ff-gilroy;
      font-size: $fz-md-sm;
      font-weight: 300;
      color: $c-error;
    }
  }

  &-btn {
    @media screen and (min-width: 992px) {
      margin-top: 30px;
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

  &-required-message {
    display: none;
    font-family: $ff-gilroy;
    font-size: $fz-md-low;

    &::before {
      content: '*';
      display: inline-block;
      margin: 0.5em 1em 0 0;
      color: #eb608f;
      font-size: 2rem;
    }

    @media screen and (min-width: 992px) {
      align-self: start;
      display: flex;
      align-items: center;
      margin-top: 0 !important;
      font-size: 14px;
    }

    & > span {
      font-size: $fz-md-medium;
      color: $c-error;
      margin-right: 10px;
    }
  }
}
</style>
