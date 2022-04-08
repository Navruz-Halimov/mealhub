<i18n>
{
  "en": {
    "placeholder": "Select"
  },
  "ru": {
    "placeholder": "Выбрать"
  }
}
</i18n>

<template>
  <label class="profileSelect">
    <p class="profileSelect-text" :class="{ error: isError }"><slot /></p>
    <basic-input-select
      class="profileSelect-input"
      :class="{ error: isError, disabled: isDisabled }"
      :searchable="isSearchable"
      :clearable="false"
      v-bind="$attrs"
      :value="value"
      :options="options"
      :label="label"
      :disabled="isDisabled"
      :placeholder="placeholder || $t('placeholder')"
      @input="inp"
      @focus="$emit('custom-focus')"
    />
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      default: String
    },
    options: {
      type: Array
    },
    isError: {
      type: Boolean
    },
    placeholder: {
      type: String
    },
    label: {
      type: String,
      default: 'name'
    },
    reduce: {
      type: Function,
      default: () => {}
    },
    isDisabled: {
      type: Boolean
    },
    isSearchable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    inp (el) {
      this.$emit('input', el)
    }
  }
}
</script>

<style lang="scss">
.profileSelect-input * {
  font-size: inherit !important;
}
.profileSelect-input .vs__dropdown-toggle {
  border: none !important;
}
.vs__dropdown-menu {
  padding: 0 !important;
}
</style>
<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.profileSelect {
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
      color: $c-error;
    }
  }

  &-input {
    box-shadow: 0px 3px 6px #11100029;
    border: 1px solid #e2e2e2;
    border-radius: 7px;
    padding: 5px 10px;
    width: 100%;
    height: 40px;
    background: #ffffff 0% 0% no-repeat padding-box;
    font-size: 14px;

    @media screen and (min-width: 992px) {
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 6px 7px #d5d5d51a;
      border: 1px solid #e2e2e2;
      border-radius: 4px;
    }

    &.error {
      border-color: $c-error;
    }
    &.disabled /deep/ {
      filter: grayscale(1);
      opacity: 0.3;

      .vs__dropdown-toggle,
      .vs__search {
        background: #fff;
        cursor: default;
      }
    }
  }
}
</style>
