<template>
  <div class="picker__container">
    <addition-smooth-picker
      ref="smoothPicker"
      :data="dateData"
      :change="change"
    />
  </div>
</template>

<script>
export default {
  props: {
    pickedDate: {
      type: Object,
      default: () => ({})
    },
    dayList: {
      type: Array,
      default: () => []
    },
    monthList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      monthNumber: '',
      dateData: [
        {
          currentIndex: +this.pickedDate.day - 1,
          flex: 3,
          list: this.dayList,
          textAlign: 'center',
          className: 'row-group'
        },
        {
          divider: true,
          flex: 1,
          text: '',
          textAlign: 'center',
          className: 'divider'
        },
        {
          currentIndex: this.pickedDate.month,
          flex: 6,
          list: this.monthList,
          textAlign: 'center',
          className: 'item-group'
        }
      ]
    }
  },
  methods: {
    // https://github.com/hiyali/vue-smooth-picker/wiki/Usage документация по пикеру

    change (gIndex, iIndex) {
      if (gIndex === 0) {
        this.pickedDate.day = this.dayList[iIndex]
        if ((this.pickedDate.month + 1).toString().length === 1) {
          this.monthNumber = '0' + (this.pickedDate.month + 1)
        } else {
          this.monthNumber = this.pickedDate.month + 1
        }
      }
      if (gIndex === 2) {
        this.pickedDate.month = iIndex
        if ((iIndex + 1).toString().length === 1) {
          this.monthNumber = '0' + (iIndex + 1)
        } else {
          this.monthNumber = iIndex + 1
        }

        const list = this.getUpdateDayList()
        let currentIndex = +this.pickedDate.day - 1
        currentIndex = list[currentIndex]
          ? currentIndex
          : list.length - 1 || list.length - 3 || list.length - 4

        if ((currentIndex + 1).toString().length === 1) {
          this.pickedDate.day = '0' + (currentIndex + 1)
        } else {
          this.pickedDate.day = currentIndex + 1
        }
        this.$refs.smoothPicker.setGroupData(0, Object.assign({}, this.dateData[0], { currentIndex, list }))
      }
      // this.date.year = date.getFullYear()
      const pickedDate = `${this.pickedDate.year}-${this.monthNumber}-${this.pickedDate.day}`
      this.$emit('picked-date', pickedDate)
    },
    getUpdateDayList () {
      const dayMonth = []
      let dayMonthNumber = 4
      if (this.monthList[this.pickedDate.month] === this.monthList[0]) {
        dayMonthNumber = 32
      } else if (this.monthList[this.pickedDate.month] === this.monthList[1]) {
        const year = (new Date()).getFullYear()
        if (year % 4 !== 0 && (year % 100 === 0 || year % 400 !== 0)) {
          dayMonthNumber = 29
        } else {
          dayMonthNumber = 30
        }
      } else if (this.monthList[this.pickedDate.month] === this.monthList[2]) {
        dayMonthNumber = 32
      } else if (this.monthList[this.pickedDate.month] === this.monthList[3]) {
        dayMonthNumber = 31
      } else if (this.monthList[this.pickedDate.month] === this.monthList[4]) {
        dayMonthNumber = 32
      } else if (this.monthList[this.pickedDate.month] === this.monthList[5]) {
        dayMonthNumber = 31
      } else if (this.monthList[this.pickedDate.month] === this.monthList[6]) {
        dayMonthNumber = 32
      } else if (this.monthList[this.pickedDate.month] === this.monthList[7]) {
        dayMonthNumber = 32
      } else if (this.monthList[this.pickedDate.month] === this.monthList[8]) {
        dayMonthNumber = 31
      } else if (this.monthList[this.pickedDate.month] === this.monthList[9]) {
        dayMonthNumber = 32
      } else if (this.monthList[this.pickedDate.month] === this.monthList[10]) {
        dayMonthNumber = 31
      } else if (this.monthList[this.pickedDate.month] === this.monthList[11]) {
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
  .picker__container {
    width: 150px;
    height: 142px;
    padding: 0 5px;
    border: 1px solid #E2E2E2;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    z-index: 3;

    @media screen and (max-width: 991px) {
      border-radius: 6px;
    }

    .smooth-picker {
      font-size: 14px;
      color: #111;

      & /deep/ {
        .divider {
          z-index: 4;
          background: white;

          &.smooth-item {
            width: 2.3px;
            height: 140px;
            margin-top: -54px;
            margin-left: 5px;
            background: url("/icons/dots.svg") 0 0 / 100% no-repeat;
          }
        }
      }
    }
  }
</style>
