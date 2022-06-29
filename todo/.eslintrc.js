module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 'off',
    'array-bracket-spacing': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-no-bind': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-plusplus': 'off',
  },
};
