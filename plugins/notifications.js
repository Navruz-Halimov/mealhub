import axios from 'axios'
import apiAddress from '~/plugins/api-address'

class Notification {
  constructor (store, info, app, type = null) {
    this.store = store
    this.type = type || info.type
    this.data = info.data
    this.app = app
    this.counter = info.counter

    this.data.user_id = info.user_id
  }

  showNotify (text) {
    this.store.commit('SET_SUCCESS_NOTIFY', text)
  }

  showFunctionalNotify (notify) {
    this.store.commit('SET_FUNCTIONAL_NOTIFY', notify)
  }

  openPopup () {
    const { type, data, counter } = this
    this.store.commit('PUSH_CURRENT_POPUPS', { type, data, counter })
  }

  async updateProfile () {
    const cookiz = this.app.$cookies
    await this.app.store.dispatch('GET_PERSONAL_DATA', cookiz)
  }

  addToQueue () {
    this.openPopup()
  }
}

class ReserveNotification extends Notification {
  constructor (store, info, app) {
    let type

    const data = info.data

    if (data.table_is_reserved) {
      if (data.price !== 0 || data.order_type === 'pre_order') {
        type = 'wait_reserve_confirmed'
      } else {
        type = 'wait_reserve_confirmed_free'
      }
    } else if (!data.reserve_unavailable_reason) {
      type = 'wait_reserve_rejected'
    } else {
      type = 'wait_reserve_rejected_reason'
    }

    super(store, info, app, type)
  }
}

class GoEatBookingNotification extends Notification {
  constructor (store, info, app) {
    super(store, info, app)

    let buttonOptions = null
    if (this.store.getters.CART_ITEMS && this.store.getters.CART_ITEMS.length) {
      buttonOptions = {
        text: 'startBtnCart',
        callback: () => app.router.push(app.localePath({ path: '/profile/cart' }))
      }
    } else {
      buttonOptions = {
        text: 'startBtnMenu',
        callback: () => app.router.push(app.localePath({ path: `/catering/${info.data.catering_id}/menu` }))
      }
    }

    this.successInfo = {
      rows: [
        { text: 'tableReservedSuccessfully' },
        { text: 'minutes20Notify', class: 'text-bold' },
        { text: 'minutes20Notify2' }
      ],
      button: buttonOptions,
      img: 'logo'
    }

    this.errorInfo = {
      rows: [
        { text: 'chooseAnotherService1' },
        { text: 'chooseAnotherService3' }
      ],
      img: 'error'
    }
  }

  showMessage () {
    if (this.data.table_is_reserved) {
      this.showFunctionalNotify(this.successInfo)
    } else {
      this.showFunctionalNotify(this.errorInfo)
    }
  }

  addToQueue () {
    if (this.store.getters.IS_GOEATPOPUP) {
      this.openPopup()
    } else {
      this.showMessage()
    }

    this.updateProfile()
  }
}

class NotificationFactory {
  constructor (store, app) {
    this.store = store
    this.app = app
  }

  create (notificationData) {
    // To test review popup
    // if (notificationData) {
    //   notificationData.type = 'order_review'
    //   return new Notification(this.store, notificationData)
    //   // return new ReserveNotification(this.store, notificationData, this.app)
    // }

    if (notificationData.type === 'order_payment') {
      if (notificationData.data.status === 'payed') {
        return new Notification(this.store, notificationData)
      }
    }

    if (notificationData.type === 'goandeat_dish_ready' ||
        notificationData.type === 'order_review') {
      return new Notification(this.store, notificationData)
    }

    if (notificationData.type === 'goandeat_booking') {
      return new GoEatBookingNotification(this.store, notificationData, this.app)
    }

    if (notificationData.type === 'wait_reserve' ||
      notificationData.type === 'wait_preorder' ||
      notificationData.type === 'wait_reserve_timeout' ||
      notificationData.type === 'wait_preorder_timeout'
    ) {
      return new ReserveNotification(this.store, notificationData, this.app)
    }

    return null
  }
}

class NotificationManager {
  constructor (timeout = 10000) {
    this.interval = null
    this.app = null
    this.timeout = timeout
    this.factory = null

    // To test review popup
    this.counter = 0
  }

  async notify () {
    if (!this.app || !this.app.store.getters.IS_AUTHORIZATION) { return }

    console.log('notify')
    try {
      const res = await axios.get(`${apiAddress(this.app.store)}/user/get-notifications`, {
        headers: {
          Authorization: this.app.$cookies.get('user_token')
        }
      })

      const types = new Set()
      const notifications = res.data.notifications

      for (const notificationData of notifications) {
        types.add(notificationData.type)

        // To test review popup
        // if (notificationData.counter === 1 || this.counter === 0) {
        if (notificationData.counter === 1) {
          // To test review popup
          this.counter++
          console.log('notification')
          const notification = this.factory.create(notificationData)

          if (!notification) {
            return
          }

          notification.addToQueue()
        }
      }
    } catch (err) {
      console.error('notification error', err)
    }
  }

  async subscribe (app) {
    this.app = app
    this.factory = new NotificationFactory(this.app.store, this.app)
    await this.notify()
    this.interval = setInterval(() => this.notify(), this.timeout)
    console.log('subscribe')
  }

  unsubscribe () {
    clearInterval(this.interval)
    console.log('unsubscribe')
  }
}

const notificationManager = new NotificationManager(2500)

export default ({ app }, inject) => {
  inject('subscribe', () => notificationManager.subscribe(app))
  inject('notify', () => notificationManager.notify())
  inject('unsubscribe', () => notificationManager.unsubscribe())
}
