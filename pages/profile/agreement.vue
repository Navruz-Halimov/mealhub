<i18n>
{
  "en": {
    "title": "User Agreement",
    "mobileTitle":"FAQ",
    "phone": "Phone number",
    "popupErrorMessage": "Oops,error occured when deleting Your service",
    "popupSuccessDeleteMessage": "Deleted successfuly",
    "popupDeleteMessage": "Are you sure you want to delete?",
    "favoriteDeleted":"Successfully Deleted!",
    "mobileMenuLabelFavorite": "Catering points",
    "mobileMenuLabelFavoriteMeal": "Dishes",
     "selectTheme":"Select a topic"

  },

  "ru": {
    "title": "Пользовательское соглашение",
    "mobielTitle":"Часто задаваемые вопросы",
    "phone": "Номер телефона",
    "popupErrorMessage": "К сожалению, при удалении избранного произошла ошибка",
    "popupSuccessDeleteMessage": "Успешно удалено!",
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "favoriteDeleted":"Успешно удалено!",
    "mobileMenuLabelFavorite": "Избранные заведения",
    "mobileMenuLabelFavoriteMeal": "Избранные блюда",
    "selectTheme":"Выбрать тему"
  }
}
</i18n>

<template>
  <main class="main service_page">
    <div class="main_body">
      <div class="menucontainernew">
        <MainActions :current-action="''" class="gbadfgadfgadsg desktop" @select-action="selectOrdersMenuAction" />
        <nav class="main_menu">
          <div class="main_menu-back">
            <addition-back />
          </div>
          <menu-service-view :active-link="activeLink" />
        </nav>
      </div>

      <!-- SECTION FOR MOBILE -->
      <section v-if="isMobile" class="service mobile">
        <div class="service-back">
          <addition-back :stricted="true" @click-handler="goToBack" />
        </div>
        <header v-if="currentStep === 0" class="service_header">
          <h1 class="service-title mt-3">
            {{ $t('title') }}
          </h1>
        </header>
        <main class="service__mobile-body">
          <span class="service__mobile-body-bold">1. Термины и определения</span> <br>
          1.1.В целях настоящего документа нижеприведенные термины используются в следующем значении: <br>
          «Сайт» – ….ru, принадлежащий ООО «Гринвэй». <br>
          «Приложение EatMe» — программа «EatMe» для мобильных устройств, предоставляемая Пользователям на условиях <br>
          Лицензионного соглашения на использование программы «EatMe» для мобильных устройств, выложенного в открытом доступе в сети Интернет по адресу: https://.... «Сервис EatMe, Сервис» — означает все веб-сайты (включая, но не ограничиваясь, размещенными в сети Интернет по адресу: http://.....), программы для ЭВМ (в том числе Приложение EatMe) и ООО «Гринвэй» или его аффилированных лиц, предоставляющие Пользователю Сервиса возможность осуществить Заказ товаров и/или услуг и Доставки на условиях, предусмотренных в Пользовательском соглашении. «ТОП (точка общественного питания)» — юридическое лицо или индивидуальный предприниматель, осуществляющее (ий) деятельность по продаже Товара и/или приготовление Товара и/или оказание услуг Пользователям Сервиса при оформлении ими Заказа, а также осуществляющее(ий) Доставку Товара Пользователям Сервиса в случае, когда соответствующая возможность предусмотрена на Сервисе; «Пользователь» — лицо, использующее Сервис на условиях, предусмотренных в Пользовательском соглашении, с целью осуществить Заказ товаров и/или услуг и Доставки или только Товара/услуги с условием самовывоза из ТОПа. «Авторизованный пользователь» — Пользователь, авторизовавшийся на Сервисе посредством ввода номера мобильного телефона и кода подтверждения, направленного ему на мобильный телефон и на указанный им адрес электронной почты «Личный кабинет» - учетная запись Пользователя на Сайте, в Мобильном приложении, которая содержит персональные данные Пользователя, определяемые в соответствии с Политикой обработки персональных данных, а также иную информацию, связанную с использованием Сайта, Мобильного приложения, доступную после регистрации на Сайте, в Мобильном приложении. «Заказ» — оформленный Пользователем на Сервисе заказ Товара/услуги и Доставки или только Товара и/или услуги, в результате которого Пользователь заключает договор о приготовлении и/или реализации Товара и/или услуги с ТОПом, и договор доставки данного Товара с Доставщиком (или, в случае осуществления Доставки ТОПом, — с ТОПом) на условиях, определенных ТОПом и/или Доставщиком и размещенных на Сервисе; «Договор» — договор реализации (купли-продажи) и/или о приготовлении Товара/услуги с ТОПом, и/или договор доставки 1.1.В целях настоящего документа нижеприведенные термины используются в следующем значении: «Сайт» – ….ru, принадлежащий ООО «Гринвэй». «Приложение EatMe» — программа «EatMe» для мобильных устройств, предоставляемая Пользователям на условиях Лицензионного соглашения на использование программы «EatMe» для мобильных устройств, выложенного в открытом доступе в сети Интернет по адресу: https://.... «Сервис EatMe, Сервис» — означает все веб-сайты (включая, но не ограничиваясь, размещенными в сети Интернет по адресу: http://.....), программы для ЭВМ (в том числе Приложение EatMe) и ООО «Гринвэй» или его аффилированных лиц, предоставляющие Пользователю Сервиса возможность осуществить Заказ товаров и/или услуг и Доставки на условиях, предусмотренных в
          Пользовательском соглашении. «ТОП (точка общественного питания)» — юридическое лицо или индивидуальный предприниматель, осуществляющее (ий) деятельность по продаже Товара и/или приготовление Товара и/или оказание услуг Пользователям Сервиса при оформлении ими Заказа, а также осуществляющее(ий) Доставку Товара Пользователям Сервиса в случае, когда соответствующая возможность предусмотрена на Сервисе; «Пользователь» — лицо, использующее Сервис на условиях, предусмотренных в Пользовательском соглашении, с целью осуществить Заказ товаров и/или услуг и Доставки или только Товара/услуги с условием самовывоза из ТОПа. «Авторизованный пользователь» — Пользователь, авторизовавшийся на Сервисе посредством ввода номера мобильного телефона и кода подтверждения, направленного ему на мобильный телефон и на указанный им адрес электронной почты «Личный кабинет» - учетная запись Пользователя на Сайте, в Мобильном приложении, которая содержит персональные «Пользователь» — лицо, использующее Сервис на условиях, предусмотренных в Пользовательском соглашении, с целью осуществить Заказ товаров и/или услуг и Доставки или только Товара/услуги с условием самовывоза из ТОПа. «Авторизованный пользователь» — Пользователь, авторизовавшийся на Сервисе посредством ввода номера мобильного телефона и кода подтверждения, направленного ему на мобильный телефон и на указанный им адрес электронной почты «Личный кабинет» - учетная запись Пользователя на Сайте, в Мобильном приложении, которая содержит персональные
        </main>
      </section>
      <!-- SECTION FOR DESKTOP -->
      <section v-else class="service desktop">
        <header class="service_header">
          <div class="service_header-inner">
            <h1 class="service-title">
              {{ $t('title') }}
            </h1>
          </div>
          <!-- /.service_header-top -->
        </header>
        <!-- /.service__list -->
        <main class="service__body">
          <span class="service__body-bold">1. Термины и определения</span> <br>
          1.1.В целях настоящего документа нижеприведенные термины используются в следующем значении: <br>
          «Сайт» – ….ru, принадлежащий ООО «Гринвэй». <br>
          «Приложение EatMe» — программа «EatMe» для мобильных устройств, предоставляемая Пользователям на условиях <br>
          Лицензионного соглашения на использование программы «EatMe» для мобильных устройств, выложенного в открытом доступе в сети Интернет по адресу: https://.... «Сервис EatMe, Сервис» — означает все веб-сайты (включая, но не ограничиваясь, размещенными в сети Интернет по адресу: http://.....), программы для ЭВМ (в том числе Приложение EatMe) и ООО «Гринвэй» или его аффилированных лиц, предоставляющие Пользователю Сервиса возможность осуществить Заказ товаров и/или услуг и Доставки на условиях, предусмотренных в Пользовательском соглашении. «ТОП (точка общественного питания)» — юридическое лицо или индивидуальный предприниматель, осуществляющее (ий) деятельность по продаже Товара и/или приготовление Товара и/или оказание услуг Пользователям Сервиса при оформлении ими Заказа, а также осуществляющее(ий) Доставку Товара Пользователям Сервиса в случае, когда соответствующая возможность предусмотрена на Сервисе; «Пользователь» — лицо, использующее Сервис на условиях, предусмотренных в Пользовательском соглашении, с целью осуществить Заказ товаров и/или услуг и Доставки или только Товара/услуги с условием самовывоза из ТОПа. «Авторизованный пользователь» — Пользователь, авторизовавшийся на Сервисе посредством ввода номера мобильного телефона и кода подтверждения, направленного ему на мобильный телефон и на указанный им адрес электронной почты «Личный кабинет» - учетная запись Пользователя на Сайте, в Мобильном приложении, которая содержит персональные данные Пользователя, определяемые в соответствии с Политикой обработки персональных данных, а также иную информацию, связанную с использованием Сайта, Мобильного приложения, доступную после регистрации на Сайте, в Мобильном приложении. «Заказ» — оформленный Пользователем на Сервисе заказ Товара/услуги и Доставки или только Товара и/или услуги, в результате которого Пользователь заключает договор о приготовлении и/или реализации Товара и/или услуги с ТОПом, и договор доставки данного Товара с Доставщиком (или, в случае осуществления Доставки ТОПом, — с ТОПом) на условиях, определенных ТОПом и/или Доставщиком и размещенных на Сервисе; «Договор» — договор реализации (купли-продажи) и/или о приготовлении Товара/услуги с ТОПом, и/или договор доставки 1.1.В целях настоящего документа нижеприведенные термины используются в следующем значении: «Сайт» – ….ru, принадлежащий ООО «Гринвэй». «Приложение EatMe» — программа «EatMe» для мобильных устройств, предоставляемая Пользователям на условиях Лицензионного соглашения на использование программы «EatMe» для мобильных устройств, выложенного в открытом доступе в сети Интернет по адресу: https://.... «Сервис EatMe, Сервис» — означает все веб-сайты (включая, но не ограничиваясь, размещенными в сети Интернет по адресу: http://.....), программы для ЭВМ (в том числе Приложение EatMe) и ООО «Гринвэй» или его аффилированных лиц, предоставляющие Пользователю Сервиса возможность осуществить Заказ товаров и/или услуг и Доставки на условиях, предусмотренных в
          Пользовательском соглашении. «ТОП (точка общественного питания)» — юридическое лицо или индивидуальный предприниматель, осуществляющее (ий) деятельность по продаже Товара и/или приготовление Товара и/или оказание услуг Пользователям Сервиса при оформлении ими Заказа, а также осуществляющее(ий) Доставку Товара Пользователям Сервиса в случае, когда соответствующая возможность предусмотрена на Сервисе; «Пользователь» — лицо, использующее Сервис на условиях, предусмотренных в Пользовательском соглашении, с целью осуществить Заказ товаров и/или услуг и Доставки или только Товара/услуги с условием самовывоза из ТОПа. «Авторизованный пользователь» — Пользователь, авторизовавшийся на Сервисе посредством ввода номера мобильного телефона и кода подтверждения, направленного ему на мобильный телефон и на указанный им адрес электронной почты «Личный кабинет» - учетная запись Пользователя на Сайте, в Мобильном приложении, которая содержит персональные «Пользователь» — лицо, использующее Сервис на условиях, предусмотренных в Пользовательском соглашении, с целью осуществить Заказ товаров и/или услуг и Доставки или только Товара/услуги с условием самовывоза из ТОПа. «Авторизованный пользователь» — Пользователь, авторизовавшийся на Сервисе посредством ввода номера мобильного телефона и кода подтверждения, направленного ему на мобильный телефон и на указанный им адрес электронной почты «Личный кабинет» - учетная запись Пользователя на Сайте, в Мобильном приложении, которая содержит персональные
        </main>
      </section>

      <div class="main_news">
        <MainNews />
      </div>
    </div>
  </main>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  layout: 'primary',
  middleware: 'auth-home',
  data () {
    return {
      search: '',
      currentStep: 0,
      isActive: null
    }
  },

  beforeRouteLeave (to, from, next) {
    this.$store.commit('CLEAR_NOTIFICATIONS')
    this.$store.dispatch('CLOSE_GLOBAL_POPUPS')

    next()
  },

  computed: {
    // ...mapGetters(['PERSONAL_DATA']),
    activeLink () {
      console.log(this.$route.path)
      if (this.$route.path.indexOf('serviceProvided') + 1) {
        return 'serviceProvided'
      } else if (this.$route.path.indexOf('agreement') + 1) {
        return 'agreement'
      } else if (this.$route.path.indexOf('license') + 1) {
        return 'license'
      } else if (this.$route.path.indexOf('privacy') + 1) {
        return 'privacy'
      }
      return 'service'
    }
  },
  beforeCreate () {
    this.$nextTick(() => this.$nuxt.$loading.start())
  },
  async created () {
    // await this.$store.dispatch('GET_PERSONAL_DATA', this.$cookies)
  },
  mounted () {
    this.tryFinishLoading()
  },
  methods: {
    toggleList (index) {
      this.isActive = this.isActive === index ? null : index
    },
    tryFinishLoading () {
      if (this.PERSONAL_DATA) {
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
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
.slide-enter-active {
    transition: opacity 0.5s;
}
/deep/ {
    .vs__dropdown-menu {
        left: -2px !important;
    }
    .vs__dropdown-menu > .vs__dropdown-option--highlight {
        &:not(.vs__dropdown-option--selected) {
            background: $hover !important;
            color: $dark !important;
        }
    }
    .vs__dropdown-menu > .vs__dropdown-option--selected {
        background: #f3bd44 !important;
        color: white;
    }
}
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
.service {
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
    &__body {
        font-family: $ff-gilroy;
        font-style: normal;
        font-size: 14px;
        line-height: 17px;
        overflow: auto;
        color: #111111;
        max-width: 826px;
        padding-right: 5px;
        &-bold {
            font-weight: bold;
        }
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
            font-size: 16px;
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
}
.service.mobile {
    min-height: auto;

    .service {
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
        &__mobile-body {
            font-size: 14px;
            line-height: 17px;
            color: #111111;
            &-bold {
                font-weight: bold;
            }
        }
    }
}
</style>
