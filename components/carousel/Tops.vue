<i18n>
{
  "en": {
    "reviews": "Reviews",
    "timeLabel": "Opened",
    "place": "availible",
    "noplace": "unavailible",
    "signBtn": "Sign In"
  },
  "ru": {
    "reviews": "Отзывы",
    "timeLabel": "Открыто",
    "place": "Доступны",
    "noplace": "нет",
    "signBtn": "Войти"
  }
}
</i18n>

<template>
  <vue-slick-carousel
    ref="carouselTop"
    class="carouselTop"
    :class="{ onlyOne: cateringList.length < 2 }"
    v-bind="carouselSettings"
    @afterChange="selectCurrentTop"
  >
    <div
      v-for="(catering, i) in cateringList"
      :key="i"
      class="top"
      :class="{ open: isOpen }"
    >
      <div class="carouselTop_wrap" :class="{ open: isOpen }">
        <header
          class="carouselTop_header"
          @click="
            $router.push(localePath({ path: `/catering/${catering.id}` }))
          "
        >
          <span class="carouselTop_header-icon">
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
          <h2 class="carouselTop_header-title">
            {{ catering.name }}
          </h2>
          <nuxt-link
            :to="localePath({ path: `/catering/${catering.id}` })"
            class="carouselTop_header-link"
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
        <article class="carouselTop_article">
          <div
            class="carouselTop_article_block social"
            @click="
              $router.push(
                localePath({ path: `/catering/${catering.id}/reviews` })
              )
            "
          >
            <div class="social_rate">
              {{ catering.rating }}
              <addition-stars :rate="catering.rating" />
            </div>
            <p class="social-review">
              {{ $t('reviews') }}:
              <span class="social-review-count">{{
                catering.reviewsCount
              }}</span>
            </p>
          </div>
          <div class="carouselTop_article_block address">
            <img
              class="address-icon"
              src="/icons/catering/new/point-grey.svg"
              alt=""
            >
            <p class="address-txt">
              {{
                `${catering.address.city}, ${catering.address.street}, ${catering.address.building}`
              }}
            </p>
          </div>
          <div v-if="isOpen" class="carouselTop_article_block kitchen">
            <img
              class="kitchen-icon"
              src="/icons/catering/new/cuisines-grey.svg"
              alt=""
            >
            <div class="kitchen_carousel">
              <span
                v-for="(cuisine, i) in catering.cuisines"
                :key="i"
                class="kitchen_carousel-span capitalize"
              >{{ cuisine.name }}</span>
            </div>
          </div>
          <div v-if="isOpen" class="carouselTop_article_block more">
            <addition-work-time
              :key="'checkbox' + catering.id"
              :uniqid="'checkbox' + catering.id"
              :is-open="catering.opened"
              :work-time="catering.workTime"
              direction="top"
            />
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
              {{ catering.free_tables > 0 ? $t('place') : $t('noplace') }}
            </p>
          </div>
          <div v-if="isOpen" class="carouselTop_article_block sign">
            <a
              v-if="!IS_AUTHORIZATION"
              class="sign-btn"
              @click.stop="loginUserTypes"
            >
              {{ $t('signBtn') }}
            </a>
            <button
              v-else-if="catering.available_go_and_eat"
              class="eat-btn eatme-btn-colorful"
              @click.stop="
                $store.commit('SET_CURRENT_CATERING', catering)
                startGoEat(catering.id)
              "
            >
              <img src="~/assets/icons/dish1.svg" alt="">Go&Eat
            </button>
            <button v-else class="eat-btn eatme-btn-disabled">
              <img src="~/assets/icons/dish1.svg" alt="">Go&Eat
            </button>
          </div>
        </article>
      </div>
    </div>
  </vue-slick-carousel>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    SELECTED_CATERING (newCurrentTop) {
      if (this.$_.isNil(newCurrentTop)) {
        return false
      }
      const vm = this

      this.CATERING_LIST.find((catering, i) => {
        if (newCurrentTop.id === catering.id) {
          vm.$refs.carouselTop.goTo(i)
          vm.$parent.mapView &&
            vm.$parent.mapView.scrollToSelectedCatering(catering)
        }
      })
    }
  },
  computed: {
    cateringList () {
      if (this.$_.isEmpty(this.CATERING_LIST)) {
        return []
      } else {
        return this.CATERING_LIST
      }
    },
    ...mapGetters(['IS_AUTHORIZATION', 'SELECTED_CATERING', 'CATERING_LIST'])
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
        touchMove: false
      },
      carouselSettings: {
        centerMode: true,
        centerPadding: '20px',
        infinite: false,
        slidesToShow: 1,
        speed: 500,
        variableWidth: true,
        autoplay: false,
        arrows: false
      },
      splideCuisineOptions: {
        autoWidth: true,
        pagination: false,
        perPage: 1,
        perMove: 1,
        gap: '1rem',
        arrows: false
      }
    }
  },
  methods: {
    selectCurrentTop (slideIndex) {
      this.$store.commit(
        'SET_SELECTED_CATERING',
        this.CATERING_LIST[slideIndex]
      )
    },
    goToCatering (id) {
      this.$router.push(
        this.localePath({
          path: `catering/${id}`
        })
      )
    }
  }
}
</script>

<style>
.onlyOne .slick-track {
  justify-content: center !important;
  display: flex !important;
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';

.eat-btn {
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
  @media screen and (max-width: 991px) {
    font-size: 16px !important;
  }
}

.carouselTop {
  position: relative;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    height: 100%;
    width: 20vw;
    @include linear-gradient(
      90deg,
      rgba(250, 250, 250, 1) 0%,
      rgba(250, 250, 250, 0) 100%
    );
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    height: 100%;
    width: 20vw;
    @include linear-gradient(
      -90deg,
      rgba(250, 250, 250, 1) 0%,
      rgba(250, 250, 250, 0) 100%
    );
  }

  & /deep/ {
    .slick-list {
      overflow: visible;
    }
    /* .slick-arrow {
        display: none !important;
      } */
    /* .slick-track {
        display: flex;
        justify-content: center;
      } */
  }

  &_wrap {
    display: inline-grid !important;
    grid-template-rows: 3em 1fr;
    padding: 10px 5px;
    width: 70vw;
    max-width: 70vw;

    &.open {
      grid-template-rows: 3em 1fr;
    }
  }

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
      align-self: end;
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
    grid-template-rows: repeat(5, auto);
    grid-row-gap: 8px;
    box-shadow: 0px 3px 6px #11100029;
    border-radius: 0 0 5px 5px;
    padding: 5px 8px;
    width: 100%;
    transition: all 0.5s;

    &_block {
      display: grid;
      align-items: center;
    }
  }

  & .social {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 5px;
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
      font-family: $ff-gilroy;
      font-size: 14px;

      &-count {
        color: $c-green;
      }
    }
  }

  & .address {
    grid-template-columns: auto 1fr;
    align-items: start;
    grid-column-gap: 10px;

    &-icon {
      display: flex;
      align-items: center;
      margin-top: 3px;
      width: 18px;
      height: 18px;
      object-fit: cover;
    }

    &-txt {
      position: relative;
      width: 99%;
      word-wrap: break-word;
      font-family: $ff-gilroy;
      font-size: 14px;
      height: 2em;
      overflow-y: auto;
      line-height: 1em;
      display: flex;
      align-items: center;
    }
  }

  & .kitchen {
    grid-template-columns: auto 1fr;
    grid-template-rows: minmax(3em, 4em);
    align-items: center;
    grid-column-gap: 8px;

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

      &-span {
        font-size: 12px;
        border: {
          width: 1px;
          style: solid;
          color: $c-green;
          radius: 6px;
        }
        padding: 0.45rem 0.5rem 0.25rem;

        &:not(:first-child) {
          margin-left: 4px;
        }
      }
    }
  }

  & .more {
    grid-template-columns: 3fr 2fr;
    grid-column-gap: 5px;

    & /deep/ {
      .cateringWorkTime {
        @media screen and (max-width: 991px) {
          width: 14em;
        }

        &-icon {
          width: 18px;
          height: 18px;
        }

        &-label {
          font-size: 14px;
        }

        .expand_arrow {
          width: 2.2rem;
          margin-right: 0.4em;
          border-left: 1px solid #ccc;
          height: 3rem;
          margin-left: 0.5rem;
        }
        .expand_arrow svg {
          height: 14px;
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

  & .sign {
    align-items: center;
    justify-content: center;

    &-btn {
      @extend %btn-red;
      margin-bottom: 1rem;
    }
  }

  & .eat {
    align-items: center;
    justify-content: center;

    &-btn {
      @extend %btn-colorful;
      margin-bottom: 1rem;
    }
  }
}
</style>
