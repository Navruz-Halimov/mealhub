<i18n>
  {
    "en": {
      "data": "Go&eat",
      "tableReservation": "Table Reservation",
      "onlineOrder": "Pre order",
      "delivery": "Delivery",
      "pickup": "Takeaway"
    },
    "ru": {
      "data": "Go&eat",
      "tableReservation": "Бронь столика",
      "onlineOrder": "Предзаказ",
      "delivery": "Доставка",
      "pickup": "Еда на вынос"
    }
  }
</i18n>

<template>
  <ul class="cateringViewMenu" :type="activeLink">
    <li
      class="cateringViewMenu-item"
      :class="{ active: activeLink === 'go_and_eat' }"
      @click="$emit('menuhandler', 'go_and_eat')"
    >
      <a
        class="cateringViewMenu-href"
        :class="{ active: activeLink === 'go_and_eat' }"
      >
        <span class="cateringViewMenu-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 350 350"
            xml:space="preserve"
          >
            <g>
              <path
                d="M175,171.173c38.914,0,70.463-38.318,70.463-85.586C245.463,38.318,235.105,0,175,0s-70.465,38.318-70.465,85.587
                C104.535,132.855,136.084,171.173,175,171.173z"
              />
              <path
                d="M41.909,301.853C41.897,298.971,41.885,301.041,41.909,301.853L41.909,301.853z"
              />
              <path
                d="M308.085,304.104C308.123,303.315,308.098,298.63,308.085,304.104L308.085,304.104z"
              />
              <path
                d="M307.935,298.397c-1.305-82.342-12.059-105.805-94.352-120.657c0,0-11.584,14.761-38.584,14.761
                s-38.586-14.761-38.586-14.761c-81.395,14.69-92.803,37.805-94.303,117.982c-0.123,6.547-0.18,6.891-0.202,6.131
                c0.005,1.424,0.011,4.058,0.011,8.651c0,0,19.592,39.496,133.08,39.496c113.486,0,133.08-39.496,133.08-39.496
                c0-2.951,0.002-5.003,0.005-6.399C308.062,304.575,308.018,303.664,307.935,298.397z"
              />
            </g>
          </svg>
        </span>
        <p class="cateringViewMenu-text">
          {{ $t('data') }}
        </p>
        <img
          class="cateringViewMenu-arrow"
          src="~/assets/icons/L_arrow.svg"
          alt=""
        >
      </a>
    </li>
    <li
      class="cateringViewMenu-item"
      :class="{ active: activeLink === 'pre_order' }"
      @click="$emit('menuhandler', 'pre_order')"
    >
      <a
        class="cateringViewMenu-href"
        :class="{ active: activeLink === 'pre_order' }"
      >
        <span class="cateringViewMenu-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 350 350"
            xml:space="preserve"
          >
            <g>
              <path
                d="M175,171.173c38.914,0,70.463-38.318,70.463-85.586C245.463,38.318,235.105,0,175,0s-70.465,38.318-70.465,85.587
                C104.535,132.855,136.084,171.173,175,171.173z"
              />
              <path
                d="M41.909,301.853C41.897,298.971,41.885,301.041,41.909,301.853L41.909,301.853z"
              />
              <path
                d="M308.085,304.104C308.123,303.315,308.098,298.63,308.085,304.104L308.085,304.104z"
              />
              <path
                d="M307.935,298.397c-1.305-82.342-12.059-105.805-94.352-120.657c0,0-11.584,14.761-38.584,14.761
                s-38.586-14.761-38.586-14.761c-81.395,14.69-92.803,37.805-94.303,117.982c-0.123,6.547-0.18,6.891-0.202,6.131
                c0.005,1.424,0.011,4.058,0.011,8.651c0,0,19.592,39.496,133.08,39.496c113.486,0,133.08-39.496,133.08-39.496
                c0-2.951,0.002-5.003,0.005-6.399C308.062,304.575,308.018,303.664,307.935,298.397z"
              />
            </g>
          </svg>
        </span>
        <p class="cateringViewMenu-text">
          {{ $t('onlineOrder') }}
        </p>
        <img
          class="cateringViewMenu-arrow"
          src="~/assets/icons/L_arrow.svg"
          alt=""
        >
      </a>
    </li>
    <li
      class="cateringViewMenu-item"
      :class="{ active: activeLink === 'reserve_table' }"
      @click="$emit('menuhandler', 'reserve_table')"
    >
      <a
        class="cateringViewMenu-href"
        :class="{ active: activeLink === 'reserve_table' }"
      >
        <span class="cateringViewMenu-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 350 350"
            xml:space="preserve"
          >
            <g>
              <path
                d="M175,171.173c38.914,0,70.463-38.318,70.463-85.586C245.463,38.318,235.105,0,175,0s-70.465,38.318-70.465,85.587
                C104.535,132.855,136.084,171.173,175,171.173z"
              />
              <path
                d="M41.909,301.853C41.897,298.971,41.885,301.041,41.909,301.853L41.909,301.853z"
              />
              <path
                d="M308.085,304.104C308.123,303.315,308.098,298.63,308.085,304.104L308.085,304.104z"
              />
              <path
                d="M307.935,298.397c-1.305-82.342-12.059-105.805-94.352-120.657c0,0-11.584,14.761-38.584,14.761
                s-38.586-14.761-38.586-14.761c-81.395,14.69-92.803,37.805-94.303,117.982c-0.123,6.547-0.18,6.891-0.202,6.131
                c0.005,1.424,0.011,4.058,0.011,8.651c0,0,19.592,39.496,133.08,39.496c113.486,0,133.08-39.496,133.08-39.496
                c0-2.951,0.002-5.003,0.005-6.399C308.062,304.575,308.018,303.664,307.935,298.397z"
              />
            </g>
          </svg>
        </span>
        <p class="cateringViewMenu-text">
          {{ $t('tableReservation') }}
        </p>
        <img
          class="cateringViewMenu-arrow"
          src="~/assets/icons/L_arrow.svg"
          alt=""
        >
      </a>
    </li>
    <li
      class="cateringViewMenu-item"
      :class="{ active: activeLink === 'delivery' }"
      @click="$emit('menuhandler', 'delivery')"
    >
      <a
        class="cateringViewMenu-href"
        :class="{ active: activeLink === 'delivery' }"
      >
        <span class="cateringViewMenu-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 350 350"
            xml:space="preserve"
          >
            <g>
              <path
                d="M175,171.173c38.914,0,70.463-38.318,70.463-85.586C245.463,38.318,235.105,0,175,0s-70.465,38.318-70.465,85.587
                C104.535,132.855,136.084,171.173,175,171.173z"
              />
              <path
                d="M41.909,301.853C41.897,298.971,41.885,301.041,41.909,301.853L41.909,301.853z"
              />
              <path
                d="M308.085,304.104C308.123,303.315,308.098,298.63,308.085,304.104L308.085,304.104z"
              />
              <path
                d="M307.935,298.397c-1.305-82.342-12.059-105.805-94.352-120.657c0,0-11.584,14.761-38.584,14.761
                s-38.586-14.761-38.586-14.761c-81.395,14.69-92.803,37.805-94.303,117.982c-0.123,6.547-0.18,6.891-0.202,6.131
                c0.005,1.424,0.011,4.058,0.011,8.651c0,0,19.592,39.496,133.08,39.496c113.486,0,133.08-39.496,133.08-39.496
                c0-2.951,0.002-5.003,0.005-6.399C308.062,304.575,308.018,303.664,307.935,298.397z"
              />
            </g>
          </svg>
        </span>
        <p class="cateringViewMenu-text">
          {{ $t('delivery') }}
        </p>
        <img
          class="cateringViewMenu-arrow"
          src="~/assets/icons/L_arrow.svg"
          alt=""
        >
      </a>
    </li>
    <li
      class="cateringViewMenu-item"
      :class="{ active: activeLink === 'pickup' }"
      @click="$emit('menuhandler', 'pickup')"
    >
      <a
        class="cateringViewMenu-href"
        :class="{ active: activeLink === 'pickup' }"
      >
        <span class="cateringViewMenu-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 350 350"
            xml:space="preserve"
          >
            <g>
              <path
                d="M175,171.173c38.914,0,70.463-38.318,70.463-85.586C245.463,38.318,235.105,0,175,0s-70.465,38.318-70.465,85.587
                C104.535,132.855,136.084,171.173,175,171.173z"
              />
              <path
                d="M41.909,301.853C41.897,298.971,41.885,301.041,41.909,301.853L41.909,301.853z"
              />
              <path
                d="M308.085,304.104C308.123,303.315,308.098,298.63,308.085,304.104L308.085,304.104z"
              />
              <path
                d="M307.935,298.397c-1.305-82.342-12.059-105.805-94.352-120.657c0,0-11.584,14.761-38.584,14.761
                s-38.586-14.761-38.586-14.761c-81.395,14.69-92.803,37.805-94.303,117.982c-0.123,6.547-0.18,6.891-0.202,6.131
                c0.005,1.424,0.011,4.058,0.011,8.651c0,0,19.592,39.496,133.08,39.496c113.486,0,133.08-39.496,133.08-39.496
                c0-2.951,0.002-5.003,0.005-6.399C308.062,304.575,308.018,303.664,307.935,298.397z"
              />
            </g>
          </svg>
        </span>
        <p class="cateringViewMenu-text">
          {{ $t('pickup') }}
        </p>
        <img
          class="cateringViewMenu-arrow"
          src="~/assets/icons/L_arrow.svg"
          alt=""
        >
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    ordersId: {
      type: String
    },
    reviewCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      activeLink: false
    }
  },
  created () {
    setTimeout(() => {
      this.activeLink =
        (this.currentOrder && this.currentOrder.order_type) || ''
    }, 250)
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.cateringViewMenu {
  width: 100%;
  border: none;

  &-item {
    border-top: {
      width: 1px;
      style: solid;
      color: $c-line;
    }
    &.active {
      border-top: 1px solid $orange;
    }
    &:hover:not(.active) {
      background: $hover !important;
      .pages-text {
        color: $dark !important;
      }
      .pages-arrow {
        svg {
          fill: $c-icon-hover;
        }
      }
    }
    &:last-child {
      border-bottom: {
        width: 1px;
        style: solid;
        color: $c-line;
      }
    }
  }

  &-href {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 15px;
    font-size: 14px;

    &.active {
      background-color: $orange !important;
      color: $c-light !important;

      span {
        border-color: $c-light;
      }
      svg {
        fill: $c-light;
      }
      a {
        color: $c-light;
      }
    }
    &:hover:not(.active) {
      background-color: $hover;
      color: $dark;
      span {
        border-color: $c-light;
      }
      svg {
        fill: $c-icon-hover;
      }
      a {
        color: $c-light;
      }
    }
  }

  &-icon {
    display: none;
  }

  &-arrow {
    flex: 0 0 10px;
    width: 10px;
    height: 15px;
    object-fit: cover;
  }
}
</style>
