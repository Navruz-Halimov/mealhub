<i18n>
{
  "en": {
    "title": "Frequently asked Questions",
    "mobileTitle":"FAQ",
    "phone": "Phone number",
    "popupErrorMessage": "Oops,error occured when deleting Your help",
    "popupSuccessDeleteMessage": "Deleted successfuly",
    "popupDeleteMessage": "Are you sure you want to delete?",
    "favoriteDeleted":"Successfully Deleted!",
    "mobileMenuLabelFavorite": "Catering points",
    "mobileMenuLabelFavoriteMeal": "Dishes",
    "selectTheme":"Select a topic",
    "mobilehelp":"Help"

  },

  "ru": {
    "title": "Часто задаваемые вопросы",
    "mobileTitle":"Часто задаваемые вопросы",
    "phone": "Номер телефона",
    "popupErrorMessage": "К сожалению, при удалении избранного произошла ошибка",
    "popupSuccessDeleteMessage": "Успешно удалено!",
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "favoriteDeleted":"Успешно удалено!",
    "mobileMenuLabelFavorite": "Избранные заведения",
    "mobileMenuLabelFavoriteMeal": "Избранные блюда",
    "selectTheme":"Выбрать тему",
    "mobilehelp":"Помощь"
  }
}
</i18n>

<template>
  <main class="main help_page">
    <div class="main_body">
      <!-- SECTION FOR MOBILE -->
      <section class="help mobile">
        <div class="help-back">
          <addition-back :stricted="true" @click-handler="goToBack" />
        </div>
        <header class="help_header">
          <h1 class="help-title mt-3">
            {{ $t('mobilehelp') }}
          </h1>
        </header>

        <nav class="help__navbar">
          <div class="help__navbar-item" @click="setFaqVisible()">
            <span>Support servise</span>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.4401 7.24677L1.09844 12.8893C1.03518 12.9571 1 13.0464 1 13.1391C1 13.2319 1.03518 13.3212 1.09844 13.389C1.12853 13.4218 1.16511 13.4479 1.20585 13.4658C1.24659 13.4837 1.29061 13.493 1.33511 13.493C1.37961 13.493 1.42363 13.4837 1.46437 13.4658C1.50511 13.4479 1.54168 13.4218 1.57178 13.389L7.15177 7.49664C7.21504 7.4288 7.25021 7.33951 7.25021 7.24677C7.25021 7.15403 7.21504 7.06474 7.15177 6.9969L1.57219 1.10453C1.54204 1.07212 1.50564 1.04616 1.46518 1.02819C1.42472 1.01023 1.38104 1.00064 1.33678 1C1.29234 0.999983 1.24839 1.00928 1.20777 1.02728C1.16715 1.04529 1.13076 1.0716 1.10094 1.10453C1.03768 1.17237 1.0025 1.26166 1.0025 1.3544C1.0025 1.44714 1.03768 1.53643 1.10094 1.60427L6.4401 7.24677Z" fill="#5C5C5C" stroke="#5C5C5C" />
            </svg>
          </div>
          <div class="help__navbar-item" @click="setRedirectionPath('faq')">
            <span>FAQ</span>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.4401 7.24677L1.09844 12.8893C1.03518 12.9571 1 13.0464 1 13.1391C1 13.2319 1.03518 13.3212 1.09844 13.389C1.12853 13.4218 1.16511 13.4479 1.20585 13.4658C1.24659 13.4837 1.29061 13.493 1.33511 13.493C1.37961 13.493 1.42363 13.4837 1.46437 13.4658C1.50511 13.4479 1.54168 13.4218 1.57178 13.389L7.15177 7.49664C7.21504 7.4288 7.25021 7.33951 7.25021 7.24677C7.25021 7.15403 7.21504 7.06474 7.15177 6.9969L1.57219 1.10453C1.54204 1.07212 1.50564 1.04616 1.46518 1.02819C1.42472 1.01023 1.38104 1.00064 1.33678 1C1.29234 0.999983 1.24839 1.00928 1.20777 1.02728C1.16715 1.04529 1.13076 1.0716 1.10094 1.10453C1.03768 1.17237 1.0025 1.26166 1.0025 1.3544C1.0025 1.44714 1.03768 1.53643 1.10094 1.60427L6.4401 7.24677Z" fill="#5C5C5C" stroke="#5C5C5C" />
            </svg>
          </div>
          <div class="help__navbar-item" @click="setRedirectionPath('agreement')">
            <span>User Agreement</span>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.4401 7.24677L1.09844 12.8893C1.03518 12.9571 1 13.0464 1 13.1391C1 13.2319 1.03518 13.3212 1.09844 13.389C1.12853 13.4218 1.16511 13.4479 1.20585 13.4658C1.24659 13.4837 1.29061 13.493 1.33511 13.493C1.37961 13.493 1.42363 13.4837 1.46437 13.4658C1.50511 13.4479 1.54168 13.4218 1.57178 13.389L7.15177 7.49664C7.21504 7.4288 7.25021 7.33951 7.25021 7.24677C7.25021 7.15403 7.21504 7.06474 7.15177 6.9969L1.57219 1.10453C1.54204 1.07212 1.50564 1.04616 1.46518 1.02819C1.42472 1.01023 1.38104 1.00064 1.33678 1C1.29234 0.999983 1.24839 1.00928 1.20777 1.02728C1.16715 1.04529 1.13076 1.0716 1.10094 1.10453C1.03768 1.17237 1.0025 1.26166 1.0025 1.3544C1.0025 1.44714 1.03768 1.53643 1.10094 1.60427L6.4401 7.24677Z" fill="#5C5C5C" stroke="#5C5C5C" />
            </svg>
          </div>
          <div class="help__navbar-item" @click="setRedirectionPath('about')">
            <span>About</span>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.4401 7.24677L1.09844 12.8893C1.03518 12.9571 1 13.0464 1 13.1391C1 13.2319 1.03518 13.3212 1.09844 13.389C1.12853 13.4218 1.16511 13.4479 1.20585 13.4658C1.24659 13.4837 1.29061 13.493 1.33511 13.493C1.37961 13.493 1.42363 13.4837 1.46437 13.4658C1.50511 13.4479 1.54168 13.4218 1.57178 13.389L7.15177 7.49664C7.21504 7.4288 7.25021 7.33951 7.25021 7.24677C7.25021 7.15403 7.21504 7.06474 7.15177 6.9969L1.57219 1.10453C1.54204 1.07212 1.50564 1.04616 1.46518 1.02819C1.42472 1.01023 1.38104 1.00064 1.33678 1C1.29234 0.999983 1.24839 1.00928 1.20777 1.02728C1.16715 1.04529 1.13076 1.0716 1.10094 1.10453C1.03768 1.17237 1.0025 1.26166 1.0025 1.3544C1.0025 1.44714 1.03768 1.53643 1.10094 1.60427L6.4401 7.24677Z" fill="#5C5C5C" stroke="#5C5C5C" />
            </svg>
          </div>
        </nav>
      </section>
      <!-- <div class="main_news">
        <MainNews />
      </div> -->
    </div>
  </main>
</template>

<script>
export default {
  layout: 'primary',
  middleware: 'auth-home',
  data () {
    return {
      search: '',
      currentStep: 0
    }
  },

  beforeRouteLeave (to, from, next) {
    this.$store.commit('CLEAR_NOTIFICATIONS')
    this.$store.dispatch('CLOSE_GLOBAL_POPUPS')

    next()
  },
  watch: {
    isMobile (newValue) {
      console.log('newValue', newValue)
      if (!newValue) {
        this.$router.push(this.localePath({ path: '/profile/help' }))
      }
    }
  },
  beforeCreate () {
    this.$nextTick(() => this.$nuxt.$loading.start())
  },
  mounted () {
    setTimeout(() => this.$nuxt.$loading.finish(), 500)
  },
  methods: {
    setRedirectionPath (path) {
      if (path === 'faq') {
        this.$router.push(this.localePath({ path: '/profile/help' }))
      } else if (path === 'license') {
        this.$router.push(this.localePath({ path: '/profile/license' }))
      } else if (path === 'agreement') {
        this.$router.push(this.localePath({ path: '/profile/agreement' }))
      } else if (path === 'about') {
        this.$router.push(this.localePath({ path: '/profile/about' }))
      }
    },
    goback () {
      if (this.currentStep >= 1) {
        this.isFaqVisible = !this.isFaqVisible
        return this.isFaqVisible
      }
    },
    goToBack () {
      console.warn(this.currentStep)
      if (this.currentStep > 0) {
        this.selectStep(--this.currentStep)
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/classes/class';
@import '~/assets/styles/abstract/mixins';

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
.main_menu-back {
    position: relative;
    top: 0;
    left: 10px;
    @media screen and (max-width: 991px) {
        position: absolute;
        top: 10px;
        font-size: 14px !important;
    }
}
.help {
    position: relative;
    grid-area: body;
    grid-template-rows: auto 1fr;
    grid-row-gap: 20px;
    justify-items: center;
    background-color: $c-light;
    height: 100%;
    width: 100%;
    padding: 10px 20px;
    @media screen and (min-width: 992px) {
        border-radius: $br-block-desktop;
        padding: 20px 15px 20px 20px;
        border-radius: 4px;
    }
    &.mobile {
        display: grid;
        min-height: 100vh;
        min-height: calc(var(--vh) * 100);
        @media screen and (min-width: 992px) {
            display: none;
        }
    }
    &.desktop {
        display: none;
        @media screen and (min-width: 992px) {
            display: grid;
        }
    }
    &_header {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        &-actions {
            margin-top: 20px;
            max-width: 850px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        &-action-select {
            display: flex;
            align-items: center;
            .select {
                width: 240px;
            }
        }
        &-contact {
            font-family: $ff-gilroy;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 17px;
            color: $dark;
            margin-left: 20px;
            a {
                color: $bgc-green;
                white-space: nowrap;
                text-decoration: underline;
            }
        }
        /deep/ {
            .cuisineSearch {
                height: 40px !important;
            }
        }
    }
    &-title {
        width: 75%;
        font-family: $ff-roboto;
        font-size: 22px;
        font-weight: bold;
        color: $c-green;
        text-align: center;
        margin-bottom: 10px;
        @media screen and (max-width: 992px) {
            margin-bottom: 0 !important;
        }
        @media screen and (min-width: 992px) {
            color: $c-primary;
            width: auto;
        }
    }
    &_info {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        &-inner {
            display: flex;
            font-family: $ff-gilroy;
            font-size: 14px;
            // color: $c-green;
        }
        &-search {
            max-width: 150px;
        }
        @media screen and (min-width: 1090px) {
            &-search {
                max-width: 200px !important;
            }
        }
        @media screen and (min-width: 992px) {
            font-size: 14px;
            color: $c-primary;
        }
    }
    &-phone {
        display: none;
        margin-left: 10px;
        @media screen and (min-width: 992px) {
            display: inline-block;
        }
    }
    &-icon {
        margin-top: 10px;
        width: 60px;
        height: 60px;
        svg {
            fill: $c-green;
        }
        @media screen and (min-width: 992px) {
            display: none;
        }
        svg {
            width: 100%;
            height: 100%;
            fill: $c-green;
        }
    }
    &-id {
        display: none;
        @media screen and (min-width: 992px) {
            display: block;
        }
    }
    &__list {
        max-width: 850px;
        width: 100%;
        overflow: auto !important;
        &-item {
            border-bottom: 0.5px solid $c-icon-grey;
            font-size: 14px;
            line-height: 17px;
            font-family: $ff-gilroy;
        }
        &-title {
            color: #24a391;
            padding-top: 10px;
            padding-bottom: 10px;
            cursor: pointer;
        }
        &-subtitle {
            margin-bottom: 10px;
            font-family: $ff-gilroy;
            font-size: 14px;
            line-height: 17px;
            color: $dark;
        }
    }
}
.help.mobile {
    min-height: auto;

    .help {
        &_header {
            margin: 0;
        }
        &__navbar {
            width: 100%;
            &-item {
                font-family: $ff-gilroy;
                font-size: 14px;
                line-height: 17px;
                color: #111111;
                padding: 8px 10px;
                border: 1px solid #e2e2e2;
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
                border-radius: 6px;
                margin-bottom: 10px;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
        &__list,
        &__mobile-search,
        &__mobile-select {
            @media (max-width: 968px) {
                max-width: 800px !important;
            }
            @media (max-width: 768px) {
                max-width: 700px !important;
            }
            @media (max-width: 576px) {
                max-width: 350px !important;
            }
            @media (max-width: 320px) {
                max: width 280px !important;
            }
        }
        &-back {
            position: absolute;
            top: 10px;
            left: 10px;
            @media screen and (min-width: 992px) {
                display: none;
            }
            & /deep/ {
                .link-back {
                    font-size: 14px;
                    &-icon {
                        flex: 0 0 15px;
                        width: 15px;
                        height: 10px;
                    }
                }
            }
        }
    }
}
</style>
