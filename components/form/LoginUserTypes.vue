<i18n>
{
  "en": {
    "title": "Login",
    "subtitle":"The system found several options for your registration. Select your login option:",
    "user": "User",
    "userDetail":"I want to use the service to get acquainted with catering outlets, select and order the best food, and to pre-book tables.",
    "cateringPoint":"Catering point",
    "cateringPointDetail":"I want to use the service to provide information about my catering outlets, to get new customers.",
    "Partner":"Partner",
    "PartnerDetail":"I want to use the service to provide information about my services to catering outlets, to get new clients.",
    "Courier":"Courier",
    "CourierDetail":"I want to use the service to provide courier services for catering outlets.",
    "errorNoType": "Choose order type!",
    "createOrderError": "Create order error",

    "nextBtn":"Select and continue"
  },
  "ru": {
    "title": "Вход",
    "subtitle":"В системе нашлось несколько вариантов Вашей регистрации. Выберите вариант входа:",
    "user":"Просто пользователь",
    "userDetail":"Хочу использовать сервис для ознакомления с точками общественного питания, выбора и заказа лучшей еды и для предварительной брони столов.",
    "cateringPoint":"Точка общественного питания",
    "cateringPointDetail":"Хочу использовать сервис для предоставления информации о моих точках общественного питания, для получения новых клиентов.",
    "Partner":"Партнер",
    "PartnerDetail":"Хочу использовать сервис для предоставления информации о моих услугах точкам общественного питания, для получения новых клиентов.",
    "Courier":"Курьер",
    "CourierDetail":"Хочу использовать сервис для предоставления курьерских услуг для точек общественного питания.",
    "selfOrderingLabel":"Забрать еду в заведении самостоятельно",
    "selfOrderingDetails1":"Заберите заказ из ресторана самостоятельно",

    "errorNoType":"Выберите тип заказа!",
    "createOrderError":"Ошибка создания заказа",

    "nextBtn":"Выбрать и продолжить"
  }
}
</i18n>

<template>
  <section class="chooseOrdering">
    <div class="toll">
      <div class="catering">
        <h1 class="roboto wide flex a_c j_c text-xxl  desktop">
          {{ $t('title') }}
        </h1>
        <p class="selectUser__subtitle desktop">
          {{ $t('subtitle') }}
        </p>
        <h1 class="roboto wide flex a_c j_c text-20 mb-2 mobile">
          {{ $t('title') }}
        </h1>
        <p class="selectUser__subtitle mobile">
          {{ $t('subtitle') }}
        </p>
        <div class="flex wide j_c mt-1e mb-1">
          <div class="wide">
            <p class="flex a_c w-8 ml-a mr-a desktop" @click="type = 'client'">
              <span
                class="res_tip mr-1"
                :class="{ active: type === 'client' }"
              >•</span>
              <span>{{ $t('user') }}</span>
            </p>
            <p
              class="flex a_c wide text-left ml-a mr-a mobile"
              @click="type = 'client'"
            >
              <span
                class="res_tip mr-1"
                :class="{ active: type === 'client' }"
              >•</span>
              <span class="text-mobile">{{ $t('user') }}</span>
            </p>
            <p class="typedescription text-lg w-8 ml-a mr-a text-left">
              {{ $t('userDetail') }}
            </p>
          </div>
        </div>
        <div class="flex wide j_c mt-1e mb-1">
          <div class="wide">
            <p class="flex a_c w-8 ml-a mr-a desktop" @click="type = 'owner'">
              <span
                class="res_tip mr-1"
                :class="{ active: type === 'owner' }"
              >•</span>
              <span>{{ $t('cateringPoint') }}</span>
            </p>
            <p
              class="flex a_c wide text-left ml-a mr-a mobile"
              @click="type = 'owner'"
            >
              <span
                class="res_tip mr-1"
                :class="{ active: type === 'owner' }"
              >•</span>
              <span class="text-mobile ">{{ $t('cateringPoint') }}</span>
            </p>
            <p class="typedescription text-lg w-8 ml-a mr-a text-left">
              {{ $t('cateringPointDetail') }}
            </p>
          </div>
        </div>
        <div class="flex wide j_c mt-1e mb-1">
          <div class="wide">
            <p class="flex a_c w-8 ml-a mr-a desktop" @click="type = 'partner'">
              <span
                class="res_tip mr-1"
                :class="{ active: type === 'partner' }"
              >•</span>
              <span>{{ $t('Partner') }}</span>
            </p>
            <p
              class="flex a_c wide text-left ml-a mr-a mobile"
              @click="type = 'partner'"
            >
              <span
                class="res_tip mr-1"
                :class="{ active: type === 'partner' }"
              >•</span>
              <span class="text-mobile">{{ $t('Partner') }}</span>
            </p>
            <p class="typedescription text-lg w-8 ml-a mr-a text-left">
              {{ $t('PartnerDetail') }}
            </p>
          </div>
        </div>
        <div class="flex wide j_c mt-1e mb-1">
          <div class="wide">
            <p class="flex a_c w-8 ml-a mr-a desktop" @click="type = 'courier'">
              <span
                class="res_tip mr-1"
                :class="{ active: type === 'courier' }"
              >•</span>
              <span>{{ $t('Courier') }}</span>
            </p>
            <p
              class="flex a_c wide text-left ml-a mr-a mobile"
              @click="type = 'courier'"
            >
              <span
                class="res_tip mr-1"
                :class="{ active: type === 'courier' }"
              >•</span>
              <span class="text-mobile">{{ $t('Courier') }}</span>
            </p>
            <p class="typedescription text-lg w-8 ml-a mr-a text-left">
              {{ $t('CourierDetail') }}
            </p>
          </div>
        </div>

        <div class="btns">
          <button class="btn eatme-btn-colorful" @click="actionHandler()">
            {{ $t('nextBtn') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      type: 'client'
    }
  },
  computed: {},
  watch: {
    type (newVal) {
      console.log(newVal)
    }
  },
  methods: {
    actionHandler () {
      console.log('clicked')
      this.loginHandle()
      // if (this.type === 'client') {
      //   this.loginHandle()
      // } else if (this.type === 'owner') {
      //   this.registrateCateringPoint()
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';
.formRegistrate-logo {
  position: absolute;
  top: 0;
  right: 0;
  width: 75px;
  height: 65px;
  transform: translate(-15px, -70%);
}
.chooseOrdering {
  position: relative;
  border-radius: 7px;
  width: 100%;
  overflow: visible !important;
}
.selectUser__subtitle {
  font-family: $ff-gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: $dark;
  margin-top: 20px;
  margin-bottom: 20px;
}
.wide {
  margin-bottom: 10px;
}
.wide .desktop {
  margin-bottom: 10px;
}
.roboto {
  font-family: $ff-roboto;
}
.res_tip {
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding-top: 1px;
  font-size: 4rem;
  color: #e2e2e2;
  width: 2.5rem;
  flex: 0 0 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid #e2e2e2;
}
.res_tip.active {
  color: $orange;
}
.text-mobile {
  font-size: 16px;
  line-height: 17px;
}
.horizon {
  margin-top: 2rem;
  margin-bottom: 3rem;
  border-top: 2px solid $c-line;
}
.chooseOrdering {
  position: relative;
  grid-area: body;
  display: flex;
  border-radius: 0;
  width: 100%;
  overflow: auto;
  flex-direction: column;
  text-align: center;
  font-size: 14px;
  z-index: 1000 !important;
  justify-content: center;
  background-color: transparent;
  .title {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 100;
  }
  .steps {
    position: relative;
    margin: 1rem 0 2rem;
    cursor: initial;
    .step {
      position: relative;
      width: 8em;
      font-weight: bold;
      text-transform: uppercase;
    }
    .spacer {
      position: relative;
      display: block;
      width: 8rem;
      height: 1px;
      border-top: 1px dashed $c-green;
      margin: 0 1.5rem;
      &:after {
        position: absolute;
        top: -0.75em;
        font-size: 25px;
        right: -0.5em;
        color: $c-green;
        content: '►';
      }
    }
  }
}
.p_containter {
  width: 28rem;
  .p_count {
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    padding: 0.85rem 1.15rem;
    width: 40px;
    border-radius: 7px;
    box-shadow: 0px 1px 2px #ddd;
    border: 1px solid #eee;
  }
  .p_count.active {
    background: $orange;
    box-shadow: 0px 1px 2px $orange;
    border: 1px solid $orange;
    color: white;
  }
  .p_count_img {
    filter: contrast(0);
    margin-right: 0.5rem;
  }
  .p_count_ar {
    cursor: pointer;
    transform: rotate(-180deg);
  }
  .p_count_al {
    cursor: pointer;
  }
  .select_cont {
    width: 100%;
  }
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';
.catering {
  .btns {
    display: flex;
    justify-content: center;
    margin-top: 3em;
    margin-bottom: 1em;
    // .btn {
    //   margin: auto;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    // }
    .btn.disabled {
      background: #9d9d9d;
      box-shadow: 0px 3px 6px #9d9d9d;
    }
  }
}
@media screen and (min-width: 992px) {
  .typedescription {
    padding-left: 35px !important;
  }
}
@media screen and (max-width: 991px) {
  .chooseOrdering {
    font-size: 18px;
    padding: 28px 15px 10px;
    border-radius: 7px;
    & > div {
      width: 85%;
      margin-left: auto;
      margin-right: auto;
    }
    .aboutText {
      font-weight: initial;
      color: #5d5d5d;
      text-align: center;
      width: 80%;
      margin: auto;
    }
    .title {
      margin-top: 2rem;
      font-size: 22px;
      img {
        height: 32px;
      }
    }
    .steps {
      font-weight: initial;
      color: #5d5d5d;
      .step {
        text-transform: initial;
        font-weight: initial;
      }
    }
  }
  .catering {
    font-size: 14px;
    .youChoosed {
      font-size: 14px;
      margin-top: 1rem;
      margin-bottom: 0rem;
    }
    .cateringAddress {
      display: none;
    }
    .cateringName {
      color: $c-green;
    }
    .btns {
      // display: block;
      margin-top: 3em;
      .btn.disabled {
        margin-bottom: 4rem;
      }
    }
  }
  .heading {
    & > div {
      display: block;
    }
  }
  .main_menu-back.mobile {
    font-size: 14px;
    padding: 0 1rem;
    position: absolute;
  }
}
</style>

<style>
.validBlock.error .res_lable {
  color: #eb608f !important;
}
.validBlock.error input,
.validBlock.error .p_count,
.validBlock.error .res_input.person,
.validBlock .display-time.is-empty {
  color: #eb608f !important;
  border: 1px solid #eb608f !important;
}
.reservation_form .mx-datepicker {
  width: 10em !important;
}
.selectOccasion .vs__dropdown-toggle {
  padding: 0.5rem;
}
.selectOccasion .vs__actions::before {
  display: block;
  content: ' ';
  background-image: url('~assets/icons/L_arrow.svg');
  background-size: contain;
  background-repeat: no-repeat;
  width: 12px;
  height: 12px;
  overflow: visible;
}
.selectOccasion .vs__open-indicator {
  display: none !important;
}
.selectOccasion .vs__dropdown-menu {
  border-color: #e2e2e2 !important;
  width: 100%;
}
.selectOccasion .vs__dropdown-option {
  padding: 0.75rem;
  font-size: 16px !important;
}
.selectOccasion .vs__dropdown-menu > .vs__dropdown-option--selected,
.selectOccasion .vs__dropdown-menu > .vs__dropdown-option--highlight {
  color: inherit;
  background: white;
}
@media screen and (max-width: 991px) {
  .selectOccasion .vs__actions {
    transform: rotate(90deg);
  }
  .some_small_inputs .mx-input,
  .some_small_inputs .mx-datepicker,
  .some_small_inputs .time-picker {
    height: 40px !important;
  }
  .some_small_inputs .mx-datepicker input,
  .some_small_inputs .time-picker input {
    font-size: 14px !important;
    height: 40px !important;
    border-radius: 7px;
  }
  .selectOccasion .vs__dropdown-toggle {
    height: 40px !important;
    padding: 0.25rem 0.5rem;
    box-shadow: 0px 2px 5px #ddd;
    border: 1px solid #eee;
    border-radius: 7px;
  }
  .res_input.time .dropdown,
  .res_input.time .time-picker .select-list {
    width: 10rem !important;
  }
  .res_input.time .dropdown .hint {
    display: none !important;
  }
}
</style>
