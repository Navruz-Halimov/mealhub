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
    "ERROR-title": "Some error occured"
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
    "ERROR-title": "Произошла ошибка"
  }
}
</i18n>

<template>
  <div class="enable_notify">
    <div class="notify_logo">
      <template v-if="info && ~info.indexOf('TIMER')">
        <p class="notify-timer">
          <svg class="countdown_svg" width="64" height="64">
            <path
              fill="none"
              stroke="#eee"
              stroke-width="2"
              d="M 31.45897540044421 1.0047214501518695 A 31 31 0 1 0 32 1"
            />
            <path
              fill="none"
              stroke="orange"
              stroke-width="2"
              :d="describeArc(32, 32, 31, 0, 12 * info.split('TIMER')[1])"
            />
          </svg>
          <span class="notify-timer-count">{{ info.split('TIMER')[1] }}</span>
          <span class="notify-timer-sec">{{ $t('timeLabel') }}</span>
        </p>
      </template>
      <template v-else-if="info !== 'ERROR'">
        <DarkLogo :noclick="true" />
        <!-- <h3 class="notify_logo-title">
          Meal hub<span class="notify_logo-subtitle">{{ $t('logo-subtitle') }}!</span>
        </h3> -->
      </template>
      <div v-else class="flex a_c j_c  mr-2">
        <!-- <svg
          class="logo error mr-2"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          style="enable-background:new 0 0 36 36;"
          version="1.1"
          viewBox="0 0 36 36"
          xml:space="preserve"
        >
          <g id="Layer_1" />
          <g id="icons">
            <path
              id="close_1_"
              class="st0"
              d="M6.2,3.5L3.5,6.2c-0.7,0.7-0.7,1.9,0,2.7l9.2,9.2l-9.2,9.2c-0.7,0.7-0.7,1.9,0,2.7l2.6,2.6   c0.7,0.7,1.9,0.7,2.7,0l9.2-9.2l9.2,9.2c0.7,0.7,1.9,0.7,2.7,0l2.6-2.6c0.7-0.7,0.7-1.9,0-2.7L23.3,18l9.2-9.2   c0.7-0.7,0.7-1.9,0-2.7l-2.6-2.6c-0.7-0.7-1.9-0.7-2.7,0L18,12.7L8.8,3.5C8.1,2.8,6.9,2.8,6.2,3.5z"
            />
          </g>
        </svg> -->
        <svg
          class="logo error mr-2"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.23882 6.99556L9.47542 5.75896C9.64637 5.58801 9.64637 5.31272 9.47542 5.14177L8.85823 4.52236C8.68728 4.35141 8.40977 4.35141 8.23882 4.52236L7.00222 5.75896L5.76562 4.52236C5.59467 4.35141 5.31716 4.35141 5.14621 4.52236L4.5268 5.14177C4.35585 5.31272 4.35585 5.58801 4.5268 5.75896L5.7634 6.99556L4.52902 8.22994C4.35807 8.40089 4.35807 8.67618 4.52902 8.84713L5.14843 9.46654C5.31938 9.63749 5.59689 9.63749 5.76784 9.46654L7 8.23438L8.24326 9.47764C8.41421 9.64859 8.69172 9.64859 8.86267 9.47764L9.48208 8.86045C9.65303 8.6895 9.65303 8.41199 9.48208 8.24104L8.23882 6.99556ZM7 0C3.13479 0 0 3.13479 0 7C0 10.8652 3.13479 14 7 14C10.8652 14 13.9978 10.8674 13.9978 7.00222C14 3.13479 10.8652 0.00222011 7 0ZM7 12.6857C3.85855 12.6879 1.31208 10.1415 1.31208 7C1.31208 3.85855 3.85855 1.31208 7 1.31208C10.1415 1.31208 12.6857 3.85855 12.6857 7C12.6857 7 12.6857 7 12.6857 7.00222C12.6857 10.1415 10.1415 12.6879 7 12.6857C7 12.6879 7 12.6879 7 12.6857Z"
            fill="#EB618F"
          />
        </svg>

        <pre class="text-lg  mr-2 text-wrap">{{
          message && message !== true ? message : $t(info + '-title')
        }}</pre>
      </div>
    </div>
    <p v-if="info !== 'ERROR'">
      {{ message && message !== true ? message : $t(info + '-title') }}
    </p>
    <br v-else class="mr-2">

    <span class="close" @click="close">✕</span>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: String
    },
    message: [String, Boolean]
  },
  methods: {
    close () {
      this.$store.commit('SET_' + this.info + '_NOTIFY', false)
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

.enable_notify {
  position: relative;
  margin-bottom: 1rem;
  max-width: 320px;
  padding: 1rem;
  font-size: 14px;
  line-height: 1.65rem;
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-bottom-left-radius: 5px;
  box-shadow: 0 3px 6px #cccccc55;

  @media screen and (max-width: 991px) {
    border-radius: 1rem;

    width: 90vw;
    right: 5vw;
    top: 5vw;
    padding: 1rem 1rem 0;
    margin: auto;
    box-shadow: 0 5px 5px #cccccc;
    & > p {
      padding: 1rem 0 1rem 1rem !important;
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
.enable_notify > p {
  width: 42rem;
  padding: 1.5rem 1rem 2rem 1rem;
  margin-top: 5px;
  display: flex;
  align-items: center;
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
  height: 1.5em !important;
  width: 1.5em !important;
  flex-shrink: 0;
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
