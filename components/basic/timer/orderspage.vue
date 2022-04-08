<template lang="">
  <div class="eatme-timer">
    <svg class="countdown_svg" viewBox="0 0 64 64">
      <path fill="none" :stroke="(inprogress ? '#21bc96':'#EB608F')" stroke-width="2" d="M 31.45897540044421 1.0047214501518695 A 31 31 0 1 0 32 1" />
      <path
        fill="none"
        stroke="#ddd"
        stroke-width="2"
        :d="describeArc(32, 32, 31, 0, clockPhase )"
      />
    </svg>
    <span :class="inprogress?'eatme-timer-count cooking':'eatme-timer-count waiting'">{{ conter }} мин 0 сек</span>
  </div>
</template>
<script>
export default {
  props: {
    max: {
      type: Number,
      default: 100
    },
    conter: {
      type: Number,
      default: 100
    },
    inprogress: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    clockPhase: {
      get () {
        return (360 / this.max) * this.conter
      }
    }
  },
  methods: {

    polarToCartesian (centerX, centerY, radius, angleInDegrees) {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      }
    },
    describeArc (x, y, radius, startAngle, endAngle) {
      const start = this.polarToCartesian(x, y, radius, endAngle)
      const end = this.polarToCartesian(x, y, radius, startAngle)

      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

      const d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(' ')

      return d
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/abstract/var';
  .countdown_svg {
    transform: rotateY(180deg);
    background-color: transparent;
    width:8rem;
    height:8rem;
  }
  .waiting{
    color: $c-error;
  }
  .cooking{
    color: $c-green;
  }
  .eatme {

    &-timer {
      align-self: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: $ff-gilroy;
      font-size: 10px;
      line-height: 10px;

      @media screen and (min-width: 992px) {
        display: inline-flex;
        margin-top: 0;
      }

      &-count {
        position: absolute;
        font-size: 12px;
      }
    }
  }
</style>
