module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  overrides: [
    // for server
    {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './server/tsconfig.eslint.json',
        sourceType: 'module',
      },
      env: {
        node: true,
        jest: true,
      },
      files: [
        './server/**/*.{j,t}s',
        './test/**/*.spec.{j,t}s?(x)',
        './test/**/*.{j,t}s?(x)',
      ],
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    // for client
    {
      parser: 'vue-eslint-parser',
      parserOptions: {
        project: './client/tsconfig.json',
        parser: require.resolve('@typescript-eslint/parser'),
        extraFileExtensions: ['.vue'],
      },
      env: {
        browser: true,
      },
      files: ['./client/**/*.vue', './client/**/*.[jt]s'],
      plugins: ['vue'],
      extends: [
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-recommended',
      ],
      rules: {
        
      },
    },
  ],
};
