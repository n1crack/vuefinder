import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';
import copy from 'rollup-plugin-copy';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('cropper-'),
        },
      },
    }),
    vueDevTools(),
    tailwindcss(),
    svgLoader(),
    copy({
      targets: [
        { src: 'src/locales/*', dest: 'dist/locales' },
        { src: 'src/features.js', dest: 'dist' },
      ],
      hook: 'writeBundle',
    }),
  ],
  resolve: {
    // alias: {
    //   '@': fileURLToPath(new URL('./src', import.meta.url))
    // },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es', 'cjs'],
      name: 'VueFinder',
      // the proper extensions will be added
      fileName: 'vuefinder',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into the library
      external: [
        '@tanstack/vue-query',
        '@uppy/core',
        '@uppy/xhr-upload',
        '@uppy/locales',
        '@viselect/vanilla',
        'mitt',
        'overlayscrollbars',
        'nanostores',
        '@nanostores/vue',
        '@nanostores/persistent',
        'vanilla-lazyload',
        'vue',
        'vue-advanced-cropper',
      ],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
