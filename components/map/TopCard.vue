<i18n>
{
  "en": {
    "reviews": "Reviews",
    "timeLabel": "Opened",
    "place": "availible",
    "noplace": "unavailible",
    "signBtn": "Sign In",
    "eatBtn": "Go&Eat"
  },
  "ru": {
    "reviews": "Отзывы",
    "timeLabel": "Открыто",
    "place": "доступны",
    "noplace": "нет",
    "signBtn": "Войти",
    "eatBtn": "Go&Eat"
  }
}
</i18n>

<template>
  <div class="mapTopCard">
    <header
      class="mapTopCard_header"
      @click="$router.push(localePath({ path: `/catering/${topData.id}` }))"
    >
      <span class="mapTopCard_header-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 12.53 9"
        >
          <g transform="translate(0 7.668)">
            <g transform="translate(0 0)">
              <rect width="12.53" height="1.332" />
            </g>
          </g>
          <g transform="translate(0.555 0)">
            <path
              d="M32.427,75.137a5.669,5.669,0,0,0-3.234-1.617.93.93,0,1,0-1.61,0,5.713,5.713,0,0,0-4.905,5.528H34.1A5.672,5.672,0,0,0,32.427,75.137Z"
              transform="translate(-22.678 -72.125)"
            />
          </g>
        </svg>
      </span>
      <h2 class="mapTopCard_header-title">
        {{ topData.name }}
      </h2>
      <nuxt-link
        :to="localePath({ path: `/catering/${topData.id}` })"
        class="mapTopCard_header-link"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.46 13.736">
          <g>
            <path
              d="M5.543,6.368.1,12.12a.374.374,0,0,0,0,.51.327.327,0,0,0,.482,0L6.268,6.622a.374.374,0,0,0,0-.51L.583.107A.334.334,0,0,0,.343,0,.324.324,0,0,0,.1.107a.374.374,0,0,0,0,.51Z"
            />
          </g>
        </svg>
      </nuxt-link>
    </header>
    <article class="mapTopCard_article">
      <img
        v-if="topData.image"
        :src="topData.image"
        alt=""
        class="mapTopCard-image"
      >
      <img
        v-if="topData.images"
        :src="topData.images[0].path"
        alt=""
        class="mapTopCard-image"
      >

      <nuxt-link
        class="mapTopCard_article_block social"
        :to="localePath({ path: `/catering/${topData.id}/reviews` })"
      >
        <div class="social_rate">
          {{ topData.rating }}
          <addition-stars :rate="topData.rating" />
        </div>
        <p class="social-review">
          {{ $t('reviews') }}:
          <span class="social-review-count">{{ topData.reviewsCount }}</span>
        </p>
      </nuxt-link>

      <div class="mapTopCard_article_block address">
        <p class="address-txt">
          {{
            `${topData.address.city}, ${topData.address.street}, ${topData.address.building}`
          }}
        </p>
      </div>
      <div class="mapTopCard_article_block kitchen">
        <div class="kitchen_carousel">
          <span
            v-for="(cuisine, i) in topData.cuisines"
            :key="i"
            class="kitchen_carousel-span capitalize"
          >{{ cuisine.name }}</span>
        </div>
      </div>
      <div class="mapTopCard_article_block more">
        <addition-work-time
          :key="'worktime' + topData.id"
          :uniqid="'checkbox' + topData.id"
          :is-open="topData.opened"
          :work-time="topData.workTime"
          direction="top"
        />
      </div>
      <div class="mapTopCard_article_block places">
        <p class="more_seats">
          <span class="more_seats-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.328"
              height="10"
              viewBox="0 0 15.328 10"
            >
              <defs>
                <style>
                  .a {
                  fill: #5c5c5c;
                  }
                </style>
              </defs>
              <path
                class="a"
                d="M345.279,85.333a.925.925,0,0,0-.911.938v4.062h-2.125a.938.938,0,0,0,0,1.875h1.518v2.5h-.911a.313.313,0,0,0,0,.625h2.428a.313.313,0,0,0,0-.625h-.911v-2.5h.911a.925.925,0,0,0,.911-.937v-5A.925.925,0,0,0,345.279,85.333Z"
                transform="translate(-330.861 -85.333)"
              />
              <path
                class="a"
                d="M3.946,90.333H1.821V86.271a.925.925,0,0,0-.911-.937A.925.925,0,0,0,0,86.271v5a.925.925,0,0,0,.911.937h.911v2.5H.911a.313.313,0,0,0,0,.625H3.339a.313.313,0,0,0,0-.625H2.428v-2.5H3.946a.938.938,0,0,0,0-1.875Z"
                transform="translate(0 -85.333)"
              />
              <path
                class="a"
                d="M112.193,152.02a2.41,2.41,0,0,0,2.5,0,1.558,1.558,0,0,1,.9-.258.318.318,0,0,0,.331-.3v-.911a1.273,1.273,0,0,0-1.322-1.214h-6.612a1.273,1.273,0,0,0-1.323,1.214v.911a.318.318,0,0,0,.331.3,1.55,1.55,0,0,1,.9.258,2.4,2.4,0,0,0,2.494,0,1.69,1.69,0,0,1,.574-.23v4.828h-1.323a.3.3,0,1,0,0,.607h3.306a.3.3,0,1,0,0-.607h-1.322v-4.826A1.708,1.708,0,0,1,112.193,152.02Z"
                transform="translate(-103.631 -147.225)"
              />
            </svg>
          </span>
          {{ topData.free_tables > 0 ? $t('place') : $t('noplace') }}
        </p>
      </div>
      <div v-if="isbuild !== true" class="mapTopCard_article_block sign">
        <a
          v-if="!IS_AUTHORIZATION"
          class="sign-btn eatme-btn-orange"
          @click.stop="
            () => {
              close()
              loginUserTypes()
            }
          "
        >
          {{ $t('signBtn') }}
        </a>
        <button
          v-else-if="topData.available_go_and_eat"
          class="eat-btn eatme-btn-colorful"
          @click.stop="
            $store.commit('SET_CURRENT_CATERING', topData)
            startGoEat(topData.id)
          "
        >
          <img src="~/assets/icons/dish1.svg" alt="">Go&Eat
        </button>
        <button v-else class="eat-btn eatme-btn-disabled">
          <img src="~/assets/icons/dish1.svg" alt="">Go&Eat
        </button>
      </div>
      <div v-else class="mb-2" />
    </article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    topData: {
      type: Object
    },
    close: {
      type: Function
    },
    isbuild: {
      type: Boolean
    }
  },
  data () {
    return {
      carouselCuisineSettings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        touchThreshold: 5,
        touchMove: true
      },
      splideCuisineOptions: {
        autoWidth: true,
        height: '30px',
        pagination: false,
        perPage: 4,
        perMove: 1,
        gap: '1rem'
      }
    }
  },
  computed: {
    ...mapGetters(['IS_AUTHORIZATION'])
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';

.mapTopCard {
  display: grid !important;
  grid-template-rows: 30px auto;
  margin-top: 10px;
  width: 100%;
  height: 100%;
  outline: none;

  &_header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 10px;
    align-items: center;
    padding: 5px 8px;
    border-radius: 5px 5px 0 0;
    background-color: #eb618d;
    color: $c-light;
    cursor: pointer;

    &-icon {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      flex: 0 0 15px;
      width: 15px;
      height: 15px;

      svg {
        width: 100%;
        height: 100%;
        fill: $c-light;
      }
    }

    &-title {
      align-self: center;
      position: relative;
      font-family: $ff-roboto;
      font-size: 14px;
      letter-spacing: 0.5px;
      overflow: hidden;
      word-wrap: none;
      overflow: hidden;
      white-space: nowrap;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        height: 100%;
        width: 20px;
        @include linear-gradient(
          -90deg,
          rgba(235, 97, 141, 1) 0%,
          rgba(235, 97, 141, 0) 100%
        );
      }
    }

    &-link {
      justify-self: end;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 13px;
      height: 13px;

      svg {
        width: 100%;
        height: 100%;
        fill: $c-light;
      }
    }
  }

  &_article {
    display: grid;
    grid-template-columns: 3fr 4fr;
    grid-template-rows: repeat(5, auto);
    grid-template-areas: 'img social' 'img address' 'img kitchen' 'img more' 'img places' 'img sign';
    grid-gap: 0;
    border-radius: 0 0 5px 5px;
    width: 100%;
    height: 100%;
    overflow: visible;
    background-color: $bgc-light;

    &_block {
      display: grid;
      align-items: center;
      margin-top: 7px;
      padding: 0 2rem;
    }
  }

  &-image {
    grid-area: img;
    // display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.social {
  grid-area: social;
  grid-template-columns: repeat(2, 1fr);
  // grid-column-gap: 5px;
  align-items: center;

  &_rate {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 5px;
    margin-left: 2px;
    font-family: $ff-roboto;
    font-size: 14px;
  }

  &_stars {
    display: flex;
  }

  &-review {
    margin-left: 10px;
    font-family: $ff-gilroy;
    font-size: 14px;

    &-count {
      color: $c-green;
    }
  }
}

.address {
  grid-area: address;
  grid-template-columns: 1fr;
  align-items: start;

  &-txt {
    position: relative;
    width: 99%;
    word-wrap: none;
    font-family: $ff-gilroy;
    font-size: 14px;
    overflow-x: auto;
    margin-right: 8px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex: 0 0 15px;
      width: 15px;
      height: 100%;
      @include linear-gradient(
        0deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
}

.kitchen {
  grid-area: kitchen;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(2em, auto);
  align-items: center;
  max-width: 100%;

  &-icon {
    justify-self: start;
    display: flex;
    align-items: center;
    width: 18px;
    height: 18px;
    object-fit: cover;
  }

  &_carousel {
    display: flex;
    align-items: center;
    overflow: hidden;
    flex-wrap: wrap;
    margin: 0.5rem 0;

    &-span {
      font-size: 12px;
      border: {
        width: 1px;
        style: solid;
        color: $c-green;
        radius: 6px;
      }
      padding: 0.45rem 0.5rem 0.25rem;
      margin-right: 4px;
      margin-bottom: 4px;
    }
  }
}

.more {
  grid-area: more;
  grid-template-columns: auto 1fr;
  grid-column-gap: 5px;
  position: relative;

  & /deep/ {
    .cateringWorkTime {
      height: 2em;
      border-radius: 4px;
      box-shadow: none;

      &-icon {
        margin: 0 0.25em;
        width: 12px;
        height: 12px;
      }

      &-label {
        font-size: 14px;
      }

      &-arrow {
        margin-left: 4px;
        border-left: none;

        svg {
          flex: 0 0 10px;
          width: 10px;
          height: 10px;
          margin-top: 2px;
        }
      }
    }
  }

  &_seats {
    display: flex;
    align-items: center;
    font-family: $ff-gilroy;
    font-size: 14px;

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5px;
      margin-left: 5px;
      flex: 0 0 15px;
      width: 15px;
      height: 15px;

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.sign {
  grid-area: sign;
  align-items: center;
  justify-content: initial;
  margin-bottom: 1rem;

  &-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem 0;

    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
  }
}

.eat {
  grid-area: sign;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;

  &-btn {
    img {
      width: 32px;
      margin-right: 1rem;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 3em;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
</style>
