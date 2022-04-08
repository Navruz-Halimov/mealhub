<template>
  <main class="main">
    <div class="main_body">
      <div class="menucontainernew">
        <MainActions :current-action="''" class="gbadfgadfgadsg desktop" @select-action="selectOrdersMenuAction" />
        <nav class="main_menu">
          <div class="main_menu-back">
            <addition-back />
          </div>
          <menu-ordering-view-menu :orders-id="$route.params.id" @menuhandler="menuClick" />
        </nav>
      </div>

      <NuxtChild />

      <div class="main_news">
        <MainNews />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'primary',
  methods: {
    menuClick (type) {
      // Ничего не делать
      return true
      // this.type = type || 'go_and_eat'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/abstract/var";
  @import "~/assets/styles/abstract/mixins";
  @import "~/assets/styles/classes/class";
  @import '~/assets/styles/modificator';

  .main_menu {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
    flex: 1 0 17vw !important;
  }

  .menucontainernew {
    grid-area: menu !important;
    display: flex !important;
    flex-direction: column !important;
  }

  .gbadfgadfgadsg {
    height: 5rem !important;
    margin-bottom: 5px !important;
    width: 98% !important;
  }

  @media screen and (max-width: 991px) {
    .main_menu {
      display: none !important;
    }

    .main_body {
      min-height: 100vh;
      min-height: calc(var(--vh) * 100);
      height: auto;
    }
  }

  .catering{
    border-top:2px solid $c-line;
    .youChoosed{
      color:#9d9d9d;
      margin-top:2rem;
      margin-bottom:1rem;
    }
    .cateringName{
      font-family: $ff-roboto;
      font-weight:bold;
    }

  }

  @media screen and (max-width: 991px) {

    .main_body{
      height: auto !important;
      min-height: 77vh;
      min-height: calc(var(--vh) * 77);
      background:white;
    }

    .aboutGo{

      font-size:18px;

      &>div{
        width:85%;
        margin-left:auto;
        margin-right:auto;
      }
      .aboutText{
        font-weight:initial;
        color:#5d5d5d;
        text-align:left;
      }
      .title{
        margin-top:2rem;
        font-size: 22px;
        img{
          height:32px;
        }
      }
      .steps{
        font-weight:initial;
        color:#5d5d5d;
        text-align:left;
        display:block;
        margin:0 0 1em 0.25em;

        &::before{
          content: '';
          position: absolute;
          left: 0;
          top: 18%;
          width: 1px;
          height: 66%;
          border-left: 1px solid $c-green;
        }

        .step{
          font-weight:initial;
          padding-top: 0rem;
          width:100%;
          margin:0;

          span{
            position:initial;
            margin-left: 1rem;
            display:inline;
            &::after{
              content:'. ';
            }
          }

          &::before{
            width:.4em;
            height:.4em;
            left:0.1em;
            top:.5em;
          }
        }

      }
    }

    .catering{
      font-size:16px;
      .youChoosed{
        font-size:18px;
        margin-top: 1rem;
        margin-bottom: 0rem;
      }
      .cateringAddress{
        display:none;
      }
      .cateringName{
        color:$c-green;
      }

    }

    .heading {
      &>div{
        display:block;
      }
    }
    .main_menu-back.mobile{
      font-size:14px;
      padding: 0 1rem;
      position:absolute;
    }
  }

</style>
