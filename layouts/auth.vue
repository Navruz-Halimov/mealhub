<template>
  <div class="wrapper">
    <div class="wrapperAuth">
      <BlockHeaderAuth
        :class="pageName == 'confirmation' ? 'confirmationWrapper' : ''"
        :active="pageName"
      />

      <main
        class="main loginMainBody registrateMainBody recoveryMainBody confirmMainBody "
      >
        <div class="main_body">
          <!-- Action list for desktop -->
          <div class="main_actions">
            <MainActions />
          </div>
          <!-- Search all tops for desktop -->
          <div class="main_search-input">
            <basic-input-search />
          </div>
          <!-- Searchable top list for desktop -->
          <div class="main_tops">
            <ListTop />
          </div>
          <!-- View map -->
          <div class="main_map">
            <MapView />
          </div>

          <Popups class="mobile" />
          <!-- News for desktop to left bar -->
          <div class="main_news">
            <MainNews />
          </div>
          <Nuxt />
        </div>
      </main>

      <Footer />
    </div>

    <Notifications />
    <Popups
      :class="{
        desktop: !$store.getters.partnerPopup && !$store.getters.supportPopup
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {
      pageName: ''
    }
  },
  watch: {
    '$route.name' () {
      this.checkPageName()
    }
  },
  created () {
    this.checkPageName()
    console.log(('page name :', this.pageName))
    // Включаем нужный нам попап
    if (this.pageName === 'login') {
      this.$store.commit('SET_LOGIN_USERTYPES_POPUP', true)
    }

    // if (this.pageName === 'registration') {
    //   this.$store.commit('SET_REGISTRATE_POPUP', true)
    // }
    if (this.pageName === 'registration') {
      this.$store.commit('SET_SETUSERTYPE_POPUP', true)
    }

    if (this.pageName === 'recovery') {
      this.$store.commit('SET_RECOVERY_POPUP', true)
    }

    if (this.pageName === 'confirmation') {
      this.$store.commit('SET_COMFIRMATION_POPUP', true)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.resetData()
    if (to.name === from.name) {
      next(false)
    } else {
      console.warn('beforeRouteLeave ', to === from)
      console.dir('beforeRouteLeave ', to)
      console.dir('beforeRouteLeave ', from)
      next()
    }
  },
  methods: {
    resetData () {
      this.$store.commit('STOP_VERIFICATION_TIMER')
      this.$store.commit('REFRESH_VERIFICATION_TIME')
      this.$store.commit('RESET_VERIFICATION_ERROR')
      this.$store.commit('RESET_LOGIN_FORM_DATA')
      this.$store.commit('RESET_REGISTRATION_FORM_DATA')
      this.$store.commit('CLEAR_NOTIFICATIONS')
      this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
    },
    checkPageName () {
      const pageFullName = this.$route.name
      const pageName = pageFullName.split('_')[0]

      if (
        pageName === 'login' ||
        pageName === 'recovery' ||
        pageName === 'confirmation'
      ) {
        this.pageName = pageName
      } else {
        this.pageName = 'registration'
      }
      return this.pageName
    },
    redirectToMainPage () {
      // USED IN Popups.vue
      this.resetData()
      this.$router.push(this.localePath('index'))
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/index';

.wrapperAuth {
  display: grid;
  grid-template-rows: auto 1fr !important;
  grid-template-areas: 'header' 'main';
  width: 100vw;
  overflow: hidden;
  height: auto;
  min-height: 100vh;
  min-height: calc(var(--vh) * 100);
  .header.confirmationWrapper {
    @media screen and (max-width: 991px) {
      display: none;
    }
  }

  @media screen and (min-width: 992px) {
    grid-template-rows: 80px 1fr 108px !important;
    grid-template-areas: 'header' 'main' 'footer';
    grid-row-gap: 10px;
    padding: 0 0;
    height: 100vh;
    height: calc(var(--vh) * 100);
  }
  @media screen and (max-width: 991px) {
    display: flex;
    flex-direction: column;
  }
}
</style>

<style>
.wrapperAuth .header_info a {
  color: white !important;
}

.wrapperAuth .header {
  display: none;
  z-index: 1 !important;
}
.wrapperAuth .header a {
  color: white !important;
}
.wrapperAuth .footer {
  z-index: 1 !important;
}

/*@media screen and (min-width: 992px) {*/

/*  .wrapperAuth .header a {*/
/*    font-size: 14px !important;*/
/*  }*/
/*}*/

@media screen and (max-width: 991px) {
  .wrapperAuth .header {
    display: grid;
  }
  .wrapperAuth .header a {
    font-size: 20px !important;
  }

  .wrapperAuth .header a:hover {
    color: white !important;
    background: none !important;
  }
  .wrapperAuth .main {
    display: flex !important;
    justify-content: center !important;
    overflow: visible !important;
  }
  .wrapperAuth .main_body {
    height: auto !important;
    overflow: visible !important;
    width: 94% !important;
    background-color: rgba(255, 255, 255, 0);
  }

  .formLogin,
  .formRegistrate,
  .formRecovery {
    padding-bottom: 3rem !important;
    overflow: visible !important;
    margin-top: 0;
    margin-bottom: 0rem;
  }
  .main_formLogin,
  .main_formRegistrate,
  .main_formRecovery {
    overflow: visible !important;
    display: flex !important;
    flex-direction: column !important;
    padding-bottom: 4rem;
  }
  .main_formLogin-link,
  .main_formRegistrate-link,
  .main_formConfirm-link {
    margin-top: 1.5rem !important;
  }

  .formRecovery-btn {
    margin-bottom: 1rem;
  }

  /* OTHER ELEMENTS */

  .authPhone-text {
    font-size: 14px !important;
    color: #21bc96;
  }
  .requiredLabelWithStar {
    font-size: 14px !important;
    color: #21bc96;
  }

  .profileText-input {
    font-size: 14px !important;
  }
  .main_formConfirm-title {
    padding: 0 15px 10px;
    /* margin: -5px 0 0; */
  }
}
</style>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
@import '~/assets/styles/abstract/mixins';

.main {
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;

  @media screen and (min-width: 992px) {
    overflow: hidden;
  }

  &_body {
    grid-area: main;
    position: relative;
    z-index: 2 !important;
    width: 100%;
    height: 100%;
    overflow: visible;
    height: auto;
    min-height: auto;

    @media screen and (min-width: 992px) {
      position: absolute;
      display: grid;
      grid-template-columns: 17vw auto 250px;
      grid-template-rows: 50px 50px 1fr;
      grid-template-areas: 'actions map news' 'search map news' 'tops map news';
      grid-gap: 5px;
      padding: 0 $p-side;
      width: 100%;
      height: 100%;
    }
  }

  &_actions {
    grid-area: actions;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    display: none;
    grid-template-columns: repeat(2, 1fr);
    padding: 5px 10px;
    width: 100%;
    height: 50px;
    background-color: rgba(250, 250, 250, 0.84);

    @media screen and (min-width: 992px) {
      position: static;
      display: block;
      padding: 0;
      height: 100%;
      background-color: rgba(255, 255, 255, 0);
    }
  }

  &_search-input {
    grid-area: search;
    display: none;
    font-size: 14px;

    @media screen and (min-width: 992px) {
      display: block;
    }
  }

  &_tops {
    grid-area: tops;
    position: relative;
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @media screen and (min-width: 992px) {
      display: flex;
    }
  }

  &_map {
    grid-area: map;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 100%;
    border-radius: 5px;

    @media screen and (min-width: 992px) {
      position: relative;
      top: auto;
      left: auto;
      display: flex;
      width: 100%;
      height: 100%;
    }
  }

  &_news {
    grid-area: news;
    position: relative;
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @media screen and (min-width: 992px) {
      display: flex;
      margin-left: 0;
    }
  }

  &_formLogin {
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    height: 100%;

    @media screen and (min-width: 992px) {
      display: none;
    }

    &-link {
      display: grid;
      grid-template-columns: 1fr 4fr 1fr;
      grid-column-gap: 10px;
      align-items: center;
      border-radius: 7px;
      padding: 10px;
      background: #ffffff 0% 0% no-repeat padding-box;
    }

    &-img {
      justify-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      object-fit: contain;
    }

    &-icon {
      justify-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;

      svg {
        width: 100%;
        height: 100%;
        fill: $c-green;
      }
    }

    &-label {
      position: relative;
      font-family: $ff-gilroy;
      font-size: $fz-md-medium;
      overflow-y: auto;
    }

    &-arrow {
      justify-self: end;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 25px;
      width: 25px;
      height: 20px;
      object-fit: contain;
    }
  }

  & /deep/ .popup_wrap {
    display: none;

    @media screen and (min-width: 992px) {
      display: flex;
    }
  }
}
</style>
