// @ts-check
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import vueTs from '@vue/eslint-config-typescript';
import configPrettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist', 'build', 'coverage', 'node_modules'] },
  js.configs.recommended,
  // Vue 3 flat recommended
  ...vue.configs['flat/recommended'],
  // Vue + TS preset (flat)
  ...vueTs(),
  // Prettier compatibility (turn off formatting-related ESLint rules)
  configPrettier,
];
