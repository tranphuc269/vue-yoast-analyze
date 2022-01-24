module.exports = {
  publicPath: process.env.NODE_ENV === 'development'
    ? '/vue-yoast/'
    : '/',
  pwa: {
    name: 'Phuc', // <---- this is PWA name
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  }
}
