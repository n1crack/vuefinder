import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['cjs', 'es'],
      name: 'VueFinder',
      // the proper extensions will be added
      fileName: 'vuefinder',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'vue',
        'microtip/microtip.css',
        'mitt',
        'vanilla-lazyload',
        'dragselect',
        'cropperjs/dist/cropper.css',
        'cropperjs',
        '@uppy/core',
        '@uppy/xhr-upload',
      ],
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




