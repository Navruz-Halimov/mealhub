const apiAddress = 'https://api.mealhub.group/api'

export default (data) => {
  let locale
  const app = data.app
  if (app) {
    if (app.i18n) {
      locale = app.i18n.locale
      if (!locale) {
        console.error('api-address: "app.i18n.locale" is empty', app.i18n)
      } else {
        locale = '/' + locale
      }
    } else {
      console.error('api-address: No "app.i18n" given in', app)
    }
  } else {
    console.error('api-address: No "app" given in', data)
  }
  return apiAddress + locale
}
