<template>
  <order-body :type="'orders'" />
</template>

<script>
export default {
  layout: 'orderssection',
  middleware: 'auth-home'
}
</script>
