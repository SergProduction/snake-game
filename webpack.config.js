const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')


const modeProd = process.env.NODE_ENV === 'prod'



const common = {
  context: __dirname,
  entry: {
    snake: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    library: '[name]',
  },
  resolve: {
    extensions: ['.js'],
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015'],
          plugins: [
            'transform-object-rest-spread',
          ],
        },
      },
    ],
  },
}


const dev = {
  devtool: 'cheap-module-eval-source-map',
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/',
    watchContentBase: true,
    historyApiFallback: {
      from: /\/\w/,
      to: '/',
    },
    host: '0.0.0.0',
    port: 3000,
  },
}

const prod = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJSPlugin(),
  ],
}

const config = modeProd
  ? merge(common, prod)
  : merge(common, dev)


module.exports = config