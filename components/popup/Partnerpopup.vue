<i18n>
{
  "en": {
    "title": "Build partnership",
    "titleError": "Check all required fields",
    "nameLabel": "Your Name",
    "namePlaceholder": "John Smith",
    "textPlaceholder": "Your message",
    "comPlaceholder": "John Smith & Sons",
    "comLabel": "Company Name",
    "emailLabel": "Email",
    "linkToCode": "Send",
    "phoneLabel": "Phone number",
    "requiredLabel": "Fields are required",
    "textLabel": "Shortly about Your proposal, activity"
  },
  "ru": {
    "title": "Стать партнером",
    "titleError": "Проверьте введённую информацию",
    "nameLabel": "Ваше Имя",
    "namePlaceholder": "Иван Иванов",
    "textPlaceholder": "Ваш текст",
    "comPlaceholder": "Моя компания",
    "comLabel": "Название компании",
    "emailLabel": "Почта",
    "linkToCode": "Отправить",
    "phoneLabel": "Номер телефона",
    "requiredLabel": "Поля обязательные для заполнения",
    "textLabel": "Краткое описание Вашего предложения, услуги"
  }
}
</i18n>

<template>
  <form class="main-send-form-container" @submit.prevent>
    <div class="formBePartner_body">
      <h1 class="formBePartner-title">
        {{ $t('title') }}
        <p
          v-if="
            $v.name.$error ||
              $v.company_name.$error ||
              $v.phone.$error ||
              $v.email.$error
          "
          class="formBePartner-title-error"
        >
          {{ $t('titleError') }}
        </p>
      </h1>
      <div class="formBePartner_group">
        <basic-input-profile-text
          v-model="$v.name.$model"
          :is-error="$v.name.$error"
          :placeholder="$t('namePlaceholder')"
          type="text"
        >
          <span class="requiredLabelWithStar">{{ $t('nameLabel') }}:</span>
        </basic-input-profile-text>

        <basic-input-profile-text
          v-model="$v.company_name.$model"
          :is-error="$v.company_name.$error"
          :placeholder="$t('comPlaceholder')"
          type="text"
        >
          <span class="requiredLabelWithStar">{{ $t('comLabel') }}:</span>
        </basic-input-profile-text>

        <basic-input-auth-phone
          v-model="$v.phone.$model"
          :is-error="tryAct && $v.phone.$error"
        >
          <span class="requiredLabelWithStar">{{ $t('phoneLabel') }}:</span>
        </basic-input-auth-phone>

        <basic-input-profile-text
          v-model="$v.email.$model"
          :is-error="$v.email.$error"
          placeholder="example@site.com"
          type="email"
        >
          <span class="requiredLabelWithStar">{{ $t('emailLabel') }}:</span>
        </basic-input-profile-text>
      </div>

      <div
        class="formBePartner_group_textareaWrap"
        :class="$v.text.$error ? 'error' : ''"
      >
        <p>
          <span class="requiredLabelWithStar">{{ $t('textLabel') }}:</span>
        </p>

        <textarea
          ref="field"
          v-model="text"
          :placeholder="$t('textPlaceholder')"
          class="formBePartner_group-textarea"
          @input="
            $emit('input', $event.target.text)
            $v.text.$touch()
          "
        />
      </div>

      <button class="formBePartner-btn  eatme-btn-colorful" @click="sendMail">
        {{ $t('linkToCode') }}
      </button>
      <div class="formBePartner-required-message">
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
  numeric,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      name: '',
      company_name: '',
      tryAct: false,
      email: '',
      localePhone: '',
      longPhone: '',
      text: ''
    }
  },
  methods: {
    sendMail () {
      this.tryAct = true
      this.$v.$touch()

      if (this.$v.$invalid) {
        console.error('sendMail invalid fields', true)
      } else {
        const form = {
          phone: this.longPhone,
          email: this.email,
          name: this.name,
          company: this.company_name,
          offer: this.text
        }

        this.$store
          .dispatch('SEND_PARTNER_FORM', form, this.$cookies)
          .then((res) => {
            if (res.status === 'success') {
              this.$store.commit(
                'SET_SUCCESS_NOTIFY',
                res && res.message ? res.message : true
              )
              this.$store.commit('SET_ERROR_NOTIFY', false)
              this.close()
            } else {
              throw new Error(res.status + res.message)
            }
          })
          .catch(() => {
            this.$store.commit('SET_ERROR_NOTIFY', true)
          })
      }
    },
    close () {
      this.$store.commit('SET_PARTNER_POPUP', false)
    }
  },
  computed: {
    phone: {
      get () {
        return this.localePhone
      },
      set (phone) {
        const localePhone = phone.split(' | ')[0]
        const longPhone = phone.split(' | ')[1]

        this.localePhone = localePhone
        this.longPhone = longPhone
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
    },
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(42)
    },
    company_name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(42)
    },
    text: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(200)
    },
    email: {
      required,
      email
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.main-send-form-container {
  width: 100%;
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

.formBePartner {
  position: relative;
  display: flex;
  border-radius: 7px;
  padding: 10px 15px;
  width: 100%;
  height: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;

  @media screen and (min-width: 992px) {
    padding: 10px;
    width: 90%;
  }

  &_group_textareaWrap {
    width: 100%;
    margin-top: 7px;

    &.error {
      p {
        color: $c-error;
      }
      .formBePartner_group-textarea {
        border-color: $c-error;
      }
    }
    p {
      margin-bottom: 5px;
      font-family: $ff-gilroy;
      font-size: 12px;

      @media screen and (max-width: 991px) {
        margin: 1rem 0;
      }
    }

    & /deep/ {
      .formBePartner_group-textarea {
        border: 1px solid #e2e2e2;
        border-radius: 5px;
        width: 100% !important;
        padding: 1rem;
        box-sizing: border-box;
        height: 100px;
        background: #fff 0 0 no-repeat padding-box;
        &.error {
          border-color: $c-error;
        }
        @media screen and (max-width: 991px) {
          box-shadow: 0px 3px 6px #11100029;
        }
      }

      .vs__dropdown-toggle {
        border: none;
        font-size: $fz-md-sm;
      }
    }
  }

  &_body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 10%;

    @media screen and (min-width: 992px) {
      display: grid;
      grid-template-rows: 1fr repeat(3, auto) 1fr;
      grid-row-gap: 10px;
      align-items: center;
      justify-items: center;
    }

    // & > *:not(:first-child) {
    //   margin-top: 1rem
    // }

    & /deep/ {
      input {
        font-family: Gilroy-Light, sans-serif;
      }

      .checkbox {
        grid-column-gap: 15px;
        padding: 0 5px;
        width: 100%;

        &-icon {
          align-self: start;
        }

        &-txt {
          width: 90%;
          font-size: $fz-md-sm;

          @media screen and (min-width: 992px) {
            width: 100%;
            font-size: 14px;
          }

          span {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }

  &_group {
    width: 100%;

    @media screen and (min-width: 992px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      grid-column-gap: 3rem;
      grid-row-gap: 1rem;
    }

    & > *:not(:first-child) {
      margin-top: 1.8rem;

      @media screen and (min-width: 992px) {
        margin-top: 7px;
      }
    }

    & /deep/ {
      p {
        font-size: $fz-md-sm !important;

        @media screen and (min-width: 992px) {
          font-size: 12px !important;
        }
      }

      .profileText-input {
        font-size: $fz-md-sm;

        @media screen and (min-width: 992px) {
          font-size: 14px;
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

  &-title {
    display: block;
    font-family: $ff-roboto;
    font-size: $fz-md-high;
    font-weight: bold;
    text-align: center;
    margin-bottom: 3rem;

    @media screen and (min-width: 992px) {
      font-size: 22px;
      margin-bottom: 1.8rem;
    }

    &-error {
      font-family: $ff-gilroy;
      font-size: $fz-md-sm;
      font-weight: 300;
      color: $c-error;
    }
  }

  &-btn {
    margin-top: 2.6rem;

    @media screen and (min-width: 992px) {
      margin-top: 1.6rem;
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
    min-height: 20px;
    max-height: 40px;
    display: flex;
    align-items: center;
    font-family: $ff-gilroy;
    font-size: $fz-md-sm;
    margin-top: 0.5rem !important;
    line-height: 18px;

    &::before {
      content: '*';
      display: inline-block;
      margin: 0.5em 0.5em 0 0;
      color: #eb608f;
      font-size: 2rem;
    }

    @media screen and (min-width: 992px) {
      margin-top: 0 !important;
      align-self: start;
    }

    & > span {
      font-size: $fz-md-sm;
      color: $c-error;
      margin-right: 10px;
    }
  }
}
</style>
