const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),

      new WebpackPwaManifest({
        name: 'PWA Name',
        short_name: 'Short Name',
        description: 'Description',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        icons:[
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 382, 512],
            destination: path.join('logos'),
          },
        ],
      }),

      new InjectManifest({
        swSrc: './src/src-sw.js',
        swDest: 'service-worker.js',
      }),
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use:{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
