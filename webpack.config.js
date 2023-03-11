var path = require('path');
var webpack = require('webpack');
var isProd = (process.env.NODE_ENV === 'production');
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

function getPlugins() {
    var plugins = [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyPlugin({
            patterns: [
              { from: "./public" },
            ],
          }),
    ];

    return plugins;
}

const config = {  
  entry: './src/havoc.ts',
  devtool: 'inline-source-map',
  optimization: {
    minimize: isProd
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'havoc.js',
    publicPath: "/build/"
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  plugins: getPlugins(),
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.wav/, loader: 'file-loader' }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.json',
        extensions: ['.ts', '.js']
      })
    ]
  }
};

if (isProd) {
    console.log('production build');
} else {
  console.log('development build');
}

module.exports = config;