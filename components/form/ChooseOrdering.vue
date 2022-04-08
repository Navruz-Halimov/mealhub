<i18n>
{
  "en": {
    "title": "Choose what you want to do next",

    "goeatOrderingLabel": "Go to the restaurant right now",
    "goeatOrderingDetails1": "Use our Go & Eat express service to get started right now take a free table at the chosen restaurant, pay and go to eat",
    "goeatOrderingDetails2": "take a free table at the chosen restaurant, pay and go to eat",

    "deliveryOrderingLabel": "Order food delivery from the restaurant",
    "deliveryOrderingDetails1": "Order food to your address",

    "selfOrderingLabel": "Takeaway food at the restaurant yourself",
    "selfOrderingDetails1": "Take the order from the restaurant yourself",

    "errorNoType": "Choose order type!",
    "createOrderError": "Create order error",

    "nextBtn":"Choose service"
  },
  "ru": {
    "title": "Выберите, что вы хотите делать дальше",
    "goeatOrderingLabel":"Пойти в заведение прямо сейчас",
    "goeatOrderingDetails1":"Воспользуйтесь нашим экспресс-сервисом Go&Eat, чтобы прямо сейчас занять свободный столик в выбраном заведении, оплатить и пойти поесть",
    "goeatOrderingDetails2":"занять свободный столикв выбраном заведении, оплатить и пойти поесть",

    "deliveryOrderingLabel":"Заказать доставку еды из заведения",
    "deliveryOrderingDetails1":"Закажите еду на Ваш адрес",

    "selfOrderingLabel":"Забрать еду в заведении самостоятельно",
    "selfOrderingDetails1":"Заберите заказ из ресторана самостоятельно",

    "errorNoType":"Выберите тип заказа!",
    "createOrderError":"Ошибка создания заказа",

    "nextBtn":"Выбрать сервис"
  }
}
</i18n>

<template>
  <section v-if="!$_.isNil(CURRENT_CATERING)" class="chooseOrdering">
    <div class="toll">
      <div class="catering">
        <h1 class="roboto wide flex a_c j_c text-xxl mb-4 desktop">
          {{ $t('title') }}
        </h1>
        <h1 class="roboto wide flex a_c j_c text-20 mb-2 mobile">
          {{ $t('title') }}
        </h1>
        <div v-if="CURRENT_CATERING.available_go_and_eat" class="flex wide j_c mt-1e mb-1">
          <div class="wide">
            <p class="flex a_c w-8 ml-a mr-a desktop" @click="type='go_and_eat'">
              <span class="res_tip mr-1" :class="{'active':type==='go_and_eat'}">•</span>
              <span class="text-20 green">{{ $t('goeatOrderingLabel') }}</span>
            </p>
            <p class="flex a_c wide text-left ml-a mr-a mobile" @click="type='go_and_eat'">
              <span class="res_tip mr-1" :class="{'active':type==='go_and_eat'}">•</span>
              <span class="text-xl green">{{ $t('goeatOrderingLabel') }}</span>
            </p>
            <p class="typedescription text-lg w-8 ml-a mr-a text-left">
              {{ $t('goeatOrderingDetails1') }}
            </p>
          </div>
        </div>
        <div v-if="CURRENT_CATERING.available_delivery" class="flex wide j_c mt-1e mb-1">
          <div class="wide">
            <p class="flex a_c w-8 ml-a mr-a desktop" @click="type='delivery'">
              <span class="res_tip mr-1" :class="{'active':type==='delivery'}">•</span>
              <span class="text-20 green">{{ $t('deliveryOrderingLabel') }}</span>
            </p>
            <p class="flex a_c wide text-left ml-a mr-a mobile" @click="type='delivery'">
              <span class="res_tip mr-1" :class="{'active':type==='delivery'}">•</span>
              <span class="text-xl green">{{ $t('deliveryOrderingLabel') }}</span>
            </p>
            <p class="typedescription text-lg w-8 ml-a mr-a text-left">
              {{ $t('deliveryOrderingDetails1') }}
            </p>
          </div>
        </div>
        <div v-if="CURRENT_CATERING.available_pickup" class="flex wide j_c mt-1e mb-1">
          <div class="wide">
            <p class="flex a_c w-8 ml-a mr-a desktop" @click="type='pickup'">
              <span class="res_tip mr-1" :class="{'active':type==='pickup'}">•</span>
              <span class="text-20 green">{{ $t('selfOrderingLabel') }}</span>
            </p>
            <p class="flex a_c wide text-left ml-a mr-a mobile" @click="type='pickup'">
              <span class="res_tip mr-1" :class="{'active':type==='pickup'}">•</span>
              <span class="text-xl green">{{ $t('selfOrderingLabel') }}</span>
            </p>
            <p class="typedescription text-lg w-8 ml-a mr-a text-left">
              {{ $t('selfOrderingDetails1') }}
            </p>
          </div>
        </div>

        <div class="btns">

          <button class="btn eatme-btn-colorful" @click="runOrder">
            {{ $t('nextBtn') }}
          </button>
          <!-- <div v-if="type==='go_and_eat'" class="btn eatme-btn-colorful" @click="runOrder">
            {{ $t('nextBtn') }}
          </div>
          <div v-if="type==='delivery'" class="btn eatme-btn-colorful" @click="runOrder">
            {{ $t('nextBtn') }}
          </div>
          <div v-if="type==='pickup'" class="btn eatme-btn-colorful" @click="runOrder">
            {{ $t('nextBtn') }}
          </div> -->

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    personquantity: {
      type: Number
    }
  },
  data () {
    return {
      type: '',
      p_count: 0
    }
  },
  computed: {
    ...mapGetters(['CURRENT_CATERING', 'CURRENT_CATERING_ORDER'])
  },
  mounted () {
    if (this.CURRENT_CATERING.available_go_and_eat) {
      this.type = 'go_and_eat'
    } else if (this.CURRENT_CATERING.available_delivery) {
      this.type = 'delivery'
    } else if (this.CURRENT_CATERING.available_pickup) {
      this.type = 'pickup'
    }
  },
  methods: {
    runOrder () {
      localStorage.personquantity = this.personquantity
      if (this.type === 'go_and_eat') {
        this.runGoAndEat()
      } else if (this.type === 'delivery') {
        this.runDelivery()
      } else if (this.type === 'pickup') {
        this.runSelf()
      } else { this.$store.commit('SET_ERROR_NOTIFY', this.$t('errorNoType')) }
    },

    runGoAndEat () {
      this.$store.commit('SET_GOEATPOPUP', true)
      this.$emit('close-popup')
    },
    runDelivery () {
      this.$store.commit('SET_DELIVERY_POPUP_WORK')
      this.$emit('close-popup')
    },
    runSelf () {
      this.$store.commit('SET_PICKUPPOPUP', true)
      this.$emit('close-popup')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/abstract/var";
@import "~/assets/styles/abstract/mixins";
@import "~/assets/styles/classes/class";

  .roboto {
    font-family: $ff-roboto;
  }

  .res_tip{
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-top: 1px;
    font-size: 4rem;
    color: #E2E2E2;
    width: 2.5rem;
    flex: 0 0 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid #E2E2E2;
  }
  .res_tip.active{
    color:$orange;
  }

  .text-xl{
    font-size: 18px;
  }
  .horizon{
    margin-top: 2rem;
    margin-bottom: 3rem;
    border-top:2px solid $c-line;
  }

  .chooseOrdering{
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
      margin-top:2.5rem;
      margin-bottom:1rem;
      font-weight: 100;
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

    .btns{
      display: flex;
      justify-content: center;
      margin-top: 3em;
      margin-bottom: 1em;

      // .btn {
      //   margin: auto;
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      // }

      .btn.disabled {
        background: #9d9d9d;
        box-shadow: 0px 3px 6px #9d9d9d;
      }
    }

  }

  @media screen and (min-width: 992px) {
    .typedescription {
      padding-left: 35px !important;
    }
  }
  @media screen and (max-width: 991px) {

    .chooseOrdering{

      font-size:18px;

      &>div{
        width:85%;
        margin-left:auto;
        margin-right:auto;
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
        font-size: 22px;
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
      font-size: 14px;

      .youChoosed{
        font-size: 14px;
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
        // display: block;
        margin-top: 3em;

        .btn.disabled {
          margin-bottom:4rem;
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
