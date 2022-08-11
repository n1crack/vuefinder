import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'


export default defineConfig({
  plugins: [vue(),cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VueFinder',
      // the proper extensions will be added
      fileName: 'vuefinder',
    },
    watch: {},
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})




