<i18n>
{
  "en": {
    "countrySelectorLabel": "+34",
    "countrySelectorError": "Select code",
    "phoneNumberLabel": "000 00-0000",
    "example": "Example:"
  },
  "ru": {
    "countrySelectorLabel": "+34",
    "countrySelectorError": "Выберите код",
    "phoneNumberLabel": "000 00-0000",
    "example": "Пример:"
  }
}
</i18n>

<template>
  <div class="authPhone" :class="{ error: isError }" @click="wasFocused = true">
    <div class="authPhone-text">
      <slot />
    </div>
    <!-- default-country-code="RU"
      :preferred-countries="['RU', 'UA', 'DE']" -->
    <basic-input-phone
      :value="value"
      required
      color="#E2E2E2"
      valid-color="#E2E2E2"
      error-color="#eb608f"
      show-code-on-list
      no-use-browser-locale
      @update="updateInput($event)"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String
    },
    isError: {
      type: Boolean
    }
  },
  data () {
    return {
      phone: '',
      wasFocused: false
    }
  },
  computed: {
    translationsOption () {
      const countrySelectorLabel = this.$t('countrySelectorLabel')
      const countrySelectorError = this.$t('countrySelectorError')
      const phoneNumberLabel = this.$t('phoneNumberLabel')
      const example = this.$t('example')

      return {
        countrySelectorLabel,
        countrySelectorError,
        phoneNumberLabel,
        example
      }
    }
  },
  methods: {
    updateInput (event) {
      console.log(event)
      if (event.nationalNumber) {
        this.$emit('input', `${event.nationalNumber} | ${event.e164}`)
      } else if (event.phoneNumber) {
        this.$emit('input', `${event.phoneNumber} | ${''}`)
      } else {
        this.$emit('input', ' | ')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.authPhone {
    display: grid;
    grid-template-rows: auto 40px;
    grid-row-gap: 5px;
    align-items: center;
    width: 100%;

    &.error {
        .authPhone-text {
            color: $c-error;
        }

        & /deep/ {
            .country-selector__input {
                border-color: $c-error !important;
                border-right: none;
            }
            .input-tel__input {
                border-color: $c-error !important;
                border-left: none;
            }

            .vue-phone-number-input input {
                margin: 0;
            }
        }
    }

    & /deep/ {
        .select-country-container {
            display: flex !important;
            align-items: center !important;
            background-color: $c-line;
            width: 9rem !important;
            min-width: 13rem;
            max-width: 13rem;
            border-radius: 7px;
            cursor: pointer !important;
            * {
                cursor: pointer !important;
            }
        }
        .country-selector__country-flag {
            // display: none !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
        }
        .country-selector__toggle {
            top: 50% !important;
            transform: translateY(-50%) !important;
        }
        .country-selector.has-value {
            padding-left: 3.5rem !important;
        }
        .country-selector__input {
            background-color: $c-line;
            color: #24a391;
            line-height: 100%;
            padding-top: 0 !important;
            padding-right: 5px !important;
            padding-left: 1rem !important;
            font-size: 14px !important;
            font-family: $ff-gilroy !important;
            border-color: #e2e2e2;
            border-top-right-radius: 0px !important;
            border-bottom-right-radius: 0px !important;
            border-top-left-radius: 7px !important;
            border-bottom-left-radius: 7px !important;

            @media screen and (min-width: 992px) {
                font-size: 14px !important;
            }

            &:focus {
                caret-color: none !important;
                box-shadow: none !important;
            }
        }
        .country-selector__label {
            display: none;
        }
        .input-tel__input {
            padding-top: 10px !important;
            padding-bottom: 10px !important;
            font-size: 14px !important;
            font-family: $ff-gilroy;
            border-top-right-radius: 7px !important;
            border-bottom-right-radius: 7px !important;
            border-color: #e2e2e2;
            cursor: text !important;

            @media screen and (min-width: 992px) {
                font-size: 14px !important;
            }

            &:focus {
                caret-color: none !important;
                box-shadow: none !important;
            }
        }
        .input-tel__label {
            display: none;
        }
    }

    &-text {
        font-family: $ff-gilroy;
        font-size: 12px;
        color: $c-green;

        @media screen and (min-width: 992px) {
            color: $c-primary;
            margin-bottom: 2px;
        }
    }

    &-input {
        box-shadow: 0px 3px 6px #11100029;
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
            border-radius: 7px;
        }
    }
}
</style>
