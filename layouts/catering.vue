<template>
  <div ref="wrapper" class="wrapper">
    <div class="wrapper-container">
      <Header ref="header" />
      <main class="main catering">
        <div class="main_body">
          <div class="menucontainernew">
            <MainActions
              :current-action="''"
              class="gbadfgadfgadsg desktop"
              @select-action="selectOrdersMenuAction"
            />
            <nav class="main_menu">
              <div class="main_menu-back">
                <addition-back />
              </div>
              <menu-catering-view
                :active-link="activeLink"
                :catering-id="$route.params.id"
                :menu-count="
                  !$_.isNil(CURRENT_CATERING) ? CURRENT_CATERING.dishesCount : 0
                "
                :reviews-count="
                  !$_.isNil(CURRENT_CATERING_REVIEWS_DETAILS)
                    ? CURRENT_CATERING_REVIEWS_DETAILS.total_count
                    : 0
                "
              />
            </nav>
          </div>

          <Nuxt />

          <div class="main_news">
            <MainNews />
          </div>
          <!-- mobile News -->
          <MainNewsMobile v-if="isMobile" />
        </div>
      </main>
      <Footer />
    </div>

    <Notifications />
    <Popups />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    activeLink () {
      if (this.$route.path.indexOf('menu') + 1) {
        return 'menu'
      }

      if (this.$route.path.indexOf('cart') + 1) {
        return 'cart'
      }

      if (this.$route.path.indexOf('reviews') + 1) {
        return 'reviews'
      }

      return 'about'
    },
    ...mapGetters([
      'CURRENT_CATERING',
      'CURRENT_CATERING_REVIEWS_DETAILS',
      'IS_AUTHORIZATION'
    ])
  },

  async mounted () {
    const id = this.$router.currentRoute.params.id
    const cookiz = this.$cookies

    await this.$store.dispatch('GET_CURRENT_CATERING', { cookiz, id })

    if (this.CURRENT_CATERING && this.CURRENT_CATERING.id) {
      this.$store.dispatch('GET_CURRENT_CATERING_MENU_CATEGORIES', {
        cookiz,
        id
      })

      if (this.IS_AUTHORIZATION) {
        this.$store.dispatch('GET_CURRENT_CATERING_REVIEWS', { cookiz, id })
        this.$store.dispatch('GET_PERSONAL_DATA', cookiz)
        this.$store.dispatch('GET_ORDER_TYPES', { cookiz, id })
      }
    }
    this.$subscribe()
  },
  beforeDestroy () {
    this.$unsubscribe()
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';
@import '~/assets/styles/index';
@import '~/assets/styles/modificator';

.main_menu {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  flex: 1 0 17vw !important;
}

.menucontainernew {
  grid-area: menu !important;
  display: flex !important;
  flex-direction: column !important;
}

.gbadfgadfgadsg {
  height: 5rem !important;
  margin-bottom: 5px !important;
  width: 98% !important;
}

@media screen and (max-width: 991px) {
  .main_menu {
    display: none !important;
  }

  .main_body {
    min-height: 100vh;
    min-height: calc(var(--vh) * 100);
    height: auto;
  }
}

.wrapper {
  &-container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    overflow: hidden;
    height: auto;
    min-height: 100vh;
    min-height: calc(var(--vh) * 100);

    @media screen and (min-width: 992px) {
      display: grid;
      grid-template-rows: 80px 1fr 108px;
      grid-template-areas: 'header' 'main' 'footer';
      grid-row-gap: 10px;
      height: 100vh;
      height: calc(var(--vh) * 100);
    }
  }
}

.main {
  grid-area: main;
  height: 100%;

  &.catering {
    height: initial;
  }

  @media screen and (min-width: 992px) {
    width: 100vw;
    overflow: hidden;
  }

  &_body {
    position: relative;
    width: 100%;

    @media screen and (min-width: 992px) {
      position: relative;
      display: flex;
      //grid-template-columns: 17% 69% 14%;
      //grid-template-areas: 'menu body news';
      //grid-column-gap: 5px;
      padding: 0 $p-side;
      height: 100%;
    }
  }

  &_menu {
    grid-area: menu;
    display: none;
    grid-template-rows: auto 1fr;
    border-radius: $br-block-desktop;
    background-color: $c-light;

    @media screen and (min-width: 992px) {
      display: grid;
      width: 19vw;
      flex: 0 0 19vw;
      margin-right: 5px;
    }
    @media screen and (min-width: 1080px) {
      width: 17vw;
      flex: 0 0 17vw;
    }

    &-back {
      position: relative;
      top: 0;
      left: 10px;
      /deep/ .link-back {
        margin-top: 2px;
        margin-bottom: 2px;
        font-size: 10px !important;
      }

      @media screen and (max-width: 991px) {
        position: absolute;
        top: 10px;
        font-size: 14px !important;
      }
    }
  }

  &_news {
    grid-area: news;
    position: absolute;
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @media screen and (min-width: 992px) {
      display: flex;
      position: relative;
      width: 250px;
      min-width: 250px;
      margin-left: 5px;
    }
  }
}

.cateringMenu {
  grid-area: body;
  display: flex;
  border-radius: 0;
  background-color: $c-light;
  height: 100%;
  overflow: hidden;

  @media screen and (max-width: 991px) {
    min-height: 70vh;
    min-height: calc(var(--vh) * 70);
  }
  @media screen and (min-width: 992px) {
    position: relative;
    border-radius: $br-block-desktop;
    // overflow: auto;
    width: 69%;
  }

  &_wrap {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-row-gap: 20px;
    padding: 10px 20px;
    width: 100%;

    @media screen and (max-width: 991px) {
      padding-top: 0;
    }

    @media screen and (min-width: 992px) {
      grid-auto-rows: minmax(min-content, max-content);
      grid-row-gap: 20px;
      padding-top: 10px;
    }
  }

  &-back {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 9;

    @media screen and (max-width: 991px) {
      font-size: 14px !important;
    }
    @media screen and (min-width: 992px) {
      display: none;
    }
  }

  &_body {
    overflow: auto;
  }

  &-title {
    font-family: $ff-roboto;
    font-size: 18px;
    font-weight: bold;
    color: $c-green;
    @media screen and (min-width: 992px) {
      display: none;
    }
  }

  &-name {
    grid-area: name;
    width: 70%;
    font-family: $ff-gilroy;
    font-size: 12px;
    color: $c-secondary;
    text-align: center;

    @media screen and (min-width: 992px) {
      width: 100%;
      font-family: $ff-roboto;
      font-size: 18px;
      font-weight: bold;
      color: $c-secondary;
      text-align: left;
    }
  }

  &_list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(min-content, max-content);
    grid-gap: 10px;
    padding-bottom: 20px;

    @media screen and (min-width: 992px) {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 20px;
    }
    @media screen and (min-width: 1900px) {
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 10px;
    }

    &-item {
      position: relative;
      width: 100%;
      height: 100px;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;

      @media screen and (min-width: 992px) {
        height: 150px;
      }

      &-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &-title {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 35px;
        background-color: rgba(255, 255, 255, 0.8);
        font-family: $ff-roboto;
        font-size: 14px;
        color: $c-green;

        @media screen and (min-width: 992px) {
          height: 50px;
          font-family: $ff-gilroy;
          font-size: 14px;
          color: $c-secondary;
        }
      }
    }
  }
}

@media screen and (min-width: 1125px) and (max-width: 1400px) {
  .cateringMenuDishes_list {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}
@media screen and (min-width: 992px) and (max-width: 1124px) {
  .cateringMenuDishes_list {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

.cateringMenuDishes {
  &_list {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(min-content, max-content);
    grid-row-gap: 10px;
    padding-bottom: 20px;
    width: calc(100% - 3px);

    @media screen and (min-width: 992px) {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 20px;
    }
    @media screen and (min-width: 1900px) {
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 10px;
    }
  }

  &_item {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    min-height: 105px;
    border: {
      width: 1px;
      style: solid;
      color: $c-line;
      radius: 5px;
    }
    overflow: hidden;

    @media screen and (min-width: 992px) {
      flex-direction: column;
      grid-template-columns: 100%;
      grid-template-rows: 60% 40%;
      grid-column-gap: 0;
      height: auto;
    }

    &.promotion {
      border-width: 2px;
      border-color: $c-promotion;

      .cateringMenuDishes_item {
        &-imagePromotion {
          @media screen and (min-width: 992px) {
            display: block;
          }
        }

        &-title {
          span {
            display: inline-block;
          }
        }
        &-price {
          color: $c-promotion;
        }
      }
    }

    &_header {
      position: relative;
      height: 144px; /* 16:10 */
    }

    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
    }

    &_actions {
      position: absolute;
      top: 0;
      left: 0;
      display: grid;
      grid-template-columns: repeat(2, auto);
      grid-column-gap: 5px;
      align-items: center;
      margin: 5px;
    }

    &-action {
      display: flex;
      justify-content: center;
      align-items: center;
      border: {
        width: 1px;
        style: solid;
        color: $green;
        radius: 50%;
      }
      padding: 5px;
      width: 30px;
      height: 30px;
      background-color: rgba(255, 255, 255, 0.8);
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @media screen and (min-width: 992px) {
        padding: 8px;
        width: 32px;
        height: 32px;
        background-color: rgba(255, 255, 255, 1);
      }
    }

    &-imagePromotion {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
      margin: 5px;
      width: 50px;
      height: 50px;
      object-fit: cover;
    }

    &_body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 5px 5px 0;
      background-color: $light;

      @media screen and (min-width: 992px) {
        flex-grow: 1;
      }
    }

    &_footer {
      display: grid;
      grid-template-columns: 5fr 1fr auto;
      grid-column-gap: 5px;
      align-items: center;
      @media screen and (min-width: 992px) {
        grid-template-columns: 3fr 1fr 1fr;
      }
    }

    &-title {
      position: relative;
      font-family: $ff-gilroy;
      font-size: 14px;
      font-weight: 300;
      color: $c-secondary;
      word-wrap: break-word;
      min-height: 3em;
      line-height: 20px;

      @media screen and (max-width: 991px) {
        margin: 0;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      span {
        display: none;
        font-family: $ff-roboto;
        color: $c-promotion;
      }
    }

    &_counter {
      display: flex;
      align-items: center;
    }

    &-arrow {
      margin-top: 5px;
      margin-left: 3px;
      flex: 0 0 15px;
      width: 15px;
      height: 20px;
      object-fit: contain;
      cursor: pointer;

      &.left {
        margin-left: 0;
        margin-right: 3px;
        transform: rotate(180deg);
      }
    }

    &-count {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-image: url('/icons/catering/new/dinner-grey.svg');
      background-repeat: no-repeat;
      background-size: cover;
      font-family: $ff-roboto;
      font-weight: bold;
      font-size: 12px;
      color: $c-secondary;
    }

    &-add {
      display: flex;
      justify-content: center;
      align-items: center;
      border: {
        radius: 50%;
      }
      padding: 0;
      background-color: $light;
      height: 31px;
      flex: 0 0 31px;
      width: 31px;
      img {
        flex: 0 0 31px;
        width: 31px;
        height: 31px;
      }
    }

    &-delete {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: $orange;
      height: 31px;
      min-height: 31px !important;
      padding: 7px !important;
      flex: 0 0 31px;
      max-width: 31px;

      img {
        flex: 0 0 15px;
        width: 15px;
        height: 17px;
      }
    }

    &-price {
      font-family: $ff-roboto;
      font-weight: bold;
      font-size: 14px;
      color: $c-green;
    }
  }
}
</style>
