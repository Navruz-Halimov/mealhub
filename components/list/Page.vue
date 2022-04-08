<i18n>
{
  "en": {
    "data": "My data",
    "orders": "My orders",
    "payments": "My payment methods",
    "addresses": "My addresses",
    "favorites": "Favorites",
    "promo": "Promo and news",
    "cart": "Cart",
    "help": "Help/About",
    "logout": "Logout"
  },
  "ru": {
    "data": "Мои данные",
    "orders": "Мои заказы",
    "payments": "Мои способы оплаты",
    "addresses": "Мои адреса доставки",
    "favorites": "Избраное",
    "promo": "Акции, скидки, новости",
    "cart": "Корзина",
    "help": "Помощь/Справка",
    "logout": "Выйти"
  }
}
</i18n>

<template>
  <ul class="pages">
    <li :class="{ active: type === 'profile' }" class="pages-item" @click="$emit('click-handler')">
      <nuxt-link :to="localePath('/profile')" class="pages-href">
        <span class="pages-icon">
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
              <path d="M41.909,301.853C41.897,298.971,41.885,301.041,41.909,301.853L41.909,301.853z" />
              <path d="M308.085,304.104C308.123,303.315,308.098,298.63,308.085,304.104L308.085,304.104z" />
              <path
                d="M307.935,298.397c-1.305-82.342-12.059-105.805-94.352-120.657c0,0-11.584,14.761-38.584,14.761
                  s-38.586-14.761-38.586-14.761c-81.395,14.69-92.803,37.805-94.303,117.982c-0.123,6.547-0.18,6.891-0.202,6.131
                  c0.005,1.424,0.011,4.058,0.011,8.651c0,0,19.592,39.496,133.08,39.496c113.486,0,133.08-39.496,133.08-39.496
                  c0-2.951,0.002-5.003,0.005-6.399C308.062,304.575,308.018,303.664,307.935,298.397z"
              />
            </g>
          </svg>
        </span>
        <p class="pages-text flex j_b mr-1">
          {{ $t('data') }}
        </p>
        <span class="pages-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z" />
            </g>
          </svg>
        </span>
      </nuxt-link>
    </li>
    <li :class="{ active: type === 'orders' }" class="pages-item" @click="$emit('click-handler')">
      <nuxt-link :to="localePath('/orders')" class="pages-href">
        <span class="pages-icon span_cart">
          <img style="height: 32px;opacity: 0.4;" src="/icons/catering/menu/cart_grey.svg" alt="">
        </span>
        <p class="pages-text flex j_b mr-1">
          {{ $t('orders') }}
          <span v-if="CURRENT_ORDERS" class="green">{{ CURRENT_ORDERS.length }}</span>
        </p>
        <span class="pages-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z" />
            </g>
          </svg>
        </span>
      </nuxt-link>
    </li>
    <li :class="{ active: type === 'payments' }" class="pages-item " @click="$emit('click-handler')">
      <nuxt-link :to="localePath('/profile/payments')" class="pages-href">
        <span class="pages-icon">
          <svg
            id="Layer_1"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <g>
                <path d="M469.526,75.926H111.652c-23.42,0-42.474,19.049-42.474,42.463v26.714H42.463C19.05,145.104,0,164.158,0,187.578v206.032 c0,23.415,19.049,42.463,42.463,42.463h357.874c23.42,0,42.474-19.049,42.474-42.463v-26.714h26.714 c23.42,0,42.474-19.054,42.474-42.474V118.39C512,94.975,492.946,75.926,469.526,75.926z M489.598,324.422 c0,11.068-9.005,20.072-20.072,20.072h-26.715V227.084h46.787V324.422z M489.598,204.682h-46.787v-17.104 c0-7.256-1.833-14.091-5.053-20.072h51.84V204.682z M489.598,145.104h-89.261h-16.085c-6.185,0-11.201,5.015-11.201,11.201 s5.016,11.201,11.201,11.201h16.085c11.068,0,20.072,9.005,20.072,20.072v206.032h0c0,11.061-9.005,20.061-20.072,20.061H42.463 c-11.061,0-20.061-9-20.061-20.061V187.578c0-11.068,8.999-20.072,20.061-20.072h268.982c6.185,0,11.201-5.015,11.201-11.201 s-5.016-11.201-11.201-11.201H91.58V118.39c0-11.061,9.005-20.061,20.072-20.061h357.874c11.068,0,20.072,9,20.072,20.061V145.104 z" />
              </g>
            </g>
            <g>
              <g>
                <path d="M350.089,145.104h-3.92c-6.185,0-11.201,5.015-11.201,11.201s5.015,11.201,11.201,11.201h3.92 c6.185,0,11.201-5.015,11.201-11.201S356.274,145.104,350.089,145.104z" />
              </g>
            </g>
            <g>
              <g>
                <path d="M125.698,213.05H93.932c-16.571,0-30.052,13.487-30.052,30.064v8.334c0,16.576,13.482,30.064,30.052,30.064h31.766 c16.571,0,30.052-13.487,30.052-30.064v-8.334C155.751,226.536,142.269,213.05,125.698,213.05z M133.349,251.447 c0,4.224-3.432,7.661-7.65,7.661H93.932c-4.218,0-7.65-3.436-7.65-7.661v-8.334c0-4.225,3.432-7.662,7.65-7.662h31.766 c4.218,0,7.65,3.437,7.65,7.662V251.447z" />
              </g>
            </g>
            <g>
              <g>
                <path d="M234.068,356.233H69.234c-6.186,0-11.201,5.015-11.201,11.201s5.015,11.201,11.201,11.201h164.835 c6.186,0,11.201-5.015,11.201-11.201S240.255,356.233,234.068,356.233z" />
              </g>
            </g>
            <g>
              <g>
                <path d="M164.532,316.099H69.234c-6.186,0-11.201,5.015-11.201,11.201s5.015,11.201,11.201,11.201h95.299 c6.186,0,11.201-5.015,11.201-11.201S170.719,316.099,164.532,316.099z" />
              </g>
            </g>
            <g>
              <g>
                <path d="M390.929,338.62c-1.872-17.153-15.74-30.559-32.986-31.876c-7.457-0.561-14.775,1.147-21.112,4.932 c-0.115,0.069-0.164,0.069-0.253,0.016c-6.361-3.799-13.661-5.508-21.148-4.947c-17.218,1.315-31.086,14.71-32.974,31.843 c-0.904,8.148,0.888,16.106,5.183,23.02c6.628,10.661,18.064,17.027,30.593,17.027c6.506,0,12.88-1.77,18.459-5.12 c5.579,3.35,11.959,5.12,18.471,5.12c12.535,0,23.968-6.367,30.583-17.029C390.026,354.716,391.818,346.767,390.929,338.62z M366.718,349.784c-0.002,0.002-0.004,0.006-0.006,0.009c-2.499,4.032-6.817,6.439-11.549,6.439c-2.483,0-4.916-0.685-7.034-1.983 c-3.475-2.125-7.454-3.189-11.436-3.189c-3.982,0-7.962,1.063-11.436,3.189c-2.119,1.297-4.548,1.983-7.024,1.983 c-4.732,0-9.056-2.412-11.565-6.448c-1.616-2.602-2.288-5.62-1.943-8.735c0.699-6.335,6.035-11.481,12.403-11.967 c2.842-0.215,5.588,0.422,7.989,1.856c7.141,4.24,16.013,4.238,23.179-0.016c2.372-1.419,5.13-2.058,7.953-1.841 c6.385,0.487,11.721,5.632,12.412,11.968C369,344.171,368.329,347.19,366.718,349.784z" />
              </g>
            </g>
          </svg>
        </span>
        <p class="pages-text flex j_b mr-1">
          {{ $t('payments') }}
        </p>
        <span class="pages-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z" />
            </g>
          </svg>
        </span>
      </nuxt-link>
    </li>
    <li :class="{ active: type === 'addresses' }" class="pages-item" @click="$emit('click-handler')">
      <nuxt-link :to="localePath('/profile/addresses')" class="pages-href">
        <span class="pages-icon">
          <svg id="addricon" style="enable-background:new 0 0 91 91;" version="1.1" viewBox="0 0 91 91" xml:space="preserve">
            <g>
              <path d="M66.9,41.8c0-11.3-9.1-20.4-20.4-20.4c-11.3,0-20.4,9.1-20.4,20.4c0,11.3,20.4,32.4,20.4,32.4S66.9,53.1,66.9,41.8z    M37,41.4c0-5.2,4.3-9.5,9.5-9.5c5.2,0,9.5,4.2,9.5,9.5c0,5.2-4.2,9.5-9.5,9.5C41.3,50.9,37,46.6,37,41.4z" />
            </g>
          </svg>
        </span>
        <p class="pages-text flex j_b mr-1">
          {{ $t('addresses') }}
        </p>
        <span class="pages-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z" />
            </g>
          </svg>
        </span>
      </nuxt-link>
    </li>

    <li :class="{ active: type === 'cart' }" class="pages-item" @click="$emit('click-handler')">
      <nuxt-link :to="localePath({ path: `/profile/cart` })" class="pages-href">
        <span class="pages-icon">
          <img style="height: 22px;opacity: 0.4;" src="/icons/catering/new/cart-grey.svg" alt="">
        </span>
        <p class="pages-text flex j_b mr-1">
          {{ $t('cart') }}
        </p>
        <span class="pages-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z" />
            </g>
          </svg>
        </span>
      </nuxt-link>
    </li>
    <li class="pages-item" @click="$emit('click-handler')">
      <nuxt-link :to="localePath('/profile/favorites')" class="pages-href">
        <span class="pages-icon">
          <img style="height: 18px;opacity: 0.5;" src="/icons/catering/new/heart-grey.svg" alt="">
        </span>
        <p class="pages-text flex j_b mr-1">
          {{ $t('favorites') }}
        </p>
        <span class="pages-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z" />
            </g>
          </svg>
        </span>
      </nuxt-link>
    </li>
    <li class="pages-item" @click="$emit('click-handler')">
      <nuxt-link :to="localePath('/profile/promo')" class="pages-href">
        <span class="pages-icon">
          <img class="svg_promo" src="/images/icons/promotion_percent.png" alt="">
        </span>
        <p class="pages-text flex j_b mr-1">
          {{ $t('promo') }}
        </p>
        <span class="pages-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z" />
            </g>
          </svg>
        </span>
      </nuxt-link>
    </li>
    <li class="pages-item" @click="$emit('click-handler')">
      <nuxt-link :to="isMobile ? localePath('/profile/reference') : localePath('/profile/help')" class="pages-href">
        <span class="pages-icon">
          ?
        </span>
        <p class="pages-text flex j_b mr-1">
          {{ $t('help') }}
        </p>
        <span class="pages-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z" />
            </g>
          </svg>
        </span>
      </nuxt-link>
    </li>
    <li v-if="longlist" class="ok pages-item logout" @click="logout">
      <a class="pages-href">
        <span class="pages-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.235 32.896">
            <path d="M6.865,115.054h23.3a2.011,2.011,0,1,0,0-4.021H6.865l2.6-2.6a2.011,2.011,0,0,0-2.844-2.844L.589,111.621c-.047.047-.091.1-.132.146-.01.012-.019.026-.029.039-.031.039-.061.078-.088.119-.008.012-.015.025-.023.037-.028.043-.055.087-.079.132l-.013.027c-.025.049-.05.1-.071.151,0,.006,0,.013-.007.019-.022.054-.042.109-.059.165,0,.007,0,.014-.005.022-.016.055-.031.111-.042.168,0,.017,0,.035-.008.052-.008.047-.017.095-.021.143a1.983,1.983,0,0,0,0,.4c0,.049.013.1.021.145,0,.017,0,.034.008.05.012.058.026.114.043.17,0,.007,0,.014.005.02.017.057.038.112.06.167l.007.018c.021.052.046.1.072.151l.013.027c.025.046.052.09.08.133.008.012.014.024.022.036.028.041.058.081.089.12.01.013.018.026.029.038.042.051.086.1.132.146L6.621,120.5a2.011,2.011,0,0,0,2.844-2.844Z" transform="translate(0 -96.596)" />
            <path d="M116.846,42.3a16.436,16.436,0,0,0-13.66,7.283,2.011,2.011,0,0,0,3.338,2.243,12.426,12.426,0,1,1,.017,13.868,2.011,2.011,0,0,0-3.332,2.251A16.448,16.448,0,1,0,116.846,42.3Z" transform="translate(-89.059 -42.299)" />
          </svg>
        </span>
        <p class="pages-text flex j_b mr-1">
          {{ $t('logout') }}
        </p>
        <span class="pages-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z" />
            </g>
          </svg>
        </span>
      </a>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    longlist: {
      type: Boolean
    },
    type: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['PERSONAL_DATA', 'CURRENT_ORDERS', 'HISTORY_ORDERS'])
  },
  created () {
    this.reloadAllUserOrders()
  },
  methods: {
    async logout () {
      await this.$store.dispatch('LOG_OUT', this.$cookies)
      this.$store.commit('CLEAR_PERSONAL_DATA')
      await this.$router.push(this.localePath('index'))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.svg_promo {
    height: 20px;
    opacity: 0.3;
    filter: grayscale(1);
}
.span_cart {
    border: none;
}

.pages {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    width: 100%;
    background-color: $bgc-light;

    /*@media screen and (min-width: 992px) {
      border: 1px solid $c-line;
      width: 250px;
      min-width: 250px;
      overflow: hidden;
    }*/

    &-item {
        display: flex;
        align-items: center;

        width: 100%;

        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #11100029;
        border: 1px solid $c-line;
        border-radius: 7px;
        cursor: pointer;
        @media screen and (min-width: 992px) {
            background: transparent;
            box-shadow: none;
            border: none;
            border-radius: 0;
        }
        &.active {
            background: $orange 0% 0% no-repeat padding-box;
            border-top: 1px solid $orange !important;
            a {
                color: $c-light;
            }
            svg {
                fill: $c-light;
            }
        }
        &:not(:first-child) {
            margin-top: 10px;

            @media screen and (min-width: 992px) {
                margin-top: 0;
                border-top: {
                    width: 1px;
                    style: solid;
                    color: $c-line;
                }
            }
        }

        &:hover {
            background-color: $orange;
            border-top: 1px solid $orange;
            span {
                border-color: $c-light;
            }
            img {
                filter: brightness(5);
                opacity: 1 !important;
            }
            svg {
                fill: $c-light;
            }
            a {
                color: $c-light;
            }
        }

        &.logout {
            display: none;

            @media screen and (min-width: 992px) {
                display: flex;
            }
        }
    }

    &-href {
        padding: 5px 10px;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-column-gap: 5px;
        align-items: center;
        width: 100%;

        @media screen and (min-width: 992px) {
            grid-template-columns: auto 1fr auto;
        }
    }

    &-icon {
        display: none;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
        padding: 3px;
        border: {
            width: 1px;
            style: solid;
            color: $c-line;
            radius: 50%;
        }
        width: 30px;
        height: 30px;

        @media screen and (min-width: 992px) {
            display: flex;
        }

        svg {
            width: 100%;
            height: 100%;
            fill: $c-line;
        }
    }

    &-text {
        font-family: $ff-gilroy;
        font-size: 14px;
        word-wrap: none;
    }

    &-arrow {
        display: flex;
        align-items: center;
        flex: 0 0 10px;
        width: 10px;
        height: 10px;

        svg {
            width: 100%;
            height: 100%;
            fill: $c-primary;
        }
    }
}
</style>
