import Vue from 'vue'
import Vuex from 'vuex'
// FAVORITES
import Favorites from '@/store/modules/favorites/favorites.js'
import FavoritesDish from '@/store/modules/favorites/favoritesDish.js'
import Subscribe from '@/store/modules/subscribe.js'
// STATE for AUTHORIZATION
import Authorization from '~/store/modules/auth/authorization.js'
import Login from '~/store/modules/auth/login.js'
import Registration from '~/store/modules/auth/registration.js'
import cateringPointRegistration from '~/store/modules/auth/cateringPointRegistration.js'
import Recovery from '~/store/modules/auth/recovery.js'
import Verification from '~/store/modules/auth/verification.js'

// STATE for CATERING -------------------------------
import CateringList from '~/store/modules/catering/list.js'
import CurrentCatering from '~/store/modules/catering/current.js'
import CurrentCateringMenu from '~/store/modules/catering/current/menu.js'
import CurrentCateringDish from '~/store/modules/catering/current/dish.js'
import CurrentCateringReviews from '~/store/modules/catering/current/reviews.js'
import CateringFilter from '~/store/modules/catering/filter.js'

// STATE for ORDERING PROCCESS -------------------------------
import OrderingOrder from '~/store/modules/ordering/order.js'
import OrderingReserve from '~/store/modules/ordering/reserve.js'

// STATE for BASKET -------------------------------
import CartItems from '~/store/modules/cart/items.js'

// STATE for ORDERS -------------------------------
import Orders from '~/store/modules/orders/methods.js'

// STATE for MAP -------------------------------
import GMapConfig from '~/store/modules/map/config.js'
import GMapSettings from '~/store/modules/map/settings.js'
import GMapRoute from '~/store/modules/map/route.js'
import GMapObjects from '~/store/modules/map/objects.js'

import Map from '~/store/modules/map.js'
// State for profile
import Personal from '~/store/modules/profile/personal.js'
import Payments from '~/store/modules/profile/payments.js'
import Addresses from '~/store/modules/profile/addresses.js'

// State for Interface
import Languages from '~/store/modules/languages.js'
import Currencies from '~/store/modules/currencies.js'
import Window from '~/store/modules/window.js'
import GlobalPopups from '~/store/modules/globalpopups.js'
import GlobalNotifications from '~/store/modules/globalnotifications.js'

Vue.mixin({
  data () {
    return {
      systemTime: 1,
      systemInverval: 1
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'IS_AUTHORIZATION',
      'CART_ITEMS',
      'CART_DATA',
      'CURRENT_CATERING',
      'PERSONAL_DATA',
      'CURRENT_ORDER'
    ]),
    isMobile () {
      // const width = window.outerWidth
      // if (process.client) {
      //   return width <= 991 && width > 0
      // } else {
      //   return false
      // }
      return this.$store.getters.IS_MOBILE
    },
    currentOrder: {
      get () {
        /* if (process.browser) {
          const order = localStorage && localStorage.getItem('current_catering_order')
          if (order && (order !== 'undefined')) {
            return JSON.parse(order)
          }
        } */
        return this.CURRENT_ORDER
      },
      set (currentOrder) {
        console.warn('smthg happends with currentOrder', currentOrder)
        this.$store.commit('SET_CURRENT_ORDER', currentOrder)
      }
    }
  },
  mounted () {
    this.systemInverval = setInterval(() => this.systemTime++, 1000)
  },
  beforeDestroy () {
    clearInterval(this.systemInverval)
  },
  methods: {
    parsePhone (a, strt) {
      return a.slice(strt || 3, 6) + ' ' + a.slice(6, 8) + '-' + a.slice(8, 12)
    },
    orderDate (order) {
      if (order) {
        const add = order.order_created
        if (add) {
          return add[8] + add[9] + '.' + add[5] + add[6] + '.' + add[2] + add[3]
        }
      }
      return false
    },
    orderTime (order) {
      if (order) {
        const add = order.order_created
        if (add) {
          return add[11] + add[12] + ':' + add[14] + add[15]
        }
      }
      return false
    },
    readyDate (order) {
      if (order) {
        const add = order.order_date || order.first_dish_ready_at
        if (add) {
          return add[8] + add[9] + '.' + add[5] + add[6] + '.' + add[2] + add[3]
        }
      }
      return false
    },
    readyTime (order) {
      if (order) {
        const add = order.order_date || order.first_dish_ready_at
        if (add) {
          return add[11] + add[12] + ':' + add[14] + add[15]
        }
      }
      return false
    },
    // ТАЙМЕРА ГОТОВНОСТИ
    normalizeSeconds (diff) {
      return Math.max(~~(diff / 1000), 0)
    },
    normalizeMinutes (diff) {
      return Math.max(~~(diff / 60000), 0)
    },
    orderGoEatTimeManager (order) {
      // не трогать тут должны быть только секунды
      // Manager time diff
      const dt = order.order_created
      return this.normalizeSeconds(this.newDate() - this.newDate(dt))
    },
    orderGoEatTimeLeft (order) {
      // First dish date - catering time
      return this.normalizeSeconds(
        this.newDate(order.first_dish_ready_at || order.order_date) -
          this.newDate() // this.newDate(order.timezone_info.catering_time)
      )
    },
    orderGoEatTimeFull (order) {
      // First dish date - catering time
      return this.normalizeSeconds(
        this.newDate(order.first_dish_ready_at || order.order_date) -
          this.newDate(order.transaction_time)
      )
    },
    orderDeliveryTimeLeft (order) {
      // Осталось времени к доставке
      return this.normalizeSeconds(
        this.newDate(order.order_date) - this.newDate() // this.newDate(order.timezone_info.catering_time)
      )
    },
    orderDeliveryTimeFull (order) {
      // Общее время доставки
      return this.normalizeSeconds(
        this.newDate(order.order_date) - this.newDate(order.transaction_time)
      )
    },
    orderPickupTimeLeft (order) {
      // Order date - catering time
      return this.normalizeSeconds(
        this.newDate(order.order_date) - this.newDate() // this.newDate(order.timezone_info.catering_time)
      )
    },
    orderPickupTimeFull (order) {
      // Order date - transaction time
      return this.normalizeSeconds(
        this.newDate(order.order_date) - this.newDate(order.transaction_time)
      )
    },
    orderPendingPaymentTimeLeft (order) {
      // Order date - catering time
      const pendingStart =
        (localStorage && localStorage.pendingStart) || Date.now()
      return this.normalizeSeconds(this.newDate() - new Date(+pendingStart))
    },
    orderReserveTimeFromStart (order) {
      return this.normalizeSeconds(
        this.newDate() - this.newDate(order.order_created)
      )
    },
    orderReserveTimeFromManagerRequest (order) {
      return this.normalizeSeconds(
        this.newDate() - this.newDate(order?.reserve?.created_at)
      )
    },
    orderReserveTimeLeft (order) {
      // return 60 * 60 * 24 * 0.1
      return this.normalizeSeconds(
        this.newDate() - this.newDate(order.reserve_start_at)
      )
    },
    orderReserveTimeFull (order) {
      // return 60 * 60 * 24 * 6
      return this.normalizeSeconds(
        this.newDate(order.order_date) - this.newDate(order.order_created)
      )
    },
    orderTimeToFirstDish (order) {
      // First dish date - catering time
      const fdt = order.first_dish_ready_at
      if (fdt) {
        return this.normalizeMinutes(this.newDate(fdt) - this.newDate())
      } else {
        return this.CART_DATA.first_dish_cook_time + 5
      }
    },
    orderCanReturnTimeLeft (order) {
      const curTimeForTesting = this.newDate() // Текущее время ( (order.timezone_info && this.newDate(order.timezone_info.catering_time)) || )
      const ttime = order.transaction_time
        ? this.newDate(order.transaction_time)
        : curTimeForTesting // Время когда заказ оплатили
      return this.toSeconds(curTimeForTesting - ttime)
    },
    orderChooseAndPayTimeLeft (order) {
      const curTimeForTesting = this.newDate() // Текущее время ( (order.timezone_info && this.newDate(order.timezone_info.catering_time)) || )
      const createdtime = order.order_created
        ? this.newDate(order.order_created)
        : curTimeForTesting // Время когда начали выбор блюд
      return this.toSeconds(curTimeForTesting - createdtime)
    },

    orderHasTimer (order) {
      const ts = this.orderTimingState(order)
      // return false if order status doesnot produce timer
      if (
        // ИСКЛЮЧАЕМ СОСТОЯНИЯ БЕЗ ТАЙМЕРОВ
        ts === 'delivery_choose_dishes' ||
        ts === 'delivery_pay_an_order' ||
        ts === 'pickup_pay_an_order' ||
        ts === 'pickup_choose_dishes'
      ) {
        return false
      }
      return true
    },
    orderHasDownload (order) {
      // return false if order status doesnot produce timer
      if (order.status === 'payed' || order.payment_status === 'succeeded') {
        return true
      }
      return false
    },
    orderHasCaution (order) {
      const ts = this.orderTimingState(order)
      // return true if order has caution flag
      if (
        ts === 'cooking_timer' ||
        ts === 'delivery_timer' ||
        ts === 'pickup_timer' ||
        ts === 'reserve_timer'
      ) {
        return true
      }
      return false
    },
    orderTimingState (order) {
      if (order) {
        const orderType = order.order_type

        const tid = order.transaction_id
        const curTimeForTesting = /* (order.timezone_info && this.newDate(order.timezone_info.catering_time)) || */ this.newDate() // Текущее время
        const ttime = order.transaction_time
          ? this.newDate(order.transaction_time)
          : curTimeForTesting // Время когда заказ оплатили
        const transactionDiff = this.toMinutes(curTimeForTesting - ttime)

        const itemsCount = order.items_count

        const deliveryAddress =
          order.delivery_address || order.delivery_address_id
        const orderDate = order.order_date

        const tableIsReserved = order.table_is_reserved
        const orderStatus = order.status
        const canPay =
          orderStatus !== 'succeeded' && orderStatus !== 'pending_payment'
        const price = order.price

        const isReserve = order.order_type === 'reserve_table'
        const isPreorder = order.order_type === 'pre_order'
        const reserveInfo = order.reserve

        if (orderType === 'go_and_eat') {
          // 5.  3 мин - Ждем ответ менеджера
          if (!tableIsReserved) {
            // console.warn('Order state begin', tableIsReserved)
            return 'wait_manager'
          }

          // 3. 20 мин выбрать блюда
          if (!itemsCount) {
            // console.warn('Order state begin', itemsCount)
            return 'choose_dishes'
          }

          // 1. Заказ передан в работу - Первое блюда - заказ в готовке - деньги не вернут - green
          if (tid && orderStatus === 'payed' && transactionDiff >= 5) {
            // console.warn('Order state begin', tid, itemsCount, orderStatus, ttime)
            return 'cooking_timer'
          }

          // 2  5 мин вренуть деньги - red
          if (tid && orderStatus === 'payed' && transactionDiff < 5) {
            // console.warn('Order state begin', tid, itemsCount, orderStatus, ttime)
            return 'can_return_timer'
          }
          // 4. 20 мин продолжить выбор Или перейти к оплате
          if (canPay) {
            // console.warn('Order state begin', itemsCount, orderStatus)
            return 'pay_an_order'
          }
          // ожидание оплаты от платёжки
          if (orderStatus === 'pending_payment') {
            // console.warn('Order state begin', itemsCount, orderStatus)
            return 'pending_payment'
          }
        }

        if (orderType === 'delivery') {
          // 1. Идет доставка
          if (
            tid &&
            itemsCount &&
            orderStatus === 'payed' &&
            transactionDiff >= 5
          ) {
            // console.warn('Order state begin', tid, itemsCount, orderStatus, ttime)
            return 'delivery_timer'
          }
          // 2  5 мин вренуть деньги - red
          if (
            tid &&
            itemsCount &&
            orderStatus === 'payed' &&
            transactionDiff < 5
          ) {
            window.debugd = {
              'Transaction Time': ttime,
              'Current Time': curTimeForTesting,
              'Time differance': transactionDiff
            }
            // console.warn('Order state begin', tid, itemsCount, orderStatus, ttime)
            return 'can_return_timer'
          }

          // 4. 20 мин продолжить выбор Или перейти к оплате
          if (itemsCount && deliveryAddress && canPay) {
            // console.warn('Order state begin', itemsCount, orderStatus)
            return 'delivery_pay_an_order'
          }
          // ожидание оплаты от платёжки
          if (itemsCount && orderStatus === 'pending_payment') {
            // console.warn('Order state begin', itemsCount, orderStatus)
            return 'pending_payment'
          }

          // 3. выбрать блюда
          return 'delivery_choose_dishes'
        }

        if (orderType === 'pickup') {
          // 1. Идет доставка
          if (
            tid &&
            itemsCount &&
            orderStatus === 'payed' &&
            transactionDiff >= 5
          ) {
            // console.warn('Order state begin', tid, itemsCount, orderStatus, ttime)
            return 'pickup_timer'
          }
          // 2  5 мин вренуть деньги - red
          if (
            tid &&
            itemsCount &&
            orderStatus === 'payed' &&
            transactionDiff < 5
          ) {
            // console.warn('Order state begin', tid, itemsCount, orderStatus, ttime)
            return 'can_return_timer'
          }

          // 4. 20 мин продолжить выбор Или перейти к оплате
          if (itemsCount && orderDate && canPay) {
            // console.warn('Order state begin', itemsCount, orderStatus)
            return 'pickup_pay_an_order'
          }
          // ожидание оплаты от платёжки
          if (itemsCount && orderStatus === 'pending_payment') {
            // console.warn('Order state begin', itemsCount, orderStatus)
            return 'pending_payment'
          }
          // 3. выбрать блюда
          return 'pickup_choose_dishes'
        }

        if (isReserve || isPreorder) {
          // ожидание оплаты от платёжки
          if (orderStatus === 'pending_payment') {
            return 'pending_payment'
          }

          // резерв с бесплатными столами подтвержден или платный оплачен
          if (
            tableIsReserved &&
            (price === 0 || isPreorder || orderStatus === 'payed')
          ) {
            const reserveTimeLeft = this.orderReserveTimeLeft(order)
            const reserveTimeFull = this.orderReserveTimeFull(order)
            // const timeDifference = reserveTimeFull - reserveTimeLeft
            const oneDay = 86400 // количество секунд в одном дне = 60 * 60 * 24
            const orderCancelTime = order.cancel_reserve_days

            // if (reserveTimeLeft <= oneDay && !isPreorder) {
            //   // 24 часа на выбор блюд
            //   return 'reserve_choose_dishes'
            // } else
            if (isPreorder && orderStatus !== 'payed') {
              // выбор блюд для предзаказа
              return 'preorder_choose_dishes'
              // } else if (reserveTimeLeft > oneDay * orderCancelTime || orderCancelTime * oneDay >= reserveTimeFull) {
            } else if (
              reserveTimeFull - reserveTimeLeft <=
              orderCancelTime * oneDay
            ) {
              // время, после которого отмена заказа не вернет деньги
              return 'reserve_timer'
            } else if (isReserve) {
              // reserveTimeLeft <= oneDay * orderCancelTime
              // время на отмену заказа
              return 'reserve_cancel_time'
            } else if (orderStatus === 'payed' && isPreorder) {
              // время на отмену предзаказа
              return 'preorder_cancel_time'
            } else {
              // время, после которого отмена заказа не вернет деньги
              return 'reserve_timer'
            }
          }

          // данные о резерве еще не прикреплены
          if (!reserveInfo || tableIsReserved === false) {
            return 'waiting_reserve'
          }

          // ожидание ответа менеджера
          if (tableIsReserved === null) {
            return 'reserve_wait_manager'
          }

          // ожидание оплаты
          if (price) {
            return isReserve ? 'reserve_wait_payment' : 'preorder_wait_payment'
          }

          // ожидание выполнения заказа
          return 'reserve_timer'
        }
      } else {
        // console.error('orderState error no order')
      }

      return false
    },
    currentOrderMethod () {
      /* if (process.browser) {
        const order = localStorage && localStorage.getItem('current_catering_order')
        if (order && (order !== 'undefined')) {
          return JSON.parse(order)
        }
      } */

      if (process.browser && localStorage) {
        const order = localStorage.getItem('current_catering_order')
        if (order && order !== 'undefined') {
          localStorage.removeItem('current_catering_order')
          // return JSON.parse(order)
        }
      }
      return this.CURRENT_ORDER
    },
    cancelCurrentOrder () {
      const order = this.currentOrderMethod()
      if (order) {
        const cookiz = this.$cookies
        console.warn('Заказ автоматически отменен', order.id)
        this.$store.dispatch('CANCEL_ORDER', { cookiz, order }).then(() => {
          this.setOrder(null)
          this.loadPersonalData()
        })
      }
    },
    orderUID (orderID) {
      return '№000' + orderID
    },
    setOrder (order) {
      console.warn('setOrder order', order)
      // if (process.browser) {
      if (order) {
        this.$store.commit('SET_CURRENT_ORDER', order)
        // localStorage && localStorage.setItem('current_catering_order', JSON.stringify(order))
      } else {
        this.$store.commit('SET_CURRENT_ORDER', null)
        // localStorage && localStorage.setItem('current_catering_order', null)
      }
      // }
    },
    async createOrder (id, orderType, personQuantity) {
      console.warn('createOrder', id, orderType, personQuantity)
      const cookiz = this.$cookies

      const requestData = { cookiz, id, orderType, personQuantity }

      try {
        const { data } = await this.$store.dispatch(
          'CREATE_CURRENT_CATERING_ORDER',
          requestData
        )

        if (data && data.order && data.order.id) {
          this.setOrder(data.order)
          await this.reloadAllUserOrders()
          return data.order
        } else {
          console.error(
            'CREATE_CURRENT_CATERING_ORDER error1 no responce, order or order.id data',
            data
          )
          throw new Error('no responce, order or order.id')
        }
      } catch (err) {
        console.error('CREATE_CURRENT_CATERING_ORDER error2 ', err)
        throw err
      }
    },
    reloadAllUserOrders () {
      if (this.IS_AUTHORIZATION) {
        this.$store.dispatch('GET_HISTORY_ORDERS', this.$cookies)
        return this.$store.dispatch('GET_CURRENT_ORDERS', this.$cookies)
      }
      return Promise.reject(new Error('reloadAllUserOrders error Unauthorized'))
    },
    selectOrdersMenuAction (action) {
      this.$router.push(this.localePath({ name: 'index', query: { action } }))
    },

    /**
     *
     * ORDERS MECH
     *
     */

    /**
     *
     * СОБИРАТЕЛЬНЫЕ МЕТОДЫ ДЛЯ КОНТРОЛЯ ПРОЦЕДУРЫ ЗАКАЗА
     *
     */

    async repeatOrder (order, checkCurrentOrder = true) {
      // const id = order.catering_id
      const orderType = order.order_type

      if (!this.IS_AUTHORIZATION) {
        this.$store.commit('SET_LOGIN_POPUP', true)
        return false
      }

      const currentOrder = this.currentOrderMethod()
      if (checkCurrentOrder && currentOrder) {
        // Если уже начали какойто заказ
        const callback = () => this.repeatOrder(order, false)
        this.$store.commit('SET_ANOTHER_ORDER_ACTIVE', callback)
      } else {
        // Заказ не начат можно запускать процедуру повтора
        const cookiz = this.$cookies
        await this.$store.dispatch('CALL_REPEAT_ORDER', { cookiz, order })
      }
      return orderType
    },
    checkOrderWay (id, type, callback) {
      const currentOrder = this.currentOrderMethod()
      console.warn('checkOrderWay again', currentOrder)
      if (currentOrder.order_type === type) {
        // Иначе Если корзина НЕ прикреплена к заказу
        const cartcateringid = this.cartCatering()

        if (cartcateringid === id) {
          // Если корзина прикреплена к заказу
          if (
            currentOrder.order_type === 'pickup' ||
            currentOrder.order_type === 'delivery'
              ? currentOrder.order_date
              : currentOrder.order_items && currentOrder.order_items.length
          ) {
            console.warn(
              'Order with cart. Go to payment',
              currentOrder.order_date,
              currentOrder.order_type
            )
            this.$router.push(
              this.localePath({
                path: `/ordering/${id}/pay`
              })
            )
          } else {
            console.warn(
              'Cart dont included in Order 1',
              this.orderTimingState(currentOrder)
            )

            // Не пускаем пользователя к блюдам если нет подтверждения менеджера
            if (this.orderTimingState(currentOrder) === 'wait_manager') {
              this.$store.commit('SET_GOEATPOPUP', 2)
            } else {
              // Если менеджер подтвердил столик или это не гоендит
              console.error('approved')
              // Если корзина полная
              if (this.CART_ITEMS && this.CART_ITEMS.length) {
                this.$router.push(
                  this.localePath({
                    path: '/profile/cart'
                  })
                )
              } else {
                // Если корзина пустая
                console.error('CART is empty 1')
                this.$router.push(
                  this.localePath({ path: `/catering/${cartcateringid}/menu` })
                )
              }
            }
          }
        } else {
          // Если корзина НЕ прикреплена к заказу
          console.warn(
            'Cart dont included in Order. cartcateringid:',
            cartcateringid
          )
          if (
            id === currentOrder.catering_id &&
            (cartcateringid === null ||
              cartcateringid === undefined ||
              cartcateringid === false)
          ) {
            // Если корзинны нет вобще
            if (this.orderTimingState(currentOrder) === 'wait_manager') {
              this.$store.commit('SET_GOEATPOPUP', 2)
            } else {
              console.error('CART is empty 2')
              this.$router.push(
                this.localePath({ path: `/catering/${id}/menu` })
              )
            }
          } else {
            // Go&Eat начат в другом ресторане
            console.error(
              'ANOTHER CATERING ORDER. Type:' + type,
              cartcateringid,
              id,
              this.CART_ITEMS,
              currentOrder
            )
            this.$store.commit('SET_ANOTHER_ORDER_ACTIVE', callback)
          }
        }
      } else {
        // Если заказ другого типа
        console.error('ANOTHER ORDER EXIST error', id, type, callback)
        this.$store.commit('SET_ANOTHER_ORDER_ACTIVE', callback)
      }
    },
    startOrder (cateringid, orderType, forceAsk) {
      const id = cateringid || this.CURRENT_CATERING.id

      if (!this.IS_AUTHORIZATION) {
        this.$store.commit('SET_LOGIN_POPUP', true)
        return false
      }

      const currentOrder = this.currentOrderMethod()
      if (currentOrder && !forceAsk) {
        // Если уже начали какойто заказ направляем пользователя
        const callback = () =>
          this.startOrder(id, orderType, 'another_order_callback')
        this.checkOrderWay(id, orderType, callback)
      } else {
        // Заказ не начат выдаем попап для инициализации заказа
        if (orderType === 'go_and_eat') {
          this.$store.commit('SET_GOEATPOPUP', true)
        }
        if (orderType === 'pickup') {
          this.$store.commit('SET_PICKUPPOPUP', true)
        }
        if (orderType === 'delivery') {
          this.$store.commit('SET_DELIVERY_POPUP_WORK')
        }
        if (orderType === 'reserve_table') {
          this.$store.commit('SET_RESERVATION_POPUP', true)
        }
        if (orderType === 'pre_order') {
          this.$store.commit('SET_PREORDER_POPUP', true)
        }
      }
      return orderType
    },
    startGoEat (cateringid) {
      this.startOrder(cateringid, 'go_and_eat')
    },
    startPickup (cateringid) {
      this.startOrder(cateringid, 'pickup')
    },
    startDelivery (cateringid) {
      this.startOrder(cateringid, 'delivery')
    },
    startReserve (cateringid) {
      this.startOrder(cateringid, 'reserve_table')
    },
    startPreorder (cateringid) {
      this.startOrder(cateringid, 'pre_order')
    },

    /**
     *
     * Cart managment
     *
     */
    cartCatering () {
      if (this.CART_ITEMS && this.CART_ITEMS.length) {
        const cartcateringid =
          this.CART_ITEMS[0] && this.CART_ITEMS[0].catering_id

        return cartcateringid
      }
      return false
    },
    getCartItems () {
      const cookiz = this.$cookies
      return this.$store.dispatch('GET_CART_ITEMS', cookiz).then((data) => {
        const id = this.cateringId
        if (id) {
          const cookiz = this.$cookies
          this.$store.dispatch('GET_CURRENT_CATERING', { cookiz, id })
        } else {
          console.error('CART no dishes with catering id')
          // this.$router.go(-1)
        }
      })
    },
    clearCart () {
      const cookiz = this.$cookies
      return this.$store
        .dispatch('CLEAR_CART', { cookiz })
        .then((data) => {
          console.log('clearCart ok', data)
        })
        .catch((err) => {
          console.error('clearCart index error ', err)
        })
    },
    cartToOrder (id, orderID, callback, personQuantity) {
      console.warn('index cartToOrder', id, orderID)
      const cookiz = this.$cookies

      return this.$store
        .dispatch('CART_TO_CURRENT_CATERING_ORDER', {
          cookiz,
          id,
          orderID,
          personQuantity
        })
        .then(({ data }) => {
          console.log('cartToOrder CART_TO_CURRENT_CATERING_ORDER data', data)
          if (data && data.order && data.order.id) {
            this.setOrder(data.order)

            if (data.order.order_type === 'go_and_eat') {
              if (callback) {
                callback()
              } else {
                this.$router.push(
                  this.localePath({ path: `/ordering/${id}/pay` })
                )
              }
            }
            if (data.order.order_type === 'delivery') {
              if (callback) {
                callback()
              } else {
                this.$router.push(this.localePath({ path: '/profile/cart' }))
              }
            }
            if (data.order.order_type === 'pickup') {
              if (callback) {
                callback()
              } else {
                this.$router.push(this.localePath({ path: '/profile/cart' }))
              }
            }
            if (data.order.order_type === 'pre_order') {
              if (callback) {
                callback()
              } else {
                this.$router.push(
                  this.localePath({ path: `/ordering/${id}/pay` })
                )
              }
            }
          } else {
            console.error('CART_TO_CURRENT_CATERING_ORDER error1', data)
          }
        })
        .catch((err) => {
          console.error('CART_TO_CURRENT_CATERING_ORDER error2', err)
        })
    },

    payOrder (itm) {
      console.log('payOrder', itm)
      this.setOrder(itm)
      this.$store.commit('SET_CURRENT_ORDER', itm)
      this.$router.push(
        this.localePath({
          path: `/ordering/${itm.catering_id}/pay`,
          query: { order: itm.id }
        })
      )
    },

    /**
     *
     * Link generators
     *
     */
    async shareData (data) {
      try {
        await navigator.share(data)
      } catch (err) {
        console.error('shareData', err)
        this.$store.commit('SET_ERROR_NOTIFY', 'Sharing error')
      }
    },
    copyCateringLink () {
      if (this.IS_AUTHORIZATION) {
        const cateringId = this.$route.params.id
        const path =
          window.location.origin +
          this.localePath({
            path: `/catering/${cateringId}`
          })

        navigator.clipboard
          .writeText(path)
          .then(() => {
            this.$store.commit('SET_SUCCESS_NOTIFY', this.$t('linkCopied'))
          })
          .catch((err) => {
            console.error('copyCateringLink', err)
            this.$store.commit('SET_ERROR_NOTIFY', this.$t('linkCopiedError'))
          })
      }
    },
    routingForCurrentCatering () {
      if (this.IS_AUTHORIZATION) {
        const vm = this
        const to = {
          to: `${vm.CURRENT_CATERING.address.city}, ${vm.CURRENT_CATERING.address.street}, ${vm.CURRENT_CATERING.address.building}`
        }

        this.$store.commit('SET_GMAP_ROUTE', to)

        let way = {
          catering: vm.CURRENT_CATERING.id,
          ...to
        }
        way = JSON.stringify(way)
        way = this.b64e(way)

        console.log(way)

        this.$router.push(this.localePath({ path: '/way', query: { q: way } }))
      }
    },
    buildTheWay (item) {
      let way = {
        catering: item.catering_id,
        to: `${item.catering_address.city}, ${item.catering_address.street}, ${item.catering_address.building}`
      }
      way = JSON.stringify(way)
      way = this.b64e(way)

      this.$router.push(this.localePath({ path: '/way', query: { q: way } }))
    },

    getAddressFromLocation (geocoder, latLngObject) {
      const durationText = `${latLngObject.lat}, ${latLngObject.lng}`

      return new Promise((resolve, reject) => {
        geocoder.geocode({ location: latLngObject }, (response, status) => {
          if (status === 'OK') {
            if (response[0]) {
              resolve(response[0].formatted_address)
            } else {
              reject(durationText)
            }
          } else {
            reject(durationText)
          }
        })
      })
    },

    eatmeUserGeolocation () {
      const vm = this
      return new Promise((resolve, reject) => {
        // IPGEO
        const IPGEO = () => {
          // ip-api endpoint URL see http://ip-api.com/docs/api:json for documentation
          const endpoint = 'https://ipapi.co/json'
          const options = {
            headers: new Headers({ 'Accept-Language': null })
          }

          console.warn('Trying IPGEO')
          return fetch(endpoint, options)
            .then(e => e.json())
            .then((response) => {
              if (response.longitude && response.latitude) {
                console.log('IPGEO success', response)
                resolve({
                  ...response,
                  coords: {
                    longitude: response.longitude,
                    latitude: response.latitude
                  }
                })
              }
            })
        }

        // Catch browser doesn't support Geolocation
        async function generateGeoError (err) {
          console.error('Browser Geolocation: ', err)
          if (process.browser) {
            if (localStorage) {
              const wasShown = +localStorage.getItem('geo_shown')
              if (!wasShown) {
                vm.$store.commit('SET_GEO_NOTIFY', true)
                localStorage.setItem('geo_shown', 5)
              } else {
                localStorage.setItem('geo_shown', wasShown - 1)
              }

              // Try to resolve with IPGEO in paralel
              await IPGEO()
            } else {
              console.error('Browser Geolocation: please, enable local storage')
            }
          }
          reject(new Error(() => err))
        }

        // Try to detect location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function () {},
            function () {},
            {}
          ) // Dont touch
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve(position)
            },
            (error) => {
              if (error.code === error.PERMISSION_DENIED) {
                generateGeoError('Permision DENIED')
              } else {
                error.details =
                  'navigator.geolocation.getCurrentPosition unknown error'
                generateGeoError(error)
              }
            },
            { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
          )
        } else {
          generateGeoError('no navigator.geolocation')
        }
      })
    },
    loadPersonalData () {
      const cookiz = this.$cookies

      if (this.IS_AUTHORIZATION) {
        return this.$store.dispatch('GET_PERSONAL_DATA', cookiz)
      }

      return Promise.resolve(null)
    },

    /**
     *
     * Page dualism section
     *
     */
    loginHandle () {
      this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
      this.$store.commit('SET_LOGIN_POPUP', true)
    },
    loginUserTypes () {
      console.log('asdasdas')
      this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
      this.$store.commit('SET_LOGIN_USERTYPES_POPUP', true)
    },
    registrateHandle () {
      this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
      this.$store.commit('SET_REGISTRATE_POPUP', true)
    },
    registrateUserTypeHandle () {
      this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
      this.$store.commit('SET_SETUSERTYPE_POPUP', true)
    },
    registrateCateringPoint () {
      this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
      this.$store.commit('SET__CATERINGPOINT_POPUP', true)
    },
    recoveryHandle () {
      this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
      this.$store.commit('SET_RECOVERY_POPUP', true)
    },
    confirmationHandle () {
      if (this.isMobile) {
        this.$router.push(this.localePath({ name: 'confirmation' }))
      } else {
        this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
        this.$store.commit('SET_COMFIRMATION_POPUP', true)
      }
    },

    /**
     *
     * Other methods section
     *
     */
    wait (f) {
      if (f() === false) {
        setTimeout(() => this.wait(f))
      }
    },
    b64e: (str) => {
      return btoa(
        encodeURIComponent(str).replace(
          /%([0-9A-F]{2})/g,
          function toSolidBytes (match, p1) {
            return String.fromCharCode('0x' + p1)
          }
        )
      )
    },
    b64d: (str) => {
      return decodeURIComponent(
        atob(str)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )
    },
    newDate (dts) {
      if (dts) {
        if (dts[7] === '-' && dts[16] === ':') {
          dts = dts
            .match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/)
            .splice(1)
          return new Date(dts[0], dts[1] - 1, dts[2], dts[3], dts[4], dts[5])
        }
        dts = dts.replace(/ /g, 'T')
        return new Date(dts)
      }
      return new Date()
    },
    toMinutes: ms => Math.floor(ms / (1000 * 60)),
    toSeconds: ms => Math.floor(ms / 1000),

    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1)
  }
})
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = () =>
  new Vuex.Store({
    modules: {
      // AUTH ----
      Authorization,
      cateringPointRegistration,
      Login,
      Registration,
      Recovery,
      Verification,
      // CATERING ----
      CateringList,
      CurrentCatering,
      CurrentCateringMenu,
      CurrentCateringDish,
      CurrentCateringReviews,
      CateringFilter,
      // ORDERING PROCCESS---
      OrderingOrder,
      OrderingReserve,
      // BASKET ----
      CartItems,
      // ORDERS ----
      Orders,
      // NAP ----
      GMapConfig,
      GMapSettings,
      GMapRoute,
      GMapObjects,
      Map,
      // PERSONAL ----
      Personal,
      Payments,
      Addresses,
      // Interface global ----
      Languages,
      Currencies,
      Window,
      GlobalPopups,
      GlobalNotifications,
      // Favorites
      Favorites,
      FavoritesDish,
      // subscribe
      Subscribe
    },
    strict: debug
  })

export default store
