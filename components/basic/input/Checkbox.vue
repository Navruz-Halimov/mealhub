<template>
  <label class="checkbox">
    <input
      type="checkbox"
      class="checkbox-search"
      v-bind="$attrs"
      :checked="value"
      :disabled="isDisabled"
      @change="changeInput"
    >
    <span class="checkbox-icon" :class="{error: isError}">
      <svg v-if="value" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.592 14.19"><path d="M6.124,34.9,0,28.773l2.722-2.722,3.4,3.4,8.746-8.746,2.722,2.722Z" transform="translate(0 -20.707)" /></svg>
    </span>
    <p class="checkbox-txt" :class="{error: isError}">
      <slot />
    </p>
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      required: true
    },
    isError: {
      type: Boolean
    },
    isDisabled: {
      type: Boolean
    }
  },
  methods: {
    changeInput () {
      // this.$emit('input', this.$event.target.checked)
      this.$emit('input', !this.value)
      if (!this.value) {
        this.$emit('changeInput')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';

  .checkbox {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 5px;
    align-items: center;
    cursor: pointer;

    &-search {
      display: none;
    }

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #E2E2E2;
      border-radius: 4px;
      padding: 2.5px;
      width: 20px;
      flex: 0 0 20px;
      height: 20px;
      background: #FFFFFF 0% 0% no-repeat padding-box;

      svg {
        width: 100%;
        height: 100%;
        fill: $orange;
      }

      &.error {
        border-color: $c-error;
      }
    }

    &-txt {
      font-family: $ff-gilroy;
      font-size: 14px;

      &.error {
        color: $c-error;
      }
    }
  }
</style>
