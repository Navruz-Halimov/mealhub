<i18n>
{
  "en": {
    "placeholder": "Search in menu",
    "placeholderreviews": "Search",
    "placeholdercart": "Search in cart"
  },
  "ru": {
    "placeholder": "Поиск в меню",
    "placeholderreviews": "Поиск",
    "placeholdercart": "Поиск в корзине"
  }
}
</i18n>

<template>
  <label class="cuisineSearch">
    <span class="cuisineSearch-icon" @click.stop="$emit('click-handler')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.536 15.539">
        <path data-name="Path 1615" d="M14.46,13.8l-3.533-3.533a6.2,6.2,0,1,0-.613.613l3.533,3.533a.438.438,0,0,0,.306.129.425.425,0,0,0,.306-.129A.436.436,0,0,0,14.46,13.8ZM.917,6.2a5.329,5.329,0,1,1,5.329,5.332A5.335,5.335,0,0,1,.917,6.2Z" transform="translate(0.45 0.5)" stroke-width="1" />
      </svg>
    </span>
    <input
      type="search"
      v-bind="$attrs"
      :value="value"
      class="cuisineSearch-input"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    >
    <img class="cuisineSearch-clear" src="/icons/consumables/input-clear-icon.svg" alt="" @click="clear">
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    reviews: {
      type: Boolean
    },
    cart: {
      type: Boolean
    },
    value: {
      type: String
    }
  },
  computed: {
    placeholder () {
      if (this.cart) {
        return this.$t('placeholdercart')
      }
      if (this.reviews) {
        return this.$t('placeholderreviews')
      }
      return this.$t('placeholder')
    }
  },
  methods: {
    clear () {
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.cuisineSearch {
  position: relative;
  width: 100%;
  height: 100%;

  &-icon, &-clear {
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

  &-icon {
    right: 0;
    left: auto;
    width: 45px;
    height: 100%;
    background: $orange 0% 0% no-repeat padding-box;
    border: none;
    border-radius: 0px 6px 6px 0px;

    svg {
      width: 50%;
      height: 50%;
      fill: $c-light;
    }
  }

  &-clear {
    right: 50px;
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
    border: 1px solid #E2E2E2;
    border-radius: 7px;
    padding-left: 10px;
    box-shadow: 0px 3px 6px #11100029;
    background-color: $light;
    width: 100%;
    height: 100%;
    min-height: 40px;
    padding-right: 70px;

    @media screen and (min-width: 992px) {
      background: #FFFFFF 0% 0% no-repeat padding-box;
      box-shadow: 0px 6px 7px #D5D5D51A;
      border: 1px solid #E2E2E2;
      border-radius: 4px;
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
    border: 1px solid #E2E2E2;
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
      background-color: #F5F5F5;
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
      font-size: 16px;
    }
  }
}
</style>
