<template>
  <div ref="notificator" class="notificator">
    <popup-eatmenotify v-if="$store.getters.geoNotify" info="GEO" />
    <popup-eatmenotify v-if="$store.getters.registerNotify" info="REGISTER" />
    <popup-eatmenotify v-if="$store.getters.activateNotify" info="ACTIVATE" />
    <popup-eatmenotify v-if="$store.getters.restoreNotify" info="RESTORE" />

    <popup-eatmenotify
      v-if="$store.getters.successNotify"
      info="SUCCESS"
      :message="$store.getters.successNotify"
    />
    <popup-eatmenotify
      v-if="$store.getters.errorNotify"
      info="ERROR"
      :message="$store.getters.errorNotify"
    />

    <popup-eatmenotify
      v-if="$store.getters.timer3Notify"
      info="TIMER3"
      :message="$store.getters.timer3Notify"
    />
    <popup-eatmenotify
      v-if="$store.getters.timer20Notify"
      info="TIMER20"
      :message="$store.getters.timer20Notify"
    />
    <popup-eatmenotify
      v-if="$store.getters.timer5Notify"
      info="TIMER5"
      :message="$store.getters.timer5Notify"
    />

    <popup-eatmefuncitonalnotify
      v-if="$store.getters.functionalNotify"
      :item="$store.getters.functionalNotify"
    />
  </div>
</template>
<script>
export default {
  mounted () {
    setTimeout(() => {
      if (
        this.$refs.notificator &&
        this.$refs.notificator.closest &&
        this.$refs.notificator.closest('.wrapper')
      ) {
        this.$refs.notificator
          .closest('.wrapper')
          .addEventListener('click', () => {
            this.$store.commit('CLEAR_NOTIFICATIONS')
          })
      }
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
.notificator {
  position: fixed;
  top: 0;
  right: 0;
  max-width: 100%;
  z-index: 1000;
}
</style>
