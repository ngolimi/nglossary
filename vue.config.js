module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

	  pwa: {
    name: 'ngolimi Glossary',
    themeColor: 'red',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: /glossary.json$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'nglossary'
          }
        }
      ]
    }
  },

  assetsDir: 'src/assets',
  publicPath: ''

}
