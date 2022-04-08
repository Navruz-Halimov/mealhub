<i18n>
{
  "en": {
    "january" : "January",
    "february" : "February",
    "march" : "March",
    "april" : "April",
    "may" : "May",
    "june" : "June",
    "july" : "July",
    "august" : "August",
    "september" : "September",
    "october" : "October",
    "november" : "November",
    "december" : "December"
  },
  "ru": {
    "january" : "Январь",
    "february" : "Февраль",
    "march" : "Март",
    "april" : "Апрель",
    "may" : "Май",
    "june" : "Июнь",
    "july" : "Июль",
    "august" : "Август",
    "september" : "Сентябрь",
    "october" : "Октябрь",
    "november" : "Ноябрь",
    "december" : "Декабрь"
  }
}
</i18n>

<template>
  <div class="date__container">
    <div
      :key="initialTimeKey"
      class="date__input"
      tabindex="-1"
      @focusin="showDatePicker"
      @focusout="closeDatePicker"
    >
      {{ date.day }}
      <div class="date__spacer" />
      {{ monthList[date.month] }}
    </div>

    <addition-date-picker
      v-if="isDatePicker"
      class="date__picker"
      :picked-date="date"
      :day-list="getDayList()"
      :month-list="monthList"
      @picked-date="updatePickedDate"
    />
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Object,
      default: () => ({})
    },
    initialDate: {
      type: [Date, null],
      default: null
    },
    isDisabled: {
      type: Boolean
    }
  },
  data () {
    return {
      isDatePicker: false
    }
  },
  computed: {
    monthList () {
      return [
        this.$t('january'),
        this.$t('february'),
        this.$t('march'),
        this.$t('april'),
        this.$t('may'),
        this.$t('june'),
        this.$t('july'),
        this.$t('august'),
        this.$t('september'),
        this.$t('october'),
        this.$t('november'),
        this.$t('december')
      ]
    },
    initialTimeKey () {
      return this.initialDate ? this.initialDate.toString() : 'key'
    }
  },
  watch: {
    initialDate () {
      this.getCurrentDate()
      this.getDayList()
    }
  },
  created () {
    this.getCurrentDate()
    this.getDayList()
  },
  methods: {
    updatePickedDate (date) {
      this.$emit('picked-date', date)
    },
    showDatePicker () {
      if (!this.isDisabled) {
        this.isDatePicker = true
      }
    },
    closeDatePicker () {
      this.isDatePicker = false
    },
    getCurrentDate () {
      const date = this.initialDate || new Date()
      if (date.getDate().toString().length === 1) {
        this.date.day = '0' + date.getDate()
      } else {
        this.date.day = date.getDate()
      }
      let monthNumber
      if ((date.getMonth() + 1).toString().length === 1) {
        monthNumber = '0' + (date.getMonth() + 1)
      } else {
        monthNumber = date.getMonth() + 1
      }
      this.date.month = +monthNumber - 1

      this.date.year = date.getFullYear()

      const newDate = `${this.date.year}-${monthNumber}-${this.date.day}`
      this.$emit('picked-date', newDate)
    },
    getDayList () {
      const dayMonth = []

      let dayMonthNumber
      if (this.monthList[this.date.month] === this.monthList[0]) {
        dayMonthNumber = 32
      } else if (this.monthList[this.date.month] === this.monthList[1]) {
        const year = (new Date()).getFullYear()
        if (year % 4 !== 0 && (year % 100 === 0 || year % 400 !== 0)) {
          dayMonthNumber = 29
        } else {
          dayMonthNumber = 30
        }
      } else if (this.monthList[this.date.month] === this.monthList[2]) {
        dayMonthNumber = 32
      } else if (this.monthList[this.date.month] === this.monthList[3]) {
        dayMonthNumber = 31
      } else if (this.monthList[this.date.month] === this.monthList[4]) {
        dayMonthNumber = 32
      } else if (this.monthList[this.date.month] === this.monthList[5]) {
        dayMonthNumber = 31
      } else if (this.monthList[this.date.month] === this.monthList[6]) {
        dayMonthNumber = 32
      } else if (this.monthList[this.date.month] === this.monthList[7]) {
        dayMonthNumber = 32
      } else if (this.monthList[this.date.month] === this.monthList[8]) {
        dayMonthNumber = 31
      } else if (this.monthList[this.date.month] === this.monthList[9]) {
        dayMonthNumber = 32
      } else if (this.monthList[this.date.month] === this.monthList[10]) {
        dayMonthNumber = 31
      } else if (this.monthList[this.date.month] === this.monthList[11]) {
        dayMonthNumber = 32
      } else {
        dayMonthNumber = 32
      }

      for (let i = 1; i < dayMonthNumber; i++) {
        if (i.toString().length === 1) {
          const num = '0' + i
          dayMonth.push(num)
        } else {
          dayMonth.push(i.toString())
        }
      }
      return dayMonth
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  &__container {
    position: relative;
  }
  &__input {
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #E2E2E2;
    border-radius: 4px;

    @media screen and (max-width: 991px) {
      width: 122px;
      height: 32px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
      border-radius: 6px;
    }
  }
  &__spacer {
    width: 2.3px;
    height: 40px;
    margin: 0 16px;
    background: url("/icons/dots.svg") 0 0 / 100% no-repeat;

    @media screen and (max-width: 991px) {
      height: 32px;
    }
  }
  &__picker {
    position: absolute;
    top: -56px;
    background-color: #fff;
  }
}
</style>
