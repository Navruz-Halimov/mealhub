import axios from 'axios'

const actions = {
  async Subscribe (_, email) {
    return await axios.get(
      `https://api.mealhub.group/api/${this.$i18n.locale}/auth/release-announcement?email=${email}`
    )
  }
}

const moduleStore = {
  actions
}

export default moduleStore
