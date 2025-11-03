// @ts-check
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import vueTs from '@vue/eslint-config-typescript';
import configPrettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist', 'docs', 'public', 'build', 'coverage', 'node_modules'] },
  js.configs.recommended,
  // Vue 3 flat recommended
  ...vue.configs['flat/recommended'],
  // Vue + TS preset (flat)
  ...vueTs(),
  // Project rules and overrides
  {
    rules: {
      // Be pragmatic in this project: allow any and single-word component names
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off',
      // Allow intentionally unused variables when prefixed with underscore
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      // Some legacy regexes rely on escapes
      'no-useless-escape': 'off',
    },
  },
  // In Vue SFCs specifically, suppress unused-vars noise from imports like inject
  {
    files: ['src/**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  // Prettier compatibility (turn off formatting-related ESLint rules)
  configPrettier,
];
