<template>
  <div class="eatme-collapse text-xl">
    <p class="eatme-collapse-title flex a_c cursor-pointer" @click="$emit('click-handler')">
      <span class="wide">{{ title || 'collapse' }}</span>
      <span class="eatme-collapse-arrow-wrap flex a_c" :class="{'bl1': !active }">
        <img
          class="eatme-collapse-arrow ml-1"
          src="~/assets/icons/L_arrow.svg"
          alt=""
          :class="{ 'active': active }"
        >
      </span>
    </p>
    <div class="eatme-collapse-content" :class="{ 'hidden': !active }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    active: {
      type: Boolean
    },
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~/assets/styles/abstract/var';
    @import '~/assets/styles/modificator';

    .bl1{
      border-left:1px solid #E2E2E2;
    }

    .eatme-collapse{
        padding: 0 1rem;
        border: 1px solid #E2E2E2;
        border-radius: 7px;
        box-shadow: 0px 2px 5px #11100029;
        background-color: $light;
    }

    .eatme-collapse-title span{
      padding:.35rem 0;
    }

    .eatme-collapse-arrow-wrap{
      height: 2em;
    }
    .eatme-collapse-arrow {
      flex: 0 0 14px;
      width: 14px;
      height: 14px;
      object-fit: cover;
      &.active{
        transform: rotate(90deg);
      }
    }

</style>
