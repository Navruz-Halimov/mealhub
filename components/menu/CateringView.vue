<i18n>
{
  "en": {
    "data": "General description",
    "menu": "Menu",
    "review": "Reviews"
  },
  "ru": {
    "data": "Общее описание",
    "menu": "Меню",
    "review": "Отзывы"
  }
}
</i18n>

<template>
  <ul class="cateringViewMenu">
    <li
      class="cateringViewMenu-item"
      :class="{ active: activeLink === 'about' }"
      @click="$emit('click-handler')"
    >
      <nuxt-link
        :to="localePath({ path: `/catering/${cateringId}` })"
        class="cateringViewMenu-href"
        :class="{ active: activeLink === 'about' }"
      >
        <span class="cateringViewMenu-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
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
        <p class="cateringViewMenu-text">
          {{ $t('data') }}
        </p>
        <span class="pages-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path
                d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z"
              />
            </g>
          </svg>
        </span>
      </nuxt-link>
    </li>
    <li
      class="cateringViewMenu-item"
      :class="{ active: activeLink === 'menu' }"
      @click="$emit('click-handler')"
    >
      <nuxt-link
        :to="localePath({ path: `/catering/${cateringId}/menu` })"
        class="cateringViewMenu-href"
        :class="{ active: activeLink === 'menu' }"
      >
        <span class="cateringViewMenu-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
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
        <p class="cateringViewMenu-text">
          {{ $t('menu') }} ({{ menuCount }})
        </p>

        <span class="pages-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path
                d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z"
              />
            </g>
          </svg>
        </span>
      </nuxt-link>
    </li>
    <li
      class="cateringViewMenu-item"
      :class="{ active: activeLink === 'reviews' }"
      @click="$emit('click-handler')"
    >
      <nuxt-link
        :to="localePath({ path: `/catering/${cateringId}/reviews` })"
        class="cateringViewMenu-href"
        :class="{ active: activeLink === 'reviews' }"
      >
        <span class="cateringViewMenu-icon">
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
        <p class="cateringViewMenu-text">
          {{ $t('review') }}: ({{ reviewsCount }})
        </p>
        <span class="pages-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
            <g>
              <path
                d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z"
              />
            </g>
          </svg>
        </span>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    cateringId: {
      type: String
    },
    activeLink: {
      type: String,
      default: 'about'
    },
    menuCount: {
      type: Number,
      default: 0
    },
    reviewsCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.cateringViewMenu {
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

  &-arrow {
    flex: 0 0 10px;
    width: 10px;
    height: 15px;
    object-fit: cover;
  }
  .pages-arrow {
    width: 6px;
  }
}
</style>
