<template>
  <label class="profileText">
    <p class="profileText-text" :class="{ error: isError }"><slot /></p>
    <input
      type="text"
      class="profileText-input"
      :class="{ error: isError, disabled: isDisabled }"
      v-bind="$attrs"
      :value="value"
      :readonly="isDisabled"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('custom-focus')"
    >
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String
    },
    isError: {
      type: Boolean
    },
    isDisabled: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.profileText {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 5px;
  align-items: center;
  width: 100%;

  &-text {
    font-family: $ff-gilroy;
    font-size: 12px;
    color: $c-green;

    @media screen and (min-width: 992px) {
      color: $c-primary;
    }

    &.error {
      color: $c-error !important;
    }
  }

  &-input {
    font-size: 14px;
    box-shadow: 0px 3px 6px #11100029;
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

    &.error {
      border-color: $c-error;
    }
    &.disabled {
      cursor: default;
    }
  }
}
</style>
