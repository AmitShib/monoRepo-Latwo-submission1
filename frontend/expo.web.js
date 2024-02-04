const path = require('path');

module.exports = function (webpackEnv) {
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-expo'],
            },
          },
        },
      ],
    },
  };
};
