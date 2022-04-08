<template>
  <div class="stepWrapper">
    <order-pay
      class="wide toll"
      :current-catering="CURRENT_CATERING"
      @click-back="clickBack"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'primary',
  middleware: 'auth-home',
  data () {
    return {
      step: 2
    }
  },
  computed: {
    ...mapGetters(['CURRENT_CATERING', 'TABLES_PLAN'])
  },
  async created () {
    const cookiz = this.$cookies
    const id = this.$route.params.id
    // this.getTablesPlan()
    await this.$store.dispatch('GET_PERSONAL_DATA', cookiz)
    await this.$store.dispatch('GET_CURRENT_CATERING', { cookiz, id })
  },
  methods: {
    clickBack () {
      this.step = 0
    },
    goCatering () {
      const cateringId = this.$route.params.id
      this.$router.push(this.localePath({ path: `/catering/${cateringId}/` }))
    },
    getTablesPlan () {
      const cookiz = this.$cookies
      const id = this.$route.params.id
      return this.$store.dispatch('GET_TABLES_PLAN', { cookiz, id }).then(
        (data) => {
          console.warn('getTablesPlan', data)
        }
      ).catch((err) => {
        console.error('getTablesPlan', err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .stepWrapper{
    width: 69%;
    height:100%;
    border-radius: 5px;
    overflow:hidden;
  }

  @media screen and (max-width: 991px) {

    .stepWrapper{
      width: 100%;
      border-radius:0;
    }
  }

</style>
