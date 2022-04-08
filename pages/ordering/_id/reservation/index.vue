<template>
  <div v-if="loaded" class="stepWrapper">
    <table-reservation
      v-if="catering"
      class="wide toll"
      :occasions="occasions"
      :halls="halls"
      :total-places-amount="totalPlacesAmount"
      :current-catering="catering"
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
      catering: null,
      occasions: [],
      halls: [],
      totalPlacesAmount: 0,
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['CURRENT_CATERING', 'TABLES_PLAN'])
  },
  async mounted () {
    if (this.$nuxt.$loading.start) {
      await this.showLoadingAndUpdate()
    } else {
      this.$nextTick(() => this.showLoadingAndUpdate())
    }
  },
  methods: {
    handleError () {
      this.$router.push(this.localePath({ path: '/' }))
    },
    async updateData () {
      const cookiz = this.$cookies

      try {
        await this.$store.dispatch('GET_PERSONAL_DATA', cookiz)

        const id = this.$route.params.id
        const order = await this.$database.orders.getById(id)
        const cateringId = order.catering_id
        const orderState = this.orderTimingState(order)

        if (orderState !== 'waiting_reserve') {
          throw new Error('Order isn\'t waiting reserve')
        }

        this.catering = await this.$database.catering.getById(cateringId)
        this.occasions = await this.$database.reservation.getOccasionsList(cateringId)

        const response = await this.$database.reservation.getHallsWithTables(cateringId)
        this.halls = response.items
        this.totalPlacesAmount = response.seat_places_count
      } catch {
        this.handleError()
      }
    },
    async showLoadingAndUpdate () {
      this.$nuxt.$loading.start()
      await this.updateData()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
      this.loaded = true
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
