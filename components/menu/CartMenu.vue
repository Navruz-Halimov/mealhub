<i18n>
{
  "en": {
  "data": "My orders",
  "emptyList": "Empty list"
  },
  "ru": {
  "data": "Мои заказы",
  "emptyList": "Список пуст"
  }
}
</i18n>

<template>
  <ul class="cartMenu">
    <li v-if="activeLink.indexOf('orders') + 1" class="cartMenu-item active">
      <nuxt-link
        :to="localePath({ path: `/orders/` })"
        class="cartMenu-href"
        :class="{ active: activeLink.indexOf('orders') + 1 }"
      >
        <span class="cartMenu-icon">
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
        <p class="cartMenu-text">
          {{ $t('data') }}
        </p>
        <svg
          width="6"
          height="11"
          viewBox="0 0 6 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.86812 5.22295L1.07012 9.23695C1.02506 9.28527 1 9.34889 1 9.41495C1 9.48102 1.02506 9.54463 1.07012 9.59295C1.09148 9.61639 1.1175 9.63512 1.14652 9.64793C1.17553 9.66074 1.2069 9.66736 1.23862 9.66736C1.27033 9.66736 1.3017 9.66074 1.33071 9.64793C1.35973 9.63512 1.38575 9.61639 1.40712 9.59295L5.37412 5.39995C5.41917 5.35163 5.44423 5.28802 5.44423 5.22195C5.44423 5.15588 5.41917 5.09227 5.37412 5.04395L1.40712 0.852954C1.38567 0.829704 1.35971 0.811064 1.33083 0.79817C1.30195 0.785276 1.27074 0.778398 1.23912 0.777954C1.20759 0.778115 1.17644 0.784871 1.14768 0.797788C1.11892 0.810704 1.09318 0.829496 1.07212 0.852954C1.02706 0.901274 1.002 0.964885 1.002 1.03095C1.002 1.09702 1.02706 1.16063 1.07212 1.20895L4.86812 5.22295Z"
            fill="white"
            stroke="white"
          />
        </svg>

        <!-- <img class="cartMenu-arrow" src="~/assets/icons/L_arrow.svg" alt=""> -->
      </nuxt-link>
      <div ref="sublist" class="menu-sublist">
        <template v-if="CURRENT_ORDERS.length">
          <menu-submenu-item
            v-for="(item, i) in CURRENT_ORDERS"
            :key="i"
            :item="item"
            :to="localePath({ path: `/orders/` + item.id })"
          >
            <orders-status class="flex a_c mr-1" :item="item" />
            <order-timer v-if="orderHasTimer(item)" :item="item" />
          </menu-submenu-item>
        </template>
        <span v-else class="empty">{{ $t('emptyList') }}</span>
      </div>
    </li>

    <li v-if="activeLink.indexOf('history') + 1" class="cartMenu-item active">
      <nuxt-link
        :to="localePath({ path: `/history` })"
        class="cartMenu-href"
        :class="{ active: activeLink.indexOf('history') + 1 }"
      >
        <span class="cartMenu-icon">
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
        <p class="cartMenu-text">
          {{ $t('data') }}
        </p>
        <img class="cartMenu-arrow" src="~/assets/icons/L_arrow.svg" alt="">
      </nuxt-link>

      <div ref="sublist" class="menu-sublist">
        <template v-if="HISTORY_ORDERS.length">
          <menu-submenu-item
            v-for="(item, i) in HISTORY_ORDERS"
            :key="i"
            :item="item"
            :to="localePath({ path: `/history/` + item.id })"
          />
        </template>
        <span v-else class="empty">{{ $t('emptyList') }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
// import BasicTimerCartmenu from '~/components/basic/timer/small.vue'
import MenuSubmenuItem from '~/components/menu/submenuitem.vue'

export default {
  components: {
    //  BasicTimerCartmenu,
    MenuSubmenuItem
  },
  props: {
    activeLink: {
      type: String,
      default: 'profile'
    }
  },
  computed: {
    ...mapGetters(['CURRENT_ORDERS', 'HISTORY_ORDERS'])
  },
  created () {
    this.wait(() => {
      if (this.$refs.sublist && this.HISTORY_ORDERS.length) {
        this.$refs.sublist.addEventListener('scroll', this.handleScroll)
        const st = +localStorage.getItem('ordersMenuScroll') || 0
        this.$refs.sublist.scrollTo(st, st)
        return true
      }

      return false
    })
  },
  beforeDestroy () {
    this.$refs.sublist &&
      this.$refs.sublist.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll (event) {
      localStorage.setItem('ordersMenuScroll', event.target.scrollTop || 0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.menu-sublist {
  display: none;
  flex: 1 0 100px;
  flex-direction: column;

  .green {
    cursor: initial !important;
  }
  .empty {
    width: 100%;
    display: block;
    margin: 20px auto 10px;
    text-align: center;
    font-size: 14px;
    color: #c4c4c4;
  }
}
.active + .menu-sublist {
  // display: flex;
  display: block;
  overflow: auto;
}

.cartMenu {
  flex: 1 0 100px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: none;

  &-item {
    border-top: {
      width: 1px;
      style: solid;
      color: $c-line;
    }

    &.active {
      flex: 1 0 100px;
      display: flex;
      flex-direction: column;
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

    &:hover {
      background-color: $orange;
      color: $c-light;
    }
    &:hover span {
      border-color: $c-light;
    }
    &:hover svg {
      fill: $c-light;
    }
    &:hover a {
      color: $c-light;
    }
  }

  &-icon {
    display: none;
  }

  &-arrow {
    flex: 0 0 10px;
    width: 10px;
    height: 10px;
    object-fit: cover;
  }
}
</style>
