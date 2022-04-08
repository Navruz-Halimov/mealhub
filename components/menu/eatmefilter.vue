<template>
  <div class="line_height_1 text-gray cursor-pointer ml-1">
    <p :class="{ orange: flagasc === field }" @click.stop="asc(field)">
      ▲
    </p>
    <p :class="{ orange: flagdesc === field }" @click.stop="desc(field)">
      ▼
    </p>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: String,
      default: ''
    },
    asc: {
      type: Function
    },
    desc: {
      type: Function
    },
    flagasc: {
      type: String
    },
    flagdesc: {
      type: String
    }
  }
}
</script>

<style lang="scss"></style>
