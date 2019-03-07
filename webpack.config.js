
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  entry: {
   "main": './src/index.js',
   "main.min": "./src/index.js"
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
   module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      { test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  optimization:{
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })]
  }
};