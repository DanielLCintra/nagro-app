module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended'
  ],
  rules: {
    'vue/no-v-html': [
      0
    ],
    semi: [
      2,
      'never'
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    'no-nested-ternary': [
      'warn'
    ],
    'no-unused-expressions': [
      0
    ],
    'no-param-reassign': [
      'warn'
    ],
    'no-underscore-dangle': [
      'warn'
    ],
    'arrow-body-style': [
      'warn'
    ],
    'max-len': [
      1,
      120,
      4
    ],
    'vue/html-closing-bracket-newline': [
      0
    ],
    'vue/multiline-html-element-content-newline': [
      0
    ],
    'vue/html-closing-bracket-spacing': [
      0
    ],
    'class-methods-use-this': 'warn',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never'
      }
    ]
  }
}
