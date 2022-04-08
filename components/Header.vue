<i18n>
{
  "en": {
    "logo-subtitle": "food in touch"
  },
  "ru": {
    "logo-subtitle": "на связи с едой"
  }
}
</i18n>

<template>
  <header class="header">
    <div class="header_logo">
      <!--      <Logo />-->
      <div class="header_logo-logo">
        <AnimatedLogo :is-logo="true" />
      </div>
      <!-- <h2 class="header_logo-title">
        Meal Hub<span class="header_logo-subtitle">{{ $t('logo-subtitle') }}!</span>
      </h2> -->
    </div>
    <div class="header_info" :class="{ auth: IS_AUTHORIZATION }">
      <basic-link-register v-if="!IS_AUTHORIZATION" />
      <basic-link-login v-if="!IS_AUTHORIZATION" />
      <div v-if="IS_AUTHORIZATION" class="header_offers">
        <list-offer v-if="loaded_offers" />
      </div>
      <div v-else class="desktop" />
      <div v-if="IS_AUTHORIZATION" class="flex j_e">
        <b class="header_cart flex a_c">
          <img
            :src="
              CART_ITEMS && CART_ITEMS.length
                ? '/icons/_new/header_cart_red.svg'
                : '/icons/_new/header_cart.svg'
            "
            alt=""
            @click.stop="
              CART_ITEMS && CART_ITEMS.length
                ? $router.push(localePath({ path: `/profile/cart` }))
                : false
            "
          >

          <span class="header_cart_count">{{ CART_ITEMS.length }}</span>
        </b>
      </div>
    </div>
    <div class="header_addition">
      <div v-if="IS_AUTHORIZATION" class="header_user">
        <order-timer
          v-if="
            CURRENT_ORDER &&
              CURRENT_ORDER.status &&
              CURRENT_ORDER.status !==
              'finished' /* && orderHasTimer(CURRENT_ORDER)*/
          "
          :inheader="true"
          :item="CURRENT_ORDER"
        />
        <order-timer
          v-else-if="CURRENT_ORDERS && CURRENT_ORDERS[0]"
          :inheader="true"
          :item="CURRENT_ORDERS[0]"
        />
        <order-timer v-else :inheader="true" :disabled="true" />
        <img
          v-if="IS_AUTHORIZATION"
          class="header_user-avatar"
          :src="PERSONAL_DATA.photo || '/icons/consumables/user.svg'"
          alt=""
          @click.stop="toggleMenu"
        >

        <span class="header_user-noty">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M467.812,431.851l-36.629-61.056c-16.917-28.181-25.856-60.459-25.856-93.312V224c0-67.52-45.056-124.629-106.667-143.04 V42.667C298.66,19.136,279.524,0,255.993,0s-42.667,19.136-42.667,42.667V80.96C151.716,99.371,106.66,156.48,106.66,224v53.483 c0,32.853-8.939,65.109-25.835,93.291l-36.629,61.056c-1.984,3.307-2.027,7.403-0.128,10.752c1.899,3.349,5.419,5.419,9.259,5.419 H458.66c3.84,0,7.381-2.069,9.28-5.397C469.839,439.275,469.775,435.136,467.812,431.851z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M188.815,469.333C200.847,494.464,226.319,512,255.993,512s55.147-17.536,67.179-42.667H188.815z"
                />
              </g>
            </g>
          </svg>
        </span>
        <div class="header_user_menu">
          <list-page v-if="menuIsOpen" class="nav_list_page" :longlist="true" />
        </div>
      </div>
      <div class="header_language" :class="{ auth: IS_AUTHORIZATION }">
        <Language />
      </div>
      <template v-if="IS_AUTHORIZATION">
        <div class="mobile ml-1">
          <order-timer
            v-if="
              CURRENT_ORDER &&
                CURRENT_ORDER.status &&
                CURRENT_ORDER.status !== 'finished'
            "
            class="headermenutimer"
            :inheader="true"
            :item="CURRENT_ORDER"
          />
          <order-timer
            v-else-if="CURRENT_ORDERS && CURRENT_ORDERS[0]"
            class="headermenutimer"
            :inheader="true"
            :item="CURRENT_ORDERS[0]"
          />
          <order-timer
            v-else
            class="headermenutimer"
            :inheader="true"
            :disabled="true"
          />
          <span class="header-burger cursor-pointer" @click.stop="toggleMenu">
            <span class="mobile_header_user-noty">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      fill="#ccc"
                      d="M467.812,431.851l-36.629-61.056c-16.917-28.181-25.856-60.459-25.856-93.312V224c0-67.52-45.056-124.629-106.667-143.04 V42.667C298.66,19.136,279.524,0,255.993,0s-42.667,19.136-42.667,42.667V80.96C151.716,99.371,106.66,156.48,106.66,224v53.483 c0,32.853-8.939,65.109-25.835,93.291l-36.629,61.056c-1.984,3.307-2.027,7.403-0.128,10.752c1.899,3.349,5.419,5.419,9.259,5.419 H458.66c3.84,0,7.381-2.069,9.28-5.397C469.839,439.275,469.775,435.136,467.812,431.851z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      fill="#ccc"
                      d="M188.815,469.333C200.847,494.464,226.319,512,255.993,512s55.147-17.536,67.179-42.667H188.815z"
                    />
                  </g>
                </g>
              </svg>
            </span>
            <img src="/icons/headermenu.svg">
          </span>
        </div>
      </template>
    </div>
    <div class="header_menu_wrap" :class="{ open: menuIsOpen }" @click.stop>
      <MenuMobile @menu-close="toggleMenu" />
      <div
        class="header_menu_blure"
        :class="{ open: menuIsOpen }"
        @click="toggleMenu"
      />
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      menuIsOpen: false,
      loaded_offers: false
    }
  },
  computed: {
    ...mapGetters(['CART_ITEMS', 'CURRENT_ORDERS'])
  },
  watch: {
    'PERSONAL_DATA.current_order' () {
      this.systemTime++
    },
    CURRENT_ORDER () {
      this.systemTime++
    },
    systemTime (val) {
      if (val % 20 === 0) {
        this.loadPersonalData()
      }
    }
  },
  mounted () {
    const vm = this
    vm.loaded_offers = true
    vm.loadPersonalData()
    this.$parent.$el.addEventListener('click', () => {
      if (vm.menuIsOpen) {
        vm.closeMenu()
      }
    })
  },
  methods: {
    toggleMenu () {
      this.menuIsOpen = !this.menuIsOpen
      if (this.menuIsOpen && this.isMobile) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    },
    closeMenu () {
      this.menuIsOpen = false
    }
  }
}
</script>

<style lang="scss">
.mobile_header_user-noty {
  position: absolute;
  top: 1px;
  left: -1rem;
  width: 9px;
  height: 9px;
}
.headermenutimer .countdown_svg {
  width: 3.95rem !important;
  height: 3.95rem !important;
  margin-left: -0.6rem;
  margin-bottom: 3px;
}

@media screen and (min-width: 991px) {
  .header {
    padding-bottom: 0;
  }
}
@media screen and (min-width: 991px) {
  .header_user .countdown_svg {
    width: 55px !important;
    height: 55px !important;
  }
  .header_user .countdown_svg path {
    stroke-width: 2px;
  }
}
@media screen and (max-width: 991px) {
  .header_logo .logo {
    width: 92% !important;
    height: 68% !important;
    margin-left: 6% !important;
  }
}

.header_menu_wrap.open .menu {
  transform: translateX(0) !important;
}
.header_menu_wrap .menu {
  transform: translateX(-100vw);
  transition: transform 0.5s;
}
.nav_list_page .pages-item:first-child {
  border-top: {
    width: 1px;
    style: solid;
    color: transparent;
  }
}
</style>
<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/modificator';

@media screen and (max-width: 991px) {
  .header_info.auth {
    display: flex !important;
  }
  .header_cart {
    align-self: flex-end;
    margin-right: 0 !important;
    display: flex !important;
    align-items: center !important;
    height: 100% !important;
  }
  .header_cart img {
    width: 23px !important;
    height: 23px !important;
  }
  .header_cart .header_cart_count {
    top: 9px;
    right: -5px;
    left: initial;
    font-size: 11px;
  }
}

.header_cart {
  cursor: pointer;
  position: relative;
  padding: 4px 0;
  margin-right: 2rem;
  img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }
  &_count {
    position: absolute;
    top: 9px;
    left: 30px;
    font-size: 14px;
    line-height: 1em;
    color: white;
    font-weight: initial;
  }
}

.header {
  grid-area: header;
  position: relative;
  display: grid;
  grid-template-columns: 40px 4fr 48px;
  grid-template-rows: 100%;
  grid-column-gap: 10px;
  align-items: center;
  padding: 10px;
  width: 100vw;
  max-height: 20vh;
  max-height: calc(var(--vh) * 20);

  @media screen and (min-width: 992px) {
    grid-template-columns: 19vw auto 250px;
    grid-template-rows: 100%;
    grid-column-gap: 5px;
    padding: 10px $p-side 0 $p-side;
  }
  @media screen and (min-width: 1080px) {
    grid-template-columns: 17vw auto 250px;
  }

  &_logo {
    display: grid;
    grid-template-columns: 100%;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 40px;

    &-logo {
      width: 100%;
      max-width: 130px;
    }

    @media screen and (min-width: 992px) {
      display: flex;
      align-items: flex-end;
      width: 100%;
      height: 100%;
      max-height: 50px;
    }

    &-title {
      display: none;
      flex-direction: column;
      font-family: $ff-roboto;
      font-size: 20px;
      letter-spacing: 1.48px;
      line-height: 1.2;
      color: $c-light;

      @media screen and (min-width: 992px) {
        display: flex;
        margin-left: 1rem;
      }
    }

    &-subtitle {
      font-family: $ff-gilroy;
      font-size: 12px;
      font-weight: 300;
      letter-spacing: 0.89px;
    }
  }

  &_info {
    display: flex;
    justify-self: end;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    @media screen and (min-width: 992px) {
    }

    & > *:not(:first-child) {
      margin-left: 10px;
    }

    @media screen and (max-width: 992px) {
      & > .register {
        padding: 6px 22px !important;
      }

      & > .login {
        width: initial;
        min-height: 33px;
        height: 33px;
        padding: 6px 22px !important;
        background: transparent
          linear-gradient(270deg, #febf32 0%, #ff5f91 100%) 0% 0% no-repeat
          padding-box;
        box-shadow: 0px 3px 6px #ec608f40;
        font-weight: 300;
        font-family: $ff-gilroy;
        font-size: 14px !important;
        border-radius: 999px;
        color: $c-light !important;

        &:hover {
          cursor: pointer;
          background: #ec608f !important;
          box-shadow: none;
          color: $c-light !important;
        }
      }
    }

    &.auth {
      display: grid;
      grid-template-columns: 1fr;
      justify-content: start;

      @media screen and (min-width: 992px) {
        display: grid;
        grid-template-columns: 16fr 1fr;
        grid-column-gap: 15px;
        justify-content: start;
      }
    }
  }

  &_offers {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  &_user {
    justify-self: end;
    position: relative;
    z-index: 2;
    display: none;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 992px) {
      display: flex;
    }

    &-avatar {
      position: absolute;
      overflow: hidden;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
      display: block;
      width: 43px;
      height: 43px;
      top: 6px;
      left: 6px;
    }
    &_menu {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translateY(100%);

      border-radius: 6px;
      overflow: hidden;

      .nav_list_page {
        width: 250px;
        // border: 1px solid #e5e5e5;
      }
    }

    &-noty {
      align-self: flex-start;
      display: flex;
      align-items: center;
      margin-left: 5px;
      flex: 0 0 15px;
      width: 15px;
      height: 15px;

      @media screen and (max-width: 991px) {
        margin-left: 0;
        margin-top: 5px;
      }

      svg {
        width: 100%;
        height: 100%;
        fill: $c-line;
      }
    }
  }

  &_addition {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 991px) {
      &::before {
        position: absolute;
        top: calc(50% - 1.25rem);
        content: '';
        left: 0;
        height: 2.5rem;
        border-left: 1px solid $c-green;
      }
    }

    @media screen and (min-width: 992px) {
      justify-content: space-between;
      display: flex;
      padding-left: 14px;

      &::before {
        position: absolute;
        top: calc(50% - 1.75rem);
        content: '';
        left: 0;
        height: 3.5rem;
        border-left: 1px solid $c-green;
      }
    }
  }

  &_language {
    display: block;
    flex: 0 0 55%;

    @media screen and (min-width: 992px) {
      display: block;
    }

    &.auth {
      display: none;

      @media screen and (min-width: 992px) {
        display: block;
      }
    }
  }

  &-burger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 23px;

    position: absolute;
    top: 8px;
    left: 20px;

    @media screen and (min-width: 992px) {
      display: none;
    }

    svg {
      width: 100%;
      height: 100%;
      fill: $c-light;
    }
  }

  &_menu {
    &_wrap {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: -1;
      display: grid;
      grid-template-columns: 1fr auto;
      width: 100vw;
      height: 100%;
      overflow: hidden;

      @media screen and (min-width: 992px) {
        display: none;
      }

      &.open {
        z-index: 9999999;

        & .header_menu_blure {
          opacity: 1 !important;
        }
      }
    }

    &_blure {
      width: 50px;
      background-color: rgba(0, 0, 0, 0.6);
      opacity: 0;
      transition: all 0.5s;
      transition-delay: 0.5s;
    }
  }
}
</style>
