<template>
  <label class="profileCardCode">
    <p class="profileCardCode-text" :class="{ error: isError }"><slot /></p>
    <input
      v-model="code"
      type="password"
      class="profileCardCode-input"
      :class="{ error: isError }"
      v-bind="$attrs"
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
    }
  },
  computed: {
    code: {
      get () {
        return this.value.substr(0, 3)
      },
      set (val) {
        this.$emit('input', val.substr(0, 3))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.profileCardCode {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 5px;
  align-items: center;
  width: auto;

  &-text {
    font-family: $ff-gilroy;
    font-size: 12px;
    color: $c-green;

    @media screen and (min-width: 992px) {
      color: $c-primary;
    }

    &.error {
      color: $c-error;
    }
  }

  &-input {
    font-size: 14px;
    box-shadow: 0px 3px 6px #11100029;
    border: 1px solid #e2e2e2;
    border-radius: 7px;
    padding: 5px 10px;
    width: 100%;
    max-width: 11rem;
    height: 40px;
    background: #ffffff 0% 0% no-repeat padding-box;
    text-align: center;

    @media screen and (min-width: 992px) {
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 6px 7px #d5d5d51a;
      border: 1px solid #e2e2e2;
      border-radius: 4px;
    }

    &.error {
      border-color: $c-error;
    }
  }
}
</style>
