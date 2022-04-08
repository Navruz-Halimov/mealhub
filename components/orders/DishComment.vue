<i18n>
{
  "en": {
    "placeholderComment": "Leave your comment about this dish here, no more than 1000 letters."
  },
  "ru": {
    "placeholderComment": "Коментарий к предзаказу блюда (не более 1000 символов)"
  }
}
</i18n>
<template>
  <textarea
    ref="comment"
    v-model="$v.dishComment.$model"
    class="textarea"
    :class="{error: $v.dishComment.$error}"
    :placeholder="$t('placeholderComment')"
    :disabled="disabled"
    tabindex="-1"
    @input="changeComment"
  />
</template>

<script>
import { maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  props: {
    dishData: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isCommentReady: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dishComment: this.dishData.comment,
      savingCommentTimeout: null
    }
  },
  validations: {
    dishComment: {
      maxLength: maxLength(1000)
    }
  },
  computed: {
    ...mapGetters(['CART_ITEMS'])
  },
  created () {
    this.getDishComment()
  },
  mounted () {
    this.changeComment()
  },
  methods: {
    changeComment () {
      this.$v.dishComment.$touch()
      const el = this.$refs.comment
      el.style.minHeight = '1px'
      const fullHeight = el.scrollHeight
      el.style.minHeight = `${fullHeight}px`

      this.$emit('update:is-comment-ready', false)
      clearTimeout(this.savingCommentTimeout)
      this.savingCommentTimeout = setTimeout(this.saveDishComment, 500)
    },
    getDishComment () {
      const currentDish = this.CART_ITEMS.filter(item => item.dish_id === this.dishData.dish_id)
      this.dishComment = currentDish[0].comment
    },
    async saveDishComment () {
      const newCart = await this.$database.cart.updateDishComment(this.dishData.dish_id, this.dishComment)
      this.$store.commit('SET_CART', newCart)
      this.$emit('update:is-comment-ready', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/abstract/var";

  .textarea {
    resize: none;
    border: none;
    min-height: 80px;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0);

    @media screen and (max-width: 991px) {
      min-height: 30px;
    }
  }
  .error {
    border: 1px solid $magenta;
    color: $magenta;
  }
</style>
