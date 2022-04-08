<i18n>
{
  "en": {
    "ahtung": "Attention!",
    "cancelm1": "If the order is canceled at this stage",
    "cancelm2": "money will not be returned!",
    "selectCancelCause": "If you want to cancel the order, please indicate the reason for the cancellation:",
    "c_save": "If you want to save this order, click the \"Save order \" ",

    "save_order": "Keep it",
    "cancel_order": "Cancel the order",

    "var1": "Changed plans",
    "var2": "I don't have time",
    "var3": "I'll go somewhere else",
    "var11": "Changed mind",
    "var21": "Erred in ordering",
    "var31": "Ordered elsewhere",
    "var41": "To long to wait",

    "var12": "Changed plans",
    "var22": "I don't have time",
    "var32": "Ordered elsewhere",
    "varYour": "Another reason",
    "varYourPlace": "Your reason",

    "place": "availible",
    "noplace": "unavailible",

    "more": "more"
  },
  "ru": {
    "ahtung": "Внимание!",
    "cancelm1": "При отмене заказа на данном этапе",
    "cancelm2": "денежные средства возвращены не будут!",
    "selectCancelCause": "Если Вы хотите отменить заказ, пожалуйста, укажите причину отмены:",
    "c_save": "Если Вы хотите сохранить данный заказ, нажмите кнопку \"Сохранить заказ\" ",

    "save_order": "Сохранить заказ",
    "cancel_order": "Отменить заказ",

    "var1": "Поменялись планы",
    "var2": "Не успеваю",
    "var3": "Пойду в другое место",

    "var11": "Передумал/а",
    "var21": "Ошибся/лась в заказе",
    "var31": "Заказал/а в другом месте",
    "var41": "Долго ждать",

    "var12": "Передумал/а",
    "var22": "Ошибся/лась в заказе",
    "var32": "Заказал/а в другом месте",
    "varYour": "Ваш вариант",
    "varYourPlace": "Ваш вариант",
    "place": "Доступны",
    "noplace": "нет",

    "more": "еще"
  }
}
</i18n>

<template>
  <div class="formCancel text-lg z10 wide text-center" @click.stop>
    <div class="container7 display-inline-block">
      <div class="text-center wide">
        <img height="128" width="128" src="/icons/caution.svg">
        <p :class="{ 'mb-2': isMobile, 'mb-3': !isMobile }">
          <b class="text-xxl roboto">{{ $t('ahtung') }}</b>
        </p>
        <p class="mt-2">
          {{ $t('cancelm1') }}
        </p>
        <p v-if="order.price !== 0" class="red mb-2">
          {{ $t('cancelm2') }}
        </p>
      </div>
      <p class="wide text-center">
        {{ $t('selectCancelCause') }}
      </p>
      <div class="wide checkboxes mt-2 text-center">
        <template
          v-if="
            IS_ORDER_CANCEL_WHY_POPUP &&
              IS_ORDER_CANCEL_WHY_POPUP.timing === 'cooking_timer'
          "
        >
          <basic-input-checkbox v-model="var1" class="chgoeat">
            {{ $t('var1') }}
          </basic-input-checkbox>
          <basic-input-checkbox v-model="var3" class="chgoeat">
            {{ $t('var3') }}
          </basic-input-checkbox>
          <basic-input-checkbox v-model="var2" class="chgoeat chgoeat-sm">
            {{ $t('var2') }}
          </basic-input-checkbox>
        </template>
        <template
          v-else-if="
            IS_ORDER_CANCEL_WHY_POPUP &&
              (IS_ORDER_CANCEL_WHY_POPUP.timing === 'pickup_timer' ||
                IS_ORDER_CANCEL_WHY_POPUP.timing === 'delivery_timer')
          "
        >
          <basic-input-checkbox v-model="var11" class="chgoeat">
            {{ $t('var11') }}
          </basic-input-checkbox>
          <basic-input-checkbox v-model="var21" class="chgoeat chgoeat-sm">
            {{ $t('var21') }}
          </basic-input-checkbox>
          <basic-input-checkbox v-model="var31" class="chgoeat">
            {{ $t('var31') }}
          </basic-input-checkbox>
          <basic-input-checkbox
            v-model="var41"
            class="element4 mobile chgoeat text-left"
          >
            {{ $t('var41') }}
          </basic-input-checkbox>
        </template>
        <template v-else>
          <basic-input-checkbox v-model="var1" class="chgoeat">
            {{ $t('var1') }}
          </basic-input-checkbox>
          <basic-input-checkbox v-model="var22" class="chgoeat chgoeat-sm">
            {{ $t('var22') }}
          </basic-input-checkbox>
          <basic-input-checkbox v-model="var32" class="chgoeat">
            {{ $t('var32') }}
          </basic-input-checkbox>
        </template>
        <!-- Bottom block-->
        <div class="flex flex-wrap wide desktop">
          <basic-input-checkbox
            v-if="
              IS_ORDER_CANCEL_WHY_POPUP &&
                IS_ORDER_CANCEL_WHY_POPUP.timing !== 'reserve_timer'
            "
            v-model="var41"
            class="chgoeat lbbnt w11e"
          >
            {{ $t('var41') }}
          </basic-input-checkbox>
          <basic-input-checkbox
            v-model="varYour"
            class="chgoeat lbbnt varYourCheckbox w11e"
            :class="{
              'mb-0': !(
                IS_ORDER_CANCEL_WHY_POPUP &&
                IS_ORDER_CANCEL_WHY_POPUP.timing !== 'reserve_timer'
              )
            }"
          >
            {{ $t('varYour') }}
          </basic-input-checkbox>
          <input
            v-if="vyr"
            v-model="cancelFormText"
            :class="{
              'flex-grow': !(
                IS_ORDER_CANCEL_WHY_POPUP &&
                IS_ORDER_CANCEL_WHY_POPUP.timing !== 'reserve_timer'
              )
            }"
            class="reason-textarea"
            :placeholder="$t('varYourPlace')"
          >
          <input
            v-else
            :disabled="true"
            :class="{
              'flex-grow': !(
                IS_ORDER_CANCEL_WHY_POPUP &&
                IS_ORDER_CANCEL_WHY_POPUP.timing !== 'reserve_timer'
              )
            }"
            class="reason-textarea"
            :placeholder="$t('varYourPlace')"
          >
        </div>
        <div class="mobile flex wide j_c text-left">
          <basic-input-checkbox
            v-model="varYour"
            class="checkbox chgoeat lbbnt mr-1 w-4"
          >
            {{ $t('varYour') }}
          </basic-input-checkbox>
          <div class="w-5 text-center">
            <textarea
              v-if="vyr"
              ref="yourReason"
              v-model="cancelFormText"
              :placeholder="$t('varYourPlace')"
              class="reason-textarea wide"
            />
            <textarea
              v-else
              ref="yourReason"
              :disabled="true"
              :placeholder="$t('varYourPlace')"
              class="reason-textarea wide"
            />
          </div>
        </div>
      </div>
      <div class="c_save wide mt-2 text-center">
        {{ $t('c_save') }}
      </div>
      <div class="flex j_b wide mt-3 reason-buttons">
        <button
          class="eatme-btn-grey"
          @click="
            IS_ORDER_CANCEL_WHY_POPUP.decline &&
              IS_ORDER_CANCEL_WHY_POPUP.decline()
          "
        >
          {{ $t('save_order') }}
        </button>
        <button
          v-if="cancelFormText"
          class="cancelbtn eatme-btn-red"
          @click="
            IS_ORDER_CANCEL_WHY_POPUP.success &&
              IS_ORDER_CANCEL_WHY_POPUP.success(cancelFormText)
          "
        >
          {{ $t('cancel_order') }}
        </button>
        <button v-else class="cancelbtn eatme-btn-disabled">
          {{ $t('cancel_order') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    order: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      successPromptIsOpen: false,
      vyr: false,
      cancelFormText: ''
    }
  },
  computed: {
    ...mapGetters(['IS_ORDER_CANCEL_WHY_POPUP']),
    var1: {
      get () {
        return this.cancelFormText === this.$t('var1')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var1') : ''
      }
    },
    var2: {
      get () {
        return this.cancelFormText === this.$t('var2')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var2') : ''
      }
    },
    var3: {
      get () {
        return this.cancelFormText === this.$t('var3')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var3') : ''
      }
    },

    var11: {
      get () {
        return this.cancelFormText === this.$t('var11')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var11') : ''
      }
    },
    var21: {
      get () {
        return this.cancelFormText === this.$t('var21')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var21') : ''
      }
    },
    var31: {
      get () {
        return this.cancelFormText === this.$t('var31')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var31') : ''
      }
    },
    var41: {
      get () {
        return this.cancelFormText === this.$t('var41')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var41') : ''
      }
    },
    var12: {
      get () {
        return this.cancelFormText === this.$t('var12')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var12') : ''
      }
    },
    var22: {
      get () {
        return this.cancelFormText === this.$t('var22')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var22') : ''
      }
    },
    var32: {
      get () {
        return this.cancelFormText === this.$t('var32')
      },
      set (s) {
        this.varYour = false
        this.cancelFormText = s ? this.$t('var32') : ''
      }
    },
    varYour: {
      get () {
        return this.vyr
      },
      set (s) {
        if (s) {
          this.var1 = false
          this.var2 = false
          this.var3 = false
          this.var11 = false
          this.var21 = false
          this.var31 = false
          this.var41 = false
          this.var12 = false
          this.var22 = false
          this.var32 = false
        }
        this.vyr = s
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/modificator';

.w11e {
  width: 11em !important;
}

.gbadfgadfgadsg {
  height: 5rem !important;
  margin-bottom: 5px !important;
  width: 98% !important;
}

@media screen and (max-width: 991px) {
  .reason-buttons {
    display: block;
    text-align: center;
    button {
      margin-bottom: 2rem;
    }
  }
}

.reason-buttons {
  margin: 30px auto 0 auto;

  button {
    margin-left: 10px;
    margin-right: 10px;
  }

  // @media screen and (max-width: 575px) {
  //   flex-direction: column;
  //   align-items: center;
  // }
}

.reason-textarea {
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  padding: 1rem;
  box-sizing: border-box;
  background: #fff 0 0 no-repeat padding-box;

  font-size: 14px !important;
  height: 5.5rem !important;
  width: 100% !important;

  @media screen and (max-width: 991px) {
    box-shadow: 0 3px 6px #00000029;
  }
  @media screen and (min-width: 992px) {
    width: 18em !important;

    &.flex-grow {
      flex: 1 0 auto;
    }
  }

  @media screen and (max-width: 575px) {
    padding-top: 3px;
  }
}
.reason-textarea:disabled {
  background: #f6f6f6;
}

.checkboxes {
  display: flex;
  flex-wrap: wrap;
}

.chgoeat {
  display: inline-grid;
  margin-bottom: 2rem;

  &.mb-0 {
    margin-bottom: 0;
  }

  @media screen and (min-width: 992px) {
    width: 15em;
  }
  text-align: left;
  &:first-child {
    @media screen and (min-width: 992px) {
      width: 12em;
    }
  }

  @media screen and (max-width: 991px) {
    width: 50%;
    margin-left: 0;
    text-align: left;
    margin-right: 0;
  }
}
.varYourCheckbox {
  margin-right: 0;
}
</style>

<style>
.formCancel .container7 {
  width: 75%;
}
@media screen and (max-width: 991px) {
  .formCancel .container7 {
    width: 90%;
  }
  .formCancel .checkboxes {
    justify-content: center !important;
  }
  .formCancel .reason-buttons {
    display: flex !important;
    justify-content: space-between;
  }
  .formCancel .reason-buttons button {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

.formCancel {
  overflow: auto;
}
</style>
