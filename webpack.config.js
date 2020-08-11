const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const babelOptions = () => {
return { 
    presets: [
      '@babel/preset-env'
    ]
  }
}

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]
  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: [
    './js/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './pages/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'pivnaya-kruzgka.html',
      template: './pages/pivnaya-kruzgka.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'stakan-dlya-viski.html',
      template: './pages/stakan-dlya-viski.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'bokal-dlya-vina.html',
      template: './pages/bokal-dlya-vina.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'chashka.html',
      template: './pages/chashka.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'politics.html',
      template: './pages/politics.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new StylelintPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: path.resolve(__dirname, 'src/images'),
          to: path.resolve(__dirname, 'dist/images')
        },
        {
          from: path.resolve(__dirname, 'src/site.webmanifest'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
          'css-loader'
       ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './'
          },
        }, 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ]
  }
}