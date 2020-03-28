module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

	  pwa: {
    name: 'ngolimi Glossary',
    themeColor: '#FFB700',
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
