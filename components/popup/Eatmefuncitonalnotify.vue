<i18n>
{
  "en": {
    "timeLabel": "min",

    "logo-subtitle": "food in touch",
    "GEO-title": "For the site to work properly, you need to enable geolocation.",
    "REGISTER-title": "Registration was successful",
    "ACTIVATE-title": "Activation was successful",
    "RESTORE-title": "Account restored",

    "TIMER3-title": "We are waiting for the confirmation of the moderator",
    "TIMER20-title": "Make your order and pay for it",
    "TIMER5-title": "You can cancel your order",

    "SUCCESS-title": "Information saved",
    "ERROR-title": "Some error occured",

    "tableReservedSuccessfully": "The table has been successfully reserved",
    "minutes20": "You have 20 minutes to choose dishes and pay for the order",
    "minutes20Notify": "Attention! You have 20 minutes",
    "minutes20Notify2": "on the choice of dishes and payment of the order",

    "chooseAnotherService1": "Unfortunately there are no free tables",
    "chooseAnotherService2": "Please choose another service or another catering",
    "chooseAnotherService3": "Please choose another service",
    "chooseAnotherServiceBtn": "Choose another service",

    "startBtnMenu": "Select dishes",
    "startBtnCart": "To cart"
  },
  "ru": {
    "timeLabel": "мин",

    "logo-subtitle": "на связи с едой",
    "GEO-title": "Для правильной работы сайта необходимо разрешить определение местоположения.",
    "REGISTER-title": "Регистрация прошла успешно",
    "ACTIVATE-title": "Активация прошла успешно",
    "RESTORE-title": "Аккаунт востановлен",

    "TIMER3-title":  "Ждем подтверждения модератора",
    "TIMER20-title": "Cделайте свой заказ и оплатите его",
    "TIMER5-title":  "Вы можете отменить заказ",

    "SUCCESS-title": "Данные сохранены",
    "ERROR-title": "Произошла ошибка",

    "tableReservedSuccessfully": "Стол успешно зарезервирован",
    "minutes20": "У Вас есть 20 минут на выбор блюд и оплату заказа",
    "minutes20Notify": "Внимание! У Вас есть 20 минут",
    "minutes20Notify2": "на выбор блюд и оплату заказа",

    "chooseAnotherService1": "К сожалению, свободных столов нет",
    "chooseAnotherService2": "Пожалуйста, выберите другой сервис или другое заведение",
    "chooseAnotherService3": "Пожалуйста, выберите другой сервис",
    "chooseAnotherServiceBtn": "Выбрать другой сервис",

    "startBtnMenu": "Выбрать блюда",
    "startBtnCart": "В корзину"
  }
}
</i18n>

<template>
  <div class="eatme_function_notify enable_notify">
    <div class="notify_logo mt-1">
      <template v-if="item.img === 'logo'">
        <DarkLogo :noclick="true" />
        <!-- <h3 class="notify_logo-title">
          Meal hub<span class="notify_logo-subtitle">{{ $t('logo-subtitle') }}!</span>
        </h3> -->
      </template>
      <svg
        v-else-if="item.img === 'error'"
        xmlns="http://www.w3.org/2000/svg"
        width="63.054"
        height="63.052"
        viewBox="0 0 63.054 63.052"
      >
        <defs />
        <path
          style="fill:#eb608f;"
          d="M37.109,31.507l5.572-5.572a1.968,1.968,0,0,0,0-2.786L39.9,20.361a1.97,1.97,0,0,0-2.786,0l-5.574,5.574-5.57-5.57a1.973,1.973,0,0,0-2.79,0l-2.786,2.788a1.969,1.969,0,0,0,0,2.788l5.57,5.57L20.4,37.068a1.968,1.968,0,0,0,0,2.786l2.786,2.788a1.97,1.97,0,0,0,2.786,0l5.56-5.56,5.6,5.6a1.971,1.971,0,0,0,2.79,0L42.711,39.9a1.973,1.973,0,0,0,0-2.79ZM31.527,0A31.526,31.526,0,1,0,63.054,31.529,31.525,31.525,0,0,0,31.527,0Zm0,57.141A25.616,25.616,0,1,1,57.142,31.529,25.615,25.615,0,0,1,31.527,57.145Z"
          transform="translate(0 -0.004)"
        />
      </svg>
    </div>
    <div class="notebody">
      <p v-for="(msg, index) in item.rows" :key="index" :class="msg.class">
        {{ $t(msg.text) }}
      </p>
      <!--<br>
      <button v-if="item.button" class="eatme-btn-red w-75" @click="item.button.callback()">
        {{ $t(item.button.text) }}
      </button>-->
      <span class="close" @click="close">✕</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: [Object, Boolean]
  },
  methods: {
    close () {
      this.$store.commit('SET_FUNCTIONAL_NOTIFY', false)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/modificator';

@media screen and (max-width: 991px) {
  .enable_notify {
    align-items: center !important;
    padding-bottom: 1rem !important;
  }
  .enable_notify .notebody {
    padding-left: 0 !important;
    text-align: center !important;
  }
}

.enable_notify {
  position: relative;
  margin-bottom: 1rem;
  max-width: 100%;
  padding: 2rem 0rem 2rem 2rem;
  font-size: 14px;
  line-height: 1.65rem;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom-left-radius: 5px;
  box-shadow: 0 3px 6px #cccccc55;

  @media screen and (max-width: 991px) {
    text-align: center;
    display: flex;
    border-radius: 1rem;
    flex-direction: column;
    align-items: baseline;
    align-items: center;
    width: 90vw;
    right: 5vw;
    top: 5vw;
    padding: 2rem 1rem;
    margin: auto;
    box-shadow: 0 5px 5px #cccccc;
    & > p {
      padding: 1.5rem !important;
      width: 100% !important;
    }

    .logo {
      height: 3rem;
    }
    .notify_logo-title {
      font-size: 16px;
      letter-spacing: 0;
    }
    .notify_logo-subtitle {
      display: none;
    }
  }
}
.enable_notify > .notebody {
  width: 29rem;
  padding: 1rem 0 0 2rem;
  text-align: left;
}

.logo {
  margin-top: -1rem;
  align-items: center;
  height: 5rem;
  width: 8rem;
}

.notify_logo {
  display: flex;
  align-items: center;
  height: 100%;
}
.notify_logo-title {
  display: flex;
  flex-direction: column;
  font-family: $ff-roboto;
  font-size: 20px;
  letter-spacing: 1.48px;
  line-height: 1.2;
}
.notify_logo-subtitle {
  font-family: $ff-gilroy;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.89px;
  margin-top: 3px;
}

.logo.error {
  align-self: center;
  height: 3.5em;
  width: 3.5em;
  flex: 0 0 3.5em;
  margin-left: 2rem;
  margin-top: 0rem;

  border-radius: 50%;
  fill: #eb5887 !important;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #eb5887;
}

.close {
  position: absolute;
  top: 0.6rem;
  right: 0.9rem;
  cursor: pointer;
}

.notify {
  position: relative;
  display: flex;
  &-timer {
    .countdown_svg {
      position: absolute;
    }
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
      margin-top: 0;
      margin-left: 3rem;
      margin-right: 2rem;
    }

    &-count {
      font-size: 18px;
    }
  }
}
</style>
