<i18n>
{
  "en": {
    "MenuLabelSupport": "Support service",
    "MenuLabelQuestions": "Frequently asked questions",
    "MenuLabelAgreement":"User Agreement",
    "MenuLabelService":"About the service"
  },

  "ru": {
    "MenuLabelSupport": "Служба поддержки",
    "MenuLabelQuestions": "Часто задаваемые вопросы",
    "MenuLabelAgreement":"Пользовательское соглашение",
    "MenuLabelService":"О сервисе"
  }
}
</i18n>
<template>
  <ul class="FAQViewMenu">
    <li class="FAQViewMenu-item" :class="{ active: activeLink === 'support' }" @click="$emit('click-handler')">
      <nuxt-link :to="localePath({ path: `/profile/support` })" class="FAQViewMenu-href" :class="{ active: activeLink === 'support' }">
        <p class="FAQViewMenu-text">
          {{ $t('MenuLabelSupport') }}
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
    <li class="FAQViewMenu-item" :class="{ active: activeLink === 'help' }" @click="$emit('click-handler')">
      <nuxt-link :to="localePath({ path: `/profile/help` })" class="FAQViewMenu-href" :class="{ active: activeLink === 'help' }">
        <p class="FAQViewMenu-text">
          {{ $t('MenuLabelQuestions') }}
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
    <li class="FAQViewMenu-item" :class="{ active: activeLink === 'agreement' }" @click="$emit('click-handler')">
      <nuxt-link :to="localePath({ path: `/profile/agreement` })" class="FAQViewMenu-href" :class="{ active: activeLink === 'agreement' }">
        <p class="FAQViewMenu-text">
          {{ $t('MenuLabelAgreement') }}
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
    <li class="FAQViewMenu-item" :class="{ active: activeLink === 'about' }" @click="$emit('click-handler')">
      <nuxt-link :to="localePath({ path: `/profile/about` })" class="FAQViewMenu-href" :class="{ active: activeLink === 'about' }">
        <p class="FAQViewMenu-text">
          {{ $t('MenuLabelService') }}
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
  </ul>
</template>

<script>
export default {
  name: 'FavoritesMenu',
  props: {
    activeLink: {
      type: String,
      default: 'favorites'
    }
  },
  created () {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.FAQViewMenu {
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
        &:hover {
            border-top: 1px solid $orange;
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

    .pages-arrow {
        width: 6px;
    }
}
</style>
