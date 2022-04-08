<template>
  <popup-notification class="popupSuccess" @close-popup="close">
    <div class="popupSuccess-content">
      <h2 class="popupSuccess-message">
        <slot />
      </h2>
      <DarkLogo :noclick="true" />
    </div>
  </popup-notification>
</template>

<script>
export default {
  mounted () {
    document.body.classList.add('overflow-hidden')
  },
  beforeDestroy () {
    document.body.classList.remove('overflow-hidden')
  },
  methods: {
    close () {
      this.$emit('close-popup')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var.scss';

  .popupSuccess {
    &-content {
      @media screen and (max-height: 660px) {
        padding: 80px 0;
      }
    }

    &-message {
      text-align: center;
      margin-bottom: 15px;
      font-family: $ff-roboto;
      font-size: 22px;
    }

    & /deep/ .logo {
      align-self: center;
      width: auto;
      height: 19em;
    }
  }
</style>
