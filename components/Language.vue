<i18n>
{
  "en": {
    "lang-title": "En",
    "lang-icon": "en"
  },
  "ru": {
    "lang-title": "Ru",
    "lang-icon": "ru"
  }
}
</i18n>

<template>
  <div class="lang">
    <!--
    <img class="lang-flag" :src="`/images/langs/${$t('lang-icon')}.png`" alt="Lang flag">
    -->
    <p class="lang-title" @click="linksToggle">
      <span class="lang-title-text">{{ $t('lang-title') }}</span>
      <span class="lang-title-icon" :class="{ opened: isLinksOpened }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
          <g>
            <path
              d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z"
            />
          </g>
        </svg>
      </span>
    </p>
    <ul class="lang_links" :class="{ opened: isLinksOpened }">
      <li class="lang-link" @click="changeLang('en')">
        <div class="lang-link__text">
          English
        </div>
      </li>
      <li class="lang-link" @click="changeLang('ru')">
        <div class="lang-link__text">
          Русский
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isLinksOpened: false
    }
  },
  computed: {
    ...mapGetters(['PERSONAL_DATA', 'IS_AUTHORIZATION'])
  },

  methods: {
    async changeLang (language) {
      if (this.IS_AUTHORIZATION) {
        await this.switchLanguage(language)

        const redirectPath = this.switchLocalePath(this.PERSONAL_DATA.language)
        const currentPath = this.$route.path
        if (redirectPath !== currentPath) {
          await this.$router.go(0)
        }
        this.linksToggle()
      } else {
        await this.$router.push(this.switchLocalePath(language))
        this.linksToggle()
      }
    },
    async switchLanguage (language) {
      if (!this.IS_AUTHORIZATION) {
        return
      }

      if (this.PERSONAL_DATA.id === '') {
        await this.$store.dispatch('GET_PERSONAL_DATA', this.$cookies)
      }

      this.$store.commit('SET_PERSONAL_DATA', { language })
      await this.$store.dispatch('UPDATE_PERSONAL_DATA', this.$cookies)
    },
    linksToggle () {
      if (this.isLinksOpened) {
        this.linksClose()
      } else {
        this.linksOpen()
      }
    },
    linksOpen () {
      this.isLinksOpened = true
    },
    linksClose () {
      this.isLinksOpened = false
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/abstract/var';

.lang {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 5px 0;

  &-flag {
    display: none;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;

    @media screen and (min-width: 992px) {
      display: flex;
    }
  }

  @media screen and (min-width: 992px) {
    margin-right: 1.25rem;
  }

  &-title {
    display: flex;
    align-items: center;
    margin-left: 5px;
    font-family: $ff-gilroy;
    font-size: 15px;
    color: $c-light;
    cursor: pointer;

    &-text {
      @media screen and (min-width: 992px) {
        margin-right: 0.75rem;
      }
    }

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 5px;
      width: 12px;
      height: 12px;
      transform: rotate(90deg);
      transform-origin: center center;

      &.opened {
        transform: rotate(-90deg);
      }

      svg {
        width: 100%;
        height: 100%;
        fill: $c-light;
        color: $c-light;
      }
    }
  }

  &_links {
    position: absolute;
    bottom: 0;
    right: 0;
    display: none;
    flex-direction: column;
    padding: 0 10px;
    background-color: $bgc-light;
    transform: translateY(calc(100% + 5px));

    @media screen and (min-width: 992px) {
      right: 0;
      left: auto;
    }

    &.opened {
      display: flex;
    }
  }

  &-link {
    padding: 5px 0;
    cursor: pointer;

    &:not(:first-child) {
      border-top: {
        width: 1px;
        style: solid;
        color: $c-primary;
      }
    }

    &__text {
      font-family: $ff-gilroy;
      font-size: 16px;
      font-weight: 300;
    }
  }
}
</style>
