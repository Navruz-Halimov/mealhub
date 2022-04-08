<template>
  <aside class="menu">
    <div class="menu_header">
      <img
        :src="PERSONAL_DATA.photo || '/icons/consumables/user.svg'"
        alt=""
        class="menu-avatar"
      >

      <p class="menu-id">
        ID: {{ PERSONAL_DATA.id }}
      </p>
      <p class="menu-name">
        {{ PERSONAL_DATA.name }}
      </p>
      <button class="menu-logout" @click="logout">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.235 32.896">
          <path
            d="M6.865,115.054h23.3a2.011,2.011,0,1,0,0-4.021H6.865l2.6-2.6a2.011,2.011,0,0,0-2.844-2.844L.589,111.621c-.047.047-.091.1-.132.146-.01.012-.019.026-.029.039-.031.039-.061.078-.088.119-.008.012-.015.025-.023.037-.028.043-.055.087-.079.132l-.013.027c-.025.049-.05.1-.071.151,0,.006,0,.013-.007.019-.022.054-.042.109-.059.165,0,.007,0,.014-.005.022-.016.055-.031.111-.042.168,0,.017,0,.035-.008.052-.008.047-.017.095-.021.143a1.983,1.983,0,0,0,0,.4c0,.049.013.1.021.145,0,.017,0,.034.008.05.012.058.026.114.043.17,0,.007,0,.014.005.02.017.057.038.112.06.167l.007.018c.021.052.046.1.072.151l.013.027c.025.046.052.09.08.133.008.012.014.024.022.036.028.041.058.081.089.12.01.013.018.026.029.038.042.051.086.1.132.146L6.621,120.5a2.011,2.011,0,0,0,2.844-2.844Z"
            transform="translate(0 -96.596)"
          />
          <path
            d="M116.846,42.3a16.436,16.436,0,0,0-13.66,7.283,2.011,2.011,0,0,0,3.338,2.243,12.426,12.426,0,1,1,.017,13.868,2.011,2.011,0,0,0-3.332,2.251A16.448,16.448,0,1,0,116.846,42.3Z"
            transform="translate(-89.059 -42.299)"
          />
        </svg>
      </button>
    </div>
    <nav class="menu_body">
      <list-page
        :type="type"
        :longlist="true"
        @click-handler="$emit('menu-close')"
      />
    </nav>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['PERSONAL_DATA'])
  },
  beforeDestroy () {
    document.body.classList.remove('overflow-hidden')
  },
  methods: {
    async logout () {
      await this.$store.dispatch('LOG_OUT', this.$cookies)
      this.$store.commit('CLEAR_PERSONAL_DATA')
      await this.$router.push(this.localePath('index'))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.menu {
  display: grid;
  grid-template-rows: 15vh 1fr;
  border-radius: 0px 7px 7px 0px;
  background-color: $bgc-light;

  &_header {
    display: grid;
    grid-template-columns: 60px repeat(2, auto);
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas: 'avatar id logout' 'avatar name logout';
    grid-gap: 10px;
    align-items: center;
    padding: 10px;
    background-color: #e2e2e2;
    font-family: $ff-gilroy;
    font-size: 16px;
  }

  &-avatar {
    grid-area: avatar;
    border: {
      width: 1px;
      style: solid;
      color: $green;
    }
    padding: 2px;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    overflow: hidden;
    object-fit: cover;
    &.intimer {
      width: 48px;
      height: 48px;
      border: none;
    }
  }

  &-id {
    grid-area: id;
  }

  &-name {
    grid-area: name;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &-logout {
    grid-area: logout;
    justify-self: end;
    align-self: center;
    border: {
      width: 1px;
      style: solid;
      color: $green;
    }
    border-radius: 50%;
    padding: 7px;
    width: 35px;
    height: 35px;

    svg {
      width: 100%;
      height: 100%;
      fill: $c-green;
    }
  }

  &_body {
    padding: 10px;
  }
}
</style>
