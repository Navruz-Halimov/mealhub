<i18n>
{
  "en": {
    "placeholder": "Select from list"
  },
  "ru": {
    "placeholder": "Выбрать из списка"
  }
}
</i18n>

<template>
  <label class="cuisineSearch">
    <input
      v-model="value"
      type="search"
      class="cuisineSearch-input"
      :placeholder="$t('placeholder')"
      @input="clickInputHandler"
      @click="clickInputHandler"
      @blur="clear"
    >
    <img v-if="!value" class="arrow" src="~/assets/icons/L_arrow.svg" alt="">
    <img
      v-else
      class="cuisineSearch-clear"
      src="/icons/consumables/input-clear-icon.svg"
      alt=""
      @click.stop="clear"
    >
    <ul class="cuisineSearch_list" :class="{ open: listIsOpen }">
      <li
        v-for="(item, i) in searchable"
        :key="i"
        class="cuisineSearch-item"
        @click="setValue(item)"
      >
        <p class="cuisineSearch-item-text">{{ item.name || item.title }}</p>
      </li>
    </ul>
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      listIsOpen: false,
      value: ''
    }
  },
  computed: {
    searchable () {
      const regexp = new RegExp(this.value, 'gi')
      const tops = this.data.mainList.filter((item, i) => {
        const name = item.name || item.title
        if (name.search(regexp) !== -1) {
          return true
        }
      })

      return tops
    }
  },
  methods: {
    clear () {
      setTimeout(() => {
        this.value = ''
        this.listIsOpen = false
      }, 300)
    },
    setValue (value) {
      const vm = this

      this.$emit('input', value)
      requestAnimationFrame(() => {
        vm.value = ''
        vm.listIsOpen = true
      })
      this.value = ''
      this.listIsOpen = true
    },
    clickInputHandler () {
      this.listIsOpen = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.cuisineSearch {
  position: relative;
  width: 100%;
  height: 40px;
  .arrow {
    position: absolute;
    right: 0;
    margin-top: 14px;
    margin-right: 14px;
    margin-left: 5px;
    width: 12px;
    height: 12px;
  }
  &-icon,
  &-clear {
    position: absolute;
    top: 50%;
    left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: {
      width: 1px;
      style: solid;
      color: $green;
      radius: 50%;
    }
    width: 20px;
    height: 20px;
    color: $green;
    transform: translateY(-50%);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: $green;
  }

  // &-icon {
  //   right: 0;
  //   left: auto;
  //   width: 45px;
  //   height: 100%;
  //   background: #f3bd44 0% 0% no-repeat padding-box;
  //   border: 1px solid #f3bd44;
  //   border-radius: 0px 7px 7px 0px;

  //   svg {
  //     width: 50%;
  //     height: 50%;
  //     fill: $c-light;
  //   }
  // }

  &-clear {
    right: 7px;
    left: auto;
    border: none;
    width: 25px;
    height: 25px;
    object-fit: contain;
    color: $c-primary;
    cursor: pointer;

    svg {
      fill: $c-primary;
    }
  }

  &-input {
    font-size: 14px;
    border: 1px solid #e2e2e2;
    border-radius: 7px;
    padding-left: 10px;
    padding-right: 50px;
    box-shadow: 0px 3px 6px #11100029;
    background-color: $light;
    width: 100%;
    height: 100%;
    min-height: 40px;

    @media screen and (min-width: 992px) {
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 6px 7px #d5d5d51a;
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      padding: 10px;
    }
  }

  &_list {
    position: absolute;
    z-index: 5;
    display: none;
    flex-direction: column;
    margin-top: 5px;
    width: 100%;
    max-height: 300px;
    overflow: auto;
    background-color: $light;
    box-shadow: 0px 3px 6px #11100040;
    border: 1px solid #e2e2e2;
    border-radius: 4px;

    &.open {
      display: flex;
    }
  }

  &-item {
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-column-gap: 30px;
    align-items: center;
    padding: 10px 15px;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
      font-weight: bold;
      color: $c-green;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $c-line;
    }

    &-img {
      width: 100%;
      height: auto;
      object-fit: cover;
      overflow: hidden;
    }

    &-text {
      font-family: $ff-gilroy;
      font-size: 14px !important;
      white-space: nowrap;
    }
  }
}
</style>
