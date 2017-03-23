module.exports = {
  extends: [
    'standard',
    'standard-react',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:flowtype/recommended'
  ],
  plugins: [
    'babel',
    'flowtype',
  ],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': 'webpack',
    'flowtype': {
      'onlyFilesWithFlowAnnotation': true,
    },
  },
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    'no-undef': ['error'],
    'no-duplicate-imports': ['off'], // does not support flow type imports
    'import/no-duplicates': ['error'], // support flow types imports
    'flowtype/require-valid-file-annotation': ['error', 'always', {annotationStyle: 'line'}],
    'react/no-unused-prop-types': ['off'],
  },
};
