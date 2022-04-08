<i18n>
{
  "en": {
    "title": "Filters",
    "titleResult": "Results",
    "radiusTitle": "Radius of searching area",
    "radiusKm": "km",
    "meters": "km",
    "defaultRadiusLabel": "Default radius",
    "radiusDefault": "Radius default",
    "cuisineTitle": "Cuisine of the catering point",
    "cateringType": "Type of the catering point",
    "cateringRating": "Rating of the catering point",
    "cateringReviews": "Quantity of reviews",
    "cateringHours": "Choose working hours",
    "cateringProducts": "Choose key product",
    "norate": "No rating",
    "cateringAdditional": "Choose additional services",
    "everyDay": "Everyday",
    "wholeDay": "Around the clock",
    "checkTitle": "Choose an average check",
    "foodTakeaway": "Takeaway food",
    "foodDelivery": "Delivery",
    "newCatringPoint": "New catring point",
    "btnSearch": "Search",
    "btnReset": "Reset"
  },
  "ru": {
    "title": "Фильтры",
    "titleResult": "Результат",
    "radiusTitle": "Радиус поиска",
    "radiusKm": "км",
    "meters": "км",
    "defaultRadiusLabel": "Радиус по умолчанию",
    "radiusDefault": "Значение по умолчанию",
    "cuisineTitle": "Выберите кухню",
    "cateringType": "Выберите тип заведения",
    "cateringRating": "Рейтинг заведения",
    "cateringReviews": "Количество отзывов",
    "cateringHours": "Режим работы",
    "cateringProducts": "Ключевой продукт",
    "norate": "Без рейтинга",
    "cateringAdditional": "Дополнительные услуги",
    "everyDay": "Ежедневно",
    "wholeDay": "Круглосуточно",
    "checkTitle": "Средний чек",
    "foodTakeaway": "Еда на вынос",
    "foodDelivery": "Доставка",
    "newCatringPoint": "Новые заведения",
    "btnSearch": "Найти",
    "btnReset": "Сброс"
  }
}
</i18n>

<template>
  <div class="filter">
    <div
      class="filter-back"
      :class="{ show: currentStep !== 'filter' }"
      @click="goToBack"
    >
      <addition-back :stricted="true" @click-handler="goToBack" />
    </div>
    <h2 class="filter-title">
      {{ currentStep === 'view' ? $t('titleResult') : $t('title') }}
      {{
        currentStep === 'view' ? `(${$store.getters.CATERING_LIST.length})` : ''
      }}
    </h2>
    <form
      v-if="currentStep === 'filter'"
      class="filter_form form"
      @submit.prevent
    >
      <!-- BLOCK - RADIUS -->
      <div class="form_block">
        <header class="form_header" @click="toggleSection($event)">
          <h2 class="form_header-title">
            {{ $t('radiusTitle') }}
          </h2>
          <span
            v-tooltip="tOptions"
            class="form_header-detail"
            @click.stop
          >?</span>
          <span class="form_header-toggle">
            <img src="~/assets/icons/L_arrow.svg">
          </span>
        </header>
        <div class="form_body radius">
          <div class="radius_box">
            <p class="radius-label">
              <basic-input-number
                v-model.number="radiusHidden"
                :is-error="$v.radius.$error"
                @custom-blur="radiusHiddenValue = radius"
              />
              <span class="ml-1">{{ $t('meters') }}</span>
            </p>
            <ul class="radius_movements">
              <li
                class="radius-movement"
                :class="{ active: movementType === 'walking' }"
                @click="
                  setDefaultFilterRadius(
                    'walking',
                    CATERING_FILTER_SETTINGS.radius.defaultWalking
                  )
                "
              >
                <img src="/icons/movement/foot.svg" alt="">
              </li>
              <li
                class="radius-movement"
                :class="{ active: movementType === 'driving' }"
                @click="
                  setDefaultFilterRadius(
                    'driving',
                    CATERING_FILTER_SETTINGS.radius.defaultDriving
                  )
                "
              >
                <img src="/icons/movement/car.svg" alt="">
              </li>
              <li
                class="radius-movement"
                :class="{ active: movementType === 'transit' }"
                @click="
                  setDefaultFilterRadius(
                    'transit',
                    CATERING_FILTER_SETTINGS.radius.defaultTransit
                  )
                "
              >
                <img src="~/assets/icons/bus.svg" alt="">
              </li>
            </ul>
          </div>
          <div class="radius_range">
            <basic-input-range
              v-model.number="radius"
              :min="~~CATERING_FILTER_SETTINGS.radius.min || 1"
              :max="~~CATERING_FILTER_SETTINGS.radius.max"
              @custom-focus="resetDefaultFilterRadius"
            />
            <p class="radius_range-label">
              {{ radius }} {{ $t('meters') }}
            </p>
          </div>
          <basic-input-checkbox v-model="isDefault" class="mt-1e">
            {{ $t('defaultRadiusLabel') }}
          </basic-input-checkbox>
        </div>
      </div>

      <!-- *** BLOCK - CATERING TYPE -->
      <div class="form_block disabled">
        <header class="form_header" @click="toggleSection($event)">
          <h2 class="form_header-title">
            {{ $t('cateringType') }}
          </h2>
          <span
            v-tooltip="tOptions"
            class="form_header-detail"
            @click.stop
          >?</span>
          <span class="form_header-toggle">
            <img src="~/assets/icons/L_arrow.svg">
          </span>
        </header>
        <div class="form_body kitchen">
          <basic-input-search-tips
            v-model="cateringType"
            :data="CATERING_FILTER_SETTINGS.cateringType"
          />
          <div class="kitchen_cuisines">
            <span
              v-for="(kit, idx) in cateringTypes"
              :key="idx + 't_' + kit.key"
              class="cusine_tip"
              @click="removeCateringType(idx)"
            >{{ kit.name || kit.title }}</span>
          </div>
        </div>
      </div>

      <!-- BLOCK - KITCHEN -->
      <div class="form_block">
        <header class="form_header" @click="toggleSection($event)">
          <h2 class="form_header-title">
            {{ $t('cuisineTitle') }}
          </h2>
          <span
            v-tooltip="tOptions"
            class="form_header-detail"
            @click.stop
          >?</span>
          <span class="form_header-toggle">
            <img src="~/assets/icons/L_arrow.svg">
          </span>
        </header>
        <div class="form_body kitchen">
          <basic-input-cuisine-search v-model="kitchen" />
          <div class="kitchen_cuisines">
            <span
              v-for="(kit, idx) in kitchens"
              :key="idx + '_' + kit.id"
              class="cusine_tip"
              @click="removeCuisine(idx)"
            >{{ kit.name }}</span>
          </div>
        </div>
      </div>
      <!-- BLOCK - PRICE CHECK -->
      <div class="form_block">
        <header class="form_header" @click="toggleSection($event)">
          <h2 class="form_header-title">
            {{ $t('checkTitle') }}
          </h2>
          <span
            v-tooltip="tOptions"
            class="form_header-detail"
            @click.stop
          >?</span>
          <span class="form_header-toggle">
            <img src="~/assets/icons/L_arrow.svg">
          </span>
        </header>
        <div class="form_body price">
          <div class="price-input-number">
            <basic-input-number
              v-model.number="$v.average.$model"
              :is-error="$v.average.$error"
              :min="CATERING_FILTER_SETTINGS.avgCheck.min"
              :max="CATERING_FILTER_SETTINGS.avgCheck.max"
            />
            <p class="price-input-label">
              <span class="gilroy">&#8381;</span>
              <span>(€{{ (average * 0.011).toFixed(2) }})</span>
            </p>
          </div>
          <basic-input-range
            v-model.number="average"
            :min="CATERING_FILTER_SETTINGS.avgCheck.min"
            :max="CATERING_FILTER_SETTINGS.avgCheck.max"
          />
          <p class="price-count">
            {{ average }} <span class="gilroy-bold">&#8381;</span>
          </p>
        </div>
      </div>

      <!-- *** BLOCK - RATING -->
      <div class="form_block disabled">
        <header class="form_header" @click="toggleSection($event)">
          <h2 class="form_header-title">
            {{ $t('cateringRating') }}
          </h2>
          <span
            v-tooltip="tOptions"
            class="form_header-detail"
            @click.stop
          >?</span>
          <span class="form_header-toggle">
            <img src="~/assets/icons/L_arrow.svg">
          </span>
        </header>
        <div class="form_body flex flex-row-i flex_warp">
          <div class="mr-1 mt-1">
            <basic-input-checkbox v-model="rates[5]">
              <addition-stars :rate="5" />
            </basic-input-checkbox>

            <basic-input-checkbox v-model="rates[4]" class="mt-1">
              <addition-stars :rate="4" />
            </basic-input-checkbox>

            <basic-input-checkbox v-model="rates[3]" class="mt-1">
              <addition-stars :rate="3" />
            </basic-input-checkbox>
          </div>
          <div class="mt-1">
            <basic-input-checkbox v-model="rates[2]">
              <addition-stars :rate="2" />
            </basic-input-checkbox>

            <basic-input-checkbox v-model="rates[1]" class="mt-1">
              <addition-stars :rate="1" />
            </basic-input-checkbox>

            <basic-input-checkbox v-model="rates[0]" class="mt-1">
              <span class="text-14">{{ $t('norate') }}</span>
            </basic-input-checkbox>
          </div>
        </div>
      </div>
      <!-- *** BLOCK - REVIEWS -->
      <div class="form_block disabled">
        <header class="form_header" @click="toggleSection($event)">
          <h2 class="form_header-title">
            {{ $t('cateringReviews') }}
          </h2>
          <span
            v-tooltip="tOptions"
            class="form_header-detail"
            @click.stop
          >?</span>
          <span class="form_header-toggle">
            <img src="~/assets/icons/L_arrow.svg">
          </span>
        </header>
        <div class="form_body flex flex-row-i flex_warp">
          <div class="mr-2">
            <basic-input-checkbox v-model="reviewsCount[0]" class="mb-1">
              <span class="text-14">1-10</span>
            </basic-input-checkbox>

            <basic-input-checkbox v-model="reviewsCount[1]" class="mb-1">
              <span class="text-14">10-50</span>
            </basic-input-checkbox>
          </div>
          <div>
            <basic-input-checkbox v-model="reviewsCount[2]" class="mb-1">
              <span class="text-14">50-150</span>
            </basic-input-checkbox>

            <basic-input-checkbox v-model="reviewsCount[3]">
              <span class="text-14">150+</span>
            </basic-input-checkbox>
          </div>
        </div>
      </div>
      <!-- *** BLOCK - WORKING HOURS -->
      <div class="form_block disabled">
        <header class="form_header" @click="toggleSection($event)">
          <h2 class="form_header-title">
            {{ $t('cateringHours') }}
          </h2>
          <span
            v-tooltip="tOptions"
            class="form_header-detail"
            @click.stop
          >?</span>
          <span class="form_header-toggle">
            <img src="~/assets/icons/L_arrow.svg">
          </span>
        </header>

        <div class="form_body flex flex-row-i flex_warp">
          <div class="wide">
            <div class="flex wide roboto">
              <b
                class="daytip"
                :class="{ active: days[1] }"
                @click="
                  days[1] = !days[1]
                  $forceUpdate()
                "
              >{{ weekdays[1] }}</b>
              <b
                class="daytip"
                :class="{ active: days[2] }"
                @click="
                  days[2] = !days[2]
                  $forceUpdate()
                "
              >{{ weekdays[2] }}</b>
              <b
                class="daytip"
                :class="{ active: days[3] }"
                @click="
                  days[3] = !days[3]
                  $forceUpdate()
                "
              >{{ weekdays[3] }}</b>
              <b
                class="daytip"
                :class="{ active: days[4] }"
                @click="
                  days[4] = !days[4]
                  $forceUpdate()
                "
              >{{ weekdays[4] }}</b>
              <b
                class="daytip"
                :class="{ active: days[5] }"
                @click="
                  days[5] = !days[5]
                  $forceUpdate()
                "
              >{{ weekdays[5] }}</b>
              <b
                class="daytip"
                :class="{ active: days[6] }"
                @click="
                  days[6] = !days[6]
                  $forceUpdate()
                "
              >{{ weekdays[6] }}</b>
              <b
                class="daytip"
                :class="{ active: days[7] }"
                @click="
                  days[7] = !days[7]
                  $forceUpdate()
                "
              >{{ weekdays[0] }}</b>
            </div>

            <basic-input-checkbox v-model="everyDay" class="mt-1e">
              <span>{{ $t('everyDay') }}</span>
            </basic-input-checkbox>

            <div class="flex selectOccasion res_input time a_c mt-1e">
              <VueTimepicker
                v-model="time1_normal"
                class="workTimePicker text-lg"
                format="HH:mm"
                placeholder="00:00"
                :minute-interval="5"
                close-on-complete
                hide-clear-button
                drop-direction="up"
              />
              <span class="timeSplitter">-</span>
              <VueTimepicker
                v-model="time2_normal"
                class="workTimePicker text-lg res_input time"
                format="HH:mm"
                placeholder="00:00"
                :minute-interval="5"
                close-on-complete
                hide-clear-button
                drop-direction="up"
              />
            </div>

            <basic-input-checkbox v-model="wholeDay" class="mt-1e">
              <span>{{ $t('wholeDay') }}</span>
            </basic-input-checkbox>
          </div>
        </div>
      </div>
      <!-- *** BLOCK - KEY PRODUCTS -->
      <div class="form_block disabled">
        <header class="form_header" @click="toggleSection($event)">
          <h2 class="form_header-title">
            {{ $t('cateringProducts') }}
          </h2>
          <span
            v-tooltip="tOptions"
            class="form_header-detail"
            @click.stop
          >?</span>
          <span class="form_header-toggle">
            <img src="~/assets/icons/L_arrow.svg">
          </span>
        </header>
        <div class="form_body kitchen">
          <basic-input-search-tips
            v-model="keyProduct"
            :data="CATERING_FILTER_SETTINGS.keyProduct"
          />
          <div class="kitchen_cuisines">
            <span
              v-for="(kit, idx) in keyProducts"
              :key="idx + 'k_' + kit.id"
              class="cusine_tip"
              @click="removeKeyProduct(idx)"
            >{{ kit.name || kit.title }}</span>
          </div>
        </div>
      </div>
      <!-- *** BLOCK - ADDITIONAL SERV -->
      <div class="form_block disabled">
        <header class="form_header" @click="toggleSection($event)">
          <h2 class="form_header-title">
            {{ $t('cateringAdditional') }}
          </h2>
          <span
            v-tooltip="tOptions"
            class="form_header-detail"
            @click.stop
          >?</span>
          <span class="form_header-toggle">
            <img src="~/assets/icons/L_arrow.svg">
          </span>
        </header>
        <div class="form_body kitchen">
          <basic-input-search-tips
            v-model="additional"
            :data="CATERING_FILTER_SETTINGS.additional"
          />
          <div class="kitchen_cuisines">
            <span
              v-for="(kit, idx) in additionals"
              :key="idx + 'a_' + kit.id"
              class="cusine_tip"
              @click="removeAdditional(idx)"
            >{{ kit.name || kit.title }}</span>
          </div>
        </div>
      </div>

      <!-- BLOCK - CHECKBOX - TAKEAWAY -->
      <div class="form_block">
        <div class="form_header">
          <basic-input-checkbox v-model="takeaway">
            {{ $t('foodTakeaway') }}
          </basic-input-checkbox>
          <span
            v-tooltip="tOptions"
            class="form_header-detail"
            @click.stop
          >?</span>
        </div>
      </div>

      <!-- BLOCK - CHECKBOX - DELIVARY -->
      <div class="form_block">
        <div class="form_header">
          <basic-input-checkbox v-model="delivery">
            {{ $t('foodDelivery') }}
          </basic-input-checkbox>
          <span
            v-tooltip="tOptions"
            class="form_header-detail"
            @click.stop
          >?</span>
        </div>
      </div>
      <!-- BLOCK - CHECKBOX - NEW CATERING -->
      <div class="form_block">
        <div class="form_header">
          <basic-input-checkbox v-model="newCatering">
            {{ $t('newCatringPoint') }}
          </basic-input-checkbox>
          <span
            v-tooltip="tOptions"
            class="form_header-detail"
            @click.stop
          >?</span>
        </div>
      </div>
      <div class="form_footer">
        <button
          class="mobile"
          :class="
            IS_AUTHORIZATION
              ? 'btn-search eatme-btn-orange'
              : 'btn-search-disabled eatme-btn-disabled'
          "
          @click="searching"
        >
          <span class="btn-search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.536 15.539">
              <path
                data-name="Path 1615"
                d="M14.46,13.8l-3.533-3.533a6.2,6.2,0,1,0-.613.613l3.533,3.533a.438.438,0,0,0,.306.129.425.425,0,0,0,.306-.129A.436.436,0,0,0,14.46,13.8ZM.917,6.2a5.329,5.329,0,1,1,5.329,5.332A5.335,5.335,0,0,1,.917,6.2Z"
                transform="translate(0.45 0.5)"
                stroke-width="1"
              />
            </svg>
          </span>
          {{ $t('btnSearch') }}
        </button>
        <button
          class="desktop"
          :class="
            IS_AUTHORIZATION
              ? 'btn-search eatme-btn-red'
              : 'btn-search-disabled eatme-btn-disabled'
          "
          @click="searching"
        >
          <span class="btn-search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.536 15.539">
              <path
                data-name="Path 1615"
                d="M14.46,13.8l-3.533-3.533a6.2,6.2,0,1,0-.613.613l3.533,3.533a.438.438,0,0,0,.306.129.425.425,0,0,0,.306-.129A.436.436,0,0,0,14.46,13.8ZM.917,6.2a5.329,5.329,0,1,1,5.329,5.332A5.335,5.335,0,0,1,.917,6.2Z"
                transform="translate(0.45 0.5)"
                stroke-width="1"
              />
            </svg>
          </span>
          {{ $t('btnSearch') }}
        </button>

        <button class="btn-reset desktop" @click="resetFilterSettings">
          {{ $t('btnReset') }}
        </button>
        <button
          class="btn-reset eatme-btn-grey mobile"
          @click="resetFilterSettings"
        >
          {{ $t('btnReset') }}
        </button>
      </div>
    </form>
    <ListTop v-if="currentStep === 'view'" :filter="searchString" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueTimepicker from 'vue2-timepicker'
import { required, minValue, maxValue, numeric } from 'vuelidate/lib/validators'

import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
  components: { VueTimepicker },
  props: {
    searchString: {
      type: String
    },
    resetAction: {
      type: Function
    }
  },
  data () {
    return {
      radiusHiddenValue: 0,
      currentStep: 'filter',
      rates: [false, false, false, false, false, false],
      days: [false, false, false, false, false, false, false, false],
      reviewsCount: [false, false, false, false],
      newCateringValue: false,
      everyDay: false,
      wholeDay: false,
      time1: '',
      time2: '',
      // movementType: '',
      isDefault: false,
      carouselSettings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        touchThreshold: 5,
        touchMove: false
      }
    }
  },
  watch: {
    isDefault (value) {
      if (value) {
        let mt = this.movementType || 'walking'
        mt = 'default' + mt.charAt(0).toUpperCase() + mt.slice(1)
        this.$store.commit('SET_GMAP_CIRCLE_OPTIONS', {
          radius: +this.CATERING_FILTER_SETTINGS.radius[mt]
        })
      }
    },
    radius (radius) {
      this.radiusHiddenValue = radius
      if (
        radius === 1 &&
        (this.movementType === '' || this.movementType === 'walking')
      ) {
        this.isDefault = true
      } else if (
        radius === 5 &&
        (this.movementType === 'driving' || this.movementType === 'transit')
      ) {
        this.isDefault = true
      } else {
        this.isDefault = false
      }
    }
  },
  computed: {
    currentActionDesktop () {
      return this.$parent.currentActionDesktop
    },
    currentActionMobile () {
      return this.$parent.currentActionMobile
    },
    time1_normal: {
      get () {
        return this.time1
      },
      set (value) {
        this.time1 = value.replace('mm', '00').replace('HH', '00')
      }
    },
    time2_normal: {
      get () {
        return this.time2
      },
      set (value) {
        this.time2 = value.replace('mm', '00').replace('HH', '00')
      }
    },
    weekdays () {
      const weekday = new Array(7)

      if (this._i18n.locale === 'ru') {
        weekday[0] = 'Вс'
        weekday[1] = 'Пн'
        weekday[2] = 'Вт'
        weekday[3] = 'Ср'
        weekday[4] = 'Чт'
        weekday[5] = 'Пт'
        weekday[6] = 'Сб'
      } else {
        weekday[0] = 'Sun'
        weekday[1] = 'Mon'
        weekday[2] = 'Tue'
        weekday[3] = 'Wed'
        weekday[4] = 'Thu'
        weekday[5] = 'Fri'
        weekday[6] = 'Sat'
      }
      return weekday
    },
    movementType: {
      get () {
        console.log(this.GMAP_ROUTE.movementType)
        return this.GMAP_ROUTE.movementType
      },
      set (value) {
        console.log(value)
        this.$store.commit('SET_GMAP_ROUTE', { movementType: value })
      }
    },

    tOptions () {
      const output = {
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, velit! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, velit!',
        trigger: 'click hover',
        container: 'body'
      }

      output.placement = this.isMobile ? 'left-start' : 'bottom-end'

      return output
    },

    radiusHidden: {
      get () {
        return +this.radiusHiddenValue
      },
      set (km) {
        const radius = km > 49 ? 50 : km
        this.radiusHiddenValue = radius
        if (radius) {
          this.radius = radius
        }
      }
    },

    radius: {
      get () {
        return +this.$store.getters.GMAP_CIRCLE_OPTIONS.radius
      },
      set (km) {
        if (this.IS_AUTHORIZATION) {
          const radius = km > 49 ? 50 : km
          this.$store.commit('SET_GMAP_CIRCLE_OPTIONS', { radius })
        } else {
          this.loginUserTypes()
        }
      }
    },
    /*
      Выпадающие списки с поиском {
    */
    kitchen: {
      get () {
        return ''
      },
      set (kit) {
        const lc = this.CATERING_FILTER_DATA.cuisine
        for (const i in lc) {
          if (lc[i].id === kit.id) {
            return
          }
        }
        this.$store.commit('SET_CATERING_FILTER_DATA', {
          cuisine: [...lc, kit]
        })
      }
    },
    kitchens: {
      get () {
        return this.CATERING_FILTER_DATA.cuisine
      }
    },

    cateringType: {
      get () {
        return ''
      },
      set (kit) {
        const lc = this.CATERING_FILTER_DATA.cateringType
        for (const i in lc) {
          if (lc[i].key === kit.key) {
            return
          }
        }
        this.$store.commit('SET_CATERING_FILTER_DATA', {
          cateringType: [...lc, kit]
        })
      }
    },
    cateringTypes: {
      get () {
        return this.CATERING_FILTER_DATA.cateringType
      }
    },

    keyProduct: {
      get () {
        return ''
      },
      set (kit) {
        const lc = this.CATERING_FILTER_DATA.keyProduct
        for (const i in lc) {
          if (lc[i].id === kit.id) {
            return
          }
        }
        this.$store.commit('SET_CATERING_FILTER_DATA', {
          keyProduct: [...lc, kit]
        })
      }
    },
    keyProducts: {
      get () {
        return this.CATERING_FILTER_DATA.keyProduct
      }
    },

    additional: {
      get () {
        return ''
      },
      set (kit) {
        const lc = this.CATERING_FILTER_DATA.additional
        for (const i in lc) {
          if (lc[i].id === kit.id) {
            return
          }
        }
        this.$store.commit('SET_CATERING_FILTER_DATA', {
          additional: [...lc, kit]
        })
      }
    },
    additionals: {
      get () {
        return this.CATERING_FILTER_DATA.additional
      }
    },

    /*
      }
    */

    average: {
      get () {
        return this.$_.toInteger(this.CATERING_FILTER_DATA.avgCheck)
      },
      set (value) {
        const avarage = this.$_.toInteger(value)
        this.$store.commit('SET_CATERING_FILTER_DATA', { avgCheck: avarage })
      }
    },
    takeaway: {
      get () {
        return this.CATERING_FILTER_DATA.takeaway
      },
      set (value) {
        if (this.IS_AUTHORIZATION) {
          this.$store.commit('SET_CATERING_FILTER_DATA', { takeaway: value })
        } else {
          this.loginUserTypes()
        }
      }
    },
    delivery: {
      get () {
        return this.CATERING_FILTER_DATA.delivery
      },
      set (value) {
        if (this.IS_AUTHORIZATION) {
          this.$store.commit('SET_CATERING_FILTER_DATA', { delivery: value })
        } else {
          this.loginUserTypes()
        }
      }
    },
    newCatering: {
      get () {
        return this.newCateringValue
      },
      set (value) {
        if (this.IS_AUTHORIZATION) {
          this.newCateringValue = value
        } else {
          this.loginUserTypess()
        }
      }
    },
    ...mapGetters([
      'CATERING_FILTER_DATA',
      'IS_AUTHORIZATION',
      'CATERING_FILTER_SETTINGS',
      'GMAP_CIRCLE_OPTIONS',
      'GMAP_ROUTE'
    ])
  },

  mounted () {
    this.radiusHiddenValue = this.radius
    if (this.radius === 1) {
      this.isDefault = true
    }
    console.log(this.GMAP_ROUTE.movementType, '1')
    this.movementType = this.GMAP_ROUTE.movementType || 'walking'
    this.$store.commit('SET_GMAP_ROUTE', { movementType: this.movementType })
  },

  validations: {
    radius: {
      required,
      numeric,
      minValue: minValue(1),
      maxValue: maxValue(50)
    },
    average: {
      required,
      numeric,
      myMinValue (value) {
        if (
          +value < this.$store.getters.CATERING_FILTER_SETTINGS.avgCheck.min
        ) {
          return false
        } else {
          return true
        }
      },
      myMaxValue (value) {
        if (
          +value > this.$store.getters.CATERING_FILTER_SETTINGS.avgCheck.max
        ) {
          return false
        } else {
          return true
        }
      }
    }
  },
  methods: {
    showTopCardPC (topID) {
      this.$parent.showTopCardPC(topID)
    },
    removeCuisine (idx) {
      const nw = this.CATERING_FILTER_DATA.cuisine.slice()
      nw.splice(idx, 1)
      this.$store.commit('SET_CATERING_FILTER_DATA', { cuisine: nw })
    },
    removeCateringType (idx) {
      const nw = this.CATERING_FILTER_DATA.cateringType.slice()
      nw.splice(idx, 1)
      this.$store.commit('SET_CATERING_FILTER_DATA', { cateringType: nw })
    },
    removeKeyProduct (idx) {
      const nw = this.CATERING_FILTER_DATA.keyProduct.slice()
      nw.splice(idx, 1)
      this.$store.commit('SET_CATERING_FILTER_DATA', { keyProduct: nw })
    },
    removeAdditional (idx) {
      const nw = this.CATERING_FILTER_DATA.additional.slice()
      nw.splice(idx, 1)
      this.$store.commit('SET_CATERING_FILTER_DATA', { additional: nw })
    },

    toggleSection (e) {
      if (!this.IS_AUTHORIZATION) {
        this.loginUserTypes()
      } else {
        const currentBlock = e.target.closest('.form_block')
        const isOpen = currentBlock.classList.contains('open')

        if (isOpen) {
          this.closeSection(currentBlock)
        } else {
          this.openSection(currentBlock)
        }
      }
    },
    openSection (currentBody) {
      currentBody.classList.add('open')
    },
    closeSection (currentBody) {
      currentBody.classList.remove('open')
    },
    goToBack () {
      if (this.currentStep === 'filter') {
        this.resetAction()
      } else {
        this.prevStep()
      }
    },
    nextStep () {
      this.currentStep = 'view'
    },
    prevStep () {
      this.currentStep = 'filter'
    },
    resetFilterSettings () {
      if (!this.IS_AUTHORIZATION) {
        this.loginUserTypes()
      } else {
        this.$store.commit('RESET_CATERING_FILTER_DATA')
        this.$store.commit('SET_GMAP_CIRCLE_OPTIONS', { radius: 1 })
        this.resetDefaultFilterRadius()
      }
    },
    setDefaultFilterRadius (type, radius) {
      if (!this.IS_AUTHORIZATION) {
        this.loginUserTypes()
      } else {
        this.movementType = type
        this.$store.commit('SET_GMAP_ROUTE', {
          movementType: this.movementType
        })
        this.$store.commit('SET_GMAP_CIRCLE_OPTIONS', { radius })
      }
    },
    resetDefaultFilterRadius () {
      if (!this.IS_AUTHORIZATION) {
        this.loginUserTypes()
      } else {
        this.isDefault = true
        this.movementType = 'walking'
        this.$store.commit('SET_GMAP_ROUTE', {
          movementType: this.movementType
        })
      }
    },
    searching () {
      if (!this.IS_AUTHORIZATION) {
        this.loginUserTypes()
      } else {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          const vm = this

          this.$store.dispatch('GET_CATERING_LIST', 'filter').then(() => {
            vm.nextStep()

            const radius = vm.radius
            vm.$store.commit('SET_GMAP_CIRCLE_OPTIONS', { radius })
          })
        }
      }
    }
  }
}
</script>

<style>
.timeSplitter {
  margin: 0 3px;
}

.workTimePicker {
  font-size: inherit !important;
  font-family: inherit !important;
}
.workTimePicker .mx-icon-calendar {
  display: none !important;
}
.workTimePicker input {
  border: 1px solid #e2e2e2 !important;
  background: white;
  border-radius: 5px !important;
  font-size: inherit !important;
  font-family: inherit !important;
  height: 4rem !important;
}

.filter_form .checkbox-icon {
  width: 24px;
  flex: 0 0 24px;
  height: 24px;
}
.filter_form .checkbox-icon svg {
  width: 70%;
  height: 70%;
}
.filter_form .checkbox-txt {
  margin-left: 4px;
}
</style>
<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';

.filter {
  /deep/ .display-time {
    height: 42px !important;
    border-radius: 5px !important;
    border-color: $c-line !important;
    font-family: $ff-gilroy !important;
    font-size: 16px !important;
  }

  /deep/ .time-picker {
    height: 40px !important;
    border-radius: 5px !important;
    width: 100% !important;
  }
  /deep/ .time-picker input {
    width: 100% !important;
    padding: 1rem !important;
  }
  /deep/ .time-picker * {
    font-size: 14px !important;
  }
}

.daytip {
  cursor: pointer;
  width: 3rem;
  border-radius: 5px;
  text-align: center;
  margin-left: 1px;
  padding: 6px 2px;
  border: 1px solid $c-green;
  color: $c-green;
}
.daytip.active {
  color: white;
  border-color: $orange;
  background: $orange;
}

.checkbox-txt {
  font-size: 14px;
}

.filter {
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 991px) {
    position: initial;
    overflow: visible;
  }

  & /deep/ {
    .top_list {
      justify-self: center;
      margin-top: 31px;
      border: none;
      border-top: 1px solid #ccc;
      @media screen and (max-width: 991px) {
        margin-top: 20px;
        border: none;
      }
    }

    .checkbox-txt {
      font-size: 14px;
    }
  }

  &_form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 100%;
    height: 100%;
    margin-bottom: 3rem;

    @media screen and (min-width: 992px) {
      margin: 0;
      height: initial;
    }
  }

  &-title {
    font-family: $ff-roboto;
    font-size: 24px;
    margin: 3rem 0;
    text-align: center;
    color: $c-green;

    @media screen and (min-width: 992px) {
      display: none;
    }
  }

  &-back {
    z-index: 3;
    position: absolute;
    margin: 2px 0 0 10px;
    font-family: $ff-gilroy;
    font-size: 12px;
    color: #c4c4c4;

    @media screen and (min-width: 992px) {
      display: none;
      &.show {
        display: block;
      }
    }

    @media screen and (max-width: 991px) {
      top: 10px;
      left: 10px;
      margin: 0;
    }

    &-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 10px;
      overflow: hidden;

      svg {
        width: 100%;
        height: 100%;
        fill: #c4c4c4;
        transform: scale(6, 5);
      }
    }
  }
}

.form {
  & + * {
    @media screen and (min-width: 992px) {
      margin-top: 20px;
    }
  }
  &_block {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 5px #11100029;
    border: 1px solid #e2e2e2;
    border-radius: 7px;
    background: #ffffff 0% 0% no-repeat padding-box;

    @media screen and (max-width: 991px) {
    }
    @media screen and (min-width: 992px) {
      margin-top: 0;
      border: none;
      border-bottom: {
        width: 1px;
        style: solid;
        color: $c-line;
      }
      border-radius: 0;
      box-shadow: none;
    }

    &:not(:first-child) {
      margin-top: 16px;

      @media screen and (min-width: 992px) {
        margin-top: 0;
      }
    }

    &.open {
      background: #f5f5f5;
    }
    &.open .form_body {
      display: flex;
      flex-direction: column;
    }
    &.open .form_header-toggle {
      transform-origin: center;
      transform: rotate(90deg);
    }
    &.open .form_header-title {
      white-space: normal;
    }
    &.open .form_header-title::after {
      display: none;
    }
    &.open .form_body.radius {
      display: flex;
    }
  }

  &_header {
    display: grid;
    grid-template-columns: 1fr 25px 25px;
    align-items: center;
    grid-column-gap: 5px;
    padding: 9.5px 15px;
    cursor: pointer;

    @media screen and (max-width: 1080px) {
      padding: 5px;
    }

    &-title {
      position: relative;
      font-family: $ff-gilroy;
      font-size: 14px;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;

      @media screen and (max-width: 1080px) {
        padding-left: 10px;
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        height: 100%;
        width: 20px;
        @include linear-gradient(
          -90deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 100%
        );
      }
    }

    &-detail {
      position: relative;
      justify-self: end;
      display: flex;
      align-items: center;
      justify-content: center;
      border: {
        width: 1px;
        style: solid;
        color: #aaa;
        radius: 50%;
      }
      flex: 0 0 15px;
      width: 15px;
      height: 15px;
      padding-right: 1px;
      color: #aaa;
      font-family: $ff-gilroy;
      font-size: 10px;
      visibility: visible;

      /*&::after {
          content: "";
          display: block;
          position: absolute;
          height: 36px;
          border-left: 1px solid $c-line;
          left: 24px;
        }*/

      @media screen and (max-width: 991px) {
        width: 20px;
        height: 20px;
        font-size: 12px;
        padding-right: 0px;
        /*&::after {
            left: 26px;
          }*/
      }
    }

    &-toggle {
      justify-self: end;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 12px;
      height: 12px;
      flex: 0 0 12px;

      position: relative;

      img {
        flex: 0 0 12px;
        width: 100%;
        height: 100%;
        fill: $c-primary;
      }
    }

    & /deep/ .label-txt {
      @media screen and (min-width: 992px) {
        font-size: 14px;
      }
    }
  }

  &_body {
    display: none;
    padding: 0 15px 10px;
  }

  &_footer {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 20px;
    align-items: center;
    margin-top: 20px;

    @media screen and (max-width: 991px) {
      display: flex;
      align-items: center;
      margin-top: 3rem;
      justify-content: space-evenly;
      grid-column-gap: 0;
      .btn-reset {
        margin-left: 20px;
      }
    }

    @media screen and (min-width: 992px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, auto);
      justify-items: center;
      margin-top: 10px;
    }

    .btn-search {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      @media screen and (max-width: 991px) {
        margin-top: 0;
      }

      &-disabled {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1.2rem;
        @media screen and (max-width: 991px) {
          margin-top: 0;
          white-space: nowrap;
        }
      }

      &-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        flex: 0 0 15px;
        width: 15px;
        height: 15px;

        @media screen and (min-width: 992px) {
          display: none;
        }

        svg {
          width: 100%;
          height: 100%;
          fill: $c-light;
        }
      }
    }

    .btn-reset {
      font-size: 14px;
      padding: 0.5em;
      margin-top: 15px;
      text-decoration: underline;
      cursor: pointer;

      @media screen and (max-width: 991px) {
        margin-top: 0;
        padding-left: 1rem;
        padding-right: 1rem;
        white-space: nowrap;
        text-decoration: none;
      }
    }
  }
}

.form_block.open .form_header-detail:after {
  display: none;
}

.radius {
  flex-direction: column;

  &_box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    & /deep/ .number {
      display: none;
      font-size: 14px;
      width: 4.75em;
      @media screen and (min-width: 992px) {
        display: grid;
      }
    }

    & .radius-label {
      display: none;
      font-size: 14px;
      align-items: center;
      margin-bottom: 0;

      .ml-1 {
        margin-left: 1rem;
      }

      @media screen and (min-width: 992px) {
        display: flex;
        margin-bottom: 0;
        margin-right: 1rem;
      }

      @media screen and (max-width: 1512px) {
        margin-bottom: 1rem;
      }
    }
  }

  &_range {
    margin-bottom: 1rem;

    @media screen and (min-width: 992px) {
      display: none;
    }

    &-label {
      font-family: $ff-roboto;
      font-size: 14px;
      font-weight: bold;
      color: $c-green;
    }
  }

  &-label {
    font-family: $ff-gilroy;
    font-size: 16px;
  }

  &_movements {
    display: flex;
    justify-items: center;
    @media screen and (max-width: 991px) {
      display: flex;
      width: 90%;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;
      margin: 0.5rem auto 1rem;
    }
  }

  &-movement {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 10px #1670630d;
    border: 1px solid #e2e2e2;
    border-radius: 7px;
    width: 6rem;
    height: 6rem;
    background-color: $light;
    cursor: pointer;

    @media screen and (min-width: 992px) {
      border-radius: 4px;
      width: 35px;
      height: 35px;
    }

    &.active {
      border-color: $c-green;
    }

    &:not(:first-child) {
      margin-left: 5px;
    }

    img {
      width: 32px;
      height: 32px;

      @media screen and (min-width: 992px) {
        width: 18px;
        height: 18px;
      }
    }
  }

  &-count {
    font-family: $ff-gilroy;
    font-size: 16px;
    font-weight: bold;
    color: $c-green;
  }
}

.kitchen {
  justify-items: center;
  width: 100%;

  &_cuisines {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    min-width: 100%;
    max-width: 100%;
    overflow: hidden;
    margin-top: 15px;

    @media screen and (max-width: 991px) {
      /deep/ .cuisineSearch-input {
        font-size: 14px;
      }
    }

    .cusine_tip {
      position: relative;
      border-radius: 8px;
      background: $light;
      padding: 6px 14px 4px 6px;
      font-size: 12px;
      margin-right: 0.5em;
      margin-bottom: 0.5em;
      cursor: pointer;
      border: 1px solid $green;
      text-transform: capitalize;

      &::after {
        content: '✕';
        font-size: 10px;
        font-weight: bold;
        color: $green;
        position: absolute;
        top: 1px;
        right: 3px;
      }
    }
  }
}

.price {
  justify-items: center;
  flex-direction: column;

  & > * {
    margin-top: 10px;
  }

  &-input-number {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .number {
      width: 10em;
      margin-right: 1rem;
      @media screen and (max-width: 991px) {
        position: relative;
        display: block;
        width: 38rem;
        justify-content: space-between;
      }
    }

    @media screen and (max-width: 991px) {
      justify-content: space-between;
      /deep/ .number-input {
        font-size: 14px;
        padding: 8px 10px;
      }
    }
  }

  &-input-label {
    display: block;
    font-family: $ff-gilroy;
    font-size: 14px;
    @media screen and (max-width: 991px) {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }

  &-count {
    font-family: $ff-roboto;
    font-size: 14px;
    color: $c-green;
  }
}
</style>
