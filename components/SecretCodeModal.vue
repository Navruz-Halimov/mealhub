<i18n>
{
  "en": {
    "title":"Enter email",
    "btn":"Send",
    "success":"Thank you for your interest. We will notify you by email, when website is launched.",
    "error":"Subscription failed!",
    "errorTitle":"This must be an email",
    "subscribed":"You already subscribed!",
    "welcome":"Welcome to MealHub"
  },
  "ru": {
    "title":"Введите адрес электронной почты",
    "btn":"Отправить",
    "success":"Спасибо за Ваш интерес. Мы сообщим вам по электронной почте, когда сайт будет запущена.",
    "error":"Подписка не удалось",
    "errorTitle":"Это должна быть электронная почта",
    "subscribed":"Вы уже подписаны",
    "welcome":"Добро пожаловать в MealHub"
  }
}
</i18n>

<template>
  <div class="secret-code-modal">
    <form
      v-if="!subscribed"
      :class="{ 'form-group--error': $v.email.$error }"
      @submit.prevent="subscribe()"
    >
      <div class="secret-code-title">
        <span>{{ $t('title') }}</span>
      </div>
      <div v-if="!$v.email.email" class="secret-code-error">
        {{ $t('errorTitle') }}
      </div>
      <input
        v-model="$v.email.$model"
        class="secret-code-inputs"
        :class="status($v.email)"
      >
      <button type="submit" class="eatme-btn-colorful secret-code-btn">
        {{ $t('btn') }}
      </button>
    </form>
    <div v-else-if="isSubscribed" class="subscribe">
      {{ $t('success') }}
    </div>
    <div v-else class="subscribed">
      {{ $t('subscribed') }}
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      subscribed: false,
      isSubscribed: false
    }
  },
  methods: {
    status (validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
        success: !validation.$error && validation.$dirty
      }
    },
    async subscribe () {
      if (this.$v.email && this.$v.email.email) {
        try {
          const response = await this.$store.dispatch('Subscribe', this.email)
          if (response && response.data && response.data.data === 'login') {
            this.$cookies.set('SUBSCRIBER', this.email, {
              path: '/',
              maxAge: 60 * 60 * 24 * 7
            })
            this.$emit('goodCode')
          } else if (
            response &&
            response.data &&
            response.data.data === 'subscribe'
          ) {
            this.isSubscribed = true
            this.subscribed = true
          } else if (
            (response &&
              response.data &&
              response.data.data ===
                'An email already in announcement subscribers list.') ||
            response.data.data ===
              'Email уже в списке для анонса о запуске сервиса'
          ) {
            this.isSubscribed = false
            this.subscribed = true
          } else {
            this.subscribed = true
          }
        } catch (error) {}
      }
    }
  },
  validations: {
    email: {
      email,
      required
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
.form-group--alert,
.form-group--error {
  animation-name: shakeError;
  animation-fill-mode: forwards;
  animation-duration: 0.6s;
  animation-timing-function: ease-in-out;
}
@keyframes shakeError {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(0.375rem);
  }
  30% {
    transform: translateX(-0.375rem);
  }
  45% {
    transform: translateX(0.375rem);
  }
  60% {
    transform: translateX(-0.375rem);
  }
  75% {
    transform: translateX(0.375rem);
  }
  90% {
    transform: translateX(-0.375rem);
  }
  100% {
    transform: translateX(0);
  }
}
.secret-code-modal {
  text-align: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #24a391;
  color: #fff;
  top: 0;
  z-index: 12;
}

.secret-code-input {
  display: block;
  width: 100px;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  font-size: 24px;
  padding: 2px 10px;
  color: #fff;
  background-color: transparent;
  outline: none;
  margin: 10px auto;
}
.secret-code-inputs {
  display: block;
  width: 300px;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  font-size: 16px;
  padding: 2px 10px;
  color: #fff;
  background-color: transparent;
  outline: none;
  margin: 10px auto;
}
.secret-code-title {
  color: #fff;
  text-align: center;
  font-size: 20px;
  margin-bottom: 26px;
}
.secret-code-error {
  color: yellow;
  font-size: 16px;
  text-align: center;
}
.error {
  border-color: yellow;
}
.success {
  border-bottom: 2px solid lightgreen;
}
.secret-code-btn {
  text-align: center;
  margin-top: 30px;
  color: #fff !important;
  margin-left: auto;
  margin-right: auto;
}
.subscribe,
.subscribed {
  text-align: center;
  font-size: 16px;
  color: white;
  font-family: $ff-gilroy;
}
</style>
