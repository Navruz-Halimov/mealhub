<i18n>
{
  "en": {
    "title": "My payment methods",
    "phone": "Phone number",
    "btnCreate": "Add a new card",
    "listTitle": "Payment list",
    "popupErrorMessage": "Check the entered data",
    "popupSuccessMessage": "Your data is saved",
    "popupDeleteMessage": "Are you sure you want to delete?",
    "successDeleteTitle": "Card was deleted successfully"
  },
  "ru": {
    "title": "Мои способы оплаты",
    "phone": "Номер телефона",
    "btnCreate": "Добавить банковскую карту",
    "listTitle": "Банковские карты",
    "popupErrorMessage": "Проверьте введённую информацию",
    "popupSuccessMessage": "Ваши данные успешно сохранены!",
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "successDeleteTitle": "Успешно удалено"
  }
}
</i18n>

<template>
  <main class="main">
    <div class="main_body">
      <div class="menucontainernew">
        <MainActions
          :current-action="''"
          class="gbadfgadfgadsg desktop"
          @select-action="selectOrdersMenuAction"
        />
        <nav class="main_menu">
          <div class="main_menu-back">
            <addition-back @click-handler="goToBack" />
          </div>
          <MenuDesktop type="payments" />
        </nav>
      </div>

      <!-- SECTION FOR MOBILE -->
      <section class="payments mobile">
        <div class="payments-back">
          <addition-back @click-handler="goToBack" />
        </div>
        <header v-if="currentStep === 0" class="payments_header">
          <h1 class="payments-title mt-3">
            {{ $t('title') }}
          </h1>
          <span class="payments-icon">
            <svg
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.814 6.08329L6.162 0.339286C6.05703 0.231884 5.93166 0.146544 5.79325 0.088279C5.65483 0.0300142 5.50617 0 5.356 0C5.20582 0 5.05716 0.0300142 4.91875 0.088279C4.78033 0.146544 4.65496 0.231884 4.55 0.339286L1.45 3.48429C1.23584 3.70613 1.11615 4.00244 1.11615 4.31079C1.11615 4.61913 1.23584 4.91544 1.45 5.13729L1.963 5.67329H3.151L2.051 4.53629C1.99348 4.47554 1.9616 4.39495 1.962 4.31129C1.96154 4.2285 1.99348 4.14883 2.051 4.08929L2.46 3.68929L4.397 5.67229H6.26L3.387 2.73729L5.141 0.947286C5.16889 0.918243 5.20223 0.894989 5.23913 0.878859C5.27602 0.862728 5.31574 0.854038 5.356 0.853286C5.39588 0.852924 5.43544 0.86052 5.47236 0.87563C5.50928 0.89074 5.54281 0.913061 5.571 0.941286L11.22 6.68529C11.2773 6.74336 11.3093 6.82172 11.309 6.90329C11.3044 6.98597 11.2687 7.06385 11.209 7.12129L10.889 7.43929V8.63929L11.802 7.72029C12.017 7.50282 12.1385 7.21001 12.1408 6.90423C12.143 6.59845 12.0258 6.30388 11.814 6.08329V6.08329Z"
              />
              <path
                d="M9.162 6.21045H1.168C0.860704 6.21121 0.56602 6.33273 0.347515 6.5488C0.129011 6.76488 0.00419783 7.05818 0 7.36545V10.4384H10.288V7.36545C10.2906 7.21548 10.2635 7.06647 10.2083 6.92704C10.153 6.78761 10.0706 6.66052 9.96588 6.55312C9.86118 6.44572 9.73622 6.36013 9.59824 6.30132C9.46026 6.2425 9.31199 6.21162 9.162 6.21045V6.21045ZM2.794 9.39245C2.57912 9.39213 2.37296 9.30737 2.22 9.15645C2.06698 9.30728 1.86086 9.39202 1.646 9.39245C1.42229 9.39245 1.20774 9.30358 1.04956 9.1454C0.891368 8.98721 0.8025 8.77266 0.8025 8.54895C0.8025 8.32524 0.891368 8.11069 1.04956 7.95251C1.20774 7.79432 1.42229 7.70545 1.646 7.70545C1.86091 7.70566 2.0671 7.79044 2.22 7.94145C2.37296 7.79053 2.57912 7.70577 2.794 7.70545C3.01771 7.70545 3.23226 7.79432 3.39044 7.95251C3.54863 8.11069 3.6375 8.32524 3.6375 8.54895C3.6375 8.77266 3.54863 8.98721 3.39044 9.1454C3.23226 9.30358 3.01771 9.39245 2.794 9.39245Z"
              />
              <path
                d="M0 11.8131C0.00366092 12.1212 0.128081 12.4155 0.346503 12.6328C0.564926 12.8501 0.859904 12.973 1.168 12.9751H9.162C9.31244 12.9733 9.46103 12.9417 9.59923 12.8823C9.73743 12.8228 9.8625 12.7366 9.96725 12.6286C10.072 12.5206 10.1543 12.3929 10.2096 12.253C10.2648 12.113 10.2918 11.9635 10.289 11.8131V11.7451H0V11.8131Z"
              />
            </svg>
          </span>
        </header>
        <div class="payments_body">
          <div v-if="currentStep === 0" class="payments_block list">
            <list-payment @toggle-prompt-popup="togglePromptPopup" />
            <p class="payments_block-add" @click.stop="createHandler">
              <span class="payments_block-add-icon">
                <svg
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.814 6.08329L6.162 0.339286C6.05703 0.231884 5.93166 0.146544 5.79325 0.088279C5.65483 0.0300142 5.50617 0 5.356 0C5.20582 0 5.05716 0.0300142 4.91875 0.088279C4.78033 0.146544 4.65496 0.231884 4.55 0.339286L1.45 3.48429C1.23584 3.70613 1.11615 4.00244 1.11615 4.31079C1.11615 4.61913 1.23584 4.91544 1.45 5.13729L1.963 5.67329H3.151L2.051 4.53629C1.99348 4.47554 1.9616 4.39495 1.962 4.31129C1.96154 4.2285 1.99348 4.14883 2.051 4.08929L2.46 3.68929L4.397 5.67229H6.26L3.387 2.73729L5.141 0.947286C5.16889 0.918243 5.20223 0.894989 5.23913 0.878859C5.27602 0.862728 5.31574 0.854038 5.356 0.853286C5.39588 0.852924 5.43544 0.86052 5.47236 0.87563C5.50928 0.89074 5.54281 0.913061 5.571 0.941286L11.22 6.68529C11.2773 6.74336 11.3093 6.82172 11.309 6.90329C11.3044 6.98597 11.2687 7.06385 11.209 7.12129L10.889 7.43929V8.63929L11.802 7.72029C12.017 7.50282 12.1385 7.21001 12.1408 6.90423C12.143 6.59845 12.0258 6.30388 11.814 6.08329V6.08329Z"
                  />
                  <path
                    d="M9.162 6.21045H1.168C0.860704 6.21121 0.56602 6.33273 0.347515 6.5488C0.129011 6.76488 0.00419783 7.05818 0 7.36545V10.4384H10.288V7.36545C10.2906 7.21548 10.2635 7.06647 10.2083 6.92704C10.153 6.78761 10.0706 6.66052 9.96588 6.55312C9.86118 6.44572 9.73622 6.36013 9.59824 6.30132C9.46026 6.2425 9.31199 6.21162 9.162 6.21045V6.21045ZM2.794 9.39245C2.57912 9.39213 2.37296 9.30737 2.22 9.15645C2.06698 9.30728 1.86086 9.39202 1.646 9.39245C1.42229 9.39245 1.20774 9.30358 1.04956 9.1454C0.891368 8.98721 0.8025 8.77266 0.8025 8.54895C0.8025 8.32524 0.891368 8.11069 1.04956 7.95251C1.20774 7.79432 1.42229 7.70545 1.646 7.70545C1.86091 7.70566 2.0671 7.79044 2.22 7.94145C2.37296 7.79053 2.57912 7.70577 2.794 7.70545C3.01771 7.70545 3.23226 7.79432 3.39044 7.95251C3.54863 8.11069 3.6375 8.32524 3.6375 8.54895C3.6375 8.77266 3.54863 8.98721 3.39044 9.1454C3.23226 9.30358 3.01771 9.39245 2.794 9.39245Z"
                  />
                  <path
                    d="M0 11.8131C0.00366092 12.1212 0.128081 12.4155 0.346503 12.6328C0.564926 12.8501 0.859904 12.973 1.168 12.9751H9.162C9.31244 12.9733 9.46103 12.9417 9.59923 12.8823C9.73743 12.8228 9.8625 12.7366 9.96725 12.6286C10.072 12.5206 10.1543 12.3929 10.2096 12.253C10.2648 12.113 10.2918 11.9635 10.289 11.8131V11.7451H0V11.8131Z"
                  />
                </svg>
              </span>
              {{ $t('btnCreate') }}
            </p>
          </div>
          <div v-if="currentStep === 1" class="payments_block form">
            <form-profile-payment
              :action="formAction"
              @toggle-error-popup="toggleErrorPopup"
              @toggle-success-popup="
                this.$store.commit(
                  'SET_SUCCESS_NOTIFY',
                  $t('popupSuccessMessage')
                )
              "
              @select-step="selectStep"
            />
          </div>
        </div>
      </section>

      <!-- SECTION FOR DESKTOP -->
      <section class="payments desktop">
        <header class="payments_header">
          <h1 class="payments-title">
            {{ $t('title') }}
          </h1>
          <div class="payments_info">
            <p class="payments-id">
              ID: {{ PERSONAL_DATA.id }}
            </p>
            <p
              v-if="~PERSONAL_DATA.phone.indexOf('+7')"
              class="payments-phone ml-1"
            >
              {{ $t('phone') }}:
              <span>{{ PERSONAL_DATA.phone.slice(0, 2) }}</span>
              {{ parsePhone(PERSONAL_DATA.phone, 2) }}
            </p>
            <p v-else class="payments-phone ml-1">
              {{ $t('phone') }}:
              <span>{{ PERSONAL_DATA.phone.slice(0, 3) }}</span>
              {{ parsePhone(PERSONAL_DATA.phone) }}
            </p>
          </div>
        </header>
        <div class="payments_body">
          <div class="payments_block list">
            <h2 class="payments_list-title">
              <span class="payments_list-icon">
                <bank-card
                  icon-width="25px"
                  icon-height="25px"
                  bg-color="#A2A2A2"
                />
              </span>
              {{ $t('listTitle') }}
            </h2>
            <div class="payments_block_list">
              <list-payment @toggle-prompt-popup="togglePromptPopup" />
            </div>
          </div>
          <div class="payments_block form">
            <form-profile-payment
              ref="profilePayment"
              action="create"
              @toggle-error-popup="toggleErrorPopup"
              @toggle-success-popup="toggleSuccessPopUp"
            />
          </div>
        </div>
      </section>

      <div class="main_news">
        <MainNews />
      </div>
    </div>

    <div v-if="successPromptIsOpen" class="popup payments_popup">
      <popup-delete @close-popup="togglePromptPopup" @delete="deletePayment">
        {{ $t('popupDeleteMessage') }}
      </popup-delete>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'primary',
  middleware: 'auth-home',
  data () {
    return {
      formAction: '',
      currentStep: 0,
      successPromptIsOpen: false,
      formPopupIsOpen: false,
      paymentIdForDelete: ''
    }
  },
  computed: {
    ...mapGetters(['PERSONAL_DATA'])
  },
  async created () {
    await this.$store.dispatch('GET_PAYMENTS', this.$cookies)
    this.$store.dispatch('GET_PERSONAL_DATA', this.$cookies)
    this.$store.commit('RESET_CURRENT_PAYMENT_DATA')
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('CLEAR_NOTIFICATIONS')
    this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
    this.$store.commit('RESET_CURRENT_PAYMENT_DATA')

    if (this.$refs.profilePayment) {
      this.$refs.profilePayment.resetValidation()
    }

    next()
  },
  methods: {
    toggleErrorPopup () {
      return this.$store.commit(
        'SET_ERROR_NOTIFY',
        this.$t('popupErrorMessage')
      )
    },
    toggleSuccessPopUp () {
      return this.$store.commit(
        'SET_SUCCESS_NOTIFY',
        this.$t('popupSuccessMessage')
      )
    },
    togglePromptPopup (paymentId) {
      this.paymentIdForDelete = paymentId
      this.successPromptIsOpen = !this.successPromptIsOpen
    },
    toggleFormPopup () {
      this.formPopupIsOpen = !this.formPopupIsOpen
    },
    closeFormPopup () {
      this.formPopupIsOpen = false
      this.$store.commit('RESET_CURRENT_PAYMENT_DATA')
    },
    selectFormAction (action) {
      this.formAction = action
    },
    selectStep (step) {
      this.currentStep = step
    },
    viewHandler (data) {
      this.selectStep(data.step)
      this.selectFormAction(data.action)
    },
    createHandler () {
      this.selectStep(1)
      this.selectFormAction('create')
      this.$store.commit('RESET_CURRENT_PAYMENT_DATA')
    },
    deletePayment () {
      const vm = this
      const cookiz = this.$cookies
      const id = this.paymentIdForDelete

      this.$store
        .dispatch('DELETE_CURRENT_PAYMENT', { cookiz, id })
        .then((res) => {
          if (res.data.status === 'success') {
            this.$store.commit(
              'SET_SUCCESS_NOTIFY',
              this.$t('successDeleteTitle')
            )
          } else {
            vm.isServerError = true
          }
        })
    },
    goToBack () {
      if (this.currentStep > 0) {
        this.selectStep(--this.currentStep)
        this.selectFormAction('')
      } else {
        this.$router.push(this.localePath('index'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.main_menu {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  flex: 1 0 17vw !important;
}

.menucontainernew {
  grid-area: menu !important;
  display: flex !important;
  flex-direction: column !important;
}

.gbadfgadfgadsg {
  height: 5rem !important;
  margin-bottom: 5px !important;
  width: 98% !important;
}

@media screen and (max-width: 991px) {
  .main_menu {
    display: none !important;
  }

  .main_body {
    min-height: 100vh;
    min-height: calc(var(--vh) * 100);
    height: auto;
  }
}

.main_menu-back {
  position: relative;
  top: 0;
  left: 10px;

  @media screen and (max-width: 991px) {
    position: absolute;
    top: 10px;
    font-size: 14px !important;
  }
}

.payments {
  position: relative;
  grid-area: body;
  grid-template-rows: auto 1fr;
  grid-row-gap: 20px;
  justify-items: center;
  background-color: $c-light;
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 10px 20px;

  @media screen and (min-width: 992px) {
    border-radius: $br-block-desktop;
    padding: 40px 30px;
    border-radius: 4px;
    padding: 40px 30px;
    width: 69%;
  }

  &.mobile {
    display: grid;
    min-height: 77vh;
    min-height: calc(var(--vh) * 77);

    @media screen and (min-width: 992px) {
      display: none;
    }
  }
  &.desktop {
    display: none;

    @media screen and (min-width: 992px) {
      display: grid;
    }
  }

  &-back {
    position: absolute;
    top: 10px;
    left: 10px;

    @media screen and (min-width: 992px) {
      display: none;
    }
  }

  &_header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-title {
    width: 75%;
    font-family: $ff-roboto;
    font-size: 22px;
    font-weight: bold;
    color: $c-green;
    text-align: center;

    @media screen and (min-width: 992px) {
      color: $c-primary;
      width: auto;
    }
  }

  &_info {
    display: flex;
    font-family: $ff-gilroy;
    font-size: 20px;
    color: $c-green;

    @media screen and (min-width: 992px) {
      font-size: 14px;
      color: $c-primary;
    }
  }

  &-phone {
    display: none;
    margin-left: 10px;

    @media screen and (min-width: 992px) {
      display: inline-block;
    }
  }

  &_body {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    margin-top: 15px;
    overflow: visible;

    @media screen and (min-width: 992px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 10px;
      align-items: start;
      margin-top: 0;
    }
  }

  &-icon {
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

  &-id {
    display: none;

    @media screen and (min-width: 992px) {
      display: block;
    }
  }

  &_block {
    position: relative;
    border: {
      width: 1px;
      style: solid;
      color: $c-line;
      radius: 6px;
    }
    padding: 15px 10px;
    width: 100%;
    height: 100%;

    &.list {
      display: grid;
      grid-template-rows: auto 1fr auto;
      grid-row-gap: 20px;
    }
    &_list {
      position: relative;
    }

    &.form {
      display: none;
      padding: 35px;

      @media screen and (min-width: 992px) {
        padding: 15px;
        display: block;
      }
    }

    &-add {
      display: flex;
      cursor: pointer;

      &-icon {
        display: flex;
        flex: 0 0 15px;
        width: 15px;
        height: 15px;

        svg {
          width: 100%;
          height: 100%;
          fill: $c-green;
        }
      }
    }
  }

  &_list-title {
    display: flex;
    align-items: center;
    font-family: $ff-gilroy;
    font-size: 12px;
    font-weight: 300;
    color: $c-primary;

    @media screen and (min-width: 992px) {
      font-family: $ff-gilroy;
      font-size: 16px;
      font-weight: 300;
      color: #555;
    }
  }

  &_list-icon {
    margin-right: 5px;
  }
}

.payments.mobile {
  .payments {
    &_block {
      border: none;
      border-radius: 0;
      padding: 0;
      padding-bottom: 10px;

      &.form {
        display: block;
      }

      &.list {
        position: absolute;
        display: grid;
        grid-auto-rows: minmax(min-content, max-content);
        grid-template-rows: none;
        grid-row-gap: 0;
        overflow: visible;
      }

      &-add {
        align-items: center;
        padding: 10px;
        border-bottom: {
          width: 1px;
          style: solid;
          color: $c-line;
        }
        font-size: 14px;

        &-icon {
          margin-right: 10px;
          flex: 0 0 25px;
          width: 25px;
          height: 25px;
        }
      }
    }
  }
}
</style>

<style>
/* @media screen and (min-width: 991px) { */
.payments .profileCardCode-text,
.payments .form_date-label,
.payments .profileText-text,
.payments .profileCardNumber-text {
  font-size: 14px !important;
}
/* } */

/*.payments_popup .popupDelete,*/
/*.payments_popup .popupSuccess{*/
/*  padding: 12vh 0 !important;*/
/*  width: 90vw !important;*/
/*  overflow: auto;*/
/*}*/

/*.payments_popup .popupForm_wrap,*/
/*.payments_popup .popupMap_wrap,*/
/*.payments_popup .popupError_wrap,*/
/*.payments_popup .popupSuccess_wrap,*/
/*.payments_popup .popupDelete_wrap{*/
/*  position:fixed !important;*/
/*  top:0;*/
/*  left:0;*/
/*}*/
</style>
