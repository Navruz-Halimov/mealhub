<i18n>
{
  "en": {

    "dayLabel":"Day:",
    "timeLabel":"Time:",

      "prevBtn":"Back",
      "nextBtn":"Next",

      "chooseDeliveryAddress":"Choose delivery address",

      "chooseOneOf":"Choose one of the provided methods below",
      "createAddress":"Add new address",

    "commentLabel" : "Description:",
    "commentPlaceholder" : "Comment text (maximun 100 symbols)",

    "needInTime" : "Need order in time",
    "addressMylocationLabel" : "Choose my geolocation",
    "addressFromAddressessLabel" : "Choose from 'my addresses' ",
    "restorantLabel": "Restaurant",

    "deliveryBtn" : "Accept delivery",
    "waitLabel" : "After selecting the data, wait for the confirmation of the booking from the manager",
    "checkYourFields" : "Check your fields",
    "waitNotify" : "Wait for manager's response",

    "noname": "Without name"
  },
  "ru": {

    "dayLabel":"День:",
    "timeLabel":"Время:",

      "prevBtn":"Назад",
      "nextBtn":"Оплатить",

      "chooseDeliveryAddress":"Выберите адрес доставки",

      "chooseOneOf":"Выберите один из ниже предоставленых способов",
      "createAddress":"Добавить новый адрес доставки",

    "commentLabel" : "Комментарий к заказу:",
    "commentPlaceholder" : "Текст комментария (не более 100 символов)",

    "needInTime" : "Нужен заказ в определенное время",
    "addressMylocationLabel" : "Выбрать моё местоположение",
    "addressFromAddressessLabel" : "Выбрать адрес из списка 'мои адреса' ",
    "restorantLabel": "Ресторан",

    "deliveryBtn" : "Подтвердить бронирование",
    "waitLabel" : "После выбора данных дождитесь подтверждения бронирование от менеджера",
    "checkYourFields" : "Проверте введённую информацию",
    "waitNotify" : "Ожидайте подтверждения от менеджера",

    "noname": "Без названия"
  }
}
</i18n>

<template>
  <div class="aboutDelivery wide">
    <section class="deliverY">
      <div class="container">
        <div class="body">
          <div class="delivery_form">
            <h1 class="title roboto flex a_c j_c mb-2">
              <b class="mobile green text-20">{{ $t('chooseDeliveryAddress') }}</b>
              <b class="desktop text-xxl mb-1">{{ $t('chooseDeliveryAddress') }}</b>
            </h1>

            <p class="cateringMenu-name mobile wide text-center text-lg">
              <nuxt-link :to="localePath({ path: `/catering/${catering.id}` })">
                {{ $t('restorantLabel') }} {{ catering.name }}
              </nuxt-link>
            </p>

            <OrderingDetails class="green roboto" />

            <div class="wrapPickupInfo desktop">
              <div class="delivery_columns flex col wide j_c">
                <div class="wide col1">
                  <div class="flex res_checkbox cursor-pointer" @click="isMyLocation = true">
                    <span class="res_tip" :class="{active: isMyLocation}" @click="isMyLocation = true">•</span>
                    <span class="ml-1 text-xl">{{ $t('addressMylocationLabel') }}</span>
                  </div>
                  <div v-if="adr_list" class="flex mt-1e res_checkbox cursor-pointer FromAdressess" @click="isFromAdressess = true">
                    <span class="res_tip" :class="{active: isFromAdressess}" @click="isFromAdressess = true">•</span>
                    <div class="ml-1 wide text-left">
                      <span class="text-xl">{{ $t('addressFromAddressessLabel') }}:</span>
                      <div class="orderDelivery_group_selectWrap mt-1 wide">
                        <basic-input-select
                          v-model="address"
                          placeholder="Выбрать из адресов доставки"
                          :options="adr_list"
                          :searchable="false"
                          :clearable="false"
                          :disabled="isMyLocation"
                          label="name"
                          class="orderDelivery_group-select"
                          :class="{'disabled': isMyLocation, 'error': $v.address.$error}"
                        />
                      </div>
                    </div>
                  </div>

                  <nuxt-link class="mt-1e flex" :to="localePath('/profile/addresses')">
                    <div class="flex a_c" @click="setCreatingAddress">
                      <img src="/icons/map_green.svg" height="28">
                      <span class="underline ml-1">{{ $t('createAddress') }}</span>
                    </div>
                  </nuxt-link>
                </div>
                <div class="pl-3 wide col2 mt-1e">
                  <div class="validBlock wide" :class="{error: $v.writeHere.$error}">
                    <p class="textareaWrap flex a_c wide text-lg">
                      <span class="w-25 text-left">{{ $t('commentLabel') }}</span>
                      <textarea
                        ref="comment_writeHere_update"
                        v-model="writeHere"
                        class="writeHere wide text-lg"
                        :class="{error: $v.writeHere.$error}"
                        :placeholder="$t('commentPlaceholder')"
                        @input="$v.writeHere.$touch()"
                      />
                      <span class="textarea_counter">{{ writeHere && writeHere.length }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="wrapPickupInfo mobile">
              <div class="delivery_columns flex wide j_c">
                <div class="wide">
                  <div v-if="adr_list" class="flex mt-1e FromAdressess">
                    <div class="wide">
                      <basic-input-checkbox v-model="isMyLocation" class="ml-05 mb-1 text-left">
                        {{ $t('addressMylocationLabel') }}
                      </basic-input-checkbox>
                      <nuxt-link class="pt-1 pb-1 flex a_c bt1" :to="localePath('/profile/addresses')">
                        <div class="flex a_c" @click="setCreatingAddress">
                          <img src="/icons/map_green.svg" height="28">
                          <span class="text-xl">{{ $t('createAddress') }}</span>
                        </div>
                      </nuxt-link>
                      <div>
                        <ul class="mobile_adr_list mt-1">
                          <li
                            v-for="(adddr, i) in adr_list"
                            :key="i"
                            class="mobile_adr_list_item pt-1 pb-1 pl-1 pr-1 wide flex cursor-pointer a_c text-left"
                            :class="{'selected': address === adddr.name }"
                            @click.stop="address = adddr.name"
                          >
                            <img class="mobile_adr_list_item_icon" src="/icons/catering/new/point-grey.svg">
                            <span class="mobile_adr_list_item_name ml-1 mr-2 wide text-lg">{{ adddr.name }}</span>
                            <span class="mobile_adr_list_item_settings ml-2">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.405 14.104"><path d="M12.425,5.661,12.062,4.8a15.684,15.684,0,0,0,.771-1.982l-1.12-1.094a15.478,15.478,0,0,0-1.987.8l-.881-.356A15.557,15.557,0,0,0,7.96.226H6.38a14.667,14.667,0,0,0-.83,1.939l-.879.357a16.306,16.306,0,0,0-2.024-.755L1.527,2.862A14.766,14.766,0,0,0,2.34,4.808l-.364.863A16.487,16.487,0,0,0,0,6.535V8.084A15.3,15.3,0,0,0,1.981,8.9l.364.861a15.767,15.767,0,0,0-.772,1.981l1.12,1.1a15.747,15.747,0,0,0,1.986-.8l.881.357a15.451,15.451,0,0,0,.885,1.934H8.026a14.756,14.756,0,0,0,.83-1.939l.882-.357a16.432,16.432,0,0,0,2.021.756l1.12-1.095a14.605,14.605,0,0,0-.814-1.946l.363-.863a16.308,16.308,0,0,0,1.977-.867V6.471A15.322,15.322,0,0,0,12.425,5.661ZM9.512,7.277A2.31,2.31,0,1,1,7.2,5.019,2.288,2.288,0,0,1,9.512,7.277Z" transform="translate(0 -0.226)" /></svg>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br>
            <div class="mt-1 flex j_c">
              <div class="buttonsCart desktop text-lg">
                <div class="buttonsCart-prev">
                  <button class="prevBtn eatme-btn-grey" @click="goToBack">
                    <span> {{ $t("prevBtn") }}</span>
                  </button>
                </div>
                <div>
                  <button v-if="!($v.$invalid)" class="nextBtn eatme-btn-red" @click="goToPayment()">
                    <span> {{ $t("nextBtn") }}</span>
                  </button>
                  <button v-else class="nextBtn eatme-btn-disabled">
                    <span> {{ $t("nextBtn") }}</span>
                  </button>
                </div>
              </div>
              <div class="buttonsCart mobile text-lg">
                <button class="nextBtn eatme-btn-grey" @click="goToBack">
                  <span> {{ $t("prevBtn") }}</span>
                </button>
                <button v-if="!($v.$invalid)" class="nextBtn eatme-btn-red" @click="goToPayment()">
                  <span> {{ $t("nextBtn") }}</span>
                </button>
                <button v-else class="nextBtn eatme-btn-disabled">
                  <span> {{ $t("nextBtn") }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { required, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
// CSS
import 'vue2-timepicker/dist/VueTimepicker.css'
import 'vue2-datepicker/index.css'

export default {
  props: {
    catering: {
      type: Object
    }
  },
  data () {
    return {

      isfromaddr: true,
      ismyloc: false,

      isWaitLabel: false,
      address: null,
      latitude: null,
      longitude: null,

      writeHere: '',
      needInTime: false,
      my_date: '12.05.2021',
      my_time: {
        HH: '16',
        mm: '32'
      },

      type: 'occasion',
      occasion: '',
      event: '',

      p_count: 0,
      tables: '',
      reserve_hall: false,
      reserve_all: false

    }
  },

  watch: {
    'writeHere' () {
      this.$v.$touch()
    },
    'address' (val) {
      if (val !== (this.latitude + ' ' + this.longitude)) {
        this.latitude = null
        this.longitude = null
      }
    }
  },
  computed: {
    adr_list () {
      const temp = []

      for (const i in this.ADDRESSES) {
        const a = this.ADDRESSES[i]
        temp.push(this.getAddressObject(a))
      }

      return temp.reverse()
    },
    isMyLocation: {
      get () {
        return this.ismyloc
      },
      set (val) {
        this.ismyloc = val
        this.eatmeUserGeolocation().then(
          (position) => {
            console.warn({
              lat: parseFloat(position.coords.latitude),
              lng: parseFloat(position.coords.longitude)
            })

            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyBesbWEzXNLD82LezmO0CMxpYBNq2a3cgI`).then(e => e.json()).then(
              ({ results }) => {
                console.warn('Address detected', results, this.address)
                this.address = results[0] && results[0].formatted_address
                if (!this.address) {
                  this.latitude = position.coords.latitude
                  this.longitude = position.coords.longitude
                  this.address = position.coords.latitude + ' ' + position.coords.longitude // for text field
                }
              }
            ).catch(() => {
              this.latitude = position.coords.latitude
              this.longitude = position.coords.longitude
              this.address = position.coords.latitude + ' ' + position.coords.longitude // for text field
            })
          }
        )
        this.isfromaddr = false
      }
    },
    isFromAdressess: {
      get () {
        return this.isfromaddr
      },
      set (val) {
        this.isfromaddr = val
        this.ismyloc = false
      }
    },

    cateringId () {
      const id = this.CART_ITEMS[0] && this.CART_ITEMS[0].catering_id
      return id
    },
    cateringName () {
      return this.CART_ITEMS[0] && (this.CART_ITEMS[0].catering_name || this.CART_ITEMS[0].catering)
    },
    time () {
      return this.my_time.HH + ':' + this.my_time.mm
    },
    ...mapGetters([
      'RESERVE',
      'CART_ITEMS',
      'PERSONAL_DATA',
      'ADDRESSES',
      'CURRENT_CATERING_ORDER',
      'IS_CREATING_ADDRESS',
      'CREATED_ADDRESS'
    ])
  },
  validations: {
    address: {
      required
    },

    writeHere: {
      maxLength: maxLength(100)
    }
  },
  async mounted () {
    const comment = this.CURRENT_CATERING_ORDER.comment
    if (comment) {
      this.writeHere = comment
    }

    await this.$store.dispatch('GET_ADDRESSES', this.$cookies)

    if (this.CREATED_ADDRESS) {
      this.isFromAdressess = true

      const lastAddress = this.CREATED_ADDRESS
      this.address = lastAddress ? this.getAddressObject(lastAddress).name : null
      this.$store.commit('SET_CREATED_ADDRESS', null)
      return
    }

    const addressId = this.CURRENT_CATERING_ORDER.delivery_address_id
    if (addressId !== null) {
      this.isFromAdressess = true

      const address = this.ADDRESSES.find(item => item.id === addressId)
      this.address = address ? this.getAddressObject(address).name : null
    }
  },
  methods: {
    /*
      @EVENTS
    */
    setCreatingAddress () {
      this.$store.commit('SET_CREATING_ADDRESS', true)
      console.log(this.IS_CREATING_ADDRESS)
    },
    getAddressObject (address) {
      return {
        id: address.id,
        name: address.address || this.$t('noname')
      }
    },
    getForm () {
      let form = { }
      if (this.writeHere) {
        form = {
          ...form,
          comment: this.writeHere
        }
      }

      if (this.address.id) {
        form = {
          ...form,
          user_address_id: this.address.id
        }
      } else if (this.latitude) {
        form = {
          ...form,
          latitude: this.latitude,
          longitude: this.longitude
        }
      } else {
        form = {
          ...form,
          address: this.address
        }
      }

      return form
    },
    async goToPayment () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        setTimeout(() => {
          this.$store.commit('SET_ERROR_NOTIFY', this.$t('checkYourFields'))
        }, 100)
      } else {
        const currentOrder = this.currentOrderMethod()

        const cookiz = this.$cookies
        const id = currentOrder.catering_id
        const orderID = currentOrder.id
        const form = this.getForm()

        try {
          const res = await this.$store.dispatch('DELIVERY_TO_CURRENT_CATERING_ORDER', { cookiz, id, orderID, form })
          const data = res && res.data
          console.warn('goToPayment DELIVERY_TO_CURRENT_CATERING_ORDER', data)
          if (data && data.status === 'success') {
            if (data.order) { this.setOrder(data.order) }
            this.$router.push(this.localePath({ path: `/ordering/${id}/pay` }))
          } else {
            this.$store.commit('SET_ERROR_NOTIFY', true)
          }
        } catch (err) {
          console.log(err.response)
          if (err.response && err.response.status === 422) {
            this.$store.commit('SET_DELIVERY_POPUP_AREA_ERROR')
          }
        }
      }
    },
    goToBack () {
      this.$parent.$emit('close-popup')
    }

  }
}
</script>

<style lang="scss"  scoped>
  @import "~/assets/styles/abstract/var";
  @import "~/assets/styles/abstract/mixins";
  @import "~/assets/styles/classes/class";
  @import '~/assets/styles/modificator';

  .orderDelivery_group-select.error{
    border-color: $c-error !important;
     color: $c-error;
  }

  .bt1{
    border-top: 1px solid #aaa;
  }

  .mobile_adr_list_item_icon{
    display: flex;
    align-items: center;
    margin-top: 3px;
    width: 20px;
    flex: 0 0 20px;
    height: 20px;
    object-fit: cover;
  }
  .mobile_adr_list_item_settings{
    width: 18px;
    flex: 0 0 18px;
    height: 18px;
    cursor: pointer;
    display: none;
  }
  .mobile_adr_list_item_settings svg{
    width: 100%;
    height: 100%;
    fill: #555;
  }

  .FromAdressess{
    align-items:flex-start;

    & /deep/ .checkbox-txt {
      font-size: 16px;
    }
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

    line-height: 1rem;
  }
  .res_tip.active{
    color:$orange;
  }

  .wrapPickupInfo{
    width: 60em;
    max-width: 100%;
    margin: 1rem auto;
  }

  .infoWindow{
    padding: 0 0 4rem 0;
    /*border-top:1px dashed #E2E2E2;
    border-bottom:1px dashed #E2E2E2;*/

    text-align:center;
  }

  * ::selection { background: transparent !important; }

  .container{
    padding:0 1rem;
  }
  .header{
    padding:2rem 0 1rem;
    color: #555;
    border-bottom: 1px solid $c-line;
    .first{
      b{
        color: #979797;
        color: initial;
      }
      b, .spanid{
        margin-right:2rem;
      }
    }
    .cateringAddress{
      color: initial;
      & > img{
        height:20px;
        margin-right:1rem;
      }
    }
    .route{
      display: flex;
      justify-content: center;
      align-items: center;
      border-width: 1px;
      border-style: solid;
      border-color: #A2A2A2;
      border-radius: 50%;
      padding: 6px;
      width: 30px;
      height: 30px;
      margin-left:1rem;
      box-shadow: 0px 4px 8px #1ca79012;
      cursor: pointer;
      img{
        filter: grayscale(1);
        height:16px;
      }
    }

    .social{
      &-review {
        font-family: $ff-gilroy;
        font-size: 14px;

        &-count {
          color: $c-green;
        }
      }
    }

    /*asda sd*/
    .headeractions{
      margin:0 .5rem 0 1rem;
    }
    .catering_socialAction {
      grid-area: social;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 5px;
      align-items: center;

      @media screen and (max-width: 991px) {
        margin-right: 2rem;
      }

      &-item {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 7px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          box-shadow: 0px 4px 8px #1ca79012;
          cursor: pointer;

          border: 1px solid #A2A2A2;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          &.desktop {
            @media screen and (min-width: 992px) {
              display: flex;
              border: 1px solid #A2A2A2;
              margin-left:.5rem;
            }
          }

          &.mobile {
            border: 1px solid $c-icon-green;
          }
        }
      }

  }

  .deliverY{
    position: relative;
    grid-area: body;
    display: flex;
    border-radius: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    flex-direction: column;
    font-size:16px;
  }

</style>

<style lang="scss"  scoped>

  @import "~/assets/styles/abstract/var";
  @import "~/assets/styles/abstract/mixins";
  @import "~/assets/styles/classes/class";

  .mobile_adr_list_item {
    padding: 5px !important;
  }
  .mobile_adr_list_item.selected{
    background: #e2e2e2;
    border-top: 1px solid rgba(255, 255, 255, 0);
  }
  .mobile_adr_list_item:not(.selected){
    border-top: 1px solid #e2e2e2;
  }

  .res_checkbox{
    display:flex;
    font-size: 14px;
  }
  .rchk2{
    margin-top: 1rem;
  }

  .body{
    padding: 1rem 0;

    .icon_table{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 7px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      box-shadow: 0px 4px 8px #1ca79012;
      border:1px solid $c-green;
      cursor: pointer;
      margin-right:1rem;
    }

    .delivery_form{
      padding: 0 4rem;
      width:100%;

      .costTitle{
        margin:1rem 0;
      }

      .buttonsCart {
        display: flex;

        button {
          white-space: nowrap;
        }
        .nextBtn {
          margin-left: 80px;
        }
        @media screen and (max-width: 992px) {
          flex-direction: row;

          .nextBtn:first-child {
            margin-left: 0;
          }
        }
        @media screen and (max-width: 425px) {
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .nextBtn {
            margin-bottom: 1rem;
            margin-left: 0;

            &:first-child {
              order: 2;
            }
          }
          &-prev {
            order: 2;
          }
        }
      }
    }

    .some_small_inputs{
      &>div{
        margin-right:2rem;
        font-size: 14px;
        .res_input{
          position:relative;
          margin-top:.5rem;
          font-size: 16px;
          border:1px solid $c-line;
          border-radius: 5px;
          input{
            font-size: 16px;
          }
          span{
            display:inline-block;
            border-right:1px solid $c-line;
          }

          .time_img{
            position: absolute;
            top: 1rem;
            left: -2.15rem;
          }

          &.date{
            border:none;
            /deep/ .mx-input{
              height: 42px;
              border-radius: 5px;
              border-color:$c-line;
              font-family:$ff-gilroy;
              font-size:16px;
            }
          }
          &.time{
            border:none;
            width:9rem;

            /deep/ .display-time {
              height: 42px;
              border-radius:5px;
              border-color:$c-line;
              font-family:$ff-gilroy;
              font-size:16px;
            }

            /deep/ .time-picker {
              height: 40px;
              border-radius:5px;
              width:100%;
              input {
              width:100%;
                font-size: 16px;
                padding: 1rem 0;
                text-align:center;
              }
            }
          }

          &.person{
            display:flex;
            span{
              padding:.75rem 1.35rem;
              &:last-child{
                border-right: none;
              }
            }
          }
        }
      }
    }

    .selectPlan{
      white-space: nowrap;
      padding: 0 2rem;
      height: 42px;
      border-radius:5px;
      border:1px solid $c-line;
      font-family:$ff-gilroy;
      font-size:16px;
      cursor:pointer;
      img{
        height:32px;
        margin-right:1rem;
      }
    }
    .selectTable {
      display: block;
      margin-top: 2.5rem;
      width: 100%;
      input{
        border: 1px solid #E2E2E2;
        border-radius: 5px;
        padding: 5px 10px;
        width: 100%;
        height: 40px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        text-align: left;
        font-family: inherit;
        font-size: inherit;
      }
    }

    .deliveryBtn{
      margin-top: 10vh;
      margin-top: calc(var(--vh) * 10);
    }
    .waitLabel{
      color: $c-error;
    }

  }
</style>

<style lang="scss"  scoped>
  .aboutDelivery {
    z-index: 100;
  }

  @import "~/assets/styles/abstract/var";
  @import "~/assets/styles/abstract/mixins";
  @import "~/assets/styles/classes/class";

  @media screen and (max-width: 1280px) {
    .delivery_columns {
      align-items:center;
      justify-content:center;
      .col1{
        width:100% !important;
      }
      .col2{
        margin-top:1rem;
        width:100% !important;
      }
      .some_small_inputs {
        width:100% !important;
        justify-content:space-between;
      }
      .select_cont {
        width:100% !important;
      }
      .select_cont .select{
        width:100% !important;
      }
    }
  }
  @media screen and (max-width: 991px) {

    .p_count{
      cursor:pointer;
      text-align:center;
      padding: .85rem 1.15rem;
      width: 40px;
      border-radius:7px;
      box-shadow: 0px 1px 4px #ddd;
      border: 1px solid #eee;
    }
    .p_count.active{
      background:$orange;
      box-shadow: 0px 1px 4px $orange;
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

    .res_lable{
      font-size:13px;
      color:$c-green;
      margin-bottom: 0.75rem !important;
      display:block;
    }

    .res_input{
      height: 32px !important;
      .time{
        width:10rem !important;
      }
    }
    .res_checkbox{
      height: 40px !important;
      padding: 0.5rem 1rem;
      border-radius:7px;
      box-shadow: 0px 2px 5px #ddd;
      border: 1px solid #eee;
      display:flex;
      align-items:center;
    }
    .rchk2{
    }

    .body{
      font-size:14px;

      padding:0;
      .titleStep {
        margin-top: .25rem;
        justify-content: center;
        text-align:center;
        color:$c-green;
        font-size:18px;
        .icon_table{
          display:none;
        }
        b{
          width:65vw;
        }
      }

      .delivery_form{
        padding: 0 5%;
        .costTitle{
            text-align: center;
            .costTitle_value{
              font-family:$ff-roboto;
              font-size: 20px;
              font-weight: bold;
              color:$c-green;
            }
        }
      }

      .some_small_inputs{
        margin-bottom: 3rem;
        justify-content: space-between;

        .res_lable{
          display: none !important;
        }

        &>div{
          margin:0 !important;
          &:last-child{
            display:none;
          }
          .res_input{

            input{

            }
            span{

            }

            &.date{

              /deep/ .mx-input{
                border-radius:7px;
                box-shadow: 0px 2px 5px #ddd;
                border: 1px solid #eee;
              }
            }
            &.time{

              /deep/ .display-time {

              }

              /deep/ .time-picker {

                input {
                  border-radius:7px;
                  box-shadow: 0px 2px 5px #ddd;
                  border: 1px solid #eee;
                }
              }
            }

            &.person{

              span{

                &:last-child{

                }
              }
            }
          }
        }
      }
      .delivery_columns{
        display:block;

        .selectPlan{
            box-shadow: 0px 2px 5px #ddd;
            border: 1px solid #eee;
            border-radius:7px;
            img{

            }
          }
          .selectTable {
            display:block;
            margin-top:2rem;
            width:100%;
            input{
              box-shadow: 0px 2px 5px #ddd;
              border: 1px solid #eee;
              border-radius:7px;
            }
        }
      }

      .deliveryBtn{
        margin-top: 3rem;
      }

    }
  }

</style>

<style class="scss" scoped>
  .textareaWrap{
    position:relative;
  }

  .textareaWrap .textarea_counter{
    position:absolute;
    bottom: .5em;
    right:1.5em;
    font-size:.8em;
    background:white;
  }

  .writeHere{
    position:relative;
    margin-bottom: 3px;
    border-radius: 4px;
    font-size: 11px;

    border: 1px solid #E2E2E2;
    padding: 1rem;
    min-height: 6.5em !important;
    width: 100% !important;
    font-size: inherit;
  }
  .writeHere.error{
    border:1px solid #EB608F;
  }
</style>

<style>

  .deliverY .div1{
    font-size: 14px !important;
  }

  .deliverY .orderDelivery_group-select {
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    padding: 5px 10px 5px 3px;
    width: 100%;
    height: 40px;
    background: #fff 0 0 no-repeat padding-box;
  }
  .vs__dropdown-menu {
    overflow: auto !important;
    max-height: 220px !important;
    /* padding: 3px 0 15px; */
  }
  .vs__dropdown-menu .vs__dropdown-option {
    font-size: 14px !important;
    padding-left: 10px;
  }
  .orderDelivery_group-select.vs--open {
    position: relative;
  }
  .orderDelivery_group-select.vs--open::before {
    position: absolute;
    width: 98%;
    height: 24px;
    top: 36px;
    left: 3px;
    content: '';
    z-index: 1001;
    border-top-left-radius: 5px;

    background: linear-gradient(0deg, rgba(255, 255, 255, 0), #fff 75% 25%) bottom;
  }
  .orderDelivery_group-select.vs--open::after {
    position: absolute;
    width: 98%;
    height: 24px;
    top: 232px;
    left: 3px;
    content: '';
    z-index: 1001;
    border-bottom-left-radius: 5px;

    background: linear-gradient(180deg, rgba(255, 255, 255, 0), #fff 50%) bottom;
  }

  .deliverY .orderDelivery_group-select.disabled {
    background: #f8f8f8;
  }

  .deliverY .vs__dropdown-toggle {
    border: none;
  }

  .orderDelivery_group_selectWrap{
    width: 24em;
  }
  /*.orderDelivery_group_selectWrap .vs__search{
    display:none !important;
  }*/
  .orderDelivery_group_selectWrap .vs__selected{
    white-space: nowrap;
    /* width: 42rem; */
    width: 90%;
    overflow: hidden;
  }

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

  .delivery_form .mx-datepicker{
    width: 10em !important;
  }

  .deliverY {
    text-align: center;
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
