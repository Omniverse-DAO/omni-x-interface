module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended'
  ],
  rules: {
    indent: 'off',
    "no-mixed-spaces-and-tabs": 0, // disable rule
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
}
