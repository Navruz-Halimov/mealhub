<i18n>
{
  "en": {
    "addCard": "Add debit card"
  },
  "ru": {
    "addCard": "Добавить банковскую карту"
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
      <div class="card_actions">
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
    <li v-if="page === 'order'" class="card">
      <p class="card-number wide flex a_c j_c" @click="gotoCreateCard">
        <img class="addCardIcon mr-1" src="/images/icons/add_card.svg">{{
          $t('addCard')
        }}
      </p>
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
      if (!cardNumber) {
        return false
      }

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
      if (!cardNumber) {
        return false
      }

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
  border-color: $c-green !important;
}

.cards {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
}

.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: {
    width: 1px;
    style: solid;
    color: $c-line;
  }
  border-top: none;
  padding: 10px;
  cursor: pointer;

  @media screen and (min-width: 992px) {
    border: {
      width: 1px;
      style: solid;
      color: $c-line;
    }
  }

  &:first-child {
    @media screen and (min-width: 992px) {
      border-top: {
        width: 1px;
        style: solid;
        color: $c-line;
      }
    }
  }

  &.active {
    @media screen and (min-width: 992px) {
      border: none;
      background-color: $orange;
      color: $c-light;
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

    @media screen and (max-width: 991px) {
      height: 18px;
      margin-right: 3rem;
    }
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
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &-action {
    flex: 0 0 15px;
    width: 15px;
    height: 15px;
    cursor: pointer;

    @media screen and (max-width: 991px) {
      flex: 0 0 20px;
      width: 20px;
      height: 20px;
    }

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
