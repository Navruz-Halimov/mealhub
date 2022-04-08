<template>
  <div class="wrapper">
    <div class="wrapper-container">
      <BlockHeaderAuth />
      <Nuxt />
      <Footer />
    </div>

    <Notifications />
    <Popups />
  </div>
</template>

<style lang="scss">
  @import '~/assets/styles/index';

  .wrapper {
    &-container{
      display: flex;
      flex-direction: column;
      grid-template-rows: 100vh;
      grid-template-rows: calc(var(--vh) * 100);
      grid-template-columns: 100%;
      grid-template-areas: 'main';
      width: 100vw;
      overflow: hidden;
      height: auto;
      min-height: 100vh;
      min-height: calc(var(--vh) * 100);
      overflow: hidden;

      @media screen and (min-width: 992px) {
        display: grid;
        grid-template-rows: 80px 1fr 108px !important;
        grid-template-areas: 'header' 'main' 'footer';
        grid-row-gap: 10px;
        padding: 0 0;
        height: 100vh;
        height: calc(var(--vh) * 100);
      }
    }

    & /deep/ {
      .header {
        display: none;
        z-index: 1 !important;

        @media screen and (min-width: 992px) {
          display: grid;
        }
      }
      .footer {
        z-index: 1 !important;
      }
    }

  }
</style>
