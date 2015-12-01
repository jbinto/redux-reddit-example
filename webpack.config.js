// Boilerplate stolen from
// https://github.com/jbinto/redux-voting-client/blob/b53a33b0cab9454c016fbaf53d9823fc7c623d78/webpack.config.js

// https://webpack.github.io/docs/configuration.html
var webpack = require('webpack');

module.exports = {
  entry: [
    // react-hot-loader: http://gaearon.github.io/react-hot-loader/getstarted/
    'webpack-dev-server/client?http://localhost:8080',  // "client-side library of the Webpack dev server"
    'webpack/hot/only-dev-server', // "Webpack hot module loader"

    './src/index.jsx',
  ],

  module: {
    loaders: [
      {
        // babel: https://babeljs.io/docs/setup/#webpack
        //        https://github.com/babel/babel-loader
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel' // react-hot-loader
      },
      {
        // css-loader: https://github.com/webpack/css-loader
        // style-loader: https://github.com/webpack/style-loader
        // autoprefixer-loader: https://github.com/passy/autoprefixer-loader#usage
        test: /.css$/,
        loader: 'style!css!autoprefixer?browsers=last 2 versions'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  // https://webpack.github.io/docs/configuration.html#resolve-extensions
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
