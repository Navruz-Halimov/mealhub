<template>
  <div
    :key="`loadingLogo${+loading}`"
    :class="{ 'loading_in-progress': loading }"
    class="loading"
  >
    <div class="loading__wrapper">
      <div class="loading__logo">
        <!-- <AnimatedLogo /> -->
        <DarkLogo />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000000;
  opacity: 0;
  transition: opacity 0.2s ease, visibility 0.2s ease;

  &.loading_in-progress {
    opacity: 1;
    visibility: visible;
  }

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: white;
  }

  &__logo {
    min-width: 150px;
    width: 12%;
  }
}
</style>
