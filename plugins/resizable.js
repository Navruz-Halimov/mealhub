function resizeCompute () {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

function handleResize (store) {
  const isMobile = store.getters.IS_MOBILE

  if (window.outerWidth >= 992) {
    console.warn('resize')
    resizeCompute()
  }

  if (window.innerWidth >= 992) {
    if (isMobile) {
      store.commit('SET_MOBILE', false)
    }
  } else if (!isMobile) {
    store.commit('SET_MOBILE', true)
  }
}

export default ({ store }, inject) => {
  resizeCompute()
  handleResize(store)

  window && window.addEventListener('resize', () => handleResize(store))
  inject('resizeCompute', resizeCompute)
}
