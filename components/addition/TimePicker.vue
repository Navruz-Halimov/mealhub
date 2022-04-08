<template>
  <div class="picker__container">
    <addition-smooth-picker
      ref="smoothPicker"
      :data="timeData"
      :change="change"
    />
  </div>
</template>

<script>
const hours = []
for (let i = 0; i < 24; i++) {
  if (i.toString().length === 1) {
    const num = '0' + i
    hours.push(num)
  } else { hours.push(i.toString()) }
}
const minutes = []
for (let i = 0; i < 60; i++) {
  if (i.toString().length === 1) {
    const num = '0' + i
    minutes.push(num)
  } else { minutes.push(i.toString()) }
}

export default {
  props: {
    pickedTime: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      timeData: [
        {
          currentIndex: +this.pickedTime.hours,
          flex: 4,
          list: hours,
          onClick: this.clickOnHours,
          textAlign: 'center',
          className: 'row-group'
        },
        {
          divider: true,
          flex: 1,
          text: ':',
          textAlign: 'center',
          className: 'divider'
        },
        {
          currentIndex: +this.pickedTime.minutes,
          flex: 4,
          list: minutes,
          onClick: this.clickOnMinutes,
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
        this.pickedTime.hours = hours[iIndex]
      }
      if (gIndex === 2) {
        this.pickedTime.minutes = minutes[iIndex]
      }
      const pickedTime = `${this.pickedTime.hours}:${this.pickedTime.minutes}`
      this.$emit('picked-time', pickedTime)
    }
  }
}
</script>

<style lang="scss" scoped>
  .picker__container {
    width: 102px;
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
        }
      }
    }
  }
</style>
