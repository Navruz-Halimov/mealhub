<template>
  <div class="logo" @click="(noclick !== true) && goHome()" />
</template>

<script>
export default {
  props: {
    noclick: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goHome () {
      const m = document.querySelector('.main_action-back button') // search
      const f = document.querySelector('.filter-back button') // filter
      const r = document.querySelector('.route-back button') // route

      if (f) { f.click() }
      if (r) { r.click() }
      if (m) { m.click() }

      // window.location.href = this.localePath('index')
      this.$router.push(this.localePath('index'))
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';

  .logo {
    width: 100%;
    height: 100%;
    // background-image: url('~static/icons/logo/fume.svg'), url('~static/icons/logo/label.svg'), url('~static/icons/logo/cap.svg');
    // background-size: 100% 15%, 100% 80%, 100% 75%;
    // background-position: center top, center bottom, center bottom;
    // background-repeat: no-repeat, no-repeat, no-repeat;
    background-image: url('~static/icons/logo/logo.png');
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }
</style>
