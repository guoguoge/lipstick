module.exports = {
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": true
      }
    ], '@babel/plugin-transform-modules-commonjs'
  ],
  presets: [
    '@vue/app',
    '@babel/preset-env',
  ],
};
