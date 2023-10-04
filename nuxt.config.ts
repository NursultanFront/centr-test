import SvgLoader from 'vite-svg-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    plugins: [
      SvgLoader({
        defaultImport: 'component',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/index.scss" as *;',
        },
      },
    },
    vue: {
      script: {
        defineModel: true,
      },
    },
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@nuxtjs/device',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'DM Sans': [100, 300, 400, 500, 600, 700, 800, 900],
        },
      },
    ],
  ],
  pinia: {
    autoImports: ['defineStore', 'definePiniaStore', 'storeToRefs'],
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },
  eslint: {
    lintOnStart: false,
  },
  imports: {
    dirs: ['types', 'structures'],
  },
});
