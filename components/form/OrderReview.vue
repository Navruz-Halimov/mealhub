<i18n>
{
  "en": {
    "yourReview": "Your review",
    "restaurant": "Restaurant {n}",
    "send": "Send",
    "messageText": "Write your text",
    "rateError": "Set rating",
    "textError": "Text's length must be in range from 100 to 2000 symbols",
    "fileFormatError": "You can load only {n} formats",
    "fileSizeError": "Max file size is {n} Mb",
    "filesLengthError": "Max files amount is {n}"
  },
  "ru": {
    "yourReview": "Оставьте Ваш отзыв",
    "restaurant": "Ресторан \"{n}\",",
    "send": "Отправить",
    "messageText": "Текст сообщения",
    "rateError": "Укажите рейтинг",
    "textError": "Длина текста должна быть в диапазоне от 100 до 2000 символов",
    "fileFormatError": "Вы можете загрузить только форматы: {n}",
    "fileSizeError": "Максимальный размер файла {n} Мб",
    "filesLengthError": "Максимальное количество файлов: {n}"
  }
}
</i18n>

<template>
  <div class="review">
    <div class="review__container">
      <div class="review__title">
        {{ $t('yourReview') }}
      </div>
      <div class="review__info">
        {{ $tc('restaurant', info.catering) }} {{ info.catering_address.address_string }}
      </div>
      <div class="review__errors">
        <p v-if="$v.rate.$error" class="review__error">
          {{ $t('rateError') }}
        </p>
        <p v-if="$v.text.$error" class="review__error">
          {{ $t('textError') }}
        </p>
        <p v-if="fileFormatError" class="review__error">
          {{ $tc('fileFormatError', allowedFileFormats) }}
        </p>
        <p v-if="fileSizeError" class="review__error">
          {{ $tc('fileSizeError', $refs.fileinput.maxSize / 1000) }}
        </p>
        <p v-if="filesLengthError" class="review__error">
          {{ $tc('filesLengthError', $refs.fileinput.maxFiles) }}
        </p>
      </div>
      <div class="review__stars">
        <AdditionReviewStars
          :rate.sync="rate"
          class="stars"
        />
      </div>
      <div class="review__text">
        <div class="textarea">
          <textarea
            v-model="text"
            :placeholder="$t('messageText')"
            rows="6"
            :class="{ 'textarea__input_error': $v.text.$error }"
            class="textarea__input"
          />
          <span class="textarea__counter">{{ text.length }}</span>
        </div>
      </div>
      <BasicInputFile
        ref="fileinput"
        :is-large="true"
        class="review__file"
        @format-error-changed="value => fileFormatError = value"
        @size-error-changed="value => fileSizeError = value"
        @length-error-changed="value => filesLengthError = value"
      />
      <div class="review__send">
        <div class="eatme-btn-red" @click="send">
          {{ $t('send') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { maxLength, minLength, required, minValue, maxValue } from 'vuelidate/lib/validators'
import apiAddress from '~/plugins/api-address'

export default {
  props: {
    info: {
      required: true,
      type: Object
    }
  },
  validations: {
    rate: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(5)
    },
    text: {
      required,
      minLength: minLength(100),
      maxLength: maxLength(2000)
    },
    files: {
      maxLength: maxLength(6)
    }
  },
  data () {
    return {
      rate: 0,
      text: '',
      fileFormatError: false,
      fileSizeError: false,
      filesLengthError: false
    }
  },
  computed: {
    files () {
      return this.$refs.fileinput.files
    },
    allowedFileFormats () {
      return this.$refs.fileinput.types
        .replaceAll(',', ', ')
    }
  },
  methods: {
    wrapData () {
      const files = this.files

      const formData = {
        review: this.text,
        cuisine_mark: this.rate.toString(),
        service_mark: this.rate.toString(),
        pricing_mark: this.rate.toString()
      }

      const temp = new FormData()

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        temp.append('uploads[' + i + ']', file)
      }

      for (const k in formData) {
        temp.append(k, formData[k])
      }

      return temp
    },
    async send () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        console.error('Order review send form ERROR')
        return
      }

      const data = this.wrapData()
      const cookiz = this.$cookies
      const catering = this.info.catering_id

      try {
        await axios.post(`${apiAddress(this.$store)}/catering/${catering}/review/create`, data, {
          headers: {
            Authorization: cookiz.get('user_token'),
            'Content-Type': 'multipart/form-data'
          }
        })

        this.$store.commit('SHIFT_CURRENT_POPUPS')
      } catch (err) {
        console.error('ADD_REVIEW', err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/abstract/var.scss";

.review {
  margin: 0 auto;
  z-index: 1000;
  width: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-height: 100%;
    font: normal normal 300 14px/14px Gilroy-Light;
    color: $dark;
    padding-left: 40px;
    padding-right: 40px;
  }

  &__title {
    text-align: center;
    font: normal normal bold 22px/24px Roboto Slab;
  }

  &__info {
    text-align: center;
    margin-top: 10px;
  }

  &__error {
    font-family: $ff-gilroy;
    font-size: $fz-md-sm;
    font-weight: 300;
    color: $c-error;
    margin-top: 10px;
    text-align: center;
  }

  &__stars {
    margin-top: 20px;
  }

  &__text {
    margin-top: 20px;
    width: 100%;
  }

  .textarea {
    position: relative;
    width: 100%;

    &__input {
      font: normal normal 300 14px/14px Gilroy-Light;
      background: #FFFFFF 0 0 no-repeat padding-box;
      box-shadow: 0 6px 7px #D5D5D51A;
      border: 1px solid #E2E2E2;
      border-radius: 4px;
      width: 100%;
      padding: 10px 30px 10px 15px;
      resize: none;
      height: 200px;

      &_error {
        border-color: #eb608f;
      }
    }

    &__counter {
      position: absolute;
      bottom: 1rem;
      right: 1.5rem;
      background: rgba(255, 255, 255, 0.6);
    }
  }

  &__file {
    width: 100%;
    margin-top: 10px;
  }

  &__send {
    text-align: center;
    margin-top: 30px;
    font: normal normal 300 16px/18px Gilroy;
    cursor: pointer;
  }

  @media screen and (max-width: 991px) {
    &__container {
      font: normal normal 300 14px/18px Gilroy-Light;
      padding-left: 15px;
      padding-right: 15px;
    }

    &__title {
      font: normal normal bold 20px/22px Roboto Slab;
      color: #23A290;
    }

    &__info,
    &__stars {
      margin-top: 10px;
    }

    &__text {
      max-width: 660px;
      margin-top: 10px;

      .textarea {
        &__input {
          font: normal normal 300 14px/18px Gilroy-Light;
          padding-bottom: 20px;
          box-shadow: 0 3px 6px #00000029;
          border-radius: 8px;
        }
      }
    }

    &__file {
      max-width: 660px;
      margin-top: 10px;
    }

    .eatme-btn-red {
      font: normal normal 300 16px/18px Gilroy-Light;
    }
  }
}
</style>
