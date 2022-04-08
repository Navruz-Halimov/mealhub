<i18n>
{
  "en": {
    "title": "Registration for business",
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
    "agreeLabelLink": "View the text of the Agreement.",
    "address":"For example, the restaurant “Romashka”",
    "name":"Ivan Ivanov Ivanovich",
    "cateringName":"Catering Point name",
    "contactPerson":"Full name of the contact person"
  },
  "ru": {
    "title": "Регистрация для бизнеса",
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
    "agreeLabelLink": "Посмотреть текст соглашения.",
    "address":"Например, ресторан “Ромашка”",
    "name":"Иванов Иван Иванович",
    "cateringName":"Название заведения:",
    "contactPerson":"ФИО контактного лица"
  }
}
</i18n>

<template>
  <form class="formRegistrate ml-a mr-a" @submit.prevent>
    <!-- <div class="formRegistrate-logo">
      <AnimatedLogo :is-logo="true" />
    </div> -->
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
      <div class="catering__name-wrap">
        <basic-input-profile-text
          v-model="$v.company_name.$model"
          :is-error="$v.company_name.$error"
          :placeholder="$t('address')"
          type="text"
          class="catering__name"
        >
          <span class="requiredLabelWithStar">{{ $t('cateringName') }}:</span>
        </basic-input-profile-text>
      </div>
      <div class="catering__group">
        <basic-input-auth-phone
          v-model="$v.phone.$model"
          :is-error="tryAct && $v.phone.$error"
          class="catering__phone"
        >
          <span class="requiredLabelWithStar">{{ $t('phoneLabel') }}:</span>
        </basic-input-auth-phone>
        <basic-input-profile-text
          v-model="$v.email.$model"
          :is-error="$v.email.$error"
          placeholder="example@site.com"
          type="email"
          class="catering__email"
        >
          <span class="requiredLabelWithStar">{{ $t('emailLabel') }}:</span>
        </basic-input-profile-text>
      </div>
      <div class="catering__group spacing">
        <basic-input-profile-text
          v-model="$v.personName.$model"
          :is-error="$v.personName.$error"
          :placeholder="$t('name')"
          type="text"
          class="catering__username"
        >
          <span class="requiredLabelWithStar">{{ $t('contactPerson') }}:</span>
        </basic-input-profile-text>

        <div class="formRegistrate_group_selectWrap ">
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
      tryAct: false,
      localePhone: '',
      longPhone: '',
      name: '',
      email: '',
      company_name: '',
      personName: '',
      currencyCode: 'RUB',
      currentLangCode: 'ru',
      agreement: false
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
        this.longPhone = longPhone
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
        this.currencyCode = item.code
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
        this.currentLangCode = item.code
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
        return this.agreement
      },
      set (value) {
        this.agreement = value
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
        }
      }
    }
  },
  validations: {
    company_name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(42)
    },
    personName: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(42)
    },
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
    goToConfirmation () {
      this.tryAct = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$emit('toggle-error-popup')
      } else {
        const form = {
          phone: this.longPhone,
          email: this.email,
          catering_name: this.company_name,
          full_name: this.personName,
          currency_code: this.currencyCode,
          language: this.currentLangCode,
          agree_personal_data: this.agreement
        }
        this.$store.dispatch('CATERINGREGISTRATION', form)
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
.checkboxSpacer {
  margin-top: 20px !important;
  margin-bottom: 15px !important;
}
@media screen and (min-width: 992px) {
  /deep/ .vs__dropdown-menu > .vs__dropdown-option--highlight {
    background: #f3bd4432;
  }
  /deep/ .vs__dropdown-menu > .vs__dropdown-option--selected {
    background: $orange;
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

.catering {
  &__name-wrap {
    width: 100%;
    .catering__name {
      width: 100%;
      margin-bottom: 13px;
      @media screen and (max-width: 991px) {
        margin-bottom: 0;
      }
    }
  }
  &__group {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    &.spacing {
      margin-top: 17px !important;
      @media screen and (max-width: 992px) {
        margin-top: 0 !important;
      }
    }
    @media screen and (max-width: 992px) {
      display: block;
    }
  }
  &__phone {
    width: 240px;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
  &__email {
    width: 402px;
    @media screen and (max-width: 992px) {
      width: 100%;
      margin-top: 28px;
    }
  }
  &__username {
    max-width: 186px;
    width: 100%;
    @media screen and (max-width: 992px) {
      width: 100%;
      max-width: 100%;
      margin-top: 28px;
    }
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
    max-width: 661px;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    overflow: auto;
    @media screen and (min-width: 992px) {
    }
    & > *:not(:first-child) {
      margin-top: 28px;
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
    max-width: 217px;
    @media screen and (max-width: 991px) {
      width: 100%;
      max-width: 100%;
      margin-top: 28px;
    }
    width: 100%;
    p {
      margin-bottom: 5px;
      font-family: $ff-gilroy;
      font-size: $fz-md-sm;
    }
    & /deep/ {
      .formRegistrate_group-select {
        border: 1px solid $c-line;
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
      margin-bottom: 15px;
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
      color: $c-error;
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
