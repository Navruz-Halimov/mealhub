<i18n>
{
  "en": {
    "phone": "Phone number",
    "editTitle": "Edit your address",
    "viewTitle": "Your address",
    "addTitle": "Add new address",
    "editButtonLabel": "Save",
    "createButtonLabel": "Add",
    "checkboxGeoLabel": "Choose my location",
    "checkboxMapLabelMobile": "Choose on the map",
    "selectCityLabel": "Address",

    "inputSectionLabel": "Section",
    "inputBuildingLabel": "Building",
    "inputHouseLabel": "House",
    "inputFlourLabel": "Flour",
    "inputFlatLabel": "Apartment",
    "inputOfficeLabel": "Office",
    "inputPodyezdLabel": "Entrance",
    "inputIntercomLabel": "Intercom",

    "inputSectionLabelMobile": "Sec.",
    "inputBuildingLabelMobile": "Bld.",
    "inputHouseLabelMobile": "Hse.",
    "inputFlourLabelMobile": "Fl.",
    "inputFlatLabelMobile": "Apt.",
    "inputOfficeLabelMobile": "Ofc.",
    "inputPodyezdLabelMobile": "Entr.",
    "inputIntercomLabelMobile": "Intc.",

    "selectPlaceholder": "Select from list",
    "aboutPlaceholder": "Dormitory, room, office, sanatorium, school, beauty salon",
    "commentPlaceholder": "Comment text",
    "aboutLabel": "About address",
    "commentLabel": "Comment",
    "impossibleAdress": "The entered address is incorrect",
    "successTitle": "Address was saved successfully",
    "back": "Back",
    "chooseBtn": "Choose"
  },
  "ru": {
    "phone": "Номер телефона",
    "editTitle": "Редактировать адрес доставки",
    "viewTitle": "Ваш адрес",
    "addTitle": "Добавить адрес доставки",
    "editButtonLabel": "Сохранить",
    "createButtonLabel": "Добавить",
    "checkboxGeoLabel": "Мое местоположение",
    "checkboxMapLabelMobile": "Выбрать на карте",
    "selectCityLabel": "Адрес",

    "inputSectionLabel": "Корпус",
    "inputBuildingLabel": "Строение",
    "inputHouseLabel": "Дом",
    "inputFlourLabel": "Этаж",
    "inputFlatLabel": "Квартира",
    "inputOfficeLabel": "Офис",
    "inputPodyezdLabel": "Подъезд",
    "inputIntercomLabel": "Домофон",

    "inputSectionLabelMobile": "Кор.",
    "inputBuildingLabelMobile": "Стр.",
    "inputHouseLabelMobile": "Дом",
    "inputFlourLabelMobile": "Эт.",
    "inputFlatLabelMobile": "Кв.",
    "inputOfficeLabelMobile": "Офис",
    "inputPodyezdLabelMobile": "Под.",
    "inputIntercomLabelMobile": "Дмф.",

    "selectPlaceholder": "Выберите из списка",
    "aboutPlaceholder": "Общежитие, комната, офис, санаторий, школа, салон красоты",
    "commentPlaceholder": "Текст комментария",
    "aboutLabel": "Описание адреса",
    "commentLabel": "Комментарий",
    "impossibleAdress": "Введенный адрес некорректен",
    "successTitle": "Ваши данные успешно сохранены!",
    "back": "Вернуться",
    "chooseBtn": "Выбрать"
  }
}
</i18n>

<template>
  <form class="form profileAddress" @submit.prevent>
    <p class="form-title">
      <span class="desktop">
        <span v-if="action === 'edit'">
          {{ $t('editTitle') }}
        </span>
        <span v-else-if="action === 'view'">
          {{ $t('viewTitle') }}
        </span>
        <span v-else>
          <div class="addresses_list-wrap">
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
            {{ $t('addTitle') }}
          </div>
        </span>
      </span>
      <span class="mobile green text-xxl">
        <span v-if="action === 'edit'">
          {{ $t('editTitle') }}
        </span>
        <span v-else-if="action === 'view'">
          {{ $t('viewTitle') }}
        </span>
        <span v-else>
          {{ $t('addTitle') }}
        </span>
      </span>
      <span class="form-title-icon">
        <svg viewBox="-84 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m221.789062 394.199219 65.910157-89.898438c29.472656-40.179687 55.921875-80.550781 55.921875-132.492187 0-94.5-76.699219-171.429688-171.109375-171.808594h-.722657c-94.71875 0-171.789062 77.070312-171.789062 171.808594 0 51.929687 26.449219 92.3125 55.921875 132.492187l65.90625 89.898438h-76.636719l-44.421875 117.800781h342.082031l-44.421874-117.800781zm-141.679687-107.640625c-27.410156-37.386719-50.109375-71.828125-50.109375-114.75 0-77.980469 63.25-141.449219 141.128906-141.808594h.679688c78.191406 0 141.8125 63.621094 141.8125 141.808594 0 42.921875-22.699219 77.371094-50.109375 114.75 0 0-88 120.332031-91.582031 125.230468zm-35.960937 195.441406 21.792968-57.800781h77.878906l27.710938 37.789062s23.160156-30.476562 28.480469-37.789062h77.667969l21.789062 57.800781zm0 0"
          />
          <path
            d="m277.621094 171.808594c0-58.347656-47.472656-105.808594-105.8125-105.808594s-105.808594 47.460938-105.808594 105.808594c0 58.339844 47.46875 105.800781 105.808594 105.800781s105.8125-47.460937 105.8125-105.800781zm-105.8125 75.800781c-41.796875 0-75.808594-34-75.808594-75.800781 0-41.796875 34.011719-75.808594 75.808594-75.808594 41.800781 0 75.8125 34.011719 75.8125 75.808594 0 41.800781-34.011719 75.800781-75.8125 75.800781zm0 0"
          />
        </svg>
      </span>
    </p>
    <div class="form_body">
      <basic-input-checkbox
        v-if="action !== 'view'"
        v-model="isGeo"
        class="desktop"
        :disabled="action === 'view'"
      >
        {{ $t('checkboxGeoLabel') }}
      </basic-input-checkbox>
      <div class="mobile eatme_mobile_input_container">
        <basic-input-checkbox
          v-if="action !== 'view'"
          v-model="isGeo"
          :disabled="action === 'view'"
        >
          {{ $t('checkboxGeoLabel') }}
        </basic-input-checkbox>
      </div>
      <div
        class="mobile eatme_mobile_input_container cursor-pointer"
        @click.stop="toggleMapPopup"
      >
        <basic-input-checkbox
          v-if="action !== 'view'"
          v-model="isMap"
          :disabled="action === 'view'"
          class="no-pointer-events"
        >
          <span>{{ $t('checkboxMapLabelMobile') }}</span>
        </basic-input-checkbox>
      </div>
      <div class="form_city">
        <div class="form_city-input">
          <label class="form-select-label">
            <span
              class="form-select-text"
              :class="{ error: $v.address.$error }"
            >{{ $t('selectCityLabel') }}:</span>
            <geo-place-autocomplete-field
              ref="autocompleteAddress"
              v-model="address"
              v-place-autofill:street="street"
              v-place-autofill:city="city"
              v-place-autofill:house="$v.house.$model"
              :placeholder="$t('selectPlaceholder')"
              class="form-address-input"
              :is-error="$v.address.$error || invalidAddress"
              :class="{ error: $v.address.$error || invalidAddress }"
              @input="onAddressEditing"
              @autocomplete-select="onSelectFromDropdown"
            />
          </label>
        </div>
        <span
          v-if="action !== 'view'"
          class="form_city-map"
          @click.stop="toggleMapPopup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0"
            y="0"
            viewBox="0 0 54 53.63"
            xml:space="preserve"
          >
            <style />
            <switch>
              <g>
                <g transform="translate(-755 437.162)">
                  <g transform="translate(755 -437.16)" />
                  <path
                    d="M776.17-414.97l4.02-1.36h.01c.02-.01.04-.01.06-.01h.15c.02 0 .04.01.06.01h.01l3.9 1.32 3.9-1.32c.24-.08.51.05.59.29.02.05.02.1.02.15v8.1c0 .21-.14.4-.35.45l-4.02 1.36h-.01c-.02.01-.04.01-.06.01h-.15c-.02 0-.04-.01-.06-.01h-.01l-3.9-1.32-3.9 1.32a.47.47 0 0 1-.59-.29c-.02-.05-.02-.1-.02-.15v-8.1c0-.21.14-.39.35-.45zm8.69.79v7.11l3.11-1.05v-7.11l-3.11 1.05zm-4.05-1.05v7.11l3.11 1.05v-7.11l-3.11-1.05zm-.94 0l-3.11 1.05v7.11l3.11-1.05v-7.11z"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#bb4970"
                  />
                </g>
              </g>
            </switch>
          </svg>
        </span>
      </div>
      <template v-if="reloaded">
        <div class="wide flex">
          <div class="form_addition">
            <basic-input-profile-text
              v-model.trim="$v.house.$model"
              :is-error="$v.house.$error"
              :disabled="action === 'view'"
              placeholder="0"
            >
              <span
                class="addressInputLabelFull"
              >{{ $t('inputHouseLabel') }}:</span>
              <span
                class="addressInputLabelCompact"
              >{{ $t('inputHouseLabelMobile') }}:</span>
            </basic-input-profile-text>
            <basic-input-profile-number
              v-model.number="section"
              :disabled="action === 'view'"
              placeholder="0"
            >
              <span
                class="addressInputLabelFull"
              >{{ $t('inputSectionLabel') }}:</span>
              <span
                class="addressInputLabelCompact"
              >{{ $t('inputSectionLabelMobile') }}:</span>
            </basic-input-profile-number>
            <basic-input-profile-text
              v-model="building"
              :disabled="action === 'view'"
              placeholder="0"
            >
              <span
                class="addressInputLabelFull"
              >{{ $t('inputBuildingLabel') }}:</span>
              <span
                class="addressInputLabelCompact"
              >{{ $t('inputBuildingLabelMobile') }}:</span>
            </basic-input-profile-text>
            <basic-input-profile-number
              v-model.number="flat"
              :disabled="action === 'view'"
              placeholder="0"
            >
              <span
                class="addressInputLabelFull"
              >{{ $t('inputFlatLabel') }}:</span>
              <span
                class="addressInputLabelCompact"
              >{{ $t('inputFlatLabelMobile') }}:</span>
            </basic-input-profile-number>
          </div>
        </div>
        <div class="wide flex">
          <div class="form_addition office">
            <basic-input-profile-text
              v-model="office"
              :disabled="action === 'view'"
              placeholder="0"
            >
              <span
                class="addressInputLabelFull"
              >{{ $t('inputOfficeLabel') }}:</span>
              <span
                class="addressInputLabelCompact"
              >{{ $t('inputOfficeLabelMobile') }}:</span>
            </basic-input-profile-text>
            <basic-input-profile-text
              v-model="front_door"
              :disabled="action === 'view'"
              placeholder="0"
            >
              <span
                class="addressInputLabelFull"
              >{{ $t('inputPodyezdLabel') }}:</span>
              <span
                class="addressInputLabelCompact"
              >{{ $t('inputPodyezdLabelMobile') }}:</span>
            </basic-input-profile-text>
            <basic-input-profile-number
              v-model.number="flour"
              :disabled="action === 'view'"
              placeholder="0"
            >
              <span
                class="addressInputLabelFull"
              >{{ $t('inputFlourLabel') }}:</span>
              <span
                class="addressInputLabelCompact"
              >{{ $t('inputFlourLabelMobile') }}:</span>
            </basic-input-profile-number>
            <basic-input-profile-text
              v-model="intercom"
              :disabled="action === 'view'"
              placeholder="0"
            >
              <span
                class="addressInputLabelFull"
              >{{ $t('inputIntercomLabel') }}:</span>
              <span
                class="addressInputLabelCompact"
              >{{ $t('inputIntercomLabelMobile') }}:</span>
            </basic-input-profile-text>
          </div>
        </div>
      </template>
      <div v-if="reloaded" class="textfields">
        <div
          class="textareaWrap"
          :class="{ invalid: $v.address_comment.$error }"
        >
          <p class="textareaLabel">
            {{ $t('aboutLabel') }}:
          </p>
          <textarea
            ref="about_field"
            v-model="address_comment"
            :placeholder="$t('aboutPlaceholder')"
            class="group-textarea"
            @input="
              $emit('input', $event.target.address_comment)
              $v.$touch()
            "
          />
        </div>
        <div class="textareaWrap" :class="{ invalid: $v.comment.$error }">
          <p class="textareaLabel">
            {{ $t('commentLabel') }}:
          </p>
          <textarea
            ref="comment_field"
            v-model="comment"
            :placeholder="$t('commentPlaceholder')"
            class="group-textarea"
            @input="
              $emit('input', $event.target.comment)
              $v.$touch()
            "
          />
        </div>
      </div>

      <template v-if="$v.$error">
        <button v-if="action === 'edit'" class="form-save eatme-btn-disabled">
          {{ $t('editButtonLabel') }}
        </button>
        <button v-else-if="action === 'view'" />
        <button v-else class="form-save eatme-btn-disabled">
          {{ $t('createButtonLabel') }}
        </button>
      </template>
      <template v-else>
        <button
          v-if="action === 'edit'"
          class="form-save eatme-btn-colorful"
          @click="editCurrentAddress"
        >
          {{ $t('editButtonLabel') }}
        </button>
        <button v-else-if="action === 'view'" />
        <button
          v-else
          class="form-save eatme-btn-colorful"
          @click="createNewAddress"
        >
          {{ $t('createButtonLabel') }}
        </button>
      </template>
    </div>

    <map-address-view
      v-if="action === 'edit' && !isMobile"
      v-show="reloaded"
      ref="addressGMap"
      :class="{ 'form_map-edit': isMobile && action === 'edit' }"
      class="form_map"
      :address-data="createAddressData"
      @input="onMapInput"
    />
    <popup-notification
      v-else
      v-show="mapPopupIsOpen"
      :is-full-height="true"
      :condition="mapPopupIsOpen"
      @close-popup="closeMapPopup"
    >
      <!-- MAP POPUP FOR CATCH LOCATION -->
      <div class="popupMap_wrap">
        <div class="popupMap_body">
          <map-address-view
            ref="addressGMap"
            :address-data="createAddressData"
            @input="onMapInput"
          />
        </div>
        <button class="popupMap-btn eatme-btn-colorful" @click="acceptAddress">
          {{ $t('chooseBtn') }}
        </button>
      </div>
    </popup-notification>

    <div
      v-show="isMobile && action === 'view'"
      class="map__back eatme-btn-red"
      @click="activeMap = false"
    >
      {{ $t('back') }}
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
export default {
  props: {
    action: {
      type: String,
      default: 'view'
    }
  },
  data () {
    return {
      createAddressData: {
        isGeolocation: false,
        id: 0,
        address: '',
        city: '',
        street: '',

        house: '',
        section: null,
        flour: null,
        flat: null,

        office: '',
        front_door: '',
        building: '',
        intercom: '',

        address_comment: '',
        comment: '',

        zip: '',
        latitude: 0,
        longitude: 0
      },
      validSelected: false,
      activeMap: false,
      reloaded: true,
      invalidAddress: false,

      mapPopupIsOpen: false,
      mapChoiseBuffer: {},
      isGeolocation: false,

      waitGeolocation: true
    }
  },
  computed: {
    isGeo: {
      get () {
        return this.isGeolocation || false
      },
      set (value) {
        if (this.action === 'create') {
          console.warn(
            '• ProfileAddress Inputs: isGeo^: this.waitGeolocation',
            value
          )
        }

        this.activeMap = false
        if (value) {
          this.createAddressData.address = ''
          // this.$refs.addressGMap.getUserGeolocation()

          this.validSelected = 'geo'
          this.invalidAddress = false
        } else {
          this.validSelected = false
        }
        this.waitGeolocation = value
        this.isGeolocation = value
      }
    },
    isMap: {
      get () {
        return this.activeMap || false
      },
      set (value) {
        this.activeMap = value
        if (this.activeMap) {
          this.validSelected = 'map'
          this.invalidAddress = false
        } else {
          this.validSelected = false
        }
      }
    },
    address: {
      get () {
        return this.createAddressData.address
      },
      set (value) {
        this.validSelected = false

        this.createAddressData.address = value || ''
      }
    },
    city: {
      get () {
        const data = this.createAddressData
        return data.city
      },
      set (value) {
        this.createAddressData.city = value || ''
      }
    },
    street: {
      get () {
        const data = this.createAddressData
        return data.street
      },
      set (value) {
        this.createAddressData.street = value || ''
      }
    },
    house: {
      get () {
        const data = this.createAddressData
        return data.house
      },
      set (value) {
        this.createAddressData.house = value || ''
      }
    },
    section: {
      get () {
        const data = this.createAddressData
        return data.section !== '' && data.section !== null
          ? +data.section
          : null
      },
      set (value) {
        this.createAddressData.section = value || ''
      }
    },
    flour: {
      get () {
        const data = this.createAddressData
        return data.flour !== '' && data.flour !== null ? +data.flour : null
      },
      set (value) {
        this.createAddressData.flour = value || ''
      }
    },
    flat: {
      get () {
        const data = this.createAddressData
        return data.flat !== '' && data.flat !== null ? +data.flat : null
      },
      set (value) {
        this.createAddressData.flat = value || ''
      }
    },

    office: {
      get () {
        const data = this.createAddressData
        return data.office
      },
      set (value) {
        this.createAddressData.office = value || ''
      }
    },
    front_door: {
      get () {
        const data = this.createAddressData
        return data.front_door
      },
      set (value) {
        this.createAddressData.front_door = value || ''
      }
    },
    building: {
      get () {
        const data = this.createAddressData
        return data.building
      },
      set (value) {
        this.createAddressData.building = value || ''
      }
    },
    intercom: {
      get () {
        const data = this.createAddressData
        return data.intercom
      },
      set (value) {
        this.createAddressData.intercom = value || ''
      }
    },

    address_comment: {
      get () {
        const data = this.createAddressData
        return data.address_comment
      },
      set (value) {
        this.createAddressData.address_comment = value || ''
      }
    },
    comment: {
      get () {
        const data = this.createAddressData
        return data.comment
      },
      set (value) {
        this.createAddressData.comment = value || ''
      }
    },
    ...mapGetters(['CURRENT_ADDRESS', 'IS_CREATING_ADDRESS'])
  },
  validations: {
    address: {
      required
    },
    house: {
      required,
      maxLength: maxLength(12)
    },
    flat: {
      required,
      maxLength: maxLength(12)
    },
    address_comment: {
      maxLength: maxLength(254)
    },
    comment: {
      maxLength: maxLength(254)
    }
  },
  mounted () {
    setTimeout(() => {
      this.isGeo = true
    }, 100)
    this.wait(this.reloadAutocompletesServices)
  },
  methods: {
    toggleMapPopup () {
      console.warn('toggleMapPopup', this.mapPopupIsOpen)
      this.mapPopupIsOpen = !this.mapPopupIsOpen
    },
    closeMapPopup () {
      this.mapPopupIsOpen = false
    },
    onMapInput (data) {
      if (this.waitGeolocation) {
        this.createAddressData.address = data.address
        this.createAddressData.latitude = data.latitude
        this.createAddressData.longitude = data.longitude
        this.waitGeolocation = false
      } else {
        this.mapChoiseBuffer = data

        if (this.action === 'edit' && !this.isMobile) {
          this.acceptAddress()
        }
      }
    },
    acceptAddress () {
      if (this.mapChoiseBuffer) {
        this.isGeo = false
        this.isMap = true

        this.createAddressData.address = this.mapChoiseBuffer.address
        this.createAddressData.latitude = this.mapChoiseBuffer.latitude
        this.createAddressData.longitude = this.mapChoiseBuffer.longitude

        this.mapPopupIsOpen = false
        this.locationPopupIsOpen = false
      } else {
        console.warn('NO mapChoiseBuffer')
      }
    },

    onAddressEditing () {
      if (this.isGeo) {
        this.isGeo = false
      }
      if (this.isMap) {
        this.isMap = false
      }
    },
    onSelectFromDropdown (a, b) {
      this.validSelected = 'dropdown'
      this.invalidAddress = false
      this.$refs.addressGMap.setCoords({
        lat: b.geometry.location.lat(),
        lng: b.geometry.location.lng()
      })
    },

    reloadAutocompletesServices () {
      if (window.google && window.google.maps) {
        this.$refs.autocompleteAddress.$service = new window.google.maps.places.AutocompleteService()
        this.$refs.autocompleteAddress.$geocoder = new window.google.maps.Geocoder()
        this.$refs.autocompleteAddress.loaded = true
        this.$refs.autocompleteAddress.$emit('loaded')
        console.warn('reloadAutocompletesServices')
        return
      }
      return false
    },

    reloading () {
      setTimeout(() => {
        this.reloaded = false
        this.$nextTick(() => {
          this.reloaded = true
        })
      }, 500)
    },

    toggleErrorPopup () {
      this.$parent.$parent.toggleErrorPopup()
    },
    toggleSuccessPopup () {
      this.$parent.$parent.toggleSuccessPopup()
    },
    closeFormPopup () {
      this.$parent.$parent.closeFormPopup()
    },

    resetFields () {
      this.address = ''
      this.house = ''
      this.section = ''
      this.building = ''
      this.flat = ''
      this.office = ''
      this.front_door = ''
      this.flour = ''
      this.intercom = ''
      this.address_comment = ''
      this.comment = ''
      this.isGeo = false
    },

    async editCurrentAddress () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.toggleErrorPopup()
      } else {
        const cookiz = this.$cookies
        const id = this.createAddressData.id

        this.$store.commit('SET_CURRENT_ADDRESS_DATA', {
          ...this.createAddressData
        })

        try {
          const res = await this.$store.dispatch('EDIT_CURRENT_ADDRESS', {
            cookiz,
            id
          })

          if (res.data.status === 'success') {
            this.$emit('select-step', 0)
            this.toggleSuccessPopup()
            this.closeFormPopup()

            this.$nextTick(() => {
              this.$v.$reset()
            })
          } else {
            this.toggleErrorPopup()
          }
        } catch {
          this.toggleErrorPopup()
        }
      }
    },
    async createNewAddress () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$parent.toggleErrorPopup()
        return
      }

      if (!this.validSelected) {
        this.$parent.errorPopupIsOpen = this.$t('impossibleAdress')
        this.invalidAddress = true
        return
      }

      this.$store.commit('SET_CURRENT_ADDRESS_DATA', {
        ...this.createAddressData
      })

      try {
        if (this.IS_CREATING_ADDRESS) {
          this.$store.commit('SET_CREATED_ADDRESS', this.CURRENT_ADDRESS)
        }

        const res = await this.$store.dispatch('ADD_NEW_ADDRESS', this.$cookies)

        if (res.data.status !== 'success') {
          this.$parent.toggleErrorPopup()
          return
        }

        if (!this.IS_CREATING_ADDRESS) {
          this.$parent.toggleSuccessPopup()
        }

        this.$emit('select-step', 0)
        this.$nextTick(() => {
          this.$v.$reset()
        })

        this.resetFields()
      } catch (err) {
        this.$store.commit('SET_CREATED_ADDRESS', null)
        console.warn('ADD_NEW_ADDRESS err', err)
        this.$parent.toggleErrorPopup()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/modificator';

.no-pointer-events {
  pointer-events: none;
}

.addressInputLabelFull {
  display: none;
}
.addressInputLabelCompact {
  display: none;
}
@media screen and (min-width: 575px) {
  .addressInputLabelFull {
    display: inline;
  }
}
@media screen and (max-width: 575px) {
  .addressInputLabelCompact {
    display: inline;
  }
}

.form_map {
  margin-top: 0px !important;
}

.textareaLabel {
  font-family: Gilroy-Light, sans-serif;
  font-size: 14px;
  color: #111;
}

.textfields {
  margin-top: 5px !important;
  width: 100%;
  display: flex;

  @media screen and (min-width: 992px) and (max-width: 1365px) {
    flex-wrap: wrap;
  }

  @media screen and (max-width: 575px) {
    flex-wrap: wrap;
  }
}
.textareaWrap {
  width: 100%;
  margin-top: 10px;
  font-size: 14px;

  .group-textarea {
    resize: none;
  }

  textarea {
    @media screen and (max-width: 991px) {
      box-shadow: 0 3px 6px rgba(17, 16, 0, 0.16);
    }
  }

  &.invalid {
    textarea {
      border-color: $error;
    }
    .textareaLabel {
      color: $error;
    }
  }

  &:first-child {
    margin-right: 1rem;

    @media screen and (min-width: 992px) and (max-width: 1365px) {
      margin-right: 0;
    }

    @media screen and (max-width: 575px) {
      margin-right: 0;
    }
  }
  p {
    margin-bottom: 5px;
    font-family: $ff-gilroy;
    font-size: 14px;
  }
  & /deep/ {
    .group-textarea {
      font-size: 14px;
      border: 1px solid #e2e2e2;
      border-radius: 5px;
      width: 100%;
      padding: 1rem;
      box-sizing: border-box;
      height: 100px;
      background: #fff 0 0 no-repeat padding-box;
    }
  }
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &_active-map {
    flex-direction: column-reverse;
  }

  &_body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    & > * {
      margin-top: 15px;
    }
  }

  &_map {
    &-edit {
      height: calc(80vh - 200px) !important;
    }
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
    font-size: 14px;

    @media screen and (min-width: 992px) {
      display: none;
    }

    span {
      margin-left: 5px;
      font-size: 16px;
    }
  }

  &_addition {
    flex: 1 0 100px;
    display: flex;
    margin: -15px -5px 0 -5px;
    @media screen and (max-width: 991px) {
      grid-column-gap: 0;
    }
    @media screen and (min-width: 992px) and (max-width: 1365px) {
      flex-wrap: wrap;
    }
    & /deep/ {
      .profileNumber,
      .profileText {
        padding: 15px 5px 0 5px;
        flex: 0 0 25%;
      }
      & .profileNumber-number {
        height: 40px;
      }
      & .profileText-text {
        color: $c-primary;
      }
      & .profileText-input {
        height: 40px;
      }

      @media screen and (min-width: 992px) and (max-width: 1365px) {
        flex-wrap: wrap;

        .profileNumber,
        .profileText {
          flex: 0 0 50%;
        }
      }

      @media screen and (max-width: 575px) {
        flex-wrap: wrap;

        .profileNumber,
        .profileText {
          flex: 0 0 50%;
        }
      }
    }
  }

  &_city {
    width: 100%;
    display: flex;

    &-input {
      width: 100%;

      & /deep/ {
        .autocomplete-field {
          height: 40px;

          input {
            padding: 2px 5px;
            width: 100%;
            height: 100%;
          }
          &.error {
            border-color: #eb608f;
          }
        }

        .form-group .form-group-inner {
          height: 100%;
        }

        .form-group .form-group-inner .form-control {
          padding-left: 5px;
          height: 100%;
          width: 100%;
        }
      }
    }

    &-map {
      align-self: flex-end;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 20px;
      border: {
        width: 1px;
        style: solid;
        color: #ba4a70;
        radius: 50%;
      }
      padding: 5px;
      min-width: 40px;
      max-width: 40px;
      min-height: 40px;
      max-height: 40px;
      cursor: pointer;
      overflow: hidden;

      svg {
        width: 100%;
        height: 100%;
        transform-origin: center;
        transform: scale(2, 2);
      }
    }
  }

  &-address-input {
    font-size: 14px;
    display: flex;
    align-items: center;
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

    & /deep/ {
      .form-control,
      .form-group,
      .form-group-inner {
        width: 100%;
        font-size: 14px;
      }
    }
  }

  &-select {
    &-label {
      width: 100%;
    }

    &-text {
      font-size: 14px;
    }
    &-text.error {
      color: $c-error;
    }

    &-input.error /deep/ {
      border-color: $c-error;
    }

    &-input /deep/ {
      font-size: 14px;
      display: flex;
      align-items: center;
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

      .vs__dropdown-toggle {
        width: 100%;
        border: none;
        font-size: 14px;
      }

      .vs__dropdown-menu {
        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #11100029;
        border: 1px solid #e2e2e2;
        border-radius: 5px;
        padding: 0;
      }

      .vs__dropdown-option {
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
    align-self: center;
    margin-top: 2rem;
    cursor: pointer;
    margin-bottom: 1.5rem;

    @media screen and (min-width: 992px) {
      margin-bottom: 0;
    }
  }
}

.map {
  &__back {
    text-align: center;
    margin: 20px auto 0 auto;
  }
}
</style>

<style>
@media screen and (max-width: 991px) {
  .form.profileAddress .form_addition .profileText-text,
  .form.profileAddress .form_addition .profileNumber-text {
    max-width: 4rem;
  }
  .form.profileAddress {
    padding: 0 1rem;
  }
  .form.profileAddress .profileNumber,
  .form.profileAddress .profileText {
    flex: 0 0 25%;
  }
}

.form.profileAddress .textareaLabel,
.form.profileAddress .profileNumber-text,
.form.profileAddress .profileText-text,
.form.profileAddress .form-select-text {
  font-size: 14px !important;
}
@media screen and (max-width: 991px) {
  .form.profileAddress .textareaLabel,
  .form.profileAddress .profileNumber-text,
  .form.profileAddress .profileText-text,
  .form.profileAddress .form-select-text {
    color: #21bc96;
  }
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/classes/class';
.form-title {
  width: 100%;
}
.addresses_list-wrap {
  align-items: center;
  display: flex;
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 20px;
}
.addresses_list-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  border: 1px solid #c4c4c4;
  border-radius: 50%;
  padding: 5px;
  width: 25px;
  height: 25px;
  svg {
    width: 100%;
    height: 100%;
    fill: #c4c4c4;
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

.popupMap {
  display: block;

  &_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    @media screen and (max-width: 991px) {
      padding: 10px 0;
    }
    @media screen and (min-width: 992px) {
      &_wrap {
        z-index: 2;
        width: 100%;
        padding: 0 4rem;
        overflow: auto;
      }
    }
  }

  @media screen and (min-width: 992px) {
    &-title {
      text-align: center;
      font-family: $ff-roboto;
      font-size: 22px;
      margin-bottom: 2rem;
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
    @media screen and (min-width: 992px) {
      text-align: center;
      font-family: $ff-roboto;
      font-size: 22px;
      margin-bottom: 2rem;
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
    height: calc(100% - 53px);
  }

  &-btn {
    margin-top: 2rem;
    justify-self: center;
    font-size: 14px;
  }
}
</style>
