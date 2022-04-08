import axios from 'axios'
import apiAddress from '~/plugins/api-address'

const state = () => ({
  verificationCode: {
    one: '',
    two: '',
    three: '',
    four: ''
  },
  verificationMethod: '',
  verificationTime: 60,
  verificationTimer: null,
  verificationError: {
    state: false,
    method: ''
  }
})

const getters = {
  VERIFICATION_CODE: state => state.verificationCode,
  VERIFICATION_METHOD: state => state.verificationMethod,
  VERIFICATION_TIME: state => state.verificationTime,
  VERIFICATION_TIMER: state => state.verificationTimer,
  VERIFICATION_ERROR: state => state.verificationError
}

const mutations = {
  SET_VERIFICATION_CODE: (state, newCode) => {
    state.verificationCode = {
      ...state.verificationCode,
      ...newCode
    }
  },
  RESET_VERIFICATION_CODE: (state) => {
    state.verificationCode = {
      one: '',
      two: '',
      three: '',
      four: ''
    }
  },
  SET_VERIFICATION_METHOD: (state, newMethod) => {
    state.verificationMethod = newMethod
  },
  RESET_VERIFICATION_METHOD: (state) => {
    state.verificationMethod = ''
  },
  SET_VERIFICATION_TIME: (state, value) => {
    if (value <= 0) {
      state.verificationTime = 0
    } else {
      state.verificationTime = value
    }
  },
  REFRESH_VERIFICATION_TIME: (state) => {
    state.verificationTime = 60
  },
  SET_VERIFICATION_TIMER: (state, setVerificationTime) => {
    clearInterval(state.verificationTimer)
    state.verificationTimer = setInterval(() => {
      setVerificationTime()
    }, 1000)
  },
  STOP_VERIFICATION_TIMER: (state) => {
    clearInterval(state.verificationTimer)
  },
  SET_VERIFICATION_ERROR: (state, newErrorObject) => {
    state.verificationError = {
      ...state.verificationError,
      ...newErrorObject
    }
  },
  RESET_VERIFICATION_ERROR: (state) => {
    state.verificationError = {
      state: false,
      method: ''
    }
  }
}

const actions = {
  async SEND_VERIFICATION_CODE ({ getters, commit }, method) {
    let formData
    let res
    const errText = (err) => {
      const err1 = err.data && err.data.errors &&
            (
              err.data.errors.phone ||
              err.data.errors.email ||
              ['Default error']
            )[0]

      return err1 || err.message || (err.data && err.data.message)
    }
    switch (method) {
      case 'login': {
        formData = {
          phone: getters.LOGIN_FORM.phone
        }

        try {
          res = await axios.post(`${apiAddress(this)}/auth/login`, formData)
          const data = res.data

          if (data.send_verify_code) {
            commit('SET_VERIFICATION_METHOD', 'login')
          }
        } catch (err) {
          const ed = err.response || err
          console.warn('err login', ed)

          if (ed.status === 422) {
            if (ed.data && ed.data.errors && ed.data.errors.phone) {
              commit('SET_VERIFICATION_ERROR', {
                state: true,
                method: 'phone',
                text: errText(ed)
              })
            }
          } else {
            commit('SET_VERIFICATION_ERROR', {
              state: true,
              method: 'phone',
              text: errText(ed)
            })
          }
          return new Promise((resolve, reject) => reject(ed))
        }

        break
      }
      case 'registration': {
        formData = {
          phone: getters.REGISTRATION_FORM.phone,
          email: getters.REGISTRATION_FORM.email,
          language: getters.REGISTRATION_FORM.language,
          currency_code: getters.REGISTRATION_FORM.currency_code,
          agree_personal_data: getters.REGISTRATION_FORM.isAgree
        }

        try {
          res = await axios.post(`${apiAddress(this)}/auth/register`, formData)
          const data = res.data

          if (data.send_verify_code) {
            commit('SET_VERIFICATION_METHOD', 'registration')
          }
        } catch (err) {
          const ed = err.response || err
          console.warn('err registration', ed)

          if (ed.status === 422) {
            if (ed.data && ed.data.errors && ed.data.errors.email) {
              commit('SET_VERIFICATION_ERROR', {
                state: true,
                method: 'email',
                text: errText(ed)
              })
            }
            if (ed.data && ed.data.errors && ed.data.errors.phone) {
              commit('SET_VERIFICATION_ERROR', {
                state: true,
                method: 'phone',
                text: errText(ed)
              })
            }
          } else {
            commit('SET_VERIFICATION_ERROR', {
              state: true,
              method: 'phone',
              text: errText(ed)
            })
          }
          return new Promise((resolve, reject) => reject(ed))
        }

        break
      }
      case 'recovery': {
        formData = {
          email: getters.RECOVERY_FORM.email
        }

        try {
          res = await axios.post(`${apiAddress(this)}/auth/restore`, formData)
          const data = res.data

          if (data.send_verify_code) {
            commit('SET_VERIFICATION_METHOD', 'recovery')
          }
        } catch (err) {
          const ed = err.response || err
          console.warn('err recovery', ed)

          commit('SET_VERIFICATION_ERROR', {
            state: true,
            method: 'email',
            text: errText(ed)
          })
          return new Promise((resolve, reject) => reject(ed))
        }
      }
    }

    return res
  },
  async RESEND_VERIFICATION_CODE ({ getters, commit }) {
    let formData
    let res

    switch (getters.VERIFICATION_METHOD) {
      case 'login': {
        formData = {
          phone: getters.LOGIN_FORM.phone
        }

        try {
          res = await axios.post(`${apiAddress(this)}/auth/refresh-verify-code`, formData)
          const data = res.data

          if (data.send_verify_code) {
            commit('STOP_VERIFICATION_TIMER')
            commit('REFRESH_VERIFICATION_TIME')
            commit('SET_VERIFICATION_TIMER', () => {
              commit('SET_VERIFICATION_TIME', getters.VERIFICATION_TIME - 1)
            })
          }
        } catch (err) {
          return new Promise((resolve, reject) => reject(err.response))
        }

        break
      }
      case 'registration': {
        formData = {
          phone: getters.REGISTRATION_FORM.phone
        }

        try {
          res = await axios.post(`${apiAddress(this)}/auth/refresh-verify-code`, formData)
          const data = res.data

          if (data.send_verify_code) {
            commit('STOP_VERIFICATION_TIMER')
            commit('REFRESH_VERIFICATION_TIME')
            commit('SET_VERIFICATION_TIMER', () => {
              commit('SET_VERIFICATION_TIME', getters.VERIFICATION_TIME - 1)
            })
          }
        } catch (err) {
          return new Promise((resolve, reject) => reject(err.response))
        }

        break
      }
      case 'recovery': {
        formData = {
          email: getters.RECOVERY_FORM.email
        }

        try {
          res = await axios.post(`${apiAddress(this)}/auth/refresh-email-code`, formData)
          const data = res.data

          if (data.send_verify_code) {
            commit('STOP_VERIFICATION_TIMER')
            commit('REFRESH_VERIFICATION_TIME')
            commit('SET_VERIFICATION_TIMER', () => {
              commit('SET_VERIFICATION_TIME', getters.VERIFICATION_TIME - 1)
            })
          }
        } catch (err) {
          return new Promise((resolve, reject) => reject(err.response))
        }

        break
      }
    }

    return res
  }
}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
