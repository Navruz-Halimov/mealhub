<i18n>
{
  "en": {
    "title": "Are you sure you want to exit ordering and start another one?",

    "startBtn" : "No",
    "startBtnOk" : "Yes",

    "saveCartMessage": "Save cart of this catering"
  },
  "ru": {
    "title": "Вы точно хотите выйти из оформления заказа и начать другой?",

    "startBtn" : "Нет",
    "startBtnOk" : "Да",
    "saveCartMessage": "Сохранить корзину"
  }
}
</i18n>

<template>
  <section v-if="currentCatering" class="anotherOrderForm">
    <div class="catering text-lg">
      <h1 class="f flex col a_c j_c roboto">
        <Logo class="sdfhdgfnd mb-2" />
        <span class="w-8" :class="{ 'text-xxl': !isMobile, 'text-20': isMobile }">
          {{ $t('title') }}
        </span>
      </h1>
      <div
        v-if="cartCatering() === currentCatering.id"
        class="flex j_c wide"
      >
        <p class="mt-2">
          <basic-input-checkbox v-model="saveCart">
            {{ $t('saveCartMessage') }}
          </basic-input-checkbox>
        </p>
      </div>

      <div class="btns">
        <div
          v-if="cartCatering() === currentCatering.id"
          class="btn eatme-btn-grey"
          @click="replaceOrder()"
        >
          {{ $t('startBtnOk') }}
        </div>
        <div
          v-else
          class="btn eatme-btn-grey"
          @click="saveCart=false; replaceOrder()"
        >
          {{ $t('startBtnOk') }}
        </div>

        <div class="btn eatme-btn-colorful" @click="$emit('close-popup')">
          {{ $t('startBtn') }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    callback: [Function, Boolean]
  },
  data () {
    return {
      saveCart: true,
      currentCatering: {},
      p_count: 0
    }
  },
  watch: {
    'CURRENT_CATERING' (val) {
      if (val) {
        this.currentCatering = this.CURRENT_CATERING
      }
    }
  },
  created () {
    this.currentCatering = this.CURRENT_CATERING || { id: this.currentOrder && this.currentOrder.catering_id }
  },
  computed: {
    ...mapGetters(['CURRENT_CATERING', 'CURRENT_CATERING_ORDER', 'CART_ITEMS'])
  },
  methods: {
    replaceOrder () {
      console.warn('AnotherOrderExist replaceOrder')
      if (this.saveCart === false) {
        this.clearCart()
      }

      this.$emit('close-popup')
      this.$forceUpdate()
      // this.setOrder(null)
      if (this.callback) { this.callback() }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/abstract/var";
@import "~/assets/styles/abstract/mixins";
@import "~/assets/styles/classes/class";

  .sdfhdgfnd{
    width: 120px;
    height: 120px;
  }

  .text-xl{
    font-size: 18px;
  }
  .horizon{
    margin-top: 2rem;
    margin-bottom: 3rem;
    border-top:2px solid $c-line;
  }

  .anotherOrderForm{
    position: relative;
    grid-area: body;
    display: flex;
    border-radius: 0;
    width: 100%;
    overflow: auto;
    flex-direction: column;
    text-align:center;
    font-size:16px;
    z-index: 1000 !important;
    justify-content: center;

    .title{
      margin-top: 2.5rem;
      margin-bottom: 1rem;
    }

    .steps{
      position:relative;
      margin: 1rem 0 2rem;
      cursor:initial;

      .step{
        position:relative;
        width:8em;
        font-weight: bold;
        text-transform: uppercase;
      }
      .spacer{
        position:relative;
        display:block;
        width:8rem;
        height:1px;
        border-top: 1px dashed $c-green;
        margin:0 1.5rem;
        &:after{
          position:absolute;
          top: -0.75em;
          font-size: 25px;
          right: -0.5em;
          color:$c-green;
          content: '►';
        }
      }

    }
  }

  .p_containter{
      width: 28rem;
      .p_count{
        font-size: 14px;
        cursor:pointer;
        text-align:center;
        padding: .85rem 1.15rem;
        width: 40px;
        border-radius:7px;
        box-shadow: 0px 1px 2px #ddd;
        border: 1px solid #eee;
      }
      .p_count.active{
        background:$orange;
        box-shadow: 0px 1px 2px $orange;
        border: 1px solid $orange;
        color:white;
      }
      .p_count_img{
        filter:contrast(0);
        margin-right:.5rem;
      }
      .p_count_ar{
        cursor:pointer;
        transform:rotate(-180deg)
      }
      .p_count_al{
        cursor:pointer;
      }
      .select_cont{
        width:100%;
      }
  }

</style>

<style lang="scss" scoped>
@import "~/assets/styles/abstract/var";
@import "~/assets/styles/abstract/mixins";
@import "~/assets/styles/classes/class";

  .catering{

    .youChoosed{
      color:#9d9d9d;
      margin-top:2rem;
      margin-bottom:1rem;
    }
    .cateringName{
      font-family: $ff-roboto;
      font-weight:bold;
    }

    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top:2em;
      margin-bottom: 3em;

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;

        &:last-child {
          margin-left: 80px;
        }
      }
    }

  }

  @media screen and (max-width: 991px) {

    .anotherOrderForm{

      font-size:18px;

      &>div{
        width:85%;
        margin-left:auto;
        margin-right:auto;
        height: 100%;
      }
      .aboutText{
        font-weight:initial;
        color:#5d5d5d;
        text-align:center;
        width: 80%;
        margin: auto;
      }
      .title{
        margin-top:2rem;

        img{
          height:32px;
        }
      }
      .steps{
        font-weight:initial;
        color:#5d5d5d;
        .step{
          text-transform: initial;
          font-weight:initial;
        }

      }
    }

    .catering{
      font-size:14px;

      .youChoosed{
        font-size:14px;
        margin-top: 1rem;
        margin-bottom: 0rem;
      }
      .cateringAddress{
        display:none;
      }
      .cateringName{
        color:$c-green;
      }

      .btns{
        width: 100%;
        margin-top: 1em;

        .btn.disabled {
          margin-bottom: 4rem;
        }
      }

    }

    .heading {
      &>div{
        display:block;
      }
    }
    .main_menu-back.mobile{
      font-size:14px;
      padding: 0 1rem;
      position:absolute;
    }
  }

</style>

<style>

  .validBlock.error .res_lable{
    color:#EB608F !important;
  }
  .validBlock.error input,
  .validBlock.error .p_count,
  .validBlock.error .res_input.person,
  .validBlock .display-time.is-empty
  {
    color:#EB608F !important;
    border:1px solid #EB608F !important;
  }

  .reservation_form .mx-datepicker{
    width: 10em !important;
  }

  .selectOccasion .vs__dropdown-toggle{
    padding:.5rem;
  }

  .selectOccasion .vs__actions::before{
    display: block;
    content: " ";
    background-image: url('~assets/icons/L_arrow.svg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 12px;
    height: 12px;
    overflow: visible;
  }
  .selectOccasion .vs__open-indicator{
    display:none !important;
  }

  .selectOccasion .vs__dropdown-menu{
    border-color:#e2e2e2 !important;
    width:100%;
  }
  .selectOccasion .vs__dropdown-option{
    padding: .75rem;
    font-size: 16px !important;
  }
  .selectOccasion .vs__dropdown-menu > .vs__dropdown-option--selected,
  .selectOccasion .vs__dropdown-menu > .vs__dropdown-option--highlight{
    color: inherit;
    background: white;
  }

  @media screen and (max-width: 991px) {
    .selectOccasion .vs__actions{
      transform: rotate(90deg);
    }
    .some_small_inputs .mx-input,
    .some_small_inputs .mx-datepicker,
    .some_small_inputs .time-picker{
      height: 40px !important;
    }
    .some_small_inputs .mx-datepicker input,
    .some_small_inputs .time-picker input{
      font-size: 14px !important;
      height: 40px !important;
      border-radius:7px;
    }
    .selectOccasion .vs__dropdown-toggle{
      height: 40px !important;
      padding: .25rem .5rem;
      box-shadow: 0px 2px 5px #ddd;
      border: 1px solid #eee;
      border-radius:7px;
    }

    .res_input.time .dropdown,
    .res_input.time .time-picker .select-list{
      width:10rem !important
    }

    .res_input.time .dropdown .hint{
      display:none !important;
    }

  }
</style>
