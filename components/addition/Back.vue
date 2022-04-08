<i18n>
{
  "en": {
    "back": "Back"
  },
  "ru": {
    "back": "назад"
  }
}
</i18n>

<template>
  <nuxt-link
    v-if="route"
    v-bind="$attrs"
    :to="route"
    class="link-back"
    @click.stop="clickHandler"
  >
    <img class="link-back-icon" src="/images/icons/arrow.png" alt="">
    {{ text || $t('back') }}
  </nuxt-link>
  <button v-else v-bind="$attrs" class="link-back" @click.stop="clickHandler">
    {{ route }}
    <img class="link-back-icon" src="/images/icons/arrow.png" alt="">
    {{ text || $t('back') }}
  </button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    route: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    stricted: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['PREVIOUS_ROUTE'])
  },
  methods: {
    clickHandler () {
      console.log(this.route, this.stricted)
      if (this.route) {
        this.$router.push(this.route)
      } else if (this.stricted) {
        this.$emit('click-handler')
      } else {
        this.$emit('click-handler')
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.link-back {
  display: flex;
  align-items: center;
  color: #c4c4c4;
  padding: 0;
  font-size: 14px;
  line-height: 14px;
  position: relative;
  z-index: 100;

  @media screen and (min-width: 992px) {
    min-height: 28px;
  }

  &-icon {
    margin-right: 3px;
    width: 10px;
    height: 6px;
    object-fit: cover;
    flex: 0 0 15px;
    width: 15px;
    height: 10px;
  }
}
</style>
