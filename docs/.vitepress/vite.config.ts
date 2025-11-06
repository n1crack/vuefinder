import { defineConfig } from 'vite';
import { resolve } from 'path';
// svg plugin
import svgLoader from 'vite-svg-loader';

export default defineConfig({
    plugins: [svgLoader({ defaultImport: 'component' })],
  resolve: {
    alias: [
      {
        // Main import: import VueFinder from 'vuefinder'
        find: /^vuefinder$/,
        replacement: resolve(__dirname, '../../dist/vuefinder.js'),
      },
      {
        // Map vuefinder/dist/style.css to dist/vuefinder.css (package.json export mapping)
        find: /^vuefinder\/dist\/style\.css$/,
        replacement: resolve(__dirname, '../../dist/vuefinder.css'),
      },
      {
        // Other sub-path imports: import 'vuefinder/dist/vuefinder.css', 'vuefinder/dist/locales/*'
        find: /^vuefinder\/dist\/(.*)$/,
        replacement: resolve(__dirname, '../../dist/$1'),
      },
    ],
  },
});
