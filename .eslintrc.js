module.exports = {
  extends: [
    'standard',
    'standard-react',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: [
    'babel',
  ],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': 'webpack',
  },
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    'no-undef': ['error'],
    'react/no-unused-prop-types': ['off'],
  },
};
