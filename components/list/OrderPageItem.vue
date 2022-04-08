<template>
  <div class="orders_main_list_item waiting">
    <div class="col1">
      <p class="title">
        {{ item.title }}
      </p>
      <p>{{ item.transaction }}</p>
      <p>{{ item.address }}</p>
      <p class="item_date">
        <img height="16" class="clock_green" src="/images/icons/clock.png">{{ item.date }}
      </p>
    </div>
    <div class="col2">
      <span class="col2_icon">
        <img class="korz" src="/icons/catering/korzina_green.svg">
        <br>
        <span>12</span>
      </span>
      <span class="item_price">{{ item.price }}</span>
      <span class="item_state">Доставка</span>
    </div>
    <div v-if="inhistory" class="col3">
      <img src="/icons/catering/korzina_green.svg">
    </div>
    <div v-else class="col3">
      <basic-timer-orderspage :conter="15" :max="60" />
      <span class="timer_state">{{ item.state }}</span>
    </div>
  </div>
</template>
<script>
import BasicTimerOrderspage from '~/components/basic/timer/orderspage.vue'
export default {
  components: {
    BasicTimerOrderspage
  },
  props: {
    inhistory: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default () {
        return {
          id: 0,
          title: 'Заказ №0000123',
          transaction: 'Транзакция №12345667899456',
          date: '______',
          address: 'Ресторан "",  пер., д.10, кор. 10, кв.21 Москва',
          price: '----',
          state: '---'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';

    .title{
      font-family: $ff-roboto;
        font-weight:bold;
        font-size:16px;
        color:black;
    }

    .clock_green{
        margin-right:1rem;
    }
    .timer_state, .item_state{
        font-size:12px;
    }
    .waiting .timer_state{
        color:$c-error;
    }
    .item_date{
        position:absolute;
        display:flex;
        align-items:center;
        top:2rem;
        right: 2rem;
        color:$c-green;
        font-size:12px;
        font-weight:bold;
    }
    .col2_icon{

        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;

        position:relative;
        width:48px;
        height:48px;
    }
    .korz{
        position:absolute;
        width:100%;
        height:100%;
    }

    .item_price{
        color:#24A391;
        font-size:16px;
        font-weight:bold;
    }

    .item_state{
        font-size:12px;
    }

    .orders_main_list_item{
        font-size:14px;
        display:flex;
        margin-bottom:3px;
    }
    .col1, .col2, .col3{
        border:1px solid $c-line;
        border-radius: 4px;
        padding: 0 3rem;
    }
    .col1{
        position:relative;
        width:100%;
        padding-top:2rem;
        padding-bottom:2rem;
    }
    .col2{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;

        width: 10em;
        padding-top:1rem;
        padding-bottom:1rem;
    margin-left: 3px;
    }
    .col3{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width: 10em;
        padding-top:.5rem;
        padding-bottom:.5rem;
    margin-left: 3px;
    }

</style>
