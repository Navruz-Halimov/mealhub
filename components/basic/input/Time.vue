<template>
  <div class="time">
    <div
      :key="initialTimeKey"
      class="time__input"
      :class="{error: isError}"
      tabindex="-1"
      @focusin="showTimePicker"
      @focusout="closeTimePicker"
    >
      {{ time.hours }}
      <div class="time__spaser">
        :
      </div>
      {{ time.minutes }}
    </div>

    <addition-time-picker
      v-if="isTimePicker"
      class="time__picker"
      :picked-time="time"
      @picked-time="setNewPickedTime"
    />
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: Object,
      default: () => ({})
    },
    initialTime: {
      type: [Date, null],
      default: null
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isTimePicker: false
    }
  },
  computed: {
    initialTimeKey () {
      return this.initialTime ? this.initialTime.toString() : 'key'
    }
  },
  watch: {
    initialTime () {
      this.selectCurrentTime()
    }
  },
  created () {
    this.selectCurrentTime()
  },
  methods: {
    setNewPickedTime (time) {
      this.$emit('picked-time', time)
    },
    showTimePicker () {
      if (!this.isDisabled) {
        this.isTimePicker = true
      }
    },
    closeTimePicker () {
      this.isTimePicker = false
    },
    selectCurrentTime () {
      const date = this.initialTime || new Date()

      if (date.getHours().toString().length === 1) {
        this.time.hours = '0' + date.getHours()
      } else {
        this.time.hours = date.getHours().toString()
      }

      if (date.getMinutes().toString().length === 1) {
        this.time.minutes = '0' + date.getMinutes()
      } else {
        this.time.minutes = date.getMinutes().toString()
      }

      const time = `${this.time.hours}:${this.time.minutes}`
      this.$emit('picked-time', time)
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
  position: relative;

  &__input {
    width: 102px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #E2E2E2;
    border-radius: 4px;

    &.error {
      border: 1px solid #eb608f;
    }

    @media screen and (max-width: 991px) {
      width: 83px;
      height: 32px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
      border-radius: 6px;
    }
  }
  &__spaser {
    margin: 0 18px;

    @media screen and (max-width: 991px) {
      margin: 0 11px;
    }
  }
  &__picker {
    position: absolute;
    top: -56px;
    background-color: #fff;
  }
}
</style>
