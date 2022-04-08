function trimToSymbol (str, symbol) {
  const trimIndex = str.indexOf(symbol)
  return trimIndex !== -1 ? str.substr(0, trimIndex) : str
}

function trimForLastSymbol (str, symbol) {
  const trimIndex = str.lastIndexOf(symbol)
  return trimIndex === str.length - 1 ? str.substr(0, trimIndex) : str
}

export default async function ({ app, store, route, redirect, $cookies }) {
  if (store.getters.PERSONAL_DATA.id === '') {
    const isAuthorized = await store.dispatch('GET_PERSONAL_DATA', $cookies)
    if (isAuthorized === false) {
      return
    }
  }

  const profileLanguage = store.getters.PERSONAL_DATA.prefer_lang
  const redirectPath = app.switchLocalePath(profileLanguage)
  let trimmedPath = trimToSymbol(redirectPath, '?')
  trimmedPath = trimForLastSymbol(trimmedPath, '/')

  let routePath = route.path
  routePath = trimForLastSymbol(routePath, '/')
  if (trimmedPath !== routePath) {
    redirect(redirectPath)
  }
}
