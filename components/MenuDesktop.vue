<template>
  <list-page class="menuDesktop" :type="type" />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/abstract/var';

.menuDesktop {
  .pages {
    width: 100%;
    border: none;

    &-item {
      &:hover:not(.active) {
        background: $hover !important;
        .pages-text {
          color: $dark !important;
        }
        .pages-arrow {
          svg {
            fill: $c-icon-hover;
          }
        }
      }
      border-top: {
        width: 1px;
        style: solid;
        color: $c-line;
      }

      &:last-child {
        border-bottom: {
          width: 1px;
          style: solid;
          color: $c-line;
        }
      }
    }

    &-href {
      padding: 13px;
      display: grid;
      grid-template-columns: 1fr auto;
    }

    &-icon {
      display: none;
    }
  }
}
</style>
