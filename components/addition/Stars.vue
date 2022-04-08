<template>
  <ul class="stars">
    <li v-for="i in 5" :key="i" class="star">
      <img v-if="i <= Math.trunc(rate)" src="~/assets/icons/star.svg" alt="" @click="$emit('input', i)">
      <img v-else-if="takeNumberAfterDot(rate) && i === Math.trunc(rate) + 1" src="/images/icons/stars/star_05.png" alt="" @click="$emit('input', i)">
      <img v-else src="~/assets/icons/star.svg" class="greyed" alt="" @click="$emit('input', i)">
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
  .greyed{
    filter: contrast(0);
    opacity: .72;
  }

  .star {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 15px;
    width: 15px;
    height: 15px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
