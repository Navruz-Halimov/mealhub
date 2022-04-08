<i18n>
{
  "en": {
    "title": "My Data",
    "phone": "Phone number"
  },
  "ru": {
    "title": "Мои данные",
    "phone": "Номер телефона"
  }
}
</i18n>

<template>
  <main class="main">
    <div class="main_body">
      <div class="menucontainernew">
        <MainActions
          :current-action="''"
          class="gbadfgadfgadsg desktop"
          @select-action="selectOrdersMenuAction"
        />
        <nav class="main_menu">
          <div class="main_menu-back">
            <addition-back />
          </div>
          <MenuDesktop type="profile" />
        </nav>
      </div>
      <section class="profile">
        <div class="profile-back">
          <addition-back />
        </div>
        <template v-if="profile && profile.phone">
          <header class="profile_header">
            <h1 class="profile-title">
              {{ $t('title') }}
            </h1>
            <div class="profile_info">
              <p class="profile-id">
                ID: {{ profile.id }}
              </p>
              <p
                v-if="~profile.phone.indexOf('+7')"
                class="payments-phone ml-1"
              >
                {{ $t('phone') }}:
                <span>{{ profile.phone.slice(0, 2) }}</span>
                {{ parsePhone(profile.phone, 2) }}
              </p>
              <p v-else class="payments-phone ml-1">
                {{ $t('phone') }}:
                <span>{{ profile.phone.slice(0, 3) }}</span>
                {{ parsePhone(profile.phone) }}
              </p>
            </div>
          </header>
          <div class="profile_form mb-2">
            <form-profile-personal :profile="profile" />
          </div>
        </template>
      </section>
      <div class="main_news">
        <MainNews />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'primary',
  middleware: 'auth-home',
  data () {
    return {
      profile: {},
      carouselIsOpen: false,
      currentActionDesktop: 'search',
      currentActionMobile: ''
    }
  },
  watch: {
    successPopupIsOpen (value) {
      if (!value) {
        this.$router.go(0)
      }
    }
  },
  async created () {
    const cookiz = this.$cookies
    await this.$store.dispatch('GET_PERSONAL_DATA', cookiz)
    this.profile = { ...this.PERSONAL_DATA }
  },
  mounted () {
    if (process.browser) {
      if (localStorage.notifyaction) {
        this.$store.commit(localStorage.notifyaction, true)
      }
      localStorage.removeItem('notifyaction')
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('CLEAR_NOTIFICATIONS')
    this.$store.dispatch('CLOSE_GLOBAL_POPUPS')
    next()
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

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

.profile {
  position: relative;
  grid-area: body;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: 20px;
  justify-items: center;
  border-radius: 0;
  padding: 10px 20px;
  background-color: $c-light;
  height: 100%;
  width: 100%;

  @media screen and (min-width: 992px) {
    border-radius: $br-block-desktop;
    padding: 40px 30px;
    width: 69%;
  }

  &-back {
    position: absolute;
    top: 10px;
    left: 10px;

    @media screen and (min-width: 992px) {
      display: none;
    }

    & /deep/ {
      .link-back {
        font-size: 14px;

        &-icon {
          flex: 0 0 15px;
          width: 15px;
          height: 10px;
        }
      }
    }
  }

  &_header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-title {
    font-family: $ff-roboto;
    font-size: 22px;
    font-weight: bold;
    color: $c-green;
    @media screen and (max-width: 991px) {
      margin: 3rem 0 1rem;
    }

    @media screen and (min-width: 992px) {
      color: $c-primary;
    }
  }

  &_info {
    display: flex;
    font-family: $ff-gilroy;
    font-size: 14px;
    color: $c-green;

    @media screen and (min-width: 992px) {
      font-size: 14px;
      color: $c-primary;
    }
  }

  &-phone {
    display: none;
    margin-left: 10px;

    @media screen and (min-width: 992px) {
      display: inline-block;
    }
  }

  &_form {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    overflow: auto;

    @media screen and (min-width: 992px) {
      position: relative;
      margin-bottom: 0;
    }
  }
}
</style>
