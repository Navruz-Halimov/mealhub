<template>
  <label class="profileNumber">
    <p class="profileNumber-text" :class="{error: isError}"><slot /></p>
    <input
      type="number"
      class="profileNumber-number"
      :class="{error: isError}"
      v-bind="$attrs"
      :value="value"
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
      type: Number
    },
    isError: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';

  .profileNumber {
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-row-gap: 5px;
    align-items: center;
    width: 100%;

    &-text {
      font-family: $ff-gilroy;
      font-size: 12px;
      color: $c-primary;

      &.error {
        color: $c-error;
      }
    }

    &-number {
      font-size: 14px;
      box-shadow: 0px 3px 6px #11100029;
      border: 1px solid #E2E2E2;
      border-radius: 7px;
      padding: 5px 10px;
      width: 100%;
      height: 40px;
      background: #FFFFFF 0% 0% no-repeat padding-box;

      @media screen and (min-width: 992px) {
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 6px 7px #D5D5D51A;
        border: 1px solid #E2E2E2;
        border-radius: 4px;
      }

      &.error {
        border-color: $c-error;
      }
    }
  }
</style>
