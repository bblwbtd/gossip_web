module.exports = {
  'devServer': {
    'proxy': {
      '/event/connect':{
        'target': 'ws://localhost:2333',
        'ws': true,
        'changeOrigin': true
      },
      '/': {
        'target': 'http://localhost:2333',
        'changeOrigin': true
      },

    }
  },

  'transpileDependencies': [
    'vuetify'
  ],

  runtimeCompiler: true
}
