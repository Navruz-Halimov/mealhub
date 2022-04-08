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
    "selectTheme":"Select a topic"

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
    "selectTheme":"Выбрать тему"
  }
}
</i18n>

<template>
  <main class="main help_page">
    <div class="main_body">
      <div class="menucontainernew">
        <MainActions :current-action="''" class="gbadfgadfgadsg desktop" @select-action="selectOrdersMenuAction" />
        <nav class="main_menu">
          <div class="main_menu-back">
            <addition-back />
          </div>
          <menu-faq-view :active-link="activeLink" />
        </nav>
      </div>

      <!-- SECTION FOR MOBILE -->
      <section v-if="isMobile" class="help mobile">
        <div class="help-back">
          <addition-back :stricted="true" @click="goback()" @click-handler="goToBack" />
        </div>
        <header v-if="currentStep === 0" class="help_header">
          <h1 class="help-title mt-3">
            {{ $t('mobileTitle') }}
          </h1>
        </header>
        <basic-input-profile-select v-model="gender" :is-searchable="true" :options="genders" :placeholder="$t('selectTheme')" class="help__mobile-select" />
        <BasicInputCateringMenuSearch v-model="search" :reviews="true" class="help__mobile-search" />
        <main class="help__mobile-questions">
          <ul class="help__list">
            <li v-for="(item, index) in filteredhelp" :key="index" class="help__list-item" @click="toggleList(index)">
              <div class="help__list-title">
                {{ item.title }}
              </div>
              <transition name="slide">
                <div v-if="isActive === index" class="help__list-subtitle">
                  {{ item.details }}
                </div>
              </transition>
            </li>
          </ul>
          <!-- /.help__list -->
        </main>
      </section>
      <!-- SECTION FOR DESKTOP -->
      <section v-else class="help desktop">
        <header class="help_header">
          <div class="help_header-inner">
            <h1 class="help-title">
              {{ $t('title') }}
            </h1>
            <div class="help_info">
              <div class="help_info-inner">
                <p class="help-id">
                  ID: {{ PERSONAL_DATA.id }}
                </p>
                <p v-if="~PERSONAL_DATA.phone.indexOf('+7')" class="help-phone ml-1">
                  {{ $t('phone') }}:
                  <span>{{ PERSONAL_DATA.phone.slice(0, 2) }}</span>
                  {{ parsePhone(PERSONAL_DATA.phone, 2) }}
                </p>
                <p v-else class="help-phone ml-1">
                  {{ $t('phone') }}:
                  <span>{{ PERSONAL_DATA.phone.slice(0, 3) }}</span>
                  {{ parsePhone(PERSONAL_DATA.phone) }}
                </p>
              </div>
            </div>
          </div>
          <!-- /.help_header-top -->
          <div class="help_header-actions">
            <div class="help_header-action-select">
              <basic-input-profile-select v-model="gender" :is-searchable="true" class="select" :options="genders" :placeholder="$t('selectTheme')" />
              <div class="help_header-contact">
                Не нашли свой вопрос? <br>
                <nuxt-link to="">
                  Напишите в службу поддержки
                </nuxt-link>
              </div>
            </div>
            <BasicInputCateringMenuSearch v-model="search" :reviews="true" class="help_info-search" />
          </div>
          <!-- /.help_header-inputs -->
        </header>
        <ul class="help__list">
          <li v-for="(item, index) in filteredhelp" :key="index" class="help__list-item" @click="toggleList(index)">
            <div class="help__list-title">
              {{ item.title }}
            </div>
            <transition name="slide">
              <div v-if="isActive === index" class="help__list-subtitle">
                {{ item.details }}
              </div>
            </transition>
          </li>
        </ul>
        <!-- /.help__list -->
      </section>

      <div class="main_news">
        <MainNews />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'primary',
  middleware: 'auth-home',
  data () {
    return {
      genders: ['lorem', 'ipsum', 'dolar', 'lorem ipsum', 'lorem ipsum dolar'],
      search: '',
      gender: '',
      currentStep: 0,
      isActive: null,
      items: [
        {
          title: 'Как пользоваться сайтом? Где найти инструкцию?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        },
        {
          title: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum"?',
          details: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
        }
      ]
    }
  },

  beforeRouteLeave (to, from, next) {
    this.$store.commit('CLEAR_NOTIFICATIONS')
    this.$store.dispatch('CLOSE_GLOBAL_POPUPS')

    next()
  },

  computed: {
    ...mapGetters(['PERSONAL_DATA']),
    filteredhelp () {
      return this.items.filter((item) => {
        return item.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    activeLink () {
      return 'help'
    }
  },
  beforeCreate () {
    this.$nextTick(() => this.$nuxt.$loading.start())
  },
  async created () {
    await this.$store.dispatch('GET_PERSONAL_DATA', this.$cookies)
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
