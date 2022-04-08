<template>
  <ul class="new_list" @scroll="hideHeader">
    <li class="new_list-bottom" @click="scrollToBottom">
      <span>
        <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.01253 1.33506L9.52381 5.59249C9.62406 5.6915 9.82456 5.6915 9.92481 5.59249C10.0251 5.49348 10.0251 5.29546 9.92481 5.19645L5.21303 0.741005C5.11278 0.641995 4.91228 0.641995 4.81203 0.741005L0.10025 5.19645C-3.95999e-07 5.19645 -4.04655e-07 5.29546 -4.13311e-07 5.39447C-4.21967e-07 5.49348 -4.21966e-07 5.49348 0.10025 5.59249C0.200501 5.6915 0.401001 5.6915 0.501253 5.59249L5.01253 1.33506Z"
          />
        </svg>
      </span>
    </li>
    <li v-for="i in list" :key="i" class="new">
      <img :src="`/images/news/${i}.jpg`" alt="" class="new-img">
    </li>
    <li class="new_list-top" @click="scrollIntoView">
      <span>
        <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.98747 4.66494L0.47619 0.407509C0.37594 0.3085 0.175439 0.3085 0.075188 0.407509C-0.0250627 0.506519 -0.0250627 0.704541 0.075188 0.803551L4.78697 5.25899C4.88722 5.358 5.08772 5.358 5.18797 5.25899L9.89975 0.803551C10 0.803551 10 0.704536 10 0.605526C10 0.506516 10 0.506519 9.89975 0.407509C9.7995 0.3085 9.599 0.3085 9.49875 0.407509L4.98747 4.66494Z"
          />
        </svg>
      </span>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      scroll: true
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    hideHeader (e) {
      this.windowTop = e.target.scrollTop
      // const toBottom = document.querySelector('.new_list-bottom')
      const toTop = document.querySelector('.new_list-top')
      if (this.windowTop > 0) {
        // toBottom.classList.add('scroll')
        toTop.classList.add('scrollTop')
      } else {
        // toBottom.classList.remove('scroll')
        toTop.classList.remove('scrollTop')
      }
    },
    scrollIntoView () {
      const el = this.$el.getElementsByClassName('new')[this.list.length - 1]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    scrollToBottom () {
      const el = this.$el.getElementsByClassName('new')[0]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.new {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;

  padding-top: 56%;

  &:not(:first-child) {
    margin-top: 5px;
  }

  &_list {
    display: flex;
    flex-direction: column;
    border-radius: $br-block-desktop;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    &-top {
      position: absolute;
      bottom: 0;
      background: rgba(255, 255, 255, 0.58);
      border-radius: 4px;
      width: 100%;
      z-index: 1;
      max-height: 32px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &.scrollTop {
        bottom: 0 !important;
      }
      span {
        cursor: pointer;
        width: 20px;
        height: 20px;
        background: #ffffff;
        border: 0.5px solid $bgc-green;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      svg {
        width: 7px;
        height: 12px;
        fill: $bgc-green;
      }
    }
    &-bottom {
      position: absolute;
      top: 0;
      background: rgba(255, 255, 255, 0.58);
      border-radius: 4px 4px 0px 0px;
      width: 100%;
      z-index: 1;
      max-height: 32px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &.scroll {
        top: 0 !important;
      }
      span {
        cursor: pointer;
        width: 20px;
        height: 20px;
        background: #ffffff;
        border: 0.5px solid $bgc-green;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      svg {
        width: 7px;
        height: 12px;
        fill: $bgc-green;
      }
    }
  }

  &-img {
    border-radius: 4px 4px 0 0;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  &-desc {
    border-radius: 0 0 4px 4px;
    padding: 0.25em 1.5rem;
    background-color: #fff;
    font-family: Gilroy-Light, sans-serif;
    font-size: 11px;
    display: block;
    text-align: center;
  }
}
</style>
