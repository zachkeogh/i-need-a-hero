const path = require('path')

module.exports = {
  entry : path.resolve(__dirname + '/src/server/server.js'),
  output: {
    path : path.resolve(__dirname + '/dist/server'),
    filename : 'server.js',
    libraryTarget: "commonjs",
    module: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", "..."],
    fallback: {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      events: require.resolve('events'),
      punycode: require.resolve('punycode'),
      string_decoder: require.resolve('string_decoder'),
      sys: require.resolve('util'),
      url: require.resolve('url'),
      util: require.resolve('util'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader",
      },
      {
        test: /\.m?js$/,
        exclude: [/(node_modules|bower_components)/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // watch: true,
  target: 'node',
}