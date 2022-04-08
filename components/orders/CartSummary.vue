<i18n>
{
  "en": {
    "tables": "Tables #",
    "date": "Date",
    "guests": "Guests",
    "dishes": "Dishes",
    "total": "Total",
    "pay": "To pay",
    "totalPay": "of the total cost",
    "guestsQuantity": "You can change the number of guests:",
    "comment": "Write here your comment",
    "placeholderComment": "Leave your comment about this order here, no more than 5000 letters."
  },
  "ru": {
    "tables": "Столы",
    "date": "Дата",
    "guests": "Гостей",
    "dishes": "Блюд",
    "total": "Итого",
    "pay": "К оплате",
    "totalPay": "от полной стоимости",
    "guestsQuantity": "Можете изменить количество гостей",
    "comment": "Оставьте дополнительный комментарий к предзаказу",
    "placeholderComment": "Не более 5000 символов"
  }
}
</i18n>

<template>
  <div class="summary">
    <div class="summary-container">
      <div class="summary__tables">
        <span class="summary-label">{{ $t('tables') }}:
          <span class="summary-data">{{ tablesRow }}</span>
        </span>
      </div>
      <div class="summary__date">
        <span class="summary-label">{{ $t('date') }}:
          <span class="summary-data">{{ getDate }}</span>
        </span>
      </div>
      <div class="summary__guests">
        <span class="summary-label">{{ $t('guests') }}:
          <span class="summary-data">{{ reserve.person_quantity }}</span>
        </span>
      </div>
      <div class="summary__dishes">
        <span class="summary-label">{{ $t('dishes') }}:
          <span class="summary-data">{{ CART_DATA.dishes_count }}</span>
        </span>
      </div>
      <div class="summary__total">
        <span class="summary-label">{{ $t('total') }}:
          <span class="summary-data">
            <span class="gilroy-bold">&#8381;</span>
            {{ totalPrice }}
          </span>
        </span>
      </div>
    </div>
    <div class="summary__pay">
      <span class="summary-label">{{ $t('pay') }}:
        <span class="summary-data"><span class="gilroy-bold">&#8381;</span>
          {{ priceToPay }} ({{ prepaymentPercent }}% {{ $t('totalPay') }})</span>
      </span>
    </div>

    <div v-if="isCart" class="summary__addition">
      <span class="summary__guests-label summary-label">{{ $t('guestsQuantity') }}</span>
      <div class="summary__guests-counter">
        <img src="/icons/movement/foot.svg" alt="">
        <basic-input-people
          v-model="guests"
          :initial-slide="reserve.person_quantity"
          :one-slide="true"
          class="counter"
          @input="changeQuantity"
        />
      </div>
      <div class="summary__comment">
        <span class="summary-label">{{ $t('comment') }}:</span>
        <textarea
          ref="comment"
          v-model="comment"
          :class="{error: $v.comment.$error}"
          :placeholder="$t('placeholderComment')"
          @input="changeComment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { required, minValue, maxValue, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  props: {
    orderData: {
      type: Object,
      default: () => ({})
    },
    isCart: {
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
      guests: this.orderData.person_quantity,
      comment: this.orderData.all_dishes_comment,
      savingCommentTimeout: null
    }
  },
  validations: {
    person_quantity: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(100)
    },
    comment: {
      maxLength: maxLength(5000)
    }
  },
  computed: {
    tablesRow () {
      const tables = this.reserve.tables
      if (tables !== undefined) {
        return tables.map(item => item.table_number).join(', ')
      } else {
        return []
      }
    },
    reserve () {
      return this.orderData.reserve
    },
    getDate () {
      let d = this.orderData.order_date
      d = d && d.substr(0, 10)
      d = d && d.split('-')
      d = d && d.reverse()
      d = d && d.join('/')
      let t = this.orderData.order_date
      t = t && t.substr(11, 5)
      return `${d}, ${t}`
    },
    totalPrice () {
      return this.reserve.price + this.CART_DATA.total_price
    },
    priceToPay () {
      return (this.totalPrice / 100 * this.prepaymentPercent).toFixed(2)
    },
    prepaymentPercent () {
      return this.orderData.min_preorder_percent
    },
    ...mapGetters(['CART_DATA'])
  },
  created () {
    this.getComment()
  },
  mounted () {
    this.changeComment()
  },
  methods: {
    changeQuantity (value) {
      const updatedOrderData = Object.assign({}, this.orderData, { person_quantity: value })
      this.$emit('update:order-data', updatedOrderData)
    },
    changeComment () {
      this.$v.comment.$touch()
      const el = this.$refs.comment
      el.style.minHeight = '80px'
      const fullHeight = el.scrollHeight
      el.style.minHeight = `${fullHeight}px`

      this.$emit('update:is-comment-ready', false)
      clearTimeout(this.savingCommentTimeout)
      this.savingCommentTimeout = setTimeout(this.saveComment, 500)
    },
    async saveComment () {
      await this.$database.cart.updateCartComment(this.orderData.id, this.comment)
      const updatedOrderData = Object.assign({}, this.orderData, { all_dishes_comment: this.comment })
      this.$emit('update:order-data', updatedOrderData)
      this.$emit('update:is-comment-ready', true)
    },
    getComment () {
      this.comment = this.orderData.all_dishes_comment
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/abstract/var";

  .summary {
    font-size: 14px;

    &-label {
      font-size: 14px;
      line-height: 16px;
      color: $c-primary;
    }
    &-data {
      font-family: $ff-roboto;
      font-size: 14px;
      line-height: 18px;
      font-weight: bold;
      color: $bgc-green;
      white-space: nowrap;
    }

    &-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 80%;
      margin: 0 auto;

      @media screen and (max-width: 991px) {
        max-width: 100%;
      }
    }

    &__date {
      margin-left: 10px;
    }
    &__guests {
      margin-left: 10px;
    }
    &__dishes {
      margin-left: 10px;
    }
    &__total {
      margin-left: 10px;
    }
    &__pay {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 80%;
      margin: 10px auto 20px;

      @media screen and (max-width: 991px) {
        max-width: 100%;
        text-align: center;
        margin: 0 auto 20px;

        &-label {
          line-height: 22px;
        }
      }
    }
    &__addition {
      width: 80%;
      margin: 0 auto 20px;
      display: grid;
      grid-template-columns: repeat(3, auto);
      gap: 20px;
      grid-template-areas:
        "label counter comment";

      @media screen and (max-width: 991px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
        margin: 0 auto 15px;
      }
    }
    &__guests-label {
      grid-area: label;

      @media screen and (max-width: 991px) {
        text-align: center;
      }
    }
    &__guests-counter {
      grid-area: counter;
      width: 99px;
      height: 40px;
      position: relative;

      img {
        width: 10px;
        filter: contrast(0);
        position: absolute;
        top: 10px;
      }
      .counter {
        margin-left: 20px;
      }

      @media screen and (max-width: 991px) {
        width: 276px;
        margin: 0 auto;
      }
    }
    &__comment {
      grid-area: comment;

      textarea {
        overflow: hidden;
        resize: none;
        min-height: 80px;
        width: 100%;
        border-radius: 6px;
        border: 1px solid #E2E2E2;
        padding: 10px 15px;
        margin-top: 10px;
      }
      .error {
        border:1px solid $magenta;
        color: $magenta;
      }

      @media screen and (max-width: 991px) {
        margin-top: 10px;
      }
    }
  }
</style>
