<template>
  <div class="popupsContainer">
    <!-- FORM AUTH for desktop -->
    <popup-notification
      v-if="$store.getters.loginPopup"
      @close-popup="$store.commit('SET_LOGIN_POPUP', false)"
    >
      <form-login />
    </popup-notification>
    <!-- FORM LOGIN USER TYPES -->
    <popup-notification
      v-if="$store.getters.loginUserTypesPopup"
      @close-popup="closePopup"
    >
      <form-login-user-types />
    </popup-notification>
    <!-- FORM REGISTRATE -->
    <popup-notification
      v-if="$store.getters.registratePopup"
      @close-popup="$store.commit('SET_REGISTRATE_POPUP', false)"
    >
      <form-registrate />
    </popup-notification>
    <!-- FORM REGISTRATE TYPE -->
    <popup-notification
      v-if="$store.getters.userTypePopup"
      @close-popup="closePopup"
    >
      <form-registrate-type />
    </popup-notification>
    <popup-notification
      v-if="$store.getters.cateringPointPopup"
      @close-popup="$store.commit('SET__CATERINGPOINT_POPUP', false)"
    >
      <form-registrate-catering-point />
    </popup-notification>
    <popup-notification
      v-if="$store.getters.recoveryPopup"
      @close-popup="closePopup"
    >
      <form-recovery />
    </popup-notification>
    <popup-notification
      v-if="!isMobile && $store.getters.confirmationPopup"
      @close-popup="closePopup"
    >
      <form-confirmation />
    </popup-notification>

    <!-- ORDERS -->
    <div v-if="IS_GOEATPOPUP">
      <popup-notification
        class="popupContainer IS_GOEATPOPUP"
        @close-popup="closePopup"
      >
        <form-goeat ref="goeatpopup_goeat" />
        <!--Step 1-->
      </popup-notification>
    </div>

    <div v-if="IS_PICKUPPOPUP">
      <popup-notification
        class="popupContainer IS_PICKUPPOPUP"
        @close-popup="closePopup"
      >
        <form-pickup />
        <!--Step 1-->
      </popup-notification>
    </div>

    <div v-if="IS_DELIVERY_POPUP">
      <popup-notification
        class="popupContainer IS_DELIVERYPOPUP"
        @close-popup="closePopup"
      >
        <form-delivery />
        <!--Step 1-->
      </popup-notification>
    </div>

    <popup-notification
      v-if="IS_RESERVATION_POPUP || IS_PREORDER_POPUP"
      @close-popup="closePopup"
    >
      <form-reservation :is-preorder="IS_PREORDER_POPUP" />
    </popup-notification>

    <div
      v-if="IS_ANOTHER_ORDER_ACTIVE_POPUP"
      class="popupContainer ANOTHER_ORDER_ACTIVE"
    >
      <popup-notification @close-popup="closePopup">
        <form-another-order-exist
          :callback="IS_ANOTHER_ORDER_ACTIVE_POPUP"
          @close-popup="closePopup"
        />
      </popup-notification>
    </div>

    <div v-if="$store.getters.simpleErrorPopup" class="simpleErrorPopup">
      <popup-error
        @close-popup="$store.commit('SET_SIMPLE_ERROR_POPUP', false)"
      >
        {{ $store.getters.simpleErrorPopup }}
      </popup-error>
    </div>

    <!-- Footer popups -->
    <popup-notification
      v-if="$store.getters.supportPopup"
      @close-popup="closePopup"
    >
      <popup-supportpopup />
    </popup-notification>
    <popup-notification
      v-if="$store.getters.partnerPopup"
      @close-popup="closePopup"
    >
      <popup-partnerpopup />
    </popup-notification>

    <div v-if="activePopup && activePopupComponent">
      <popup-notification
        :has-background="getHasBackground(activePopup)"
        @close-popup="closeActivePopup"
      >
        <component
          :is="activePopupComponent"
          :info="activePopup.data"
          :type="activePopup.type"
          @close-popup="closeActivePopup"
        />
      </popup-notification>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'IS_ANOTHER_ORDER_ACTIVE_POPUP',
      'IS_GOEATPOPUP',
      'IS_PICKUPPOPUP',
      'IS_DELIVERY_POPUP',
      'IS_RESERVATION_POPUP',
      'IS_PREORDER_POPUP'
    ]),
    activePopup () {
      return this.$store.getters.CURRENT_POPUPS_FIRST_ITEM
    },
    activePopupComponent () {
      if (this.activePopup.type === 'order_payment') {
        return () => import('@/components/form/SuccessPayment.vue')
      }
      if (this.activePopup.type === 'goandeat_dish_ready') {
        return () => import('@/components/form/SuccessPayment.vue')
      }
      if (this.activePopup.type === 'order_review') {
        return () => import('@/components/form/OrderReview.vue')
      }
      if (this.activePopup.type === 'wait_reserve_confirmed') {
        return () => import('@/components/form/ReserveConfirmed.vue')
      }
      if (this.activePopup.type === 'wait_reserve_confirmed_free') {
        return () => import('@/components/form/SuccessPayment.vue')
      }
      if (this.activePopup.type === 'wait_reserve_rejected') {
        return () => import('@/components/popup/error/Rejected.vue')
      }
      if (this.activePopup.type === 'wait_reserve_rejected_reason') {
        return () => import('@/components/popup/error/Reason.vue')
      }

      return null
    }
  },
  methods: {
    getHasBackground (popup) {
      return true
    },
    closePopup () {
      console.log('close clicked')
      if (this.$refs.goeatpopup_goeat) {
        this.$refs.goeatpopup_goeat.state = 1
      }
      console.log('this.$parent.resetData', this.$parent.resetData)
      if (this.$parent.resetData) {
        this.$parent.resetData()
      } else {
        this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
      }
      console.log('this.$route', this.$route)
      // Попапы на страницах аутентификаций редиректят на главную
      if (this.$route && this.$route.name && this.$route.name.includes) {
        const rn = this.$route.name
        if (
          rn.includes('login') ||
          rn.includes('registrate') ||
          rn.includes('recovery') ||
          rn.includes('confirmation')
        ) {
          return (
            this.$parent.redirectToMainPage && this.$parent.redirectToMainPage()
          )
        }
      }
      return false
    },
    closeActivePopup () {
      this.$store.commit('SHIFT_CURRENT_POPUPS')
    }
  }
}
</script>

<style lang="scss" scoped>
//.popupsContainer {
//  @media screen and (max-width: 991px) {
//    &.mobile {
//      display: block !important;
//    }
//  }
//  @media screen and (min-width: 992px) {
//    &.desktop {
//      display: block !important;
//    }
//  }
//}
.popupContainer {
  position: fixed;
  z-index: 1500;
  top: 0;
  left: 0;

  /* @media screen and (max-width: 991px) {
      &.authpoupup {
        display: none;
      }
    } */
}

//@media screen and (max-width: 991px) {
//  .popupContainer{
//    position: relative !important;
//    z-index: 1500 !important;
//  }
//}
</style>

<style>
.simpleErrorPopup {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 1500;
}
@media screen and (max-width: 991px) {
  .goeatpopup .popup_wrap {
    position: relative !important;
    height: 100% !important;
  }
  .goeatpopup .popup_wrap > .popup {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0 !important;
    padding-top: 0 !important;
  }

  .ANOTHER_ORDER_ACTIVE .popup_wrap > .popup {
    height: initial;
  }
}

@media screen and (min-width: 992px) {
  .goeatpopup.goeat .popup {
    padding: 0;
  }
  .goeatpopup .popup_wrap .popup {
    height: auto !important;
  }

  .authpoupup .popup {
    height: auto !important;
  }
}
</style>
