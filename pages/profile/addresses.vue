<i18n>
{
  "en": {
    "title": "My addresses",
    "phone": "Phone number",
    "btnCreate": "Add a new address",
    "addressMyLabel": "Choose my location",
    "addressMapLabel": "Choose on the map",
    "listTitle": "Addresses",
    "popupErrorMessage": "Check your fields",
    "popupSuccessMessage": "Data is updated",
    "popupSuccessDeleteMessage": "Deleted successfuly",
    "popupDeleteMessage": "Are you sure you want to delete?",
    "formEditAddressTitle": "Edit address"
  },

  "ru": {
    "title": "Мои адреса доставки",
    "phone": "Номер телефона",
    "btnCreate": "Добавить новый адрес",
    "addressMyLabel": "Выбрать на карте",
    "addressMapLabel": "Выберите мое местоположение",
    "listTitle": "Адреса доставки",
    "popupErrorMessage": "Заполните все поля",
    "popupSuccessMessage": "Ваши данные успешно сохранены!",
    "popupSuccessDeleteMessage": "Успешно удалено!",
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "formEditAddressTitle": "Изменение адреса доставки"
  }
}
</i18n>

<template>
  <main class="main addresses_page">
    <div class="main_body">
      <div class="menucontainernew">
        <MainActions
          :current-action="''"
          class="gbadfgadfgadsg desktop"
          @select-action="selectOrdersMenuAction"
        />
        <nav class="main_menu">
          <div class="main_menu-back">
            <addition-back />
          </div>
          <MenuDesktop type="addresses" />
        </nav>
      </div>

      <!-- SECTION FOR MOBILE -->
      <section v-if="isMobile" class="addresses mobile">
        <div class="addresses-back">
          <addition-back :stricted="true" @click-handler="goToBack" />
        </div>
        <header v-if="currentStep === 0" class="addresses_header">
          <h1 class="addresses-title mt-3">
            {{ $t('title') }}
          </h1>
          <span class="addresses-icon">
            <svg viewBox="-84 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m221.789062 394.199219 65.910157-89.898438c29.472656-40.179687 55.921875-80.550781 55.921875-132.492187 0-94.5-76.699219-171.429688-171.109375-171.808594h-.722657c-94.71875 0-171.789062 77.070312-171.789062 171.808594 0 51.929687 26.449219 92.3125 55.921875 132.492187l65.90625 89.898438h-76.636719l-44.421875 117.800781h342.082031l-44.421874-117.800781zm-141.679687-107.640625c-27.410156-37.386719-50.109375-71.828125-50.109375-114.75 0-77.980469 63.25-141.449219 141.128906-141.808594h.679688c78.191406 0 141.8125 63.621094 141.8125 141.808594 0 42.921875-22.699219 77.371094-50.109375 114.75 0 0-88 120.332031-91.582031 125.230468zm-35.960937 195.441406 21.792968-57.800781h77.878906l27.710938 37.789062s23.160156-30.476562 28.480469-37.789062h77.667969l21.789062 57.800781zm0 0"
              />
              <path
                d="m277.621094 171.808594c0-58.347656-47.472656-105.808594-105.8125-105.808594s-105.808594 47.460938-105.808594 105.808594c0 58.339844 47.46875 105.800781 105.808594 105.800781s105.8125-47.460937 105.8125-105.800781zm-105.8125 75.800781c-41.796875 0-75.808594-34-75.808594-75.800781 0-41.796875 34.011719-75.808594 75.808594-75.808594 41.800781 0 75.8125 34.011719 75.8125 75.808594 0 41.800781-34.011719 75.800781-75.8125 75.800781zm0 0"
              />
            </svg>
          </span>
        </header>
        <div class="addresses_body">
          <div v-if="currentStep === 0" class="addresses_block list">
            <div class="addresses_block-add mobile" @click.stop="createHandler">
              <span class="addresses_block-add-icon">
                <svg viewBox="-84 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m221.789062 394.199219 65.910157-89.898438c29.472656-40.179687 55.921875-80.550781 55.921875-132.492187 0-94.5-76.699219-171.429688-171.109375-171.808594h-.722657c-94.71875 0-171.789062 77.070312-171.789062 171.808594 0 51.929687 26.449219 92.3125 55.921875 132.492187l65.90625 89.898438h-76.636719l-44.421875 117.800781h342.082031l-44.421874-117.800781zm-141.679687-107.640625c-27.410156-37.386719-50.109375-71.828125-50.109375-114.75 0-77.980469 63.25-141.449219 141.128906-141.808594h.679688c78.191406 0 141.8125 63.621094 141.8125 141.808594 0 42.921875-22.699219 77.371094-50.109375 114.75 0 0-88 120.332031-91.582031 125.230468zm-35.960937 195.441406 21.792968-57.800781h77.878906l27.710938 37.789062s23.160156-30.476562 28.480469-37.789062h77.667969l21.789062 57.800781zm0 0"
                  />
                  <path
                    d="m277.621094 171.808594c0-58.347656-47.472656-105.808594-105.8125-105.808594s-105.808594 47.460938-105.808594 105.808594c0 58.339844 47.46875 105.800781 105.808594 105.800781s105.8125-47.460937 105.8125-105.800781zm-105.8125 75.800781c-41.796875 0-75.808594-34-75.808594-75.800781 0-41.796875 34.011719-75.808594 75.808594-75.808594 41.800781 0 75.8125 34.011719 75.8125 75.808594 0 41.800781-34.011719 75.800781-75.8125 75.800781zm0 0"
                  />
                </svg>
              </span>
              {{ $t('btnCreate') }}
              <img
                class="addresses_block-add-dots desktop"
                src="/icons/consumables/dots.svg"
                alt=""
                @click.stop="toggleAddOption"
              >
              <ul
                v-if="addOptionIsOpen"
                class="addresses_block-add_options desktop"
              >
                <li
                  class="addresses_block-add-option"
                  @click.stop="toggleMobileLocationPopup"
                >
                  {{ $t('addressMyLabel') }}
                </li>
                <li
                  class="addresses_block-add-option"
                  @click.stop="toggleMobileMapPopup"
                >
                  {{ $t('addressMapLabel') }}
                </li>
              </ul>
            </div>
            <div class="addresses_block_list">
              <list-address
                @edit-address="editHandler"
                @view-address="viewHandler"
                @toggle-prompt-popup="togglePromptPopup"
              />
            </div>
            <div
              class="addresses_block-add desktop"
              @click.stop="createHandler"
            >
              <span class="addresses_block-add-icon">
                <svg viewBox="-84 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m221.789062 394.199219 65.910157-89.898438c29.472656-40.179687 55.921875-80.550781 55.921875-132.492187 0-94.5-76.699219-171.429688-171.109375-171.808594h-.722657c-94.71875 0-171.789062 77.070312-171.789062 171.808594 0 51.929687 26.449219 92.3125 55.921875 132.492187l65.90625 89.898438h-76.636719l-44.421875 117.800781h342.082031l-44.421874-117.800781zm-141.679687-107.640625c-27.410156-37.386719-50.109375-71.828125-50.109375-114.75 0-77.980469 63.25-141.449219 141.128906-141.808594h.679688c78.191406 0 141.8125 63.621094 141.8125 141.808594 0 42.921875-22.699219 77.371094-50.109375 114.75 0 0-88 120.332031-91.582031 125.230468zm-35.960937 195.441406 21.792968-57.800781h77.878906l27.710938 37.789062s23.160156-30.476562 28.480469-37.789062h77.667969l21.789062 57.800781zm0 0"
                  />
                  <path
                    d="m277.621094 171.808594c0-58.347656-47.472656-105.808594-105.8125-105.808594s-105.808594 47.460938-105.808594 105.808594c0 58.339844 47.46875 105.800781 105.808594 105.800781s105.8125-47.460937 105.8125-105.800781zm-105.8125 75.800781c-41.796875 0-75.808594-34-75.808594-75.800781 0-41.796875 34.011719-75.808594 75.808594-75.808594 41.800781 0 75.8125 34.011719 75.8125 75.808594 0 41.800781-34.011719 75.800781-75.8125 75.800781zm0 0"
                  />
                </svg>
              </span>
              {{ $t('btnCreate') }}
              <img
                class="addresses_block-add-dots"
                src="/icons/consumables/dots.svg"
                alt=""
                @click.stop="toggleAddOption"
              >
              <ul v-if="addOptionIsOpen" class="addresses_block-add_options">
                <li
                  class="addresses_block-add-option"
                  @click.stop="toggleMobileLocationPopup"
                >
                  {{ $t('addressMyLabel') }}
                </li>
                <li
                  class="addresses_block-add-option"
                  @click.stop="toggleMobileMapPopup"
                >
                  {{ $t('addressMapLabel') }}
                </li>
              </ul>
            </div>
          </div>
          <div v-if="currentStep === 1" class="addresses_block form mobile">
            <form-profile-address
              ref="mobileViewBody"
              :action="formAction"
              @toggle-error-popup="toggleErrorPopup"
              @toggle-success-popup="toggleSuccessPopup"
              @select-step="selectStep"
            />
          </div>
        </div>
      </section>

      <!-- SECTION FOR DESKTOP -->
      <section class="addresses desktop">
        <header class="addresses_header">
          <h1 class="addresses-title">
            {{ $t('title') }}
          </h1>
          <div class="addresses_info">
            <p class="addresses-id">
              ID: {{ PERSONAL_DATA.id }}
            </p>
            <p
              v-if="~PERSONAL_DATA.phone.indexOf('+7')"
              class="addresses-phone ml-1"
            >
              {{ $t('phone') }}:
              <span>{{ PERSONAL_DATA.phone.slice(0, 2) }}</span>
              {{ parsePhone(PERSONAL_DATA.phone, 2) }}
            </p>
            <p v-else class="addresses-phone ml-1">
              {{ $t('phone') }}:
              <span>{{ PERSONAL_DATA.phone.slice(0, 3) }}</span>
              {{ parsePhone(PERSONAL_DATA.phone) }}
            </p>
          </div>
        </header>
        <div class="addresses_body">
          <div class="addresses_block list">
            <h2 class="addresses_list-title">
              <span class="addresses_list-icon">
                <svg viewBox="-84 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m221.789062 394.199219 65.910157-89.898438c29.472656-40.179687 55.921875-80.550781 55.921875-132.492187 0-94.5-76.699219-171.429688-171.109375-171.808594h-.722657c-94.71875 0-171.789062 77.070312-171.789062 171.808594 0 51.929687 26.449219 92.3125 55.921875 132.492187l65.90625 89.898438h-76.636719l-44.421875 117.800781h342.082031l-44.421874-117.800781zm-141.679687-107.640625c-27.410156-37.386719-50.109375-71.828125-50.109375-114.75 0-77.980469 63.25-141.449219 141.128906-141.808594h.679688c78.191406 0 141.8125 63.621094 141.8125 141.808594 0 42.921875-22.699219 77.371094-50.109375 114.75 0 0-88 120.332031-91.582031 125.230468zm-35.960937 195.441406 21.792968-57.800781h77.878906l27.710938 37.789062s23.160156-30.476562 28.480469-37.789062h77.667969l21.789062 57.800781zm0 0"
                  />
                  <path
                    d="m277.621094 171.808594c0-58.347656-47.472656-105.808594-105.8125-105.808594s-105.808594 47.460938-105.808594 105.808594c0 58.339844 47.46875 105.800781 105.808594 105.800781s105.8125-47.460937 105.8125-105.800781zm-105.8125 75.800781c-41.796875 0-75.808594-34-75.808594-75.800781 0-41.796875 34.011719-75.808594 75.808594-75.808594 41.800781 0 75.8125 34.011719 75.8125 75.808594 0 41.800781-34.011719 75.800781-75.8125 75.800781zm0 0"
                  />
                </svg>
              </span>
              {{ $t('listTitle') }}
            </h2>
            <div class="addresses_block_list">
              <list-address
                @edit-address="editHandler"
                @view-address="editHandler"
                @toggle-prompt-popup="togglePromptPopup"
              />
            </div>
          </div>
          <div class="addresses_block form">
            <form-profile-address
              ref="addressViewBody"
              action="create"
              @toggle-error-popup="toggleErrorPopup"
              @toggle-success-popup="toggleSuccessPopup"
              @select-step="selectStep"
            />
          </div>
        </div>
      </section>

      <div class="main_news">
        <MainNews />
      </div>
    </div>

    <!-- FORM POPUP FOR ADDRESS EDIT -->
    <popup-notification
      v-show="formPopupIsOpen"
      :condition="formPopupIsOpen"
      @close-popup="closeFormPopup"
    >
      <div class="popupForm_wrap">
        <h2 class="popupForm-title">
          {{ $t('formEditAddressTitle') }}
        </h2>
        <div class="popupForm_body">
          <form-profile-address
            ref="editFormRef"
            action="edit"
            @toggle-form-popup="toggleFormPopup"
            @toggle-error-popup="toggleErrorPopup"
            @toggle-success-popup="toggleSuccessPopup"
          />
        </div>
      </div>
    </popup-notification>

    <!-- SUCCESS DELETE POPUP -->
    <div v-if="successDeletePopupIsOpen" class="addresses_popup">
      <popup-success @close-popup="toggleSuccessDeletePopup">
        {{ $t('popupSuccessDeleteMessage') }}
      </popup-success>
    </div>
    <!-- PROMPT POPUP -->
    <div v-if="successPromptIsOpen" class="addresses_popup">
      <popup-delete @close-popup="togglePromptPopup" @delete="deleteAddress">
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
      successDeletePopupIsOpen: false,
      successPromptIsOpen: false,
      formPopupIsOpen: false,
      mobileLocationPopupIsOpen: false,
      addOptionIsOpen: false,
      addressIdForDelete: '',
      geocoder: {},
      myLatLng: {}
    }
  },
  computed: {
    ...mapGetters(['CURRENT_ADDRESS', 'PERSONAL_DATA', 'IS_CREATING_ADDRESS'])
  },
  async created () {
    await this.$store.dispatch('GET_ADDRESSES', this.$cookies)
    await this.$store.dispatch('GET_PERSONAL_DATA', this.$cookies)
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('CLEAR_NOTIFICATIONS')
    this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
    this.$store.commit('SET_CREATING_ADDRESS', false)
    next()
  },
  mounted () {
    if (this.IS_CREATING_ADDRESS) {
      this.currentStep = 1
    }
  },
  methods: {
    toggleErrorPopup () {
      return this.$store.commit(
        'SET_ERROR_NOTIFY',
        this.$t('popupErrorMessage')
      )
    },
    toggleSuccessPopup () {
      return this.$store.commit(
        'SET_SUCCESS_NOTIFY',
        this.$t('popupSuccessMessage')
      )
    },
    toggleSuccessDeletePopup () {
      this.successDeletePopupIsOpen = !this.successDeletePopupIsOpen
    },
    togglePromptPopup (addressId) {
      this.addressIdForDelete = addressId
      this.successPromptIsOpen = !this.successPromptIsOpen
    },
    toggleFormPopup () {
      this.formPopupIsOpen = !this.formPopupIsOpen
    },
    closeFormPopup () {
      this.formPopupIsOpen = false
      this.$store.commit('RESET_CURRENT_ADDRESS_DATA')
    },

    toggleMobileMapPopup () {
      this.$refs.mobileViewBody.toggleMapPopup()
    },
    toggleMobileLocationPopup () {
      this.mobileLocationPopupIsOpen = !this.mobileLocationPopupIsOpen
    },
    closeLocationPopup () {
      this.mobileLocationPopupIsOpen = false
    },
    toggleAddOption () {
      this.addOptionIsOpen = !this.addOptionIsOpen
    },
    selectFormAction (action) {
      this.formAction = action
    },
    selectStep (step) {
      if (this.IS_CREATING_ADDRESS) {
        this.$router.push(this.localePath({ path: '/profile/cart' }))
      }
      this.currentStep = step
    },
    editHandler (data) {
      // Передача выбраного итема в Попап редактирования
      this.$refs.editFormRef.isGeolocation = false
      this.$refs.editFormRef.activeMap = false
      this.$refs.editFormRef.createAddressData = { ...this.CURRENT_ADDRESS }
      this.$refs.editFormRef.address = this.CURRENT_ADDRESS.address
      this.selectStep(data.step)
      this.selectFormAction(data.action)
      this.toggleFormPopup()
    },
    viewHandler (data) {
      this.selectStep(data.step)
      this.selectFormAction(data.action)
    },
    createHandler () {
      this.selectStep(1)
      this.selectFormAction('create')
      this.$store.commit('RESET_CURRENT_ADDRESS_DATA')
    },
    async deleteAddress () {
      const vm = this
      const cookiz = this.$cookies
      const id = this.addressIdForDelete
      const res = await this.$store.dispatch('DELETE_CURRENT_ADDRESS', {
        cookiz,
        id
      })
      if (res.data.status === 'success') {
        // this.toggleSuccessDeletePopup()
        this.$store.commit(
          'SET_SUCCESS_NOTIFY',
          this.$t('popupSuccessDeleteMessage')
        )
      } else {
        vm.isServerError = true
      }
    },
    goToBack () {
      console.warn(this.currentStep)
      if (this.currentStep > 0) {
        this.selectStep(--this.currentStep)
        this.selectFormAction('')
        this.$store.commit('RESET_CURRENT_ADDRESS_DATA')
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/classes/class';

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

.popupMap_body {
  position: relative;
}
.map_incdec {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  font-size: 2rem;
  z-index: 90;
  display: flex;
  flex-direction: column;
  border: 1px solid $c-line;
}
.map_incdec-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  width: 75px;
  padding: 1.5rem;
  font-size: 3rem;
  background: white;
  &:first-child {
    border-bottom: 1px solid $c-line;
  }
}

.addresses {
  position: relative;
  grid-area: body;
  grid-template-rows: auto 1fr;
  grid-row-gap: 20px;
  justify-items: center;
  background-color: $c-light;
  height: 100%;
  width: 100%;
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
    min-height: 100vh;
    min-height: calc(var(--vh) * 100);

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

    overflow: auto;
    height: 100%;

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
    &::-webkit-scrollbar {
      display: none;
    }
    border: {
      width: 1px;
      style: solid;
      color: $c-line;
      radius: 6px;
    }
    padding: 15px 10px;
    width: 100%;
    height: 100%;
    overflow: auto;

    &.list {
      display: grid;
      grid-template-rows: auto 1fr auto;
      grid-row-gap: 20px;
    }
    &_list {
      position: relative;

      @media screen and (min-width: 992px) {
        height: 100%;
        overflow: auto;
      }
    }

    &.form {
      display: none;
      padding: 35px;

      @media screen and (min-width: 992px) {
        padding: 15px;
        display: block;
      }

      &.mobile /deep/ {
        .form_city-map {
          display: none;
        }
      }
    }

    &-add {
      position: relative;
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-column-gap: 10px;
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

      &_options {
        position: absolute;
        bottom: 40px;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        border: 1px solid $c-line;
        border-radius: 7px 0px 0px 7px;
        padding-left: 10px;
        width: 70vw;
        box-shadow: 0px 6px 9px #11100029;
        background: #ffffff 0% 0% no-repeat padding-box;
      }

      &-option {
        padding: 10px;
        width: 100%;
        font-family: $ff-gilroy;
        font-size: 12px;
        text-align: right;

        &:not(:last-child) {
          border-bottom: 1px solid $c-line;
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
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    border: {
      width: 1px;
      style: solid;
      color: #c4c4c4;
      radius: 50%;
    }
    padding: 5px;
    width: 25px;
    height: 25px;

    svg {
      width: 100%;
      height: 100%;
      fill: #c4c4c4;
    }
  }
}

.addresses.mobile {
  .addresses {
    &-back {
      position: absolute;
      top: 10px;
      left: 10px;

      @media screen and (min-width: 992px) {
        display: none;
      }

      & /deep/ {
        .link-back {
          font-size: 14px;

          &-icon {
            flex: 0 0 15px;
            width: 15px;
            height: 10px;
          }
        }
      }
    }

    &_block {
      border: none;
      border-radius: 0;
      padding: 0;
      padding-bottom: 10px;

      &.form {
        display: block;
      }

      &.list {
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
          width: 25px;
          height: 25px;
        }

        &-dots {
          width: 20px;
          height: 40px;
          object-fit: cover;
        }
      }
    }
  }
}

.addresses_block.form /deep/ {
  .form {
    .profileNumber-number {
      height: 40px;
    }
  }
}

.popupForm,
.popupMap {
  display: none;

  @media screen and (min-width: 992px) {
    display: block;
  }

  &_wrap {
    z-index: 2;
    flex-direction: column;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0 4rem;
    overflow: auto;
  }

  &-title {
    text-align: center;
    font-family: $ff-roboto;
    font-size: 22px;
    margin-bottom: 2rem;
  }
}

.popupForm {
  &_wrap {
    display: block;
    height: auto;
  }

  &-title {
    margin-bottom: 2rem;

    @media screen and (max-width: 991px) {
      margin: 0 1rem 2rem;
    }
  }
}

.popupForm_wrap {
  align-items: center;
  & /deep/ .form {
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-column-gap: 20px;
    height: 100%;

    &-title {
      display: none;
    }

    &_city-map {
      display: none;
    }

    &_map {
      display: block;
      height: 100%;
      width: 100%;
    }

    &-select-input {
      height: 40px;
    }

    .profileNumber-number {
      height: 40px;
    }

    @media screen and (max-width: 991px) {
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 991px) {
    padding-left: 0;
    padding-right: 0;
  }
}

.popupMap {
  display: block;

  &_wrap {
    height: 540px;

    @media screen and (max-height: 799px) {
      height: calc(100vh - 130px);
    }

    @media screen and (max-width: 991px) {
      grid-template-rows: auto 1fr auto;
      //grid-row-gap: 15px;
      padding: 10px 0;
    }
  }

  &_header {
    padding: 0 10px;
  }

  &-title {
    margin-bottom: 8px;

    @media screen and (max-width: 991px) {
      font-family: $ff-roboto;
      font-size: 20px;
      font-weight: 700;
    }

    & + label {
      @media screen and (min-width: 992px) {
        display: none;
      }
    }

    span {
      display: block;
      margin-top: 10px;
      font-size: 12px;

      @media screen and (min-width: 992px) {
        display: none;
      }
    }
  }

  &_form_addition {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 5px;

    @media screen and (min-width: 992px) {
      display: none;
    }
  }

  &_body {
    width: 100%;
    height: 100%;
  }

  &-btn {
    margin-top: 2rem;
    @extend %btn-colorful;
    justify-self: center;
    font-size: 14px;
  }
}

.popupLocation {
  & /deep/ {
    .popup {
      height: auto;
    }
  }

  &_wrap {
    z-index: 2;
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-row-gap: 15px;
    height: 100%;
    width: 100%;
    padding: 5% 3%;
    overflow: auto;
  }

  &-title {
    text-align: center;
    font-family: $ff-gilroy;
    font-size: 14px;

    span {
      display: block;
      margin-top: 20px;
      font-size: 12px;
    }
  }

  &-inputLabel {
    font-size: 12px;

    &-span {
      display: block;
      font-size: 10px;
    }
  }

  &_form_addition {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 5px;

    @media screen and (min-width: 992px) {
      display: none;
    }
  }

  &-btn {
    @extend %btn-colorful;
    justify-self: center;
    width: 70%;
    font-size: 14px;
    @media screen and (min-width: 992px) {
      padding: 0.7em 8em;
      width: auto;
    }
  }
}
</style>
<style>
.addresses_popup .popupError_wrap,
.addresses_popup .popupSuccess_wrap,
.addresses_popup .popupDelete_wrap {
  position: fixed !important;
  top: 0;
  left: 0;
}
@media screen and (max-width: 991px) {
  .addresses_popup .popupDelete,
  .addresses_popup .popupSuccess {
    padding: 12vh 0 !important;
    /*overflow: auto;*/
  }
}
</style>
