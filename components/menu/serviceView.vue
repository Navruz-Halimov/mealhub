<i18n>
{
  "en": {
    "MenuLabelService": "Terms of use",
    "MenuLabelLicense": "Mealhub Service License Agreement",
    "MenuLabelPrivacy":"Privacy Policy",
    "MenulabelProvided":"List of services provided"
  },

  "ru": {
    "MenuLabelService": "Пользовательское соглашение",
    "MenuLabelLicense": "Лицензионное соглашение на использование сервиса Mealhub",
    "MenuLabelPrivacy":"Политика конфиденциальности",
    "MenuLabelProvided":"Перечень предоставляемых услуг"
  }
}
</i18n>
<template>
  <ul class="serviceMenu">
    <li class="serviceMenu-item" :class="{ active: activeLink === 'agreement' }" @click="$emit('click-handler')">
      <nuxt-link :to="localePath({ path: `/profile/agreement` })" class="serviceMenu-href" :class="{ active: activeLink === 'agreement' }">
        <p class="serviceMenu-text">
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
    <li class="serviceMenu-item" :class="{ active: activeLink === 'license' }" @click="$emit('click-handler')">
      <nuxt-link :to="localePath({ path: `/profile/license` })" class="serviceMenu-href" :class="{ active: activeLink === 'license' }">
        <p class="serviceMenu-text">
          {{ $t('MenuLabelLicense') }}
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
    <li class="serviceMenu-item" :class="{ active: activeLink === 'services' }" @click="$emit('click-handler')">
      <nuxt-link :to="localePath({ path: `/profile/privacy` })" class="serviceMenu-href" :class="{ active: activeLink === 'privacy' }">
        <p class="serviceMenu-text">
          {{ $t('MenuLabelPrivacy') }}
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
    <li class="serviceMenu-item" :class="{ active: activeLink === 'servicesProvided' }" @click="$emit('click-handler')">
      <nuxt-link :to="localePath({ path: `/profile/servicesProvided` })" class="serviceMenu-href" :class="{ active: activeLink === 'servicesProvided' }">
        <p class="serviceMenu-text">
          {{ $t('MenuLabelProvided') }}
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
  name: 'ServiceMenu',
  props: {
    activeLink: {
      type: String,
      default: 'service'
    }
  },
  created () {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.serviceMenu {
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
