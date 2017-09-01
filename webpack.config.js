'use strict';
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('chunk-manifest-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const path = require('path');

const root = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const paths = {
  app: `${root}/app/root.module.js`,
  styles: `${root}/styles`,
  static: {
    index: `${root}/index.html`,
    manifest: `${root}/manifest.json`,
    images: `${root}/app/styles/images/*`,
  },
};

// Plugins
const prep = {
  clean: new CleanPlugin([
    dist,
  ]),
  copy: new CopyPlugin([{
    from: paths.static.index,
  }, {
    from: paths.static.manifest,
  }, {
    from: paths.static.images,
    to: 'img/',
    flatten: true,
  }]),
};

const extract = {
  styles: new ExtractTextPlugin({
    filename: 'css/styles.css',
    allChunks: true,
    ignoreOrder: true,
  }),
  manifest: new ManifestPlugin(),
};

// Loaders
const scripts = {
  babel: {
    test: /\.js$/,
    include: root,
    use: [
      {
        loader: 'ng-annotate-loader',
        options: {
          ngAnnotate: 'ng-annotate-patched',
        },
      },
      {
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', {'loose': true}],
          ],
        },
      },
    ],
  },
  eslint: {
    test: /\.js$/,
    include: root,
    loader: 'eslint-loader',
    enforce: 'pre',
  },
};

const styles = {
  test: [/\.css$/, /\.scss$/],
  include: [root],

  use: ExtractTextPlugin.extract({
    fallback: 'style-loader?sourceMap=true',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  }),
};

const markup = {
  test: /\.html$/,
  use: [
    'ngtemplate-loader',
    'html-loader',
  ],
};

const fonts = {
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: 'fonts/[name].[ext]',
    },
  },
};

const images = {
  test: /\.(png)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: 'img/[name].[ext]',
    },
  },
};

const config = {
  entry: {
    bundle: paths.app,
  },
  devtool: 'source-map',
  output: {
    path: dist,
    publicPath: '/',
    filename: 'js/app.[name].js',
  },
  module: {
    rules: [
      scripts.babel,
      scripts.eslint,

      fonts,
      images,
      markup,
      styles,
    ],
  },
  plugins: [
    prep.clean,
    prep.copy,
    extract.styles,
    extract.manifest,
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true,

  },
};

module.exports = config;
