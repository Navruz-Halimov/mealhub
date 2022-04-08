<i18n>
{
  "en": {
    "titleMobile": "My orders",

    "title": "Active",
    "titleHistory": "Completed",
    "titleEnding": "orders",

    "popupErrorMessage": "Fill the full field",
    "emptycart0": "У Вас пока нет заказов",
    "emptycart1": "To place an order, go",
    "emptycart2": "to map",
    "emptycart3": ", select a suitable food outlet and place an order there. For all questions, write to",
    "emptycart4": "Customer Support.",

    "mobileMenuLabel1": "Active",
    "mobileMenuLabel2": "Completed",

    "serviceSelectPlaceholder": "All services",

    "goeatType": "Go&Eat",
    "deliveryType": "Delivery",
    "pickupType": "Takeaway",
    "preorderType": "Pre-order",
    "reservetableType": "Booking",

    "filtersTitle": "Filter",

    "emptycart": "Select the place you like on the map and place an order",
    "popupSuccessMessage": "Data is updated"
  },
  "ru": {
    "titleMobile": "Мои заказы",

    "title": "Активные",
    "titleHistory": "Завершенные",
    "titleEnding": "заказы",

    "popupErrorMessage": "Заполните все поля",
    "emptycart0": "У Вас пока нет заказов",
    "emptycart1": "Для того, чтобы сделать заказ, перейдите",
    "emptycart2": "на карту",
    "emptycart3": ", выберите подходящую точку питания и сделайте там заказ. По всем вопросам, пишите в",
    "emptycart4": "Службу поддержки.",

    "mobileMenuLabel1": "Активные",
    "mobileMenuLabel2": "Завершенные",

    "serviceSelectPlaceholder": "Все службы",

    "goeatType": "Go&Eat",
    "deliveryType": "Доставка",
    "pickupType": "Еда на вынос",
    "preorderType": "Предзаказ",
    "reservetableType": "Бронь",

    "filtersTitle": "Фильтр",

    "emptycart": "Выберите на карте понравившееся заведения и сделайте заказ",
    "popupSuccessMessage": "Успешно отменено"
  }
}
</i18n>

<template>
  <div class="orders_container">
    <!-- SECTION FOR MOBILE -->
    <section class="orders mobile">
      <div class="orders-back">
        <addition-back />
      </div>
      <header class="orders_header mt-05">
        <h1 class="orders-title text-xl">
          {{ $t('titleMobile') }}
        </h1>
      </header>

      <div class="flex wide j_c mt-3">
        <div class="flex w-95 mobile_nav">
          <button class="eatme-btn-grey roboto half" @click="$router.push(localePath('/orders'))">
            {{ $t('mobileMenuLabel1') }}
          </button>
          <button class="eatme-btn-orange roboto half">
            {{ $t('mobileMenuLabel2') }}
          </button>
        </div>
      </div>

      <template v-if="HISTORY_ORDERS && HISTORY_ORDERS.length">
        <div class="wide mt-2 flex j_c">
          <div class="w-95 flex a_e j_b">
            <div class="w-5">
              <!--
                TYPE FILTERS
              -->
              <div>
                <basic-input-select
                  v-model="filterService"
                  class="service-select wide text-lg"
                  :placeholder="$t('serviceSelectPlaceholder')"
                  :searchable="false"
                  :clearable="false"
                  :options="servicesOptions"
                />
              </div>
            </div>
            <div class="ml-1 mr-1" />
            <div class="w-5">
              <!--
                SEARCH FIELD
              -->
              <basic-input-search v-model="searchQuery" :orange="true" class="service-search" />
            </div>
          </div>
        </div>
        <div class="flex wide j_c mb-2 mt-2">
          <!--
              DATE FILTERS
            -->
          <div class="flex a_c w-95">
            <div class="flex a_c wide">
              <DatePicker
                v-model="filterServiceDate1"
                class="service-calendar service-calendar-from"
                type="date"
                format="DD.MM.YYYY"
                value-type="DD.MM.YYYY"

                :editable="false"
                :clearable="false"
                hide-clear-button
              />
              <span class="ml-1 mr-1">-</span>
              <DatePicker
                v-model="filterServiceDate2"
                class="service-calendar service-calendar-to"
                type="date"
                format="DD.MM.YYYY"
                value-type="DD.MM.YYYY"

                :editable="false"
                :clearable="false"
                hide-clear-button
              />
            </div>
          </div>
        </div>

        <div class="orders_list mt-1e">
          <div v-if="list && list.length" class="orders_main_list">
            <order-page-item
              v-for="(item, i) in sortedTable"
              :key="i"
              :inhistory="true"
              :item="item"
              @repeatError="toggleErrorRepeatPopup()"
            />
          </div>
        </div>
      </template>
      <div v-else class="orders_empty h-8">
        <div>
          <p class="emptycart_text mt-2 text-left">
            {{ $t('emptycart0') }}<br>
            {{ $t('emptycart1') }}
            <router-link class="green underline" :to="localePath('index')">
              {{ $t('emptycart2') }}
            </router-link>
            {{ $t('emptycart3') }}
            <span class="green cursor-pointer underline" @click="$store.commit('SET_SUPPORT_POPUP', true)">
              {{ $t('emptycart4') }}
            </span>
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION FOR DESKTOP -->
    <section class="orders desktop overflow-auto flex col">
      <header class="orders_header">
        <h1 class="orders-title mt-1e">
          <span class="text-ltgray cursor-pointer underline" @click="$router.push(localePath('/orders'))">
            {{ $t('title') }} {{ $t('titleEnding') }}
          </span>
          /
          {{ $t('titleHistory') }} {{ $t('titleEnding') }}
        </h1>
      </header>

      <template v-if="HISTORY_ORDERS && HISTORY_ORDERS.length">
        <div class="display-block">
          <div class="service-select-container">
            <div class="w-25">
              <basic-input-select
                v-model="filterService"
                :placeholder="$t('serviceSelectPlaceholder')"
                :searchable="false"
                :clearable="false"
                :options="servicesOptions"
                class="service-select wide text-lg"
              />
            </div>

            <!--
              DATE FILTERS
            -->
            <div class="flex a_c w-5 ml-2">
              <div class="flex a_c desktop-date-select">
                <DatePicker
                  v-model="filterServiceDate1"
                  class="service-calendar service-calendar-from"
                  type="date"
                  format="DD.MM.YYYY"
                  value-type="DD.MM.YYYY"

                  :editable="false"
                  :clearable="false"
                  hide-clear-button
                />
                <span class="desktop ml-1 mr-1">-</span>
                <DatePicker
                  v-model="filterServiceDate2"
                  class="service-calendar service-calendar-to"
                  type="date"
                  format="DD.MM.YYYY"
                  value-type="DD.MM.YYYY"

                  :editable="false"
                  :clearable="false"
                  hide-clear-button
                />
              </div>
            </div>

            <!--
              SEARCH FILTER
            -->
            <div class="w-4 ml-1">
              <basic-input-search v-model="searchQuery" :orange="true" class="service-search wide" />
            </div>
          </div>
        </div>

        <order-page-item :inhistory="true" :itemscount="list.length" :item="{ id: 'tableheader' }" />
        <div v-if="list && list.length" class="orders_main_list_container">
          <order-page-item
            v-for="(item, i) in sortedTable"
            :key="i"
            :inhistory="true"
            :item="item"
            @repeatError="toggleErrorRepeatPopup"
          />
        </div>
      </template>
      <div v-else class="orders_empty h-8 a_b">
        <div>
          <p class="emptycart_text">
            {{ $t('emptycart0') }}<br>
            {{ $t('emptycart1') }}
            <router-link class="green underline" :to="localePath('index')">
              {{ $t('emptycart2') }}
            </router-link>
            {{ $t('emptycart3') }}
            <span class="green cursor-pointer underline" @click="$store.commit('SET_SUPPORT_POPUP', true)">
              {{ $t('emptycart4') }}
            </span>
          </p>
        </div>
      </div>
    </section>
    <div v-if="errorPopupIsOpen" class="popup">
      <popup-error @close-popup="toggleErrorPopup">
        {{ $t('popupErrorMessage') }}
      </popup-error>
    </div>
  </div>
</template>

<script>

import DatePicker from 'vue2-datepicker'
import { mapGetters } from 'vuex'

import 'vue2-datepicker/index.css'

export default {
  components: { DatePicker },
  layout: 'orderssection',
  middleware: 'auth-home',
  data () {
    return {

      sortAscBuff: null,
      sortDescBuff: null,

      searchQuery: null,
      filterService: null,
      filterServiceDate1: null,
      filterServiceDate2: null,
      servicesOptions: [
        {
          value: null,
          label: this.$t('serviceSelectPlaceholder')
        },
        {
          value: 'go_and_eat',
          label: this.$t('goeatType')
        },
        {
          value: 'delivery',
          label: this.$t('deliveryType')
        },
        {
          value: 'pickup',
          label: this.$t('pickupType')
        },
        {
          value: 'pre_order',
          label: this.$t('preorderType')
        },
        {
          value: 'reserve_table',
          label: this.$t('reservetableType')
        }
      ],
      carouselIsOpen: false,
      errorPopupIsOpen: false,
      errorRepeatPopupIsOpen: true,
      errorRepeatPopupText: 'error',
      currentActionDesktop: 'search',
      currentActionMobile: ''
    }
  },
  computed: {

    sortAsc: {
      get () {
        return this.sortAscBuff
      },
      set (s) {
        this.sortAscBuff = s || null
      }
    },
    sortDesc: {
      get () {
        return this.sortDescBuff
      },
      set (s) {
        this.sortDescBuff = s || null
      }
    },
    servicesOptionsDates () {
      const arr = []

      for (const i in this.HISTORY_ORDERS) {
        const date = this.orderDate(this.HISTORY_ORDERS[i])
        const dt = date.slice(0, 6) + '20' + date.slice(6)
        if (!arr.includes(dt)) {
          arr.push(dt)
        }
      }

      arr.sort(function (a, b) {
        const day = +a.slice(0, 2)
        const month = +a.slice(3, 5)
        const year = +a.slice(6, 10)

        const day1 = +b.slice(0, 2)
        const month1 = +b.slice(3, 5)
        const year1 = +b.slice(6, 10)

        if (year > year1) {
          return 1
        } else if (year === year1) {
          if (month > month1) {
            return 1
          } else if (month === month1) {
            if (day > day1) {
              return 1
            } else if (day === day1) {
              return 0
            }
          }
        }

        return -1
      })

      arr.reverse()

      return arr
    },
    servicesOptionsDatesEnd () {
      const arr = []

      let buff = this.HISTORY_ORDERS

      if (this.filterServiceDate1) {
        buff = buff.filter(
          (item) => {
            let aa = this.orderDate(item)
            aa = aa.slice(0, 6) + '20' + aa.slice(6)

            return this.sortDateF(aa, this.filterServiceDate1)
          }
        )
      }

      for (const i in buff) {
        const date = this.orderDate(buff[i])
        const dt = date.slice(0, 6) + '20' + date.slice(6)
        if (!arr.includes(dt)) {
          arr.push(dt)
        }
      }

      arr.sort(function (a, b) {
        const day = +a.slice(0, 2)
        const month = +a.slice(3, 5)
        const year = +a.slice(6, 10)

        const day1 = +b.slice(0, 2)
        const month1 = +b.slice(3, 5)
        const year1 = +b.slice(6, 10)

        if (year > year1) {
          return 1
        } else if (year === year1) {
          if (month > month1) {
            return 1
          } else if (month === month1) {
            if (day > day1) {
              return 1
            } else if (day === day1) {
              return 0
            }
          }
        }

        return -1
      })

      arr.reverse()

      return arr
    },
    list () {
      let buff = this.HISTORY_ORDERS

      if (this.searchQuery) {
        const itemsearchstring = (item) => {
          let subquery
          if (item.id) {
            subquery = `Ресторан "${item.catering}" Restourant "${item.catering}" Ресторан ${item.catering} Restourant ${item.catering} №000${item.id} ${item.order_type} ${item.price} ${item.person_quantity} ${item.items_count}`
            if (item.catering_address) {
              subquery += `${item.catering_address.street} ${item.catering_address.building} ${item.catering_address.city}`
            }
          }
          subquery = subquery.toLowerCase()
          return subquery || ''
        }
        buff = buff.filter(item => ~((itemsearchstring(item)).indexOf((this.searchQuery + '').toLowerCase())))
      }

      if (this.filterService && this.filterService.value) {
        buff = buff.filter(item => item.order_type === this.filterService.value)
      }

      if (this.filterServiceDate1) {
        buff = buff.filter(
          (item) => {
            let aa = this.orderDate(item)
            aa = aa.slice(0, 6) + '20' + aa.slice(6)

            return this.sortDateF(aa, this.filterServiceDate1)
          }
        )
      }
      if (this.filterServiceDate2) {
        buff = buff.filter(
          (item) => {
            let aa = this.orderDate(item)
            aa = aa.slice(0, 6) + '20' + aa.slice(6)

            return this.sortDateF(this.filterServiceDate2, aa)
          }
        )
      }
      return buff
    },
    sortedTable () {
      const vm = this
      const buff = this.list.slice()
      const sorters = [this.sortAsc, this.sortDesc]

      if (~sorters.indexOf('id')) {
        buff.sort(function (a, b) {
          return a.id - b.id
        })
      }
      if (~sorters.indexOf('order_type')) {
        buff.sort(function (a, b) {
          return ('' + a.order_type).localeCompare(b.order_type)
        })
      }
      if (~sorters.indexOf('catering')) {
        buff.sort(function (a, b) {
          return ('' + a.catering).localeCompare(b.catering)
        })
      }
      if (~sorters.indexOf('orderTimingState')) {
        buff.sort(function (a, b) {
          return (vm.orderTimingState(a)).localeCompare(vm.orderTimingState(b))
        })
      }
      if (~sorters.indexOf('orderDate')) {
        buff.sort(function (a, b) {
          let at = a.order_date || a.first_dish_ready_at || a.order_created
          let bt = b.order_date || b.first_dish_ready_at || b.order_created
          if (at) {
            at = vm.newDate(at)
          } else {
            return 1
          }
          if (bt) {
            bt = vm.newDate(bt)
          } else {
            return -1
          }

          return at - bt
        })
      }

      if (this.sortDesc) {
        buff.reverse()
      }

      return buff
    },
    ...mapGetters(['PERSONAL_DATA', 'HISTORY_ORDERS', 'CATERING_LIST', 'IS_GOEATPOPUP'])
  },
  methods: {
    sortDateF (a, b) {
      const day = +a.slice(0, 2)
      const month = +a.slice(3, 5)
      const year = +a.slice(6, 10)

      const day1 = +b.slice(0, 2)
      const month1 = +b.slice(3, 5)
      const year1 = +b.slice(6, 10)

      if (year > year1) {
        return true
      } else if (year === year1) {
        if (month > month1) {
          return true
        } else if (month === month1) {
          if (day >= day1) {
            return true
          }
        }
      }

      return false
    },
    toggleErrorPopup () {
      this.errorPopupIsOpen = !this.errorPopupIsOpen
    },
    toggleErrorRepeatPopup (text) {
      console.log(text)
      if (text) {
        this.errorRepeatPopupIsOpen = true
        this.errorRepeatPopupText = text
      } else {
        this.errorRepeatPopupIsOpen = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';

  .service-select-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }

  .orders_header {
    @media screen and (min-width: 992px) {
      display: block;
      margin: 0 auto 2rem;
    }
  }

  .popup-repeat-error {

    .popupError {
      max-height: 480px;
    }

    &__title {
      font: normal normal bold 22px/29px Roboto Slab;
    }

    &__text {
      margin-top: 14px;
      font: normal normal 300 22px/26px Gilroy;
      max-width: 560px;
    }

    &__controls {
      margin-top: 76px;
    }

    &__button {
      padding: 6px 39px;
      font: normal normal 300 15px/18px Gilroy;
      box-shadow: 0px 3px 6px #00000026;
    }
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
  }

  .half {
    width: 50% !important;
  }

  .main_menu {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
    flex: 1 0 100px !important;
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

  .orders_main_list_container {
    overflow: auto;

    @media screen and (min-width: 992px) {
      min-width: 650px;
      &::-webkit-scrollbar {
        width: 0;
      }
    }
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
    .reason-buttons {
      display: block;
      text-align: center;

      button {
        width: 90%;
        margin-bottom: 2rem;
      }
    }
  }

  .mobile_nav {

    .eatme-btn-orange {
      border-radius: 6px;
      font-family: $ff-roboto;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .eatme-btn-grey {
      border-radius: 6px;
      font-family: $ff-roboto;
      box-shadow: 0px 2px 5px #11100029;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      background: white;
      color: #c9c9c9 !important;
    }
  }

  .emptycart_image::after {
    position: absolute;
    top: 1rem;
    right: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.25rem;
    font-weight: bold;
    content: '+';
    color: $c-green;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    background: white;
    box-shadow: 0px 2px 5px #11100029;
  }

  .emptycart_image {
    position: relative;
    border: 2px solid $c-line;
    border-radius: 4px;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-bottom: 1rem;

    img {
      width: 90%
    }
  }

  .emptycart_text {
    font-size: 16px;
    padding: 0 10%;
  }

  .orders {
    &-back {
      position: absolute;
      top: -5px;
      left: -10px;
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
  }

</style>

<style>

  .history_page .menu-submenu-item .item-progress{
    display:none;
  }

  /*.orders .mobile-date-select {
    border: 1px solid #E2E2E2 !important;
  }
  .orders .mobile-date-select .service-calendar input{
    border: none !important;
    background: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }
  .orders .mobile-date-select .service-calendar-from{
    border-right: 1px solid #E2E2E2;
  }
*/
  .orders .service-calendar input{
    box-shadow: none !important;
    border: 1px solid #E2E2E2 !important;
    background-color: white;
    border-radius: 5px !important;
  }
  .orders .service-calendar{
    height: 3.5rem !important;
    display: block;
    width: 12rem;
  }
  .orders .service-calendar .vs__selected{
    position: relative !important;
  }
  .orders .service-calendar .vs__dropdown-toggle{
    padding:0;
    height: 100%;
  }
  .orders .service-calendar .vs__actions{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    position: absolute;
    top: 0;
    right: 0;
    background: lightgrey;
    height: 100%;
    width: 3.5rem;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .orders .service-calendar .vs__actions::before{
    background-image: url('/icons/calendar.svg');
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 991px) {
    .mobile-date-select {
      box-shadow: 0px 2px 5px #11100029;
      border-radius: 6px;
    }
    .mobile-date-select .vs__dropdown-menu {
      left:auto;
      right:0;
    }

  }
  @media screen and (max-width: 1280px) {
    /*
    .orders .service-calendar {
      width: 3.5rem;
    }
    .orders .service-calendar .vs__selected{
      display: none;
    }
  .orders .desktop-date-select .service-calendar input{
    border: none !important;
    background: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }
  .orders .desktop-date-select .service-calendar-from{
    border-right: 1px solid #E2E2E2;
  }
    .orders .service-calendar-from .vs__actions{
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border: 1px solid #e2e2e2;
      border-right:none;
      background: white;
    }
    .orders .service-calendar-to .vs__actions{
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 1px solid #e2e2e2;
      background: white;
    }
    .orders .mobile-date-select {
      border: 1px solid #E2E2E2 !important;
    }
    .orders .mobile-date-select .service-calendar input{
      border: none !important;
      background: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }
    .orders .mobile-date-select .service-calendar-from{
      border-right: 1px solid #E2E2E2;
    }

    .orders .desktop-date-select {
      border: 1px solid #E2E2E2 !important;
      border-radius: 6px;
    }
    .service-calendar *{
      cursor: pointer;
    }
    */
    .service-calendar {
      width: 50% !important;
    }
    .hide1280 {
      display:none;
    }
  }

  .orders_container .service-search .search-input {
    padding-right: 70px;
  }
  .orders_container .service-search .search-clear{
    display: flex;
  }
  .orders_container .service-search{
    height: 3.5rem !important;
    display: block;
  }
  .orders_container .vs__dropdown-option {
    font-size: 24px;
  }
  .service-select .vs__dropdown-toggle {
    height: 3.5rem !important;
    border: 1px solid #E2E2E2;
    border-radius: 6px !important;
    box-shadow: 0px 2px 5px #11100029;
  }
  .service-select .vs__dropdown-menu .vs__dropdown-option {
    font-size: 14px !important;
  }

  @media screen and (max-width: 991px) {
    .orders .service-calendar input {
      height: 3.5rem !important;
      border: 1px solid #E2E2E2 !important;
      border-radius: 6px !important;
      box-shadow: 0px 2px 5px #11100029 !important;
    }
  }
  @media screen and (min-width: 992px) {
    .service-select .vs__dropdown-toggle {
      box-shadow: none;
    }
    .service-search .search-input{
      box-shadow: none !important;
    }
  }

  .service-select .vs__dropdown-menu > .vs__dropdown-option--highlight {
    background: #f3bd4432;
  }
  .service-select .vs__dropdown-menu > .vs__dropdown-option--selected{
    background: #f3bd44;
  }
</style>
