const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**@return {webpack.Configuration}*/
const config = (env) => {
  console.log('ENV: ', env);

  return {
    entry: ['react-hot-loader/patch', './src/index.tsx'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
    },
    devtool: env.production ? false : 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
          exclude: /\.module\.css$/,
        },
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
          ],
          include: /\.module\.css$/,
        },
        {
          test: /\.svg$/,
          use: 'file-loader',
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                mimetype: 'image/png',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: 'src/assets', to: 'assets' }],
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        appMountId: 'app',
        filename: 'index.html',
        meta: {},
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    devServer: {
      port: 3333,
      contentBase: './dist',
      open: true,
    },
  };
};

module.exports = config;
