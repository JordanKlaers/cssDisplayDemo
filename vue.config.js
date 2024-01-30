const { defineConfig } = require('@vue/cli-service')
const resolve = require("path").resolve;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'src': resolve('src'),
        '_scss_': resolve('./src/assets/scss'),
        '_icomoon_': resolve('./src/assets/icomoon'),
        '_images_': resolve('./src/assets/image/'),
        '_store_': resolve('./src/store'),
        '_mixins_': resolve('./src/components/mixins/')
      },
      extensions: ['.js', '.vue', '.json', '.scss']
    }
  }
})
