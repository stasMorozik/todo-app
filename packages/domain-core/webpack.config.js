const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const minimizer = () => {
 return [
    new CompressionPlugin(),
  ]
}

module.exports = {
  entry: './src/index.ts',
  devtool: isProd? undefined : 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.ts', '.js'],
  },
  mode: isProd? 'production' : 'dev',
  output: {
    library: 'domainCore',
    libraryTarget: 'umd',
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    globalObject: 'this',
  },
  optimization: {
    minimizer: isProd ? minimizer() : [],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: isProd ? 'tsconfig.production.json' : 'tsconfig.json'
            },
          },
        ],
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment-mini-ts$/ }),
    new CleanWebpackPlugin(),
  ]
};