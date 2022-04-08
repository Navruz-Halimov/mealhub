<i18n>
{
  "en": {
    "reviewLabel": "Reviews",
    "timeLabel": "Opened",
    "timeLabelClose": "Closed",
    "noCattering": "Caterings not found",
    "place": "availible",
    "noplace": "unavailible",
    "counter":"Restaurants within a radius"
  },
  "ru": {
    "reviewLabel": "Отзывы",
    "timeLabel": "Открыто",
    "timeLabelClose": "Закрыто",
    "noCattering": "Заведений не найдено",
    "place": "Доступны",
    "noplace": "нет",
    "counter":"Заведений в радиусе"
  }
}
</i18n>

<template>
  <ul
    :key="listKey"
    class="top_list"
    :class="{ empty: cateringList && cateringList.length === 0 }"
  >
    <template v-if="isReloaded">
      <li v-if="$parent.currentActionDesktop === 'search'" class="number_onlist">
        {{ $t('counter') }}:
        {{ (cateringList && cateringList.length) || $t('noCattering') }}
      </li>
      <li
        v-for="(catering, i) in cateringList"
        :key="i"
        :ref="'top_item_' + catering.id"
        class="top"
        :class="{
          selected: SELECTED_CATERING && SELECTED_CATERING.id === catering.id
        }"
        @click="selectCatering(catering)"
      >
        <header class="top_header">
          <img class="top_header-icon" src="/icons/consumables/dinner.svg">
          <h2 class="top_header-title">
            {{ catering.name }}
          </h2>
        </header>
        <article class="top_article">
          <div class="top_article_rate">
            <p class="top_article-count">
              {{ catering.rating }}
            </p>
            <addition-stars
              :rate="catering.rating"
              @click.native="
                IS_AUTHORIZATION
                  ? $router.push(
                    localePath({ path: `/catering/${catering.id}/reviews` })
                  )
                  : registrateUserTypeHandle()
              "
            />
            <p
              class="top_article-review ml-1"
              @click="
                IS_AUTHORIZATION
                  ? $router.push(
                    localePath({ path: `/catering/${catering.id}/reviews` })
                  )
                  : registrateUserTypeHandle()
              "
            >
              {{ $t('reviewLabel') }}: <span>{{ catering.reviewsCount }}</span>
            </p>
          </div>
          <p class="top_article-address">
            {{
              `${catering.address.city}, ${catering.address.street}, ${catering.address.building}`
            }}
          </p>
        </article>
        <footer class="top_footer">
          <p class="top_footer-time">
            <img
              class="top_footer-time-icon"
              :src="
                catering.opened
                  ? '/icons/catering/new/clock-green.svg'
                  : '/icons/catering/new/clock-grey.svg'
              "
              alt="t"
            >
            {{ catering.opened ? $t('timeLabel') : $t('timeLabelClose') }}
          </p>
          <p
            class="top_footer-seats"
            :style="catering.free_tables > 0 ? '' : 'opacity:.4;'"
          >
            <img
              class="top_footer-seats-icon"
              src="/icons/catering/booking-table-black.svg"
              alt=""
            >
            {{ catering.free_tables > 0 ? $t('place') : $t('noplace') }}
          </p>
        </footer>
        <!--<a class="top-arrow">
          <img src="~/assets/icons/L_arrow.svg">
        </a>-->
        <a
          class="top-arrow"
          @click.stop="
            $router.push(localePath({ path: `/catering/${catering.id}` }))
          "
        >
          <img src="~/assets/icons/L_arrow.svg">
        </a>
        <!-- <nuxt-link class="top-arrow" :to="localePath({path: `/catering/${catering.id}`})">
          <img src="~/assets/icons/L_arrow.svg">
        </nuxt-link> -->
      </li>
      <li v-if="cateringList.length === 0">
        <div class="text-ltgray wide mt-2 flex j_c text-lg desktop">
          {{ $t('noCattering') }}
        </div>
        <div class="text-ltgray wide text-xl flex j_c mobile">
          {{ $t('noCattering') }}
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    filter: {
      type: String
    },
    toolbar: {
      type: String
    }
  },
  data () {
    return {
      listKey: 0,
      isReloaded: false
    }
  },
  watch: {
    CATERING_LIST () {
      this.listKey++
    },
    'SELECTED_CATERING.id' (cateringId) {
      let elem = this.$refs['top_item_' + cateringId]
      elem = (elem && elem[0]) || elem
      if (elem && elem.scrollIntoView) {
        if (window && window.innerWidth && window.innerWidth > 991) {
          elem.scrollIntoView()
        }
      }
    }
  },
  computed: {
    cateringList () {
      if (this.$_.isEmpty(this.CATERING_LIST)) {
        return []
      } else {
        console.warn('this.nameFilter', this.filter)
        if (
          (this.$parent.currentActionDesktop === 'filter' ||
            this.$parent.currentActionMobile === 'filter') &&
          this.filter
        ) {
          return this.CATERING_LIST.filter((item) => {
            const name = item.name ? item.name.toLowerCase() : ''
            return ~name.indexOf(this.filter.toLowerCase())
          })
        }
        return this.CATERING_LIST
      }
    },
    ...mapGetters(['CATERING_LIST', 'SELECTED_CATERING'])
  },
  created () {
    this.wait(this.showThisCateringList)
  },
  methods: {
    showThisCateringList () {
      if (this.cateringList) {
        setTimeout(() => {
          this.isReloaded = true
        }, 100)
        return true
      }
      return false
    },
    selectCatering (top) {
      console.warn(
        this.$parent.currentActionDesktop,
        this.$parent.currentActionMobile
      )
      if (this.isMobile) {
        if (
          this.$parent.currentActionDesktop === 'search' ||
          this.$parent.currentActionMobile === 'search'
        ) {
          return this.$router.push(
            this.localePath({
              path: `/catering/${top.id}`
            })
          )
        }
        if (
          this.$parent.currentActionDesktop === 'filter' ||
          this.$parent.currentActionMobile === 'filter'
        ) {
          return this.$router.push(
            this.localePath({
              path: `/catering/${top.id}`
            })
          )
        }
      }

      this.$store.commit('SET_SELECTED_CATERING', top)
      this.$store.commit('SET_CURRENT_CATERING', top)

      if (this.$parent.showTopCardPC) {
        this.$parent.showTopCardPC(top.id)
      } else {
        throw new Error('Top: No showTopCardPC on parent')
      }

      if (this.toolbar === 'route') {
        this.$store.commit('SET_GMAP_ROUTE', {
          to: `${top.address.street}, ${top.address.building}, ${top.address.city}`
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/modificator';
.number_onlist {
  font-family: $ff-gilroy;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  padding: 10px;
}
.top {
  display: grid;
  grid-template-columns: 1fr 15px;
  grid-template-rows: repeat(3, auto);
  grid-template-areas: 'header arrow' 'article arrow' 'footer arrow';
  grid-gap: 5px;
  padding: 7px 15px;
  width: 100%;
  cursor: pointer;

  &.selected {
    background-color: #f5f5f5;
  }

  &:not(:first-of-type) {
    border-top: {
      width: 1px;
      style: solid;
      color: $c-line;
    }
  }

  &_list {
    display: flex;
    flex-direction: column;
    border: {
      width: 1px;
      style: solid;
      color: #e2e2e2;
      bottom-right-radius: $br-block-desktop;
    }
    &.empty {
      border-bottom: none;
    }
    width: 100%;
    height: 100%;
    background-color: $light;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &_header,
  &_article,
  &_footer {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &_header {
    grid-area: header;

    &-icon {
      flex: 0 0 15px;
      width: 15px;
      height: 15px;
    }

    &-title {
      margin-left: 5px;
      font-family: $ff-roboto;
      font-size: 14px;
    }
  }

  &_article {
    grid-area: article;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;

    & > *:not(:first-child) {
      margin-top: 5px;
    }

    &_rate {
      display: flex;
      align-items: center;
      width: 100%;
      @media screen and (max-width: 1200px) {
        flex-wrap: wrap;
      }

      & > *:not(:first-child) {
        margin-left: 5px;
      }
    }

    &-count {
      font-family: $ff-roboto;
      font-size: 14px;
    }

    &-review {
      font-family: $ff-gilroy;
      font-size: 14px;
      flex-direction: row !important;
      white-space: nowrap;

      @media screen and (max-width: 991px) {
        margin-top: 0px;
      }
      @media screen and (max-width: 1200px) {
        margin: 5px 0 0 1rem !important;
      }

      span {
        color: $c-green;
      }
    }

    &-address {
      font-family: $ff-gilroy;
      font-size: 14px;
      line-height: 17px;
    }
  }

  &_footer {
    grid-area: footer;

    & > *:not(:first-child) {
      margin-left: 5px;
    }

    &-time {
      display: flex;
      align-items: center;
      justify-content: start;
      font-family: $ff-roboto;
      font-size: 14px;
      color: $c-green;

      &-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 3px;
        width: 10px;
        height: 10px;
        object-fit: cover;

        @media screen and (min-width: 992px) {
          flex: 0 0 15px;
          width: 15px;
          height: 15px;
        }

        svg {
          width: 100%;
          height: 100%;
          fill: $c-primary;
        }
      }
    }

    &-seats {
      display: flex;
      align-items: center;
      font-family: $ff-gilroy;
      font-size: 14px;

      &-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
        margin-right: 3px;
        width: 10px;
        height: 10px;
        object-fit: cover;

        @media screen and (min-width: 992px) {
          flex: 0 0 15px;
          width: 15px;
          height: 15px;
        }

        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  &-arrow {
    grid-area: arrow;
    align-self: center;

    img {
      flex: 0 0 15px;
      width: 15px;
      height: 15px;
    }
  }
}

.stars {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
