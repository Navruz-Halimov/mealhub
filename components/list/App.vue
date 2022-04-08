<template>
  <ul class="list">
    <a target="_blank" href="https://play.google.com/store" class="list-item">
      <img src="~assets/icons/googleplay.svg" alt="App 'Meal hub' for android">
    </a>
    <a target="_blank" href="https://www.apple.com/app-store/" class="list-item">
      <img src="~assets/icons/appstore.svg" alt="App 'Meal hub' for ios">
    </a>
  </ul>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';

  .list {
    display: flex;

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:not(:first-child) {
        margin-left: 10px;
      }

      img{
        width: 10rem;
      }
    }
  }
</style>
