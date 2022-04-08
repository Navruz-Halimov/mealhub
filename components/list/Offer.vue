<template>
  <div class="flex wide">
    <div v-for="i in 15" :key="i" class="slide">
      <nuxt-link :to="localePath('/')" class="offers-href">
        <img :src="`/images/news/${i+6}.jpg`" alt="" class="offers-img">
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';
  @import '~/assets/styles/modificator';

  .flex.wide{
    flex-wrap: wrap;
    overflow:hidden;
    height: 37px;

    @media screen and (min-width: 992px) {
      height:50px;
    }

  }

  .slide{
    margin: 0 .25rem;
    margin-bottom:1rem;
  }
  .offers {
    display: block;
    height: 100%;
    overflow-x: auto;

    &-item {
      display: inline-block;
      border: {
        width: 1px;
        style: solid;
        color: $light;
        radius: 6px;
      }
      width: 50px;

      @media screen and (min-width: 992px) {
        width: 70px;
      }

      &:not(:first-child) {
        margin-left: 5px;
      }
    }

    &-href {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: 6px;
      width: 60px;
      height: 100%;

      @media screen and (min-width: 992px) {
        width: 80px;
      }
    }

    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
