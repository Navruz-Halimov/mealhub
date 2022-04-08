<i18n>
{
  "en": {
    "addCard": "Add"
  },
  "ru": {
    "addCard": "Добавить"
  }
}
</i18n>
<template>
  <ul class="cards">
    <li
      v-for="(payment, i) in PAYMENTS"
      :key="i"
      class="card"
      :class="{ selected: selected === payment.id }"
      @click="$store.commit('SET_SELECTED_CARD', payment.id)"
    >
      <img
        v-if="payment && payment.img_path"
        class="card-icon"
        alt="Bank cards icon"
        :src="payment.img_path"
      >
      <img
        v-else-if="payment && switchMastercard(payment.number_ends)"
        class="card-icon"
        :src="`/images/bank/mastercard.png`"
        alt="Bank cards icon"
      >
      <img
        v-else-if="payment && switchMaestro(payment.number_ends)"
        class="card-icon"
        :src="`/images/bank/maestro.png`"
        alt="Bank cards icon"
      >
      <img
        v-else
        class="card-icon"
        :src="`/images/bank/visa.png`"
        alt="Bank cards icon"
      >

      <p class="card-number wide">
        <span class="card-number-dots">.... .... ....</span>
        {{ payment.number_ends }}
      </p>
      <div v-if="page !== 'order'" class="card_actions">
        <span
          class="card-action"
          @click.stop="deleteCard(payment.id)"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.405 14.104">
          <path
            d="M55.949,1.69h-2.2a1.909,1.909,0,0,0-3.792,0h-2.2A1.613,1.613,0,0,0,46.155,3.3v.083a1.613,1.613,0,0,0,1.018,1.5v7.612A1.613,1.613,0,0,0,48.784,14.1h6.146a1.613,1.613,0,0,0,1.611-1.611V4.881a1.613,1.613,0,0,0,1.018-1.5V3.3A1.613,1.613,0,0,0,55.949,1.69ZM51.858.764a1.147,1.147,0,0,1,1.124.926H50.734A1.147,1.147,0,0,1,51.858.764Zm3.92,11.728a.848.848,0,0,1-.847.847H48.784a.848.848,0,0,1-.847-.847V5h7.84ZM56.8,3.384a.848.848,0,0,1-.847.847H47.766a.848.848,0,0,1-.847-.847V3.3a.848.848,0,0,1,.847-.847h8.183A.848.848,0,0,1,56.8,3.3v.083Z"
            transform="translate(-46.155 0)"
          />
          <path
            d="M158.457,254.637a.382.382,0,0,0,.382-.382v-4.3a.382.382,0,1,0-.764,0v4.3A.382.382,0,0,0,158.457,254.637Z"
            transform="translate(-154.803 -242.275)"
          />
          <path
            d="M228.527,254.637a.382.382,0,0,0,.382-.382v-4.3a.382.382,0,1,0-.764,0v4.3A.382.382,0,0,0,228.527,254.637Z"
            transform="translate(-222.825 -242.275)"
          />
          <path
            d="M298.6,254.637a.382.382,0,0,0,.382-.382v-4.3a.382.382,0,1,0-.764,0v4.3A.382.382,0,0,0,298.6,254.637Z"
            transform="translate(-290.845 -242.275)"
          /></svg></span>
      </div>
    </li>
    <li class="card flex a_c j_c" @click.stop="gotoCreateCard">
      <span class="card-add-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.291 12.064">
          <path
            d="M14.942,5.656,9.688.316a1.048,1.048,0,0,0-1.5,0L5.311,3.239a1.106,1.106,0,0,0,0,1.537l.477.5h1.1L5.861,4.217a.3.3,0,0,1-.083-.21A.294.294,0,0,1,5.861,3.8l.38-.374L8.047,5.274H9.779L7.107,2.545,8.739.881a.284.284,0,0,1,.2-.087.276.276,0,0,1,.2.082l5.255,5.339a.287.287,0,0,1,.083.2.3.3,0,0,1-.091.2l-.3.3V8.034l.848-.854A1.09,1.09,0,0,0,14.942,5.656Z"
            transform="translate(-3.959 0)"
          />
          <path
            d="M9.609,21.328H2.177A1.088,1.088,0,0,0,1.091,22.4v2.856h9.565V22.4A1.055,1.055,0,0,0,9.609,21.328ZM3.688,24.286a.762.762,0,0,1-.534-.219.762.762,0,0,1-.534.219.784.784,0,0,1,0-1.568.761.761,0,0,1,.534.219.761.761,0,0,1,.534-.219.784.784,0,0,1,0,1.568Z"
            transform="translate(-1.091 -15.553)"
          />
          <path
            d="M1.091,40.4a1.094,1.094,0,0,0,1.086,1.08H9.609a1.061,1.061,0,0,0,1.047-1.08v-.063H1.091Z"
            transform="translate(-1.091 -29.412)"
          />
        </svg>
      </span>
      {{ $t('addCard') }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    selected: {
      type: Number
    },
    page: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['PAYMENTS', 'CURRENT_PAYMENT'])
  },
  methods: {
    switchMastercard (cardNumber) {
      const int = cardNumber.slice(0, 2)
      switch (int) {
        case '51':
        case '52':
        case '53':
        case '54':
        case '55':
          return true
        default:
          return false
      }
    },
    switchMaestro (cardNumber) {
      const int = cardNumber.slice(0, 2)
      switch (int) {
        case '50':
        case '56':
        case '57':
        case '58':
        case '63':
        case '67':
          return true
        default:
          return false
      }
    },

    gotoCreateCard () {
      // Помечяем создание новой карты
      this.$store.commit('SET_SELECTED_CARD', undefined)
      this.$router.push(this.localePath('/profile/payments'))
    },
    deleteCard (paymentId) {
      this.$emit('toggle-prompt-popup', paymentId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.card.selected {
  border-color: $orange !important;
  color: $c-green !important;
}

.card-add-icon {
  svg {
    fill: $c-green;
    width: 28px;
    height: 28px;
    margin-right: 1rem;
  }
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.card {
  position: relative;
  width: 49%;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #e2e2e2;
  cursor: pointer;
  border-radius: 7px;

  &.active {
    @media screen and (min-width: 992px) {
      background-color: #e2e2e2;
      color: $c-green;
    }

    svg {
      @media screen and (min-width: 992px) {
        fill: $c-light;
      }
    }
  }

  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 14px;
    margin-right: 4rem;
  }

  &-number {
    font-family: $ff-gilroy;
    font-size: 16px;
    font-weight: normal;
    white-space: nowrap;

    @media screen and (min-width: 992px) {
      font-size: 14px;
    }

    &-dots {
      font-size: 20px;
      font-weight: bold;

      @media screen and (min-width: 992px) {
        font-size: 18px;
      }
    }
  }

  &_actions {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &-action {
    flex: 0 0 15px;
    width: 15px;
    height: 15px;
    cursor: pointer;

    &:last-child {
      margin-left: 10px;
    }

    svg {
      width: 100%;
      height: 100%;
      fill: $c-primary;

      @media screen and (min-width: 992px) {
        fill: #c4c4c4;
      }
    }
  }
}
</style>
