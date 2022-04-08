export default {
  loading: '~/components/loading/Logo.vue',
  server: {
    port: 3000,
    host: 'localhost'
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  // target: 'static',

  /* Headers of the page
   * See https://nuxtjs.org/api/configuration-head
   */
  router: {
    middleware: ['language-redirection']
  },
  head: {
    title: 'Meal Hub',
    // title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      { name: 'msapplication-TileColor', content: '#da532c' },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: '#d6d6d6'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'manifest', href: '/site.webmanifest' },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        sizes: '32x32',
        href: '/favicon.ico'
      },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#24a391' }
    ]
  },

  /*
   ** Global CSS
   */
  css: [
    'vue-slick-carousel/dist/vue-slick-carousel.css',
    'vue-slick-carousel/dist/vue-slick-carousel-theme.css',
    'vue-smooth-picker/dist/css/style.css',
    'vue-select/dist/vue-select.css',
    'vue-phone-number-input/dist/vue-phone-number-input.css',
    '@splidejs/splide/dist/css/themes/splide-default.min.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/api-address' },
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/lodash' },
    { src: '~/plugins/carousel' },
    { src: '~/plugins/smooth-picker' },
    { src: '~/plugins/select' },
    { src: '~/plugins/input-auth-phone' },
    { src: '~/plugins/input-place-autocomplete' },
    { src: '~/plugins/splide-carousel', mode: 'client' },
    { src: '~/plugins/v-tooltip' },
    { src: '~/plugins/notifications' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/database', mode: 'client' },
    { src: '~/plugins/resizable', mode: 'client' },
    { src: '~/plugins/v-body-scroll-lock', mode: 'client' }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [
    '~/components',
    { path: '~/components/basic/link', prefix: 'basic-link' },
    { path: '~/components/basic/input', prefix: 'basic-input' },
    { path: '~/components/list', prefix: 'list' },
    { path: '~/components/menu', prefix: 'menu' },
    { path: '~/components/addition', prefix: 'addition' },
    { path: '~/components/carousel', prefix: 'carousel' },
    { path: '~/components/form', prefix: 'form' },
    { path: '~/components/form/inner', prefix: 'form-inner' },
    { path: '~/components/map', prefix: 'map' },
    { path: '~/components/block', prefix: 'block' },
    { path: '~/components/popup', prefix: 'popup' },
    { path: '~/components/popup/error', prefix: 'popup-error' },
    { path: '~/components/pages/main', prefix: 'main' },
    { path: '~/components/place-autocomplete', prefix: 'Geo' },
    { path: '~/components/loading', prefix: 'loading' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    'nuxt-i18n',
    [
      'nuxt-gmaps',
      {
        key: 'AIzaSyBesbWEzXNLD82LezmO0CMxpYBNq2a3cgI',
        libraries: ['places', 'geometry']
        // you can use libraries: ['places']
      }
    ],
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      // '~/assets/styles/classes/btn/burgandy.scss',
      // '~/assets/styles/abstract/var.scss',
      // '~/assets/styles/abstract/mixins.scss'
    ]
  },
  /*
   ** i18n module configuration
   ** See https://i18n.nuxtjs.org
   */
  i18n: {
    locales: [
      { code: 'ru', iso: 'ru-RU' },
      { code: 'en', iso: 'en-US' }
    ],
    defaultLocale: 'ru',
    vueI18nLoader: true,
    vueI18n: {
      fallbackLocale: 'ru'
    },
    detectBrowserLanguage: {
      useCookie: false,
      fallbackLocale: 'ru'
    }
  },
  /*
   ** PWA module configuration
   ** See https://pwa.nuxtjs.org/
   */
  /* pwa: {
      icon: {
        source: '/favicon-app.png'
      },
      manifest: {
        name: 'EatMe',
        lang: 'en',
        useWebmanifestExtension: false
      }
    }, */
  manifest: {
    name: 'EatMe',
    lang: 'en',
    display: 'fullscreen',
    title: 'EatMe',
    description: 'Description for this project',
    theme_color: '#FFFFFF',
    background_color: '#FFFFFF',
    start_url: '/',
    short_name: 'EatMe',
    icons: [
      {
        src: '/favicon-app.png',
        sizes: '2000x2000',
        type: 'image/png'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '152x152',
        type: 'image/png'
      }
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    loaders: {
      vue: {
        prettify: false
      }
    },
    extend (config, ctx) {
      // Run ESLint on save
      config.performance.hints = false

      if (ctx.isDev && ctx.isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/,
        //   options: {
        //     fix: true
        //   }
        // })
      }
    },
    postcss: {
      ssr: true,
      plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'postcss-preset-env': this.preset,
        cssnano: { preset: 'default' } // disabled in dev mode
      },
      order: 'presetEnvAndCssnanoLast',
      preset: {
        autoprefixer: {
          overrideBrowserslist: ['>0.1%', 'last 4 versions'],
          grid: true,
          flexbox: true
        }
      }
    }
  }
}
