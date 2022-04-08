<template>
  <ul class="actions">
    <li class="action" :class="{ active: currentAction === 'search' }" @click="selectAction('search')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.536 15.539">
        <path data-name="Path 1615" d="M14.46,13.8l-3.533-3.533a6.2,6.2,0,1,0-.613.613l3.533,3.533a.438.438,0,0,0,.306.129.425.425,0,0,0,.306-.129A.436.436,0,0,0,14.46,13.8ZM.917,6.2a5.329,5.329,0,1,1,5.329,5.332A5.335,5.335,0,0,1,.917,6.2Z" transform="translate(0.45 0.5)" stroke-width="1" />
      </svg>
    </li>
    <li class="action" :class="{ active: currentAction === 'filter' }" @click="selectAction('filter')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.322 12.504">
        <path id="Path_1458" d="M12.27.637a.523.523,0,0,0-.516-.346H.568A.523.523,0,0,0,.053.637a.518.518,0,0,0,.122.622L4.483,5.637V9.953a.551.551,0,0,0,.166.4l2.237,2.273a.516.516,0,0,0,.393.169A.6.6,0,0,0,7.5,12.75a.531.531,0,0,0,.341-.524V5.637l4.308-4.378A.518.518,0,0,0,12.27.637Z" transform="translate(0 -0.291)" />
      </svg>
    </li>
    <li class="action" :class="{ active: currentAction === 'route' }" @click="selectAction('route')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.606 14.26"><g transform="translate(-4.916 0.25)"><path d="M15.458,31.958H7.979a1.863,1.863,0,0,1,0-3.726h4.675a.475.475,0,1,0,0-.95H7.979a2.813,2.813,0,0,0,0,5.627h7.479a1.863,1.863,0,0,1,0,3.726H10.743a.475.475,0,0,0,0,.95h4.715a2.813,2.813,0,0,0,0-5.627Z" transform="translate(0 -25.553)" /><path d="M18.948,130a2,2,0,0,0-2,2,5.744,5.744,0,0,0,1.664,3.385.475.475,0,0,0,.672,0A5.745,5.745,0,0,0,20.948,132,2,2,0,0,0,18.948,130Zm0,4.33A4.18,4.18,0,0,1,17.9,132a1.05,1.05,0,1,1,2.1,0A4.18,4.18,0,0,1,18.948,134.331Z" transform="translate(-11.036 -121.765)" /><path d="M138.485,5.524a.474.474,0,0,0,.336-.139A5.744,5.744,0,0,0,140.485,2a2,2,0,0,0-4,0,5.744,5.744,0,0,0,1.664,3.385A.473.473,0,0,0,138.485,5.524Zm0-4.574A1.051,1.051,0,0,1,139.535,2a4.179,4.179,0,0,1-1.05,2.331A4.18,4.18,0,0,1,137.435,2,1.051,1.051,0,0,1,138.485.95Z" transform="translate(-123 0)" /></g></svg>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    currentAction: {
      type: String
    }
  },
  methods: {
    selectAction (action) {
      this.$emit('select-action', action)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/abstract/var';

  .actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 8px;
    width: 100%;
    height: 100%;

    @media screen and (min-width: 992px) {
      grid-column-gap: 5px;
    }
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: center;
    border: {
      width: 1px;
      style: solid;
      color: #E2E2E2;
      radius: $br-block-mobile;
    }
    width: 100%;
    height: 100%;
    background-color: $light;
    color: $c-primary;
    cursor: pointer;

    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;

    @media screen and (min-width: 992px) {
      border-radius: $br-block-desktop;
    }
    @media screen and (max-width: 991px) {
      box-shadow: 0 2px 5px rgba(0,0,0,.16078);
    }

    svg {
      flex: 0 0 15px;
      width: 15px;
      height: 15px;
      fill: #5c5c5c;
    }

    &.active {
      background-color: $orange;
      border-color: $orange;
      color: $c-light;

      svg {
        fill: $c-light;
      }
    }
  }
</style>
