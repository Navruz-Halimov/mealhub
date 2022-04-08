import axios from 'axios'
import apiAddress from './api-address'

export default ({ app }, inject) => {
  const instance = axios.create({
    baseURL: apiAddress({ app }),
    headers: {
      Authorization: app.$cookies.get('user_token')
    }
  })

  inject('http', instance)
}
