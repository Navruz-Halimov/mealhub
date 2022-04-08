<i18n>
{
  "en": {
    "timeLabel": "Opened",
    "placeLabel": "places",
    "menuLabel": "Menu",
    "restourantLabel": "Restourant",
    "promotionLabel": "Sale!",

      "Attention1":"Attention!",
      "Attention2":"The first dish of your order will be ready in",
      "Attention3":"min after payment. The rest of the dishes will be served as soon as they are ready",
      "waitBooking": "Wait manager's response. Waiting time up to 3 minutes.",

      "dishCount":"Dish count",
      "canChangeGuests":"You can change the number of guests",
      "guestsCount":"Guests",
      "dishCountEnding":" ",
      "summaryCount":"Summary",
      "personLabel":"Select the number of people who will eat:",

      "prevBtn":"Back",
      "prevBtnMenu":"Back to menu",
      "nextBtnPay":"Choose service",
      "nextBtnGonEat":"Go to pay",
      "nextBtnPickup":"Select time",
      "nextBtnDelivery":"Choose an address",
      "nextBtnPreorder":"Go to pay",

    "grLabel": "gr",
    "popupDeleteMessage": "Are you sure you want to delete?",
    "popupCartClear": "Are you sure you want to delete all items from cart?",
    "successDeleteTitle": "Deleted successfully",
    "makeAnOrder": "Your basket is empty. Find an interesting place and order dishes there",
    "loading": "loading",

    "cartClear": "Clear cart",
    "waitingManager": "Wait for confirmation",
    "resultLabel": "Result"
  },
  "ru": {
    "timeLabel": "Открыто",
    "placeLabel": "мест",
    "menuLabel": "Меню",
    "restourantLabel": "Ресторан",
    "promotionLabel": "Акция!",

      "Attention1":"Внимание!",
      "Attention2":"Первое блюда Вашего заказа будет готово ориентировочно через",
      "Attention3":"минут после оплаты. Остальные блюда будут подаваться по мере готовности.",
      "waitBooking": "Дождитесь ответа менеджера. Время ожидания до 3-х минут.",

      "dishCount":"Количество блюд",
      "canChangeGuests":"При необходимости можете изменить количество гостей",
      "guestsCount":"Количество гостей",
      "dishCountEnding":"шт.",
      "summaryCount":"Общая стоимость",
      "personLabel":"Выберите количество людей, которые будут кушать:",

      "prevBtn":"Назад",
      "prevBtnMenu":"В меню",
      "nextBtnPay":"Выбрать сервис",
      "nextBtnGonEat":"Оплатить",
      "nextBtnPickup":"Выбрать время",
      "nextBtnDelivery":"Выбрать адрес",
      "nextBtnPreorder":"Перейти к оплате",

    "grLabel": "гр",
    "popupDeleteMessage": "Вы уверены, что хотите удалить?",
    "popupCartClear": "Вы уверены что хотите удалить все блюда из корзины?",
    "successDeleteTitle": "Успешно удалено",
    "makeAnOrder": "Ваша корзина пуста. Найдите интересное заведение и закажите там блюда",
    "loading": "Загрузка",

    "cartClear": "Очистить корзину",
    "waitingManager": "Оплатить",
    "resultLabel": "Результаты поиска"
  }
}
</i18n>

<template>
  <main class="main">
    <div class="main_body cartMainBody">
      <div class="menucontainernew">
        <MainActions
          :current-action="''"
          class="gbadfgadfgadsg desktop"
          @select-action="selectOrdersMenuAction"
        />
        <nav class="main_menu">
          <div class="main_menu-back">
            <addition-back :stricted="true" @click-handler="goToBack" />
          </div>
          <MenuDesktop type="cart" />
        </nav>
      </div>

      <section class="cateringMenu">
        <div class="cateringMenu-back">
          <addition-back :stricted="true" @click-handler="goToBack" />
        </div>
        <template>
          <div
            v-if="
              !$_.isNil(CURRENT_CATERING) &&
                CURRENT_CATERING.id &&
                CART_DATA &&
                CART_DATA.dishes_count
            "
            class="cateringMenu_wrap"
          >
            <CateringHeader v-if="cateringId" type="cart" />

            <article v-if="CART_DATA" class="cateringMenu_body cartMenu_body">
              <!-- <DishCart v-if="isPreorder" />
              <template v-if="!isPreorder"> -->
              <div
                v-if="!$_.isNil(CART_ITEMS) && listState === listStates.cart"
                class="cateringMenuDishes_list"
              >
                <div
                  v-for="(dish, i) in mergedMenuDishes"
                  :key="i"
                  class="cateringMenuDishes_container"
                  :class="{ border: isPreorder }"
                >
                  <div
                    class="cateringMenuDishes_item"
                    :class="{
                      'cateringMenuDishes_item-unavailable': !isAvailableForService(
                        dish
                      ),
                      promotion: dish.dish_id % 3 === 0
                    }"
                  >
                    <header class="cateringMenuDishes_item_header">
                      <img
                        class="cateringMenuDishes_item-image"
                        :src="dish.img_path"
                        @click="changeCurrentDish(dish, i)"
                      >
                      <img
                        src="/images/icons/promotion_percent.png"
                        class="cateringMenuDishes_item-imagePromotion"
                      >
                      <div
                        v-if="!isAvailableForService(dish)"
                        class="cateringMenuDishes_item-unavailable"
                      >
                        <img src="@/static/images/icons/unavailable.svg">
                      </div>
                    </header>
                    <article class="cateringMenuDishes_item_body">
                      <h3
                        class="cateringMenuDishes_item-title"
                        @click="changeCurrentDish(dish, i)"
                      >
                        <span>{{ $t('promotionLabel') }}</span> {{ dish.name }}
                      </h3>
                      <footer class="cateringMenuDishes_item_footer">
                        <div class="cateringMenuDishes_item_counter">
                          <img
                            class="cateringMenuDishes_item-arrow left"
                            :class="{
                              'cursor-default': !isAvailableForService(dish)
                            }"
                            src="/icons/catering/new/arrow-grey.svg"
                            alt=""
                            @click="
                              dishMinus(
                                dish.dish_id,
                                isAvailableForService(dish)
                              )
                            "
                          >
                          <div class="cateringMenuDishes_item-count">
                            {{ countInCart(dish.dish_id) }}
                          </div>
                          <img
                            class="cateringMenuDishes_item-arrow right"
                            :class="{
                              'cursor-default': !isAvailableForService(dish)
                            }"
                            src="/icons/catering/new/arrow-grey.svg"
                            alt=""
                            @click="
                              dishPlus(
                                dish.dish_id,
                                isAvailableForService(dish)
                              )
                            "
                          >
                        </div>

                        <button
                          class="cateringMenuDishes_item-delete eatme-btn-orange"
                          @click="
                            togglePromptPopup()
                            removeItemId = dish.dish_id
                          "
                        >
                          <img
                            src="/icons/catering/reviews/icons4_trush-basket.svg"
                            alt=""
                          >
                        </button>

                        <p class="cateringMenuDishes_item-price mobile nowrap">
                          <span class="gilroy-bold">&#8381;</span>
                          {{ dish.dishes_prise }}
                        </p>

                        <p
                          class="cateringMenuDishes_item-price desktop ml-1 mr-1 nowrap"
                        >
                          <span class="gilroy-bold">&#8381;</span>
                          {{ dish.dishes_prise }}
                        </p>
                      </footer>
                    </article>
                  </div>
                  <div v-if="isPreorder" class="cateringMenuDishes_comment">
                    <DishComment
                      :dish-data="dish"
                      :disabled="!isAvailableForService(dish)"
                      :is-comment-ready.sync="isCommentReady"
                    />
                  </div>
                </div>
              </div>
              <ul
                v-if="
                  !$_.isNil(availableDishes) && listState === listStates.search
                "
                class="cateringMenuDishes_list"
              >
                <li
                  v-for="(dish, i) in mergedMenuDishes"
                  :key="i"
                  class="cateringMenuDishes_item"
                  :class="{ promotion: dish.id % 3 === 0 }"
                >
                  <header class="cateringMenuDishes_item_header">
                    <img
                      class="cateringMenuDishes_item-image"
                      :src="dish.img_path"
                      alt=""
                      @change="CurrentDish(dish, i)"
                    >
                    <div class="cateringMenuDishes_item_actions">
                      <div
                        class="cateringMenuDishes_item-action like"
                        @click="!IS_AUTHORIZATION && loginUserTypes()"
                      >
                        <img
                          class=""
                          src="/icons/catering/new/heart-grey.svg"
                          alt=""
                        >
                      </div>
                      <div class="cateringMenuDishes_item-action share" />
                    </div>
                    <img
                      src="/images/icons/promotion_percent.png"
                      alt=""
                      class="cateringMenuDishes_item-imagePromotion"
                    >
                  </header>
                  <article class="cateringMenuDishes_item_body">
                    <h3 class="cateringMenuDishes_item-title">
                      <span>{{ $t('promotionLabel') }}</span> {{ dish.name }}
                    </h3>
                    <footer class="cateringMenuDishes_item_footer">
                      <div class="cateringMenuDishes_item_counter">
                        <img
                          class="cateringMenuDishes_item-arrow left"
                          src="/icons/catering/new/arrow-grey.svg"
                          alt=""
                          @click="
                            dishMinus(dish.id, isAvailableForService(dish))
                          "
                        >
                        <div class="cateringMenuDishes_item-count">
                          {{ dish.count_in_cart }}
                        </div>
                        <img
                          class="cateringMenuDishes_item-arrow right"
                          src="/icons/catering/new/arrow-grey.svg"
                          :class="{
                            'cursor-default': !isAvailableForService(dish)
                          }"
                          alt=""
                          @click="
                            dishPlus(dish.id, isAvailableForService(dish))
                          "
                        >
                      </div>
                      <button
                        v-if="!findItemInCart(dish.id)"
                        class="cateringMenuDishes_item-add"
                        @click="
                          $store.dispatch('ADD_ITEM_IN_BASKET', {
                            cookiz: $cookies,
                            dishID: dish.id,
                            quantity: 1
                          })
                          searchDishes()
                        "
                      >
                        <img
                          class=""
                          src="/icons/catering/new/plus-green.svg"
                          alt=""
                        >
                      </button>
                      <button
                        v-else
                        class="cateringMenuDishes_item-add"
                        @click="
                          $store.dispatch('DELETE_ITEM_IN_BASKET', {
                            cookiz: $cookies,
                            dishID: dish.id
                          })
                          searchDishes()
                        "
                      >
                        <img
                          class=""
                          src="/icons/catering/new/minus-grey.svg"
                          alt=""
                        >
                      </button>
                      <p class="cateringMenuDishes_item-price">
                        <span class="gilroy-bold">&#8381;</span>
                        {{ dish.price }}
                      </p>
                    </footer>
                  </article>
                </li>
              </ul>

              <template v-if="listState === listStates.cart">
                <div v-if="!isPreorder" class="flex j_c a_c mt-2 desktop">
                  <span
                    class="mr-2 text-xl"
                  >{{ $t('guestsCount') }}:
                    <b class="ml-05 green">{{ person_quantity }}</b></span>
                  <span
                    class="mr-2 text-xl"
                  >{{ $t('dishCount') }}:
                    <b
                      class="ml-05 green"
                    >{{ CART_DATA.dishes_count }}
                      {{ $t('dishCountEnding') }}</b></span>
                  <span
                    class="mr-2 text-xl"
                  >{{ $t('summaryCount') }}:
                    <b class="green roboto ml-05 nowrap">
                      <span class="gilroy-bold">&#8381;</span>
                      {{ CART_DATA.total_price }}</b>
                  </span>
                </div>
                <div v class="flex j_c a_c wide text-sm mt-2 mobile">
                  <div class="w-8 text-center text-lg">
                    <span
                      class="mr-1 nowrap"
                    >{{ $t('guestsCount') }}:
                      <b class="ml-05 green">{{ person_quantity }}</b></span>
                    <span
                      class="mr-1 nowrap green"
                    >{{ $t('dishCount') }}:
                      <b class="ml-05">{{ CART_DATA.dishes_count }}</b></span>
                    <span
                      class="nowrap"
                    >{{ $t('summaryCount') }}:
                      <b class="green roboto ml-05 nowrap">
                        <span class="gilroy-bold">&#8381;</span>
                        {{ CART_DATA.total_price }}</b>
                    </span>
                  </div>
                </div>

                <div
                  v-if="!isPreorder"
                  class="flex j_c text-lg mb-2 mt-2 text-center"
                >
                  <b class="desktop text-xl text-normal">{{
                    $t('canChangeGuests')
                  }}</b>
                  <span class="mobile w-8">{{ $t('canChangeGuests') }}:</span>
                </div>

                <div v-if="!isPreorder" class="flex j_c mt-2">
                  <div
                    class="flex w-9 a_c mb-2 validBlockp p_containter"
                    :class="{ error: $v.person_quantity.$error }"
                  >
                    <img class="p_count_img" src="/icons/movement/foot.svg">
                    <div class="flex a_c wide">
                      <div class="flex j_a wide">
                        <span
                          class="p_count"
                          :class="{ active: person_quantity === p_count + 1 }"
                          @click="
                            $v.person_quantity.$touch()
                            person_quantity = p_count + 1
                          "
                        >{{ p_count + 1 }}</span>
                        <span
                          class="p_count"
                          :class="{ active: person_quantity === p_count + 2 }"
                          @click="
                            $v.person_quantity.$touch()
                            person_quantity = p_count + 2
                          "
                        >{{ p_count + 2 }}</span>
                        <span
                          class="p_count"
                          :class="{ active: person_quantity === p_count + 3 }"
                          @click="
                            $v.person_quantity.$touch()
                            person_quantity = p_count + 3
                          "
                        >{{ p_count + 3 }}</span>
                        <span
                          class="p_count"
                          :class="{ active: person_quantity === p_count + 4 }"
                          @click="
                            $v.person_quantity.$touch()
                            person_quantity = p_count + 4
                          "
                        >{{ p_count + 4 }}</span>
                        <span
                          class="p_count"
                          :class="{ active: person_quantity === p_count + 5 }"
                          @click="
                            $v.person_quantity.$touch()
                            person_quantity = p_count + 5
                          "
                        >{{ p_count + 5 }}</span>
                        <span
                          class="p_count"
                          :class="{ active: person_quantity === p_count + 6 }"
                          @click="
                            $v.person_quantity.$touch()
                            person_quantity = p_count + 6
                          "
                        >{{ p_count + 6 }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-if="canShowGoEatDishAttention && !isPreorder"
                  class="flex j_c mt-2 text-lg"
                >
                  <div class="desktop attention w-6 roboto green text-center">
                    {{ $t('Attention1') }}
                    {{ $t('Attention2') }}
                    {{ +CART_DATA.first_dish_cook_time + 5 }}
                    {{ $t('Attention3') }}
                  </div>
                  <div class="mobile attention w-9 roboto green text-center">
                    {{ $t('Attention1') }}
                    <br>
                    {{ $t('Attention2') }}
                    <br>
                    {{ +CART_DATA.first_dish_cook_time + 5 }}
                    {{ $t('Attention3') }}
                  </div>
                </div>

                <div
                  v-if="canShowGoEatTableAttention && !isPreorder"
                  class="flex j_c mt-2 text-lg"
                >
                  <div
                    class="desktop attention attention_red w-6 roboto red text-center"
                  >
                    {{ $t('waitBooking') }}
                  </div>
                  <div
                    class="mobile attention attention_red w-9 roboto red text-center"
                  >
                    {{ $t('waitBooking') }}
                  </div>
                </div>

                <CartSummary
                  v-if="isPreorder"
                  :order-data.sync="order"
                  :is-cart="true"
                  :is-comment-ready.sync="isCommentReady"
                />
                <!-- </template> -->
                <br>
                <div class="mt-1 flex j_c">
                  <!-- Desktop buttons -->
                  <div class="buttonsCart desktop text-lg">
                    <div class="buttonsCart-prev">
                      <button
                        class="prevBtn eatme-btn-grey flex a_c j_c"
                        @click="goToBack"
                      >
                        <span>
                          {{
                            listState !== listStates.cart
                              ? $t('prevBtn')
                              : $t('prevBtnMenu')
                          }}</span>
                      </button>
                    </div>
                    <div>
                      <button
                        v-if="
                          loaded &&
                            order &&
                            order.order_type === 'go_and_eat' &&
                            !order.table_is_reserved
                        "
                        class="nextBtn nextBtn_disabled eatme-btn-grey flex a_c j_c"
                      >
                        <span> {{ $t('waitingManager') }}</span>
                      </button>
                      <button
                        v-else-if="
                          loaded && canShowNextButton && isCommentReady
                        "
                        class="nextBtn eatme-btn-red flex a_c j_c"
                        @click="goToNext"
                      >
                        <span v-if="order && order.order_type === 'delivery'">
                          {{ $t('nextBtnDelivery') }}</span>
                        <span
                          v-else-if="order && order.order_type === 'pickup'"
                        >
                          {{ $t('nextBtnPickup') }}</span>
                        <span
                          v-else-if="order && order.order_type === 'go_and_eat'"
                        >
                          {{ $t('nextBtnGonEat') }}</span>
                        <span v-else-if="isPreorder">
                          {{ $t('nextBtnPreorder') }}</span>
                        <span v-else> {{ $t('nextBtnPay') }}</span>
                      </button>
                      <button
                        v-else
                        class="nextBtn eatme-btn-disabled flex a_c j_c"
                      >
                        <span v-if="order && order.order_type === 'delivery'">
                          {{ $t('nextBtnDelivery') }}</span>
                        <span
                          v-else-if="order && order.order_type === 'pickup'"
                        >
                          {{ $t('nextBtnPickup') }}</span>
                        <span
                          v-else-if="order && order.order_type === 'go_and_eat'"
                        >
                          {{ $t('nextBtnGonEat') }}</span>
                        <span v-else-if="isPreorder">
                          {{ $t('nextBtnPreorder') }}</span>
                        <span v-else> {{ $t('nextBtnPay') }}</span>
                      </button>
                    </div>
                  </div>
                  <!-- Mobile buttons -->
                  <div class="buttonsCart mobile text-lg">
                    <div class="buttonsCart-prev">
                      <button
                        class="prevBtn eatme-btn-grey flex a_c j_c"
                        @click="goToBack"
                      >
                        <span>
                          {{
                            listState !== listStates.cart
                              ? $t('prevBtn')
                              : $t('prevBtnMenu')
                          }}</span>
                      </button>
                    </div>
                    <div>
                      <button
                        v-if="
                          loaded &&
                            order &&
                            order.order_type === 'go_and_eat' &&
                            !order.table_is_reserved
                        "
                        class="nextBtn eatme-btn-grey flex a_c j_c"
                      >
                        <span> {{ $t('waitingManager') }}</span>
                      </button>
                      <button
                        v-else-if="
                          loaded && canShowNextButton && isCommentReady
                        "
                        class="nextBtn eatme-btn-red flex a_c j_c"
                        @click="goToNext"
                      >
                        <span v-if="order && order.order_type === 'delivery'">
                          {{ $t('nextBtnDelivery') }}</span>
                        <span
                          v-else-if="order && order.order_type === 'pickup'"
                        >
                          {{ $t('nextBtnPickup') }}</span>
                        <span
                          v-else-if="order && order.order_type === 'go_and_eat'"
                        >
                          {{ $t('nextBtnGonEat') }}</span>
                        <span v-else-if="isPreorder">
                          {{ $t('nextBtnPreorder') }}</span>
                        <span v-else> {{ $t('nextBtnPay') }}</span>
                      </button>
                      <button
                        v-else
                        class="nextBtn eatme-btn-disabled flex a_c j_c"
                      >
                        <span v-if="order && order.order_type === 'delivery'">
                          {{ $t('nextBtnDelivery') }}</span>
                        <span
                          v-else-if="order && order.order_type === 'pickup'"
                        >
                          {{ $t('nextBtnPickup') }}</span>
                        <span
                          v-else-if="order && order.order_type === 'go_and_eat'"
                        >
                          {{ $t('nextBtnGonEat') }}</span>
                        <span v-else-if="isPreorder">
                          {{ $t('nextBtnPreorder') }}</span>
                        <span v-else> {{ $t('nextBtnPay') }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </template>

              <br><br><br><br>
            </article>
          </div>

          <p v-else class="wide green text-xl ml-1 text-center">
            <br>
            <br>
            <br>
            <span
              v-if="loading === false"
              @click="$router.push(localePath('index'))"
            >{{ $t('makeAnOrder') }}</span>
            <span v-else>{{ $t('loading') }}</span>
            <br>
            <br>
            <br>
          </p>

          <form-dish-popups
            v-if="currentDish"
            :current-dish.sync="currentDish"
            :prev-dish="prevDish"
            :next-dish="nextDish"
            @prev-click="redirectToPrev"
            @next-click="redirectToNext"
            @dish-deleted="deleteDish"
            @update-dish="updateCurrentDish"
          />

          <div v-if="successPromptIsOpen" class="popup">
            <popup-delete
              @close-popup="togglePromptPopup"
              @delete="
                $store.dispatch('DELETE_ITEM_IN_BASKET', {
                  cookiz: $cookies,
                  dishID: removeItemId
                })
                toggleSuccessDeletePopup()
              "
            >
              {{ $t('popupDeleteMessage') }}
            </popup-delete>
          </div>
          <div v-if="successDeletePopupIsOpen" class="popup">
            <popup-success @close-popup="toggleSuccessDeletePopup">
              {{ $t('successDeleteTitle') }}
            </popup-success>
          </div>
          <div v-if="chooseIsOpen" class="popup cartChooseOrderingPopup">
            <popup-notification
              @close-popup="
                chooseIsOpen = false
                loaded = true
              "
            >
              <form-choose-ordering
                :personquantity="person_quantity"
                @close-popup="
                  chooseIsOpen = false
                  loaded = true
                "
              />
            </popup-notification>
          </div>
          <div v-if="IS_DELIVERY_ADDRESS_POPUP_OPENED">
            <popup-notification
              @close-popup="$store.commit('CLOSE_DELIVERY_ADDRESS_POPUP')"
            >
              <form-choose-deliveryaddress :catering="CURRENT_CATERING" />
            </popup-notification>
          </div>
          <div v-if="isChoosePickup">
            <popup-notification @close-popup="isChoosePickup = false">
              <form-choose-pickup :catering="CURRENT_CATERING" />
            </popup-notification>
          </div>
          <div v-if="isPopupClearCart" class="popup">
            <popup-delete
              @close-popup="isPopupClearCart = false"
              @delete="
                clearCart()
                isPopupClearCart = false
              "
            >
              {{ $t('popupCartClear') }}
            </popup-delete>
          </div>
        </template>
      </section>

      <div class="main_news">
        <MainNews />
      </div>
    </div>
  </main>
</template>

<script>
import { required, minValue, maxValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  layout: 'primary',
  middleware: 'auth-home',

  data () {
    return {
      order: {},
      removeItemId: null,

      person_quantity: 1,
      p_count: 0,

      chooseIsOpen: false,
      successPromptIsOpen: false,
      successDeletePopupIsOpen: false,
      isPopupClearCart: false,
      isChoosePickup: false,

      loading: false,
      loaded: false,

      currentCategoryId: null,
      currentCategory: null,
      listState: 'cart',
      listStates: {
        cart: 'cart',
        search: 'search'
      },
      searchValue: '',
      isRequest: true,

      currentDish: null,
      prevDish: null,
      nextDish: null,
      previewOpenData: false,
      isCommentReady: true
    }
  },
  validations: {
    person_quantity: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(100)
      // },
      // dishComment: {
      //   maxLength: maxLength(1000)
    }
  },
  computed: {
    dishComment: {
      get () {
        console.log(this.CART_ITEMS)
        // const q = this.CART_ITEMS.find(item => item.dish_id === dishID)
        // return this.CART_ITEMS.comment
        return ''
      },
      set (value) {
        console.log(value)
      }
    },
    isPreorder () {
      return (
        this.order &&
        this.orderTimingState(this.order) === 'preorder_choose_dishes'
      )
    },
    canShowNextButton () {
      if (!this.order) {
        return true
      }

      const orderType = this.order?.order_type
      return (
        orderType === 'go_and_eat' ||
        orderType === 'pickup' ||
        orderType === 'delivery' ||
        this.isPreorder
      )
    },
    catering () {
      const cat = this.CART_ITEMS && this.CART_ITEMS[0]
      return cat || {}
    },
    cateringId () {
      const id = this.CART_ITEMS[0] && this.CART_ITEMS[0].catering_id
      return id
    },
    canShowGoEatDishAttention () {
      return (
        this.order &&
        this.order.order_type === 'go_and_eat' &&
        this.order.table_is_reserved
      )
    },
    canShowGoEatTableAttention () {
      return (
        this.order &&
        this.order.order_type === 'go_and_eat' &&
        !this.order.table_is_reserved
      )
    },
    availableDishes () {
      const currentOrder = this.currentOrderMethod()

      return this.CURRENT_CATERING_MENU_DISHES.filter((dish) => {
        if (
          !(
            (currentOrder &&
              dish &&
              currentOrder.order_type === 'delivery' &&
              !dish.available_for_delivery) ||
            (currentOrder &&
              dish &&
              currentOrder.order_type === 'go_and_eat' &&
              !dish.available_for_go_and_eat) ||
            (currentOrder &&
              dish &&
              currentOrder.order_type === 'pickup' &&
              !dish.available_for_pickup) ||
            (currentOrder &&
              dish &&
              currentOrder.order_type === 'preorder' &&
              !dish.available_for_preorder) ||
            (currentOrder &&
              dish &&
              currentOrder.order_type === 'reserve' &&
              !dish.available_for_reserve)
          )
        ) {
          return dish
        } else {
          return false
        }
      })
    },
    mergedMenuDishes () {
      const vm = this
      let stack =
        this.listState === this.listStates.search
          ? this.availableDishes
          : this.CART_ITEMS

      if (this.searchValue) {
        const regexp = new RegExp(this.searchValue, 'gi')
        stack = stack.filter((item) => {
          const name = item.name
          const price = item.dish_price + ''
          if (price.search(regexp) !== -1) {
            return true
          }
          if (name.search(regexp) !== -1) {
            return true
          }
        })
      }

      return stack.map((dish, i) => {
        const findedDish = stack.find((item, j) => {
          if (dish.dish_id === item.id) {
            return true
          }
        })

        return !vm.$_.isNil(findedDish) ? findedDish : dish
      })
    },
    ...mapGetters([
      'CURRENT_CATERING',
      'CART_ITEMS',
      'CART_DATA',
      'IS_CART_LOADED',
      'IS_DELIVERY_ADDRESS_POPUP_OPENED',
      'CURRENT_CATERING_MENU_DISHES',
      'CURRENT_CATTERING_ORDER'
    ])
  },
  watch: {
    // async searchValue (value) {
    //   if (value.length !== 0) {
    //     this.setListState(this.listStates.search)
    //     this.searchDishes()
    //   } else {
    //     await this.getCartItems()
    //     this.setListState(this.listStates.cart)
    //   }
    // },
    order (value) {
      // console.log(value)
      // this.order = value
      // console.log(this.order, 'this.order')
    }
  },
  async created () {
    this.loading = true
    this.loaded = false

    await this.loadPersonalData()
    await this.getCartItems()
    this.order = this.currentOrderMethod()
    if (this.order && this.order.person_quantity) {
      this.person_quantity = this.order.person_quantity || 1
    }

    this.loading = false
    this.loaded = true

    this.tryFinishLoading()
  },
  beforeCreate () {
    this.$nextTick(() => this.$nuxt.$loading.start())
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('SET_CREATED_ADDRESS', null)
    next()
  },
  methods: {
    tryFinishLoading () {
      if (this.IS_CART_LOADED) {
        this.$nextTick(() => this.$nuxt.$loading.finish())
      }
    },
    isPromoDish (dish) {
      return dish.id % 3 === 0
    },
    deleteDish () {
      this.$nextTick(async () => {
        if (this.prevDish) {
          await this.redirectToPrev()
        } else if (this.nextDish) {
          await this.redirectToNext()
        } else {
          this.clearCurrentDish()
        }
      })
    },
    previewImg (value) {
      this.previewOpenData = value || null
    },
    async redirectToPrev () {
      if (this.prevDish === null) {
        return
      }

      const index = this.CART_ITEMS.findIndex(
        item => +item.dish_id === +this.prevDish
      )
      await this.changeCurrentDish(this.CART_ITEMS[index], index)
    },
    async redirectToNext () {
      if (this.nextDish === null) {
        return
      }

      const index = this.CART_ITEMS.findIndex(
        item => +item.dish_id === +this.nextDish
      )
      await this.changeCurrentDish(this.CART_ITEMS[index], index)
    },
    clearCurrentDish () {
      this.currentDish = null
      this.prevDish = null
      this.nextDish = null
    },
    closeDishPopup () {
      this.clearCurrentDish()
    },
    async changeCurrentDish (dish, index) {
      if (!dish) {
        this.clearCurrentDish()
        return
      }

      const cookiz = this.$cookies
      const cateringId = dish.catering_id
      const categoryId = dish.category_id
      const dishId = dish.dish_id
      const { data } = await this.$store.dispatch('GET_CURRENT_DISH', {
        cookiz,
        cateringId,
        categoryId,
        dishId
      })
      console.warn('&&& changeCurrentDish', data.item, cateringId, categoryId)
      this.currentDish = data.item
      this.currentDish.category_id = categoryId
      this.currentDish.catering_id = cateringId

      this.prevDish = index > 0 ? this.CART_ITEMS[index - 1].dish_id : null
      this.nextDish =
        index < this.CART_ITEMS.length - 1
          ? this.CART_ITEMS[index + 1].dish_id
          : null
    },
    updateCurrentDish () {
      const index = this.CART_ITEMS.findIndex(
        item => this.currentDish.id === item.dish_id
      )
      if (index !== -1) {
        this.changeCurrentDish(this.CART_ITEMS[index], index)
      }
    },
    isAvailableForService (dish) {
      this.order = this.currentOrderMethod()
      const orderType = this.order?.order_type

      if (
        (orderType === 'delivery' && !dish.available_for_delivery) ||
        (orderType === 'reserve_table' && !dish.available_for_reserve) ||
        (orderType === 'pre_order' && !dish.available_for_preorder)
      ) {
        return false
      }

      return true
    },
    async runDelivery (id, orderID, callback, personQuantity) {
      try {
        const cookiz = this.$cookies
        const cateringId = this.CURRENT_CATERING.id
        const orderType = 'delivery'

        await this.$store.dispatch('CHECK_CART_FOR_DELIVERY', {
          cookiz,
          cateringId,
          orderType
        })
        this.cartToOrder(id, orderID, callback, personQuantity)
      } catch (e) {
        if (e.response && e.response.status === 422) {
          const unavailableDishes = e.response.data.unavailable_dishes
          this.$store.commit(
            'SET_UNAVAILABLE_DELIVERY_DISHES',
            unavailableDishes
          )
          this.$store.commit('SET_DELIVERY_POPUP_DISHES_ERROR')
          this.loaded = true
        }

        // return false
      }
    },
    goToNext () {
      if (this.isCommentReady) {
        this.order = this.currentOrderMethod()
        console.warn('goToNext current order:', this.order)
        if (this.order) {
          const id = this.cateringId
          const orderID = this.order.id
          const personQuantity = this.person_quantity || 1

          console.warn('personQuantity', personQuantity)

          if (orderID) {
            this.loaded = false
            console.log(this.order)
            if (this.order.order_type === 'delivery') {
              const callback = () => {
                this.loaded = true
                this.$store.commit('OPEN_DELIVERY_ADDRESS_POPUP')
              }
              this.runDelivery(id, orderID, callback, personQuantity)
            } else if (this.order.order_type === 'pickup') {
              const callback = () => {
                this.loaded = true
                this.isChoosePickup = true
              }
              this.cartToOrder(id, orderID, callback, personQuantity)
            } else {
              this.cartToOrder(id, orderID, null, personQuantity)
              this.loaded = true
            }
          } else {
            // Выбрать тип заказа если не выбран
            this.loaded = false
            this.chooseIsOpen = true
          }
        } else {
          // Выбрать тип заказа если не выбран
          this.loaded = false
          this.chooseIsOpen = true
        }
      }
    },
    goToBack () {
      if (this.listState !== this.listStates.cart) {
        // При поиске сбрасывать на блюда
        this.backToDishes()
      } else {
        // Переброс на предыдущую страницу
        this.$router.back()
      }
    },

    togglePromptPopup (paymentId) {
      this.successPromptIsOpen = !this.successPromptIsOpen
    },
    toggleSuccessDeletePopup () {
      this.successDeletePopupIsOpen = !this.successDeletePopupIsOpen
    },

    countInCart (dishID) {
      const q = this.CART_ITEMS.find(item => item.dish_id === dishID)
      return (q && q.quantity) || 0
    },

    dishDelete (dishID) {
      this.loaded = false
      const cookiz = this.$cookies
      this.$store
        .dispatch('DELETE_ITEM_IN_BASKET', { cookiz, dishID })
        .then(() => {
          this.loaded = true
        })
        .catch(() => {
          this.loaded = true
        })
    },
    dishMinus (dishID, available) {
      if (!available) {
        return
      }

      if (this.IS_AUTHORIZATION) {
        this.loaded = false
        const cookiz = this.$cookies
        this.$store
          .dispatch('MINUS_DISH_COUNT', { cookiz, dishID })
          .then(() => {
            this.loaded = true
          })
          .catch(() => {
            this.loaded = true
          })
      } else {
        this.loginUserTypes()
      }
    },
    dishPlus (dishID, available) {
      this.searchDishes()
      if (!available) {
        return
      }

      if (this.IS_AUTHORIZATION) {
        this.loaded = false
        const cookiz = this.$cookies
        this.$store
          .dispatch('PLUS_DISH_COUNT', { cookiz, dishID })
          .then(() => {
            this.loaded = true
          })
          .catch(() => {
            this.loaded = true
          })
      } else {
        this.loginUserTypes()
      }
    },

    goToCurrentDish ({ dishId, currentCategoryId }) {
      const cateringId = this.cateringId
      const categoryId = currentCategoryId || this.currentCategoryId

      this.currentCategoryId = categoryId

      this.$router.push(
        this.localePath({
          path: `/catering/${cateringId}/menu/${categoryId}/${dishId}`
        })
      )
    },

    backToDishes () {
      this.setListState(this.listStates.cart)
    },
    backToMenu () {
      const cateringId = this.cateringId
      this.$router.push(
        this.localePath({ path: `/catering/${cateringId}/menu` })
      )
    },
    searchDishes () {
      if (!this.isRequest) {
        return false
      }

      this.isRequest = false
      this.loaded = false
      // const vm = this

      setTimeout(() => {
        // const cookiz = vm.$cookies
        // const cateringId = vm.cateringId
        // const q = vm.searchValue
        this.loaded = true
        // this.$store.dispatch('GET_CURRENT_CATERING_MENU_DISHES_FROM_SEARCH', { cookiz, cateringId, q })
        this.isRequest = true
      }, 200)
    },
    setCurrentCategory (category) {
      this.currentCategory = category
    },
    setListState (state) {
      this.listState = state
    },

    findItemInCart (itemId) {
      const foundItem = this.CART_ITEMS.find((item) => {
        if (item.dish_id === itemId) {
          return true
        }
      })

      if (!this.$_.isNil(foundItem)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';
@import '~/assets/styles/modificator';

* ::selection {
  background: transparent !important;
}

.main_menu {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  flex: 1 0 17vw !important;
}

.menucontainernew {
  grid-area: menu !important;
  display: flex !important;
  flex-direction: column !important;
}

.gbadfgadfgadsg {
  height: 5rem !important;
  margin-bottom: 5px !important;
  width: 98% !important;
}

.cateringMenu_body,
.cartMenu_body {
  overflow: auto;
}
.cateringMenuDishes_item-title {
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 60px;
}

.cateringMenuDishes_list {
  margin: 1px;
}

.cateringMenuDishes_container {
  display: grid;
  // grid-auto-rows: minmax(min-content, max-content);
  grid-auto-rows: auto 1fr;
  grid-template-areas:
    'dish'
    'comment';

  &.border {
    border: {
      width: 1px;
      style: solid;
      color: $c-line;
      radius: 5px;
    }
  }
}
.cateringMenuDishes_item {
  margin: -1px;
  width: 101%;
  grid-area: dish;
  display: grid;
  grid-template-rows: minmax(min-content, max-content);

  @media screen and (max-width: 991px) {
    display: flex;
    width: calc(100% + 2px);
  }
}
.cateringMenuDishes_comment {
  grid-area: comment;
  font-size: 12px;
  line-height: 14px;
  padding: 8px;
}

@media screen and (max-width: 991px) {
  .main_menu {
    display: none !important;
  }

  .main_body {
    min-height: 100vh;
    min-height: calc(var(--vh) * 100);
    height: auto;
  }
}

.cursor-default {
  cursor: default;
}

.attention {
  border: 2px solid $c-green;
  padding: 1rem 2rem;

  &_red {
    border: 2px solid $error;
  }
}

@media screen and (max-width: 991px) {
  .attention {
    padding: 1rem 0.75rem;
  }
  .main_body {
    height: auto !important;
    min-height: 100vh;
    min-height: calc(var(--vh) * 100);
    background: white;
  }
  .cateringMenu {
    position: relative !important;
  }
}

.container {
  padding: 0 1rem;
}
.header {
  padding: 2rem 0 1rem;
  color: #555;
  border-bottom: 1px solid $c-line;
  .first {
    b {
      color: #979797;
      color: initial;
    }
    b,
    .spanid {
      margin-right: 2rem;
    }
  }
  .cateringAddress {
    color: initial;
    & > img {
      height: 20px;
      margin-right: 1rem;
    }
  }
  .route {
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-color: #a2a2a2;
    border-radius: 50%;
    padding: 6px;
    width: 30px;
    height: 30px;
    margin-left: 1rem;
    box-shadow: 0px 4px 8px #1ca79012;
    cursor: pointer;
    img {
      filter: grayscale(1);
      height: 16px;
    }
  }

  .social-review {
    margin-left: 1rem;
    font-size: 12px;
  }

  /*asda sd*/
  .headeractions {
    margin: 0 0.5rem 0 1rem;
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

      border: 1px solid #a2a2a2;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &.desktop {
        @media screen and (min-width: 992px) {
          display: flex;
          border: 1px solid #a2a2a2;
          margin-left: 0.5rem;
        }
      }

      &.mobile {
        border: 1px solid $c-icon-green;
      }
    }
  }
}

.tableReservation {
  position: relative;
  grid-area: body;
  display: flex;
  border-radius: 0;
  background-color: $c-light;
  height: 100%;
  width: 100%;
  overflow: auto;
  flex-direction: column;
  font-size: 16px;
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.validBlock.error .res_lable {
  color: #eb608f !important;
}
.validBlock.error input,
.validBlock.error .p_count,
.validBlock.error .res_input.person,
.validBlock .display-time.is-empty {
  color: #eb608f !important;
  border: 1px solid #eb608f !important;
}

.personLabel {
  width: 20rem;
}

.nextBtn {
  order: 2;

  &_disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;

    &:hover {
      background-color: #d6d6d6 !important;
      cursor: not-allowed;
    }
  }
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
  }
  @media screen and (max-width: 425px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .nextBtn {
      margin-bottom: 1rem;
      margin-left: 0;
    }
    &-prev {
      order: 2;
    }
  }
}

.popup {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
}

.cateringMenuDishes_item-unavailable {
  border: 1px solid #dedede;

  & .cateringMenuDishes_item {
    &-image {
      filter: grayscale(1);
      opacity: 0.6;
    }

    &-title {
      color: #696969;

      span {
        color: gray;
      }
    }

    &-arrow {
      opacity: 0.6;
    }

    &-count {
      color: gray;
    }

    &-price {
      color: gray;
    }

    &-imagePromotion {
      filter: grayscale(1) brightness(0%) contrast(100%) invert(1);
    }

    &-unavailable {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      img {
        width: 70px;
        height: 70px;
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .cateringMenuDishes_item_header {
    width: 15rem;
    height: 100%;
    margin-right: 0.5rem;
    border-radius: 4px;
    overflow: hidden;
  }
  .cateringMenuDishes_item_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cateringMenuDishes_item_body {
    width: 100%;
    padding-right: 2rem;
  }
  .cateringMenuDishes_item-counter {
    order: initial;
    width: 8rem;
    flex: 0 0 8rem;
  }
  .cateringMenuDishes_item-price {
    font-size: 16px;
  }
}

.cateringMenuDishes_item-delete {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0;
  width: 31px;
  height: 31px;
  padding: 7px !important;
  background-color: $orange;
  img {
    filter: brightness(2);
  }
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';
@import '~/assets/styles/classes/class';

.some_small_inputs {
  & > div {
    margin-right: 2rem;
    font-size: 14px;
    .res_input {
      position: relative;
      margin-top: 0.5rem;
      font-size: 16px;
      border: 1px solid $c-line;
      border-radius: 5px;
      input {
        font-size: 16px;
      }
      span {
        display: inline-block;
        border-right: 1px solid $c-line;
      }

      .time_img {
        position: absolute;
        top: 1rem;
        left: -2.15rem;
      }

      &.date {
        border: none;
        /deep/ .mx-input {
          height: 42px;
          border-radius: 5px;
          border-color: $c-line;
          font-family: $ff-gilroy;
          font-size: 16px;
        }
      }
      &.time {
        border: none;
        width: 9rem;

        /deep/ .display-time {
          height: 42px;
          border-radius: 5px;
          border-color: $c-line;
          font-family: $ff-gilroy;
          font-size: 16px;
        }

        /deep/ .time-picker {
          height: 40px;
          border-radius: 5px;
          width: 100%;
          input {
            width: 100%;
            font-size: 16px;
            padding: 1rem 0;
            text-align: center;
          }
        }
      }

      &.person {
        display: flex;
        span {
          padding: 0.75rem 1.35rem;
          &:last-child {
            border-right: none;
          }
        }
      }
    }
  }
}

.p_containter {
  width: 28rem;
  .p_count {
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    padding: 0.85rem 1.15rem;
    width: 40px;
    border-radius: 7px;
    box-shadow: 0px 1px 2px #ddd;
    border: 1px solid #eee;
  }
  .p_count.active {
    background: $orange;
    box-shadow: 0px 1px 2px $orange;
    border: 1px solid $orange;
    color: white;
  }
  .p_count_img {
    filter: contrast(0);
    margin-right: 0.5rem;
  }
  .p_count_ar {
    cursor: pointer;
    transform: rotate(-180deg);
  }
  .p_count_al {
    cursor: pointer;
  }
  .select_cont {
    width: 100%;
  }
}

@media screen and (max-width: 991px) {
  .res_lable {
    font-size: 14px;
    color: $c-green;
    margin-bottom: 0.75rem !important;
    display: block;
  }

  .main_menu-back {
    font-size: 14px;
    padding: 0 1rem;
    position: absolute;
    cursor: pointer;

    .link-back {
      font-size: 14px !important;
      margin-top: 0.75rem;
      padding: 0 !important;
      display: flex;
      align-items: center;
      color: #c4c4c4;
    }
  }

  .res_input {
    height: 32px !important;
    .time {
      width: 10rem !important;
    }
  }
  .res_checkbox {
    height: 40px !important;
    padding: 0.5rem 1rem;
    border-radius: 7px;
    box-shadow: 0px 2px 5px #ddd;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
  }

  .some_small_inputs {
    margin-bottom: 3rem;
    justify-content: space-between;

    .res_lable {
      display: none !important;
    }

    & > div {
      margin: 0 !important;
      &:last-child {
        display: none;
      }
      .res_input {
        &.date {
          /deep/ .mx-input {
            border-radius: 7px;
            box-shadow: 0px 2px 5px #ddd;
            border: 1px solid #eee;
          }
        }
        &.time {
          /deep/ .time-picker {
            input {
              border-radius: 7px;
              box-shadow: 0px 2px 5px #ddd;
              border: 1px solid #eee;
            }
          }
        }
      }
    }
  }
  .body {
    font-size: 14px;

    padding: 0;
    .titleStep {
      margin-top: 0.25rem;
      justify-content: center;
      text-align: center;
      color: $c-green;
      font-size: 18px;
      .icon_table {
        display: none;
      }
      b {
        width: 65vw;
      }
    }

    .reservation_form {
      padding: 0 5%;
      .costTitle {
        text-align: center;
        .costTitle_value {
          font-family: $ff-roboto;
          font-size: 20px;
          font-weight: bold;
          color: $c-green;
        }
      }
    }

    .reservation_columns {
      display: block;
      .col1 {
        width: 100%;
        .selectOccasion {
          .select {
            width: 100% !important;
          }
        }
      }

      .col2 {
        width: 100%;
      }
      .selectPlan {
        box-shadow: 0px 2px 5px #ddd;
        border: 1px solid #eee;
        border-radius: 7px;
      }
      .selectTable {
        display: block;
        margin-top: 2rem;
        width: 100%;
        input {
          box-shadow: 0px 2px 5px #ddd;
          border: 1px solid #eee;
          border-radius: 7px;
        }
      }
    }
  }
}
</style>

<style>
@media screen and (max-width: 991px) {
  .dishImagePopup .popup__content {
    display: flex;
  }
}
@media screen and (max-width: 991px) {
  .cartChooseOrderingPopup > .popup_wrap > .popup {
    overflow: initial;
  }
}

.validBlock.error .res_lable {
  color: #eb608f !important;
}
.validBlock.error input,
.validBlock.error .p_count,
.validBlock.error .res_input.person,
.validBlock .display-time.is-empty {
  color: #eb608f !important;
  border: 1px solid #eb608f !important;
}

.reservation_form .mx-datepicker {
  width: 10em !important;
}

.selectOccasion .vs__dropdown-toggle {
  padding: 0.5rem;
}

.selectOccasion .vs__actions::before {
  display: block;
  content: ' ';
  background-image: url('~assets/icons/L_arrow.svg');
  background-size: contain;
  background-repeat: no-repeat;
  width: 12px;
  height: 12px;
  overflow: visible;
}
.selectOccasion .vs__open-indicator {
  display: none !important;
}

.selectOccasion .vs__dropdown-menu {
  border-color: #e2e2e2 !important;
  width: 100%;
}
.selectOccasion .vs__dropdown-option {
  padding: 0.75rem;
  font-size: 16px !important;
}
.selectOccasion .vs__dropdown-menu > .vs__dropdown-option--selected,
.selectOccasion .vs__dropdown-menu > .vs__dropdown-option--highlight {
  color: inherit;
  background: white;
}

@media screen and (max-width: 991px) {
  .selectOccasion .vs__actions {
    transform: rotate(90deg);
  }
  .some_small_inputs .mx-input,
  .some_small_inputs .mx-datepicker,
  .some_small_inputs .time-picker {
    height: 40px !important;
  }
  .some_small_inputs .mx-datepicker input,
  .some_small_inputs .time-picker input {
    font-size: 14px !important;
    height: 40px !important;
    border-radius: 7px;
  }
  .selectOccasion .vs__dropdown-toggle {
    height: 40px !important;
    padding: 0.25rem 0.5rem;
    box-shadow: 0px 2px 5px #ddd;
    border: 1px solid #eee;
    border-radius: 7px;
  }

  .res_input.time .dropdown,
  .res_input.time .time-picker .select-list {
    width: 10rem !important;
  }

  .res_input.time .dropdown .hint {
    display: none !important;
  }
}
</style>
