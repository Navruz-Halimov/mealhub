<template>
  <ul class="stars">
    <li
      v-for="i in 5"
      :key="i"
      :class="{ filled: hover >= i || (!hover && stars >= i) }"
      class="star"
      @mouseover="hover = i"
      @mouseleave="hover = 0"
      @click="stars = i"
    >
      <img src="~/assets/icons/star.svg" @click="$emit('input', i)">
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    rate: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      hover: 0
    }
  },
  computed: {
    stars: {
      get () {
        return this.rate
      },
      set (value) {
        this.$emit('update:rate', value)
        return this.stars
      }
    }
  },
  mounted () {
    this.takeNumberAfterDot(this.rate)
  },
  methods: {
    takeNumberAfterDot (n) {
      const numberToString = this.$_.toString(n)
      const numberAfterDot = numberToString.split('.')[1]

      if (!this.$_.isNil(numberAfterDot)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';

.stars {
  display: flex;
  align-items: center;
}

.star {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 35px;
  width: 35px;
  height: 35px;
  filter: grayscale(1);
  color: #F3BD44;
  transition: filter 0.15s ease;

  &.filled {
    filter: grayscale(0);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media screen and (max-width: 991px) {
  .star {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
  }
}
</style>
