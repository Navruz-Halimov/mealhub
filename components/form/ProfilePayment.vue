<i18n>
{
  "en": {
    "phone": "Phone number",
    "viewTitle": "Your card",
    "createTitle": "Add card",
    "cardNubmerLabel": "Card number:",
    "cardOwnerLabel": "Owner first/last name (on card)",
    "cardOwnerPlaceholder": "JOSH SMITH",
    "cardDateLabel": "Date:",
    "createButtonLabel": "Create",
    "successDeletedTitle": "Card was delete successfully!",
    "validationErrorTitle": "Please check your inputs and try again",
    "serverErrorTitle": "Fail/duplicate card... Please check and try again",
    "cardIsExists": "This card is already in your list"
  },
  "ru": {
    "phone": "Номер телефона",
    "viewTitle": "Ваша карта",
    "createTitle": "Добавить банковскую карту",
    "cardNubmerLabel": "Номер карты:",
    "cardOwnerLabel": "ФИО владельца (как на карте)",
    "cardOwnerPlaceholder": "ИВАНОВ ИВАН",
    "cardDateLabel": "Действительна до:",
    "createButtonLabel": "Сохранить",
    "successDeletedTitle": "Успешно удалено!",
    "validationErrorTitle": "Проверьте поля и попробуйте снова",
    "serverErrorTitle": "Ошибка/копирование карты... Перепроверьте и попробуйте снова",
    "cardIsExists": "Такая карта уже существует"
  }
}
</i18n>

<template>
  <form class="form" @submit.prevent>
    <p class="form-title">
      <span v-if="action === 'view'">
        {{ $t('viewTitle') }}
      </span>
      <span
        v-else
        :class="[
          'payment__list-icon-wrapper',
          { 'green text-22 roboto': isMobile }
        ]"
      >
        <span class="payments_list-icon-desktop">
          <bank-card icon-width="25px" icon-height="25px" bg-color="#A2A2A2" />
        </span>
        {{ $t('createTitle') }}
      </span>
      <span class="form-title-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.291 12.064">
          <path
            d="M14.942,5.656,9.688.316a1.048,1.048,0,0,0-1.5,0L5.311,3.239a1.106,1.106,0,0,0,0,1.537l.477.5h1.1L5.861,4.217a.3.3,0,0,1-.083-.21A.294.294,0,0,1,5.861,3.8l.38-.374L8.047,5.274H9.779L7.107,2.545,8.739.881a.284.284,0,0,1,.2-.087.276.276,0,0,1,.2.082l5.255,5.339a.287.287,0,0,1,.083.2.3.3,0,0,1-.091.2l-.3.3V8.034l.848-.854A1.09,1.09,0,0,0,14.942,5.656Z"
            transform="translate(-3.959 0)"
          />
          <path
            d="M9.609,21.328H2.177A1.088,1.088,0,0,0,1.091,22.4v2.856h9.565V22.4A1.055,1.055,0,0,0,9.609,21.328ZM3.688,24.286a.762.762,0,0,1-.534-.219.762.762,0,0,1-.534.219.784.784,0,0,1,0-1.568.761.761,0,0,1,.534.219.761.761,0,0,1,.534-.219.784.784,0,0,1,0,1.568Z"
            transform="translate(-1.091 -15.553)"
          />
          <path
            d="M1.091,40.4a1.094,1.094,0,0,0,1.086,1.08H9.609a1.061,1.061,0,0,0,1.047-1.08v-.063H1.091Z"
            transform="translate(-1.091 -29.412)"
          />
        </svg>
      </span>
    </p>
    <basic-input-profile-card-number
      v-model.trim="$v.number.$model"
      :is-error="$v.number.$error"
      :disabled="action === 'view'"
      placeholder="0000 0000 0000 0000"
      class="form_input-text"
    >
      {{ $t('cardNubmerLabel') }}
    </basic-input-profile-card-number>
    <basic-input-profile-text
      v-model="$v.owner.$model"
      :is-error="$v.owner.$error"
      :disabled="action === 'view'"
      :placeholder="$t('cardOwnerPlaceholder')"
      class="form_input-text"
    >
      {{ $t('cardOwnerLabel') }}
    </basic-input-profile-text>
    <div class="form_addition">
      <div class="form_date">
        <p
          class="form_date-label"
          :class="{ error: $v.expireM.$error || $v.expireY.$error }"
        >
          {{ $t('cardDateLabel') }}
        </p>
        <div
          class="form_date-input"
          :class="{ error: $v.expireM.$error || $v.expireY.$error }"
        >
          <basic-input-select
            v-model.trim.number="$v.expireM.$model"
            :is-error="$v.expireM.$error"
            :disabled="action === 'view'"
            placeholder="00"
            :options="monthOptions"
            :searchable="false"
            :clearable="false"
            class="form_date-select form_input-text"
          />
          <span>/</span>
          <basic-input-select
            v-model.trim.number="$v.expireY.$model"
            :is-error="$v.expireY.$error"
            :disabled="action === 'view'"
            placeholder="0000"
            :options="yearOptions"
            :searchable="false"
            :clearable="false"
            class="form_date-select form_input-text"
          />
        </div>
      </div>
      <basic-input-profile-card-code
        v-model.trim="$v.cvv.$model"
        class="cdemgr ml-1 form_input-text"
        :is-error="$v.cvv.$error"
        :disabled="action === 'view'"
        placeholder="000"
        min="1"
        max="3"
      >
        CVC/CVV/CID:
      </basic-input-profile-card-code>
    </div>
    <button v-if="action === 'view'" />
    <button v-else class="form-save eatme-btn-colorful" @click="createNewCard">
      {{ $t('createButtonLabel') }}
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  required,
  minLength,
  maxLength,
  minValue,
  maxValue,
  numeric
} from 'vuelidate/lib/validators'
import bankCard from '../icons/bank-card.vue'
export default {
  components: { bankCard },
  props: {
    action: {
      type: String
    }
  },
  data () {
    return {
      monthOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      yearOptions: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]
    }
  },
  computed: {
    number: {
      get () {
        let formattedNumber = this.CURRENT_PAYMENT.number
        formattedNumber = formattedNumber.replace(/\s/g, '')
        formattedNumber = formattedNumber.replace(/(\d{4})/g, '$1 ').trim()
        /* formattedNumber.replace(/(\d)(?=(\d{4})+(\D|$))/g, ' ') */
        console.log(formattedNumber)
        return formattedNumber
      },
      set (value) {
        if (value.length > 19) {
          const formattedValue = value
            .split(' ')
            .join('')
            .slice(0, -1)
          this.$store.commit('SET_CURRENT_PAYMENT_DATA', {
            number: formattedValue
          })
        } else if (new RegExp(/^\p{L}/, 'u').test(value[value.length - 1])) {
          const formattedValue = value
            .split(' ')
            .join('')
            .slice(0, -1)
          this.$store.commit('SET_CURRENT_PAYMENT_DATA', {
            number: formattedValue
          })
        } else {
          const formattedValue = value.split(' ').join('')
          this.$store.commit('SET_CURRENT_PAYMENT_DATA', {
            number: formattedValue
          })
        }
      }
    },
    owner: {
      get () {
        return this.CURRENT_PAYMENT.owner
      },
      set (value) {
        this.$store.commit('SET_CURRENT_PAYMENT_DATA', {
          owner: value.toUpperCase()
        })
      }
    },
    expireM: {
      get () {
        return this.CURRENT_PAYMENT.expire_m
      },
      set (value) {
        this.$store.commit('SET_CURRENT_PAYMENT_DATA', { expire_m: value })
      }
    },
    expireY: {
      get () {
        return this.CURRENT_PAYMENT.expire_y
      },
      set (value) {
        this.$store.commit('SET_CURRENT_PAYMENT_DATA', { expire_y: value })
      }
    },
    cvv: {
      get () {
        return this.CURRENT_PAYMENT.cvv
      },
      set (value) {
        this.$store.commit('SET_CURRENT_PAYMENT_DATA', { cvv: value })
      }
    },
    ...mapGetters(['CURRENT_PAYMENT', 'SELECTED_CARD', 'PAYMENTS'])
  },
  validations: {
    number: {
      required,
      myNumeric (value) {
        const regex = new RegExp('^[0-9 ]+$', 'g')
        if (regex.test(value)) {
          return true
        } else {
          return false
        }
      },
      minLength: minLength(19),
      maxLength: maxLength(19)
    },
    owner: {
      required
    },
    expireM: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(12)
    },
    expireY: {
      required,
      minValue: minValue(2020),
      maxValue: maxValue(2050)
    },
    cvv: {
      numeric,
      minLength: minLength(3),
      maxLength: maxLength(3)
    }
  },
  methods: {
    resetValidation () {
      this.$v.$reset()
    },
    async createNewCard () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$parent.toggleErrorPopup()
        return
      }

      try {
        const res = await this.$store.dispatch('ADD_NEW_PAYMENT', this.$cookies)
        console.warn('ADD_NEW_PAYMENT', res)

        if (res.data && res.data.status === 'success') {
          this.$v.$reset()
          this.$nextTick(() => {
            this.$v.$reset()
          })
          if (this.SELECTED_CARD === undefined) {
            const card = this.PAYMENTS[this.PAYMENTS.length - 1]
            this.$store.commit('SET_SELECTED_CARD', card.id) // передаём созданую карту в оплату
            this.$router.back()
            this.$v.$reset()
            this.$emit('select-step', 0)
          } else {
            this.$parent.toggleSuccessPopup()
            this.$emit('select-step', 0)
          }
          this.$v.$reset()
        } else if (
          res.response &&
          res.response.status === 424 &&
          res.response.data.error_type === 'card_exists'
        ) {
          this.$parent.toggleErrorPopup(this.$t('cardIsExists'))
        } else {
          this.$parent.toggleErrorPopup()
        }
      } catch (err) {
        this.$parent.toggleErrorPopup()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.cdemgr {
  @media screen and (max-width: 991px) {
    margin-left: auto;
  }
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & > *:not(:first-child) {
    margin-top: 15px;
  }

  &-title {
    align-self: center;
    font-family: $ff-roboto;
    font-size: 18px;
    font-weight: bold;
    color: $c-green;
    text-align: center;
    color: #555;

    @media screen and (max-width: 991px) {
      margin-top: 2rem;
      max-width: 300px;
    }
    @media screen and (min-width: 992px) {
      align-self: flex-start;
      font-family: $ff-gilroy;
      font-size: 16px;
      font-weight: 300;
    }

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      margin-top: 10px;
      width: 60px;
      height: 60px;

      @media screen and (min-width: 992px) {
        display: none;
      }

      svg {
        width: 100%;
        height: 100%;
        fill: $c-green;
      }
    }
  }

  &-phone {
    align-self: flex-start;
    display: block;
    margin-top: 5px;
    font-family: $ff-gilroy;
    font-size: 12px;

    @media screen and (min-width: 992px) {
      display: none;
    }

    span {
      margin-left: 5px;
      font-size: 16px;
    }
  }

  &_addition {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 10px;
    @media screen and (max-width: 991px) {
      width: 100%;
      .form_date {
        margin-right: 4rem;
      }
    }
  }

  &_date {
    &-label {
      font-size: 12px;
      color: $c-green;

      @media screen and (min-width: 992px) {
        color: $c-primary;
      }

      &.error {
        color: $c-error;
      }
    }
    &-input {
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 3px 6px #11100029;
      margin-top: 5px;
      border: 1px solid #e2e2e2;
      border-radius: 7px;
      padding: 5px 10px;
      width: 100%;
      height: 40px;
      background: #ffffff 0% 0% no-repeat padding-box;

      @media screen and (min-width: 992px) {
        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 0px 6px 7px #d5d5d51a;
        border: 1px solid #e2e2e2;
        border-radius: 4px;
      }

      &.error {
        border-color: $c-error;
      }

      & *:not(:first-of-type) {
        margin-left: 2px;
      }
    }

    &-select /deep/ {
      height: 100%;
      &:first-of-type .vs__dropdown-toggle {
        width: 30px;
      }
      &:last-of-type .vs__dropdown-toggle {
        width: 40px;
      }

      .vs__dropdown-toggle {
        height: 100%;
        border: none;
        font-size: 14px;
      }

      .vs__search {
        display: block;
        padding: 0;
      }

      .vs__clear,
      .vs__open-indicator,
      .vs__actions {
        display: none;
      }

      .vs__dropdown-menu {
        background: #ffffff !important;
        box-shadow: 0px 3px 6px #11100029;
        border: 1px solid #e2e2e2;
        border-radius: 5px;
        padding: 0;
        font-size: 12px !important;
        max-height: 20rem;
        .vs__dropdown-option {
          font-size: 12px !important;
        }
      }

      .vs__dropdown-option {
        margin: 0 !important;
        padding: 10px !important;

        &:not(:first-child) {
          border-top: {
            width: 1px;
            style: solid;
            color: $c-line;
          }
        }

        &--selected,
        &--highlight {
          background-color: transparent;
          color: $c-primary;
        }

        &:hover {
          background-color: $orange;
          color: $c-light;
        }
      }
    }
  }

  &-save {
    margin-top: 40px !important;
  }
}
.payment__list-icon-wrapper {
  display: flex;
}
.payments_list-icon-desktop {
  margin-right: 5px;
  color: #c4c4c4;
  display: none;
  @media screen and(min-width:992px) {
    display: block;
  }
}
</style>

<style>
@media screen and (max-width: 991px) {
  .form .profileCardCode-input,
  .form .form_date-select,
  .form .profileText-input,
  .form .profileCardNumber-input {
    font-size: 14px !important;
  }
}
</style>
