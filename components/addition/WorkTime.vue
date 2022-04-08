<i18n>
{
  "en": {
    "timeLabel": "Opened",
    "timeLabelClose": "Closed"
  },
  "ru": {
    "timeLabel": "Открыто",
    "timeLabelClose": "Закрыто"
  }
}
</i18n>

<template>
  <div ref="workTime" class="cateringWorkTime cursor-pointer">
    <label :for="uniqid" class="cateringWorkTime-label" @click.prevent="toggle">
      <img
        class="cateringWorkTime-icon"
        :src="
          isOpen
            ? '/icons/catering/new/clock-green.svg'
            : '/icons/catering/new/clock-grey.svg'
        "
        alt="t"
      >
      <span class="opened_text">{{
        isOpen ? $t("timeLabel") : $t("timeLabelClose")
      }}</span>
      <span class="expand_arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
          <g>
            <path
              d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z"
            />
          </g>
        </svg>
      </span>
    </label>
    <input :id="uniqid" ref="itInput" class="oneOfTheWorkTimeInputs" type="checkbox">
    <ul
      class="cateringWorkTime_list"
      :class="{
        top: direction === 'top',
        bottom: direction === 'bottom',
      }"
      @click.stop
    >
      <li
        v-for="(time, i) in workTime"
        :key="i"
        class="cateringWorkTime_list-item"
        :class="{ holiday: time.day === 'Sun' || time.day === 'Sat' || time.day === 'Сб' || time.day === 'Вс' }"
      >
        <span class="cateringWorkTime_list-day">{{
          time.day.slice(0, 3)
        }}</span>
        <p class="cateringWorkTime_list-open">
          {{ time.open.split(":")[0] }}
          <span>{{ time.open.split(":")[1] }}</span>
        </p>
        <span>-</span>
        <p class="cateringWorkTime_list-close">
          {{ time.close.split(":")[0] }}
          <span>{{ time.close.split(":")[1] }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    uniqid: {
      type: String,
      default: 'aloneworktime'
    },

    workTime: {
      type: Array
    },
    isOpen: {
      type: Boolean
    },
    direction: {
      type: String
    }
  },
  data () {
    return {
      exp: true
    }
  },
  mounted () {
    if (this.$refs.workTime && this.$refs.workTime.closest('.wrapper')) {
      this.$refs.workTime.closest('.wrapper').addEventListener('click', () => {
        this.closeWorkTimes()
      })
    }
  },
  methods: {
    toggle (e) {
      const tar = document.getElementById(this.uniqid)
      tar.checked = !tar.checked
      e.stopPropagation()
    },
    closeWorkTimes () {
      const els = document.querySelectorAll('.oneOfTheWorkTimeInputs')
      els.forEach(function (checkbox) {
        if (checkbox.checked) { checkbox.checked = false }
      })
    }
  }
}
</script>

<style>
  .catering .cateringWorkTime-label{
    height: 100% !important;
  }
  .catering .expand_arrow{
    width: 28px !important;
    border-left:1px solid #eee;
    padding-left: 0 !important;
    margin-left: .5rem;
  }
  .catering .expand_arrow svg{
    height: 15px !important;
  }

  .mapTopCard_article_block .cateringWorkTime{
    width: 9em !important;
  }
  .mapTopCard_article_block .expand_arrow {
    width: 28px !important;
  }

</style>

<style lang="scss" scoped>
@import "~/assets/styles/abstract/var";
@import "~/assets/styles/modificator";

.cateringWorkTime_list {
  cursor: pointer;
  display: none !important;

  // @media screen and (min-width: 992px) {
  //   overflow: auto;
  //   max-height: 30vh;
  // }
}
:checked + .cateringWorkTime_list {
  display: block !important;
}

.expand_arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 5px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  svg {
    flex: 0 0 15px;
    width: 15px;
    height: 12px;
    cursor: pointer;
  }
}
.opened_text {
  margin-top: -1px;
  font-size: 14px;
  line-height: 14px;
  cursor: pointer;
  margin-left: -8px;
  @media screen and (min-width: 992px) {
    margin-top: 0;
    margin-left: 4px;
  }
}

.cateringWorkTime:hover{
  box-shadow: none;
}

.cateringWorkTime {
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 6px #11100029;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  height: 3.5em;
  width: 10em;
  background: #ffffff 0% 0% no-repeat padding-box;
  font-family: $ff-roboto;
  font-size: 10px;
  color: $c-green;
  cursor: pointer !important;

  @media screen and (min-width: 992px) {
    width: 12em;
    justify-self: start;
    font-size: 12px;
    height: 3em;
  }

  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1em 0 .25em;
    height: 14px;

    @media screen and (min-width: 992px) {
      margin: 0 .75em;
      height: 18px;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &-label {
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
  }

  &_list {
    position: absolute;
    z-index: 999;
    bottom: 0;
    left: 0;
    display: none;
    box-shadow: 0px 3px 6px #11100029;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    background-color: $light;
    color: $c-primary;
    transform: translateY(calc(100% + 5px));
    cursor: default;

    &.top {
      bottom: auto;
      top: 0;
      transform: translateY(calc(-100% - 5px));
    }

    &-item {
      display: flex;
      padding: 0.75rem 1.25rem;
      font-family: $ff-gilroy;
      font-size: 14px;
      font-weight: 300;

      @media screen and (max-width: 991px) {
        padding: 0.35rem 1.25rem;
        font-size: 16px;
      }

      & > span:first-child {
        color: $c-green;
        width: 2.65em;
      }

      &:not(:first-child) {
        border-top: {
          width: 1px;
          style: solid;
          color: $c-line;
        }
      }

      &.holiday > span:first-child {
        color: #eb618d;
      }
    }

    &-open,
    &-close {
      display: flex;
      align-items: center;

      span:last-child {
        align-self: flex-start;
        margin-left: 2px;
        font-size: 10px;
      }
    }
  }
}
</style>
