<template>
  <order-body :type="'history'" />
</template>

<script>
export default {
  layout: 'orderssection',
  middleware: 'auth-home'
}
</script>
